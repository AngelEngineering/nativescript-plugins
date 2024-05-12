/* eslint-disable @typescript-eslint/no-loss-of-precision */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="android-declarations.d.ts"/>

declare module androidx {
  export module media3 {
    export module transformer {
      export class AssetLoader {
        public static class: java.lang.Class<androidx.media3.transformer.AssetLoader>;
        /**
         * Constructs a new instance of the androidx.media3.transformer.AssetLoader interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          start(): void;
          getProgress(param0: androidx.media3.transformer.ProgressHolder): number;
          getDecoderNames(): com.google.common.collect.ImmutableMap<java.lang.Integer, string>;
          release(): void;
        });
        public constructor();
        public static SUPPORTED_OUTPUT_TYPE_ENCODED: number = 1;
        public static SUPPORTED_OUTPUT_TYPE_DECODED: number = 2;
        public getDecoderNames(): com.google.common.collect.ImmutableMap<java.lang.Integer, string>;
        public release(): void;
        public start(): void;
        public getProgress(param0: androidx.media3.transformer.ProgressHolder): number;
      }
      export module AssetLoader {
        export class Factory {
          public static class: java.lang.Class<androidx.media3.transformer.AssetLoader.Factory>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.AssetLoader$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            createAssetLoader(
              param0: androidx.media3.transformer.EditedMediaItem,
              param1: globalAndroid.os.Looper,
              param2: androidx.media3.transformer.AssetLoader.Listener
            ): androidx.media3.transformer.AssetLoader;
          });
          public constructor();
          public createAssetLoader(
            param0: androidx.media3.transformer.EditedMediaItem,
            param1: globalAndroid.os.Looper,
            param2: androidx.media3.transformer.AssetLoader.Listener
          ): androidx.media3.transformer.AssetLoader;
        }
        export class Listener {
          public static class: java.lang.Class<androidx.media3.transformer.AssetLoader.Listener>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.AssetLoader$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onDurationUs(param0: number): void;
            onTrackCount(param0: number): void;
            onTrackAdded(param0: androidx.media3.common.Format, param1: number): boolean;
            onOutputFormat(param0: androidx.media3.common.Format): androidx.media3.transformer.SampleConsumer;
            onError(param0: androidx.media3.transformer.ExportException): void;
          });
          public constructor();
          public onDurationUs(param0: number): void;
          public onTrackAdded(param0: androidx.media3.common.Format, param1: number): boolean;
          public onOutputFormat(param0: androidx.media3.common.Format): androidx.media3.transformer.SampleConsumer;
          public onError(param0: androidx.media3.transformer.ExportException): void;
          public onTrackCount(param0: number): void;
        }
        export class SupportedOutputTypes {
          public static class: java.lang.Class<androidx.media3.transformer.AssetLoader.SupportedOutputTypes>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.AssetLoader$SupportedOutputTypes interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
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
    export module transformer {
      export class AudioGraph {
        public static class: java.lang.Class<androidx.media3.transformer.AudioGraph>;
        public release(): void;
        public isEnded(): boolean;
        public registerInput(sourceId: androidx.media3.transformer.EditedMediaItem, e: androidx.media3.common.Format): androidx.media3.transformer.AudioGraphInput;
        public getOutput(): java.nio.ByteBuffer;
        public getOutputAudioFormat(): androidx.media3.common.audio.AudioProcessor.AudioFormat;
        public constructor(mixerFactory: androidx.media3.transformer.AudioMixer.Factory);
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class AudioGraphInput extends androidx.media3.transformer.GraphInput {
        public static class: java.lang.Class<androidx.media3.transformer.AudioGraphInput>;
        public getPendingVideoFrameCount(): number;
        public release(): void;
        public onMediaItemChanged(param0: androidx.media3.transformer.EditedMediaItem, param1: number, param2: androidx.media3.common.Format, param3: boolean): void;
        public signalEndOfVideoInput(): void;
        public queueInputBuffer(): boolean;
        public onMediaItemChanged(this_: androidx.media3.transformer.EditedMediaItem, editedMediaItem: number, durationUs: androidx.media3.common.Format, trackFormat: boolean): void;
        public queueInputBitmap(inputBitmap: globalAndroid.graphics.Bitmap, inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator): number;
        public queueInputTexture(texId: number, presentationTimeUs: number): number;
        public getOutputAudioFormat(): androidx.media3.common.audio.AudioProcessor.AudioFormat;
        public isEnded(): boolean;
        public constructor(i: androidx.media3.transformer.EditedMediaItem, this_: androidx.media3.common.Format);
        public getInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
        public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
        public getOutput(): java.nio.ByteBuffer;
        public getExpectedInputColorInfo(): androidx.media3.common.ColorInfo;
        public registerVideoFrame(presentationTimeUs: number): boolean;
        public getInputSurface(): globalAndroid.view.Surface;
      }
      export module AudioGraphInput {
        export class MediaItemChange {
          public static class: java.lang.Class<androidx.media3.transformer.AudioGraphInput.MediaItemChange>;
          public editedMediaItem: androidx.media3.transformer.EditedMediaItem;
          public durationUs: number;
          public format: androidx.media3.common.Format;
          public isLast: boolean;
          public constructor(editedMediaItem: androidx.media3.transformer.EditedMediaItem, durationUs: number, format: androidx.media3.common.Format, isLast: boolean);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class AudioMixer {
        public static class: java.lang.Class<androidx.media3.transformer.AudioMixer>;
        /**
         * Constructs a new instance of the androidx.media3.transformer.AudioMixer interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          create(): androidx.media3.transformer.AudioMixer;
          configure(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat, param1: number, param2: number): void;
          setEndTimeUs(param0: number): void;
          supportsSourceAudioFormat(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat): boolean;
          addSource(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat, param1: number): number;
          hasSource(param0: number): boolean;
          setSourceVolume(param0: number, param1: number): void;
          removeSource(param0: number): void;
          queueInput(param0: number, param1: java.nio.ByteBuffer): void;
          getOutput(): java.nio.ByteBuffer;
          isEnded(): boolean;
          reset(): void;
        });
        public constructor();
        public reset(): void;
        public setEndTimeUs(param0: number): void;
        public isEnded(): boolean;
        public setSourceVolume(param0: number, param1: number): void;
        public hasSource(param0: number): boolean;
        public removeSource(param0: number): void;
        public getOutput(): java.nio.ByteBuffer;
        public supportsSourceAudioFormat(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat): boolean;
        public addSource(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat, param1: number): number;
        /** @deprecated */
        public static create(): androidx.media3.transformer.AudioMixer;
        public configure(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat, param1: number, param2: number): void;
        public queueInput(param0: number, param1: java.nio.ByteBuffer): void;
      }
      export module AudioMixer {
        export class Factory {
          public static class: java.lang.Class<androidx.media3.transformer.AudioMixer.Factory>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.AudioMixer$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { create(): androidx.media3.transformer.AudioMixer });
          public constructor();
          public create(): androidx.media3.transformer.AudioMixer;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class AudioSampleExporter extends androidx.media3.transformer.SampleExporter {
        public static class: java.lang.Class<androidx.media3.transformer.AudioSampleExporter>;
        public constructor(
          firstAssetLoaderTrackFormat: androidx.media3.common.Format,
          firstInputFormat: androidx.media3.common.Format,
          transformationRequest: androidx.media3.transformer.TransformationRequest,
          firstEditedMediaItem: androidx.media3.transformer.EditedMediaItem,
          mixerFactory: androidx.media3.transformer.AudioMixer.Factory,
          encoderFactory: androidx.media3.transformer.Codec.EncoderFactory,
          muxerWrapper: androidx.media3.transformer.MuxerWrapper,
          fallbackListener: androidx.media3.transformer.FallbackListener
        );
        public getInput(param0: androidx.media3.transformer.EditedMediaItem, param1: androidx.media3.common.Format): androidx.media3.transformer.GraphInput;
        public getMuxerInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
        public releaseMuxerInputBuffer(): void;
        public release(): void;
        public getInput(item: androidx.media3.transformer.EditedMediaItem, format: androidx.media3.common.Format): androidx.media3.transformer.AudioGraphInput;
        public getMuxerInputFormat(): androidx.media3.common.Format;
        public processDataUpToMuxer(): boolean;
        public constructor(firstInputFormat: androidx.media3.common.Format, muxerWrapper: androidx.media3.transformer.MuxerWrapper);
        public isMuxerInputEnded(): boolean;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class BuildConfig {
        public static class: java.lang.Class<androidx.media3.transformer.BuildConfig>;
        public static DEBUG: boolean = 0;
        public static LIBRARY_PACKAGE_NAME: string = 'androidx.media3.transformer';
        public static BUILD_TYPE: string = 'release';
        public constructor();
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class CapturingDecoderFactory extends androidx.media3.transformer.Codec.DecoderFactory {
        public static class: java.lang.Class<androidx.media3.transformer.CapturingDecoderFactory>;
        public getAudioDecoderName(): string;
        public createForAudioDecoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
        public createForVideoDecoding(param0: androidx.media3.common.Format, param1: globalAndroid.view.Surface, param2: boolean): androidx.media3.transformer.Codec;
        public createForAudioDecoding(format: androidx.media3.common.Format): androidx.media3.transformer.Codec;
        public constructor(decoderFactory: androidx.media3.transformer.Codec.DecoderFactory);
        public getVideoDecoderName(): string;
        public createForVideoDecoding(format: androidx.media3.common.Format, outputSurface: globalAndroid.view.Surface, requestSdrToneMapping: boolean): androidx.media3.transformer.Codec;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class CapturingEncoderFactory extends androidx.media3.transformer.Codec.EncoderFactory {
        public static class: java.lang.Class<androidx.media3.transformer.CapturingEncoderFactory>;
        public createForAudioEncoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
        public getAudioEncoderName(): string;
        public createForAudioEncoding(format: androidx.media3.common.Format): androidx.media3.transformer.Codec;
        public createForVideoEncoding(format: androidx.media3.common.Format): androidx.media3.transformer.Codec;
        public getVideoEncoderName(): string;
        public constructor(encoderFactory: androidx.media3.transformer.Codec.EncoderFactory);
        public createForVideoEncoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
        public videoNeedsEncoding(): boolean;
        public audioNeedsEncoding(): boolean;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class Codec {
        public static class: java.lang.Class<androidx.media3.transformer.Codec>;
        /**
         * Constructs a new instance of the androidx.media3.transformer.Codec interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          getConfigurationFormat(): androidx.media3.common.Format;
          getName(): string;
          getInputSurface(): globalAndroid.view.Surface;
          getMaxPendingFrameCount(): number;
          maybeDequeueInputBuffer(param0: androidx.media3.decoder.DecoderInputBuffer): boolean;
          queueInputBuffer(param0: androidx.media3.decoder.DecoderInputBuffer): void;
          signalEndOfInputStream(): void;
          getOutputFormat(): androidx.media3.common.Format;
          getOutputBuffer(): java.nio.ByteBuffer;
          getOutputBufferInfo(): globalAndroid.media.MediaCodec.BufferInfo;
          releaseOutputBuffer(param0: boolean): void;
          releaseOutputBuffer(param0: number): void;
          isEnded(): boolean;
          release(): void;
        });
        public constructor();
        public signalEndOfInputStream(): void;
        public getOutputFormat(): androidx.media3.common.Format;
        public release(): void;
        public releaseOutputBuffer(param0: number): void;
        public getName(): string;
        public getOutputBuffer(): java.nio.ByteBuffer;
        public getOutputBufferInfo(): globalAndroid.media.MediaCodec.BufferInfo;
        public getMaxPendingFrameCount(): number;
        public queueInputBuffer(param0: androidx.media3.decoder.DecoderInputBuffer): void;
        public isEnded(): boolean;
        public maybeDequeueInputBuffer(param0: androidx.media3.decoder.DecoderInputBuffer): boolean;
        public releaseOutputBuffer(param0: boolean): void;
        public getConfigurationFormat(): androidx.media3.common.Format;
        public getInputSurface(): globalAndroid.view.Surface;
      }
      export module Codec {
        export class DecoderFactory {
          public static class: java.lang.Class<androidx.media3.transformer.Codec.DecoderFactory>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.Codec$DecoderFactory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            createForAudioDecoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
            createForVideoDecoding(param0: androidx.media3.common.Format, param1: globalAndroid.view.Surface, param2: boolean): androidx.media3.transformer.Codec;
          });
          public constructor();
          public createForVideoDecoding(param0: androidx.media3.common.Format, param1: globalAndroid.view.Surface, param2: boolean): androidx.media3.transformer.Codec;
          public createForAudioDecoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
        }
        export class EncoderFactory {
          public static class: java.lang.Class<androidx.media3.transformer.Codec.EncoderFactory>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.Codec$EncoderFactory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            createForAudioEncoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
            createForVideoEncoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
            audioNeedsEncoding(): boolean;
            videoNeedsEncoding(): boolean;
          });
          public constructor();
          public audioNeedsEncoding(): boolean;
          public createForVideoEncoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
          public videoNeedsEncoding(): boolean;
          public createForAudioEncoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class Composition {
        public static class: java.lang.Class<androidx.media3.transformer.Composition>;
        public static HDR_MODE_KEEP_HDR: number = 0;
        public static HDR_MODE_TONE_MAP_HDR_TO_SDR_USING_MEDIACODEC: number = 1;
        public static HDR_MODE_TONE_MAP_HDR_TO_SDR_USING_OPEN_GL: number = 2;
        public static HDR_MODE_EXPERIMENTAL_FORCE_INTERPRET_HDR_AS_SDR: number = 3;
        public sequences: com.google.common.collect.ImmutableList<androidx.media3.transformer.EditedMediaItemSequence>;
        public videoCompositorSettings: androidx.media3.effect.VideoCompositorSettings;
        public effects: androidx.media3.transformer.Effects;
        public forceAudioTrack: boolean;
        public transmuxAudio: boolean;
        public transmuxVideo: boolean;
        public hdrMode: number;
      }
      export module Composition {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.transformer.Composition.Builder>;
          public setVideoCompositorSettings(videoCompositorSettings: androidx.media3.effect.VideoCompositorSettings): androidx.media3.transformer.Composition.Builder;
          public setTransmuxAudio(transmuxAudio: boolean): androidx.media3.transformer.Composition.Builder;
          public constructor(sequences: java.util.List<androidx.media3.transformer.EditedMediaItemSequence>);
          public setTransmuxVideo(transmuxVideo: boolean): androidx.media3.transformer.Composition.Builder;
          public setEffects(effects: androidx.media3.transformer.Effects): androidx.media3.transformer.Composition.Builder;
          public build(): androidx.media3.transformer.Composition;
          public constructor(sequences: androidNative.Array<androidx.media3.transformer.EditedMediaItemSequence>);
          public experimentalSetForceAudioTrack(forceAudioTrack: boolean): androidx.media3.transformer.Composition.Builder;
          public setHdrMode(hdrMode: number): androidx.media3.transformer.Composition.Builder;
        }
        export class HdrMode {
          public static class: java.lang.Class<androidx.media3.transformer.Composition.HdrMode>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.Composition$HdrMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
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
    export module transformer {
      export class DefaultAssetLoaderFactory extends androidx.media3.transformer.AssetLoader.Factory {
        public static class: java.lang.Class<androidx.media3.transformer.DefaultAssetLoaderFactory>;
        public constructor(
          context: globalAndroid.content.Context,
          decoderFactory: androidx.media3.transformer.Codec.DecoderFactory,
          forceInterpretHdrAsSdr: boolean,
          clock: androidx.media3.common.util.Clock
        );
        public constructor(
          context: globalAndroid.content.Context,
          decoderFactory: androidx.media3.transformer.Codec.DecoderFactory,
          forceInterpretHdrAsSdr: boolean,
          clock: androidx.media3.common.util.Clock,
          mediaSourceFactory: androidx.media3.exoplayer.source.MediaSource.Factory
        );
        public createAssetLoader(
          param0: androidx.media3.transformer.EditedMediaItem,
          param1: globalAndroid.os.Looper,
          param2: androidx.media3.transformer.AssetLoader.Listener
        ): androidx.media3.transformer.AssetLoader;
        public createAssetLoader(
          editedMediaItem: androidx.media3.transformer.EditedMediaItem,
          looper: globalAndroid.os.Looper,
          listener: androidx.media3.transformer.AssetLoader.Listener
        ): androidx.media3.transformer.AssetLoader;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class DefaultAudioMixer extends androidx.media3.transformer.AudioMixer {
        public static class: java.lang.Class<androidx.media3.transformer.DefaultAudioMixer>;
        public setEndTimeUs(param0: number): void;
        public setSourceVolume(param0: number, param1: number): void;
        public addSource(sourceFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat, startTimeUs: number): number;
        public supportsSourceAudioFormat(sourceFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): boolean;
        public addSource(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat, param1: number): number;
        /** @deprecated */
        public static create(): androidx.media3.transformer.AudioMixer;
        public configure(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat, param1: number, param2: number): void;
        public hasSource(sourceId: number): boolean;
        public setSourceVolume(sourceId: number, volume: number): void;
        public reset(): void;
        public setEndTimeUs(endTimeUs: number): void;
        public isEnded(): boolean;
        public hasSource(param0: number): boolean;
        public removeSource(param0: number): void;
        public queueInput(mixingBuffer: number, this_: java.nio.ByteBuffer): void;
        public getOutput(): java.nio.ByteBuffer;
        public removeSource(sourceId: number): void;
        public supportsSourceAudioFormat(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat): boolean;
        public configure(outputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat, bufferSizeMs: number, startTimeUs: number): void;
        public queueInput(param0: number, param1: java.nio.ByteBuffer): void;
      }
      export module DefaultAudioMixer {
        export class Factory extends androidx.media3.transformer.AudioMixer.Factory {
          public static class: java.lang.Class<androidx.media3.transformer.DefaultAudioMixer.Factory>;
          public constructor();
          public create(): androidx.media3.transformer.DefaultAudioMixer;
          public constructor(outputSilenceWithNoSources: boolean);
          public create(): androidx.media3.transformer.AudioMixer;
        }
        export class MixingBuffer {
          public static class: java.lang.Class<androidx.media3.transformer.DefaultAudioMixer.MixingBuffer>;
          public buffer: java.nio.ByteBuffer;
          public position: number;
          public limit: number;
          public constructor(buffer: java.nio.ByteBuffer, position: number, limit: number);
        }
        export class SourceInfo {
          public static class: java.lang.Class<androidx.media3.transformer.DefaultAudioMixer.SourceInfo>;
          public position: number;
          public setVolume(volume: number): void;
          public getChannelMixingMatrix(): androidx.media3.common.audio.ChannelMixingMatrix;
          public getPositionAfterBuffer(sourceBuffer: java.nio.ByteBuffer): number;
          public constructor(audioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat, baseChannelMixingMatrix: androidx.media3.common.audio.ChannelMixingMatrix, startFrameOffset: number);
          public mixTo(sourceBuffer: java.nio.ByteBuffer, newPosition: number, mixingBuffer: java.nio.ByteBuffer, mixingAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): void;
          public discardTo(sourceBuffer: java.nio.ByteBuffer, newPosition: number): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class DefaultCodec extends androidx.media3.transformer.Codec {
        public static class: java.lang.Class<androidx.media3.transformer.DefaultCodec>;
        public static DEFAULT_PCM_ENCODING: number = 2;
        public signalEndOfInputStream(): void;
        public getOutputFormat(): androidx.media3.common.Format;
        public release(): void;
        public releaseOutputBuffer(param0: number): void;
        public getName(): string;
        public getOutputBuffer(): java.nio.ByteBuffer;
        public getOutputBufferInfo(): globalAndroid.media.MediaCodec.BufferInfo;
        public getMaxPendingFrameCount(): number;
        public maybeDequeueInputBuffer(e: androidx.media3.decoder.DecoderInputBuffer): boolean;
        public releaseOutputBuffer(renderPresentationTimeUs: number): void;
        public queueInputBuffer(param0: androidx.media3.decoder.DecoderInputBuffer): void;
        public isEnded(): boolean;
        public releaseOutputBuffer(render: boolean): void;
        public maybeDequeueInputBuffer(param0: androidx.media3.decoder.DecoderInputBuffer): boolean;
        public releaseOutputBuffer(param0: boolean): void;
        public getConfigurationFormat(): androidx.media3.common.Format;
        public releaseOutputBuffer(this_: boolean, render: number): void;
        public constructor(
          errorCode: globalAndroid.content.Context,
          errorCode: androidx.media3.common.Format,
          e: globalAndroid.media.MediaFormat,
          this_: string,
          context: boolean,
          configurationFormat: globalAndroid.view.Surface
        );
        public getInputSurface(): globalAndroid.view.Surface;
        public queueInputBuffer(this_: androidx.media3.decoder.DecoderInputBuffer): void;
      }
      export module DefaultCodec {
        export class Api29 {
          public static class: java.lang.Class<androidx.media3.transformer.DefaultCodec.Api29>;
          public static getCanonicalName(mediaCodec: globalAndroid.media.MediaCodec): string;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class DefaultDecoderFactory extends androidx.media3.transformer.Codec.DecoderFactory {
        public static class: java.lang.Class<androidx.media3.transformer.DefaultDecoderFactory>;
        public createForVideoDecoding(codecMimeType: androidx.media3.common.Format, mediaCodecName: globalAndroid.view.Surface, e: boolean): androidx.media3.transformer.DefaultCodec;
        public createForAudioDecoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
        public createForVideoDecoding(param0: androidx.media3.common.Format, param1: globalAndroid.view.Surface, param2: boolean): androidx.media3.transformer.Codec;
        public constructor(context: globalAndroid.content.Context);
        public createForAudioDecoding(codecMimeType: androidx.media3.common.Format): androidx.media3.transformer.DefaultCodec;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class DefaultEncoderFactory extends androidx.media3.transformer.Codec.EncoderFactory {
        public static class: java.lang.Class<androidx.media3.transformer.DefaultEncoderFactory>;
        /** @deprecated */
        public constructor(context: globalAndroid.content.Context, videoEncoderSelector: androidx.media3.transformer.EncoderSelector, enableFallback: boolean);
        public createForAudioEncoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
        /** @deprecated */
        public constructor(context: globalAndroid.content.Context);
        public createForVideoEncoding(param0: androidx.media3.common.Format): androidx.media3.transformer.Codec;
        /** @deprecated */
        public constructor(
          context: globalAndroid.content.Context,
          videoEncoderSelector: androidx.media3.transformer.EncoderSelector,
          requestedVideoEncoderSettings: androidx.media3.transformer.VideoEncoderSettings,
          enableFallback: boolean
        );
        public videoNeedsEncoding(): boolean;
        public createForAudioEncoding(format: androidx.media3.common.Format): androidx.media3.transformer.DefaultCodec;
        public createForVideoEncoding(finalBitrate: androidx.media3.common.Format): androidx.media3.transformer.DefaultCodec;
        public audioNeedsEncoding(): boolean;
      }
      export module DefaultEncoderFactory {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.transformer.DefaultEncoderFactory.Builder>;
          public setVideoEncoderSelector(videoEncoderSelector: androidx.media3.transformer.EncoderSelector): androidx.media3.transformer.DefaultEncoderFactory.Builder;
          public setRequestedVideoEncoderSettings(requestedVideoEncoderSettings: androidx.media3.transformer.VideoEncoderSettings): androidx.media3.transformer.DefaultEncoderFactory.Builder;
          public constructor(context: globalAndroid.content.Context);
          public setEnableFallback(enableFallback: boolean): androidx.media3.transformer.DefaultEncoderFactory.Builder;
          public build(): androidx.media3.transformer.DefaultEncoderFactory;
        }
        export class EncoderFallbackCost {
          public static class: java.lang.Class<androidx.media3.transformer.DefaultEncoderFactory.EncoderFallbackCost>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.DefaultEncoderFactory$EncoderFallbackCost interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { getParameterSupportGap(param0: globalAndroid.media.MediaCodecInfo): number });
          public constructor();
          public getParameterSupportGap(param0: globalAndroid.media.MediaCodecInfo): number;
        }
        export class VideoEncoderQueryResult {
          public static class: java.lang.Class<androidx.media3.transformer.DefaultEncoderFactory.VideoEncoderQueryResult>;
          public encoder: globalAndroid.media.MediaCodecInfo;
          public supportedFormat: androidx.media3.common.Format;
          public supportedEncoderSettings: androidx.media3.transformer.VideoEncoderSettings;
          public constructor(encoder: globalAndroid.media.MediaCodecInfo, supportedFormat: androidx.media3.common.Format, supportedEncoderSettings: androidx.media3.transformer.VideoEncoderSettings);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class DefaultMuxer extends androidx.media3.transformer.Muxer {
        public static class: java.lang.Class<androidx.media3.transformer.DefaultMuxer>;
        public release(param0: boolean): void;
        public writeSampleData(trackIndex: number, data: java.nio.ByteBuffer, presentationTimeUs: number, flags: number): void;
        public writeSampleData(param0: number, param1: java.nio.ByteBuffer, param2: number, param3: number): void;
        public addMetadata(metadata: androidx.media3.common.Metadata): void;
        public getMaxDelayBetweenSamplesMs(): number;
        public release(forCancellation: boolean): void;
        public addTrack(param0: androidx.media3.common.Format): number;
        public addTrack(format: androidx.media3.common.Format): number;
        public addMetadata(param0: androidx.media3.common.Metadata): void;
      }
      export module DefaultMuxer {
        export class Factory extends androidx.media3.transformer.Muxer.Factory {
          public static class: java.lang.Class<androidx.media3.transformer.DefaultMuxer.Factory>;
          public static DEFAULT_MAX_DELAY_BETWEEN_SAMPLES_MS: number = 10000;
          public getSupportedSampleMimeTypes(param0: number): com.google.common.collect.ImmutableList<string>;
          public constructor();
          public constructor(maxDelayBetweenSamplesMs: number, videoDurationMs: number);
          public create(path: string): androidx.media3.transformer.Muxer;
          public constructor(maxDelayBetweenSamplesMs: number);
          public create(param0: string): androidx.media3.transformer.Muxer;
          public getSupportedSampleMimeTypes(trackType: number): com.google.common.collect.ImmutableList<string>;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class DeviceMappedEncoderBitrateProvider extends androidx.media3.transformer.EncoderBitrateProvider {
        public static class: java.lang.Class<androidx.media3.transformer.DeviceMappedEncoderBitrateProvider>;
        public getBitrate(param0: string, param1: number, param2: number, param3: number): number;
        public getBitrate(encoderName: string, width: number, height: number, frameRate: number): number;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class EditedMediaItem {
        public static class: java.lang.Class<androidx.media3.transformer.EditedMediaItem>;
        public mediaItem: androidx.media3.common.MediaItem;
        public removeAudio: boolean;
        public removeVideo: boolean;
        public flattenForSlowMotion: boolean;
        public durationUs: number;
        public frameRate: number;
        public effects: androidx.media3.transformer.Effects;
      }
      export module EditedMediaItem {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.transformer.EditedMediaItem.Builder>;
          public setFrameRate(frameRate: number): androidx.media3.transformer.EditedMediaItem.Builder;
          public setDurationUs(durationUs: number): androidx.media3.transformer.EditedMediaItem.Builder;
          public setRemoveAudio(removeAudio: boolean): androidx.media3.transformer.EditedMediaItem.Builder;
          public constructor(mediaItem: androidx.media3.common.MediaItem);
          public setEffects(effects: androidx.media3.transformer.Effects): androidx.media3.transformer.EditedMediaItem.Builder;
          public setRemoveVideo(removeVideo: boolean): androidx.media3.transformer.EditedMediaItem.Builder;
          public setFlattenForSlowMotion(flattenForSlowMotion: boolean): androidx.media3.transformer.EditedMediaItem.Builder;
          public build(): androidx.media3.transformer.EditedMediaItem;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class EditedMediaItemSequence {
        public static class: java.lang.Class<androidx.media3.transformer.EditedMediaItemSequence>;
        public editedMediaItems: com.google.common.collect.ImmutableList<androidx.media3.transformer.EditedMediaItem>;
        public isLooping: boolean;
        public constructor(editedMediaItems: androidNative.Array<androidx.media3.transformer.EditedMediaItem>);
        public constructor(editedMediaItems: java.util.List<androidx.media3.transformer.EditedMediaItem>);
        public constructor(editedMediaItems: java.util.List<androidx.media3.transformer.EditedMediaItem>, isLooping: boolean);
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class Effects {
        public static class: java.lang.Class<androidx.media3.transformer.Effects>;
        public static EMPTY: androidx.media3.transformer.Effects;
        public audioProcessors: com.google.common.collect.ImmutableList<androidx.media3.common.audio.AudioProcessor>;
        public videoEffects: com.google.common.collect.ImmutableList<androidx.media3.common.Effect>;
        public constructor(audioProcessors: java.util.List<androidx.media3.common.audio.AudioProcessor>, videoEffects: java.util.List<androidx.media3.common.Effect>);
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class EncodedSampleExporter extends androidx.media3.transformer.SampleExporter implements androidx.media3.transformer.GraphInput {
        public static class: java.lang.Class<androidx.media3.transformer.EncodedSampleExporter>;
        public getPendingVideoFrameCount(): number;
        public release(): void;
        public onMediaItemChanged(param0: androidx.media3.transformer.EditedMediaItem, param1: number, param2: androidx.media3.common.Format, param3: boolean): void;
        public signalEndOfVideoInput(): void;
        public queueInputBuffer(): boolean;
        public getMuxerInputFormat(): androidx.media3.common.Format;
        public queueInputBitmap(inputBitmap: globalAndroid.graphics.Bitmap, inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator): number;
        public queueInputTexture(texId: number, presentationTimeUs: number): number;
        public onMediaItemChanged(editedMediaItem: androidx.media3.transformer.EditedMediaItem, durationUs: number, trackFormat: androidx.media3.common.Format, isLast: boolean): void;
        public isMuxerInputEnded(): boolean;
        public getMuxerInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
        public releaseMuxerInputBuffer(): void;
        public getInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
        public constructor(
          i: androidx.media3.common.Format,
          this_: androidx.media3.transformer.TransformationRequest,
          format: androidx.media3.transformer.MuxerWrapper,
          transformationRequest: androidx.media3.transformer.FallbackListener
        );
        public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
        public getExpectedInputColorInfo(): androidx.media3.common.ColorInfo;
        public registerVideoFrame(presentationTimeUs: number): boolean;
        public constructor(firstInputFormat: androidx.media3.common.Format, muxerWrapper: androidx.media3.transformer.MuxerWrapper);
        public getInput(item: androidx.media3.transformer.EditedMediaItem, format: androidx.media3.common.Format): androidx.media3.transformer.GraphInput;
        public getInputSurface(): globalAndroid.view.Surface;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class EncoderBitrateProvider {
        public static class: java.lang.Class<androidx.media3.transformer.EncoderBitrateProvider>;
        /**
         * Constructs a new instance of the androidx.media3.transformer.EncoderBitrateProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { getBitrate(param0: string, param1: number, param2: number, param3: number): number });
        public constructor();
        public getBitrate(param0: string, param1: number, param2: number, param3: number): number;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class EncoderSelector {
        public static class: java.lang.Class<androidx.media3.transformer.EncoderSelector>;
        /**
         * Constructs a new instance of the androidx.media3.transformer.EncoderSelector interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          selectEncoderInfos(param0: string): com.google.common.collect.ImmutableList<globalAndroid.media.MediaCodecInfo>;
          lambda$static$1(mimeType: string): com.google.common.collect.ImmutableList;
          lambda$static$0(mimeType: string, encoderInfo: globalAndroid.media.MediaCodecInfo): boolean;
          '<clinit>'(): void;
        });
        public constructor();
        public static DEFAULT: androidx.media3.transformer.EncoderSelector;
        public selectEncoderInfos(param0: string): com.google.common.collect.ImmutableList<globalAndroid.media.MediaCodecInfo>;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class EncoderUtil {
        public static class: java.lang.Class<androidx.media3.transformer.EncoderUtil>;
        public static LEVEL_UNSET: number = -1;
        public static getSupportedHeights(encoderInfo: globalAndroid.media.MediaCodecInfo, mimeType: string, width: number): globalAndroid.util.Range<java.lang.Integer>;
        public static getSupportedBitrateRange(encoderInfo: globalAndroid.media.MediaCodecInfo, mimeType: string): globalAndroid.util.Range<java.lang.Integer>;
        public static clearCachedEncoders(): void;
        public static getSupportedEncodersForHdrEditing(
          codecProfileLevel: string,
          mediaCodecInfo: androidx.media3.common.ColorInfo
        ): com.google.common.collect.ImmutableList<globalAndroid.media.MediaCodecInfo>;
        public static isHardwareAccelerated(encoderInfo: globalAndroid.media.MediaCodecInfo, mimeType: string): boolean;
        public static getCodecProfilesForHdrFormat(mimeType: string, colorTransfer: number): com.google.common.collect.ImmutableList<java.lang.Integer>;
        public static getSupportedColorFormats(encoderInfo: globalAndroid.media.MediaCodecInfo, mimeType: string): com.google.common.collect.ImmutableList<java.lang.Integer>;
        public static getSupportedResolutionRanges(
          encoderInfo: globalAndroid.media.MediaCodecInfo,
          mimeType: string
        ): globalAndroid.util.Pair<globalAndroid.util.Range<java.lang.Integer>, globalAndroid.util.Range<java.lang.Integer>>;
        public static getSupportedEncoders(mimeType: string): com.google.common.collect.ImmutableList<globalAndroid.media.MediaCodecInfo>;
        public static getMaxSupportedInstances(encoderInfo: globalAndroid.media.MediaCodecInfo, mimeType: string): number;
        public static getSupportedResolution(reductionFactor: globalAndroid.media.MediaCodecInfo, encoderInfo: string, mimeType: number, width: number): any;
        public static isFeatureSupported(encoderInfo: globalAndroid.media.MediaCodecInfo, mimeType: string, featureName: string): boolean;
        public static isBitrateModeSupported(encoderInfo: globalAndroid.media.MediaCodecInfo, mimeType: string, bitrateMode: number): boolean;
        public static findSupportedEncodingProfiles(profileLevel: globalAndroid.media.MediaCodecInfo, encoderInfo: string): com.google.common.collect.ImmutableSet<java.lang.Integer>;
        public static findCodecForFormat(e: globalAndroid.media.MediaFormat, format: boolean): string;
        public static getSupportedMimeTypes(): com.google.common.collect.ImmutableSet<string>;
        public static isSizeSupported(encoderInfo: globalAndroid.media.MediaCodecInfo, mimeType: string, width: number, height: number): boolean;
        public static findHighestSupportedEncodingLevel(profileLevel: globalAndroid.media.MediaCodecInfo, encoderInfo: string, mimeType: number): number;
      }
      export module EncoderUtil {
        export class Api29 {
          public static class: java.lang.Class<androidx.media3.transformer.EncoderUtil.Api29>;
          public static isHardwareAccelerated(encoderInfo: globalAndroid.media.MediaCodecInfo): boolean;
          public static isSoftwareOnly(encoderInfo: globalAndroid.media.MediaCodecInfo): boolean;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class ExoAssetLoaderAudioRenderer extends androidx.media3.transformer.ExoAssetLoaderBaseRenderer {
        public static class: java.lang.Class<androidx.media3.transformer.ExoAssetLoaderAudioRenderer>;
        public initDecoder(inputFormat: androidx.media3.common.Format): void;
        public shouldDropInputBuffer(inputBuffer: androidx.media3.decoder.DecoderInputBuffer): boolean;
        public getName(): string;
        public feedConsumerFromDecoder(): boolean;
        public constructor(trackType: number, mediaClock: androidx.media3.transformer.TransformerMediaClock, assetLoaderListener: androidx.media3.transformer.AssetLoader.Listener);
        public constructor(
          decoderFactory: androidx.media3.transformer.Codec.DecoderFactory,
          mediaClock: androidx.media3.transformer.TransformerMediaClock,
          assetLoaderListener: androidx.media3.transformer.AssetLoader.Listener
        );
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export abstract class ExoAssetLoaderBaseRenderer {
        public static class: java.lang.Class<androidx.media3.transformer.ExoAssetLoaderBaseRenderer>;
        public streamStartPositionUs: number;
        public streamOffsetUs: number;
        public sampleConsumer: androidx.media3.transformer.SampleConsumer;
        public decoder: androidx.media3.transformer.Codec;
        public initDecoder(param0: androidx.media3.common.Format): void;
        public onEnabled(joining: boolean, mayRenderStartOfStream: boolean): void;
        public onStreamChanged(
          formats: androidNative.Array<androidx.media3.common.Format>,
          startPositionUs: number,
          offsetUs: number,
          mediaPeriodId: androidx.media3.exoplayer.source.MediaSource.MediaPeriodId
        ): void;
        public supportsFormat(format: androidx.media3.common.Format): number;
        public isReady(): boolean;
        public feedConsumerFromDecoder(): boolean;
        public onStarted(): void;
        public onReset(): void;
        public onInputFormatRead(inputFormat: androidx.media3.common.Format): void;
        public isEnded(): boolean;
        public onDecoderInputReady(inputBuffer: androidx.media3.decoder.DecoderInputBuffer): void;
        public shouldDropInputBuffer(inputBuffer: androidx.media3.decoder.DecoderInputBuffer): boolean;
        public constructor(trackType: number, mediaClock: androidx.media3.transformer.TransformerMediaClock, assetLoaderListener: androidx.media3.transformer.AssetLoader.Listener);
        public render(e: number, this_: number): void;
        public onStopped(): void;
        public overrideFormat(inputFormat: androidx.media3.common.Format): androidx.media3.common.Format;
        public getMediaClock(): androidx.media3.exoplayer.MediaClock;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class ExoAssetLoaderVideoRenderer extends androidx.media3.transformer.ExoAssetLoaderBaseRenderer {
        public static class: java.lang.Class<androidx.media3.transformer.ExoAssetLoaderVideoRenderer>;
        public onInputFormatRead(inputFormat: androidx.media3.common.Format): void;
        public initDecoder(inputFormat: androidx.media3.common.Format): void;
        public onDecoderInputReady(inputBuffer: androidx.media3.decoder.DecoderInputBuffer): void;
        public constructor(
          flattenForSlowMotion: boolean,
          decoderFactory: androidx.media3.transformer.Codec.DecoderFactory,
          forceInterpretHdrAsSdr: boolean,
          mediaClock: androidx.media3.transformer.TransformerMediaClock,
          assetLoaderListener: androidx.media3.transformer.AssetLoader.Listener
        );
        public getName(): string;
        public feedConsumerFromDecoder(): boolean;
        public constructor(trackType: number, mediaClock: androidx.media3.transformer.TransformerMediaClock, assetLoaderListener: androidx.media3.transformer.AssetLoader.Listener);
        public overrideFormat(inputFormat: androidx.media3.common.Format): androidx.media3.common.Format;
        public shouldDropInputBuffer(shouldDropInputBuffer: androidx.media3.decoder.DecoderInputBuffer): boolean;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class ExoPlayerAssetLoader extends androidx.media3.transformer.AssetLoader {
        public static class: java.lang.Class<androidx.media3.transformer.ExoPlayerAssetLoader>;
        public getDecoderNames(): com.google.common.collect.ImmutableMap<java.lang.Integer, string>;
        public release(): void;
        public start(): void;
        public getProgress(param0: androidx.media3.transformer.ProgressHolder): number;
        public getProgress(positionMs: androidx.media3.transformer.ProgressHolder): number;
      }
      export module ExoPlayerAssetLoader {
        export class Factory extends androidx.media3.transformer.AssetLoader.Factory {
          public static class: java.lang.Class<androidx.media3.transformer.ExoPlayerAssetLoader.Factory>;
          public constructor(
            context: globalAndroid.content.Context,
            decoderFactory: androidx.media3.transformer.Codec.DecoderFactory,
            forceInterpretHdrAsSdr: boolean,
            clock: androidx.media3.common.util.Clock
          );
          public constructor(
            context: globalAndroid.content.Context,
            decoderFactory: androidx.media3.transformer.Codec.DecoderFactory,
            forceInterpretHdrAsSdr: boolean,
            clock: androidx.media3.common.util.Clock,
            mediaSourceFactory: androidx.media3.exoplayer.source.MediaSource.Factory
          );
          public createAssetLoader(
            this_: androidx.media3.transformer.EditedMediaItem,
            editedMediaItem: globalAndroid.os.Looper,
            looper: androidx.media3.transformer.AssetLoader.Listener
          ): androidx.media3.transformer.AssetLoader;
          public createAssetLoader(
            param0: androidx.media3.transformer.EditedMediaItem,
            param1: globalAndroid.os.Looper,
            param2: androidx.media3.transformer.AssetLoader.Listener
          ): androidx.media3.transformer.AssetLoader;
        }
        export class PlayerListener {
          public static class: java.lang.Class<androidx.media3.transformer.ExoPlayerAssetLoader.PlayerListener>;
          public onPlayerError(error: androidx.media3.common.PlaybackException): void;
          public onTimelineChanged(window: androidx.media3.common.Timeline, e: number): void;
          public constructor(assetLoaderListener: androidx.media3.transformer.ExoPlayerAssetLoader, param1: androidx.media3.transformer.AssetLoader.Listener);
          public onTracksChanged(e: androidx.media3.common.Tracks): void;
        }
        export class RenderersFactoryImpl {
          public static class: java.lang.Class<androidx.media3.transformer.ExoPlayerAssetLoader.RenderersFactoryImpl>;
          public createRenderers(
            eventHandler: globalAndroid.os.Handler,
            videoRendererEventListener: androidx.media3.exoplayer.video.VideoRendererEventListener,
            audioRendererEventListener: androidx.media3.exoplayer.audio.AudioRendererEventListener,
            textRendererOutput: androidx.media3.exoplayer.text.TextOutput,
            metadataRendererOutput: androidx.media3.exoplayer.metadata.MetadataOutput
          ): androidNative.Array<androidx.media3.exoplayer.Renderer>;
          public constructor(
            removeAudio: boolean,
            removeVideo: boolean,
            flattenForSlowMotion: boolean,
            decoderFactory: androidx.media3.transformer.Codec.DecoderFactory,
            forceInterpretHdrAsSdr: boolean,
            assetLoaderListener: androidx.media3.transformer.AssetLoader.Listener
          );
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class ExportException {
        public static class: java.lang.Class<androidx.media3.transformer.ExportException>;
        public static ERROR_CODE_UNSPECIFIED: number = 1000;
        public static ERROR_CODE_FAILED_RUNTIME_CHECK: number = 1001;
        public static ERROR_CODE_IO_UNSPECIFIED: number = 2000;
        public static ERROR_CODE_IO_NETWORK_CONNECTION_FAILED: number = 2001;
        public static ERROR_CODE_IO_NETWORK_CONNECTION_TIMEOUT: number = 2002;
        public static ERROR_CODE_IO_INVALID_HTTP_CONTENT_TYPE: number = 2003;
        public static ERROR_CODE_IO_BAD_HTTP_STATUS: number = 2004;
        public static ERROR_CODE_IO_FILE_NOT_FOUND: number = 2005;
        public static ERROR_CODE_IO_NO_PERMISSION: number = 2006;
        public static ERROR_CODE_IO_CLEARTEXT_NOT_PERMITTED: number = 2007;
        public static ERROR_CODE_IO_READ_POSITION_OUT_OF_RANGE: number = 2008;
        public static ERROR_CODE_DECODER_INIT_FAILED: number = 3001;
        public static ERROR_CODE_DECODING_FAILED: number = 3002;
        public static ERROR_CODE_DECODING_FORMAT_UNSUPPORTED: number = 3003;
        public static ERROR_CODE_ENCODER_INIT_FAILED: number = 4001;
        public static ERROR_CODE_ENCODING_FAILED: number = 4002;
        public static ERROR_CODE_ENCODING_FORMAT_UNSUPPORTED: number = 4003;
        public static ERROR_CODE_VIDEO_FRAME_PROCESSING_FAILED: number = 5001;
        public static ERROR_CODE_AUDIO_PROCESSING_FAILED: number = 6001;
        public static ERROR_CODE_MUXING_FAILED: number = 7001;
        public static ERROR_CODE_MUXING_TIMEOUT: number = 7002;
        public errorCode: number;
        public timestampMs: number;
        public static createForAssetLoader(cause: java.lang.Throwable, errorCode: number): androidx.media3.transformer.ExportException;
        public static createForCodec(cause: java.lang.Throwable, errorCode: number, isVideo: boolean, isDecoder: boolean, details: string): androidx.media3.transformer.ExportException;
        public static createForUnexpected(cause: java.lang.Exception): androidx.media3.transformer.ExportException;
        public errorInfoEquals(other: androidx.media3.transformer.ExportException): boolean;
        public static createForCodec(
          cause: java.lang.Throwable,
          errorCode: number,
          isVideo: boolean,
          isDecoder: boolean,
          format: androidx.media3.common.Format
        ): androidx.media3.transformer.ExportException;
        public getErrorCodeName(): string;
        public static getErrorCodeName(errorCode: number): string;
        public static createForAudioProcessing(exception: androidx.media3.common.audio.AudioProcessor.UnhandledAudioFormatException, details: string): androidx.media3.transformer.ExportException;
      }
      export module ExportException {
        export class ErrorCode {
          public static class: java.lang.Class<androidx.media3.transformer.ExportException.ErrorCode>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.ExportException$ErrorCode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
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
    export module transformer {
      export class ExportResult {
        public static class: java.lang.Class<androidx.media3.transformer.ExportResult>;
        public processedInputs: com.google.common.collect.ImmutableList<androidx.media3.transformer.ExportResult.ProcessedInput>;
        public durationMs: number;
        public fileSizeBytes: number;
        public averageAudioBitrate: number;
        public channelCount: number;
        public sampleRate: number;
        public audioEncoderName: string;
        public averageVideoBitrate: number;
        public colorInfo: androidx.media3.common.ColorInfo;
        public height: number;
        public width: number;
        public videoFrameCount: number;
        public videoEncoderName: string;
        public exportException: androidx.media3.transformer.ExportException;
        public buildUpon(): androidx.media3.transformer.ExportResult.Builder;
        public hashCode(): number;
        public equals(o: any): boolean;
      }
      export module ExportResult {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.transformer.ExportResult.Builder>;
          public build(): androidx.media3.transformer.ExportResult;
          public setAverageAudioBitrate(averageAudioBitrate: number): androidx.media3.transformer.ExportResult.Builder;
          public setAverageVideoBitrate(averageVideoBitrate: number): androidx.media3.transformer.ExportResult.Builder;
          public setFileSizeBytes(fileSizeBytes: number): androidx.media3.transformer.ExportResult.Builder;
          public setAudioEncoderName(audioEncoderName: string): androidx.media3.transformer.ExportResult.Builder;
          public setWidth(width: number): androidx.media3.transformer.ExportResult.Builder;
          public setSampleRate(sampleRate: number): androidx.media3.transformer.ExportResult.Builder;
          public setColorInfo(colorInfo: androidx.media3.common.ColorInfo): androidx.media3.transformer.ExportResult.Builder;
          public setProcessedInputs(
            processedInputs: com.google.common.collect.ImmutableList<androidx.media3.transformer.ExportResult.ProcessedInput>
          ): androidx.media3.transformer.ExportResult.Builder;
          public setVideoEncoderName(videoEncoderName: string): androidx.media3.transformer.ExportResult.Builder;
          public constructor();
          public setDurationMs(durationMs: number): androidx.media3.transformer.ExportResult.Builder;
          public setVideoFrameCount(videoFrameCount: number): androidx.media3.transformer.ExportResult.Builder;
          public setChannelCount(channelCount: number): androidx.media3.transformer.ExportResult.Builder;
          public setExportException(exportException: androidx.media3.transformer.ExportException): androidx.media3.transformer.ExportResult.Builder;
          public setHeight(height: number): androidx.media3.transformer.ExportResult.Builder;
        }
        export class ProcessedInput {
          public static class: java.lang.Class<androidx.media3.transformer.ExportResult.ProcessedInput>;
          public mediaItem: androidx.media3.common.MediaItem;
          public audioDecoderName: string;
          public videoDecoderName: string;
          public constructor(mediaItem: androidx.media3.common.MediaItem, audioDecoderName: string, videoDecoderName: string);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class FallbackListener {
        public static class: java.lang.Class<androidx.media3.transformer.FallbackListener>;
        public setTrackCount(trackCount: number): void;
        public onTransformationRequestFinalized(transformationRequest: androidx.media3.transformer.TransformationRequest): void;
        public constructor(
          composition: androidx.media3.transformer.Composition,
          transformerListeners: androidx.media3.common.util.ListenerSet<androidx.media3.transformer.Transformer.Listener>,
          transformerListenerHandler: androidx.media3.common.util.HandlerWrapper,
          originalTransformationRequest: androidx.media3.transformer.TransformationRequest
        );
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class FrameworkMuxer extends androidx.media3.transformer.Muxer {
        public static class: java.lang.Class<androidx.media3.transformer.FrameworkMuxer>;
        public release(param0: boolean): void;
        public release(this_: boolean): void;
        public writeSampleData(param0: number, param1: java.nio.ByteBuffer, param2: number, param3: number): void;
        public getMaxDelayBetweenSamplesMs(): number;
        public addMetadata(i: androidx.media3.common.Metadata): void;
        public writeSampleData(e: number, this_: java.nio.ByteBuffer, trackIndex: number, data: number): void;
        public addTrack(param0: androidx.media3.common.Format): number;
        public addTrack(mediaFormat: androidx.media3.common.Format): number;
        public addMetadata(param0: androidx.media3.common.Metadata): void;
      }
      export module FrameworkMuxer {
        export class Factory extends androidx.media3.transformer.Muxer.Factory {
          public static class: java.lang.Class<androidx.media3.transformer.FrameworkMuxer.Factory>;
          public getSupportedSampleMimeTypes(param0: number): com.google.common.collect.ImmutableList<string>;
          public create(e: string): androidx.media3.transformer.FrameworkMuxer;
          public constructor(maxDelayBetweenSamplesMs: number, videoDurationMs: number);
          public create(param0: string): androidx.media3.transformer.Muxer;
          public getSupportedSampleMimeTypes(trackType: number): com.google.common.collect.ImmutableList<string>;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class GraphInput implements androidx.media3.transformer.SampleConsumer, androidx.media3.transformer.OnMediaItemChangedListener {
        public static class: java.lang.Class<androidx.media3.transformer.GraphInput>;
        /**
         * Constructs a new instance of the androidx.media3.transformer.GraphInput interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          getInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
          queueInputBuffer(): boolean;
          queueInputBitmap(inputBitmap: globalAndroid.graphics.Bitmap, inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator): number;
          setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
          queueInputTexture(texId: number, presentationTimeUs: number): number;
          getInputSurface(): globalAndroid.view.Surface;
          getExpectedInputColorInfo(): androidx.media3.common.ColorInfo;
          getPendingVideoFrameCount(): number;
          registerVideoFrame(presentationTimeUs: number): boolean;
          signalEndOfVideoInput(): void;
          onMediaItemChanged(param0: androidx.media3.transformer.EditedMediaItem, param1: number, param2: androidx.media3.common.Format, param3: boolean): void;
        });
        public constructor();
        public static INPUT_RESULT_SUCCESS: number = 1;
        public static INPUT_RESULT_TRY_AGAIN_LATER: number = 2;
        public static INPUT_RESULT_END_OF_STREAM: number = 3;
        public getPendingVideoFrameCount(): number;
        public onMediaItemChanged(param0: androidx.media3.transformer.EditedMediaItem, param1: number, param2: androidx.media3.common.Format, param3: boolean): void;
        public signalEndOfVideoInput(): void;
        public queueInputBuffer(): boolean;
        public getInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
        public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
        public getExpectedInputColorInfo(): androidx.media3.common.ColorInfo;
        public queueInputBitmap(inputBitmap: globalAndroid.graphics.Bitmap, inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator): number;
        public queueInputTexture(texId: number, presentationTimeUs: number): number;
        public registerVideoFrame(presentationTimeUs: number): boolean;
        public getInputSurface(): globalAndroid.view.Surface;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class ImageAssetLoader extends androidx.media3.transformer.AssetLoader {
        public static class: java.lang.Class<androidx.media3.transformer.ImageAssetLoader>;
        public static MIME_TYPE_IMAGE_ALL: string = 'image/*';
        public getDecoderNames(): com.google.common.collect.ImmutableMap<java.lang.Integer, string>;
        public release(): void;
        public start(): void;
        public getProgress(param0: androidx.media3.transformer.ProgressHolder): number;
        public getProgress(progressHolder: androidx.media3.transformer.ProgressHolder): number;
      }
      export module ImageAssetLoader {
        export class Factory extends androidx.media3.transformer.AssetLoader.Factory {
          public static class: java.lang.Class<androidx.media3.transformer.ImageAssetLoader.Factory>;
          public createAssetLoader(
            editedMediaItem: androidx.media3.transformer.EditedMediaItem,
            looper: globalAndroid.os.Looper,
            listener: androidx.media3.transformer.AssetLoader.Listener
          ): androidx.media3.transformer.AssetLoader;
          public createAssetLoader(
            param0: androidx.media3.transformer.EditedMediaItem,
            param1: globalAndroid.os.Looper,
            param2: androidx.media3.transformer.AssetLoader.Listener
          ): androidx.media3.transformer.AssetLoader;
          public constructor(context: globalAndroid.content.Context);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class InAppMuxer extends androidx.media3.transformer.Muxer {
        public static class: java.lang.Class<androidx.media3.transformer.InAppMuxer>;
        public release(param0: boolean): void;
        public release(this_: boolean): void;
        public writeSampleData(param0: number, param1: java.nio.ByteBuffer, param2: number, param3: number): void;
        public getMaxDelayBetweenSamplesMs(): number;
        public addMetadata(i: androidx.media3.common.Metadata): void;
        public addTrack(param0: androidx.media3.common.Format): number;
        public addTrack(format: androidx.media3.common.Format): number;
        public addMetadata(param0: androidx.media3.common.Metadata): void;
        public writeSampleData(bufferInfoCopy: number, e: java.nio.ByteBuffer, this_: number, trackIndex: number): void;
      }
      export module InAppMuxer {
        export class Factory extends androidx.media3.transformer.Muxer.Factory {
          public static class: java.lang.Class<androidx.media3.transformer.InAppMuxer.Factory>;
          public getSupportedSampleMimeTypes(param0: number): com.google.common.collect.ImmutableList<string>;
          public constructor(maxDelayBetweenSamplesMs: number, metadataProvider: androidx.media3.transformer.InAppMuxer.MetadataProvider);
          public constructor();
          public create(param0: string): androidx.media3.transformer.Muxer;
          public getSupportedSampleMimeTypes(trackType: number): com.google.common.collect.ImmutableList<string>;
          public create(e: string): androidx.media3.transformer.InAppMuxer;
        }
        export class MetadataProvider {
          public static class: java.lang.Class<androidx.media3.transformer.InAppMuxer.MetadataProvider>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.InAppMuxer$MetadataProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { updateMetadataEntries(param0: java.util.Set<androidx.media3.common.Metadata.Entry>): void });
          public constructor();
          public updateMetadataEntries(param0: java.util.Set<androidx.media3.common.Metadata.Entry>): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class Mp4ExtractorWrapper {
        public static class: java.lang.Class<androidx.media3.transformer.Mp4ExtractorWrapper>;
        public getLastSyncSampleTimestampUs(): number;
        public constructor(context: globalAndroid.content.Context, filePath: string);
        public init(): void;
      }
      export module Mp4ExtractorWrapper {
        export class ExtractorOutputImpl {
          public static class: java.lang.Class<androidx.media3.transformer.Mp4ExtractorWrapper.ExtractorOutputImpl>;
          public videoTrackId: number;
          public seekMapInitialized: boolean;
          public seekMap(seekMap: androidx.media3.extractor.SeekMap): void;
          public track(id: number, type: number): androidx.media3.extractor.TrackOutput;
          public endTracks(): void;
        }
        export module ExtractorOutputImpl {
          export class TrackOutputImpl {
            public static class: java.lang.Class<androidx.media3.transformer.Mp4ExtractorWrapper.ExtractorOutputImpl.TrackOutputImpl>;
            public sampleData(bytesRead: androidx.media3.common.DataReader, this_: number, input: boolean, length: number): number;
            public format(format: androidx.media3.common.Format): void;
            public sampleMetadata(timeUs: number, flags: number, size: number, offset: number, cryptoData: androidx.media3.extractor.TrackOutput.CryptoData): void;
            public sampleData(this_: androidx.media3.common.util.ParsableByteArray, data: number, length: number): void;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class Muxer {
        public static class: java.lang.Class<androidx.media3.transformer.Muxer>;
        /**
         * Constructs a new instance of the androidx.media3.transformer.Muxer interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          addTrack(param0: androidx.media3.common.Format): number;
          writeSampleData(param0: number, param1: java.nio.ByteBuffer, param2: number, param3: number): void;
          addMetadata(param0: androidx.media3.common.Metadata): void;
          release(param0: boolean): void;
          getMaxDelayBetweenSamplesMs(): number;
        });
        public constructor();
        public release(param0: boolean): void;
        public writeSampleData(param0: number, param1: java.nio.ByteBuffer, param2: number, param3: number): void;
        public getMaxDelayBetweenSamplesMs(): number;
        public addTrack(param0: androidx.media3.common.Format): number;
        public addMetadata(param0: androidx.media3.common.Metadata): void;
      }
      export module Muxer {
        export class Factory {
          public static class: java.lang.Class<androidx.media3.transformer.Muxer.Factory>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.Muxer$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            create(param0: string): androidx.media3.transformer.Muxer;
            getSupportedSampleMimeTypes(param0: number): com.google.common.collect.ImmutableList<string>;
          });
          public constructor();
          public getSupportedSampleMimeTypes(param0: number): com.google.common.collect.ImmutableList<string>;
          public create(param0: string): androidx.media3.transformer.Muxer;
        }
        export class MuxerException {
          public static class: java.lang.Class<androidx.media3.transformer.Muxer.MuxerException>;
          public constructor(message: string, cause: java.lang.Throwable);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class MuxerWrapper {
        public static class: java.lang.Class<androidx.media3.transformer.MuxerWrapper>;
        public static MUXER_MODE_DEFAULT: number = 0;
        public static MUXER_MODE_MUX_PARTIAL_VIDEO: number = 1;
        public static MUXER_MODE_APPEND_VIDEO: number = 2;
        public addTrackFormat(existingFormat: androidx.media3.common.Format): void;
        public setAdditionalRotationDegrees(additionalRotationDegrees: number): void;
        public setTrackCount(trackCount: number): void;
        public isEnded(): boolean;
        public endTrack(trackType: number): void;
        public supportsSampleMimeType(mimeType: string): boolean;
        public writeSample(trackType: number, data: java.nio.ByteBuffer, isKeyFrame: boolean, presentationTimeUs: number): boolean;
        public getSupportedSampleMimeTypes(trackType: number): com.google.common.collect.ImmutableList<string>;
        public release(forCancellation: boolean): void;
        public changeToAppendVideoMode(): void;
        public constructor(outputPath: string, muxerFactory: androidx.media3.transformer.Muxer.Factory, listener: androidx.media3.transformer.MuxerWrapper.Listener, muxerMode: number);
      }
      export module MuxerWrapper {
        export class Listener {
          public static class: java.lang.Class<androidx.media3.transformer.MuxerWrapper.Listener>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.MuxerWrapper$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onTrackEnded(param0: number, param1: androidx.media3.common.Format, param2: number, param3: number): void;
            onEnded(param0: number, param1: number): void;
            onError(param0: androidx.media3.transformer.ExportException): void;
          });
          public constructor();
          public onTrackEnded(param0: number, param1: androidx.media3.common.Format, param2: number, param3: number): void;
          public onError(param0: androidx.media3.transformer.ExportException): void;
          public onEnded(param0: number, param1: number): void;
        }
        export class MuxerMode {
          public static class: java.lang.Class<androidx.media3.transformer.MuxerWrapper.MuxerMode>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.MuxerWrapper$MuxerMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class TrackInfo {
          public static class: java.lang.Class<androidx.media3.transformer.MuxerWrapper.TrackInfo>;
          public format: androidx.media3.common.Format;
          public index: number;
          public bytesWritten: number;
          public sampleCount: number;
          public timeUs: number;
          public constructor(format: androidx.media3.common.Format, index: number);
          public getAverageBitrate(): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class OnMediaItemChangedListener {
        public static class: java.lang.Class<androidx.media3.transformer.OnMediaItemChangedListener>;
        /**
         * Constructs a new instance of the androidx.media3.transformer.OnMediaItemChangedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { onMediaItemChanged(param0: androidx.media3.transformer.EditedMediaItem, param1: number, param2: androidx.media3.common.Format, param3: boolean): void });
        public constructor();
        public onMediaItemChanged(param0: androidx.media3.transformer.EditedMediaItem, param1: number, param2: androidx.media3.common.Format, param3: boolean): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class ProgressHolder {
        public static class: java.lang.Class<androidx.media3.transformer.ProgressHolder>;
        public progress: number;
        public constructor();
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class SampleConsumer {
        public static class: java.lang.Class<androidx.media3.transformer.SampleConsumer>;
        /**
         * Constructs a new instance of the androidx.media3.transformer.SampleConsumer interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          getInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
          queueInputBuffer(): boolean;
          queueInputBitmap(inputBitmap: globalAndroid.graphics.Bitmap, inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator): number;
          setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
          queueInputTexture(texId: number, presentationTimeUs: number): number;
          getInputSurface(): globalAndroid.view.Surface;
          getExpectedInputColorInfo(): androidx.media3.common.ColorInfo;
          getPendingVideoFrameCount(): number;
          registerVideoFrame(presentationTimeUs: number): boolean;
          signalEndOfVideoInput(): void;
        });
        public constructor();
        public static INPUT_RESULT_SUCCESS: number = 1;
        public static INPUT_RESULT_TRY_AGAIN_LATER: number = 2;
        public static INPUT_RESULT_END_OF_STREAM: number = 3;
        public getPendingVideoFrameCount(): number;
        public signalEndOfVideoInput(): void;
        public queueInputBuffer(): boolean;
        public getInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
        public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
        public getExpectedInputColorInfo(): androidx.media3.common.ColorInfo;
        public queueInputBitmap(inputBitmap: globalAndroid.graphics.Bitmap, inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator): number;
        public queueInputTexture(texId: number, presentationTimeUs: number): number;
        public registerVideoFrame(presentationTimeUs: number): boolean;
        public getInputSurface(): globalAndroid.view.Surface;
      }
      export module SampleConsumer {
        export class InputResult {
          public static class: java.lang.Class<androidx.media3.transformer.SampleConsumer.InputResult>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.SampleConsumer$InputResult interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
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
    export module transformer {
      export abstract class SampleExporter {
        public static class: java.lang.Class<androidx.media3.transformer.SampleExporter>;
        public getInput(param0: androidx.media3.transformer.EditedMediaItem, param1: androidx.media3.common.Format): androidx.media3.transformer.GraphInput;
        public getMuxerInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
        public releaseMuxerInputBuffer(): void;
        public static findSupportedMimeTypeForEncoderAndMuxer(mimeType: androidx.media3.common.Format, i: java.util.List<string>): string;
        public release(): void;
        public getMuxerInputFormat(): androidx.media3.common.Format;
        public processDataUpToMuxer(): boolean;
        public constructor(firstInputFormat: androidx.media3.common.Format, muxerWrapper: androidx.media3.transformer.MuxerWrapper);
        public processData(): boolean;
        public isMuxerInputEnded(): boolean;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class SefSlowMotionFlattener {
        public static class: java.lang.Class<androidx.media3.transformer.SefSlowMotionFlattener>;
        public getSamplePresentationTimeUs(): number;
        public dropOrTransformSample(buffer: java.nio.ByteBuffer, bufferTimeUs: number): boolean;
        public constructor(format: androidx.media3.common.Format);
      }
      export module SefSlowMotionFlattener {
        export class MetadataInfo {
          public static class: java.lang.Class<androidx.media3.transformer.SefSlowMotionFlattener.MetadataInfo>;
          public captureFrameRate: number;
          public inputMaxLayer: number;
          public normalSpeedMaxLayer: number;
          public slowMotionData: androidx.media3.extractor.metadata.mp4.SlowMotionData;
          public constructor();
        }
        export class SegmentInfo {
          public static class: java.lang.Class<androidx.media3.transformer.SefSlowMotionFlattener.SegmentInfo>;
          public startTimeUs: number;
          public endTimeUs: number;
          public speedDivisor: number;
          public maxLayer: number;
          public constructor(segment: androidx.media3.extractor.metadata.mp4.SlowMotionData.Segment, inputMaxLayer: number, normalSpeedLayer: number);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class SegmentSpeedProvider {
        public static class: java.lang.Class<androidx.media3.transformer.SegmentSpeedProvider>;
        public getSpeed(timeUs: number): number;
        public constructor(metadata: androidx.media3.common.Metadata);
        public getNextSpeedChangeTimeUs(timeUs: number): number;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class SequenceAssetLoader implements androidx.media3.transformer.AssetLoader, androidx.media3.transformer.AssetLoader.Listener {
        public static class: java.lang.Class<androidx.media3.transformer.SequenceAssetLoader>;
        public onOutputFormat(wrappedSampleConsumer: androidx.media3.common.Format): androidx.media3.transformer.SequenceAssetLoader.SampleConsumerWrapper;
        public addOnMediaItemChangedListener(onMediaItemChangedListener: androidx.media3.transformer.OnMediaItemChangedListener, trackType: number): void;
        public onDurationUs(param0: number): void;
        public release(): void;
        public onDurationUs(durationUs: number): void;
        public onOutputFormat(param0: androidx.media3.common.Format): androidx.media3.transformer.SampleConsumer;
        public onError(param0: androidx.media3.transformer.ExportException): void;
        public getProcessedInputs(): com.google.common.collect.ImmutableList<androidx.media3.transformer.ExportResult.ProcessedInput>;
        public constructor(
          sequence: androidx.media3.transformer.EditedMediaItemSequence,
          forceAudioTrack: boolean,
          assetLoaderFactory: androidx.media3.transformer.AssetLoader.Factory,
          looper: globalAndroid.os.Looper,
          listener: androidx.media3.transformer.AssetLoader.Listener,
          clock: androidx.media3.common.util.Clock
        );
        public getDecoderNames(): com.google.common.collect.ImmutableMap<java.lang.Integer, string>;
        public onError(exportException: androidx.media3.transformer.ExportException): void;
        public onTrackAdded(this_: androidx.media3.common.Format, inputFormat: number): boolean;
        public onTrackCount(param0: number): void;
        public onTrackAdded(param0: androidx.media3.common.Format, param1: number): boolean;
        public start(): void;
        public getProgress(param0: androidx.media3.transformer.ProgressHolder): number;
        public getProgress(progressHolder: androidx.media3.transformer.ProgressHolder): number;
        public setMaxSequenceDurationUs(maxSequenceDurationUs: number, isFinal: boolean): void;
        public onTrackCount(trackCount: number): void;
      }
      export module SequenceAssetLoader {
        export class ClippingIterator {
          public static class: java.lang.Class<androidx.media3.transformer.SequenceAssetLoader.ClippingIterator>;
          public next(): number;
          public constructor(iterator: androidx.media3.common.util.TimestampIterator, clippingValue: number);
          public hasNext(): boolean;
          public copyOf(): androidx.media3.common.util.TimestampIterator;
        }
        export class SampleConsumerWrapper extends androidx.media3.transformer.SampleConsumer {
          public static class: java.lang.Class<androidx.media3.transformer.SequenceAssetLoader.SampleConsumerWrapper>;
          public queueInputBitmap(lastOffsetUs: globalAndroid.graphics.Bitmap, this_: androidx.media3.common.util.TimestampIterator): number;
          public queueInputTexture(texId: number, presentationTimeUs: number): number;
          public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
          public getInputSurface(): globalAndroid.view.Surface;
          public getExpectedInputColorInfo(): androidx.media3.common.ColorInfo;
          public constructor(sampleConsumer: androidx.media3.transformer.SequenceAssetLoader, param1: androidx.media3.transformer.SampleConsumer);
          public getPendingVideoFrameCount(): number;
          public getInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
          public queueInputBuffer(): boolean;
          public signalEndOfVideoInput(): void;
          public queueInputBitmap(inputBitmap: globalAndroid.graphics.Bitmap, inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator): number;
          public registerVideoFrame(presentationTimeUs: number): boolean;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class SilentAudioGenerator {
        public static class: java.lang.Class<androidx.media3.transformer.SilentAudioGenerator>;
        public audioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat;
        public constructor(audioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat);
        public hasRemaining(): boolean;
        public addSilence(durationUs: number): void;
        public getBuffer(): java.nio.ByteBuffer;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class TextureAssetLoader extends androidx.media3.transformer.AssetLoader {
        public static class: java.lang.Class<androidx.media3.transformer.TextureAssetLoader>;
        public getDecoderNames(): com.google.common.collect.ImmutableMap<java.lang.Integer, string>;
        public release(): void;
        public signalEndOfVideoInput(): void;
        public queueInputTexture(result: number, e: number): boolean;
        public start(): void;
        public getProgress(param0: androidx.media3.transformer.ProgressHolder): number;
        public getProgress(progressHolder: androidx.media3.transformer.ProgressHolder): number;
        public constructor(
          editedMediaItem: androidx.media3.transformer.EditedMediaItem,
          assetLoaderListener: androidx.media3.transformer.AssetLoader.Listener,
          format: androidx.media3.common.Format,
          frameProcessedListener: androidx.media3.common.OnInputFrameProcessedListener
        );
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class TransformationException {
        public static class: java.lang.Class<androidx.media3.transformer.TransformationException>;
        public static ERROR_CODE_UNSPECIFIED: number = 1000;
        public static ERROR_CODE_FAILED_RUNTIME_CHECK: number = 1001;
        public static ERROR_CODE_IO_UNSPECIFIED: number = 2000;
        public static ERROR_CODE_IO_NETWORK_CONNECTION_FAILED: number = 2001;
        public static ERROR_CODE_IO_NETWORK_CONNECTION_TIMEOUT: number = 2002;
        public static ERROR_CODE_IO_INVALID_HTTP_CONTENT_TYPE: number = 2003;
        public static ERROR_CODE_IO_BAD_HTTP_STATUS: number = 2004;
        public static ERROR_CODE_IO_FILE_NOT_FOUND: number = 2005;
        public static ERROR_CODE_IO_NO_PERMISSION: number = 2006;
        public static ERROR_CODE_IO_CLEARTEXT_NOT_PERMITTED: number = 2007;
        public static ERROR_CODE_IO_READ_POSITION_OUT_OF_RANGE: number = 2008;
        public static ERROR_CODE_DECODER_INIT_FAILED: number = 3001;
        public static ERROR_CODE_DECODING_FAILED: number = 3002;
        public static ERROR_CODE_DECODING_FORMAT_UNSUPPORTED: number = 3003;
        public static ERROR_CODE_ENCODER_INIT_FAILED: number = 4001;
        public static ERROR_CODE_ENCODING_FAILED: number = 4002;
        public static ERROR_CODE_ENCODING_FORMAT_UNSUPPORTED: number = 4003;
        public static ERROR_CODE_VIDEO_FRAME_PROCESSING_FAILED: number = 5001;
        public static ERROR_CODE_AUDIO_PROCESSING_FAILED: number = 6001;
        public static ERROR_CODE_MUXING_FAILED: number = 7001;
        public errorCode: number;
        public timestampMs: number;
        public errorInfoEquals(other: androidx.media3.transformer.TransformationException): boolean;
        public getErrorCodeName(): string;
        public static createForAssetLoader(cause: java.lang.Throwable, errorCode: number): androidx.media3.transformer.TransformationException;
        public static createForUnexpected(cause: java.lang.Exception): androidx.media3.transformer.TransformationException;
        public static getErrorCodeName(errorCode: number): string;
        public static createForCodec(
          cause: java.lang.Throwable,
          errorCode: number,
          isVideo: boolean,
          isDecoder: boolean,
          format: androidx.media3.common.Format
        ): androidx.media3.transformer.TransformationException;
        public static createForCodec(cause: java.lang.Throwable, errorCode: number, isVideo: boolean, isDecoder: boolean, details: string): androidx.media3.transformer.TransformationException;
        public static createForAudioProcessing(cause: java.lang.Throwable, audioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.transformer.TransformationException;
      }
      export module TransformationException {
        export class ErrorCode {
          public static class: java.lang.Class<androidx.media3.transformer.TransformationException.ErrorCode>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.TransformationException$ErrorCode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
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
    export module transformer {
      export class TransformationRequest {
        public static class: java.lang.Class<androidx.media3.transformer.TransformationRequest>;
        public outputHeight: number;
        public audioMimeType: string;
        public videoMimeType: string;
        public hdrMode: number;
        public buildUpon(): androidx.media3.transformer.TransformationRequest.Builder;
        public hashCode(): number;
        public equals(o: any): boolean;
        public toString(): string;
      }
      export module TransformationRequest {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.transformer.TransformationRequest.Builder>;
          public setHdrMode(hdrMode: number): androidx.media3.transformer.TransformationRequest.Builder;
          public constructor();
          public build(): androidx.media3.transformer.TransformationRequest;
          public setAudioMimeType(audioMimeType: string): androidx.media3.transformer.TransformationRequest.Builder;
          public setVideoMimeType(videoMimeType: string): androidx.media3.transformer.TransformationRequest.Builder;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class TransformationResult {
        public static class: java.lang.Class<androidx.media3.transformer.TransformationResult>;
        public processedInputs: com.google.common.collect.ImmutableList<androidx.media3.transformer.TransformationResult.ProcessedInput>;
        public durationMs: number;
        public fileSizeBytes: number;
        public averageAudioBitrate: number;
        public channelCount: number;
        public sampleRate: number;
        public audioEncoderName: string;
        public averageVideoBitrate: number;
        public colorInfo: androidx.media3.common.ColorInfo;
        public height: number;
        public width: number;
        public videoFrameCount: number;
        public videoEncoderName: string;
        public transformationException: androidx.media3.transformer.TransformationException;
        public buildUpon(): androidx.media3.transformer.TransformationResult.Builder;
        public hashCode(): number;
        public equals(o: any): boolean;
      }
      export module TransformationResult {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.transformer.TransformationResult.Builder>;
          public build(): androidx.media3.transformer.TransformationResult;
          public setTransformationException(transformationException: androidx.media3.transformer.TransformationException): androidx.media3.transformer.TransformationResult.Builder;
          public setAverageAudioBitrate(averageAudioBitrate: number): androidx.media3.transformer.TransformationResult.Builder;
          public setAudioEncoderName(audioEncoderName: string): androidx.media3.transformer.TransformationResult.Builder;
          public setProcessedInputs(
            processedInputs: com.google.common.collect.ImmutableList<androidx.media3.transformer.TransformationResult.ProcessedInput>
          ): androidx.media3.transformer.TransformationResult.Builder;
          public setColorInfo(colorInfo: androidx.media3.common.ColorInfo): androidx.media3.transformer.TransformationResult.Builder;
          public setSampleRate(sampleRate: number): androidx.media3.transformer.TransformationResult.Builder;
          public setHeight(height: number): androidx.media3.transformer.TransformationResult.Builder;
          public setFileSizeBytes(fileSizeBytes: number): androidx.media3.transformer.TransformationResult.Builder;
          public setVideoFrameCount(videoFrameCount: number): androidx.media3.transformer.TransformationResult.Builder;
          public setChannelCount(channelCount: number): androidx.media3.transformer.TransformationResult.Builder;
          public setAverageVideoBitrate(averageVideoBitrate: number): androidx.media3.transformer.TransformationResult.Builder;
          public setWidth(width: number): androidx.media3.transformer.TransformationResult.Builder;
          public constructor();
          public setDurationMs(durationMs: number): androidx.media3.transformer.TransformationResult.Builder;
          public setVideoEncoderName(videoEncoderName: string): androidx.media3.transformer.TransformationResult.Builder;
        }
        export class ProcessedInput {
          public static class: java.lang.Class<androidx.media3.transformer.TransformationResult.ProcessedInput>;
          public mediaItem: androidx.media3.common.MediaItem;
          public audioDecoderName: string;
          public videoDecoderName: string;
          public constructor(mediaItem: androidx.media3.common.MediaItem, audioDecoderName: string, videoDecoderName: string);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class Transformer {
        public static class: java.lang.Class<androidx.media3.transformer.Transformer>;
        public static PROGRESS_STATE_NOT_STARTED: number = 0;
        public static PROGRESS_STATE_NO_TRANSFORMATION: number = 0;
        public static PROGRESS_STATE_WAITING_FOR_AVAILABILITY: number = 1;
        public static PROGRESS_STATE_AVAILABLE: number = 2;
        public static PROGRESS_STATE_UNAVAILABLE: number = 3;
        /** @deprecated */
        public setListener(listener: androidx.media3.transformer.Transformer.Listener): void;
        public start(composition: androidx.media3.transformer.Composition, path: string): void;
        public start(editedMediaItem: androidx.media3.transformer.EditedMediaItem, path: string): void;
        public start(mediaItem: androidx.media3.common.MediaItem, path: string): void;
        /** @deprecated */
        public startTransformation(mediaItem: androidx.media3.common.MediaItem, path: string): void;
        public buildUpon(): androidx.media3.transformer.Transformer.Builder;
        public cancel(): void;
        public addListener(listener: androidx.media3.transformer.Transformer.Listener): void;
        public removeAllListeners(): void;
        public getApplicationLooper(): globalAndroid.os.Looper;
        public getProgress(progressHolder: androidx.media3.transformer.ProgressHolder): number;
        public removeListener(listener: androidx.media3.transformer.Transformer.Listener): void;
      }
      export module Transformer {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.transformer.Transformer.Builder>;
          /** @deprecated */
          public setListener(listener: androidx.media3.transformer.Transformer.Listener): androidx.media3.transformer.Transformer.Builder;
          public addListener(listener: androidx.media3.transformer.Transformer.Listener): androidx.media3.transformer.Transformer.Builder;
          public setLooper(looper: globalAndroid.os.Looper): androidx.media3.transformer.Transformer.Builder;
          /** @deprecated */
          public setRemoveAudio(removeAudio: boolean): androidx.media3.transformer.Transformer.Builder;
          public setVideoMimeType(videoMimeType: string): androidx.media3.transformer.Transformer.Builder;
          public build(): androidx.media3.transformer.Transformer;
          public setAudioMimeType(audioMimeType: string): androidx.media3.transformer.Transformer.Builder;
          public removeListener(listener: androidx.media3.transformer.Transformer.Listener): androidx.media3.transformer.Transformer.Builder;
          /** @deprecated */
          public setVideoEffects(effects: java.util.List<androidx.media3.common.Effect>): androidx.media3.transformer.Transformer.Builder;
          public removeAllListeners(): androidx.media3.transformer.Transformer.Builder;
          public setEncoderFactory(encoderFactory: androidx.media3.transformer.Codec.EncoderFactory): androidx.media3.transformer.Transformer.Builder;
          public setDebugViewProvider(debugViewProvider: androidx.media3.common.DebugViewProvider): androidx.media3.transformer.Transformer.Builder;
          public setAudioMixerFactory(audioMixerFactory: androidx.media3.transformer.AudioMixer.Factory): androidx.media3.transformer.Transformer.Builder;
          /** @deprecated */
          public setAudioProcessors(audioProcessors: java.util.List<androidx.media3.common.audio.AudioProcessor>): androidx.media3.transformer.Transformer.Builder;
          public setVideoFrameProcessorFactory(videoFrameProcessorFactory: androidx.media3.common.VideoFrameProcessor.Factory): androidx.media3.transformer.Transformer.Builder;
          public setMuxerFactory(muxerFactory: androidx.media3.transformer.Muxer.Factory): androidx.media3.transformer.Transformer.Builder;
          /** @deprecated */
          public setTransformationRequest(transformationRequest: androidx.media3.transformer.TransformationRequest): androidx.media3.transformer.Transformer.Builder;
          public constructor(context: globalAndroid.content.Context);
          /** @deprecated */
          public setRemoveVideo(removeVideo: boolean): androidx.media3.transformer.Transformer.Builder;
          /** @deprecated */
          public setFlattenForSlowMotion(flattenForSlowMotion: boolean): androidx.media3.transformer.Transformer.Builder;
          public setAssetLoaderFactory(assetLoaderFactory: androidx.media3.transformer.AssetLoader.Factory): androidx.media3.transformer.Transformer.Builder;
        }
        export class ComponentListener implements androidx.media3.transformer.TransformerInternal.Listener, androidx.media3.transformer.MuxerWrapper.Listener {
          public static class: java.lang.Class<androidx.media3.transformer.Transformer.ComponentListener>;
          public onTrackEnded(param0: number, param1: androidx.media3.common.Format, param2: number, param3: number): void;
          public onEnded(durationMs: number, fileSizeBytes: number): void;
          public onError(param0: androidx.media3.transformer.ExportException): void;
          public onError(
            processedInputs: com.google.common.collect.ImmutableList<androidx.media3.transformer.ExportResult.ProcessedInput>,
            audioEncoderName: string,
            videoEncoderName: string,
            exportException: androidx.media3.transformer.ExportException
          ): void;
          public onEnded(param0: number, param1: number): void;
          public onError(
            param0: com.google.common.collect.ImmutableList<androidx.media3.transformer.ExportResult.ProcessedInput>,
            param1: string,
            param2: string,
            param3: androidx.media3.transformer.ExportException
          ): void;
          public onCompleted(param0: com.google.common.collect.ImmutableList<androidx.media3.transformer.ExportResult.ProcessedInput>, param1: string, param2: string): void;
          public onTrackEnded(trackType: number, format: androidx.media3.common.Format, averageBitrate: number, sampleCount: number): void;
          public constructor(composition: androidx.media3.transformer.Transformer, param1: androidx.media3.transformer.Composition);
          public onCompleted(
            processedInputs: com.google.common.collect.ImmutableList<androidx.media3.transformer.ExportResult.ProcessedInput>,
            audioEncoderName: string,
            videoEncoderName: string
          ): void;
          public onError(exportException: androidx.media3.transformer.ExportException): void;
        }
        export class Listener {
          public static class: java.lang.Class<androidx.media3.transformer.Transformer.Listener>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.Transformer$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onTransformationCompleted(inputMediaItem: androidx.media3.common.MediaItem): void;
            onTransformationCompleted(inputMediaItem: androidx.media3.common.MediaItem, result: androidx.media3.transformer.TransformationResult): void;
            onCompleted(composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult): void;
            onTransformationError(inputMediaItem: androidx.media3.common.MediaItem, exception: java.lang.Exception): void;
            onTransformationError(inputMediaItem: androidx.media3.common.MediaItem, exception: androidx.media3.transformer.TransformationException): void;
            onTransformationError(
              inputMediaItem: androidx.media3.common.MediaItem,
              result: androidx.media3.transformer.TransformationResult,
              exception: androidx.media3.transformer.TransformationException
            ): void;
            onError(composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult, exportException: androidx.media3.transformer.ExportException): void;
            onFallbackApplied(
              inputMediaItem: androidx.media3.common.MediaItem,
              originalTransformationRequest: androidx.media3.transformer.TransformationRequest,
              fallbackTransformationRequest: androidx.media3.transformer.TransformationRequest
            ): void;
            onFallbackApplied(
              composition: androidx.media3.transformer.Composition,
              originalTransformationRequest: androidx.media3.transformer.TransformationRequest,
              fallbackTransformationRequest: androidx.media3.transformer.TransformationRequest
            ): void;
          });
          public constructor();
          /** @deprecated */
          public onFallbackApplied(
            inputMediaItem: androidx.media3.common.MediaItem,
            originalTransformationRequest: androidx.media3.transformer.TransformationRequest,
            fallbackTransformationRequest: androidx.media3.transformer.TransformationRequest
          ): void;
          public onFallbackApplied(
            composition: androidx.media3.transformer.Composition,
            originalTransformationRequest: androidx.media3.transformer.TransformationRequest,
            fallbackTransformationRequest: androidx.media3.transformer.TransformationRequest
          ): void;
          /** @deprecated */
          public onTransformationCompleted(inputMediaItem: androidx.media3.common.MediaItem): void;
          /** @deprecated */
          public onTransformationError(
            inputMediaItem: androidx.media3.common.MediaItem,
            result: androidx.media3.transformer.TransformationResult,
            exception: androidx.media3.transformer.TransformationException
          ): void;
          public onError(
            composition: androidx.media3.transformer.Composition,
            exportResult: androidx.media3.transformer.ExportResult,
            exportException: androidx.media3.transformer.ExportException
          ): void;
          /** @deprecated */
          public onTransformationCompleted(inputMediaItem: androidx.media3.common.MediaItem, result: androidx.media3.transformer.TransformationResult): void;
          /** @deprecated */
          public onTransformationError(inputMediaItem: androidx.media3.common.MediaItem, exception: androidx.media3.transformer.TransformationException): void;
          public onCompleted(composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult): void;
          /** @deprecated */
          public onTransformationError(inputMediaItem: androidx.media3.common.MediaItem, exception: java.lang.Exception): void;
        }
        export class ProgressState {
          public static class: java.lang.Class<androidx.media3.transformer.Transformer.ProgressState>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.Transformer$ProgressState interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
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
    export module transformer {
      export class TransformerInternal {
        public static class: java.lang.Class<androidx.media3.transformer.TransformerInternal>;
        public start(): void;
        public cancel(): void;
        public endWithException(exportException: androidx.media3.transformer.ExportException): void;
        public getProgress(progressHolder: androidx.media3.transformer.ProgressHolder): number;
        public constructor(
          sequence: globalAndroid.content.Context,
          i: androidx.media3.transformer.Composition,
          this_: androidx.media3.transformer.TransformationRequest,
          context: androidx.media3.transformer.AssetLoader.Factory,
          composition: androidx.media3.transformer.AudioMixer.Factory,
          transformationRequest: androidx.media3.common.VideoFrameProcessor.Factory,
          assetLoaderFactory: androidx.media3.transformer.Codec.EncoderFactory,
          audioMixerFactory: androidx.media3.transformer.MuxerWrapper,
          videoFrameProcessorFactory: androidx.media3.transformer.TransformerInternal.Listener,
          encoderFactory: androidx.media3.transformer.FallbackListener,
          muxerWrapper: androidx.media3.common.util.HandlerWrapper,
          listener: androidx.media3.common.DebugViewProvider,
          fallbackListener: androidx.media3.common.util.Clock,
          applicationHandler: number
        );
        public endWithCompletion(): void;
      }
      export module TransformerInternal {
        export class AssetLoaderInputTracker {
          public static class: java.lang.Class<androidx.media3.transformer.TransformerInternal.AssetLoaderInputTracker>;
          public getSampleExporter(trackType: number): androidx.media3.transformer.SampleExporter;
          public hasAllTrackCounts(): boolean;
          public getIndexForPrimarySequence(i: number): number;
          public getOutputTrackCount(): number;
          public hasMultipleConcurrentVideoTracks(): boolean;
          public getAssetLoaderInputFormat(sequenceIndex: number, trackType: number): androidx.media3.common.Format;
          public setShouldTranscode(trackType: number, shouldTranscode: boolean): void;
          public constructor(this_: androidx.media3.transformer.Composition);
          public registerTrack(sequenceIndex: number, assetLoaderInputFormat: androidx.media3.common.Format): void;
          public registerGraphInput(trackType: number): void;
          public setTrackCount(sequenceIndex: number, trackCount: number): void;
          public registerSampleExporter(trackType: number, sampleExporter: androidx.media3.transformer.SampleExporter): void;
          public shouldTranscode(trackType: number): boolean;
          public hasRegisteredAllTracks(): boolean;
          public hasAssociatedAllTracksWithGraphInput(this_: number): boolean;
          public sequenceHasMultipleTracks(sequenceIndex: number): boolean;
        }
        export module AssetLoaderInputTracker {
          export class SequenceMetadata {
            public static class: java.lang.Class<androidx.media3.transformer.TransformerInternal.AssetLoaderInputTracker.SequenceMetadata>;
            public trackTypeToFirstAssetLoaderInputFormat: globalAndroid.util.SparseArray<androidx.media3.common.Format>;
            public requiredTrackCount: number;
            public constructor();
          }
        }
        export class Listener {
          public static class: java.lang.Class<androidx.media3.transformer.TransformerInternal.Listener>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.TransformerInternal$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onCompleted(param0: com.google.common.collect.ImmutableList<androidx.media3.transformer.ExportResult.ProcessedInput>, param1: string, param2: string): void;
            onError(
              param0: com.google.common.collect.ImmutableList<androidx.media3.transformer.ExportResult.ProcessedInput>,
              param1: string,
              param2: string,
              param3: androidx.media3.transformer.ExportException
            ): void;
          });
          public constructor();
          public onError(
            param0: com.google.common.collect.ImmutableList<androidx.media3.transformer.ExportResult.ProcessedInput>,
            param1: string,
            param2: string,
            param3: androidx.media3.transformer.ExportException
          ): void;
          public onCompleted(param0: com.google.common.collect.ImmutableList<androidx.media3.transformer.ExportResult.ProcessedInput>, param1: string, param2: string): void;
        }
        export class SequenceAssetLoaderListener extends androidx.media3.transformer.AssetLoader.Listener {
          public static class: java.lang.Class<androidx.media3.transformer.TransformerInternal.SequenceAssetLoaderListener>;
          public onDurationUs(durationUs: number): void;
          public onDurationUs(param0: number): void;
          public onTrackAdded(param0: androidx.media3.common.Format, param1: number): boolean;
          public onOutputFormat(param0: androidx.media3.common.Format): androidx.media3.transformer.SampleConsumer;
          public onError(param0: androidx.media3.transformer.ExportException): void;
          public onTrackCount(param0: number): void;
          public onTrackCount(trackCount: number): void;
          public constructor(
            sequenceIndex: androidx.media3.transformer.TransformerInternal,
            composition: number,
            transformationRequest: androidx.media3.transformer.Composition,
            audioMixerFactory: androidx.media3.transformer.TransformationRequest,
            videoFrameProcessorFactory: androidx.media3.transformer.AudioMixer.Factory,
            fallbackListener: androidx.media3.common.VideoFrameProcessor.Factory,
            debugViewProvider: androidx.media3.transformer.FallbackListener,
            param7: androidx.media3.common.DebugViewProvider
          );
          public onTrackAdded(shouldTranscode: androidx.media3.common.Format, this_: number): boolean;
          public onOutputFormat(sampleExporter: androidx.media3.common.Format): androidx.media3.transformer.SampleConsumer;
          public onError(exportException: androidx.media3.transformer.ExportException): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class TransformerMediaClock {
        public static class: java.lang.Class<androidx.media3.transformer.TransformerMediaClock>;
        public getPositionUs(): number;
        public setPlaybackParameters(playbackParameters: androidx.media3.common.PlaybackParameters): void;
        public getPlaybackParameters(): androidx.media3.common.PlaybackParameters;
        public constructor();
        public updateTimeForTrackType(trackType: number, timeUs: number): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class TransformerMultipleInputVideoGraph implements androidx.media3.transformer.TransformerVideoGraph {
        public static class: java.lang.Class<androidx.media3.transformer.TransformerMultipleInputVideoGraph>;
        public createInput(): androidx.media3.transformer.GraphInput;
      }
      export module TransformerMultipleInputVideoGraph {
        export class Factory extends androidx.media3.transformer.TransformerVideoGraph.Factory {
          public static class: java.lang.Class<androidx.media3.transformer.TransformerMultipleInputVideoGraph.Factory>;
          public constructor();
          public create(
            param0: globalAndroid.content.Context,
            param1: androidx.media3.common.ColorInfo,
            param2: androidx.media3.common.ColorInfo,
            param3: androidx.media3.common.DebugViewProvider,
            param4: androidx.media3.common.VideoGraph.Listener,
            param5: java.util.concurrent.Executor,
            param6: androidx.media3.effect.VideoCompositorSettings,
            param7: java.util.List<androidx.media3.common.Effect>,
            param8: number
          ): androidx.media3.transformer.TransformerVideoGraph;
          public create(
            context: globalAndroid.content.Context,
            inputColorInfo: androidx.media3.common.ColorInfo,
            outputColorInfo: androidx.media3.common.ColorInfo,
            debugViewProvider: androidx.media3.common.DebugViewProvider,
            listener: androidx.media3.common.VideoGraph.Listener,
            listenerExecutor: java.util.concurrent.Executor,
            videoCompositorSettings: androidx.media3.effect.VideoCompositorSettings,
            compositionEffects: java.util.List<androidx.media3.common.Effect>,
            initialTimestampOffsetUs: number
          ): androidx.media3.transformer.TransformerMultipleInputVideoGraph;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class TransformerSingleInputVideoGraph implements androidx.media3.transformer.TransformerVideoGraph {
        public static class: java.lang.Class<androidx.media3.transformer.TransformerSingleInputVideoGraph>;
        public createInput(): androidx.media3.transformer.GraphInput;
      }
      export module TransformerSingleInputVideoGraph {
        export class Factory extends androidx.media3.transformer.TransformerVideoGraph.Factory {
          public static class: java.lang.Class<androidx.media3.transformer.TransformerSingleInputVideoGraph.Factory>;
          public create(
            i: globalAndroid.content.Context,
            this_: androidx.media3.common.ColorInfo,
            context: androidx.media3.common.ColorInfo,
            inputColorInfo: androidx.media3.common.DebugViewProvider,
            outputColorInfo: androidx.media3.common.VideoGraph.Listener,
            debugViewProvider: java.util.concurrent.Executor,
            listener: androidx.media3.effect.VideoCompositorSettings,
            listenerExecutor: java.util.List<androidx.media3.common.Effect>,
            videoCompositorSettings: number
          ): androidx.media3.transformer.TransformerSingleInputVideoGraph;
          public create(
            param0: globalAndroid.content.Context,
            param1: androidx.media3.common.ColorInfo,
            param2: androidx.media3.common.ColorInfo,
            param3: androidx.media3.common.DebugViewProvider,
            param4: androidx.media3.common.VideoGraph.Listener,
            param5: java.util.concurrent.Executor,
            param6: androidx.media3.effect.VideoCompositorSettings,
            param7: java.util.List<androidx.media3.common.Effect>,
            param8: number
          ): androidx.media3.transformer.TransformerVideoGraph;
          public constructor(videoFrameProcessorFactory: androidx.media3.common.VideoFrameProcessor.Factory);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class TransformerUtil {
        public static class: java.lang.Class<androidx.media3.transformer.TransformerUtil>;
        public static getProcessedTrackType(mimeType: string): number;
        public static containsSlowMotionData(i: androidx.media3.common.Format): boolean;
        public static areVideoEffectsAllNoOp(videoEffect: com.google.common.collect.ImmutableList<androidx.media3.common.Effect>, glEffect: androidx.media3.common.Format): boolean;
        public static getMediaCodecFlags(flags: number): number;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class TransformerVideoGraph {
        public static class: java.lang.Class<androidx.media3.transformer.TransformerVideoGraph>;
        /**
         * Constructs a new instance of the androidx.media3.transformer.TransformerVideoGraph interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { createInput(): androidx.media3.transformer.GraphInput });
        public constructor();
        public createInput(): androidx.media3.transformer.GraphInput;
      }
      export module TransformerVideoGraph {
        export class Factory {
          public static class: java.lang.Class<androidx.media3.transformer.TransformerVideoGraph.Factory>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.TransformerVideoGraph$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            create(
              param0: globalAndroid.content.Context,
              param1: androidx.media3.common.ColorInfo,
              param2: androidx.media3.common.ColorInfo,
              param3: androidx.media3.common.DebugViewProvider,
              param4: androidx.media3.common.VideoGraph.Listener,
              param5: java.util.concurrent.Executor,
              param6: androidx.media3.effect.VideoCompositorSettings,
              param7: java.util.List<androidx.media3.common.Effect>,
              param8: number
            ): androidx.media3.transformer.TransformerVideoGraph;
          });
          public constructor();
          public create(
            param0: globalAndroid.content.Context,
            param1: androidx.media3.common.ColorInfo,
            param2: androidx.media3.common.ColorInfo,
            param3: androidx.media3.common.DebugViewProvider,
            param4: androidx.media3.common.VideoGraph.Listener,
            param5: java.util.concurrent.Executor,
            param6: androidx.media3.effect.VideoCompositorSettings,
            param7: java.util.List<androidx.media3.common.Effect>,
            param8: number
          ): androidx.media3.transformer.TransformerVideoGraph;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class VideoEncoderSettings {
        public static class: java.lang.Class<androidx.media3.transformer.VideoEncoderSettings>;
        public static NO_VALUE: number = -1;
        public static DEFAULT_I_FRAME_INTERVAL_SECONDS: number = 1.0;
        public static DEFAULT: androidx.media3.transformer.VideoEncoderSettings;
        public bitrate: number;
        public bitrateMode: number;
        public profile: number;
        public level: number;
        public iFrameIntervalSeconds: number;
        public operatingRate: number;
        public priority: number;
        public enableHighQualityTargeting: boolean;
        public hashCode(): number;
        public buildUpon(): androidx.media3.transformer.VideoEncoderSettings.Builder;
        public equals(o: any): boolean;
      }
      export module VideoEncoderSettings {
        export class BitrateMode {
          public static class: java.lang.Class<androidx.media3.transformer.VideoEncoderSettings.BitrateMode>;
          /**
           * Constructs a new instance of the androidx.media3.transformer.VideoEncoderSettings$BitrateMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class Builder {
          public static class: java.lang.Class<androidx.media3.transformer.VideoEncoderSettings.Builder>;
          public setBitrate(bitrate: number): androidx.media3.transformer.VideoEncoderSettings.Builder;
          public setEncodingProfileLevel(encodingProfile: number, encodingLevel: number): androidx.media3.transformer.VideoEncoderSettings.Builder;
          public constructor();
          public setiFrameIntervalSeconds(iFrameIntervalSeconds: number): androidx.media3.transformer.VideoEncoderSettings.Builder;
          public experimentalSetEnableHighQualityTargeting(enableHighQualityTargeting: boolean): androidx.media3.transformer.VideoEncoderSettings.Builder;
          public build(): androidx.media3.transformer.VideoEncoderSettings;
          public setEncoderPerformanceParameters(operatingRate: number, priority: number): androidx.media3.transformer.VideoEncoderSettings.Builder;
          public setBitrateMode(bitrateMode: number): androidx.media3.transformer.VideoEncoderSettings.Builder;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class VideoFrameProcessingWrapper extends androidx.media3.transformer.GraphInput {
        public static class: java.lang.Class<androidx.media3.transformer.VideoFrameProcessingWrapper>;
        public getPendingVideoFrameCount(): number;
        public release(): void;
        public onMediaItemChanged(param0: androidx.media3.transformer.EditedMediaItem, param1: number, param2: androidx.media3.common.Format, param3: boolean): void;
        public signalEndOfVideoInput(): void;
        public queueInputBuffer(): boolean;
        public constructor(
          videoFrameProcessor: androidx.media3.common.VideoFrameProcessor,
          inputColorInfo: androidx.media3.common.ColorInfo,
          presentation: androidx.media3.effect.Presentation,
          initialTimestampOffsetUs: number
        );
        public setOutputSurfaceInfo(outputSurfaceInfo: androidx.media3.common.SurfaceInfo): void;
        public onMediaItemChanged(this_: androidx.media3.transformer.EditedMediaItem, editedMediaItem: number, durationUs: androidx.media3.common.Format, trackFormat: boolean): void;
        public queueInputBitmap(inputBitmap: globalAndroid.graphics.Bitmap, inStreamOffsetsUs: androidx.media3.common.util.TimestampIterator): number;
        public queueInputTexture(texId: number, presentationTimeUs: number): number;
        public getInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
        public setOnInputFrameProcessedListener(listener: androidx.media3.common.OnInputFrameProcessedListener): void;
        public getExpectedInputColorInfo(): androidx.media3.common.ColorInfo;
        public registerVideoFrame(presentationTimeUs: number): boolean;
        public getInputSurface(): globalAndroid.view.Surface;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module transformer {
      export class VideoSampleExporter extends androidx.media3.transformer.SampleExporter {
        public static class: java.lang.Class<androidx.media3.transformer.VideoSampleExporter>;
        public constructor(
          videoGraphOutputColor: globalAndroid.content.Context,
          videoGraphOutputColor: androidx.media3.common.Format,
          e: androidx.media3.transformer.TransformationRequest,
          this_: androidx.media3.effect.VideoCompositorSettings,
          context: java.util.List<androidx.media3.common.Effect>,
          firstInputFormat: androidx.media3.common.VideoFrameProcessor.Factory,
          transformationRequest: androidx.media3.transformer.Codec.EncoderFactory,
          videoCompositorSettings: androidx.media3.transformer.MuxerWrapper,
          compositionEffects: androidx.media3.common.util.Consumer<androidx.media3.transformer.ExportException>,
          videoFrameProcessorFactory: androidx.media3.transformer.FallbackListener,
          encoderFactory: androidx.media3.common.DebugViewProvider,
          muxerWrapper: number,
          errorConsumer: boolean
        );
        public getMuxerInputBuffer(): androidx.media3.decoder.DecoderInputBuffer;
        public releaseMuxerInputBuffer(): void;
        public release(): void;
        public getMuxerInputFormat(): androidx.media3.common.Format;
        public getInput(this_: androidx.media3.transformer.EditedMediaItem, editedMediaItem: androidx.media3.common.Format): androidx.media3.transformer.GraphInput;
        public constructor(firstInputFormat: androidx.media3.common.Format, muxerWrapper: androidx.media3.transformer.MuxerWrapper);
        public isMuxerInputEnded(): boolean;
      }
      export module VideoSampleExporter {
        export class EncoderWrapper {
          public static class: java.lang.Class<androidx.media3.transformer.VideoSampleExporter.EncoderWrapper>;
          public signalEndOfInputStream(): void;
          public releaseOutputBuffer(render: boolean): void;
          public getOutputFormat(): androidx.media3.common.Format;
          public getOutputBufferInfo(): globalAndroid.media.MediaCodec.BufferInfo;
          public isEnded(): boolean;
          public release(): void;
          public constructor(
            encoderFactory: androidx.media3.transformer.Codec.EncoderFactory,
            inputFormat: androidx.media3.common.Format,
            muxerSupportedMimeTypes: java.util.List<string>,
            transformationRequest: androidx.media3.transformer.TransformationRequest,
            fallbackListener: androidx.media3.transformer.FallbackListener
          );
          public getHdrModeAfterFallback(): number;
          public getSurfaceInfo(this_: number, requestedWidth: number): androidx.media3.common.SurfaceInfo;
          public getOutputBuffer(): java.nio.ByteBuffer;
        }
        export class VideoGraphWrapper extends androidx.media3.transformer.TransformerVideoGraph {
          public static class: java.lang.Class<androidx.media3.transformer.VideoSampleExporter.VideoGraphWrapper>;
          public onOutputFrameAvailableForRendering(presentationTimeUs: number): void;
          public registerInput(): number;
          public setOutputSurfaceInfo(outputSurfaceInfo: androidx.media3.common.SurfaceInfo): void;
          public getProcessor(inputId: number): androidx.media3.common.VideoFrameProcessor;
          public createInput(): androidx.media3.transformer.GraphInput;
          public hasProducedFrameWithTimestampZero(): boolean;
          public constructor(
            context: globalAndroid.content.Context,
            videoGraphFactory: androidx.media3.transformer.TransformerVideoGraph.Factory,
            videoFrameProcessorInputColor: androidx.media3.common.ColorInfo,
            videoFrameProcessorOutputColor: androidx.media3.common.ColorInfo,
            errorConsumer: androidx.media3.common.util.Consumer<androidx.media3.transformer.ExportException>,
            debugViewProvider: androidx.media3.common.DebugViewProvider,
            videoCompositorSettings: androidx.media3.effect.VideoCompositorSettings,
            compositionEffects: java.util.List<androidx.media3.common.Effect>
          );
          public onEnded(this_: number): void;
          public onError(e: androidx.media3.common.VideoFrameProcessingException): void;
          public onOutputSizeChanged(this_: number, width: number): void;
          public release(): void;
          public initialize(): void;
        }
      }
    }
  }
}

//Generics information:
