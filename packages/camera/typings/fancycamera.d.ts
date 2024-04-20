/// <reference path="android-declarations.d.ts"/>

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class Camera2 extends io.github.triniwiz.fancycamera.CameraBase {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.Camera2>;
          public getDisplayRatio(): string;
          public cameraRecording(): boolean;
          public setPause(param0: boolean): void;
          public getMinZoomRatio(): number;
          public getRetrieveLatestImage(): boolean;
          public getAllowExifRotation(): boolean;
          public setEnablePinchZoom(param0: boolean): void;
          public setMaxVideoFrameRate(param0: number): void;
          public getDisableHEVC(): boolean;
          public getAutoFocus(): boolean;
          public setAllowExifRotation(param0: boolean): void;
          public getQuality(): io.github.triniwiz.fancycamera.Quality;
          public getMaxAudioBitRate(): number;
          public startPreview(): void;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
          public getWhiteBalance(): io.github.triniwiz.fancycamera.WhiteBalance;
          public setAutoSquareCrop(param0: boolean): void;
          public setRotation(param0: io.github.triniwiz.fancycamera.CameraOrientation): void;
          public getAutoSquareCrop(): boolean;
          public setWhiteBalance(param0: io.github.triniwiz.fancycamera.WhiteBalance): void;
          public getPictureSize(): string;
          public getSaveToGallery(): boolean;
          public startRecording(): void;
          public setDisableHEVC(param0: boolean): void;
          public getNumberOfCameras(): number;
          public setQuality(param0: io.github.triniwiz.fancycamera.Quality): void;
          public getSupportedRatios(): androidNative.Array<string>;
          public setZoom(param0: number): void;
          public release(): void;
          public setSaveToGallery(param0: boolean): void;
          public setAudioLevelsEnabled(param0: boolean): void;
          public orientationUpdated(): void;
          public getRotation(): io.github.triniwiz.fancycamera.CameraOrientation;
          public setPosition(param0: io.github.triniwiz.fancycamera.CameraPosition): void;
          public setAmplitude(param0: number): void;
          public isAudioLevelsEnabled(): boolean;
          public stop(): void;
          public setMaxVideoBitrate(param0: number): void;
          public setAmplitudeEMA(param0: number): void;
          public getAmplitudeEMA(): number;
          public stopPreview(): void;
          public setRetrieveLatestImage(param0: boolean): void;
          public setPictureSize(param0: string): void;
          public getPosition(): io.github.triniwiz.fancycamera.CameraPosition;
          public getMaxZoomRatio(): number;
          public setDb(param0: number): void;
          public getFlashMode(): io.github.triniwiz.fancycamera.CameraFlashMode;
          public setZoomRatio(param0: number): void;
          public getMaxVideoBitrate(): number;
          public setFlashMode(param0: io.github.triniwiz.fancycamera.CameraFlashMode): void;
          public setStoredZoomRatio(param0: number): void;
          public getMaxVideoFrameRate(): number;
          public takePhoto(): void;
          public getPreviewSurface(): any;
          public getAmplitude(): number;
          public getZoom(): number;
          public getAvailablePictureSizes(param0: string): androidNative.Array<io.github.triniwiz.fancycamera.Size>;
          public setAutoFocus(param0: boolean): void;
          public getEnableTapToFocus(): boolean;
          public getStoredZoom(): number;
          public setDisplayRatio(param0: string): void;
          public getEnablePinchZoom(): boolean;
          public setStoredZoom(param0: number): void;
          public toggleCamera(): void;
          public setEnableTapToFocus(param0: boolean): void;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
          public stopRecording(): void;
          public getPause(): boolean;
          public hasFlash(): boolean;
          public constructor(param0: globalAndroid.content.Context);
          public setMaxAudioBitRate(param0: number): void;
          public getStoredZoomRatio(): number;
          public getDb(): number;
          public getZoomRatio(): number;
        }
        export module Camera2 {
          export class WhenMappings {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.Camera2.WhenMappings>;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export abstract class CameraBase {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraBase>;
          public setPause(param0: boolean): void;
          public getAllowExifRotation(): boolean;
          public setCurrentOrientation(param0: number): void;
          public finalize(): void;
          public setMaxVideoFrameRate(param0: number): void;
          public getAutoFocus(): boolean;
          public setAllowExifRotation(param0: boolean): void;
          public setMTimerTask$nativescript_camera_release(param0: java.util.TimerTask): void;
          public startPreview(): void;
          public setOverridePhotoWidth(param0: number): void;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
          public setAutoSquareCrop(param0: boolean): void;
          public getDATETIME_FORMAT$nativescript_camera_release(): java.lang.ThreadLocal<java.text.SimpleDateFormat>;
          public setRotation(param0: io.github.triniwiz.fancycamera.CameraOrientation): void;
          public setOverridePhotoHeight(param0: number): void;
          public getMTimer$nativescript_camera_release(): java.util.Timer;
          public getSaveToGallery(): boolean;
          public setQuality(param0: io.github.triniwiz.fancycamera.Quality): void;
          public getSupportedRatios(): androidNative.Array<string>;
          public hasCameraPermission(): boolean;
          public setSaveToGallery(param0: boolean): void;
          public setAudioLevelsEnabled(param0: boolean): void;
          public orientationUpdated(): void;
          public getVIDEO_RECORDER_PERMISSIONS$nativescript_camera_release(): androidNative.Array<string>;
          public convertFromExifDateTime$nativescript_camera_release(param0: string): java.util.Date;
          public getCamcorderProfile$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.Quality): globalAndroid.media.CamcorderProfile;
          public setRetrieveLatestImage(param0: boolean): void;
          public getRecorder$nativescript_camera_release(): globalAndroid.media.MediaRecorder;
          public getPosition(): io.github.triniwiz.fancycamera.CameraPosition;
          public isProcessingEveryNthFrame$nativescript_camera_release(): boolean;
          public getProcessEveryNthFrame(): number;
          public getCurrentFrame$nativescript_camera_release(): number;
          public setListener$nativescript_camera_release(param0: io.github.triniwiz.fancycamera.CameraEventListener): void;
          public getDuration(): number;
          public requestAudioPermission(): void;
          public hasAudioPermission(): boolean;
          public getMaxVideoBitrate(): number;
          public setFlashMode(param0: io.github.triniwiz.fancycamera.CameraFlashMode): void;
          public getMTimerTask$nativescript_camera_release(): java.util.TimerTask;
          public getMaxVideoFrameRate(): number;
          public takePhoto(): void;
          public getAvailablePictureSizes(param0: string): androidNative.Array<io.github.triniwiz.fancycamera.Size>;
          public setAutoFocus(param0: boolean): void;
          public incrementCurrentFrame$nativescript_camera_release(): void;
          public getEnableTapToFocus(): boolean;
          public setProcessEveryNthFrame(param0: number): void;
          public getEnablePinchZoom(): boolean;
          public stopDurationTimer$nativescript_camera_release(): void;
          public stopRecording(): void;
          public getLatestImage$nativescript_camera_release(): globalAndroid.graphics.Bitmap;
          public hasFlash(): boolean;
          public constructor(param0: globalAndroid.content.Context);
          public getEnableAudio(): boolean;
          public setMaxAudioBitRate(param0: number): void;
          public convertToExifDateTime$nativescript_camera_release(param0: number): string;
          public getDb(): number;
          public getMainHandler$nativescript_camera_release(): globalAndroid.os.Handler;
          public getTIME_FORMAT$nativescript_camera_release(): java.lang.ThreadLocal<java.text.SimpleDateFormat>;
          public cameraRecording(): boolean;
          public getDisplayRatio(): string;
          public getRetrieveLatestImage(): boolean;
          public setEnablePinchZoom(param0: boolean): void;
          public toggleFlash(): void;
          public getDisableHEVC(): boolean;
          public getQuality(): io.github.triniwiz.fancycamera.Quality;
          public requestCameraPermission(): void;
          public getMaxAudioBitRate(): number;
          public getWhiteBalance(): io.github.triniwiz.fancycamera.WhiteBalance;
          public hasStoragePermission(): boolean;
          public getAutoSquareCrop(): boolean;
          public getOverridePhotoWidth(): number;
          public setGettingAudioLevels$nativescript_camera_release(param0: boolean): void;
          public setWhiteBalance(param0: io.github.triniwiz.fancycamera.WhiteBalance): void;
          public getPictureSize(): string;
          public setMDuration$nativescript_camera_release(param0: number): void;
          public startRecording(): void;
          public setDisableHEVC(param0: boolean): void;
          public setCurrentFrame$nativescript_camera_release(param0: number): void;
          public getNumberOfCameras(): number;
          public setZoom(param0: number): void;
          public requestPermission(): void;
          public release(): void;
          public getMDuration$nativescript_camera_release(): number;
          public getRotation(): io.github.triniwiz.fancycamera.CameraOrientation;
          public deInitListener$nativescript_camera_release(): void;
          public setPosition(param0: io.github.triniwiz.fancycamera.CameraPosition): void;
          public isAudioLevelsEnabled(): boolean;
          public stop(): void;
          public setMaxVideoBitrate(param0: number): void;
          public getAmplitudeEMA(): number;
          public isGettingAudioLevels$nativescript_camera_release(): boolean;
          public stopPreview(): void;
          public getOverridePhotoHeight(): number;
          public startDurationTimer$nativescript_camera_release(): void;
          public setPictureSize(param0: string): void;
          public setMTimer$nativescript_camera_release(param0: java.util.Timer): void;
          public setEnableAudio(param0: boolean): void;
          public getVIDEO_RECORDER_PERMISSIONS_REQUEST$nativescript_camera_release(): number;
          public getFlashMode(): io.github.triniwiz.fancycamera.CameraFlashMode;
          public setZoomRatio(param0: number): void;
          public hasPermission(): boolean;
          public resetCurrentFrame$nativescript_camera_release(): void;
          public getListener$nativescript_camera_release(): io.github.triniwiz.fancycamera.CameraEventListener;
          public getPreviewSurface(): any;
          public getAmplitude(): number;
          public getZoom(): number;
          public setDisplayRatio(param0: string): void;
          public initListener$nativescript_camera_release(param0: globalAndroid.media.MediaRecorder): void;
          public requestStoragePermission(): void;
          public toggleCamera(): void;
          public setLatestImage$nativescript_camera_release(param0: globalAndroid.graphics.Bitmap): void;
          public setEnableTapToFocus(param0: boolean): void;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet, param2: number);
          public getPause(): boolean;
          public stringSizeToSize$nativescript_camera_release(param0: string): io.github.triniwiz.fancycamera.Size;
          public getCurrentOrientation(): number;
          public setRecorder$nativescript_camera_release(param0: globalAndroid.media.MediaRecorder): void;
          public getDATE_FORMAT$nativescript_camera_release(): java.lang.ThreadLocal<java.text.SimpleDateFormat>;
          public getZoomRatio(): number;
        }
        export module CameraBase {
          export class WhenMappings {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraBase.WhenMappings>;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class CameraEventListener {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraEventListener>;
          /**
           * Constructs a new instance of the io.github.triniwiz.fancycamera.CameraEventListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onReady(): void;
            onCameraOpen(): void;
            onCameraClose(): void;
            onCameraPhoto(param0: java.io.File): void;
            onCameraVideo(param0: java.io.File): void;
            onCameraError(param0: string, param1: java.lang.Exception): void;
            onCameraVideoStart(): void;
            onCameraVideoStop(): void;
          });
          public constructor();
          public onCameraOpen(): void;
          public onCameraClose(): void;
          public onCameraVideo(param0: java.io.File): void;
          public onCameraVideoStart(): void;
          public onCameraVideoStop(): void;
          public onReady(): void;
          public onCameraError(param0: string, param1: java.lang.Exception): void;
          public onCameraPhoto(param0: java.io.File): void;
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export abstract class CameraEventListenerUI extends io.github.triniwiz.fancycamera.CameraEventListener {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraEventListenerUI>;
          public onCameraOpenUI(): void;
          public onCameraClose(): void;
          public onCameraVideoUI(param0: java.io.File): void;
          public onCameraError(param0: string, param1: java.lang.Exception): void;
          public onCameraErrorUI(param0: string, param1: java.lang.Exception): void;
          public onCameraPhoto(param0: java.io.File): void;
          public onCameraVideoStartUI(): void;
          public onCameraVideoStopUI(): void;
          public onReadyUI(): void;
          public onCameraOpen(): void;
          public onCameraVideo(param0: java.io.File): void;
          public constructor();
          public onCameraVideoStart(): void;
          public onCameraVideoStop(): void;
          public onCameraCloseUI(): void;
          public onReady(): void;
          public onCameraPhotoUI(param0: java.io.File): void;
        }
        export module CameraEventListenerUI {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraEventListenerUI.Companion>;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class CameraFlashMode {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraFlashMode>;
          public static OFF: io.github.triniwiz.fancycamera.CameraFlashMode;
          public static ON: io.github.triniwiz.fancycamera.CameraFlashMode;
          public static AUTO: io.github.triniwiz.fancycamera.CameraFlashMode;
          public static RED_EYE: io.github.triniwiz.fancycamera.CameraFlashMode;
          public static TORCH: io.github.triniwiz.fancycamera.CameraFlashMode;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.CameraFlashMode;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.CameraFlashMode>;
          public getValue(): number;
        }
        export module CameraFlashMode {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraFlashMode.Companion>;
            public from(param0: number): io.github.triniwiz.fancycamera.CameraFlashMode;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class CameraOrientation {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraOrientation>;
          public static UNKNOWN: io.github.triniwiz.fancycamera.CameraOrientation;
          public static PORTRAIT: io.github.triniwiz.fancycamera.CameraOrientation;
          public static PORTRAIT_UPSIDE_DOWN: io.github.triniwiz.fancycamera.CameraOrientation;
          public static LANDSCAPE_LEFT: io.github.triniwiz.fancycamera.CameraOrientation;
          public static LANDSCAPE_RIGHT: io.github.triniwiz.fancycamera.CameraOrientation;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.CameraOrientation>;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.CameraOrientation;
          public getValue(): number;
        }
        export module CameraOrientation {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraOrientation.Companion>;
            public from(param0: number): io.github.triniwiz.fancycamera.CameraOrientation;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class CameraPosition {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraPosition>;
          public static BACK: io.github.triniwiz.fancycamera.CameraPosition;
          public static FRONT: io.github.triniwiz.fancycamera.CameraPosition;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.CameraPosition>;
          public getValue(): number;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.CameraPosition;
        }
        export module CameraPosition {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.CameraPosition.Companion>;
            public from(param0: number): io.github.triniwiz.fancycamera.CameraPosition;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class Event {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.Event>;
          public constructor(param0: io.github.triniwiz.fancycamera.EventType, param1: java.io.File, param2: string);
          public getMessage(): string;
          public getFile(): java.io.File;
          public getType(): io.github.triniwiz.fancycamera.EventType;
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class EventType {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.EventType>;
          public static Photo: io.github.triniwiz.fancycamera.EventType;
          public static Video: io.github.triniwiz.fancycamera.EventType;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.EventType>;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.EventType;
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class FancyCamera {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.FancyCamera>;
          public setPause(param0: boolean): void;
          public getRetrieveLatestImage(): boolean;
          public getAllowExifRotation(): boolean;
          public getCameraOrientation(): io.github.triniwiz.fancycamera.CameraOrientation;
          public setEnablePinchZoom(param0: boolean): void;
          public setMaxVideoFrameRate(param0: number): void;
          public toggleFlash(): void;
          public getDisableHEVC(): boolean;
          public getAutoFocus(): boolean;
          public setAllowExifRotation(param0: boolean): void;
          public getQuality(): io.github.triniwiz.fancycamera.Quality;
          public requestCameraPermission(): void;
          public getMaxAudioBitRate(): number;
          public startPreview(): void;
          public onPermissionHandler(param0: number, param1: androidNative.Array<string>, param2: androidNative.Array<number>): void;
          public getWhiteBalance(): io.github.triniwiz.fancycamera.WhiteBalance;
          public constructor(param0: globalAndroid.content.Context, param1: globalAndroid.util.AttributeSet);
          public setOverridePhotoWidth(param0: number): void;
          public hasStoragePermission(): boolean;
          public setAutoSquareCrop(param0: boolean): void;
          public setOverridePhotoHeight(param0: number): void;
          public getAutoSquareCrop(): boolean;
          public getOverridePhotoWidth(): number;
          public setWhiteBalance(param0: io.github.triniwiz.fancycamera.WhiteBalance): void;
          public getPictureSize(): string;
          public getSaveToGallery(): boolean;
          public startRecording(): void;
          public setDisableHEVC(param0: boolean): void;
          public getLatestImage(): globalAndroid.graphics.Bitmap;
          public getNumberOfCameras(): number;
          public setQuality(param0: io.github.triniwiz.fancycamera.Quality): void;
          public static getForceV1(): boolean;
          public setZoom(param0: number): void;
          public requestPermission(): void;
          public release(): void;
          public hasCameraPermission(): boolean;
          public setSaveToGallery(param0: boolean): void;
          public setAudioLevelsEnabled(param0: boolean): void;
          public setPosition(param0: io.github.triniwiz.fancycamera.CameraPosition): void;
          public isAudioLevelsEnabled(): boolean;
          public stop(): void;
          public setMaxVideoBitrate(param0: number): void;
          public getRatio(): string;
          public stopPreview(): void;
          public getOverridePhotoHeight(): number;
          public setRetrieveLatestImage(param0: boolean): void;
          public setPictureSize(param0: string): void;
          public getPosition(): io.github.triniwiz.fancycamera.CameraPosition;
          public setEnableAudio(param0: boolean): void;
          public getProcessEveryNthFrame(): number;
          public getFlashMode(): io.github.triniwiz.fancycamera.CameraFlashMode;
          public hasPermission(): boolean;
          public getGetSupportedRatios(): androidNative.Array<string>;
          public getDuration(): number;
          public requestAudioPermission(): void;
          public hasAudioPermission(): boolean;
          public getMaxVideoBitrate(): number;
          public setFlashMode(param0: io.github.triniwiz.fancycamera.CameraFlashMode): void;
          public getMaxVideoFrameRate(): number;
          public takePhoto(): void;
          public getZoom(): number;
          public getAvailablePictureSizes(param0: string): androidNative.Array<io.github.triniwiz.fancycamera.Size>;
          public setAutoFocus(param0: boolean): void;
          public getEnableTapToFocus(): boolean;
          public setProcessEveryNthFrame(param0: number): void;
          public requestStoragePermission(): void;
          public getEnablePinchZoom(): boolean;
          public setRatio(param0: string): void;
          public toggleCamera(): void;
          public setEnableTapToFocus(param0: boolean): void;
          public stopRecording(): void;
          public getPause(): boolean;
          public setCameraOrientation(param0: io.github.triniwiz.fancycamera.CameraOrientation): void;
          public constructor(param0: globalAndroid.content.Context);
          public getEnableAudio(): boolean;
          public setMaxAudioBitRate(param0: number): void;
          public getPreviewView(): any;
          public getHasFlash(): boolean;
          public getDb(): number;
          public setListener(param0: io.github.triniwiz.fancycamera.CameraEventListener): void;
          public setEnableAudioLevels(param0: boolean): void;
          public static setForceV1(param0: boolean): void;
        }
        export module FancyCamera {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.FancyCamera.Companion>;
            public setForceV1(param0: boolean): void;
            public getForceV1(): boolean;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class FrameMetadata {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.FrameMetadata>;
          public getRotation(): number;
          public getHeight(): number;
          public getWidth(): number;
        }
        export module FrameMetadata {
          export class Builder {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.FrameMetadata.Builder>;
            public constructor();
            public setRotation(param0: number): io.github.triniwiz.fancycamera.FrameMetadata.Builder;
            public setWidth(param0: number): io.github.triniwiz.fancycamera.FrameMetadata.Builder;
            public setHeight(param0: number): io.github.triniwiz.fancycamera.FrameMetadata.Builder;
            public build(): io.github.triniwiz.fancycamera.FrameMetadata;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class Quality {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.Quality>;
          public static MAX_480P: io.github.triniwiz.fancycamera.Quality;
          public static MAX_720P: io.github.triniwiz.fancycamera.Quality;
          public static MAX_1080P: io.github.triniwiz.fancycamera.Quality;
          public static MAX_2160P: io.github.triniwiz.fancycamera.Quality;
          public static HIGHEST: io.github.triniwiz.fancycamera.Quality;
          public static LOWEST: io.github.triniwiz.fancycamera.Quality;
          public static QVGA: io.github.triniwiz.fancycamera.Quality;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.Quality>;
          public getValue(): number;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.Quality;
        }
        export module Quality {
          export class Companion {
            public static class: java.lang.Class<io.github.triniwiz.fancycamera.Quality.Companion>;
            public from(param0: number): io.github.triniwiz.fancycamera.Quality;
          }
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class Size {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.Size>;
          public toString(): string;
          public getHeight(): number;
          public getWidth(): number;
          public constructor(param0: number, param1: number);
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class SurfaceUpdateListener {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.SurfaceUpdateListener>;
          /**
           * Constructs a new instance of the io.github.triniwiz.fancycamera.SurfaceUpdateListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onUpdate(): void });
          public constructor();
          public onUpdate(): void;
        }
      }
    }
  }
}

declare module io {
  export module github {
    export module triniwiz {
      export module fancycamera {
        export class WhiteBalance {
          public static class: java.lang.Class<io.github.triniwiz.fancycamera.WhiteBalance>;
          public static Auto: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Sunny: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Cloudy: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Shadow: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Twilight: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Fluorescent: io.github.triniwiz.fancycamera.WhiteBalance;
          public static Incandescent: io.github.triniwiz.fancycamera.WhiteBalance;
          public static WarmFluorescent: io.github.triniwiz.fancycamera.WhiteBalance;
          public static values(): androidNative.Array<io.github.triniwiz.fancycamera.WhiteBalance>;
          public getValue$nativescript_camera_release(): string;
          public static valueOf(param0: string): io.github.triniwiz.fancycamera.WhiteBalance;
        }
      }
    }
  }
}

//Generics information:
