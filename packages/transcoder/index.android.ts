/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Device, File, Utils } from '@nativescript/core';
import { TranscoderCommon, VideoConfig, VideoResolution } from './common';
import { clearInterval, setInterval } from '@nativescript/core/timer';

export class Transcoder extends TranscoderCommon {
  /**
   * Transcodes video from inputPath to outputPath using videoConfig options
   * @param inputPath string
   * @param outputPath string
   * @param videoConfig VideoConfig
   * @returns Promise<File>
   *
   */
  transcode(inputPath: string, outputPath: string, videoConfig: VideoConfig): Promise<File> {
    return new Promise((resolve, reject) => {
      if (+Device.sdkVersion < 21) {
        console.error('This is only supported on API 21+');
        return reject('This is only supported on API 21+');
      }

      if (File.exists(outputPath)) {
        const file = File.fromPath(outputPath);
        file.removeSync();
      }

      const originalResolution = this.getVideoResolution(inputPath);
      if (!videoConfig.height && !videoConfig.width) {
        videoConfig.height = 720; //default to a height of 720 and scaled width if nothing set
      }

      // If the input height is lower or the same as the target height, transcoding will just eat up time and create a bigger file, which is not usual purpose.
      //    If the user wants to do it anyway, pass the force flag.
      if (!videoConfig.force && videoConfig.height <= originalResolution.height) {
        return reject(
          'Transcoding to the same or higher resolution is not allowed by default. If you want to do this intentionally, pass in { force: true } as part of the vidoeConfig object to bypass this check.'
        );
      }
      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };

      if (videoConfig.width && !videoConfig.height) {
        //calculate the width based on desired height
        const targetWidth: number = videoConfig.width;
        const ratio = targetWidth / originalResolution.width;
        const targetHeight = Math.round(originalResolution.height * ratio);
        videoConfig.width = targetWidth;
        videoConfig.height = targetHeight;
      } else if (videoConfig.height && !videoConfig.width) {
        //calculate the width based on desired height
        const targetHeight: number = videoConfig.height;
        const ratio = targetHeight / originalResolution.height;
        const targetWidth = Math.round(originalResolution.width * ratio);
        videoConfig.width = targetWidth;
        videoConfig.height = targetHeight;
      }

      this.log(`Transcoding to height: ${videoConfig.height} width: ${videoConfig.width}`);

      const audioProcessors = new com.google.common.collect.ImmutableList.Builder<androidx.media3.common.audio.AudioProcessor>().build();
      const videoEffects = com.google.common.collect.ImmutableList.of(androidx.media3.effect.Presentation.createForWidthAndHeight(videoConfig.width, videoConfig.height, 1));
      //if you only want to select a height and have media3 handle the width, use the following instead
      // const videoEffects = com.google.common.collect.ImmutableList.of(androidx.media3.effect.Presentation.createForHeight(height));
      const inputMediaItem: androidx.media3.common.MediaItem = androidx.media3.common.MediaItem.fromUri(inputPath);

      const editedMediaItem: androidx.media3.transformer.EditedMediaItem = new androidx.media3.transformer.EditedMediaItem.Builder(inputMediaItem)
        //@ts-ignore
        .setEffects(new androidx.media3.transformer.Effects(/* audioProcessors= */ audioProcessors, /* videoEffects= */ videoEffects))
        .build();

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      const listener: androidx.media3.transformer.Transformer.Listener = new androidx.media3.transformer.Transformer.Listener({
        onTransformationCompleted: (inputMediaItem: androidx.media3.common.MediaItem) => {
          that.log('onTransformationCompleted');
          emit(TranscoderCommon.TRANSCODING_COMPLETE, {});
          resolve(File.fromPath(outputPath));
          clearInterval(progressUpdater);
        },
        onCompleted: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult) => {
          that.log('onCompleted');
          emit(TranscoderCommon.TRANSCODING_COMPLETE, { output: outputPath });
          resolve(File.fromPath(outputPath));
          clearInterval(progressUpdater);
        },
        //@ts-ignore
        onTransformationError: (inputMediaItem: androidx.media3.common.MediaItem, exception: androidx.media3.transformer.TransformationException) => {
          that.log('onTransformationError!', exception);
          emit(TranscoderCommon.TRANSCODING_ERROR, { error: exception });
          reject(exception);
          clearInterval(progressUpdater);
        },
        onError: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult, exportException: androidx.media3.transformer.ExportException) => {
          that.log('onError', exportException);
          emit(TranscoderCommon.TRANSCODING_ERROR, { error: exportException });
          reject(exportException);
          clearInterval(progressUpdater);
        },
        //@ts-ignore
        onFallbackApplied: (
          inputMediaItem: androidx.media3.common.MediaItem,
          originalTransformationRequest: androidx.media3.transformer.TransformationRequest,
          fallbackTransformationRequest: androidx.media3.transformer.TransformationRequest
        ) => {
          this.log('onFallbackApplied');
        },
      });
      const transformer: androidx.media3.transformer.Transformer = new androidx.media3.transformer.Transformer.Builder(this.getAndroidContext())
        .setVideoMimeType(androidx.media3.common.MimeTypes.VIDEO_H264)
        .setAudioMimeType(androidx.media3.common.MimeTypes.AUDIO_AAC)
        .addListener(listener)
        .build();
      transformer.start(editedMediaItem, outputPath);
      emit(TranscoderCommon.TRANSCODING_STARTED, null);
      const progressHolder: androidx.media3.transformer.ProgressHolder = new androidx.media3.transformer.ProgressHolder();
      const progressUpdater = setInterval(() => {
        transformer.getProgress(progressHolder);
        this.log('Progress: ' + progressHolder.progress / 100);
        emit(TranscoderCommon.TRANSCODING_PROGRESS, { progress: progressHolder.progress / 100 });
      }, 200);
    });
  }

  /**
   * **ANDROID-ONLY** Transcodes the audio input file to an MP4 file with AAC encoding
   * @param inputPath string (can be a url or absolute path)
   * @param outputPath string
   * @returns Promise<File>
   *
   */
  convertAudioToMp4(inputPath: string, outputPath: string): Promise<File> {
    return new Promise((resolve, reject) => {
      if (+Device.sdkVersion < 21) {
        console.error('This is only supported on API 21+');
        return reject('This is only supported on API 21+');
      }

      if (File.exists(outputPath)) {
        const file = File.fromPath(outputPath);
        file.removeSync();
      }

      if (inputPath.includes('http')) {
        // console.log('url detected for inputPath');
      } else {
        if (!File.exists(inputPath)) {
          // console.error('Input file does not exist!', inputPath);
          return reject('Input file does not exist!');
        }
      }
      const inputMediaItem: androidx.media3.common.MediaItem = androidx.media3.common.MediaItem.fromUri(inputPath);
      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };

      const audioProcessors = new com.google.common.collect.ImmutableList.Builder<androidx.media3.common.audio.AudioProcessor>().build();
      const videoEffects = new com.google.common.collect.ImmutableList.Builder<androidx.media3.common.Effect>().build();
      const editedMediaItem: androidx.media3.transformer.EditedMediaItem = new androidx.media3.transformer.EditedMediaItem.Builder(inputMediaItem)
        //@ts-ignore
        .setEffects(new androidx.media3.transformer.Effects(/* audioProcessors= */ audioProcessors, /* videoEffects= */ videoEffects))
        .build();

      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const that = this;
      const listener: androidx.media3.transformer.Transformer.Listener = new androidx.media3.transformer.Transformer.Listener({
        onTransformationCompleted: (inputMediaItem: androidx.media3.common.MediaItem) => {
          that.log('onTransformationCompleted');
          emit(TranscoderCommon.TRANSCODING_COMPLETE, {});
          resolve(File.fromPath(outputPath));
          clearInterval(progressUpdater);
        },
        onCompleted: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult) => {
          that.log('onCompleted');
          emit(TranscoderCommon.TRANSCODING_COMPLETE, { output: outputPath });
          resolve(File.fromPath(outputPath));
          clearInterval(progressUpdater);
        },
        //@ts-ignore
        onTransformationError: (inputMediaItem: androidx.media3.common.MediaItem, exception: androidx.media3.transformer.TransformationException) => {
          that.log('onTransformationError!', exception);
          emit(TranscoderCommon.TRANSCODING_ERROR, { error: exception });
          reject(exception);
          clearInterval(progressUpdater);
        },
        onError: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult, exportException: androidx.media3.transformer.ExportException) => {
          that.log('onError', exportException);
          emit(TranscoderCommon.TRANSCODING_ERROR, { error: exportException });
          reject(exportException);
          clearInterval(progressUpdater);
        },
        //@ts-ignore
        onFallbackApplied: (
          inputMediaItem: androidx.media3.common.MediaItem,
          originalTransformationRequest: androidx.media3.transformer.TransformationRequest,
          fallbackTransformationRequest: androidx.media3.transformer.TransformationRequest
        ) => {
          that.log('onFallbackApplied');
        },
      });
      const transformer: androidx.media3.transformer.Transformer = new androidx.media3.transformer.Transformer.Builder(this.getAndroidContext())
        .setVideoMimeType(androidx.media3.common.MimeTypes.VIDEO_H264)
        .setAudioMimeType(androidx.media3.common.MimeTypes.AUDIO_AAC)
        .addListener(listener)
        .build();
      transformer.start(editedMediaItem, outputPath);
      emit(TranscoderCommon.TRANSCODING_STARTED, null);
      const progressHolder: androidx.media3.transformer.ProgressHolder = new androidx.media3.transformer.ProgressHolder();
      const progressUpdater = setInterval(() => {
        transformer.getProgress(progressHolder);
        this.log('Progress: ' + progressHolder.progress / 100);
        emit(TranscoderCommon.TRANSCODING_PROGRESS, { progress: progressHolder.progress / 100 });
      }, 200);
    });
  }

  /**
   * Merges the mp4 files specified by inputFiles (array of file paths) into an mp4 file at the outputPath.
   *
   * On iOS,  input files must all have audio and video tracks with the same codecs used.
   * @method mergeMp4Files
   * @param inputFiles
   * @param outputPath
   * @returns Promise<File>
   **/
  public mergeMp4Files(inputFiles: string[], outputPath: string): Promise<File> {
    return new Promise((resolve, reject) => {
      if (+Device.sdkVersion < 21) {
        console.error('This is only supported on API 21+');
        return reject('This is only supported on API 21+');
      }
      if (!inputFiles || inputFiles.length <= 0) return reject('inputFiles is empty!');
      if (!outputPath) return reject('outputPath should be a valid path string');
      if (File.exists(outputPath)) {
        // remove file if it exists
        File.fromPath(outputPath).removeSync(err => {
          console.error('Unable to remove file at output path!', err);
          return reject('Unable to remove file at output path!' + err.message);
        });
      }
      if (inputFiles.length == 1) {
        const fileData = File.fromPath(inputFiles[0]).readSync();
        File.fromPath(outputPath).writeSync(fileData);
        return resolve(File.fromPath(outputPath));
      }
      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };

      //create the list of EditedMediaItem from file paths to add to the composition
      const segments: java.util.List<androidx.media3.transformer.EditedMediaItem> = new java.util.ArrayList();
      try {
        for (let i = 0; i < inputFiles.length; i++) {
          //add a EditedMediaItem for each file to be merged
          const inputMediaItem: androidx.media3.common.MediaItem = androidx.media3.common.MediaItem.fromUri(inputFiles[i]);
          const editedMediaItem: androidx.media3.transformer.EditedMediaItem = new androidx.media3.transformer.EditedMediaItem.Builder(inputMediaItem).build();
          segments.add(editedMediaItem);
        }

        const sequence: androidx.media3.transformer.EditedMediaItemSequence = new androidx.media3.transformer.EditedMediaItemSequence(segments);
        const sequenceList = new java.util.ArrayList();
        sequenceList.add(sequence);
        const composition: androidx.media3.transformer.Composition = new androidx.media3.transformer.Composition.Builder(sequenceList).build();

        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        const listener: androidx.media3.transformer.Transformer.Listener = new androidx.media3.transformer.Transformer.Listener({
          onTransformationCompleted: (inputMediaItem: androidx.media3.common.MediaItem) => {
            that.log('onTransformationCompleted');
            emit(TranscoderCommon.TRANSCODING_COMPLETE, {});
            resolve(File.fromPath(outputPath));
            clearInterval(progressUpdater);
          },
          onCompleted: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult) => {
            that.log('onCompleted');
            emit(TranscoderCommon.TRANSCODING_COMPLETE, { output: outputPath });
            resolve(File.fromPath(outputPath));
            clearInterval(progressUpdater);
          },
          //@ts-ignore
          onTransformationError: (inputMediaItem: androidx.media3.common.MediaItem, exception: androidx.media3.transformer.TransformationException) => {
            that.log('onTransformationError!', exception);
            emit(TranscoderCommon.TRANSCODING_ERROR, { error: exception });
            reject(exception);
            clearInterval(progressUpdater);
          },
          onError: (composition: androidx.media3.transformer.Composition, exportResult: androidx.media3.transformer.ExportResult, exportException: androidx.media3.transformer.ExportException) => {
            that.log('onError', exportException);
            emit(TranscoderCommon.TRANSCODING_ERROR, { error: exportException });
            reject(exportException);
            clearInterval(progressUpdater);
          },
          //@ts-ignore
          onFallbackApplied: (
            inputMediaItem: androidx.media3.common.MediaItem,
            originalTransformationRequest: androidx.media3.transformer.TransformationRequest,
            fallbackTransformationRequest: androidx.media3.transformer.TransformationRequest
          ) => {
            this.log('onFallbackApplied');
          },
        });
        const transformer: androidx.media3.transformer.Transformer = new androidx.media3.transformer.Transformer.Builder(this.getAndroidContext())
          .setVideoMimeType(androidx.media3.common.MimeTypes.VIDEO_H264)
          .setAudioMimeType(androidx.media3.common.MimeTypes.AUDIO_AAC)
          .addListener(listener)
          .build();
        transformer.start(composition, outputPath);
        emit(TranscoderCommon.TRANSCODING_STARTED, null);
        const progressHolder: androidx.media3.transformer.ProgressHolder = new androidx.media3.transformer.ProgressHolder();
        const progressUpdater = setInterval(() => {
          transformer.getProgress(progressHolder);
          this.log('Progress: ' + progressHolder.progress / 100);
          emit(TranscoderCommon.TRANSCODING_PROGRESS, { progress: progressHolder.progress / 100 });
        }, 200);
      } catch (err) {
        console.error(err, err.message);
        return reject('Error during merge: ' + err.message);
      }
    });
  }

  /**
   * **iOS-ONY** Merges the audio tracks from mp4 files specified by audioFileUrls (array of file paths) into an mp4 audio file
   *      at the outputPath.
   * NOTE: input files must all be MP4 files with same audio encoding!
   * @method mergeAudioMp4Files
   * @param audioFileUrls
   * @param outputPath
   **/
  public mergeAudioMp4Files(audioFiles: string[], outputPath: string): Promise<File> {
    console.error('mergeAudioMp4Files is only supported on iOS!');
    return null;
  }

  /**
   *  UTILITIES
   */
  /**
   * Looks for the video resolution metadata and returns a VideoResolution object with width and height
   * @param videoPath string
   * @returns VideoResolution
   */
  getVideoResolution(videoPath: string): VideoResolution {
    const metaRetriever = new android.media.MediaMetadataRetriever();
    metaRetriever.setDataSource(videoPath);
    return {
      width: +metaRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_WIDTH),
      height: +metaRetriever.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_VIDEO_HEIGHT),
    };
  }

  // This method is safer than Application.getApplicationContext()
  getAndroidContext(): android.app.Application {
    const ctx =
      java.lang.Class.forName('android.app.AppGlobals').getMethod('getInitialApplication', null).invoke(null, null) ||
      java.lang.Class.forName('android.app.ActivityThread').getMethod('currentApplication', null).invoke(null, null);
    return ctx || Utils.android.getApplicationContext();
  }
}
