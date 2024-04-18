import { knownFolders, path as nsFilePath, Utils } from '@nativescript/core';
import { AudioRecorderOptions } from './options';

export interface IAudioRecorder {
  /**
   * Starts the native audio recording control.
   * @method record
   * @param options AudioRecorderOptions to use when recording audio
   * @returns Promise that resolves once recording is complete, or rejects if fails
   */
  record(options: AudioRecorderOptions): Promise<any>;

  /**
   * Stops the native audio recording control.
   * @method stop
   * @returns Promise that resolves once recording is complete and file has been written, or rejects if fails
   */
  stop(): Promise<any>;

  /**
   * Releases resources from the recorder.
   * @method dispose
   * @returns Promise that resolves once recorder has been released and disposed, or rejects if fails
   */
  dispose(): Promise<any>;

  /**
   * Merges the mp4 files specified by audioFileUrls (array of file paths) into an mp4 audio file
   *      at the outputPath.
   * NOTE: inputs must all be AAC encoded MP4 audio files!
   * @method mergeAudioFiles
   * @param audioFileUrls
   * @param outputPath
   **/
  mergeAudioFiles(audioFileUrls: string[], outputPath: string);
}

/**
 * Helper function to determine if string is a url.
 * @function isStringUrl
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
 * Determines if a string is a url or a local path. If the string is a url it will return the url.
 * If it is a local path, then the file-system module will return the file system path.
 * @function resolveAudioFilePath
 * @param path [string]
 */
export function resolveAudioFilePath(path: string) {
  if (path) {
    const isUrl = isStringUrl(path);
    // if it's a url just return the audio file url
    if (isUrl === true) {
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
      return audioPath;
    }
  }
}
