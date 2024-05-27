/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-this-alias */
/**********************************************************************************
  2017, nStudio, LLC & LiveShopper, LLC
  2023, VoiceThread - Angel Dominguez
  2024, Angel Engineering - Angel Dominguez
 **********************************************************************************/

import { Color, ImageAsset, View, File, Screen, Frame, Application, ImageSource, path, knownFolders } from '@nativescript/core';
import { layout } from '@nativescript/core/utils/layout-helper';
import { NSCameraBase, CameraTypes, CameraVideoQuality, ICameraOptions, IVideoOptions } from './common';
import { iOSNativeHelper } from '@nativescript/core/utils';
export * from './common';
export { CameraVideoQuality, WhiteBalance } from './common';

export class DefaultMap<T> extends Map {
  constructor(obj: { [key: string]: T } = {}) {
    super();
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'defaultValue') this.defaultValue = value;
      else this.set(key, value);
    }
  }
  protected defaultValue: T;

  get(key?: string, defaultValue: T = this.defaultValue): T {
    return this.has(key) ? super.get(key) : defaultValue;
  }
}

/**
   Main delegate for swiftycam viewcontroller
   */
@NativeClass
export class SwiftyDelegate extends NSObject implements SwiftyCamViewControllerDelegate {
  public static ObjCProtocols = [SwiftyCamViewControllerDelegate];
  private _owner: WeakRef<MySwifty>;

  public static initWithOwner(owner: WeakRef<MySwifty>) {
    const delegate = <SwiftyDelegate>SwiftyDelegate.new();
    delegate._owner = owner;
    return delegate;
  }

  swiftyCamDidFailToConfigure(swiftyCam: SwiftyCamViewController) {}

  swiftyCamDidFailToRecordVideo(swiftyCam: SwiftyCamViewController, error: NSError) {}

  swiftyCamNotAuthorized(swiftyCam: SwiftyCamViewController) {}

  swiftyCamSessionDidStopRunning(swiftyCam: SwiftyCamViewController) {}

  swiftyCamSessionDidStartRunning(swiftyCam: SwiftyCamViewController) {
    this._owner.get().doLayout();
  }

  swiftyCamDidBeginRecordingVideo(swiftyCam: SwiftyCamViewController, camera: CameraSelection) {
    this._owner.get().didStartRecording(camera);
  }

  swiftyCamDidChangeZoomLevel(swiftyCam: SwiftyCamViewController, zoom: number) {
    console.log('camera changed zoom to ', zoom);
  }

  swiftyCamDidFinishProcessVideoAt(swiftyCam: SwiftyCamViewController, url: NSURL) {
    this._owner.get().recordingReady(url.path);
  }

  swiftyCamDidFinishRecordingVideo(swiftyCam: SwiftyCamViewController, camera: CameraSelection) {
    this._owner.get().didFinishRecording(camera);
  }

  swiftyCamDidError(swiftyCam: SwiftyCamViewController, error: string) {
    this._owner.get().didError(error);
  }

  swiftyCamDidFocusAtPoint(swiftyCam: SwiftyCamViewController, point: CGPoint) {}

  swiftyCamDidSwitchCurrentCamera(swiftyCam: SwiftyCamViewController, camera: CameraSelection) {
    this._owner.get().didSwitchCamera(camera);
  }

  swiftyCamDidTake(swiftyCam: SwiftyCamViewController, photo: UIImage) {
    this._owner.get().tookPhoto(photo);
  }
}

@NativeClass
export class MySwifty extends SwiftyCamViewController {
  public static ObjCExposedMethods = {
    switchCam: { returns: interop.types.void },
    resetPreview: { returns: interop.types.void },
    savePhoto: { returns: interop.types.void },
    snapPicture: { returns: interop.types.void },
    toggleFlash: { returns: interop.types.void },
    recordVideo: { returns: interop.types.void },
    videoDidFinishSavingWithErrorContextInfo: {
      returns: interop.types.void,
      params: [NSString, NSError, interop.Pointer],
    },
  };
  private _owner: WeakRef<NSCamera>;
  private _snapPicOptions: ICameraOptions;
  public _lastCameraOptions: ICameraOptions[];
  private _enableVideo: boolean;
  private _disablePhoto: boolean;
  private _videoOptions: IVideoOptions;
  private _photoToSave: any;
  private _imageConfirmBg: UIView;
  private _flashEnabled = false;
  private _flashBtn: UIButton;
  private _switchBtn: UIButton;
  public _cameraBtn: SwiftyCamButton;
  private _maxDuration = 3600;
  public _swiftyDelegate: SwiftyDelegate;
  private _resized: boolean;

  public static initWithOwner(owner: WeakRef<NSCamera>, defaultCamera: CameraTypes = 'rear') {
    const ctrl = <MySwifty>MySwifty.alloc().init();
    ctrl._owner = owner;
    // set default camera
    ctrl.defaultCamera = defaultCamera === 'rear' ? CameraSelection.Rear : CameraSelection.Front;
    return ctrl;
  }

  public cleanup() {
    this._swiftyDelegate = null;
  }

  // public set enableVideo(value: boolean) {
  //   this._enableVideo = value;
  // }

  viewDidLoad() {
    super.viewDidLoad();
    const owner = this._owner && this._owner.get();
    if (owner) {
      owner._updateCameraQuality();
    }
    this.view.userInteractionEnabled = true;
    const doubleTapEnabled = this._owner.get().doubleTapCameraSwitch;
    this.doubleTapCameraSwitch = doubleTapEnabled;

    // retain delegate in javascript to ensure garbage collector does not get it
    this._swiftyDelegate = <any>SwiftyDelegate.initWithOwner(new WeakRef(this));
    this.cameraDelegate = this._swiftyDelegate;

    if (this._owner.get().showCaptureIcon) {
      if (this._cameraBtn) this._cameraBtn.removeFromSuperview();
      this._cameraBtn = SwiftyCamButton.alloc().init();
      this._cameraBtn.delegate = this;
      this._cameraBtn.translatesAutoresizingMaskIntoConstraints = false;
      const heightRule = this._cameraBtn.heightAnchor.constraintEqualToConstant(40);
      heightRule.active = true;
      const widthRule = this._cameraBtn.widthAnchor.constraintEqualToConstant(40);
      widthRule.active = true;
      this.view.addSubview(this._cameraBtn);
      this.view.bringSubviewToFront(this._cameraBtn);
      const centerRule = this._cameraBtn.centerXAnchor.constraintEqualToAnchor(this.view.centerXAnchor);
      centerRule.active = true;
      const bottomRule = this._cameraBtn.bottomAnchor.constraintEqualToAnchorConstant(this.view.safeAreaLayoutGuide.bottomAnchor, -40);
      bottomRule.active = true;
    }

    if (this._owner.get().showToggleIcon) {
      if (this._switchBtn) this._switchBtn.removeFromSuperview();
      this._switchBtn = createButton(this, null, null, 'switchCam', null, createIcon('toggle', CGSizeMake(65, 50)));
      this._switchBtn.translatesAutoresizingMaskIntoConstraints = false;
      const widthRule = this._switchBtn.widthAnchor.constraintEqualToConstant(40);
      widthRule.active = true;
      const heightRule = this._switchBtn.heightAnchor.constraintEqualToConstant(40);
      heightRule.active = true;
      //Note: need to add to view first before next 2 constraints, otherwise
      //    compiler complains about invalid references
      this.view.addSubview(this._switchBtn);
      const topRule = this._switchBtn.topAnchor.constraintEqualToAnchorConstant(this.view.topAnchor, 20);
      topRule.active = true;
      const leftRule = this._switchBtn.trailingAnchor.constraintEqualToAnchorConstant(this.view.trailingAnchor, -20);
      leftRule.active = true;
    }

    if (this._owner.get().showFlashIcon) {
      this._flashBtnHandler();
      this.flashEnabled = this._flashEnabled;
    }

    if (this._owner.get().shouldLockRotation) {
      this.setupiOSRotationController();
    }

    //copy over options from xml if set on camera instance
    this._snapPicOptions = {
      confirmPhotos: this._owner.get().confirmPhotos, // from property setter
      confirmRetakeText: this._owner.get().confirmRetakeText,
      confirmSaveText: this._owner.get().confirmSaveText,
      saveToGallery: this._owner.get().saveToGallery,
      autoSquareCrop: this._owner.get().autoSquareCrop,
      quality: this._owner.get().quality,
    };

    this._videoOptions = {
      saveToGallery: this._owner.get().saveToGallery,
      videoQuality: this._owner.get().videoQuality,
      // videoHeight: this._owner.get().videoHeight, //not currently supported
      // videoWidth: this._owner.get().videoWidth,  //not currently supported
      // disableHEVC: this._owner.get().disableHEVC,  //not currently supported
    };

    //update the session quality  based on current videoQuality
    switch (this._owner.get().videoQuality) {
      case CameraVideoQuality.MAX_2160P:
        this.videoQuality = VideoQuality.Resolution3840x2160;
        break;
      case CameraVideoQuality.MAX_1080P:
        this.videoQuality = VideoQuality.Resolution1920x1080;
        break;
      case CameraVideoQuality.MAX_720P:
        this.videoQuality = VideoQuality.Resolution1280x720;
        break;
      case CameraVideoQuality.MAX_480P:
        this.videoQuality = VideoQuality.Resolution640x480;
        break;
      case CameraVideoQuality.HIGHEST:
        this.videoQuality = VideoQuality.High;
        break;
      case CameraVideoQuality.LOWEST:
        this.videoQuality = VideoQuality.Low;
        break;
      case CameraVideoQuality.QVGA:
        this.videoQuality = VideoQuality.Resolution352x288;
        break;
      default:
        this.videoQuality = VideoQuality.Resolution640x480;
        break;
    }
    this.configureSessionQuality();
    this._owner.get().sendEvent(NSCamera.cameraReadyEvent, owner);
  }

  doLayout() {
    const size = this._owner.get().getActualSize();
    const nativeView = this._owner.get().nativeView;
    const frame = nativeView.frame;
    nativeView.frame = CGRectMake(frame.origin.x, frame.origin.y, size.width, size.height);
    nativeView.setNeedsLayout();
  }

  viewDidLayoutSubviews() {
    super.viewDidLayoutSubviews();
  }

  viewDidAppear(animated: boolean) {
    super.viewDidAppear(animated);
  }

  viewWillAppear(animated: boolean) {
    super.viewWillAppear(animated);
  }

  public deviceDidRotate() {
    super.deviceDidRotate();
    if (this.previewLayer && this.previewLayer.videoPreviewLayer) {
      this.previewLayer.videoPreviewLayer.connection.videoOrientation = this.getPreviewLayerOrientation();
    }
  }

  public resize(width?: any, height?: any) {
    if (typeof width !== 'number') {
      width = Screen.mainScreen.widthDIPs;
    }
    if (typeof height !== 'number') {
      height = Screen.mainScreen.heightDIPs;
    }
    this.view.frame = CGRectMake(0, 0, width, height);
    if (!this._resized) {
      this._resized = true;
      this.viewDidAppear(true);
    }
  }

  public snapPicture(options?: ICameraOptions) {
    if (this._enableVideo) {
      console.error('in Video mode, change to photo mode to take a picture!');
      return null;
    }
    if (options) {
      options.confirmPhotos = options.confirmPhotos ? options.confirmPhotos : this._owner.get().confirmPhotos;
      options.confirmRetakeText = options.confirmRetakeText ? options.confirmRetakeText : this._owner.get().confirmRetakeText;
      options.confirmSaveText = options.confirmSaveText ? options.confirmSaveText : this._owner.get().confirmSaveText;
      options.saveToGallery = options.saveToGallery ? options.saveToGallery : this._owner.get().saveToGallery;
      options.autoSquareCrop = options.autoSquareCrop ? options.autoSquareCrop : this._owner.get().autoSquareCrop;
      options.quality = options.quality ? options.quality : this._owner.get().quality;
      this._snapPicOptions = options;
    } else {
      this._snapPicOptions = {
        // read from properties' setters/getters
        confirmPhotos: this._owner.get().confirmPhotos,
        confirmRetakeText: this._owner.get().confirmRetakeText,
        confirmSaveText: this._owner.get().confirmSaveText,
        saveToGallery: this._owner.get().saveToGallery,
        autoSquareCrop: this._owner.get().autoSquareCrop,
        quality: this._owner.get().quality,
      };
    }
    this.takePhoto();
  }

  public recordVideo(options?: IVideoOptions) {
    if (!this._enableVideo) {
      console.error('in Photo mode, change to video mode to take a picture!');
      return null;
    }
    options = {
      saveToGallery: options?.saveToGallery ? options.saveToGallery : this._owner.get().saveToGallery,
      videoQuality: options?.videoQuality ? options.videoQuality : this._owner.get().videoQuality,
    };

    if (this.isRecording) {
      this.stopVideoRecording();
      this._cameraBtn.changeToCircle();
      //unlock rotation
      if (this._owner.get().shouldLockRotation) {
        this.enableRotation();
      }
    } else {
      switch (options ? options.videoQuality : this._owner.get().videoQuality) {
        case CameraVideoQuality.MAX_2160P:
          this.videoQuality = VideoQuality.Resolution3840x2160;
          break;
        case CameraVideoQuality.MAX_1080P:
          this.videoQuality = VideoQuality.Resolution1920x1080;
          break;
        case CameraVideoQuality.MAX_720P:
          this.videoQuality = VideoQuality.Resolution1280x720;
          break;
        case CameraVideoQuality.MAX_480P:
          this.videoQuality = VideoQuality.Resolution640x480;
          break;
        case CameraVideoQuality.HIGHEST:
          this.videoQuality = VideoQuality.High;
          break;
        case CameraVideoQuality.LOWEST:
          this.videoQuality = VideoQuality.Low;
          break;
        case CameraVideoQuality.QVGA:
          this.videoQuality = VideoQuality.Resolution352x288;
          break;
        default:
          this.videoQuality = VideoQuality.Resolution640x480;
          break;
      }

      this._cameraBtn.changeToSquare();
      this.startVideoRecording();

      if (this._owner.get().shouldLockRotation) {
        this.disableRotation();
      }
    }
  }

  public didStartRecording(camera: CameraSelection) {
    // console.log('videoRecordingStarted()');
    this._flashBtn.removeFromSuperview(); //Hide the flash icon since we cannot turn torch on or off during recording
    this._owner.get().sendEvent(NSCamera.videoRecordingStartedEvent, camera);
  }

  public recordingReady(path: string) {
    if ((this._videoOptions && this._videoOptions.saveToGallery) || this._owner.get().saveToGallery) {
      const status = PHPhotoLibrary.authorizationStatus();
      if (status === PHAuthorizationStatus.Authorized) {
        UISaveVideoAtPathToSavedPhotosAlbum(path, this, 'videoDidFinishSavingWithErrorContextInfo', null);
      }
    }
    this._owner.get().sendEvent(NSCamera.videoRecordingReadyEvent, path);
  }

  public didFinishRecording(camera: CameraSelection) {
    // console.log('didFinishRecording()');
    this._flashBtnHandler(); //restore flash icon if camera has flash support
    this._owner.get().sendEvent(NSCamera.videoRecordingFinishedEvent, camera);
  }

  public didError(error: string) {
    this._owner.get().sendEvent(NSCamera.errorEvent, error);
  }

  public videoDidFinishSavingWithErrorContextInfo(path: string, error: NSError, contextInfo: any) {
    if (error) {
      console.error(error);
      return;
    }
  }

  public switchCam() {
    this.switchCamera();
    if (this._owner.get().showFlashIcon) this._flashBtnHandler();
  }

  public didSwitchCamera(camera: CameraSelection) {
    // console.log('didSwitchCamera()');
    this._owner.get().sendEvent(NSCamera.toggleCameraEvent, camera);
  }

  public toggleFlash() {
    this._flashEnabled = !this._flashEnabled;
    this.flashEnabled = this._flashEnabled; // super class behavior
    if (this._owner.get().showFlashIcon) this._flashBtnHandler();
  }

  //handler when an image is returned from native camera code
  public tookPhoto(photo: UIImage) {
    this._photoToSave = photo;
    let options: ICameraOptions = this._snapPicOptions;
    if (!options)
      options = {
        confirmPhotos: this._owner.get().confirmPhotos,
        confirmRetakeText: this._owner.get().confirmRetakeText,
        confirmSaveText: this._owner.get().confirmSaveText,
        saveToGallery: this._owner.get().saveToGallery,
        autoSquareCrop: this._owner.get().autoSquareCrop,
        quality: this._owner.get().quality,
      };
    else {
      options = {
        confirmPhotos: options?.confirmPhotos ? options.confirmPhotos : this._owner.get().confirmPhotos,
        confirmRetakeText: options?.confirmRetakeText ? options.confirmRetakeText : this._owner.get().confirmRetakeText,
        confirmSaveText: options?.confirmSaveText ? options.confirmSaveText : this._owner.get().confirmSaveText,
        saveToGallery: options?.saveToGallery ? options.saveToGallery : this._owner.get().saveToGallery,
        autoSquareCrop: options?.autoSquareCrop ? options.autoSquareCrop : this._owner.get().autoSquareCrop,
        quality: options?.quality ? +options.quality : this._owner.get().quality,
      };
    }
    this._owner.get().CLog('tookPhoto() options:', JSON.stringify(options));
    //iOS only handles autoSquareCrop and confirmPhotos after photo has been returned by native code
    if (this._snapPicOptions && this._snapPicOptions.autoSquareCrop) {
      this._owner.get().CLog('autoSquareCrop set, cropping image');
      const width = photo.size.width;
      const height = photo.size.height;
      let originalWidth = width;
      let originalHeight = height;
      this._owner.get().CLog('Original height: ' + originalHeight + ' width: ' + originalWidth);
      let x = 0;
      let y = 0;
      if (originalWidth < originalHeight) {
        x = (originalHeight - originalWidth) / 2;
        originalHeight = originalWidth;
      } else if (originalWidth > originalHeight) {
        y = (originalWidth - originalHeight) / 2;
        originalWidth = originalHeight;
      }
      const rect: any = CGRectMake(x, y, originalWidth, originalHeight);
      const ref = CGImageCreateWithImageInRect(photo.CGImage, rect);
      this._photoToSave = UIImage.imageWithCGImageScaleOrientation(ref, photo.scale, photo.imageOrientation);
      this._owner.get().CLog('After Crop, height: ' + this._photoToSave.size.height + ' width: ' + this._photoToSave.size.width);
      CGImageRelease(ref);
    }

    if (this._snapPicOptions && this._snapPicOptions.confirmPhotos) {
      this._owner.get().CLog('confirmPic set, showing confirmation dialog');
      // show the confirmation
      const width = this.view.bounds.size.width;
      const height = this.view.bounds.size.height;
      this._imageConfirmBg = UIView.alloc().initWithFrame(CGRectMake(0, 0, width, height));
      this._imageConfirmBg.backgroundColor = UIColor.blackColor;

      // confirm user wants to keep photo
      const imageConfirm = UIImageView.alloc().init();
      imageConfirm.contentMode = UIViewContentMode.ScaleAspectFit;
      imageConfirm.image = this._photoToSave;
      imageConfirm.frame = CGRectMake(0, 50, width, height - 50);

      // add 'Retake' in bottom left and 'Save Photo' in bottom right
      const retakeBtn = createButton(this, CGRectMake(10, 10, 75, 50), this._snapPicOptions.confirmRetakeText ? this._snapPicOptions.confirmRetakeText : 'Retake', 'resetPreview');
      const saveBtn = createButton(this, CGRectMake(width - 170, 10, 150, 50), this._snapPicOptions.confirmSaveText ? this._snapPicOptions.confirmSaveText : 'Save', 'savePhoto', 'right');

      this._imageConfirmBg.addSubview(imageConfirm);
      this._imageConfirmBg.addSubview(retakeBtn);
      this._imageConfirmBg.addSubview(saveBtn);
      this.view.addSubview(this._imageConfirmBg);
      this._owner.get().sendEvent(NSCamera.confirmScreenShownEvent);
    } else {
      this.savePhoto();
      return;
    }
  }

  public resetPreview() {
    if (this._imageConfirmBg) {
      this._imageConfirmBg.removeFromSuperview();
      this._imageConfirmBg = null;
      this._owner.get().sendEvent(NSCamera.confirmScreenDismissedEvent);
    }
  }

  public async savePhoto() {
    if (this._photoToSave) {
      let asset: ImageAsset = new ImageAsset(this._photoToSave); //UIImage
      let outFilepath: string, tempFileName: string, source: ImageSource;
      try {
        source = await ImageSource.fromAsset(asset);
        for (let i = 1; i < 999999999; i++) {
          tempFileName = 'photo-' + i + '.jpg';
          outFilepath = path.join(knownFolders.documents().path, tempFileName);
          if (!File.exists(outFilepath)) break;
        }
        const quality = +this._snapPicOptions.quality;
        const saved = source.saveToFile(outFilepath, 'jpg', quality);
        if (saved) {
          asset = new ImageAsset(outFilepath);
          asset.options.height = source.height;
          asset.options.width = source.width;
        } else {
          this._owner.get().sendEvent(NSCamera.errorEvent, 'ERROR saving image to file at path: ' + outFilepath);
          return;
        }
      } catch (err) {
        this._owner.get().sendEvent(NSCamera.errorEvent, err);
        return;
      }
      if (this._snapPicOptions.saveToGallery) {
        //TODO this is saved at default device scale, so base dimensions will have this multiplier
        //    if we want exact dimensions, need to rescale using native code first
        UIImageWriteToSavedPhotosAlbum(asset.nativeImage, null, null, null);
      }
      // this._owner.get().sendEvent(NSCamera.photoCapturedEvent, asset);
      this._owner.get().sendEvent(NSCamera.photoCapturedEvent, outFilepath);
      this.resetPreview();
    } else {
      this._owner.get().sendEvent(NSCamera.errorEvent, 'ERROR savePhoto() failed, no image to save!');
    }
  }

  public isCameraAvailable() {
    return UIImagePickerController.isSourceTypeAvailable(UIImagePickerControllerSourceType.Camera);
  }

  private _flashBtnHandler() {
    if (this._flashBtn) this._flashBtn.removeFromSuperview();
    //we check for flash instead of torch to support Retina Flash mode for photos
    // videos made with the front camera will show the flash icon, but it won't do anything during recording from front camera, only rear
    if (this.videoDevice && !this.videoDevice.isFlashModeSupported(AVCaptureFlashMode.On)) {
      return;
    }
    this._flashBtn = createButton(this, null, null, 'toggleFlash', null, this.flashEnabled ? createIcon('flash') : createIcon('flashOff'));
    this._flashBtn.translatesAutoresizingMaskIntoConstraints = false;
    const widthRule = this._flashBtn.widthAnchor.constraintEqualToConstant(40);
    widthRule.active = true;
    const heightRule = this._flashBtn.heightAnchor.constraintEqualToConstant(40);
    heightRule.active = true;
    this.view.addSubview(this._flashBtn);
    const topRule = this._flashBtn.topAnchor.constraintEqualToAnchorConstant(this.view.topAnchor, 20);
    topRule.active = true;
    const leftRule = this._flashBtn.leadingAnchor.constraintEqualToAnchorConstant(this.view.leadingAnchor, 20);
    leftRule.active = true;
  }

  /**
   * SwiftyCamButtonDelegate handlers
   */
  public buttonWasTapped() {
    if (this._enableVideo) {
      if (this.isRecording) {
        if (this._owner.get().shouldLockRotation) this.enableRotation();
        this._owner.get().stop();
        this._flashBtnHandler();
      } else {
        if (this._owner.get().shouldLockRotation) this.disableRotation();
        this._owner.get().record();
      }
    } else {
      this._owner.get().takePicture();
    }
  }

  /// Called When UILongPressGestureRecognizer enters UIGestureRecognizerState.began
  public buttonDidBeginLongPress() {
    if (this._enableVideo) {
      if (this._owner.get().shouldLockRotation) this.disableRotation();
      this._owner.get().record();
    }
    // else console.warn('video not enabled, ignoring long press start');
    //TODO: add rapid photo taking support every 200ms or so while button pressed
  }

  /// Called When UILongPressGestureRecognizer enters UIGestureRecognizerState.end
  public buttonDidEndLongPress() {
    if (this._enableVideo) {
      this._owner.get().stop();
      if (this._owner.get().shouldLockRotation) this.enableRotation();
    }
    // else console.warn('video not enabled, ignoring long press end');
  }

  /// Called when the maximum duration is reached
  public longPressDidReachMaximumDuration() {
    if (this._enableVideo) {
      this._owner.get().stop();
      if (this._owner.get().shouldLockRotation) this.enableRotation();
    }
    // else console.warn('video not enabled, ignoring long press max duration');
  }

  /// Sets the maximum duration of the video recording
  public setMaxiumVideoDuration() {
    return this._maxDuration; //1 hour
  }

  /**
   * Orientation utils
   */
  private allowRotation = true;
  private _currentOrientationMask: UIInterfaceOrientationMask;

  /**
   * Sets up the iOS root view controller to handle rotation locks
   */
  private setupiOSRotationController() {
    const curFrame = Frame.topmost();
    if (!curFrame) {
      setTimeout(this.setupiOSRotationController, 100);
      return;
    }
    try {
      let viewController = Application.ios.rootController;

      while (viewController && viewController.presentedViewController) {
        viewController = viewController.presentedViewController;
      }
      this.allowRotation = true;
      const proto = this.findRootPrototype(viewController, 'supportedInterfaceOrientations');

      if (proto === null) {
        console.warn('Unable to find root controller prototype');
        return;
      }

      this.getOrientationMaskForCurrent();
      const that = this;
      Object.defineProperty(proto, 'supportedInterfaceOrientations', {
        get: function () {
          const result = that.allowRotation ? UIInterfaceOrientationMask.AllButUpsideDown : that._currentOrientationMask;
          return result;
        },
        enumerable: true,
        configurable: true,
      });
    } catch (err) {
      console.warn('Unable to setup Rotation', err);
    }
  }

  /**
   * Searchs for a prototype in the prototype chain
   * @param source - Source element
   * @param name - the name of the element
   * @returns {*}
   */
  private findRootPrototype(source, name) {
    let proto = source;
    do {
      proto = Object.getPrototypeOf(proto);
    } while (proto !== null && !proto.hasOwnProperty(name));
    return proto;
  }

  private getOrientationMaskForCurrent(): void {
    this._currentOrientationMask = new DefaultMap({
      [UIDeviceOrientation.LandscapeLeft]: () => UIInterfaceOrientationMask.LandscapeRight,
      [UIDeviceOrientation.LandscapeRight]: () => UIInterfaceOrientationMask.LandscapeLeft,
      [UIDeviceOrientation.PortraitUpsideDown]: () => UIInterfaceOrientationMask.PortraitUpsideDown,
      [UIDeviceOrientation.Portrait]: () => UIInterfaceOrientationMask.Portrait,
      defaultValue: () => this._currentOrientationMask || UIInterfaceOrientationMask.Portrait,
    }).get(UIApplication.sharedApplication.statusBarOrientation as any)();
  }

  /**
   * @function enableRotation
   */
  public enableRotation(): void {
    if (!this._owner.get().shouldLockRotation) return;
    this.allowRotation = true;
    if (+iOSNativeHelper.MajorVersion >= 16) {
      this.updateiOS16Orientations();
    } else {
      UINavigationController.attemptRotationToDeviceOrientation();
    }
  }

  /**
   * @function disableRotation
   */
  public disableRotation(): void {
    if (!this._owner.get().shouldLockRotation) return;
    if (!this.allowRotation) {
      return;
    }

    this.getOrientationMaskForCurrent();
    this.allowRotation = false;
    if (+iOSNativeHelper.MajorVersion >= 16) {
      this.updateiOS16Orientations();
    }
  }

  /**
   * @function updateiOS16Orientations
   * Function to inform iOS16+ of new orientation to apply
   */
  private updateiOS16Orientations(): void {
    let viewController: UIViewController = Application.ios.rootController;
    while (viewController && viewController.presentedViewController) {
      viewController = viewController.presentedViewController;
    }
    viewController.setNeedsUpdateOfSupportedInterfaceOrientations();
    const window: UIWindow = Application.ios.window;
    const windowScene: UIWindowScene = window.windowScene;
    const prefs = new UIWindowSceneGeometryPreferencesIOS({ interfaceOrientations: this._currentOrientationMask });
    windowScene.requestGeometryUpdateWithPreferencesErrorHandler(prefs, null);
  }
}

export class NSCamera extends NSCameraBase {
  // useDeviceOrientation is true by default. Set to false if you DO NOT want photos to have their orientation set to current device orientation
  //     This does not currently affect videos, they always set the device orientation as the orientation metadata.
  public static useDeviceOrientation = true;

  private _swifty: MySwifty;
  private _isIPhoneX: boolean;
  private _defaultCamera: CameraTypes = 'rear';
  private _enableVideo: boolean;

  // @ts-ignore
  get defaultCamera() {
    return this._defaultCamera ? this._defaultCamera : 'rear';
  }

  set defaultCamera(value: CameraTypes) {
    this._defaultCamera = value;
    if (this._swifty) {
      this._swifty.defaultCamera = value === 'rear' ? CameraSelection.Rear : CameraSelection.Front;
      if (this._swifty.currentCamera != this._swifty.defaultCamera) {
        this._swifty.switchCamera();
        if (this._swifty.currentCamera != this._swifty.defaultCamera) {
          this.CError('Uhoh, after switch still not the same camera as defaultCamera!');
        }
      }
    }
  }
  constructor() {
    super();
    this._onLayoutChangeListener = this._onLayoutChangeFn.bind(this);
    this._swifty = MySwifty.initWithOwner(new WeakRef(this), this.defaultCamera);
    this._swifty.shouldUseDeviceOrientation = NSCamera.useDeviceOrientation;
    this._detectDevice(); //TODO: is this still useful?
  }

  // @ts-ignore
  get enableVideo(): boolean {
    if (this._swifty) {
      return this._swifty.getEnableVideo();
    } else {
      console.warn('No native camera instance, returning local value', this._enableVideo);
      return this._enableVideo;
    }
  }

  set enableVideo(value: boolean) {
    try {
      console.log('set enableVideo', value, typeof value);
      if (typeof value != 'boolean') {
        console.warn('Passing a non-boolean to set enableVideo!');
        value = value === 'true';
      }
      if (this._swifty) {
        if (this._swifty.getEnableVideo() == value) {
          console.warn('already in mode, ignoring', this._swifty.getEnableVideo());
        } else {
          this._swifty.setEnableVideoWithValue(value);
          console.warn('Changing mode', value);
          if (this._swifty.isRecording && !value) {
            console.warn('Currently recording, cannot change mode!');
          }
        }
      } else {
        console.error('no native camera to set enableVideo');
      }
    } catch (err) {
      console.error('set enableVideo ERROR', err);
    }
    this._enableVideo = value;
  }

  private isVideoEnabled() {
    return this.enableVideo === true; //|| NSCamera.enableVideo;
  }

  createNativeView() {
    this._swifty.setEnableVideoWithValue(this.isVideoEnabled());
    this._swifty.view.autoresizingMask = UIViewAutoresizing.FlexibleWidth | UIViewAutoresizing.FlexibleHeight;
    return this._swifty.view;
  }

  _updateCameraQuality() {
    if (this._swifty) {
      switch (this._pictureQuality) {
        case '3840x2160':
          this._swifty.videoQuality = VideoQuality.Resolution3840x2160;
          this._pictureQuality = '3840x2160';
          break;
        case '1920x1080':
          this._swifty.videoQuality = VideoQuality.Resolution1920x1080;
          this._pictureQuality = '1920x1080';
          break;
        case '1280x720':
          this._swifty.videoQuality = VideoQuality.Resolution1280x720;
          this._pictureQuality = '1280x720';
          break;
        case '640x480':
          this._swifty.videoQuality = VideoQuality.Resolution640x480;
          this._pictureQuality = '640x480';
          break;
        case '352x288':
          this._swifty.videoQuality = VideoQuality.Resolution352x288;
          this._pictureQuality = '352x288';
          break;
        case 'Medium':
          this._swifty.videoQuality = VideoQuality.Medium;
          this._pictureQuality = 'Medium';
          break;
        case 'Low':
          this._swifty.videoQuality = VideoQuality.Low;
          this._pictureQuality = 'Low';
          break;
        default:
          this._swifty.videoQuality = VideoQuality.High;
          this._pictureQuality = 'High';
          break;
      }
    }
  }

  private _pictureQuality = 'High';

  // @ts-ignore
  get zoom(): number {
    return this._swifty ? this._swifty.getZoom() : 0;
  }

  //iOS zoom starts at 1.0 to maxZoom for camera, so we will use the zoom float value to scale and the camera zoom between 1 - maxZoom
  set zoom(value: number) {
    console.log('set zoom', value);
    if (typeof value !== 'number') {
      console.warn('set zoom value is not a number! casting');
      value = +value;
    }
    if (this._swifty) {
      if (this._swifty.currentCamera == CameraSelection.Front) {
        console.warn('iOS front cameras do not support zoom');
      } else this._swifty.setZoomWithValue(value);
    } else console.error('no native camera to set zoom');
  }

  private _onLayoutChangeFn(args) {
    const size = this.getActualSize();
    const frame = this._swifty.view.frame;
    this._swifty.view.frame = CGRectMake(frame.origin.x, frame.origin.y, size.width, size.height);
    this._swifty.previewLayer.frame = CGRectMake(frame.origin.x, frame.origin.y, size.width, size.height);
    this._swifty.view.setNeedsLayout();
    this._swifty.previewLayer.setNeedsLayout();
  }

  private _onLayoutChangeListener: any;

  initNativeView() {
    this.on(View.layoutChangedEvent, this._onLayoutChangeListener);
    this._updateCameraQuality();
    this._swifty.viewWillAppear(true);
  }

  disposeNativeView() {
    this._swifty.cleanup();
    this.off(View.layoutChangedEvent, this._onLayoutChangeListener);
    super.disposeNativeView();
  }

  onLoaded() {
    super.onLoaded();
    //TODO: hackalicious, do this properly
    this._swifty.viewDidAppear(true);
  }

  onUnloaded() {
    if (this._swifty.isRecording) {
      this._swifty.stopVideoRecording();
    }
    //TODO: hackalicious, do this properly
    this._swifty.viewDidDisappear(true);
    super.onUnloaded();
  }

  public get isIPhoneX() {
    return this._isIPhoneX;
  }

  /**
   * Toggle Camera front/back
   */
  public toggleCamera() {
    this._swifty.switchCam();
  }

  /**
   * Toggle flash mode
   */
  public toggleFlash() {
    this._swifty.toggleFlash();
  }

  /**
   * Return the current flash mode (either 'on' or 'off' for iOS)
   */
  public getFlashMode(): 'on' | 'off' {
    return this._swifty.flashEnabled ? 'on' : 'off';
  }

  /**
   * Snap photo and display confirm save
   */
  public takePicture(options?: ICameraOptions): void {
    options = {
      confirmPhotos: options?.confirmPhotos ? options.confirmPhotos : this.confirmPhotos,
      confirmRetakeText: options?.confirmRetakeText ? options.confirmRetakeText : this.confirmRetakeText,
      confirmSaveText: options?.confirmSaveText ? options.confirmSaveText : this.confirmSaveText,
      saveToGallery: options?.saveToGallery ? options.saveToGallery : this.saveToGallery,
      autoSquareCrop: options?.autoSquareCrop ? options.autoSquareCrop : this.autoSquareCrop,
      quality: options?.quality ? +options.quality : this.quality,
    };
    this._updateCameraQuality();
    this._swifty.snapPicture(options);
  }

  /**
   * Record video
   */
  public record(options?: IVideoOptions): Promise<any> {
    this._swifty.recordVideo(options);
    this._swifty._cameraBtn.changeToSquare();
    if (this.shouldLockRotation) this._swifty.disableRotation();
    return Promise.resolve();
  }

  /**
   * Check if current camera has a flash.
   * Note: iOS will use flash for photos, and torch for videos. Front cameras don't have torches, only rear cameras.
   *        iPhone models 6s or newer have Flash Retina mode which emulates a front flash by showing a bright white screen for photos.
   *        For videos, it will not have any hardware or software support for torch/flash on front cameras, only rear.
   * @returns true if camera has a flash, false if not
   */
  public hasFlash(): boolean {
    console.log('hasFlash?', this._swifty.videoDevice.hasFlash, 'hasTorch?', this._swifty.videoDevice.hasTorch);
    return this._swifty.videoDevice.hasFlash;
  }

  /**
   * Check if current camera has a torch.
   * Note: iOS will use flash for photos, and torch for videos. Front cameras don't have torches, only rear cameras.
   *        iPhone models 6s or newer have Flash Retina mode which emulates a front flash by showing a bright white screen for photos.
   *        For videos, it will not have any hardware or software support for torch/flash on front cameras, only rear.
   * @returns true if camera has a torch, false if not
   */
  public hasTorch(): boolean {
    console.log('hasFlash?', this._swifty.videoDevice.hasFlash, 'hasTorch?', this._swifty.videoDevice.hasTorch);
    return this._swifty.videoDevice.hasTorch;
  }

  /**
   * Gets the number of cameras on a device.
   * NOTE: this should be called after the cameraReadyEvent has been received to ensure the camera component has initialized
   */
  public getNumberOfCameras(): number {
    return this._swifty?.getNumberOfCameras() || 0;
  }

  /**
   * Stop recording video
   */
  public stop(): void {
    this._swifty.stopVideoRecording();
    this._swifty._cameraBtn.changeToCircle();
    if (this.shouldLockRotation) this._swifty.enableRotation();
  }

  /**
   * Gets current camera selection
   */
  public getCurrentCamera(): 'front' | 'rear' {
    const cam = this._swifty.currentCamera;
    if (cam === CameraSelection.Front) {
      return 'front';
    } else {
      return 'rear';
    }
  }

  /**
   * Is camera available for use
   */
  public isCameraAvailable() {
    return this._swifty.isCameraAvailable();
  }

  private _detectDevice() {
    if (typeof this._isIPhoneX === 'undefined') {
      const _SYS_NAMELEN = 256;

      /* tslint:disable-next-line: no-any */
      const buffer: any = interop.alloc(5 * _SYS_NAMELEN);
      uname(buffer);
      let name: string = NSString.stringWithUTF8String(buffer.add(_SYS_NAMELEN * 4)).toString();
      // Get machine name for Simulator
      if (name === 'x86_64' || name === 'i386') {
        name = NSProcessInfo.processInfo.environment.objectForKey('SIMULATOR_MODEL_IDENTIFIER');
      }
      // this.CLog('isIPhoneX name:', name);
      const parts = name.toLowerCase().split('iphone');
      if (parts && parts.length > 1) {
        const versionNumber = parseInt(parts[1]);
        if (!isNaN(versionNumber)) {
          // all above or greater than 11 are X devices
          this._isIPhoneX = versionNumber >= 11;
        }
      }
      if (!this._isIPhoneX) {
        // consider iphone x global and iphone x gsm
        this._isIPhoneX = name.indexOf('iPhone10,3') === 0 || name.indexOf('iPhone10,6') === 0;
      }
    }
  }

  /*
   * Merge an array of video filenames, must all be valid mp4 format video files with same audio encoding
   */
  public mergeVideoFiles(inputFiles: string[], outputPath: string): Promise<File> {
    return new Promise((resolve, reject) => {
      if (!inputFiles || inputFiles.length <= 0) return reject('inputFiles is empty!');
      if (!outputPath) return reject('outputPath should be a valid path string');

      if (File.exists(outputPath)) {
        // remove file if it exists
        File.fromPath(outputPath).removeSync(err => {
          return reject('Unable to remove existing file!' + err.message);
        });
      }

      if (inputFiles.length == 1) {
        const suc = NSFileManager.defaultManager.copyItemAtPathToPathError(inputFiles[0], outputPath);
        if (!suc) {
          return reject('Unable to copy file!');
        }
        return resolve(File.fromPath(outputPath));
      }

      const composition = AVMutableComposition.new();
      const audioTrack: AVMutableCompositionTrack = composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeAudio, kCMPersistentTrackID_Invalid);
      const videoTrack: AVMutableCompositionTrack = composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeVideo, kCMPersistentTrackID_Invalid);
      let currentTime = kCMTimeZero;
      let size: CGSize = CGSizeZero;
      let highestFrameRate = 0;
      let haveError = false;

      for (let i = 0; i < inputFiles.length; i++) {
        const options = NSDictionary.dictionaryWithObjectForKey(true, AVURLAssetPreferPreciseDurationAndTimingKey);
        const asset = AVURLAsset.URLAssetWithURLOptions(NSURL.fileURLWithPath(inputFiles[i]), options);
        const videoAsset = asset.tracksWithMediaType(AVMediaTypeVideo).objectAtIndex(0);
        const audioAsset = asset.tracksWithMediaType(AVMediaTypeAudio).objectAtIndex(0);
        if (!audioAsset || !videoAsset) {
          this.CError('Unable to find audio or video track for current asset, quitting!');
          haveError = true;
          return;
        }

        size = videoAsset.naturalSize;
        const currentFrameRate = videoAsset.nominalFrameRate;
        highestFrameRate = currentFrameRate > highestFrameRate ? currentFrameRate : highestFrameRate;
        const trimmingTime: CMTime = CMTimeMake(lround(videoAsset.naturalTimeScale / videoAsset.nominalFrameRate), videoAsset.naturalTimeScale);
        const timeRange: CMTimeRange = CMTimeRangeMake(trimmingTime, CMTimeSubtract(videoAsset.timeRange.duration, trimmingTime));
        const videoResult = videoTrack.insertTimeRangeOfTrackAtTimeError(timeRange, videoAsset, currentTime);
        const audioResult = audioTrack.insertTimeRangeOfTrackAtTimeError(timeRange, audioAsset, currentTime);
        if (!videoResult || !audioResult) {
          this.CError('Unable to insert audio or video track, quitting!');
          haveError = true;
          return;
        }
        if (i == 0) videoTrack.preferredTransform = videoAsset.preferredTransform;
        const a = videoTrack.preferredTransform;
        const b = videoAsset.preferredTransform;
        if (a.a != b.a || a.b != b.b || a.c != b.c || a.d != b.d) {
          this.CError('WARNING! Segment transforms do not match! merging without matching segment orientations requires transform/layer/composition processing');
        }

        currentTime = CMTimeAdd(currentTime, timeRange.duration);
      }

      if (haveError) return reject('Error during track extraction');

      const videoCompositionInstruction: AVMutableVideoCompositionInstruction = AVMutableVideoCompositionInstruction.videoCompositionInstruction(); //new AVMutableVideoCompositionInstruction({ coder: null });
      videoCompositionInstruction.timeRange = CMTimeRangeMake(kCMTimeZero, currentTime);

      const outputUrl = NSURL.fileURLWithPath(outputPath);
      const exportSession = new AVAssetExportSession({ asset: composition, presetName: AVAssetExportPresetPassthrough });
      exportSession.outputFileType = AVFileTypeMPEG4;
      exportSession.outputURL = outputUrl;
      exportSession.shouldOptimizeForNetworkUse = true;

      const passThroughInstruction = AVMutableVideoCompositionInstruction.videoCompositionInstruction();
      passThroughInstruction.timeRange = CMTimeRangeMake(kCMTimeZero, currentTime);
      const passThroughLayer = AVMutableVideoCompositionLayerInstruction.videoCompositionLayerInstructionWithAssetTrack(videoTrack);
      passThroughInstruction.layerInstructions = NSArray.arrayWithArray([passThroughLayer]);

      const mutableVideoComposition: AVMutableVideoComposition = AVMutableVideoComposition.videoComposition();
      mutableVideoComposition.frameDuration = CMTimeMake(1, highestFrameRate);
      mutableVideoComposition.instructions = NSArray.arrayWithArray([passThroughInstruction]);
      mutableVideoComposition.renderSize = size;
      mutableVideoComposition.frameDuration = CMTimeMake(1, 30);
      exportSession.videoComposition = mutableVideoComposition;

      exportSession.exportAsynchronouslyWithCompletionHandler(() => {
        switch (exportSession.status) {
          case AVAssetExportSessionStatus.Failed:
            // this.CError('failed (assetExport?.error)', exportSession.error);
            reject(exportSession.error);
            break;
          case AVAssetExportSessionStatus.Cancelled:
            break;
          case AVAssetExportSessionStatus.Unknown:
            break;
          case AVAssetExportSessionStatus.Waiting:
            break;
          case AVAssetExportSessionStatus.Exporting:
            break;
          case AVAssetExportSessionStatus.Completed:
            const status = PHPhotoLibrary.authorizationStatus();
            if (status === PHAuthorizationStatus.Authorized) {
              UISaveVideoAtPathToSavedPhotosAlbum(outputPath, this, null, null);
            } else this.CLog('Not authorized for gallery access, cannot save!!!');
            resolve(File.fromPath(outputPath));
            break;
        }
      });
    });
  }
}

const createButton = function (target: any, frame: CGRect, label: string, eventName: string, align?: string, img?: UIImage, imgSelected?: UIImage): UIButton {
  let btn: UIButton;
  if (frame) {
    btn = UIButton.alloc().initWithFrame(frame);
  } else {
    btn = UIButton.alloc().init();
  }
  if (label) {
    btn.setTitleForState(label, UIControlState.Normal);
    btn.setTitleColorForState(new Color('#fff').ios, UIControlState.Normal);
    btn.titleLabel.font = UIFont.systemFontOfSize(19);
  } else if (img) {
    btn.setImageForState(img, UIControlState.Normal);
    if (imgSelected) {
      btn.setImageForState(img, UIControlState.Highlighted);
      btn.setImageForState(img, UIControlState.Selected);
    }
  }
  if (align) {
    btn.contentHorizontalAlignment = align === 'right' ? UIControlContentHorizontalAlignment.Right : UIControlContentHorizontalAlignment.Left;
  }
  if (eventName) {
    btn.addTargetActionForControlEvents(target, eventName, UIControlEvents.TouchUpInside);
  }
  return btn;
};

const createIcon = function (type: 'flash' | 'flashOff' | 'toggle' | 'picOutline' | 'takePic' | 'gallery', size?: CGSize, color?: string) {
  switch (type) {
    case 'flash':
      UIGraphicsBeginImageContextWithOptions(size || CGSizeMake(50, 50), false, 0);
      drawFlash(color);
      break;
    case 'flashOff':
      UIGraphicsBeginImageContextWithOptions(size || CGSizeMake(50, 50), false, 0);
      drawFlashOff(color);
      break;
    case 'toggle':
      UIGraphicsBeginImageContextWithOptions(size || CGSizeMake(50, 50), false, 0);
      drawToggle(color);
      break;
    case 'picOutline':
      UIGraphicsBeginImageContextWithOptions(size || CGSizeMake(50, 50), false, 0);
      drawPicOutline(color);
      break;
    case 'takePic':
      UIGraphicsBeginImageContextWithOptions(size || CGSizeMake(50, 50), false, 0);
      drawCircle(color);
      break;
  }
  const img = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  return img;
};

const drawFlash = function (color: string) {
  const iconColor = new Color(color || '#fff').ios;

  //// Bezier Drawing
  const bezierPath = UIBezierPath.bezierPath();
  bezierPath.moveToPoint(CGPointMake(23.17, 0.58));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(11.19, 13.65), CGPointMake(22.79, 0.97), CGPointMake(17.38, 6.83));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(0, 26.66), CGPointMake(3.2, 22.41), CGPointMake(-0.07, 26.24));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(6.91, 27.44), CGPointMake(0.1, 27.26), CGPointMake(0.34, 27.29));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(13.61, 28.15), CGPointMake(13.34, 27.58), CGPointMake(13.71, 27.61));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(10.61, 37.07), CGPointMake(13.54, 28.45), CGPointMake(12.18, 32.46));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(7.83, 45.92), CGPointMake(9.02, 41.64), CGPointMake(7.76, 45.62));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(8.85, 46.43), CGPointMake(7.89, 46.25), CGPointMake(8.27, 46.43));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(21.54, 33.48), CGPointMake(9.59, 46.43), CGPointMake(11.36, 44.63));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(33.2, 19.87), CGPointMake(30.18, 23.97), CGPointMake(33.27, 20.35));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(26.57, 19.12), CGPointMake(33.1, 19.21), CGPointMake(33, 19.21));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(20, 18.67), CGPointMake(21.71, 19.06), CGPointMake(20, 18.94));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(22.76, 9.88), CGPointMake(20, 18.49), CGPointMake(21.23, 14.52));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(25.38, 0.73), CGPointMake(24.26, 5.21), CGPointMake(25.45, 1.12));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(23.17, 0.58), CGPointMake(25.24, -0.17), CGPointMake(24.05, -0.26));
  bezierPath.miterLimit = 4;
  bezierPath.closePath();
  iconColor.setFill();
  bezierPath.fill();
};

const drawFlashOff = function (color: string) {
  const iconColor = new Color(color || '#fff').ios;

  //// Bezier Drawing
  const bezierPath = UIBezierPath.bezierPath();
  bezierPath.moveToPoint(CGPointMake(21.13, 4.5));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(15.1, 12.28), CGPointMake(19.18, 7.01), CGPointMake(16.45, 10.51));
  bezierPath.addLineToPoint(CGPointMake(12.66, 15.45));
  bezierPath.addLineToPoint(CGPointMake(7.09, 9.64));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(0.8, 3.9), CGPointMake(2.5, 4.82), CGPointMake(1.41, 3.84));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(0, 4.73), CGPointMake(0.29, 3.96), CGPointMake(0.06, 4.2));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(17.83, 24.13), CGPointMake(-0.06, 5.36), CGPointMake(2.7, 8.39));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(36.44, 42.69), CGPointMake(32.87, 39.81), CGPointMake(35.86, 42.78));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(37.21, 41.88), CGPointMake(36.89, 42.63), CGPointMake(37.15, 42.36));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(31.64, 35.24), CGPointMake(37.3, 41.28), CGPointMake(36.29, 40.11));
  bezierPath.addLineToPoint(CGPointMake(25.98, 29.31));
  bezierPath.addLineToPoint(CGPointMake(29.34, 24.94));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(32.62, 19.91), CGPointMake(31.76, 21.83), CGPointMake(32.67, 20.39));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(27.02, 19.16), CGPointMake(32.53, 19.25), CGPointMake(32.44, 19.25));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(21.48, 18.71), CGPointMake(22.91, 19.1), CGPointMake(21.48, 18.98));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(23.8, 9.91), CGPointMake(21.48, 18.53), CGPointMake(22.51, 14.55));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(26.01, 0.75), CGPointMake(25.07, 5.24), CGPointMake(26.07, 1.14));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(25.3, 0.01), CGPointMake(25.96, 0.34), CGPointMake(25.7, 0.07));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(21.13, 4.5), CGPointMake(24.81, -0.08), CGPointMake(23.97, 0.84));
  bezierPath.miterLimit = 4;
  bezierPath.closePath();
  iconColor.setFill();
  bezierPath.fill();

  // other half
  const bezier2Path = UIBezierPath.bezierPath();
  bezier2Path.moveToPoint(CGPointMake(7.18, 22.6));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(4.59, 26.7), CGPointMake(5.43, 24.91), CGPointMake(4.54, 26.32));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(10.42, 27.48), CGPointMake(4.68, 27.3), CGPointMake(4.91, 27.33));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(16.08, 28.2), CGPointMake(15.85, 27.63), CGPointMake(16.17, 27.66));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(13.55, 37.12), CGPointMake(16.02, 28.5), CGPointMake(14.87, 32.51));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(11.2, 45.98), CGPointMake(12.2, 41.7), CGPointMake(11.14, 45.68));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(12.06, 46.49), CGPointMake(11.26, 46.31), CGPointMake(11.57, 46.49));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(18.06, 39.67), CGPointMake(12.69, 46.49), CGPointMake(13.61, 45.47));
  bezier2Path.addLineToPoint(CGPointMake(23.29, 32.81));
  bezier2Path.addLineToPoint(CGPointMake(16.71, 25.96));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(9.99, 19.1), CGPointMake(13.09, 22.19), CGPointMake(10.08, 19.1));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(7.18, 22.6), CGPointMake(9.91, 19.1), CGPointMake(8.64, 20.69));
  bezier2Path.miterLimit = 4;
  bezier2Path.closePath();
  iconColor.setFill();
  bezier2Path.fill();
};

const drawToggle = function (color: string) {
  const iconColor = new Color(color || '#fff').ios;

  //// Bezier Drawing
  const bezierPath = UIBezierPath.bezierPath();
  bezierPath.moveToPoint(CGPointMake(17.91, 3.03));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(14.69, 6.2), CGPointMake(16.11, 5.72), CGPointMake(15.7, 6.1));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(13.41, 5.51), CGPointMake(13.75, 6.31), CGPointMake(13.52, 6.17));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(9.1, 4.6), CGPointMake(13.3, 4.74), CGPointMake(13.15, 4.7));
  bezierPath.addLineToPoint(CGPointMake(4.87, 4.5));
  bezierPath.addLineToPoint(CGPointMake(4.87, 5.4));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(3.37, 6.27), CGPointMake(4.87, 6.2), CGPointMake(4.72, 6.27));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(0.94, 7.14), CGPointMake(2.25, 6.27), CGPointMake(1.61, 6.52));
  bezierPath.addLineToPoint(CGPointMake(0, 7.98));
  bezierPath.addLineToPoint(CGPointMake(0, 26.59));
  bezierPath.addLineToPoint(CGPointMake(0, 45.2));
  bezierPath.addLineToPoint(CGPointMake(0.97, 46.04));
  bezierPath.addLineToPoint(CGPointMake(1.95, 46.88));
  bezierPath.addLineToPoint(CGPointMake(31.88, 46.88));
  bezierPath.addLineToPoint(CGPointMake(61.81, 46.88));
  bezierPath.addLineToPoint(CGPointMake(62.83, 45.9));
  bezierPath.addLineToPoint(CGPointMake(63.88, 44.96));
  bezierPath.addLineToPoint(CGPointMake(63.88, 26.52));
  bezierPath.addLineToPoint(CGPointMake(63.88, 8.09));
  bezierPath.addLineToPoint(CGPointMake(62.98, 7.18));
  bezierPath.addLineToPoint(CGPointMake(62.08, 6.27));
  bezierPath.addLineToPoint(CGPointMake(55.03, 6.27));
  bezierPath.addLineToPoint(CGPointMake(48.03, 6.27));
  bezierPath.addLineToPoint(CGPointMake(45.89, 3.14));
  bezierPath.addLineToPoint(CGPointMake(43.76, 0));
  bezierPath.addLineToPoint(CGPointMake(31.84, 0));
  bezierPath.addLineToPoint(CGPointMake(19.93, 0));
  bezierPath.addLineToPoint(CGPointMake(17.91, 3.03));
  bezierPath.closePath();
  bezierPath.moveToPoint(CGPointMake(44.92, 4.6));
  bezierPath.addLineToPoint(CGPointMake(46.94, 7.67));
  bezierPath.addLineToPoint(CGPointMake(54.13, 7.67));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(61.74, 8.09), CGPointMake(59.19, 7.67), CGPointMake(61.44, 7.81));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(61.74, 44.89), CGPointMake(62.38, 8.68), CGPointMake(62.38, 44.3));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(1.95, 44.89), CGPointMake(61.1, 45.48), CGPointMake(2.58, 45.48));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(1.5, 26.63), CGPointMake(1.61, 44.57), CGPointMake(1.5, 40.04));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(2.1, 8.22), CGPointMake(1.5, 10.84), CGPointMake(1.57, 8.71));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(9.74, 7.67), CGPointMake(2.58, 7.77), CGPointMake(3.82, 7.67));
  bezierPath.addLineToPoint(CGPointMake(16.78, 7.67));
  bezierPath.addLineToPoint(CGPointMake(17.65, 6.34));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(19.74, 3.21), CGPointMake(18.13, 5.65), CGPointMake(19.07, 4.22));
  bezierPath.addLineToPoint(CGPointMake(21.02, 1.39));
  bezierPath.addLineToPoint(CGPointMake(31.96, 1.46));
  bezierPath.addLineToPoint(CGPointMake(42.86, 1.57));
  bezierPath.addLineToPoint(CGPointMake(44.92, 4.6));
  bezierPath.miterLimit = 4;
  bezierPath.closePath();
  iconColor.setFill();
  bezierPath.fill();

  //// Bezier 2 Drawing
  const bezier2Path = UIBezierPath.bezierPath();
  bezier2Path.moveToPoint(CGPointMake(28.28, 11.26));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(21.77, 14.43), CGPointMake(26.11, 11.78), CGPointMake(22.85, 13.38));
  bezier2Path.addLineToPoint(CGPointMake(21.02, 15.16));
  bezier2Path.addLineToPoint(CGPointMake(22.1, 16.38));
  bezier2Path.addLineToPoint(CGPointMake(23.19, 17.6));
  bezier2Path.addLineToPoint(CGPointMake(24.24, 16.69));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(31.84, 14.11), CGPointMake(26.41, 14.78), CGPointMake(28.4, 14.11));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(36.79, 14.95), CGPointMake(34.43, 14.11), CGPointMake(35.37, 14.29));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(42.56, 20.32), CGPointMake(39.22, 16.03), CGPointMake(41.47, 18.16));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(41.21, 23.35), CGPointMake(43.94, 23.14), CGPointMake(43.87, 23.35));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(38.96, 23.52), CGPointMake(39.97, 23.35), CGPointMake(38.96, 23.42));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(45.33, 30.84), CGPointMake(38.96, 23.87), CGPointMake(45.03, 30.84));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(51.7, 23.56), CGPointMake(45.67, 30.84), CGPointMake(51.7, 23.94));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(49.3, 23.35), CGPointMake(51.7, 23.45), CGPointMake(50.61, 23.35));
  bezier2Path.addLineToPoint(CGPointMake(46.9, 23.35));
  bezier2Path.addLineToPoint(CGPointMake(46.64, 21.96));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(38.03, 12.16), CGPointMake(45.93, 18.09), CGPointMake(42.41, 14.05));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(28.28, 11.26), CGPointMake(35.18, 10.91), CGPointMake(31.24, 10.56));
  bezier2Path.miterLimit = 4;
  bezier2Path.closePath();
  iconColor.setFill();
  bezier2Path.fill();

  //// Bezier 3 Drawing
  const bezier3Path = UIBezierPath.bezierPath();
  bezier3Path.moveToPoint(CGPointMake(15.14, 20.91));
  bezier3Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(12.06, 24.74), CGPointMake(13.52, 22.83), CGPointMake(12.14, 24.54));
  bezier3Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(14.35, 25.09), CGPointMake(11.99, 24.95), CGPointMake(12.89, 25.09));
  bezier3Path.addLineToPoint(CGPointMake(16.75, 25.09));
  bezier3Path.addLineToPoint(CGPointMake(16.97, 27.08));
  bezier3Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(21.35, 34.99), CGPointMake(17.27, 29.76), CGPointMake(19.03, 33));
  bezier3Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(41.81, 35.41), CGPointMake(27.24, 40.11), CGPointMake(36.11, 40.29));
  bezier3Path.addLineToPoint(CGPointMake(43.46, 33.98));
  bezier3Path.addLineToPoint(CGPointMake(42.41, 32.83));
  bezier3Path.addLineToPoint(CGPointMake(41.36, 31.68));
  bezier3Path.addLineToPoint(CGPointMake(40.01, 32.86));
  bezier3Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(31.84, 35.72), CGPointMake(37.58, 34.99), CGPointMake(35.48, 35.72));
  bezier3Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(26.82, 34.89), CGPointMake(29.22, 35.72), CGPointMake(28.32, 35.58));
  bezier3Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(20.31, 26.91), CGPointMake(23.34, 33.28), CGPointMake(21.02, 30.43));
  bezier3Path.addLineToPoint(CGPointMake(19.97, 25.09));
  bezier3Path.addLineToPoint(CGPointMake(22.37, 25.09));
  bezier3Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(24.58, 24.57), CGPointMake(24.39, 25.09), CGPointMake(24.76, 24.99));
  bezier3Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(18.36, 17.43), CGPointMake(24.28, 23.84), CGPointMake(18.69, 17.43));
  bezier3Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(15.14, 20.91), CGPointMake(18.21, 17.43), CGPointMake(16.78, 18.99));
  bezier3Path.miterLimit = 4;
  bezier3Path.closePath();
  iconColor.setFill();
  bezier3Path.fill();
};

const drawPicOutline = function (color: string) {
  const iconColor = new Color(color || '#fff').ios;

  //// Bezier Drawing
  // Outer ring
  const bezierPath = UIBezierPath.bezierPath();
  bezierPath.moveToPoint(CGPointMake(17.13, 0.63));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(6.13, 7.21), CGPointMake(12.82, 1.77), CGPointMake(9.31, 3.87));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(0.91, 15.85), CGPointMake(3.7, 9.79), CGPointMake(2.11, 12.44));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(0, 23.21), CGPointMake(0.1, 18.27), CGPointMake(0, 18.86));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(0.91, 30.58), CGPointMake(0, 27.57), CGPointMake(0.1, 28.19));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(14.02, 44.75), CGPointMake(3.11, 36.93), CGPointMake(8.01, 42.2));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(31.73, 44.75), CGPointMake(19.37, 47.05), CGPointMake(26.38, 47.05));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(44.84, 30.58), CGPointMake(37.74, 42.2), CGPointMake(42.64, 36.93));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(45.75, 23.21), CGPointMake(45.65, 28.19), CGPointMake(45.75, 27.57));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(44.84, 15.85), CGPointMake(45.75, 18.86), CGPointMake(45.65, 18.24));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(28, 0.46), CGPointMake(42.15, 8.12), CGPointMake(35.82, 2.33));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(17.13, 0.63), CGPointMake(25.15, -0.22), CGPointMake(20.02, -0.13));
  bezierPath.closePath();
  bezierPath.moveToPoint(CGPointMake(27.39, 4.39));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(42.02, 23.21), CGPointMake(35.82, 6.42), CGPointMake(42.02, 14.38));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(31.77, 40.33), CGPointMake(42.02, 30.35), CGPointMake(38, 37.06));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(9.38, 36.8), CGPointMake(24.21, 44.26), CGPointMake(15.48, 42.92));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(5.87, 14.28), CGPointMake(3.37, 30.84), CGPointMake(2.01, 22.04));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(18.2, 4.42), CGPointMake(8.14, 9.76), CGPointMake(13.3, 5.6));
  bezierPath.addCurveToPointControlPoint1ControlPoint2(CGPointMake(27.39, 4.39), CGPointMake(20.73, 3.8), CGPointMake(24.82, 3.8));
  bezierPath.miterLimit = 4;
  bezierPath.closePath();
  iconColor.setFill();
  bezierPath.fill();

  // inner circle
  // let bezier2Path = UIBezierPath.bezierPath();
  // bezier2Path.moveToPoint(CGPointMake(17.88, 0.51));
  // bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(0, 23.08), CGPointMake(7.47, 3.09), CGPointMake(0.04, 12.49));
  // bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(17.83, 45.25), CGPointMake(0, 33.39), CGPointMake(7.47, 42.66));
  // bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(40.08, 39.13), CGPointMake(25.81, 47.22), CGPointMake(34.2, 44.92));
  // bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(47, 22.84), CGPointMake(44.9, 34.41), CGPointMake(47, 29.4));
  // bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(31.6, 1.29), CGPointMake(47, 13.03), CGPointMake(41.08, 4.82));
  // bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(17.88, 0.51), CGPointMake(27.99, -0.07), CGPointMake(21.65, -0.4));
  // bezier2Path.miterLimit = 4;
  // bezier2Path.closePath();
  // iconColor.setFill();
  // bezier2Path.fill();
};

const drawCircle = function (color: string) {
  const iconColor = new Color(color || '#fff').ios;

  // inner circle
  const bezier2Path = UIBezierPath.bezierPath();
  bezier2Path.moveToPoint(CGPointMake(17.88, 0.51));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(0, 23.08), CGPointMake(7.47, 3.09), CGPointMake(0.04, 12.49));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(17.83, 45.25), CGPointMake(0, 33.39), CGPointMake(7.47, 42.66));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(40.08, 39.13), CGPointMake(25.81, 47.22), CGPointMake(34.2, 44.92));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(47, 22.84), CGPointMake(44.9, 34.41), CGPointMake(47, 29.4));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(31.6, 1.29), CGPointMake(47, 13.03), CGPointMake(41.08, 4.82));
  bezier2Path.addCurveToPointControlPoint1ControlPoint2(CGPointMake(17.88, 0.51), CGPointMake(27.99, -0.07), CGPointMake(21.65, -0.4));
  bezier2Path.miterLimit = 4;
  bezier2Path.closePath();
  iconColor.setFill();
  bezier2Path.fill();
};

export function getUniqueId(): string {
  return NSUUID.new().UUIDString;
}
