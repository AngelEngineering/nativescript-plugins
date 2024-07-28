/* eslint-disable @typescript-eslint/ban-ts-comment */
import { File } from '@nativescript/core';
import { TranscoderCommon, VideoConfig, VideoResolution } from './common';

const DefaultVideoConfig: VideoConfig = {
  height: null, //will default to 720 height if nothing is set, and width scaled to maintain aspect ratio
  width: null,
  frameRate: 30,
  audioChannels: 2,
  audioSampleRate: 44100, // between 8 and 192
  audioBitRate: 128000, // default to 128 kilobits
};

export class Transcoder extends TranscoderCommon {
  private _videoConfig: VideoConfig;

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
      if (videoConfig) {
        this._videoConfig = {
          ...DefaultVideoConfig,
          ...videoConfig,
        };
      } else {
        this._videoConfig = DefaultVideoConfig;
      }

      const originalResolution = this.getVideoResolution(inputPath);
      if (!videoConfig.height && !videoConfig.width) {
        videoConfig.height = 720; //default to a height of 720 and scaled width if nothing set
      }
      const outputFile = File.fromPath(outputPath);
      outputFile.removeSync();

      // If the input resolution is lower or the same as the target resolution, transcoding will just eat up time and create a bigger file, which is not usual purpose.
      //    If the user wants to do it anyway, pass the force flag.
      if (!videoConfig.force && videoConfig.height >= originalResolution.height) {
        return reject(
          'Transcoding to the same or higher resolution is not allowed by default. If you want to do this intentionally, pass in { force: true } as part of the vidoeConfig object to bypass this check.'
        );
      }

      const transcoder = NextLevelSessionExporter.alloc().init();

      const fileURL = NSURL.fileURLWithPath(inputPath);
      const avAsset = AVURLAsset.assetWithURL(fileURL);
      transcoder.asset = avAsset;
      transcoder.outputURL = this.getURLFromFilePath(outputPath);
      transcoder.outputFileType = AVFileTypeMPEG4;

      //check for dimension flags and adjust height and width
      if (!videoConfig.height && !videoConfig.width) {
        videoConfig.height = 720; //default to a height of 720 and scaled width if nothing set
      }

      if (videoConfig.width && !videoConfig.height) {
        //calculate the width based on desired height
        const targetWidth: number = videoConfig.width;
        const ratio = targetWidth / avAsset.naturalSize.width;
        const targetHeight = Math.round(avAsset.naturalSize.height * ratio);
        this._videoConfig.height = targetHeight;
      } else if (videoConfig.height && !videoConfig.width) {
        //calculate the width based on desired height
        const targetHeight: number = videoConfig.height;
        const ratio = targetHeight / avAsset.naturalSize.height;
        const targetWidth = Math.round(avAsset.naturalSize.width * ratio);
        this._videoConfig.width = targetWidth;
      }
      //both set
      else {
        this._videoConfig.width = videoConfig.width;
        this._videoConfig.height = videoConfig.height;
      }

      const videoSettings: any = {
        'AVVideoCodecKey': AVVideoCodecH264,
        'AVVideoWidthKey': this._videoConfig.width,
        'AVVideoHeightKey': this._videoConfig.height,
        'AVVideoScalingModeKey': AVVideoScalingModeResizeAspectFill,
      };
      transcoder.videoOutputConfiguration = videoSettings as NSDictionary<string, any>;
      const audioSettings: any = {
        'AVFormatIDKey': kAudioFormatMPEG4AAC,
        'AVNumberOfChannelsKey': this._videoConfig.audioChannels,
        'AVSampleRateKey': this._videoConfig.audioSampleRate,
        'AVEncoderBitRateKey': this._videoConfig.audioBitRate,
      };
      transcoder.audioOutputConfiguration = audioSettings as NSDictionary<string, any>;

      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };

      transcoder.exportWithProgressHandlerCompletionHandler(
        progress => {
          this.log('progress', progress);
          emit(TranscoderCommon.TRANSCODING_PROGRESS, { progress });
        },
        result => {
          this.log('result', result);
          if (result == 'Success') {
            emit(TranscoderCommon.TRANSCODING_COMPLETE, { output: outputPath });
            resolve(File.fromPath(outputPath));
          } else {
            emit(TranscoderCommon.TRANSCODING_ERROR, { error: result });
            reject(result);
          }
        }
      );
      emit(TranscoderCommon.TRANSCODING_STARTED, null);
    });
  }

  /**
   *  **ANDROID-ONLY** Transcodes the audio input file to an MP4 file with AAC encoding
   * @method convertAudioToMp4
   * @param inputPath
   * @param outputPath
   * @returns Promise<File>
   **/ convertAudioToMp4(inputPath: string, outputPath: string): Promise<File> {
    console.error('convertMp3ToMp4 is only supported on Android!');
    return null;
  }

  /**
   * Merges the mp4 files specified by inputFiles (array of file paths) into an mp4 file
   *      at the outputPath.
   * On iOS,  input files must all have both audio and video tracks with the same codecs used.
   * @method mergeMp4Files
   * @param inputFiles
   * @param outputPath
   **/
  mergeMp4Files(inputFiles: string[], outputPath: string): Promise<File> {
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
        const videoAssets = asset.tracksWithMediaType(AVMediaTypeVideo);
        let videoAsset = null;
        if (videoAssets?.count) videoAsset = videoAssets.objectAtIndex(0);
        const audioAssets = asset.tracksWithMediaType(AVMediaTypeAudio);
        let audioAsset = null;
        if (audioAssets?.count) audioAsset = audioAssets.objectAtIndex(0);
        if (!audioAsset || !videoAsset) {
          console.error('Unable to find audio and video track for current mp4:', inputFiles[i]);
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
          console.error('Unable to insert audio or video track, quitting!');
          haveError = true;
          return;
        }
        if (i == 0) videoTrack.preferredTransform = videoAsset.preferredTransform;
        const a = videoTrack.preferredTransform;
        const b = videoAsset.preferredTransform;
        if (a.a != b.a || a.b != b.b || a.c != b.c || a.d != b.d) {
          console.error('WARNING! Segment transforms do not match! merging without matching segment orientations requires transform/layer/composition processing');
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
            // console.error('failed (assetExport?.error)', exportSession.error);
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
            resolve(File.fromPath(outputPath));
            break;
        }
      });
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
    return new Promise((resolve, reject) => {
      if (!audioFiles || audioFiles.length <= 0) return reject('audioFiles is empty!');
      if (!outputPath) return reject('outputPath should be a valid path string');

      if (File.exists(outputPath)) {
        // remove file if it exists
        File.fromPath(outputPath).removeSync(err => {
          console.error('Unable to remove existing file!', err);
          return reject('Unable to remove existing file!' + err.message);
        });
      }
      if (audioFiles.length == 1) {
        const suc = NSFileManager.defaultManager.copyItemAtPathToPathError(audioFiles[0], outputPath);
        if (!suc) {
          console.error('Unable to copy file!');
          return reject('Unable to copy file!');
        }
        return resolve(File.fromPath(outputPath));
      }
      const composition = AVMutableComposition.new();
      for (let i = 0; i < audioFiles.length; i++) {
        const compositionAudioTrack: AVMutableCompositionTrack = composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeAudio, 0);
        const asset = AVURLAsset.assetWithURL(NSURL.fileURLWithPath(audioFiles[i]));
        const track = asset.tracksWithMediaType(AVMediaTypeAudio)[0];
        const timeRange = CMTimeRangeMake(CMTimeMake(0, 600), track.timeRange.duration);
        compositionAudioTrack.insertTimeRangeOfTrackAtTimeError(timeRange, track, composition.duration);
      }
      const mergeAudioUrl = NSURL.fileURLWithPath(outputPath);
      const assetExport = new AVAssetExportSession({ asset: composition, presetName: AVAssetExportPresetAppleM4A });
      assetExport.outputFileType = AVFileTypeAppleM4A;
      assetExport.outputURL = mergeAudioUrl;
      assetExport.exportAsynchronouslyWithCompletionHandler(() => {
        switch (assetExport.status) {
          case AVAssetExportSessionStatus.Failed:
            // console.log('failed (assetExport?.error)', assetExport.error);
            reject(assetExport.error);
            break;
          case AVAssetExportSessionStatus.Cancelled:
            // console.log('cancelled (assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Unknown:
            // console.log('unknown(assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Waiting:
            // console.log('waiting(assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Exporting:
            // console.log('exporting(assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Completed:
            // console.log('Audio Concatenation Complete');
            resolve(File.fromPath(outputPath));
            break;
        }
      });
    });
  }

  // utilities
  /**
   * Looks for the video resolution metadata and returns a VideoResolution object with width and height
   * @param videoPath string
   * @returns VideoResolution
   */
  getVideoResolution(videoPath: string): VideoResolution {
    const fileURL = NSURL.fileURLWithPath(videoPath);
    const avAsset = AVURLAsset.assetWithURL(fileURL);
    const track = avAsset.tracksWithMediaType(AVMediaTypeVideo).firstObject;
    if (!track) {
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

  getURLFromFilePath(filePath: string): NSURL {
    if (filePath.includes('assets-library://')) {
      return NSURL.URLWithString(filePath);
    } else if (filePath.includes('file://')) {
      return NSURL.URLWithString(filePath);
    }
    return NSURL.fileURLWithPath(filePath);
  }
}
