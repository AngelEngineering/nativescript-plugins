/* eslint-disable @typescript-eslint/no-empty-function */
/**********************************************************************************
  2017, nStudio, LLC & LiveShopper, LLC
  2023, VoiceThread - Angel Dominguez
 **********************************************************************************/

import { ContentView, File, isAndroid } from '@nativescript/core';
import { NSCamera as NSCameraDefinition } from '.';

export type CameraTypes = 'front' | 'rear';

export abstract class NSCameraBase extends ContentView implements NSCameraDefinition {
  @GetSetProperty()
  public debug = false;

  /**
   * Video Support (off by default)
   * users should set this in a component constructor before their view creates the component
   * and can reset it before different using in different views if they want to go back/forth
   * between photo/camera and video/camera
   */
  @GetSetProperty()
  public enableVideo = false;

  /*
   * Disable Photo Support (off by default)
   * useful if you wish to only use this plugin as a camera preview by also disabling video
   */
  @GetSetProperty()
  public disablePhoto = false;

  /**
   * Default camera: (default to 'rear')
   * Can be set before initialization or after to select which camera the plugin should use currently
   */
  @GetSetProperty()
  public defaultCamera: CameraTypes = 'rear';

  /*
   * String value for hooking into the errorEvent. This event fires when an error is emitted from NSCamera.
   */
  public static errorEvent = 'errorEvent';

  /**
   * String value for hooking into the photoCapturedEvent. This event fires when a photo is taken.
   */
  public static photoCapturedEvent = 'photoCapturedEvent';

  /**
   * String value for hooking into the toggleCameraEvent. This event fires when the device camera is toggled.
   */
  public static toggleCameraEvent = 'toggleCameraEvent';

  /**
   * String value when hooking into the videoRecordingStartedEvent. This event fires when video starts recording.
   */
  public static videoRecordingStartedEvent = 'videoRecordingStartedEvent';

  /**
   * String value when hooking into the videoRecordingFinishedEvent. This event fires when video stops recording but has not processed yet.
   */
  public static videoRecordingFinishedEvent = 'videoRecordingFinishedEvent';

  /**
   * String value when hooking into the videoRecordingReadyEvent. This event fires when video has completed processing and is ready to be used.
   */
  public static videoRecordingReadyEvent = 'videoRecordingReadyEvent';

  /**
   * String value for hooking into the cameraReadyEvent. This event fires when the native camera is done initializing.
   */
  public static cameraReadyEvent = 'cameraReadyEvent';
  /**
   * String value when hooking into the confirmScreenShownEvent. This event fires when the picture confirm dialog is shown.
   */
  public static confirmScreenShownEvent = 'confirmScreenShownEvent';

  /**
   * String value when hooking into the confirmScreenDismissedEvent. This event fires when the picture confirm dialog is dismissed either by Retake or Save button.
   */
  public static confirmScreenDismissedEvent = 'confirmScreenDismissedEvent';

  /**
   * @default 4:3
   * *ANDROID ONLY*  A string to represent the camera preview aspect ratio e.g 4:3, 1:1 ,16:9 to check if the device supports the ratio use {@link getGetSupportedRatios}
   */
  @GetSetProperty()
  public ratio: string;

  /**
   *  *ANDROID ONLY*  Camera zoom uses a float 0 - 1. Currently only getter support
   *  0 being no zoom
   *  1 being max zoom
   */
  @GetSetProperty()
  public zoom = 0;

  /**
   *  *ANDROID ONLY* Camera white balance, currently only getter support
   */
  @GetSetProperty()
  public whiteBalance: WhiteBalance | string = WhiteBalance.Auto;

  /**
   *  *ANDROID ONLY* A string representing the size of picture {@link takePicture} will output. Available sizes can be fetched using {@link getAvailablePictureSizes}
   */
  @GetSetProperty()
  public pictureSize = '768x1024';

  /**
   * @param ratio string
   * @returns returns an array of supported picture sizes supported by the current camera
   * NOTE: not currently working
   */
  getAvailablePictureSizes(ratio: string): string[] {
    return [];
  }

  /**
   * @returns retuns an array of strings representing the preview sizes supported by the current device.
   * NOTE: not currently working
   */
  getGetSupportedRatios(): string[] {
    return [];
  }

  /**
   * If true the default take picture event will present a confirmation dialog. Default is false.
   */
  @GetSetProperty()
  public confirmPhotos = false;

  /**
   * When confirming capture this text will be presented to the user to retake the photo. Default is 'Retake'
   */
  @GetSetProperty()
  public confirmRetakeText?: string = 'Retake';

  /**
   * When confirming capture this text will be presented to the user to save the photo. Default is 'Save'
   */
  @GetSetProperty()
  public confirmSaveText?: string = 'Save';

  /**
   * The resolution used when capturing video from camera
   */
  @GetSetProperty()
  public videoQuality: CameraVideoQuality = CameraVideoQuality.MAX_720P;

  /**
   * TODO: not supported yet
   * The requested height of video being captured
   */
  // @GetSetProperty()
  // public videoHeight: number = 1080;

  /**
   * TODO: not supported yet
   * The requested height of video being captured
   */
  // @GetSetProperty()
  // public videoWidth: number = 720;

  /**
   * TODO: not supported yet
   * If true, uses h.264 encoding for greater compatibility. If false uses h.265 encoding.
   */
  // @GetSetProperty()
  // public disableHEVC: boolean = true;

  /**
   * TODO: not supported yet
   * If true the default videorecordingready event will present a confirmation dialog. Default is false.
   */
  // @GetSetProperty()
  // public confirmVideo: boolean = false;

  /**
   * If true locks device UI orientation while recording video. Default is true
   */
  @GetSetProperty()
  public shouldLockRotation = true;

  /**
   * If true the default take picture event will save to device gallery. Default is true.
   */
  @GetSetProperty()
  public saveToGallery = true;

  /**
   * Quality is a number between 1-100 that is used when saving the image as a JPEG before the File reference is returned by plugin
   * NOTE: this only applies to photos, videos not supported yet
   */
  @GetSetProperty()
  public quality = 95;

  /**
   * Maximum dimension among width/height to use for the saved photo image. Default is 1200 max dimension
   * NOTE: this only applies to photos, videos not supported yet
   */
  @GetSetProperty()
  public maxDimension = 1200;

  /**
   * If true the default flash toggle icon/button will show on the NSCamera layout. Default is true.
   * Note: if the currently selected camera does not have a flash associated, this will be hidden
   */
  @GetSetProperty()
  public showFlashIcon = true;

  /**
   * If true the default camera toggle (front/back) icon/button will show on the NSCamera layout. Default is true.
   */
  @GetSetProperty()
  public showToggleIcon = true;

  /**
   * If true the default capture (take picture) icon/button will show on the NSCamera layout. Default is true.
   */
  @GetSetProperty()
  public showCaptureIcon = true;

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is on (enabled).
   */
  @GetSetProperty()
  public flashOnIcon = '';

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is off (disabled).
   */
  @GetSetProperty()
  public flashOffIcon = '';

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is off (disabled).
   */
  @GetSetProperty()
  public toggleCameraIcon = '';

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Capture button icon.
   */
  @GetSetProperty()
  public takePicIcon = '';

  /**
   * *ANDROID ONLY* - If true the camera will auto focus to capture the image. Default is true.
   */
  @GetSetProperty()
  public autoFocus = true;

  /**
   * *iOS ONLY* - Enable/disable double tap gesture to switch camera. (enabled)
   */
  @GetSetProperty()
  public doubleTapCameraSwitch = true;

  /** If true it will crop the picture to the center square **/
  @GetSetProperty()
  public autoSquareCrop = false;

  /**
   * Toggles the device camera (front/back).
   */
  toggleCamera(): void {}

  /**
   * Toggles the active camera flash mode.
   */
  toggleFlash(): void {}

  /**
   * Gets the flash mode
   * Android: various strings possible
   * iOS: only 'on' or 'off'
   */
  getFlashMode(): string {
    return null;
  }

  /**
   * Takes a picture of the current preview of the NSCamera.
   */
  abstract takePicture(options?: ICameraOptions): void;

  /**
   * Start recording video
   * @param options IVideoOptions
   */
  abstract record(options?: IVideoOptions): Promise<void>;

  /**
   * Stop recording video
   */
  abstract stop(): void;

  /*
   * Utility to merge an array of video filenames, must all be valid mp4 format video files with same audio encoding
   */
  abstract mergeVideoFiles(inputFiles: string[], outputPath: string): Promise<File>;

  /*
   * Utility to log information on the video format used by the video file at `videoPath`
   */
  public getVideoCodec(videoPath: string): string {
    let videoFormat: any = null;
    if (isAndroid) {
      const mediadata = new android.media.MediaMetadataRetriever();
      mediadata.setDataSource(videoPath);

      //find video format and select the video track to read from
      const videoExtractor: android.media.MediaExtractor = new android.media.MediaExtractor();
      videoExtractor.setDataSource(videoPath);
      const videoTracks = videoExtractor.getTrackCount();

      for (let j = 0; j < videoTracks; j++) {
        const mf = videoExtractor.getTrackFormat(j);
        const mime = mf.getString(android.media.MediaFormat.KEY_MIME);
        if (mime.startsWith('video/')) {
          videoExtractor.selectTrack(j);
          videoFormat = videoExtractor.getTrackFormat(j);
          break;
        }
      }
    } else {
      const filePath = NSURL.fileURLWithPath(videoPath);
      const avAsset = AVURLAsset.assetWithURL(filePath);
      const track: AVAssetTrack = avAsset.tracksWithMediaType(AVMediaTypeVideo).firstObject;
      if (!track) {
        console.warn('No video track found, cannot extract metadata information!');
        return null;
      }

      const mediaSubtypes = track.formatDescriptions;
      for (let i = 0; i < mediaSubtypes.count; i++) {
        const type = mediaSubtypes.objectAtIndex(i);
        const subtype = CMFormatDescriptionGetMediaSubType(type);
        //extract from byte array
        const bytes = [(subtype >> 24) & 0xff, (subtype >> 16) & 0xff, (subtype >> 8) & 0xff, subtype & 0xff, 0];
        const str = bytes
          .map(byte => {
            return String.fromCharCode(byte);
          })
          .join('');
        videoFormat = str;
      }
    }
    if (!videoFormat) {
      console.warn('No video track found, cannot extract metadata information!');
    }
    return videoFormat;
  }

  /*
   * Utility to check video resolution for the video file at `videoPath`
   */
  public getVideoResolution(videoPath: string): { width: number; height: number } {
    if (isAndroid) {
      const metaRetriever = new android.media.MediaMetadataRetriever();
      metaRetriever.setDataSource(videoPath);
      return {
        width: +metaRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_WIDTH),
        height: +metaRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_HEIGHT),
      };
    } else {
      const filePath = NSURL.fileURLWithPath(videoPath);
      const avAsset = AVURLAsset.assetWithURL(filePath);
      const track = avAsset.tracksWithMediaType(AVMediaTypeVideo).firstObject;
      if (!track) {
        console.warn('No video track found, cannot extract metadata information!');
        return {
          width: 0,
          height: 0,
        };
      }
      const size = track.naturalSize;
      return {
        width: size.width,
        height: size.height,
      };
    }
  }

  /*
   * Utility to find the duration in milliseconds of the video file at `videoPath`
   */
  public getVideoDuration(videoPath: string): number {
    let totalTime = 0;
    if (isAndroid) {
      const mediadata = new android.media.MediaMetadataRetriever();
      mediadata.setDataSource(videoPath);
      totalTime = +mediadata.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_DURATION);
    } else {
      const filePath = NSURL.fileURLWithPath(videoPath);
      const avAsset = AVURLAsset.assetWithURL(filePath);
      totalTime = CMTimeGetSeconds(avAsset.duration) * 1000;
    }
    return totalTime;
  }

  /**
   * Returns true if the device has at least one camera.
   */
  isCameraAvailable(): boolean {
    return false;
  }

  /**
   * Returns current camera <front | rear>
   */
  getCurrentCamera(): 'rear' | 'front' {
    return 'rear';
  }

  /**
   * * ANDROID ONLY * - Gets the number of cameras on a device.
   */
  getNumberOfCameras(): number {
    return 0;
  }

  /**
   * * ANDROID ONLY * - Returns true if the current camera has a flash mode.
   */
  hasFlash(): boolean {
    return false;
  }

  /**
   * Notify events by name and optionally pass data
   */
  public sendEvent(eventName: string, data?: any, msg?: string) {
    this.notify({
      eventName,
      object: this,
      data,
      message: msg,
    });
  }

  /*
   * Logging functions controlled by debug property
   */
  CLog(...args) {
    if (this.debug) {
      console.log('NSCamera ---', args);
    }
  }

  CError(...args) {
    if (this.debug) {
      console.error('NSCamera ---', args);
    }
  }
}

export interface ICameraOptions {
  confirmPhotos?: boolean;
  saveToGallery?: boolean;
  quality?: number;
  maxDimension?: number;
  autoSquareCrop?: boolean;
  confirmRetakeText?: string;
  confirmSaveText?: string;
}

export enum CameraVideoQuality {
  MAX_480P = '480p',
  MAX_720P = '720p',
  MAX_1080P = '1080p',
  MAX_2160P = '2160p',
  HIGHEST = 'highest',
  LOWEST = 'lowest',
  QVGA = 'qvga',
}

export interface IVideoOptions {
  saveToGallery?: boolean; //shared with ICameraOptions
  videoQuality?: CameraVideoQuality;
  // videoHeight?: number; //TODO: not supported yet
  // videoWidth?: number; //TODO: not supported yet
  // disableHEVC?: boolean; //TODO: not supported yet
  androidMaxVideoBitRate?: number;
  androidMaxFrameRate?: number;
  androidMaxAudioBitRate?: number;
}

/**
 *  *ANDROID ONLY* Camera white balance setting
 */
export enum WhiteBalance {
  Auto = 'auto',
  Sunny = 'sunny',
  Cloudy = 'cloudy',
  Shadow = 'shadow',
  Twilight = 'twilight',
  Fluorescent = 'fluorescent',
  Incandescent = 'incandescent',
  WarmFluorescent = 'warm-fluorescent',
}

export function GetSetProperty() {
  return (target, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return this['_' + propertyKey];
      },
      set: function (value) {
        if (this['_' + propertyKey] === value) {
          return;
        }
        if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        }
        this['_' + propertyKey] = value;
      },
      enumerable: true,
      configurable: true,
    });
  };
}
