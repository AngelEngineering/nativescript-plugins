import { EventData, File, Observable } from '@nativescript/core';

export class TranscoderCommon extends Observable {
  private _logLevel: LogLevel = 'verbose';
  /**
   * Enables or diables console logging for debug purposes.
   * @param logLevel LogLevel
   * @returns void
   */
  setLogLevel(logLevel: LogLevel): void {
    this._logLevel = logLevel;
  }

  log = (message: string, value?: any): void => {
    if (this._logLevel === 'none') {
      return;
    }
    if (value) {
      console.log(`[TRANSCODER] ${message}`, value);
    } else {
      console.log(`[TRANSCODER] ${message}`);
    }
  };

  public static TRANSCODING_STARTED = 'transcoding-started';
  public static TRANSCODING_PROGRESS = 'transcoding-progress';
  public static TRANSCODING_COMPLETE = 'transcoding-complete';
  public static TRANSCODING_ERROR = 'transcoding-error';

  /***********************
   Utility Functions:
   **********************/
  /**
   * Returns the video file size in bytes
   * @param videoPath string
   * @returns number (bytes)
   */
  getVideoSize(videoPath: string): number {
    const file = File.fromPath(videoPath);
    return file?.size || 0;
  }

  /**
   * Returns the video file size as a displayable format string (kb, mb, gb, etc)
   * @param videoPath string
   * @returns string
   */
  getVideoSizeString(videoPath: string): string {
    const fileSize = this.getVideoSize(videoPath);
    return this.formatBytes(fileSize);
  }

  getVideoResolution(videoPath: string): VideoResolution {
    // implemented separately in ios and android files
    return { width: 0, height: 0 };
  }

  /**
   * Looks for the video codec used by the video file at `videoPath`
   * @param videoPath string
   * @returns string
   */
  public getVideoCodec(videoPath: string): string {
    let videoFormat: any = null;
    try {
      if (__ANDROID__) {
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
    } catch (err) {
      console.error('Error while trying to extract codec info!', err);
    }
    if (!videoFormat) {
      console.warn('No video track found, cannot extract metadata information!');
    }
    return videoFormat;
  }

  /**
   * Looks for the audio codec used by the video file at `videoPath`
   * @param videoPath string
   * @returns string
   */
  public getAudioCodec(videoPath: string): string {
    let videoFormat: any = null;
    try {
      if (__ANDROID__) {
        const mediadata = new android.media.MediaMetadataRetriever();
        mediadata.setDataSource(videoPath);

        //find video format and select the video track to read from
        const videoExtractor: android.media.MediaExtractor = new android.media.MediaExtractor();
        videoExtractor.setDataSource(videoPath);
        const videoTracks = videoExtractor.getTrackCount();

        for (let j = 0; j < videoTracks; j++) {
          const mf = videoExtractor.getTrackFormat(j);
          const mime = mf.getString(android.media.MediaFormat.KEY_MIME);
          if (mime.startsWith('audio/')) {
            videoExtractor.selectTrack(j);
            videoFormat = videoExtractor.getTrackFormat(j);
            break;
          }
        }
      } else {
        const filePath = NSURL.fileURLWithPath(videoPath);
        const avAsset = AVURLAsset.assetWithURL(filePath);
        const track: AVAssetTrack = avAsset.tracksWithMediaType(AVMediaTypeAudio).firstObject;
        if (!track) {
          console.warn('No audio track found, cannot extract metadata information!');
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
    } catch (err) {
      console.error('Error while trying to extract codec info!', err);
    }
    if (!videoFormat) {
      console.warn('No audio track found, cannot extract metadata information!');
    }
    return videoFormat;
  }

  /**
   * Utility to find the duration in milliseconds of the video file at `videoPath`
   * @param videoPath string
   * @returns number (ms)
   */
  public getVideoDuration(videoPath: string): number {
    let totalTime = 0;
    try {
      if (__ANDROID__) {
        const mediadata = new android.media.MediaMetadataRetriever();
        mediadata.setDataSource(videoPath);
        totalTime = +mediadata.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_DURATION);
      } else {
        const filePath = NSURL.fileURLWithPath(videoPath);
        const avAsset = AVURLAsset.assetWithURL(filePath);
        totalTime = CMTimeGetSeconds(avAsset.duration) * 1000;
      }
    } catch (err) {
      console.error('Unable to find video duration!', err);
    }
    return totalTime;
  }

  private formatBytes(bytes: number, decimals = 2): string {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
  }
}

export type LogLevel = 'none' | 'verbose';

export interface VideoConfig {
  width?: number;
  height?: number;
  frameRate?: number; // iOS only
  audioChannels?: number; // iOS only
  audioSampleRate?: number; // iOS only
  audioBitRate?: number; // iOS only
  force?: boolean; // force transcoding to allow transcoding to the same or higher quality
}

export type MessageData = EventData & { data: { progress?: number; error?: any; output?: string } };

export interface VideoResolution {
  width: number;
  height: number;
}
