/* eslint-disable @typescript-eslint/no-loss-of-precision */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="android-declarations.d.ts"/>

declare module androidx {
  export module media3 {
    export module effect {
      export class AlphaScale extends androidx.media3.effect.GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.AlphaScale>;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.AlphaScaleShaderProgram;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public constructor(alphaScale: number);
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class AlphaScaleShaderProgram extends androidx.media3.effect.SingleFrameGlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.AlphaScaleShaderProgram>;
        public constructor(useHighPrecisionColorComponents: boolean);
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public release(): void;
        public configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public flush(): void;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public signalEndOfCurrentInputStream(): void;
        public constructor(useHighPrecisionColorComponents: boolean, texturePoolCapacity: number);
        public drawFrame(this_: number, inputTexId: number): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public constructor(this_: globalAndroid.content.Context, context: boolean, useHdr: number);
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export abstract class BaseGlShaderProgram extends androidx.media3.effect.GlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.BaseGlShaderProgram>;
        public outputTexturePool: androidx.media3.effect.TexturePool;
        public drawFrame(param0: number, param1: number): void;
        public release(): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public getOutputListener(): androidx.media3.effect.GlShaderProgram.OutputListener;
        public shouldClearTextureBuffer(): boolean;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(outputListener: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public setErrorListener(errorListenerExecutor: java.util.concurrent.Executor, errorListener: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public flush(): void;
        public signalEndOfCurrentInputStream(): void;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public setInputListener(this_: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public constructor(useHighPrecisionColorComponents: boolean, texturePoolCapacity: number);
        public configure(param0: number, param1: number): androidx.media3.common.util.Size;
        public queueInputFrame(outputTexture: androidx.media3.common.GlObjectsProvider, e: androidx.media3.common.GlTextureInfo, this_: number): void;
        public releaseOutputFrame(outputTexture: androidx.media3.common.GlTextureInfo): void;
        public getInputListener(): androidx.media3.effect.GlShaderProgram.InputListener;
        public onError(e: java.lang.Exception): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export abstract class BitmapOverlay extends androidx.media3.effect.TextureOverlay {
        public static class: java.lang.Class<androidx.media3.effect.BitmapOverlay>;
        public getTextureId(this_: number): number;
        public static createStaticBitmapOverlay(overlayBitmap: globalAndroid.graphics.Bitmap, overlaySettings: androidx.media3.effect.OverlaySettings): androidx.media3.effect.BitmapOverlay;
        public release(): void;
        public static createStaticBitmapOverlay(
          context: globalAndroid.content.Context,
          overlayBitmapUri: globalAndroid.net.Uri,
          overlaySettings: androidx.media3.effect.OverlaySettings
        ): androidx.media3.effect.BitmapOverlay;
        public getTextureSize(presentationTimeUs: number): androidx.media3.common.util.Size;
        public static createStaticBitmapOverlay(overlayBitmap: globalAndroid.graphics.Bitmap): androidx.media3.effect.BitmapOverlay;
        public constructor();
        public getBitmap(param0: number): globalAndroid.graphics.Bitmap;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class BitmapTextureManager extends androidx.media3.effect.TextureManager {
        public static class: java.lang.Class<androidx.media3.effect.BitmapTextureManager>;
        public release(): void;
        public onInputFrameProcessed(inputTexture: androidx.media3.common.GlTextureInfo): void;
        public queueInputBitmap(
          inputBitmap: globalAndroid.graphics.Bitmap,
          frameInfo: androidx.media3.common.FrameInfo,
          inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator,
          useHdr: boolean
        ): void;
        public onFlush(): void;
        public registerInputFrame(frameInfo: androidx.media3.common.FrameInfo): void;
        public setDefaultBufferSize(width: number, height: number): void;
        public signalEndOfCurrentInputStream(): void;
        public getPendingFrameCount(): number;
        public constructor(
          glObjectsProvider: androidx.media3.common.GlObjectsProvider,
          shaderProgram: androidx.media3.effect.GlShaderProgram,
          videoFrameProcessingTaskExecutor: androidx.media3.effect.VideoFrameProcessingTaskExecutor
        );
        public setOnFlushCompleteListener(task: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task): void;
        public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
        public setOnFlushCompleteListener(param0: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task): void;
        public queueInputTexture(inputTexId: number, presentationTimeUs: number): void;
        public onReadyToAcceptInputFrame(): void;
        public setInputFrameInfo(inputFrameInfo: androidx.media3.common.FrameInfo): void;
        public getInputSurface(): globalAndroid.view.Surface;
      }
      export module BitmapTextureManager {
        export class BitmapFrameSequenceInfo {
          public static class: java.lang.Class<androidx.media3.effect.BitmapTextureManager.BitmapFrameSequenceInfo>;
          public bitmap: globalAndroid.graphics.Bitmap;
          public constructor(bitmap: globalAndroid.graphics.Bitmap, frameInfo: androidx.media3.common.FrameInfo, inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class BitmapUtil {
        public static class: java.lang.Class<androidx.media3.effect.BitmapUtil>;
        public static flipBitmapVertically(bitmap: globalAndroid.graphics.Bitmap): globalAndroid.graphics.Bitmap;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class Brightness extends androidx.media3.effect.RgbMatrix {
        public static class: java.lang.Class<androidx.media3.effect.Brightness>;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public getMatrix(presentationTimeUs: number, useHdr: boolean): androidNative.Array<number>;
        public getMatrix(param0: number, param1: boolean): androidNative.Array<number>;
        public constructor(brightness: number);
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class BuildConfig {
        public static class: java.lang.Class<androidx.media3.effect.BuildConfig>;
        public static DEBUG: boolean = 0;
        public static LIBRARY_PACKAGE_NAME: string = 'androidx.media3.effect';
        public static BUILD_TYPE: string = 'release';
        public constructor();
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class ChainingGlShaderProgramListener implements androidx.media3.effect.GlShaderProgram.InputListener, androidx.media3.effect.GlShaderProgram.OutputListener {
        public static class: java.lang.Class<androidx.media3.effect.ChainingGlShaderProgramListener>;
        public onInputFrameProcessed(inputTexture: androidx.media3.common.GlTextureInfo): void;
        public onFlush(): void;
        public onOutputFrameAvailable(outputTexture: androidx.media3.common.GlTextureInfo, presentationTimeUs: number): void;
        public onReadyToAcceptInputFrame(): void;
        public constructor(
          glObjectsProvider: androidx.media3.common.GlObjectsProvider,
          producingGlShaderProgram: androidx.media3.effect.GlShaderProgram,
          consumingGlShaderProgram: androidx.media3.effect.GlShaderProgram,
          videoFrameProcessingTaskExecutor: androidx.media3.effect.VideoFrameProcessingTaskExecutor
        );
        public onCurrentOutputStreamEnded(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class ColorLut extends androidx.media3.effect.GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.ColorLut>;
        /**
         * Constructs a new instance of the androidx.media3.effect.ColorLut interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          getLutTextureId(param0: number): number;
          getLength(param0: number): number;
          release(): void;
          toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.GlShaderProgram;
          toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
          isNoOp(inputWidth: number, inputHeight: number): boolean;
        });
        public constructor();
        public getLutTextureId(param0: number): number;
        public release(): void;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public getLength(param0: number): number;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.GlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class ColorLutShaderProgram extends androidx.media3.effect.BaseGlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.ColorLutShaderProgram>;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public signalEndOfCurrentInputStream(): void;
        public constructor(useHighPrecisionColorComponents: boolean, texturePoolCapacity: number);
        public release(): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
        public drawFrame(this_: number, inputTexId: number): void;
        public constructor(this_: globalAndroid.content.Context, context: androidx.media3.effect.ColorLut, colorLut: boolean);
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public flush(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class Contrast extends androidx.media3.effect.RgbMatrix {
        public static class: java.lang.Class<androidx.media3.effect.Contrast>;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public getMatrix(presentationTimeUs: number, useHdr: boolean): androidNative.Array<number>;
        public getMatrix(param0: number, param1: boolean): androidNative.Array<number>;
        public constructor(contrast: number);
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class Crop extends androidx.media3.effect.MatrixTransformation {
        public static class: java.lang.Class<androidx.media3.effect.Crop>;
        public configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
        public getGlMatrixArray(presentationTimeUs: number): androidNative.Array<number>;
        public getMatrix(param0: number): globalAndroid.graphics.Matrix;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public constructor(left: number, right: number, bottom: number, top: number);
        public getMatrix(presentationTimeUs: number): globalAndroid.graphics.Matrix;
        public getGlMatrixArray(param0: number): androidNative.Array<number>;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class DebugTraceUtil {
        public static class: java.lang.Class<androidx.media3.effect.DebugTraceUtil>;
        public static EVENT_VIDEO_INPUT_FORMAT: string = 'VideoInputFormat';
        public static EVENT_DECODER_DECODED_FRAME: string = 'Decoder-DecodedFrame';
        public static EVENT_VFP_REGISTER_NEW_INPUT_STREAM: string = 'VFP-RegisterNewInputStream';
        public static EVENT_VFP_SURFACE_TEXTURE_INPUT: string = 'VFP-SurfaceTextureInput';
        public static EVENT_VFP_QUEUE_FRAME: string = 'VFP-QueueFrame';
        public static EVENT_VFP_QUEUE_BITMAP: string = 'VFP-QueueBitmap';
        public static EVENT_VFP_QUEUE_TEXTURE: string = 'VFP-QueueTexture';
        public static EVENT_VFP_RENDERED_TO_OUTPUT_SURFACE: string = 'VFP-RenderedToOutputSurface';
        public static EVENT_VFP_OUTPUT_TEXTURE_RENDERED: string = 'VFP-OutputTextureRendered';
        public static EVENT_VFP_FINISH_PROCESSING_INPUT_STREAM: string = 'VFP-FinishOneInputStream';
        public static EVENT_COMPOSITOR_OUTPUT_TEXTURE_RENDERED: string = 'COMP-OutputTextureRendered';
        public static EVENT_ENCODER_ENCODED_FRAME: string = 'Encoder-EncodedFrame';
        public static EVENT_MUXER_CAN_WRITE_SAMPLE_VIDEO: string = 'Muxer-CanWriteSample_Video';
        public static EVENT_MUXER_WRITE_SAMPLE_VIDEO: string = 'Muxer-WriteSample_Video';
        public static EVENT_MUXER_CAN_WRITE_SAMPLE_AUDIO: string = 'Muxer-CanWriteSample_Audio';
        public static EVENT_MUXER_WRITE_SAMPLE_AUDIO: string = 'Muxer-WriteSample_Audio';
        public static EVENT_DECODER_RECEIVE_EOS: string = 'Decoder-ReceiveEOS';
        public static EVENT_DECODER_SIGNAL_EOS: string = 'Decoder-SignalEOS';
        public static EVENT_VFP_RECEIVE_END_OF_INPUT: string = 'VFP-ReceiveEndOfAllInput';
        public static EVENT_EXTERNAL_TEXTURE_MANAGER_SIGNAL_EOS: string = 'ExternalTextureManager-SignalEOS';
        public static EVENT_BITMAP_TEXTURE_MANAGER_SIGNAL_EOS: string = 'BitmapTextureManager-SignalEOS';
        public static EVENT_TEX_ID_TEXTURE_MANAGER_SIGNAL_EOS: string = 'TexIdTextureManager-SignalEOS';
        public static EVENT_VFP_SIGNAL_ENDED: string = 'VFP-SignalEnded';
        public static EVENT_ENCODER_RECEIVE_EOS: string = 'Encoder-ReceiveEOS';
        public static EVENT_MUXER_TRACK_ENDED_AUDIO: string = 'Muxer-TrackEnded_Audio';
        public static EVENT_MUXER_TRACK_ENDED_VIDEO: string = 'Muxer-TrackEnded_Video';
        public static logEvent(eventName: string, presentationTimeUs: number, extra: string): void;
        public static logEvent(eventName: string, presentationTimeUs: number): void;
        public static generateTraceSummary(): string;
        public static dumpTsv(eventLog: java.io.Writer): void;
        public static reset(): void;
        public constructor();
      }
      export module DebugTraceUtil {
        export class DebugTraceEvent {
          public static class: java.lang.Class<androidx.media3.effect.DebugTraceUtil.DebugTraceEvent>;
          /**
           * Constructs a new instance of the androidx.media3.effect.DebugTraceUtil$DebugTraceEvent interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class EventLog {
          public static class: java.lang.Class<androidx.media3.effect.DebugTraceUtil.EventLog>;
          public presentationTimeUs: number;
          public eventTimeMs: number;
          public extra: string;
          public toString(): string;
        }
        export class EventLogger {
          public static class: java.lang.Class<androidx.media3.effect.DebugTraceUtil.EventLogger>;
          public toString(): string;
          public constructor();
          public getLogs(): com.google.common.collect.ImmutableList<androidx.media3.effect.DebugTraceUtil.EventLog>;
          public addLog(log: androidx.media3.effect.DebugTraceUtil.EventLog): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class DefaultFrameDroppingShaderProgram extends androidx.media3.effect.FrameCacheGlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.DefaultFrameDroppingShaderProgram>;
        public signalEndOfCurrentInputStream(): void;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public constructor(this_: globalAndroid.content.Context, context: number, capacity: boolean);
        public constructor(context: globalAndroid.content.Context, useHdr: boolean, targetFrameRate: number);
        public constructor(useHighPrecisionColorComponents: boolean, texturePoolCapacity: number);
        public release(): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public queueInputFrame(glObjectsProvider: androidx.media3.common.GlObjectsProvider, inputTexture: androidx.media3.common.GlTextureInfo, presentationTimeUs: number): void;
        public flush(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class DefaultGlObjectsProvider {
        public static class: java.lang.Class<androidx.media3.effect.DefaultGlObjectsProvider>;
        public createFocusedPlaceholderEglSurface(eglContext: globalAndroid.opengl.EGLContext, eglDisplay: globalAndroid.opengl.EGLDisplay): globalAndroid.opengl.EGLSurface;
        public constructor(sharedEglContext: globalAndroid.opengl.EGLContext);
        public createEglContext(eglDisplay: globalAndroid.opengl.EGLDisplay, openGlVersion: number, configAttributes: androidNative.Array<number>): globalAndroid.opengl.EGLContext;
        public createBuffersForTexture(texId: number, width: number, height: number): androidx.media3.common.GlTextureInfo;
        public createEglSurface(eglDisplay: globalAndroid.opengl.EGLDisplay, surface: any, colorTransfer: number, isEncoderInputSurface: boolean): globalAndroid.opengl.EGLSurface;
        public constructor();
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class DefaultShaderProgram extends androidx.media3.effect.BaseGlShaderProgram implements androidx.media3.effect.ExternalShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.DefaultShaderProgram>;
        public release(): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public static createWithInternalSampler(
          context: globalAndroid.content.Context,
          matrixTransformations: java.util.List<androidx.media3.effect.GlMatrixTransformation>,
          rgbMatrices: java.util.List<androidx.media3.effect.RgbMatrix>,
          inputColorInfo: androidx.media3.common.ColorInfo,
          outputColorInfo: androidx.media3.common.ColorInfo,
          enableColorTransfers: boolean,
          inputType: number
        ): androidx.media3.effect.DefaultShaderProgram;
        public static createWithExternalSampler(
          context: globalAndroid.content.Context,
          matrixTransformations: java.util.List<androidx.media3.effect.GlMatrixTransformation>,
          rgbMatrices: java.util.List<androidx.media3.effect.RgbMatrix>,
          inputColorInfo: androidx.media3.common.ColorInfo,
          outputColorInfo: androidx.media3.common.ColorInfo,
          enableColorTransfers: boolean
        ): androidx.media3.effect.DefaultShaderProgram;
        public configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
        public static create(
          context: globalAndroid.content.Context,
          matrixTransformations: java.util.List<androidx.media3.effect.GlMatrixTransformation>,
          rgbMatrices: java.util.List<androidx.media3.effect.RgbMatrix>,
          useHdr: boolean
        ): androidx.media3.effect.DefaultShaderProgram;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public flush(): void;
        public static createApplyingOetf(
          context: globalAndroid.content.Context,
          matrixTransformations: java.util.List<androidx.media3.effect.GlMatrixTransformation>,
          rgbMatrices: java.util.List<androidx.media3.effect.RgbMatrix>,
          outputColorInfo: androidx.media3.common.ColorInfo,
          enableColorTransfers: boolean
        ): androidx.media3.effect.DefaultShaderProgram;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public signalEndOfCurrentInputStream(): void;
        public setTextureTransformMatrix(param0: androidNative.Array<number>): void;
        public drawFrame(this_: number, inputTexId: number): void;
        public setTextureTransformMatrix(textureTransformMatrix: androidNative.Array<number>): void;
        public getOutputColorTransfer(): number;
        public setOutputColorTransfer(colorTransfer: number): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class DefaultVideoCompositor extends androidx.media3.effect.VideoCompositor {
        public static class: java.lang.Class<androidx.media3.effect.DefaultVideoCompositor>;
        public queueInputTexture(
          inputId: number,
          textureProducer: androidx.media3.effect.GlTextureProducer,
          inputTexture: androidx.media3.common.GlTextureInfo,
          colorInfo: androidx.media3.common.ColorInfo,
          presentationTimeUs: number
        ): void;
        public signalEndOfInputSource(param0: number): void;
        public registerInputSource(): number;
        public releaseOutputTexture(presentationTimeUs: number): void;
        public release(): void;
        public releaseOutputTexture(param0: number): void;
        public signalEndOfInputSource(this_: number): void;
        public constructor(
          context: globalAndroid.content.Context,
          glObjectsProvider: androidx.media3.common.GlObjectsProvider,
          settings: androidx.media3.effect.VideoCompositorSettings,
          executorService: java.util.concurrent.ExecutorService,
          listener: androidx.media3.effect.VideoCompositor.Listener,
          textureOutputListener: androidx.media3.effect.GlTextureProducer.Listener,
          textureOutputCapacity: number
        );
        public queueInputTexture(
          param0: number,
          param1: androidx.media3.effect.GlTextureProducer,
          param2: androidx.media3.common.GlTextureInfo,
          param3: androidx.media3.common.ColorInfo,
          param4: number
        ): void;
      }
      export module DefaultVideoCompositor {
        export class CompositorGlProgram {
          public static class: java.lang.Class<androidx.media3.effect.DefaultVideoCompositor.CompositorGlProgram>;
          public drawFrame(this_: java.util.List<androidx.media3.effect.DefaultVideoCompositor.InputFrameInfo>, framesToComposite: androidx.media3.common.GlTextureInfo): void;
          public constructor(context: globalAndroid.content.Context);
          public release(): void;
        }
        export class InputFrameInfo {
          public static class: java.lang.Class<androidx.media3.effect.DefaultVideoCompositor.InputFrameInfo>;
          public textureProducer: androidx.media3.effect.GlTextureProducer;
          public texture: androidx.media3.common.GlTextureInfo;
          public presentationTimeUs: number;
          public overlaySettings: androidx.media3.effect.OverlaySettings;
          public constructor(
            textureProducer: androidx.media3.effect.GlTextureProducer,
            texture: androidx.media3.common.GlTextureInfo,
            presentationTimeUs: number,
            overlaySettings: androidx.media3.effect.OverlaySettings
          );
        }
        export class InputSource {
          public static class: java.lang.Class<androidx.media3.effect.DefaultVideoCompositor.InputSource>;
          public frameInfos: java.util.Queue<androidx.media3.effect.DefaultVideoCompositor.InputFrameInfo>;
          public isInputEnded: boolean;
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class DefaultVideoFrameProcessor {
        public static class: java.lang.Class<androidx.media3.effect.DefaultVideoFrameProcessor>;
        public getPendingInputFrameCount(): number;
        public getTaskExecutor(): androidx.media3.effect.VideoFrameProcessingTaskExecutor;
        public release(): void;
        public registerInputStream(pendingInputStreamInfo: number, this_: java.util.List<androidx.media3.common.Effect>, inputType: androidx.media3.common.FrameInfo): void;
        public setOutputSurfaceInfo(outputSurfaceInfo: androidx.media3.common.SurfaceInfo): void;
        public setInputDefaultBufferSize(width: number, height: number): void;
        public queueInputBitmap(inputBitmap: globalAndroid.graphics.Bitmap, inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator): boolean;
        public queueInputTexture(textureId: number, presentationTimeUs: number): boolean;
        public registerInputFrame(): boolean;
        public signalEndOfInput(): void;
        public flush(): void;
        public renderOutputFrame(renderTimeNs: number): void;
        public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
        public getInputSurface(): globalAndroid.view.Surface;
      }
      export module DefaultVideoFrameProcessor {
        export class Factory {
          public static class: java.lang.Class<androidx.media3.effect.DefaultVideoFrameProcessor.Factory>;
          public buildUpon(): androidx.media3.effect.DefaultVideoFrameProcessor.Factory.Builder;
          public create(
            e: globalAndroid.content.Context,
            this_: androidx.media3.common.DebugViewProvider,
            context: androidx.media3.common.ColorInfo,
            debugViewProvider: androidx.media3.common.ColorInfo,
            inputColorInfo: boolean,
            outputColorInfo: java.util.concurrent.Executor,
            renderFramesAutomatically: androidx.media3.common.VideoFrameProcessor.Listener
          ): androidx.media3.effect.DefaultVideoFrameProcessor;
        }
        export module Factory {
          export class Builder {
            public static class: java.lang.Class<androidx.media3.effect.DefaultVideoFrameProcessor.Factory.Builder>;
            public constructor();
            public setGlObjectsProvider(glObjectsProvider: androidx.media3.common.GlObjectsProvider): androidx.media3.effect.DefaultVideoFrameProcessor.Factory.Builder;
            public build(): androidx.media3.effect.DefaultVideoFrameProcessor.Factory;
            public setExecutorService(executorService: java.util.concurrent.ExecutorService): androidx.media3.effect.DefaultVideoFrameProcessor.Factory.Builder;
            public setEnableColorTransfers(enableColorTransfers: boolean): androidx.media3.effect.DefaultVideoFrameProcessor.Factory.Builder;
            public setTextureOutput(
              textureOutputListener: androidx.media3.effect.GlTextureProducer.Listener,
              textureOutputCapacity: number
            ): androidx.media3.effect.DefaultVideoFrameProcessor.Factory.Builder;
          }
        }
        export class InputStreamInfo {
          public static class: java.lang.Class<androidx.media3.effect.DefaultVideoFrameProcessor.InputStreamInfo>;
          public inputType: number;
          public effects: java.util.List<androidx.media3.common.Effect>;
          public frameInfo: androidx.media3.common.FrameInfo;
          public constructor(inputType: number, effects: java.util.List<androidx.media3.common.Effect>, frameInfo: androidx.media3.common.FrameInfo);
        }
        export class ReleaseOutputTextureCallback {
          public static class: java.lang.Class<androidx.media3.effect.DefaultVideoFrameProcessor.ReleaseOutputTextureCallback>;
          /**
           * Constructs a new instance of the androidx.media3.effect.DefaultVideoFrameProcessor$ReleaseOutputTextureCallback interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { release(param0: number): void });
          public constructor();
          public release(param0: number): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export abstract class DrawableOverlay extends androidx.media3.effect.BitmapOverlay {
        public static class: java.lang.Class<androidx.media3.effect.DrawableOverlay>;
        public getDrawable(param0: number): globalAndroid.graphics.drawable.Drawable;
        public static createStaticDrawableOverlay(drawable: globalAndroid.graphics.drawable.Drawable, overlaySettings: androidx.media3.effect.OverlaySettings): androidx.media3.effect.DrawableOverlay;
        public constructor();
        public getBitmap(this_: number): globalAndroid.graphics.Bitmap;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class ExternalShaderProgram extends androidx.media3.effect.GlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.ExternalShaderProgram>;
        /**
         * Constructs a new instance of the androidx.media3.effect.ExternalShaderProgram interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          setTextureTransformMatrix(param0: androidNative.Array<number>): void;
          setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
          setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
          setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
          queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
          releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
          signalEndOfCurrentInputStream(): void;
          flush(): void;
          release(): void;
        });
        public constructor();
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public signalEndOfCurrentInputStream(): void;
        public setTextureTransformMatrix(param0: androidNative.Array<number>): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public release(): void;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public flush(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class ExternalTextureManager extends androidx.media3.effect.TextureManager {
        public static class: java.lang.Class<androidx.media3.effect.ExternalTextureManager>;
        public release(): void;
        public onInputFrameProcessed(inputTexture: androidx.media3.common.GlTextureInfo): void;
        public queueInputBitmap(
          inputBitmap: globalAndroid.graphics.Bitmap,
          frameInfo: androidx.media3.common.FrameInfo,
          inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator,
          useHdr: boolean
        ): void;
        public onFlush(): void;
        public constructor(
          this_: androidx.media3.common.GlObjectsProvider,
          glObjectsProvider: androidx.media3.effect.ExternalShaderProgram,
          externalShaderProgram: androidx.media3.effect.VideoFrameProcessingTaskExecutor
        );
        public registerInputFrame(frame: androidx.media3.common.FrameInfo): void;
        public registerInputFrame(frameInfo: androidx.media3.common.FrameInfo): void;
        public setDefaultBufferSize(width: number, height: number): void;
        public signalEndOfCurrentInputStream(): void;
        public getPendingFrameCount(): number;
        public setOnFlushCompleteListener(task: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task): void;
        public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
        public setOnFlushCompleteListener(param0: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task): void;
        public queueInputTexture(inputTexId: number, presentationTimeUs: number): void;
        public onReadyToAcceptInputFrame(): void;
        public setInputFrameInfo(inputFrameInfo: androidx.media3.common.FrameInfo): void;
        public getInputSurface(): globalAndroid.view.Surface;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class FinalShaderProgramWrapper implements androidx.media3.effect.GlShaderProgram, androidx.media3.effect.GlTextureProducer {
        public static class: java.lang.Class<androidx.media3.effect.FinalShaderProgramWrapper>;
        public release(): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public setErrorListener(executor: java.util.concurrent.Executor, errorListener: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setMatrixTransformations(matrixTransformations: java.util.List<androidx.media3.effect.GlMatrixTransformation>, rgbMatrices: java.util.List<androidx.media3.effect.RgbMatrix>): void;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(outputListener: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public constructor(
          context: globalAndroid.content.Context,
          eglDisplay: globalAndroid.opengl.EGLDisplay,
          eglContext: globalAndroid.opengl.EGLContext,
          debugViewProvider: androidx.media3.common.DebugViewProvider,
          outputColorInfo: androidx.media3.common.ColorInfo,
          enableColorTransfers: boolean,
          renderFramesAutomatically: boolean,
          videoFrameProcessingTaskExecutor: androidx.media3.effect.VideoFrameProcessingTaskExecutor,
          videoFrameProcessorListenerExecutor: java.util.concurrent.Executor,
          videoFrameProcessorListener: androidx.media3.common.VideoFrameProcessor.Listener,
          textureOutputListener: androidx.media3.effect.GlTextureProducer.Listener,
          textureOutputCapacity: number
        );
        public flush(): void;
        public signalEndOfCurrentInputStream(): void;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public setInputListener(this_: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public releaseOutputTexture(presentationTimeUs: number): void;
        public setOutputSurfaceInfo(this_: androidx.media3.common.SurfaceInfo): void;
        public releaseOutputFrame(outputTexture: androidx.media3.common.GlTextureInfo): void;
        public releaseOutputTexture(param0: number): void;
        public renderOutputFrame(glObjectsProvider: androidx.media3.common.GlObjectsProvider, renderTimeNs: number): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public setOnInputStreamProcessedListener(onInputStreamProcessedListener: androidx.media3.effect.FinalShaderProgramWrapper.OnInputStreamProcessedListener): void;
        public queueInputFrame(glObjectsProvider: androidx.media3.common.GlObjectsProvider, inputTexture: androidx.media3.common.GlTextureInfo, presentationTimeUs: number): void;
      }
      export module FinalShaderProgramWrapper {
        export class OnInputStreamProcessedListener {
          public static class: java.lang.Class<androidx.media3.effect.FinalShaderProgramWrapper.OnInputStreamProcessedListener>;
          /**
           * Constructs a new instance of the androidx.media3.effect.FinalShaderProgramWrapper$OnInputStreamProcessedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onInputStreamProcessed(): void });
          public constructor();
          public onInputStreamProcessed(): void;
        }
        export class SurfaceViewWrapper {
          public static class: java.lang.Class<androidx.media3.effect.FinalShaderProgramWrapper.SurfaceViewWrapper>;
          public outputColorTransfer: number;
          public constructor(eglDisplay: globalAndroid.opengl.EGLDisplay, eglContext: globalAndroid.opengl.EGLContext, surfaceView: globalAndroid.view.SurfaceView, outputColorTransfer: number);
          public surfaceCreated(holder: globalAndroid.view.SurfaceHolder): void;
          public surfaceDestroyed(holder: globalAndroid.view.SurfaceHolder): void;
          public maybeRenderToSurfaceView(renderingTask: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task, glObjectsProvider: androidx.media3.common.GlObjectsProvider): void;
          public surfaceChanged(holder: globalAndroid.view.SurfaceHolder, format: number, width: number, height: number): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class FrameCache extends androidx.media3.effect.GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.FrameCache>;
        public capacity: number;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public constructor(capacity: number);
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.GlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class FrameCacheGlShaderProgram extends androidx.media3.effect.BaseGlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.FrameCacheGlShaderProgram>;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public signalEndOfCurrentInputStream(): void;
        public constructor(this_: globalAndroid.content.Context, context: number, capacity: boolean);
        public constructor(useHighPrecisionColorComponents: boolean, texturePoolCapacity: number);
        public release(): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
        public drawFrame(this_: number, inputTexId: number): void;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public flush(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class FrameConsumptionManager extends androidx.media3.effect.GlShaderProgram.InputListener {
        public static class: java.lang.Class<androidx.media3.effect.FrameConsumptionManager>;
        public constructor(
          glObjectsProvider: androidx.media3.common.GlObjectsProvider,
          consumingGlShaderProgram: androidx.media3.effect.GlShaderProgram,
          videoFrameProcessingTaskExecutor: androidx.media3.effect.VideoFrameProcessingTaskExecutor
        );
        public getPendingFrameCount(): number;
        public queueInputFrame(inputTexture: androidx.media3.common.GlTextureInfo, presentationTimeUs: number): void;
        public onInputFrameProcessed(inputTexture: androidx.media3.common.GlTextureInfo): void;
        public signalEndOfCurrentStream(): void;
        public onFlush(): void;
        public onReadyToAcceptInputFrame(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class FrameDropEffect extends androidx.media3.effect.GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.FrameDropEffect>;
        public static createSimpleFrameDropEffect(expectedFrameRate: number, targetFrameRate: number): androidx.media3.effect.FrameDropEffect;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public static createDefaultFrameDropEffect(targetFrameRate: number): androidx.media3.effect.FrameDropEffect;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.GlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.GlEffect>;
        /**
         * Constructs a new instance of the androidx.media3.effect.GlEffect interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
          isNoOp(inputWidth: number, inputHeight: number): boolean;
        });
        public constructor();
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class GlMatrixTransformation extends androidx.media3.effect.GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.GlMatrixTransformation>;
        /**
         * Constructs a new instance of the androidx.media3.effect.GlMatrixTransformation interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
          getGlMatrixArray(param0: number): androidNative.Array<number>;
          toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
          toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
          toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
          isNoOp(inputWidth: number, inputHeight: number): boolean;
        });
        public constructor();
        public configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public getGlMatrixArray(param0: number): androidNative.Array<number>;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class GlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.GlShaderProgram>;
        /**
         * Constructs a new instance of the androidx.media3.effect.GlShaderProgram interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
          setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
          setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
          queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
          releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
          signalEndOfCurrentInputStream(): void;
          flush(): void;
          release(): void;
        });
        public constructor();
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public signalEndOfCurrentInputStream(): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public release(): void;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public flush(): void;
      }
      export module GlShaderProgram {
        export class ErrorListener {
          public static class: java.lang.Class<androidx.media3.effect.GlShaderProgram.ErrorListener>;
          /**
           * Constructs a new instance of the androidx.media3.effect.GlShaderProgram$ErrorListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onError(param0: androidx.media3.common.VideoFrameProcessingException): void });
          public constructor();
          public onError(param0: androidx.media3.common.VideoFrameProcessingException): void;
        }
        export class InputListener {
          public static class: java.lang.Class<androidx.media3.effect.GlShaderProgram.InputListener>;
          /**
           * Constructs a new instance of the androidx.media3.effect.GlShaderProgram$InputListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onReadyToAcceptInputFrame(): void; onInputFrameProcessed(inputTexture: androidx.media3.common.GlTextureInfo): void; onFlush(): void });
          public constructor();
          public onReadyToAcceptInputFrame(): void;
          public onInputFrameProcessed(inputTexture: androidx.media3.common.GlTextureInfo): void;
          public onFlush(): void;
        }
        export class OutputListener {
          public static class: java.lang.Class<androidx.media3.effect.GlShaderProgram.OutputListener>;
          /**
           * Constructs a new instance of the androidx.media3.effect.GlShaderProgram$OutputListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onOutputFrameAvailable(outputTexture: androidx.media3.common.GlTextureInfo, presentationTimeUs: number): void; onCurrentOutputStreamEnded(): void });
          public constructor();
          public onOutputFrameAvailable(outputTexture: androidx.media3.common.GlTextureInfo, presentationTimeUs: number): void;
          public onCurrentOutputStreamEnded(): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class GlTextureProducer {
        public static class: java.lang.Class<androidx.media3.effect.GlTextureProducer>;
        /**
         * Constructs a new instance of the androidx.media3.effect.GlTextureProducer interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { releaseOutputTexture(param0: number): void });
        public constructor();
        public releaseOutputTexture(param0: number): void;
      }
      export module GlTextureProducer {
        export class Listener {
          public static class: java.lang.Class<androidx.media3.effect.GlTextureProducer.Listener>;
          /**
           * Constructs a new instance of the androidx.media3.effect.GlTextureProducer$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onTextureRendered(param0: androidx.media3.effect.GlTextureProducer, param1: androidx.media3.common.GlTextureInfo, param2: number, param3: number): void;
          });
          public constructor();
          public onTextureRendered(param0: androidx.media3.effect.GlTextureProducer, param1: androidx.media3.common.GlTextureInfo, param2: number, param3: number): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class HslAdjustment extends androidx.media3.effect.GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.HslAdjustment>;
        public hueAdjustmentDegrees: number;
        public saturationAdjustment: number;
        public lightnessAdjustment: number;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
      export module HslAdjustment {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.effect.HslAdjustment.Builder>;
          public constructor();
          public adjustSaturation(saturationAdjustment: number): androidx.media3.effect.HslAdjustment.Builder;
          public build(): androidx.media3.effect.HslAdjustment;
          public adjustHue(hueAdjustmentDegrees: number): androidx.media3.effect.HslAdjustment.Builder;
          public adjustLightness(lightnessAdjustment: number): androidx.media3.effect.HslAdjustment.Builder;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class HslShaderProgram extends androidx.media3.effect.BaseGlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.HslShaderProgram>;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public signalEndOfCurrentInputStream(): void;
        public constructor(useHighPrecisionColorComponents: boolean, texturePoolCapacity: number);
        public release(): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
        public drawFrame(this_: number, inputTexId: number): void;
        public constructor(this_: globalAndroid.content.Context, context: androidx.media3.effect.HslAdjustment, hslAdjustment: boolean);
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public flush(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class InputSwitcher {
        public static class: java.lang.Class<androidx.media3.effect.InputSwitcher>;
        public registerInput(textureManager: androidx.media3.common.ColorInfo, samplingShaderProgram: number): void;
        public signalEndOfInputStream(): void;
        public activeTextureManager(): androidx.media3.effect.TextureManager;
        public release(): void;
        public switchToInput(input: number, i: androidx.media3.common.FrameInfo): void;
        public hasActiveInput(): boolean;
        public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
        public setInputDefaultBufferSize(width: number, height: number): void;
        public constructor(
          context: globalAndroid.content.Context,
          outputColorInfo: androidx.media3.common.ColorInfo,
          glObjectsProvider: androidx.media3.common.GlObjectsProvider,
          videoFrameProcessingTaskExecutor: androidx.media3.effect.VideoFrameProcessingTaskExecutor,
          errorListenerExecutor: java.util.concurrent.Executor,
          samplingShaderProgramErrorListener: androidx.media3.effect.GlShaderProgram.ErrorListener,
          enableColorTransfers: boolean
        );
        public setDownstreamShaderProgram(downstreamShaderProgram: androidx.media3.effect.GlShaderProgram): void;
        public getInputSurface(): globalAndroid.view.Surface;
      }
      export module InputSwitcher {
        export class GatedChainingListenerWrapper implements androidx.media3.effect.GlShaderProgram.OutputListener, androidx.media3.effect.GlShaderProgram.InputListener {
          public static class: java.lang.Class<androidx.media3.effect.InputSwitcher.GatedChainingListenerWrapper>;
          public onReadyToAcceptInputFrame(): void;
          public setActive(isActive: boolean): void;
          public onInputFrameProcessed(inputTexture: androidx.media3.common.GlTextureInfo): void;
          public onOutputFrameAvailable(outputTexture: androidx.media3.common.GlTextureInfo, presentationTimeUs: number): void;
          public constructor(
            glObjectsProvider: androidx.media3.common.GlObjectsProvider,
            producingGlShaderProgram: androidx.media3.effect.GlShaderProgram,
            consumingGlShaderProgram: androidx.media3.effect.GlShaderProgram,
            videoFrameProcessingTaskExecutor: androidx.media3.effect.VideoFrameProcessingTaskExecutor
          );
          public onCurrentOutputStreamEnded(): void;
          public onFlush(): void;
        }
        export class Input {
          public static class: java.lang.Class<androidx.media3.effect.InputSwitcher.Input>;
          public textureManager: androidx.media3.effect.TextureManager;
          public samplingGlShaderProgram: androidx.media3.effect.GlShaderProgram;
          public setChainingListener(gatedChainingListenerWrapper: androidx.media3.effect.InputSwitcher.GatedChainingListenerWrapper): void;
          public release(): void;
          public setActive(active: boolean): void;
          public constructor(textureManager: androidx.media3.effect.TextureManager, samplingGlShaderProgram: androidx.media3.effect.GlShaderProgram);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class MatrixTransformation extends androidx.media3.effect.GlMatrixTransformation {
        public static class: java.lang.Class<androidx.media3.effect.MatrixTransformation>;
        /**
         * Constructs a new instance of the androidx.media3.effect.MatrixTransformation interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          getMatrix(param0: number): globalAndroid.graphics.Matrix;
          getGlMatrixArray(presentationTimeUs: number): androidNative.Array<number>;
          configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
          getGlMatrixArray(param0: number): androidNative.Array<number>;
          toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
          toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
          toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
          isNoOp(inputWidth: number, inputHeight: number): boolean;
        });
        public constructor();
        public getGlMatrixArray(presentationTimeUs: number): androidNative.Array<number>;
        public configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
        public getMatrix(param0: number): globalAndroid.graphics.Matrix;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public getGlMatrixArray(param0: number): androidNative.Array<number>;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class MatrixUtils {
        public static class: java.lang.Class<androidx.media3.effect.MatrixUtils>;
        public static transformPoints(
          transformedPoint: androidNative.Array<number>,
          i: com.google.common.collect.ImmutableList<androidNative.Array<number>>
        ): com.google.common.collect.ImmutableList<androidNative.Array<number>>;
        public static getGlMatrixArray(matrix: globalAndroid.graphics.Matrix): androidNative.Array<number>;
        public static configureAndGetOutputSize(i: number, inputWidth: number, inputHeight: java.util.List<androidx.media3.effect.GlMatrixTransformation>): androidx.media3.common.util.Size;
        public static clipConvexPolygonToNdcRange(
          intersectionPoint: com.google.common.collect.ImmutableList<androidNative.Array<number>>
        ): com.google.common.collect.ImmutableList<androidNative.Array<number>>;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export abstract class MultipleInputVideoGraph {
        public static class: java.lang.Class<androidx.media3.effect.MultipleInputVideoGraph>;
        public hasProducedFrameWithTimestampZero(): boolean;
        public registerInput(): number;
        public release(): void;
        public initialize(): void;
        public setOutputSurfaceInfo(outputSurfaceInfo: androidx.media3.common.SurfaceInfo): void;
        public constructor(
          context: globalAndroid.content.Context,
          inputColorInfo: androidx.media3.common.ColorInfo,
          outputColorInfo: androidx.media3.common.ColorInfo,
          debugViewProvider: androidx.media3.common.DebugViewProvider,
          listener: androidx.media3.common.VideoGraph.Listener,
          listenerExecutor: java.util.concurrent.Executor,
          videoCompositorSettings: androidx.media3.effect.VideoCompositorSettings,
          compositionEffects: java.util.List<androidx.media3.common.Effect>,
          initialTimestampOffsetUs: number
        );
        public getInitialTimestampOffsetUs(): number;
        public getProcessor(inputId: number): androidx.media3.common.VideoFrameProcessor;
        public getInputColorInfo(): androidx.media3.common.ColorInfo;
      }
      export module MultipleInputVideoGraph {
        export class CompositorOutputTextureInfo {
          public static class: java.lang.Class<androidx.media3.effect.MultipleInputVideoGraph.CompositorOutputTextureInfo>;
          public glTextureInfo: androidx.media3.common.GlTextureInfo;
          public presentationTimeUs: number;
        }
        export class CompositorOutputTextureRelease {
          public static class: java.lang.Class<androidx.media3.effect.MultipleInputVideoGraph.CompositorOutputTextureRelease>;
          public release(): void;
          public constructor(textureProducer: androidx.media3.effect.GlTextureProducer, presentationTimeUs: number);
        }
        export class SingleContextGlObjectsProvider {
          public static class: java.lang.Class<androidx.media3.effect.MultipleInputVideoGraph.SingleContextGlObjectsProvider>;
          public createBuffersForTexture(texId: number, width: number, height: number): androidx.media3.common.GlTextureInfo;
          public createEglSurface(eglDisplay: globalAndroid.opengl.EGLDisplay, surface: any, colorTransfer: number, isEncoderInputSurface: boolean): globalAndroid.opengl.EGLSurface;
          public constructor();
          public createEglContext(eglDisplay: globalAndroid.opengl.EGLDisplay, openGlVersion: number, configAttributes: androidNative.Array<number>): globalAndroid.opengl.EGLContext;
          public createFocusedPlaceholderEglSurface(eglContext: globalAndroid.opengl.EGLContext, eglDisplay: globalAndroid.opengl.EGLDisplay): globalAndroid.opengl.EGLSurface;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class OverlayEffect extends androidx.media3.effect.GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.OverlayEffect>;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public constructor(textureOverlays: com.google.common.collect.ImmutableList<androidx.media3.effect.TextureOverlay>);
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class OverlayMatrixProvider {
        public static class: java.lang.Class<androidx.media3.effect.OverlayMatrixProvider>;
        public static MATRIX_OFFSET: number = 0;
        public getTransformationMatrix(overlaySize: androidx.media3.common.util.Size, overlaySettings: androidx.media3.effect.OverlaySettings): androidNative.Array<number>;
        public configure(backgroundSize: androidx.media3.common.util.Size): void;
        public constructor();
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class OverlaySettings {
        public static class: java.lang.Class<androidx.media3.effect.OverlaySettings>;
        public useHdr: boolean;
        public alphaScale: number;
        public backgroundFrameAnchor: globalAndroid.util.Pair<java.lang.Float, java.lang.Float>;
        public overlayFrameAnchor: globalAndroid.util.Pair<java.lang.Float, java.lang.Float>;
        public scale: globalAndroid.util.Pair<java.lang.Float, java.lang.Float>;
        public rotationDegrees: number;
      }
      export module OverlaySettings {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.effect.OverlaySettings.Builder>;
          public setOverlayFrameAnchor(x: number, y: number): androidx.media3.effect.OverlaySettings.Builder;
          public build(): androidx.media3.effect.OverlaySettings;
          public setRotationDegrees(rotationDegree: number): androidx.media3.effect.OverlaySettings.Builder;
          public constructor();
          public setBackgroundFrameAnchor(x: number, y: number): androidx.media3.effect.OverlaySettings.Builder;
          public setAlphaScale(alphaScale: number): androidx.media3.effect.OverlaySettings.Builder;
          public setScale(x: number, y: number): androidx.media3.effect.OverlaySettings.Builder;
          public setUsesHdr(useHdr: boolean): androidx.media3.effect.OverlaySettings.Builder;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class OverlayShaderProgram extends androidx.media3.effect.BaseGlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.OverlayShaderProgram>;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public signalEndOfCurrentInputStream(): void;
        public constructor(useHighPrecisionColorComponents: boolean, texturePoolCapacity: number);
        public drawFrame(overlaySettings: number, overlaySize: number): void;
        public release(): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public configure(this_: number, inputWidth: number): androidx.media3.common.util.Size;
        public constructor(this_: boolean, useHdr: com.google.common.collect.ImmutableList<androidx.media3.effect.TextureOverlay>);
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public flush(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class Presentation extends androidx.media3.effect.MatrixTransformation {
        public static class: java.lang.Class<androidx.media3.effect.Presentation>;
        public static LAYOUT_SCALE_TO_FIT: number = 0;
        public static LAYOUT_SCALE_TO_FIT_WITH_CROP: number = 1;
        public static LAYOUT_STRETCH_TO_FIT: number = 2;
        public static createForAspectRatio(aspectRatio: number, layout: number): androidx.media3.effect.Presentation;
        public static createForWidthAndHeight(width: number, height: number, layout: number): androidx.media3.effect.Presentation;
        public configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
        public getGlMatrixArray(presentationTimeUs: number): androidNative.Array<number>;
        public getMatrix(param0: number): globalAndroid.graphics.Matrix;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public static createForHeight(height: number): androidx.media3.effect.Presentation;
        public getMatrix(presentationTimeUs: number): globalAndroid.graphics.Matrix;
        public getGlMatrixArray(param0: number): androidNative.Array<number>;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
      export module Presentation {
        export class Layout {
          public static class: java.lang.Class<androidx.media3.effect.Presentation.Layout>;
          /**
           * Constructs a new instance of the androidx.media3.effect.Presentation$Layout interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class PreviewingSingleInputVideoGraph extends androidx.media3.effect.SingleInputVideoGraph {
        public static class: java.lang.Class<androidx.media3.effect.PreviewingSingleInputVideoGraph>;
      }
      export module PreviewingSingleInputVideoGraph {
        export class Factory {
          public static class: java.lang.Class<androidx.media3.effect.PreviewingSingleInputVideoGraph.Factory>;
          public create(
            i: globalAndroid.content.Context,
            this_: androidx.media3.common.ColorInfo,
            context: androidx.media3.common.ColorInfo,
            inputColorInfo: androidx.media3.common.DebugViewProvider,
            outputColorInfo: androidx.media3.common.VideoGraph.Listener,
            debugViewProvider: java.util.concurrent.Executor,
            listener: java.util.List<androidx.media3.common.Effect>,
            listenerExecutor: number
          ): androidx.media3.common.PreviewingVideoGraph;
          public constructor(videoFrameProcessorFactory: androidx.media3.common.VideoFrameProcessor.Factory);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class RgbAdjustment extends androidx.media3.effect.RgbMatrix {
        public static class: java.lang.Class<androidx.media3.effect.RgbAdjustment>;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public getMatrix(presentationTimeUs: number, useHdr: boolean): androidNative.Array<number>;
        public getMatrix(param0: number, param1: boolean): androidNative.Array<number>;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
      export module RgbAdjustment {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.effect.RgbAdjustment.Builder>;
          public setRedScale(redScale: number): androidx.media3.effect.RgbAdjustment.Builder;
          public constructor();
          public setGreenScale(greenScale: number): androidx.media3.effect.RgbAdjustment.Builder;
          public setBlueScale(blueScale: number): androidx.media3.effect.RgbAdjustment.Builder;
          public build(): androidx.media3.effect.RgbAdjustment;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class RgbFilter extends androidx.media3.effect.RgbMatrix {
        public static class: java.lang.Class<androidx.media3.effect.RgbFilter>;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public static createGrayscaleFilter(): androidx.media3.effect.RgbFilter;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public getMatrix(presentationTimeUs: number, useHdr: boolean): androidNative.Array<number>;
        public getMatrix(param0: number, param1: boolean): androidNative.Array<number>;
        public static createInvertedFilter(): androidx.media3.effect.RgbFilter;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class RgbMatrix extends androidx.media3.effect.GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.RgbMatrix>;
        /**
         * Constructs a new instance of the androidx.media3.effect.RgbMatrix interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          getMatrix(param0: number, param1: boolean): androidNative.Array<number>;
          toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
          toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
          toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
          isNoOp(inputWidth: number, inputHeight: number): boolean;
        });
        public constructor();
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public getMatrix(param0: number, param1: boolean): androidNative.Array<number>;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class SamplerOverlayMatrixProvider extends androidx.media3.effect.OverlayMatrixProvider {
        public static class: java.lang.Class<androidx.media3.effect.SamplerOverlayMatrixProvider>;
        public getTransformationMatrix(overlaySize: androidx.media3.common.util.Size, overlaySettings: androidx.media3.effect.OverlaySettings): androidNative.Array<number>;
        public constructor();
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class ScaleAndRotateTransformation extends androidx.media3.effect.MatrixTransformation {
        public static class: java.lang.Class<androidx.media3.effect.ScaleAndRotateTransformation>;
        public scaleX: number;
        public scaleY: number;
        public rotationDegrees: number;
        public getGlMatrixArray(presentationTimeUs: number): androidNative.Array<number>;
        public configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
        public getMatrix(param0: number): globalAndroid.graphics.Matrix;
        public configure(this_: number, inputWidth: number): androidx.media3.common.util.Size;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public getMatrix(presentationTimeUs: number): globalAndroid.graphics.Matrix;
        public getGlMatrixArray(param0: number): androidNative.Array<number>;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.BaseGlShaderProgram;
      }
      export module ScaleAndRotateTransformation {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.effect.ScaleAndRotateTransformation.Builder>;
          public build(): androidx.media3.effect.ScaleAndRotateTransformation;
          public constructor();
          public setScale(scaleX: number, scaleY: number): androidx.media3.effect.ScaleAndRotateTransformation.Builder;
          public setRotationDegrees(rotationDegrees: number): androidx.media3.effect.ScaleAndRotateTransformation.Builder;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class SimpleFrameDroppingShaderProgram extends androidx.media3.effect.FrameCacheGlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.SimpleFrameDroppingShaderProgram>;
        public signalEndOfCurrentInputStream(): void;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public constructor(this_: globalAndroid.content.Context, context: number, capacity: boolean);
        public constructor(useHighPrecisionColorComponents: boolean, texturePoolCapacity: number);
        public constructor(context: globalAndroid.content.Context, useHdr: boolean, inputFrameRate: number, targetFrameRate: number);
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public release(): void;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public queueInputFrame(glObjectsProvider: androidx.media3.common.GlObjectsProvider, inputTexture: androidx.media3.common.GlTextureInfo, presentationTimeUs: number): void;
        public flush(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class SingleColorLut extends androidx.media3.effect.ColorLut {
        public static class: java.lang.Class<androidx.media3.effect.SingleColorLut>;
        public getLutTextureId(param0: number): number;
        public static createFromCube(lutCube: androidNative.Array<androidNative.Array<androidNative.Array<number>>>): androidx.media3.effect.SingleColorLut;
        public static createFromBitmap(lut: globalAndroid.graphics.Bitmap): androidx.media3.effect.SingleColorLut;
        public release(): void;
        public toGlShaderProgram(this_: globalAndroid.content.Context, context: boolean): androidx.media3.effect.BaseGlShaderProgram;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public getLength(param0: number): number;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public getLutTextureId(presentationTimeUs: number): number;
        public getLength(presentationTimeUs: number): number;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.GlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export abstract class SingleFrameGlShaderProgram extends androidx.media3.effect.BaseGlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.SingleFrameGlShaderProgram>;
        public constructor(useHighPrecisionColorComponents: boolean);
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public signalEndOfCurrentInputStream(): void;
        public constructor(useHighPrecisionColorComponents: boolean, texturePoolCapacity: number);
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public release(): void;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public flush(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export abstract class SingleInputVideoGraph {
        public static class: java.lang.Class<androidx.media3.effect.SingleInputVideoGraph>;
        public static SINGLE_INPUT_INDEX: number = 0;
        public hasProducedFrameWithTimestampZero(): boolean;
        public registerInput(): number;
        public release(): void;
        public initialize(): void;
        public setOutputSurfaceInfo(outputSurfaceInfo: androidx.media3.common.SurfaceInfo): void;
        public constructor(
          context: globalAndroid.content.Context,
          videoFrameProcessorFactory: androidx.media3.common.VideoFrameProcessor.Factory,
          inputColorInfo: androidx.media3.common.ColorInfo,
          outputColorInfo: androidx.media3.common.ColorInfo,
          listener: androidx.media3.common.VideoGraph.Listener,
          debugViewProvider: androidx.media3.common.DebugViewProvider,
          listenerExecutor: java.util.concurrent.Executor,
          videoCompositorSettings: androidx.media3.effect.VideoCompositorSettings,
          renderFramesAutomatically: boolean,
          presentation: androidx.media3.effect.Presentation,
          initialTimestampOffsetUs: number
        );
        public getInitialTimestampOffsetUs(): number;
        public getProcessor(inputId: number): androidx.media3.common.VideoFrameProcessor;
        public getPresentation(): androidx.media3.effect.Presentation;
        public getInputColorInfo(): androidx.media3.common.ColorInfo;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class SpeedChangeEffect extends androidx.media3.effect.GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.SpeedChangeEffect>;
        public constructor(speed: number);
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.GlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class SpeedChangeShaderProgram extends androidx.media3.effect.FrameCacheGlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.SpeedChangeShaderProgram>;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public signalEndOfCurrentInputStream(): void;
        public constructor(this_: globalAndroid.content.Context, context: number, capacity: boolean);
        public constructor(useHighPrecisionColorComponents: boolean, texturePoolCapacity: number);
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public release(): void;
        public constructor(context: globalAndroid.content.Context, speed: number, useHdr: boolean);
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public queueInputFrame(glObjectsProvider: androidx.media3.common.GlObjectsProvider, inputTexture: androidx.media3.common.GlTextureInfo, presentationTimeUs: number): void;
        public flush(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class TexIdTextureManager extends androidx.media3.effect.TextureManager {
        public static class: java.lang.Class<androidx.media3.effect.TexIdTextureManager>;
        public release(): void;
        public onInputFrameProcessed(inputTexture: androidx.media3.common.GlTextureInfo): void;
        public queueInputBitmap(
          inputBitmap: globalAndroid.graphics.Bitmap,
          frameInfo: androidx.media3.common.FrameInfo,
          inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator,
          useHdr: boolean
        ): void;
        public onFlush(): void;
        public registerInputFrame(frameInfo: androidx.media3.common.FrameInfo): void;
        public setDefaultBufferSize(width: number, height: number): void;
        public signalEndOfCurrentInputStream(): void;
        public getPendingFrameCount(): number;
        public constructor(
          glObjectsProvider: androidx.media3.common.GlObjectsProvider,
          shaderProgram: androidx.media3.effect.GlShaderProgram,
          videoFrameProcessingTaskExecutor: androidx.media3.effect.VideoFrameProcessingTaskExecutor
        );
        public setOnFlushCompleteListener(task: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task): void;
        public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
        public setOnFlushCompleteListener(param0: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task): void;
        public queueInputTexture(inputTexId: number, presentationTimeUs: number): void;
        public onReadyToAcceptInputFrame(): void;
        public setInputFrameInfo(inputFrameInfo: androidx.media3.common.FrameInfo): void;
        public getInputSurface(): globalAndroid.view.Surface;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export abstract class TextOverlay extends androidx.media3.effect.BitmapOverlay {
        public static class: java.lang.Class<androidx.media3.effect.TextOverlay>;
        public static TEXT_SIZE_PIXELS: number = 100;
        public static createStaticTextOverlay(overlayText: globalAndroid.text.SpannableString): androidx.media3.effect.TextOverlay;
        public getText(param0: number): globalAndroid.text.SpannableString;
        public getBitmap(staticLayout: number): globalAndroid.graphics.Bitmap;
        public static createStaticTextOverlay(overlayText: globalAndroid.text.SpannableString, overlaySettings: androidx.media3.effect.OverlaySettings): androidx.media3.effect.TextOverlay;
        public constructor();
      }
      export module TextOverlay {
        export class Api23 {
          public static class: java.lang.Class<androidx.media3.effect.TextOverlay.Api23>;
          public static getStaticLayout(text: globalAndroid.text.SpannableString, textPaint: globalAndroid.text.TextPaint, width: number): globalAndroid.text.StaticLayout;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class TextureManager extends androidx.media3.effect.GlShaderProgram.InputListener {
        public static class: java.lang.Class<androidx.media3.effect.TextureManager>;
        /**
         * Constructs a new instance of the androidx.media3.effect.TextureManager interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          setDefaultBufferSize(width: number, height: number): void;
          queueInputBitmap(
            inputBitmap: globalAndroid.graphics.Bitmap,
            frameInfo: androidx.media3.common.FrameInfo,
            inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator,
            useHdr: boolean
          ): void;
          queueInputTexture(inputTexId: number, presentationTimeUs: number): void;
          setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
          setInputFrameInfo(inputFrameInfo: androidx.media3.common.FrameInfo): void;
          getInputSurface(): globalAndroid.view.Surface;
          registerInputFrame(frameInfo: androidx.media3.common.FrameInfo): void;
          getPendingFrameCount(): number;
          signalEndOfCurrentInputStream(): void;
          setOnFlushCompleteListener(param0: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task): void;
          release(): void;
          onReadyToAcceptInputFrame(): void;
          onInputFrameProcessed(inputTexture: androidx.media3.common.GlTextureInfo): void;
          onFlush(): void;
        });
        public constructor();
        public release(): void;
        public onInputFrameProcessed(inputTexture: androidx.media3.common.GlTextureInfo): void;
        public queueInputBitmap(
          inputBitmap: globalAndroid.graphics.Bitmap,
          frameInfo: androidx.media3.common.FrameInfo,
          inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator,
          useHdr: boolean
        ): void;
        public onFlush(): void;
        public registerInputFrame(frameInfo: androidx.media3.common.FrameInfo): void;
        public setDefaultBufferSize(width: number, height: number): void;
        public signalEndOfCurrentInputStream(): void;
        public getPendingFrameCount(): number;
        public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
        public setOnFlushCompleteListener(param0: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task): void;
        public queueInputTexture(inputTexId: number, presentationTimeUs: number): void;
        public onReadyToAcceptInputFrame(): void;
        public setInputFrameInfo(inputFrameInfo: androidx.media3.common.FrameInfo): void;
        public getInputSurface(): globalAndroid.view.Surface;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export abstract class TextureOverlay {
        public static class: java.lang.Class<androidx.media3.effect.TextureOverlay>;
        public getOverlaySettings(presentationTimeUs: number): androidx.media3.effect.OverlaySettings;
        public release(): void;
        public getTextureId(param0: number): number;
        public getTextureSize(param0: number): androidx.media3.common.util.Size;
        public constructor();
        public configure(videoSize: androidx.media3.common.util.Size): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class TexturePool {
        public static class: java.lang.Class<androidx.media3.effect.TexturePool>;
        public freeTexture(textureInfo: androidx.media3.common.GlTextureInfo): void;
        public freeTextureCount(): number;
        public isConfigured(): boolean;
        public ensureConfigured(glObjectsProvider: androidx.media3.common.GlObjectsProvider, width: number, height: number): void;
        public capacity(): number;
        public useTexture(): androidx.media3.common.GlTextureInfo;
        public deleteAllTextures(): void;
        public freeTexture(): void;
        public constructor(useHighPrecisionColorComponents: boolean, capacity: number);
        public freeAllTextures(): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class ThumbnailStripEffect extends androidx.media3.effect.GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.ThumbnailStripEffect>;
        public getNextThumbnailIndex(): number;
        public isDone(): boolean;
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.ThumbnailStripShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public getNextTimestampMs(): number;
        public getNumberOfThumbnails(): number;
        public constructor(stripWidth: number, stripHeight: number);
        public setTimestampsMs(timestampsMs: java.util.List<java.lang.Long>): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class ThumbnailStripShaderProgram extends androidx.media3.effect.BaseGlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.ThumbnailStripShaderProgram>;
        public release(): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public configure(inputWidth: number, inputHeight: number): androidx.media3.common.util.Size;
        public shouldClearTextureBuffer(): boolean;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public flush(): void;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public signalEndOfCurrentInputStream(): void;
        public constructor(useHighPrecisionColorComponents: boolean, texturePoolCapacity: number);
        public drawFrame(this_: number, inputTexId: number): void;
        public constructor(this_: globalAndroid.content.Context, context: boolean, useHdr: androidx.media3.effect.ThumbnailStripEffect);
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class TimestampWrapper extends androidx.media3.effect.GlEffect {
        public static class: java.lang.Class<androidx.media3.effect.TimestampWrapper>;
        public glEffect: androidx.media3.effect.GlEffect;
        public startTimeUs: number;
        public endTimeUs: number;
        public constructor(glEffect: androidx.media3.effect.GlEffect, startTimeUs: number, endTimeUs: number);
        public toGlShaderProgram(param0: globalAndroid.content.Context, param1: boolean): androidx.media3.effect.GlShaderProgram;
        public isNoOp(inputWidth: number, inputHeight: number): boolean;
        public toGlShaderProgram(context: globalAndroid.content.Context, useHdr: boolean): androidx.media3.effect.GlShaderProgram;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class TimestampWrapperShaderProgram extends androidx.media3.effect.GlShaderProgram {
        public static class: java.lang.Class<androidx.media3.effect.TimestampWrapperShaderProgram>;
        public release(): void;
        public releaseOutputFrame(param0: androidx.media3.common.GlTextureInfo): void;
        public setErrorListener(param0: java.util.concurrent.Executor, param1: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public setOutputListener(outputListener: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public setErrorListener(errorListenerExecutor: java.util.concurrent.Executor, errorListener: androidx.media3.effect.GlShaderProgram.ErrorListener): void;
        public flush(): void;
        public signalEndOfCurrentInputStream(): void;
        public setInputListener(param0: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public releaseOutputFrame(outputTexture: androidx.media3.common.GlTextureInfo): void;
        public setInputListener(inputListener: androidx.media3.effect.GlShaderProgram.InputListener): void;
        public setOutputListener(param0: androidx.media3.effect.GlShaderProgram.OutputListener): void;
        public queueInputFrame(param0: androidx.media3.common.GlObjectsProvider, param1: androidx.media3.common.GlTextureInfo, param2: number): void;
        public constructor(context: globalAndroid.content.Context, useHdr: boolean, timestampWrapper: androidx.media3.effect.TimestampWrapper);
        public queueInputFrame(glObjectsProvider: androidx.media3.common.GlObjectsProvider, inputTexture: androidx.media3.common.GlTextureInfo, presentationTimeUs: number): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class VideoCompositor extends androidx.media3.effect.GlTextureProducer {
        public static class: java.lang.Class<androidx.media3.effect.VideoCompositor>;
        /**
         * Constructs a new instance of the androidx.media3.effect.VideoCompositor interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          registerInputSource(): number;
          signalEndOfInputSource(param0: number): void;
          queueInputTexture(
            param0: number,
            param1: androidx.media3.effect.GlTextureProducer,
            param2: androidx.media3.common.GlTextureInfo,
            param3: androidx.media3.common.ColorInfo,
            param4: number
          ): void;
          release(): void;
          releaseOutputTexture(param0: number): void;
        });
        public constructor();
        public signalEndOfInputSource(param0: number): void;
        public registerInputSource(): number;
        public release(): void;
        public releaseOutputTexture(param0: number): void;
        public queueInputTexture(
          param0: number,
          param1: androidx.media3.effect.GlTextureProducer,
          param2: androidx.media3.common.GlTextureInfo,
          param3: androidx.media3.common.ColorInfo,
          param4: number
        ): void;
      }
      export module VideoCompositor {
        export class Listener {
          public static class: java.lang.Class<androidx.media3.effect.VideoCompositor.Listener>;
          /**
           * Constructs a new instance of the androidx.media3.effect.VideoCompositor$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onError(param0: androidx.media3.common.VideoFrameProcessingException): void; onEnded(): void });
          public constructor();
          public onError(param0: androidx.media3.common.VideoFrameProcessingException): void;
          public onEnded(): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class VideoCompositorSettings {
        public static class: java.lang.Class<androidx.media3.effect.VideoCompositorSettings>;
        /**
         * Constructs a new instance of the androidx.media3.effect.VideoCompositorSettings interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          getOutputSize(param0: java.util.List<androidx.media3.common.util.Size>): androidx.media3.common.util.Size;
          getOverlaySettings(param0: number, param1: number): androidx.media3.effect.OverlaySettings;
          '<clinit>'(): void;
        });
        public constructor();
        public static DEFAULT: androidx.media3.effect.VideoCompositorSettings;
        public getOutputSize(param0: java.util.List<androidx.media3.common.util.Size>): androidx.media3.common.util.Size;
        public getOverlaySettings(param0: number, param1: number): androidx.media3.effect.OverlaySettings;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module effect {
      export class VideoFrameProcessingTaskExecutor {
        public static class: java.lang.Class<androidx.media3.effect.VideoFrameProcessingTaskExecutor>;
        public release(releaseTask: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task): void;
        public constructor(
          singleThreadExecutorService: java.util.concurrent.ExecutorService,
          shouldShutdownExecutorService: boolean,
          errorListener: androidx.media3.effect.VideoFrameProcessingTaskExecutor.ErrorListener
        );
        public submit(this_: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task): void;
        public submitWithHighPriority(task: androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task): void;
        public flush(): void;
      }
      export module VideoFrameProcessingTaskExecutor {
        export class ErrorListener {
          public static class: java.lang.Class<androidx.media3.effect.VideoFrameProcessingTaskExecutor.ErrorListener>;
          /**
           * Constructs a new instance of the androidx.media3.effect.VideoFrameProcessingTaskExecutor$ErrorListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { onError(param0: androidx.media3.common.VideoFrameProcessingException): void });
          public constructor();
          public onError(param0: androidx.media3.common.VideoFrameProcessingException): void;
        }
        export class Task {
          public static class: java.lang.Class<androidx.media3.effect.VideoFrameProcessingTaskExecutor.Task>;
          /**
           * Constructs a new instance of the androidx.media3.effect.VideoFrameProcessingTaskExecutor$Task interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { run(): void });
          public constructor();
          public run(): void;
        }
      }
    }
  }
}

//Generics information:
