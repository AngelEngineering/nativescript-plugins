/**********************************************************************************
  2017, nStudio, LLC & LiveShopper, LLC
  2023, VoiceThread - Angel Dominguez
 **********************************************************************************/

import { Observable, ContentView, File } from '@nativescript/core';
export declare class NSCamera extends ContentView {
  /**
   * Video Support (off by default)
   * users should set this in a component constructor before their view creates the component
   * and can reset it before different using in different views if they want to go back/forth
   * between photo/camera and video/camera
   */
  public enableVideo: boolean;

  /**
   * Disable Photo Support (off by default)
   * If you want to record video, and use tap to start and stop recording, set this to true
   */
  public disablePhoto: boolean;

  /**
   * Default camera: (default to 'rear')
   * Can be set before initialization or after to select which camera the plugin should use currently
   */
  public defaultCamera: 'front' | 'rear';

  /**
   * String value for hooking into the errorEvent. This event fires when an error is emitted from NSCamera.
   */
  public static errorEvent: string;

  /**
   * String value for hooking into the photoCapturedEvent. This event fires when a photo is taken.
   */
  public static photoCapturedEvent: string;

  /**
   * String value for hooking into the toggleCameraEvent. This event fires when the device camera is toggled.
   */
  public static toggleCameraEvent: string;

  /**
   * String value when hooking into the videoRecordingStartedEvent. This event fires when video starts recording.
   */
  public static videoRecordingStartedEvent: string;

  /**
   * String value when hooking into the videoRecordingFinishedEvent. This event fires when video stops recording but has not processed yet.
   */
  public static videoRecordingFinishedEvent: string;

  /**
   * String value when hooking into the videoRecordingReadyEvent. This event fires when video has completed processing and is ready to be used.
   */
  public static videoRecordingReadyEvent: string;

  /**
   * String value when hooking into the confirmScreenShownEvent. This event fires when the confirm dialog is shown.
   */
  public static confirmScreenShownEvent: 'confirmScreenShownEvent';

  /**
   * String value when hooking into the confirmScreenDismissedEvent. This event fires when the confirm dialog is dismissed either by Retake or Save.
   */
  public static confirmScreenDismissedEvent: 'confirmScreenDismissedEvent';

  /**
   * If true console logs will be output to help debug plugin activity.
   */
  public debug: boolean;

  /**
   * String value for hooking into the cameraReadyEvent. This event fires when the native camera is done initializing.
   */
  public static cameraReadyEvent: string;

  /**
   * @default 4:3
   * *ANDROID ONLY*  A string to represent the camera preview aspect ratio e.g 4:3, 1:1 ,16:9 to check if the device supports the ratio use {@link getGetSupportedRatios}
   */
  ratio: string;

  /**
   *  *ANDROID ONLY*  Camera zoom uses a float 0 - 1. Currently only getter support
   *  0 being no zoom
   *  1 being max zoom
   */
  zoom: number;

  /**
   *  *ANDROID ONLY* Camera white balance setting. Currently only getter support
   */
  whiteBalance: WhiteBalance | string;

  /**
   * A string representing the size of picture {@link takePicture} will output. Available sizes can be fetched using {@link getAvailablePictureSizes}
   */
  pictureSize: string;

  /**
   * NOTE: not currently working
   * @param ratio string
   * @returns returns an array of supported picture sizes supported by the current camera
   */
  getAvailablePictureSizes(ratio: string): string[];

  /**
   * *ANDROID ONLY*
   * NOTE: not currently working
   * @returns retuns an array of strings representing the preview sizes supported by the current device.
   */
  getGetSupportedRatios(): string[];

  /*
   * Logging functions controlled by debug property
   */
  CLog(...args): void;
  CError(...args): void;

  /**
   * If true the default take picture event will present a confirmation dialog. Default is true.
   */
  confirmPhotos: boolean;

  /**
   * When confirming capture this text will be presented to the user to retake the photo. Default is 'Retake'
   */
  confirmRetakeText?: string;

  /**
   * When confirming capture this text will be presented to the user to save the photo. Default is 'Save'
   */
  confirmSaveText?: string;

  /**
   * If true the default flash toggle icon/button will show on the NSCamera layout. Default is true.
   * Note: if the currently selected camera does not have a flash associated, this will be hidden
   */
  showFlashIcon: boolean;

  /**
   * If true the default camera toggle (front/back) icon/button will show on the NSCamera layout. Default is true.
   */
  showToggleIcon: boolean;

  /**
   * If true the default capture (take picture) icon/button will show on the NSCamera layout. Default is true.
   */
  showCaptureIcon: boolean;

  /**
   * The resolution used when capturing video from camera
   */
  videoQuality: CameraVideoQuality;

  /**
   * TODO: not supported yet
   * The requested height of video being captured
   */
  // videoHeight: number;

  /**
   * TODO: not supported yet
   * The requested height of video being captured
   */
  // videoWidth: number;

  /**
   * TODO: not supported yet
   * If true, uses h.264 encoding for greater compatibility. If false uses h.265 encoding.
   */
  // @GetSetProperty()
  // public disableHEVC: boolean = true;

  /**
   * TODO: not supported yet
   * If true when a video is done recording, a confirmation dialog will show. Default is true.
   */
  // confirmVideo: boolean;

  /**
   * If true locks device orientation while recording video
   */
  shouldLockRotation: boolean;

  /**
   * If true, the video/image will save to the device Gallery/Library. Default is true.
   */
  saveToGallery: boolean;

  /**
   * If true, attempts to crop the image so it has equal width/height dimensions
   */
  autoSquareCrop: boolean;

  /**
   * Quality is a number between 1-100 that is used when saving the image as a JPEG before the File reference is returned by plugin
   * NOTE: this only applies to photos, videos not supported yet
   */
  quality: number;

  /**
   * Max dimensions among height/width to use for the saved photo image.
   */
  maxDimension: number;

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is on (enabled).
   */
  flashOnIcon: string;

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is off (disabled).
   */
  flashOffIcon: string;

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Toggle Flash button icon when flash is off (disabled).
   */
  toggleCameraIcon: string;

  /**
   * *ANDROID ONLY* - allows setting a custom app_resource drawable icon for the Capture button icon.
   */
  takePicIcon: string;

  /**
   * *ANDROID ONLY* - If true the camera will auto focus to capture the image. Default is true.
   */
  autoFocus: boolean;

  /**
   * *iOS ONLY* - Enable/disable double tap gesture to switch camera. (enabled)
   */
  doubleTapCameraSwitch: boolean;

  /**
   * Toggles the device camera (front/back).
   */
  toggleCamera(): void;

  /**
   * Toggles the active camera flash mode.
   */
  toggleFlash(): void;

  /**
   * Gets the current flash mode
   */
  getFlashMode(): string;

  /**
   * Takes a picture of the current preview of the NSCamera.
   */
  takePicture(options?: ICameraOptions): void;

  /**
   * Start recording video
   * @param options IVideoOptions
   */
  record(options?: IVideoOptions): Promise<void>;

  /**
   * Stop recording video.
   */
  stop(): void;

  /**
   * Returns true if the device has at least one camera.
   */
  isCameraAvailable(): boolean;

  /**
   * Returns current camera <front | rear>
   */
  getCurrentCamera(): 'rear' | 'front';

  /**
   * ANDROID ONLY
   * Gets the number of cameras on a device.
   */
  getNumberOfCameras(): number;

  /**
   * ANDROID ONLY
   * Returns true if the current camera has a flash mode.
   */
  hasFlash(): boolean;
  /*
   * Utility to merge an array of video filenames, must all be valid mp4 format video files with same audio encoding
   */
  mergeVideoFiles(audioFiles: string[], outputPath: string): Promise<File>;
  /*
   * Utility to log information on the video format used by the video file at `videoPath`
   */
  getVideoCodec(videoPath: string): string;
  /*
   * Utility to check video resolution for the video file at `videoPath`
   */
  getVideoResolution(videoPath: string): { width: number; height: number };
  /*
   * Utility to find the duration in milliseconds of the video file at `videoPath`
   */
  getVideoDuration(videoPath: string): number;
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

export declare enum CameraVideoQuality {
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
  // videoHeight?: number; //not supported yet
  // videoWidth?: number; //not supported yet
  // disableHEVC?: boolean; //not supported yet
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
