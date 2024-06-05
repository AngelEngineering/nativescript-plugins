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

      const outputFile = File.fromPath(outputPath);
      outputFile.removeSync();

      const allowedTranscodingResolution = this.getAllowedTranscodingResolution(inputPath);
      // If the input resolution is lower or the same as the target resolution, transcoding will just eat up time and create a bigger file, which is not usual purpose.
      //    If the user wants to do it anyway, pass the force flag.
      if (!videoConfig.force && !allowedTranscodingResolution.includes(videoConfig.height + '')) {
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

  convertAudioToMp4(inputPath: string, outputPath: string): Promise<File> {
    console.error('convertMp3ToMp4 is only supported on Android!');
    return null;
  }

  getURLFromFilePath(filePath: string): NSURL {
    if (filePath.includes('assets-library://')) {
      return NSURL.URLWithString(filePath);
    } else if (filePath.includes('file://')) {
      return NSURL.URLWithString(filePath);
    }
    return NSURL.fileURLWithPath(filePath);
  }

  // utilities
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
}
