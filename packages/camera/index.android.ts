/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/**********************************************************************************
  2017, nStudio, LLC & LiveShopper, LLC
  2023, VoiceThread - Angel Dominguez
  2024, Angel Engineering - Angel Dominguez
 **********************************************************************************/

import { Application, Device, View, File, Utils, ImageSource, path, knownFolders } from '@nativescript/core';
import { NSCameraBase, CameraTypes, CameraVideoQuality, GetSetProperty, ICameraOptions, IVideoOptions, WhiteBalance } from './common';
import * as CamHelpers from './helpers';
export * from './common';
export { CameraVideoQuality, WhiteBalance } from './common';

/**
 * Constants
 */
const WRAP_CONTENT = -2;
const ALIGN_PARENT_TOP = 10;
const ALIGN_PARENT_BOTTOM = 12;
const ALIGN_PARENT_LEFT = 9;
const ALIGN_PARENT_RIGHT = 11;
const CENTER_HORIZONTAL = 14;
const FLASH_MODE_ON = 'on';
const FLASH_MODE_OFF = 'off';
const CAMERA_FACING_FRONT = 1; // front camera
const CAMERA_FACING_BACK = 0; // rear camera
const DEVICE_INFO_STRING = () => `device: ${Device.manufacturer} ${Device.model} on SDK: ${Device.sdkVersion}`;

export class NSCamera extends NSCameraBase {
  private _camera: io.github.triniwiz.fancycamera.FancyCamera;
  private _cameraId: number; //either CAMERA_FACING_FRONT or CAMERA_FACING_BACK

  @GetSetProperty()
  public flashOnIcon = 'ic_flash_on_white';
  @GetSetProperty()
  public flashOffIcon = 'ic_flash_off_white';
  @GetSetProperty()
  public toggleCameraIcon = 'ic_switch_camera_white';
  @GetSetProperty()
  public takePicIcon = 'ic_camera_white';
  @GetSetProperty()
  public takeVideoIcon = 'ic_video_white';
  @GetSetProperty()
  public stopVideoIcon = 'ic_video_red';
  @GetSetProperty()
  public insetButtons = false;
  @GetSetProperty()
  public insetButtonsPercent = 0.1;

  private isRecording = false;
  private _videoQuality: CameraVideoQuality = CameraVideoQuality.MAX_720P;
  private _nativeView: android.widget.RelativeLayout;
  private _flashBtn: android.widget.ImageButton = null; // reference to native flash button
  private _takePicBtn: android.widget.ImageButton = null; // reference to native take picture button
  private _toggleCamBtn: android.widget.ImageButton = null; // reference to native toggle camera button
  private isButtonLongPressed = false;
  private _defaultCamera: CameraTypes;
  _lastCameraOptions: ICameraOptions[];
  // readonly _context; // can define this here to avoid TS warning if encountered, NS provides the context during lifecycle as part of ViewBase

  /**
   * Creates the NSCamera instance
   */
  constructor() {
    super();
    this._camera = null;
    this.flashOnIcon = this.flashOnIcon ? this.flashOnIcon : 'ic_flash_on_white';
    this.flashOffIcon = this.flashOffIcon ? this.flashOffIcon : 'ic_flash_off_white';
    this.toggleCameraIcon = this.toggleCameraIcon ? this.toggleCameraIcon : 'ic_switch_camera_white';
    this.takePicIcon = this.takePicIcon ? this.takePicIcon : 'ic_camera_alt_white';
    this.cameraId = this.defaultCamera === 'front' ? CAMERA_FACING_FRONT : CAMERA_FACING_BACK;
    this._onLayoutChangeListener = this._onLayoutChangeFn.bind(this);
    this._permissionListener = this._permissionListenerFn.bind(this);
    this._lastCameraOptions = [];
  }

  private isVideoEnabled() {
    return this.enableVideo === true;
  }

  private isPhotoDisabled() {
    return this.disablePhoto === true;
  }

  // @ts-ignore
  get ratio(): string {
    return this._camera ? this._camera.getRatio() : '4:3';
  }
  set ratio(value: string) {
    if (this._camera) {
      this._camera.setRatio(value);
    }
  }

  // @ts-ignore
  get videoQuality(): CameraVideoQuality {
    // this.CLog('get current VideoQuality()', this._videoQuality);
    return this._videoQuality;
  }
  set videoQuality(value: CameraVideoQuality) {
    this._videoQuality = value;
    if (this._camera) {
      //check if camera is ready yet, and update quality if so
      this.updateQuality();
      this.CLog('updated camera videoQuality to ', value);
    } else {
      //if camera is not ready yet, save preference in local class property for use later when recording video
      console.warn('Video quality preference saved, will be used once recording starts. ');
    }
  }

  // @ts-ignore
  get zoom(): number {
    return this._camera ? this._camera.getZoom() : 0;
  }

  set zoom(value: number) {
    if (this._camera) {
      this._camera.setZoom(value);
    }
  }

  // @ts-ignore
  get doubleTapCameraSwitch(): boolean {
    return this._camera ? this._camera.getDoubleTapCameraSwitch() : false;
  }

  set doubleTapCameraSwitch(value: boolean) {
    if (this._camera) {
      this._camera.setDoubleTapCameraSwitch(value);
    }
  }

  // @ts-ignore
  get defaultCamera(): CameraTypes {
    return this._defaultCamera ? this._defaultCamera : 'rear';
  }

  set defaultCamera(value: CameraTypes) {
    this._defaultCamera = value;
    // if (this.cameraId != (value === 'front' ? CAMERA_FACING_FRONT : CAMERA_FACING_BACK)) {
    //   this.toggleCamera();
    // }
    this.cameraId = value === 'front' ? CAMERA_FACING_FRONT : CAMERA_FACING_BACK;
  }

  /**
   *  Camera white balance setting when taking pictures or video.
   *    NOTE: this is currently not working properly, and only updates camera preview with whitebalance once
   *          photo is being taken or video recording starts.
   */
  // @ts-ignore
  set whiteBalance(value: WhiteBalance | string) {
    if (this._camera) {
      switch (value) {
        case WhiteBalance.Cloudy:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Cloudy'));
          break;
        case WhiteBalance.Fluorescent:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Fluorescent'));
          break;
        case WhiteBalance.Incandescent:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Incandescent'));
          break;
        case WhiteBalance.Shadow:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Shadow'));
          break;
        case WhiteBalance.Sunny:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Sunny'));
          break;
        case WhiteBalance.Twilight:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Twilight'));
          break;
        case WhiteBalance.WarmFluorescent:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('WarmFluorescent'));
          break;
        default:
          this._camera.setWhiteBalance(io.github.triniwiz.fancycamera.WhiteBalance.valueOf('Auto'));
          break;
      }
    }
  }

  get whiteBalance(): WhiteBalance | string {
    if (this._camera) {
      switch (this._camera.getWhiteBalance()) {
        case io.github.triniwiz.fancycamera.WhiteBalance.Cloudy:
          return WhiteBalance.Cloudy;
        case io.github.triniwiz.fancycamera.WhiteBalance.Fluorescent:
          return WhiteBalance.Fluorescent;
        case io.github.triniwiz.fancycamera.WhiteBalance.Incandescent:
          return WhiteBalance.Incandescent;
        case io.github.triniwiz.fancycamera.WhiteBalance.Shadow:
          return WhiteBalance.Shadow;
        case io.github.triniwiz.fancycamera.WhiteBalance.Sunny:
          return WhiteBalance.Sunny;
        case io.github.triniwiz.fancycamera.WhiteBalance.Twilight:
          return WhiteBalance.Twilight;
        case io.github.triniwiz.fancycamera.WhiteBalance.WarmFluorescent:
          return WhiteBalance.WarmFluorescent;
        default:
          return WhiteBalance.Auto;
      }
    }
    return WhiteBalance.Auto;
  }

  getAvailablePictureSizes(ratio: string): string[] {
    const sizes = [];
    if (this._camera && typeof ratio === 'string') {
      const nativeSizes: any = this._camera.getAvailablePictureSizes(ratio);
      for (const size of nativeSizes) {
        sizes.push(`${size.getWidth()}x${size.getHeight()}`);
      }
    }
    return sizes;
  }

  getGetSupportedRatios(): string[] {
    const ratios = [];
    if (this._camera) {
      const nativeRatios: any = this._camera.getGetSupportedRatios();
      for (const ratio of nativeRatios) {
        ratios.push(ratio);
      }
    }
    return ratios;
  }

  // @ts-ignore
  set pictureSize(value: string) {
    if (this._camera) {
      this._camera.setPictureSize(value);
    }
  }

  get pictureSize(): string {
    return this._camera ? this._camera.getPictureSize() : '0x0';
  }

  get camera(): io.github.triniwiz.fancycamera.FancyCamera {
    return this._camera;
  }

  /**
   * Create the native view
   * @returns android.widget.RelativeLayout
   */
  public createNativeView(): android.widget.RelativeLayout {
    // create the Android RelativeLayout which contains the camera
    Application.android.on('activityRequestPermissions', this._permissionListener);
    this._nativeView = new android.widget.RelativeLayout(this._context);
    this._camera = new io.github.triniwiz.fancycamera.FancyCamera(this._context);
    (this._camera as any).setLayoutParams(new android.view.ViewGroup.LayoutParams(android.view.ViewGroup.LayoutParams.MATCH_PARENT, android.view.ViewGroup.LayoutParams.MATCH_PARENT));
    this._nativeView.addView(this._camera as any);
    return this._nativeView;
  }

  private _onLayoutChangeFn(args) {
    const size = this.getActualSize();
    this._initDefaultButtons();
  }

  private _onLayoutChangeListener: any;

  private _permissionListener: any;

  private _permissionListenerFn(args) {
    if (this._camera) {
      if (this._camera.hasCameraPermission() || this._camera.hasPermission()) {
        this._camera.startPreview();
      }
    }
  }

  initNativeView() {
    this.CLog('initNativeView()');
    const that = this;
    super.initNativeView();
    this.on(View.layoutChangedEvent, this._onLayoutChangeListener);

    const listenerImpl = (<any>io).github.triniwiz.fancycamera.CameraEventListenerUI.extend({
      owner: null,

      onReady(): void {
        that.CLog('listenerImpl.onReady()');
        // not working here:
        // this.owner.camera.whiteBalance = WhiteBalance.Auto;
      },

      onCameraCloseUI(): void {
        that.CLog('listenerImpl.onCameraCloseUI()');
      },

      onCameraError(message: string, ex: java.lang.Exception): void {
        that.CError('listenerImpl.onCameraError:', message, ex.getMessage());
        const owner: NSCamera = this.owner ? this.owner.get() : null;
        if (owner) {
          if (owner.isRecording) {
            owner.isRecording = false;
            owner.stopRecording();
          }
          owner._lastCameraOptions.shift(); //remove the last set of options used
          owner.sendEvent(NSCamera.errorEvent, ex, message);
        } else {
          that.CError('!!! No owner reference found when handling onCameraError event');
        }
      },

      async onCameraPhotoUI(event?: java.io.File) {
        const owner: NSCamera = this.owner ? this.owner.get() : null;
        const file = event;
        const options: ICameraOptions = owner._lastCameraOptions.shift();
        let confirmPic;
        let confirmPicRetakeText;
        let confirmPicSaveText;
        let saveToGallery;
        let maxDimension;
        let quality;
        let shouldAutoSquareCrop = owner.autoSquareCrop;
        if (options) {
          //if we have options saved, use them. otherwise fall back on defaults set on plugin
          confirmPic = options.confirmPhotos ? true : false;
          confirmPicRetakeText = options.confirmRetakeText ? options.confirmRetakeText : owner.confirmRetakeText;
          confirmPicSaveText = options.confirmSaveText ? options.confirmSaveText : owner.confirmSaveText;
          saveToGallery = options.saveToGallery ? true : false;
          maxDimension = options.maxDimension ? +options.maxDimension : null;
          shouldAutoSquareCrop = !!options.autoSquareCrop;
          quality = options.quality ? +options.quality : 95;
        } else {
          // otherwise, use xml property getters or their defaults
          confirmPic = owner.confirmPhotos;
          saveToGallery = owner.saveToGallery;
          confirmPicRetakeText = owner.confirmRetakeText;
          confirmPicSaveText = owner.confirmSaveText;
          shouldAutoSquareCrop = owner.autoSquareCrop;
          saveToGallery = owner.saveToGallery ? true : false;
          maxDimension = owner.maxDimension ? +owner.maxDimension : null;
          quality = owner.quality ? +owner.quality : 95;
        }

        if (confirmPic === true) {
          owner.sendEvent(NSCamera.confirmScreenShownEvent);
          const result = await CamHelpers.createImageConfirmationDialog(file.getAbsolutePath(), confirmPicRetakeText, confirmPicSaveText).catch(ex => {
            that.CError('Error in createImageConfirmationDialog', ex);
          });
          owner.sendEvent(NSCamera.confirmScreenDismissedEvent);
          if (result !== true) {
            file.delete();
            return;
          }
        }

        //save a copy to the app's documents folder and return path
        let outFilepath, tempFileName;
        try {
          let source = await ImageSource.fromFile(file.getAbsolutePath());
          for (let i = 1; i < 999999999; i++) {
            tempFileName = 'photo-' + i + '.jpg';
            outFilepath = path.join(knownFolders.documents().path, tempFileName);
            if (!File.exists(outFilepath)) break;
          }
          //resize for maxDimension if option set
          if (maxDimension && maxDimension > 0) source = source.resize(maxDimension);
          const saved = source.saveToFile(outFilepath, 'jpg', quality);
          if (saved) {
            owner.sendEvent(NSCamera.photoCapturedEvent, outFilepath);
          } else {
            that.CError('ERROR saving image to file at path', outFilepath);
            owner.sendEvent(NSCamera.errorEvent, 'ERROR saving image to file at path: ' + outFilepath);
          }
        } catch (err) {
          that.CError('ERROR saving image to file at path', outFilepath, err);
          owner.sendEvent(NSCamera.errorEvent, err);
        }
      },

      onCameraOpenUI(): void {
        const owner: NSCamera = this.owner ? this.owner.get() : null;
        if (owner) {
          owner._initDefaultButtons();
          if (owner._togglingCamera) {
            owner._ensureCorrectFlashIcon();
            owner._togglingCamera = true;
          } else {
            owner.sendEvent(NSCamera.cameraReadyEvent, owner.camera);
            owner.isRecording = false;
          }
        }
      },
      onCameraVideoStartUI(): void {
        const owner: NSCamera = this.owner ? this.owner.get() : null;
        if (owner) {
          owner.isRecording = true;
          owner.sendEvent(NSCamera.videoRecordingStartedEvent, owner.camera);
        } else {
          that.CError('!!! No owner reference found when handling onCameraVideoStartUI event');
        }
      },
      onCameraVideoStopUI(): void {
        const owner: NSCamera = this.owner ? this.owner.get() : null;
        if (owner) {
          owner.isRecording = true;
          owner.sendEvent(NSCamera.videoRecordingFinishedEvent, owner.camera);
        } else {
          that.CError('!!! No owner reference found when handling onCameraVideoStopUI event');
        }
      },
      onCameraVideoUI(event?: java.io.File): void {
        const owner: NSCamera = this.owner ? this.owner.get() : null;
        if (owner) {
          owner.sendEvent(NSCamera.videoRecordingReadyEvent, event.getAbsolutePath());
          owner.isRecording = false;
        } else {
          that.CError('!!! No owner reference found when handling onCameraVideoUI event');
        }
      },
    });
    const listener = new listenerImpl();
    listener.owner = new WeakRef(this);
    this._camera.setListener(listener);
    this.cameraId = this._cameraId;
    this.enableVideo = this.isVideoEnabled();
    this.disablePhoto = this.isPhotoDisabled();
    this.isRecording = false;
    this._camera.setDoubleTapCameraSwitch(this.doubleTapCameraSwitch);
    this.updateQuality();
  }

  disposeNativeView() {
    this.CLog('disposeNativeView.');
    this.off(View.layoutChangedEvent, this._onLayoutChangeListener);
    Application.android.off('activityRequestPermissions', this._permissionListener);
    this.releaseCamera();
    super.disposeNativeView();
  }

  get cameraId(): number {
    return this._cameraId;
  }

  set cameraId(id: number) {
    this.CLog('set cameraID() id:', id, io.github.triniwiz.fancycamera.CameraPosition.valueOf('BACK'));
    if (this._camera) {
      switch (id) {
        case CAMERA_FACING_FRONT:
          this._camera.setPosition(io.github.triniwiz.fancycamera.CameraPosition.valueOf('FRONT'));
          this._cameraId = CAMERA_FACING_FRONT;
          break;
        default:
          this._camera.setPosition(io.github.triniwiz.fancycamera.CameraPosition.valueOf('BACK'));
          this._cameraId = CAMERA_FACING_BACK;
          break;
      }
    } else {
      this.CLog('No camera instance yet, preference saved for when camera is ready');
    }
    this._cameraId = id;
  }

  /**
   * Takes a picture using the camera preview
   */
  public takePicture(options?: ICameraOptions): void {
    if (this._camera) {
      // Use options if passed, otherwise use the current values set on plugin via XML or code,
      //   or fall back on plugin defaults if no properties set by user before now.
      options = {
        confirmPhotos: options?.confirmPhotos ? options.confirmPhotos : this.confirmPhotos,
        confirmRetakeText: options?.confirmRetakeText ? options.confirmRetakeText : this.confirmRetakeText,
        confirmSaveText: options?.confirmSaveText ? options.confirmSaveText : this.confirmSaveText,
        saveToGallery: options?.saveToGallery ? options.saveToGallery : this._camera.getSaveToGallery(),
        maxDimension: options?.maxDimension ? +options.maxDimension : this.maxDimension,
        autoSquareCrop: options?.autoSquareCrop ? options.autoSquareCrop : this._camera.getAutoSquareCrop(),
        quality: options?.quality ? +options.quality : this.quality,
      };
      // this.CLog('takePicture() options:', JSON.stringify(options));
      //these two options need to be set on native side
      this._camera.setSaveToGallery(!!options.saveToGallery);
      this._camera.setAutoSquareCrop(!!options.autoSquareCrop);
      //the rest of the options are used on NS side: confirmPhotos, confirmRetakeText, confirmSaveText, maxDimention and quality
      this._lastCameraOptions.push(options); //save these options for NS side to refer to once a photo file is returned from native code
      this._camera.takePhoto();
    }
  }

  private releaseCamera(): void {
    if (this._camera) {
      // this.CLog('releaseCamera()');
      this._camera.release();
    }
  }

  // @ts-ignore
  public get autoFocus(): boolean {
    return this._camera ? this._camera.getAutoFocus() : false;
  }
  public set autoFocus(focus: boolean) {
    if (this._camera) {
      this._camera.setAutoFocus(focus);
    }
  }

  _togglingCamera = false;
  /**
   * Toggle the opened camera. Only supported on devices with multiple cameras.
   */
  public toggleCamera(): void {
    if (this._camera) {
      this._togglingCamera = true;
      this._camera.toggleCamera();
      const camNumber = this.getNumberOfCameras();
      if (camNumber <= 1) {
        this.CLog(`Cannot switch camera, this Android Device only has ${camNumber} camera.`);
        return;
      }
      this.sendEvent(NSCamera.toggleCameraEvent, this.camera);
      // need to check flash mode when toggling...
      // front cam may not have flash - and just ensure the correct icon shows
      this._ensureCorrectFlashIcon();
      // try to set focus mode when camera gets toggled
      this._ensureFocusMode();
    }
  }

  //convenience function to get the current Android camera2 video quality
  private getVideoQuality(): CameraVideoQuality {
    if (!this.camera) {
      this.CError('No camera instance! Make sure this is created and initialized before calling updateQuality');
      return CameraVideoQuality.MAX_720P;
    }
    switch (this._camera.getQuality()) {
      case io.github.triniwiz.fancycamera.Quality.valueOf('HIGHEST'):
        return CameraVideoQuality.HIGHEST;
      case io.github.triniwiz.fancycamera.Quality.valueOf('LOWEST'):
        return CameraVideoQuality.LOWEST;
      case io.github.triniwiz.fancycamera.Quality.valueOf('MAX_2160P'):
        return CameraVideoQuality.MAX_2160P;
      case io.github.triniwiz.fancycamera.Quality.valueOf('MAX_1080P'):
        return CameraVideoQuality.MAX_1080P;
      case io.github.triniwiz.fancycamera.Quality.valueOf('MAX_720P'):
        return CameraVideoQuality.MAX_720P;
      case io.github.triniwiz.fancycamera.Quality.valueOf('MAX_480P'):
        return CameraVideoQuality.MAX_480P;
      case io.github.triniwiz.fancycamera.Quality.valueOf('QVGA'):
        return CameraVideoQuality.QVGA;
      default:
        return CameraVideoQuality.MAX_720P;
    }
  }

  private updateQuality(): void {
    this.CLog('updateQuality()');
    if (!this.camera) {
      this.CError('No camera instance! Make sure this is created and initialized before calling updateQuality');
      return;
    }
    switch (this.videoQuality) {
      case CameraVideoQuality.HIGHEST:
        this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('HIGHEST'));
        break;
      case CameraVideoQuality.LOWEST:
        this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('LOWEST'));
        break;
      case CameraVideoQuality.MAX_2160P:
        this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_2160P'));
        break;
      case CameraVideoQuality.MAX_1080P:
        this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_1080P'));
        break;
      case CameraVideoQuality.MAX_720P:
        this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_720P'));
        break;
      case CameraVideoQuality.MAX_480P:
        this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_480P'));
        break;
      case CameraVideoQuality.QVGA:
        this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('QVGA'));
        break;
      default:
        this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_720P'));
        break;
    }
  }

  /**
   * Start recording video
   * @param options IVideoOptions
   */
  public async record(options?: IVideoOptions): Promise<void> {
    if (this.isRecording) {
      this.CLog('Currently recording, cannot call record()');
      return;
    }

    options = {
      saveToGallery: options?.saveToGallery ? options.saveToGallery : this.saveToGallery,
      videoQuality: options?.videoQuality ? options.videoQuality : this.videoQuality,
      // videoHeight: options?.videoHeight ? options.videoHeight : this.videoHeight, //not supported yet
      // videoWidth: options?.videoWidth ? options.videoWidth : this.videoWidth, //not supported yet
      // disableHEVC: options?.disableHEVC ? options.disableHEVC : this.disableHEVC, //not supported yet
      //if the following options are not specified, -1 will let Android select based on requested videoQuality
      androidMaxVideoBitRate: options?.androidMaxVideoBitRate ? options.androidMaxVideoBitRate : -1,
      androidMaxFrameRate: options?.androidMaxFrameRate ? options.androidMaxFrameRate : -1,
      androidMaxAudioBitRate: options?.androidMaxAudioBitRate ? options.androidMaxAudioBitRate : -1,
    };
    this.CLog('record options', options);
    if (options.saveToGallery) this._camera.setSaveToGallery(true);
    else this._camera.setSaveToGallery(false);

    if (this._camera) {
      this._camera.setSaveToGallery(!!options.saveToGallery);
      switch (options.videoQuality) {
        case CameraVideoQuality.HIGHEST:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('HIGHEST'));
          break;
        case CameraVideoQuality.LOWEST:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('LOWEST'));
          break;
        case CameraVideoQuality.MAX_2160P:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_2160P'));
          break;
        case CameraVideoQuality.MAX_1080P:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_1080P'));
          break;
        case CameraVideoQuality.MAX_720P:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_720P'));
          break;
        case CameraVideoQuality.MAX_480P:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_480P'));
          break;
        case CameraVideoQuality.QVGA:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('QVGA'));
          break;
        default:
          this._camera.setQuality(io.github.triniwiz.fancycamera.Quality.valueOf('MAX_720P'));
          break;
      }
      // -1 uses profile value;
      this._camera.setMaxAudioBitRate(options.androidMaxAudioBitRate || -1);
      this._camera.setMaxVideoBitrate(options.androidMaxVideoBitRate || -1);
      this._camera.setMaxVideoFrameRate(options.androidMaxFrameRate || -1);

      if (this.shouldLockRotation) {
        this.disableRotationAndroid();
      }

      const takePicDrawable = CamHelpers.getImageDrawable(this.stopVideoIcon);
      this._takePicBtn.setImageResource(takePicDrawable); // set the icon
      //Hide the flash button while recording since we cannot turn it on/off during recording
      this._flashBtn.setVisibility(android.view.View.GONE);
      this._camera.startRecording();
      this.isRecording = true;
    } else {
      this.CError('No camera instance! Make sure this is created and initialized before calling updateQuality');
      return;
    }
  }

  /**
   * Stop recording video
   */
  public stop(): void {
    this.stopRecording();
  }

  /**
   * Stop camera recording and update UI
   */
  public stopRecording(): void {
    if (!this.isRecording) {
      this.CLog('not currently recording, cannot call stopRecording()');
      return;
    }
    if (this._camera) {
      // this.CLog(`*** stopping mediaRecorder ***`);
      const takePicDrawable = CamHelpers.getImageDrawable(this.takeVideoIcon);
      this._takePicBtn.setImageResource(takePicDrawable); // set the icon
      this._camera.stopRecording();
      //show the flash button again if supported
      this._ensureCorrectFlashIcon();
      this.isRecording = false;
      if (this.shouldLockRotation) {
        this.enableRotationAndroid();
      }
    } else {
      this.CError("NO camera instance attached, can't stop recording!");
    }
  }

  /**
   * Toggles the flash mode of the camera.
   */
  public toggleFlash(): void {
    if (this._camera) {
      // @ts-ignore
      this._camera.toggleFlash();
      this._ensureCorrectFlashIcon();
    }
  }

  /**
   * Gets current camera selection
   */
  public getCurrentCamera(): 'front' | 'rear' {
    if (!this._camera) return 'rear';
    switch (this._camera.getPosition()) {
      case io.github.triniwiz.fancycamera.CameraPosition.valueOf('FRONT'):
        return 'front';
      default:
        return 'rear';
    }
  }

  /**
   * Check if the device has a camera
   */
  public isCameraAvailable(): boolean {
    if (Utils.ad.getApplicationContext().getPackageManager().hasSystemFeature('android.hardware.camera')) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Gets the number of cameras on a device.
   * NOTE: this should be called after the cameraReadyEvent has been received to ensure the camera component has initialized
   */
  public getNumberOfCameras(): number {
    if (!this._camera) return 0;
    return this._camera.getNumberOfCameras();
  }

  /**
   * Check if current camera has a flash
   * @returns true if camera has a flash, false if not
   */
  public hasFlash(): boolean {
    if (!this._camera) {
      return false;
    }
    return this._camera.getHasFlash();
  }

  /**
   * **iOS-only** Check if current camera has a torch.
   * On Android, this is the same as hasFlash since it doesn't differentiate between torches and flashlights
   * @returns true if camera has a torch, false if not
   */
  hasTorch(): boolean {
    return this.hasFlash();
  }

  /**
   * Return the current flash mode of the device. Will return null if the flash mode is not supported by device.
   * @returns 'on', 'off' or null
   */
  public getFlashMode(): string {
    if (this.hasFlash()) {
      if (this._camera.getFlashMode() !== io.github.triniwiz.fancycamera.CameraFlashMode.valueOf('OFF')) {
        return 'on';
      }
      return 'off';
    }
    return null;
  }

  /**
   * Helper method to ensure the correct icon (on/off) is shown on flash.
   * Useful when toggling cameras.
   */
  _ensureCorrectFlashIcon(): void {
    // get current flash mode and set correct image drawable
    const currentFlashMode = this.getFlashMode();
    // this.CLog('_ensureCorrectFlashIcon flash mode', currentFlashMode);

    // if the flash mode is null then we need to remove the button from the parent layout as camera does not have a flash to use
    if (currentFlashMode === null) {
      // if we have the button - remove it from parent
      if (this._flashBtn) {
        this._flashBtn.setVisibility(android.view.View.GONE);
      }
      return;
    }

    // ensure flashBtn is here - if currentFlashMode is null then don't show/assign the flash button
    if (this._flashBtn === undefined || this._flashBtn === null) {
      return;
    }

    // make sure we have our flash icon button visible - sometimes toggling might set to GONE
    this._flashBtn.setVisibility(android.view.View.VISIBLE);

    // reset the image in the button first
    this._flashBtn.setImageResource((android as any).R.color.transparent);

    const flashIcon = currentFlashMode === FLASH_MODE_OFF ? this.flashOffIcon : this.flashOnIcon;
    // this.CLog('flash icon is now ', flashIcon, 'off icon is ', this.flashOffIcon);
    const imageDrawable = CamHelpers.getImageDrawable(flashIcon);
    this._flashBtn.setImageResource(imageDrawable);
  }

  private _ensureFocusMode(): void {
    // TODO: setup autoFocus if possible
  }

  private _initFlashButton(): void {
    if (!this.enableVideo && this.disablePhoto) {
      console.warn('Neither photo or video mode enabled, not showing flash button');
      return;
    }
    this._flashBtn = CamHelpers.createImageButton();
    // set correct flash icon on button
    this._ensureCorrectFlashIcon();
    const shape = CamHelpers.createTransparentCircleDrawable();
    this._flashBtn.setBackgroundDrawable(shape);
    const ref = new WeakRef(this);
    this._flashBtn.setOnClickListener(
      new android.view.View.OnClickListener({
        onClick: args => {
          const owner = ref.get();
          if (owner) {
            owner.toggleFlash();
            owner._ensureCorrectFlashIcon();
          }
        },
      })
    );
    const flashParams = new android.widget.RelativeLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
    if (this.insetButtons === true) {
      // this.CLog('insetButtons set to true, adjusting flash button layout');
      // need to get the width of the screen
      const layoutWidth = this._nativeView.getWidth();
      // this.CLog(`layoutWidth = ${layoutWidth}`);
      const xMargin = layoutWidth * this.insetButtonsPercent;
      const layoutHeight = this._nativeView.getHeight();
      // this.CLog(`layoutHeight = ${layoutHeight}`);
      const yMargin = layoutHeight * this.insetButtonsPercent;
      // add margin to left and top where the button is positioned
      flashParams.setMargins(xMargin, yMargin, 8, 8);
    } else {
      flashParams.setMargins(8, 8, 8, 8);
    }
    flashParams.addRule(ALIGN_PARENT_TOP);
    flashParams.addRule(ALIGN_PARENT_LEFT);
    this._nativeView.addView(this._flashBtn, flashParams);
  }

  private _initToggleCameraButton(): void {
    this._toggleCamBtn = CamHelpers.createImageButton();
    const switchCameraDrawable = CamHelpers.getImageDrawable(this.toggleCameraIcon);
    this._toggleCamBtn.setImageResource(switchCameraDrawable);
    const shape = CamHelpers.createTransparentCircleDrawable();
    this._toggleCamBtn.setBackgroundDrawable(shape);
    const ref = new WeakRef(this);
    this._toggleCamBtn.setOnClickListener(
      new android.view.View.OnClickListener({
        onClick: (view: android.view.View) => {
          const owner = ref.get();
          if (owner) {
            owner.toggleCamera();
          }
        },
      })
    );

    const toggleCamParams = new android.widget.RelativeLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
    if (this.insetButtons === true) {
      const layoutWidth = this._nativeView.getWidth();
      const xMargin = layoutWidth * this.insetButtonsPercent;
      const layoutHeight = this._nativeView.getHeight();
      const yMargin = layoutHeight * this.insetButtonsPercent;
      toggleCamParams.setMargins(8, yMargin, xMargin, 8);
    } else {
      toggleCamParams.setMargins(8, 8, 8, 8);
    }
    toggleCamParams.addRule(ALIGN_PARENT_TOP);
    toggleCamParams.addRule(ALIGN_PARENT_RIGHT);
    this._nativeView.addView(this._toggleCamBtn, toggleCamParams);
  }

  private _initTakePicButton(): void {
    if (this.enableVideo) {
      //video mode show a circle icon
      this._takePicBtn = new android.widget.ImageButton(Application.android.context) as android.widget.ImageButton;
      this._takePicBtn.setMaxHeight(48);
      this._takePicBtn.setMaxWidth(48);
      const takePicDrawable = CamHelpers.getImageDrawable(this.takeVideoIcon);
      this._takePicBtn.setImageResource(takePicDrawable); // set the icon
      const shape = new android.graphics.drawable.GradientDrawable();
      shape.setColor(0x99000000);
      shape.setCornerRadius(96);
      shape.setAlpha(0);
      this._takePicBtn.setBackgroundDrawable(shape);
    } else if (!this.disablePhoto) {
      //if we're in camera photo mode, show the takePhoto icon
      this._takePicBtn = CamHelpers.createImageButton();
      const takePicDrawable = CamHelpers.getImageDrawable(this.takePicIcon);
      this._takePicBtn.setImageResource(takePicDrawable); // set the icon
      const shape = CamHelpers.createTransparentCircleDrawable();
      this._takePicBtn.setBackgroundDrawable(shape); // set the transparent background
    } else {
      console.warn('Neither photo or video mode enabled, not showing button');
    }

    const ref = new WeakRef(this);

    this._takePicBtn.setOnTouchListener(
      new android.view.View.OnTouchListener({
        onTouch: (argsView: android.view.View, pEvent: android.view.MotionEvent) => {
          const owner = ref.get();
          if (this.enableVideo) {
            //Video mode
            //check if we're currently doing a long click for snapchat style recording UI
            if (pEvent.getAction() == android.view.MotionEvent.ACTION_UP) {
              if (this.isButtonLongPressed) {
                //Note: if scrollview moves with this view inside, this will trigger false positives
                this.isButtonLongPressed = false;
                this.stop();
                owner.isRecording = false;
                return false;
              } else {
                return true;
              }
            } else if (pEvent.getAction() == android.view.MotionEvent.ACTION_DOWN) {
              if (!this.isButtonLongPressed && !owner.isRecording) {
                this.record();
                owner.isRecording = true;
              }
            }
          } else if (!this.disablePhoto) {
            //Photo Capture
            if (!this.isButtonLongPressed && pEvent.getAction() == android.view.MotionEvent.ACTION_DOWN) {
              if (owner) {
                owner.takePicture();
              }
            }
          } else {
            this.CLog('neither photo or video enabled, ignoring tap');
          }
          return false;
        },
      })
    );

    this._takePicBtn.setOnLongClickListener(
      new android.view.View.OnLongClickListener({
        onLongClick: (argsView: android.view.View) => {
          if (this.enableVideo) {
            this.isButtonLongPressed = true;
          }
          return false;
        },
      })
    );

    const takePicParams = new android.widget.RelativeLayout.LayoutParams(WRAP_CONTENT, WRAP_CONTENT);
    if (this.insetButtons === true) {
      const layoutHeight = this._nativeView.getHeight();
      const yMargin = layoutHeight * this.insetButtonsPercent;
      takePicParams.setMargins(8, 8, 8, yMargin);
    } else {
      takePicParams.setMargins(8, 8, 8, 8);
    }
    takePicParams.addRule(ALIGN_PARENT_BOTTOM);
    takePicParams.addRule(CENTER_HORIZONTAL);
    this._nativeView.addView(this._takePicBtn, takePicParams);
  }

  /**
   * Creates the default buttons depending on the options to show the various default buttons.
   */
  private _initDefaultButtons(): void {
    try {
      // flash button setup - if the device doesn't support flash do not setup/show this button
      if (this.showFlashIcon === true && this.getFlashMode() !== null && this._flashBtn === null) {
        this._initFlashButton();
      }
      // camera toggle button setup
      if (this.showToggleIcon === true && this.getNumberOfCameras() > 1 && this._toggleCamBtn === null) {
        this._initToggleCameraButton();
      }
      // take picture button setup
      if (this.showCaptureIcon === true && this._takePicBtn === null) {
        if (this.showFlashIcon === true && this.getFlashMode() !== null && this._flashBtn === null) {
          this._initFlashButton();
        }
        // camera toggle button setup
        if (this.showToggleIcon === true && this.getNumberOfCameras() > 1 && this._toggleCamBtn === null) {
          this._initToggleCameraButton();
        }
        // take picture button setup
        if (this.showCaptureIcon === true && this._takePicBtn === null) {
          this._initTakePicButton();
        }
      }
    } catch (ex) {
      this.CError('_initDefaultButtons error', ex);
    }
  }

  /**
   * @function enableRotation
   */
  private enableRotationAndroid(): void {
    if (!Application.android || !Application.android.foregroundActivity) {
      setTimeout(this.enableRotationAndroid, 100);
      return;
    }

    const activity = Application.android.foregroundActivity;
    activity.setRequestedOrientation(13);
  }

  /**
   * @function disableRotation
   */
  private disableRotationAndroid(disallowPlayerOverride = false): void {
    if (!Application.android || !Application.android.foregroundActivity) {
      setTimeout(this.disableRotationAndroid, 100);
      return;
    }

    const activity = Application.android.foregroundActivity;
    activity.setRequestedOrientation(14); // SCREEN_ORIENTATION_LOCKED = 14
  }

  /**
   * Merge an array of video filenames, must all be valid mp4 video files with same audio and video encoding
   * Note: Android MediaMuxer support for multiple audio/video tracks only on API 26+
   * @param inputFiles string[] Array of video file paths to merge
   * @param outputPath string Path to save merged video to
   * @returns Promise<File> merged File
   */
  public mergeVideoFiles(inputFiles: string[], outputPath: string): Promise<File> {
    return new Promise((resolve, reject) => {
      if (+Device.sdkVersion < 26) {
        this.CError('This is only supported on API 26+');
        return reject('This is only supported on API 26+');
      }
      if (!inputFiles || inputFiles.length <= 0) return reject('inputFiles is empty!');
      if (!outputPath) return reject('outputPath should be a valid path string');
      if (File.exists(outputPath)) {
        // remove file if it exists
        File.fromPath(outputPath).removeSync(err => {
          this.CError('Unable to remove file!', err);
          return reject('Unable to remove file!' + err.message);
        });
      }
      if (inputFiles.length == 1) {
        const fileData = File.fromPath(inputFiles[0]).readSync();
        File.fromPath(outputPath).writeSync(fileData);
        return resolve(File.fromPath(outputPath));
      }

      // Create the MediaMuxer and specify the output file
      const muxer = new android.media.MediaMuxer(outputPath, android.media.MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4);
      const MAX_SAMPLE_SIZE = 1024 * 1024;
      const APPEND_DELAY = 200; //we add a little delay between segments to make segmentation a little more obvious
      let totalDuration = 0;
      let audioFormat: android.media.MediaFormat = null;
      let videoFormat: android.media.MediaFormat = null;
      let audioTrackIndex = -1;
      let videoTrackIndex = -1;
      let outRotation = 0;
      try {
        let muxerStarted = false;
        for (let i = 0; i < inputFiles.length; i++) {
          let mediadata = new android.media.MediaMetadataRetriever();
          mediadata.setDataSource(inputFiles[i]);
          let trackDuration = 0;
          try {
            trackDuration = +mediadata.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_DURATION);
            // this.CLog('trackDuration ', trackDuration); //returned in milliseconds
            const orientation = mediadata.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_ROTATION);
            outRotation = +orientation;
          } catch (err) {
            this.CError('Unable to extract trackDuration from metadata!');
          }

          //find video format and select the video track to read from later
          let videoExtractor: android.media.MediaExtractor = new android.media.MediaExtractor();
          videoExtractor.setDataSource(inputFiles[i]);
          const videoTracks = videoExtractor.getTrackCount();

          for (let j = 0; j < videoTracks; j++) {
            const mf = videoExtractor.getTrackFormat(j);
            const mime = mf.getString(android.media.MediaFormat.KEY_MIME);
            if (mime.startsWith('video/')) {
              videoExtractor.selectTrack(j);
              if (!videoFormat) {
                videoFormat = videoExtractor.getTrackFormat(j);
              }
              break;
            }
          }
          //TODO: should check that all other segment formats match first segment before merging

          //find audio format and select the audio track to read from later
          let audioExtractor: android.media.MediaExtractor = new android.media.MediaExtractor();
          audioExtractor.setDataSource(inputFiles[i]);
          const audioTracks = audioExtractor.getTrackCount();

          for (let j = 0; j < audioTracks; j++) {
            const mf = audioExtractor.getTrackFormat(j);
            const mime = mf.getString(android.media.MediaFormat.KEY_MIME);
            if (mime.startsWith('audio/')) {
              audioExtractor.selectTrack(j);
              if (!audioFormat) {
                audioFormat = audioExtractor.getTrackFormat(j);
              }
              break;
            }
          }

          if (audioTrackIndex == -1) {
            audioTrackIndex = muxer.addTrack(audioFormat);
          }
          if (videoTrackIndex == -1) {
            videoTrackIndex = muxer.addTrack(videoFormat);
          }
          videoExtractor.seekTo(0, android.media.MediaExtractor.SEEK_TO_CLOSEST_SYNC);
          audioExtractor.seekTo(0, android.media.MediaExtractor.SEEK_TO_CLOSEST_SYNC);

          let sawEOS = false;
          let sawAudioEOS = false;
          const bufferSize = MAX_SAMPLE_SIZE;
          let audioBuf = java.nio.ByteBuffer.allocate(bufferSize);
          let videoBuf = java.nio.ByteBuffer.allocate(bufferSize);
          const offset = 100;
          let videoBufferInfo: android.media.MediaCodec.BufferInfo = new android.media.MediaCodec.BufferInfo();
          let audioBufferInfo: android.media.MediaCodec.BufferInfo = new android.media.MediaCodec.BufferInfo();

          // start muxer if not started yet
          if (!muxerStarted) {
            muxer.setOrientationHint(outRotation); //ensure merged video has same orientation as inputs
            muxer.start();
            muxerStarted = true;
          }
          //add file data
          //write video
          while (!sawEOS) {
            const videoSize = videoExtractor.readSampleData(videoBuf, offset);
            if (videoSize < 0) {
              sawEOS = true;
            } else {
              //trying to set properties directly on BufferInfo objects doesn't work, need to use the set function
              videoBufferInfo.set(offset, videoSize, videoExtractor.getSampleTime() + totalDuration * 1000 + APPEND_DELAY, android.media.MediaCodec.BUFFER_FLAG_KEY_FRAME);
              muxer.writeSampleData(videoTrackIndex, videoBuf, videoBufferInfo);
              videoExtractor.advance();
            }
          }

          //write audio
          while (!sawAudioEOS) {
            const audioSize = audioExtractor.readSampleData(audioBuf, offset);
            if (audioSize < 0) {
              sawAudioEOS = true;
            } else {
              audioBufferInfo.set(offset, audioSize, audioExtractor.getSampleTime() + totalDuration * 1000 + APPEND_DELAY, android.media.MediaCodec.BUFFER_FLAG_KEY_FRAME);
              muxer.writeSampleData(audioTrackIndex, audioBuf, audioBufferInfo);
              audioExtractor.advance();
            }
          }

          mediadata.release();
          mediadata = null;
          videoBufferInfo = audioBufferInfo = null;
          audioBuf = videoBuf = null;
          videoExtractor.release();
          videoExtractor = null;
          audioExtractor.release();
          audioExtractor = null;
          totalDuration += trackDuration;
          Utils.GC();
        }
        muxer.stop();
        muxer.release();
        this.CLog('finished merging video segments into ', outputPath);
        return resolve(File.fromPath(outputPath));
      } catch (err) {
        this.CError(err, err.message);
        return reject('Error during merge: ' + err.message);
      }
    });
  }
}
