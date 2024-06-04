import { File } from '@nativescript/core';
import { LogLevel, TranscoderCommon, VideoConfig, VideoResolution } from './common';
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

  convertMp3ToMp4(inputPath: string, outputPath: string): Promise<File>;

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
