import { File } from '@nativescript/core';
import { LogLevel, TranscoderCommon, VideoConfig } from './common';
export { Asset, Segment, Track, VideoConfig, MessageData } from './common';

export declare class Transcoder extends TranscoderCommon {
  /**
   * Enables or diables console logging for debug purposes.
   * @param logLevel LogLevel
   * @returns void
   */
  setLogLevel(logLevel: LogLevel): void;

  /**
   * Transcodes video from inputPath to outputPath using videoConfig options
   * @param inputPath string
   * @param outputPath string
   * @param videoConfig VideoConfig
   * @returns {Promise<File>}
   *
   */
  transcode(inputPath: string, outputPath: string, videoConfig?: VideoConfig): Promise<File>;

  /**
   * ** ANDROID ONLY **
   * Transcodes audio from inputPath to outputPath as an MP4 container with AAC audio
   * @param inputPath string (can be a url or absolute path)
   * @param outputPath string
   * @returns Promise<File>
   *
   */
  convertAudioToMp4(inputPath: string, outputPath: string): Promise<File>;

  /**
   * Merges the mp4 files specified by inputFiles (array of file paths) into an mp4 file at the outputPath.
   *
   * On iOS,  input files must all have audio and video tracks with the same codecs used.
   * @method mergeMp4Files
   * @param inputFiles
   * @param outputPath
   **/
  mergeMp4Files(inputFiles: string[], outputPath: string): Promise<File>;

  /**
   * **iOS-ONY** Merges the audio tracks from mp4 files specified by audioFileUrls (array of file paths) into an mp4 audio file
   *      at the outputPath.
   * NOTE: input files must all be MP4 files with same audio encoding!
   * @method mergeAudioMp4Files
   * @param audioFileUrls
   * @param outputPath
   **/
  public mergeAudioMp4Files(audioFiles: string[], outputPath: string): Promise<File>;

  /***********************
   Utility Functions:
   **********************/
  /**
   * Looks for the video resolution metadata and returns a VideoResolution object with width and height
   * @param videoPath string
   * @returns VideoResolution
   */
  getVideoResolution(videoPath: string): VideoResolution;
  /**
   * Returns the video file size in bytes
   * @param videoPath string
   * @returns number (bytes)
   */
  getVideoSize(videoPath: string): number; // in bytes
  /**
   * Returns the video file size as a displayable format string (kb, mb, gb, etc)
   * @param videoPath string
   * @returns string
   */
  getVideoSizeString(videoPath: string): string;
  /**
   * Looks for the video codec used by the video file at `videoPath`
   * @param videoPath string
   * @returns string
   */
  getVideoCodec(videoPath: string): string;
  /**
   * Looks for the audio codec used by the video file at `videoPath`
   * @param videoPath string
   * @returns string
   */
  getAudioCodec(videoPath: string): string;
  /**
   * Utility to find the duration in milliseconds of the video file at `videoPath`
   * @param videoPath string
   * @returns number (ms)
   */
  getVideoDuration(videoPath: string): number;
}
