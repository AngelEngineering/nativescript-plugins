/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { knownFolders, path as nsFilePath, Utils } from '@nativescript/core';
import { AudioPlayerOptions } from './options';

export interface AudioPlayer {
  /**
   * native instance getters
   */
  readonly ios?: any; //AVAudioPlayer
  readonly android?: any; //android.media.MediaPlayer

  /**
   * supports values ranging from 0.0 for silence to 1.0 for full volume.
   * @property volume
   */
  volume: any;

  /**
   * Prepare Audio player by preloading an audio file from file oath or URL.
   * @method prepareAudio
   * @param options AudioPlayerOptions.
   * @returns Promise that resolves as true once prepared successfully, or false if there was an error.
   */
  prepareAudio(options: AudioPlayerOptions): Promise<boolean>;

  /**
   * Play current audio file that has been prepared by calling prepareAudio(options).
   * @method play
   * @returns Promise that resolves as true once playback is complete, or false if there was an error during playback.
   */
  play(): Promise<boolean>;

  /**
   * Pauses the currently playing audio file.
   * @method pause
   * @returns Promise that resolves as true once pause is complete, or false if there was an error during pause.
   */
  pause(): Promise<boolean>;

  /**
   * Seeks to specific time, in ms, for the currently prepared audio file.
   * @method seekTo
   * @returns Promise that resolves as true once seek is complete, or false if there was an error during seek.
   */
  seekTo(time: number): Promise<boolean>;

  /**
   * Releases resources from the audio player.
   * @method dispose
   * @returns Promise that resolves as true once disposal is complete, or false if there was an error during disposal.
   */
  dispose(): Promise<boolean>;

  /**
   * Check if the audio is actively playing.
   * @method isAudioPlaying
   * @returns true if audio is playing, false if not.
   */
  isAudioPlaying(): boolean;

  /**
   * Get the duration of the audio file prepared in player, in ms.
   * @method getAudioTrackDuration
   * @returns Promise that resolves the duration in ms, or 0 if there was an error when reading duration from native player.
   */
  getAudioTrackDuration(): Promise<number>;

  /**
   * The current playback time, in ms, for the audio loaded in the native player.
   * @property currentTime
   */
  readonly currentTime: number;
}

export interface IAudioPlayer {
  /**
   * native instance getters
   */
  readonly ios?: any; //AVAudioPlayer
  readonly android?: any; //android.media.MediaPlayer

  /**
   * supports values ranging from 0.0 for silence to 1.0 for full volume.
   * @property volume
   */
  volume: number;

  /**
   * Duration getter in milliseconds.
   *    Returns 0 if there is no audio file loaded.
   *    Returns -1 if there is an issue getting duration (Android).
   * @property duration
   */
  duration: number;

  /**
   * Prepare Audio player by preloading an audio from file or URL
   * @function prepareAudio
   * @param options
   */
  prepareAudio(options: AudioPlayerOptions): Promise<boolean>;

  /**
   * Play current audio file that has been prepared by calling prepareAudio(options).
   * @method play
   * @returns Promise that resolves as true once playback is complete, or false if there was an error during playback.
   */
  play(): Promise<boolean>;

  /**
   * Pauses the currently playing audio file.
   * @method pause
   * @returns Promise that resolves as true once pause is complete, or false if there was an error during pause.
   */
  pause(): Promise<boolean>;

  /**
   * Resume audio player playback.
   * @method resume
   */
  resume(): void;

  /**
   * Seeks to specific time, in ms, for the currently prepared audio file.
   * @method seekTo
   * @returns Promise that resolves as true once seek is complete, or false if there was an error during seek.
   */
  seekTo(time: number): Promise<boolean>;

  /**
   * Releases resources from the audio player.
   * @method dispose
   * @returns Promise that resolves as true once disposal is complete, or false if there was an error during disposal.
   */
  dispose(): Promise<boolean>;

  /**
   * Check if the audio is actively playing.
   * @method isAudioPlaying
   * @returns true if audio is playing, false if not.
   */
  isAudioPlaying(): boolean;

  /**
   * Get the duration of the audio file prepared in player, in ms.
   * @method getAudioTrackDuration
   * @returns Promise that resolves the duration in ms, or 0 if there was an error when reading duration from native player.
   */
  getAudioTrackDuration(): Promise<number>;

  /**
   * Sets the player playback speed rate. On Android this only works on API 23+.
   * @param speed [number] - The speed of the playback.
   * speed should be a float from 0.0 - X.X, and is a scale factor
   */
  changePlayerSpeed(speed: number): void;

  /**
   * ** iOS ONLY ** - Begins playback at a certain delay, relative to the current playback time.
   * @param time [number] - The time to start playing the audio track at.
   */
  playAtTime(time: number): void;
}

/**
 * Helper function to determine if string is a url.
 * @method isStringUrl
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
 * @method resolveAudioFilePath
 * @param path [string]
 */
export function resolveAudioFilePath(path: string): string {
  if (path) {
    const isUrl = isStringUrl(path);
    // if it's a url just return the audio file url
    if (isUrl === true) {
      return path;
    } else {
      let audioPath: string;
      let fileName = Utils.isString(path) ? path.trim() : '';
      if (fileName.indexOf('~/') === 0) {
        fileName = nsFilePath.join(knownFolders.currentApp().path, fileName.replace('~/', ''));
        audioPath = fileName;
      } else {
        audioPath = fileName;
      }
      return audioPath;
    }
  }
}
