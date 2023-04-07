import { knownFolders, path as nsFilePath, Utils } from '@nativescript/core';
import { AudioPlayerOptions } from './options';

export interface AudioPlayer {
  /**
   * native instance getters
   */
  readonly ios?: any;
  readonly android?: any;

  /**
   * Volume getter/setter
   */
  volume: any;

  /**
   * Prepare Audio player by preloading an audio from file or URL
   * @function prepareAudio
   * @param options
   */
  prepareAudio(options: AudioPlayerOptions): Promise<boolean>;

  /**
   * Play current audio file that has been prepared by calling prepareAudio(options)
   */
  play(): Promise<boolean>;

  /**
   * Pauses playing audio file.
   */
  pause(): Promise<boolean>;

  /**
   * Seeks to specific time.
   */
  seekTo(time: number): Promise<boolean>;

  /**
   * Releases resources from the audio player.
   */
  dispose(): Promise<boolean>;

  /**
   * Check if the audio is actively playing.
   */
  isAudioPlaying(): boolean;

  /**
   * Get the duration of the audio file playing.
   */
  getAudioTrackDuration(): Promise<string>;

  /**
   * current time
   */
  readonly currentTime: number;
}

export interface IAudioPlayer {
  readonly ios?: any;
  readonly android?: any;

  /**
   * Set to true to enable console log output for debugging.
   */
  debug: boolean;

  /**
   * Volume getter/setter
   */
  volume: any;

  /**
   * Duration getter
   */
  duration: number;

  /**
   * Prepare Audio player by preloading an audio from file or URL
   * @function prepareAudio
   * @param options
   */
  prepareAudio(options: AudioPlayerOptions): Promise<boolean>;

  /**
   * Play audio file using options set by prepareAudio
   */
  play(): Promise<boolean>;

  /**
   * Pauses playing audio file.
   */
  pause(): Promise<boolean>;

  /**
   * Resume audio player.
   */
  resume(): void;

  /**
   * Seeks to specific time.
   */
  seekTo(time: number): Promise<any>;

  /**
   * Releases resources from the audio player.
   */
  dispose(): Promise<boolean>;

  /**
   * Check if the audio is actively playing.
   */
  isAudioPlaying(): boolean;

  /**
   * Get the duration of the audio file playing.
   */
  getAudioTrackDuration(): Promise<string>;

  /**
   * Sets the player playback speed rate. On Android this works on API 23+.
   * @param speed [number] - The speed of the playback.
   */
  changePlayerSpeed(speed: number): void;

  /**
   * ** iOS ONLY ** - Begins playback at a certain delay, relative to the current playback time.
   * @param time [number] - The time to start playing the audio track at.
   */
  playAtTime(time: number);
}

/**
 * Helper function to determine if string is a url.
 * @param value [string]
 */
export function isStringUrl(value: string): boolean {
  // check if artURL is a url or local file
  let isURL = false;
  if (value.indexOf('://') !== -1) {
    if (value.indexOf('res://') === -1) {
      isURL = true;
    }
  }
  if (isURL === true) {
    return true;
  } else {
    return false;
  }
}

/**
 * Will determine if a string is a url or a local path. If the string is a url it will return the url.
 * If it is a local path, then the file-system module will return the file system path.
 * @param path [string]
 */
export function resolveAudioFilePath(path: string) {
  if (path) {
    const isUrl = isStringUrl(path);
    // if it's a url just return the audio file url
    if (isUrl === true) {
      console.log('detected a url filename, using directly', path);
      return path;
    } else {
      let audioPath;
      let fileName = Utils.isString(path) ? path.trim() : '';
      if (fileName.indexOf('~/') === 0) {
        fileName = nsFilePath.join(knownFolders.currentApp().path, fileName.replace('~/', ''));
        audioPath = fileName;
      } else {
        audioPath = fileName;
      }
      console.log('detected a local filename, using path', audioPath);
      return audioPath;
    }
  }
}
