import { Observable, File } from '@nativescript/core';

/* eslint-disable @typescript-eslint/ban-types */
export interface AudioRecorderOptions {
  /**
   * The name of the file recorded to.
   */
  filename: string;

  /**
   * *** ANDROID ONLY for now ***
   * The audio source to record
   * https://developer.android.com/reference/android/media/MediaRecorder.AudioSource.html
   */
  source?: any;

  /**
   * The max duration of the audio recording in ms.
   */
  maxDuration?: number;

  /**
   * Set true to enable audio metering.
   */
  metering?: boolean;

  /**
   * The format of the audio recording.
   */
  channels?: any;
  sampleRate?: any;
  bitRate?: any; //Android only, use iosAudioQuality for iOS

  /**
   * Callback to execute when playback has an error.
   * @returns {Object} An object containing the native values for the error callback.
   */
  errorCallback?: Function;

  /**
   * Callback to execute when info is emitted from the player.
   * @returns {Object} An object containing the native values for the info callback.
   */
  infoCallback?: Function;
}

export interface IAudioRecorder {
  record(options: AudioRecorderOptions): Promise<void>;
  stop(): Promise<File>;
  dispose(): Promise<void>;
}

export class AudioRecorder extends Observable implements IAudioRecorder {
  private _recorder: any;
  private _recordingSession: any;
  private _recorderOptions: AudioRecorderOptions;

  readonly ios: any; //Native iOS recorder instance
  readonly android: any; //Native Android recorder instance

  /**
   * Starts the native audio recording control.
   * @method record
   * @param options AudioRecorderOptions to use when recording audio
   * @returns Promise that resolves once recording is complete, or rejects if fails
   */
  record(options: AudioRecorderOptions): Promise<void>;

  /**
   * Stops the native audio recording control.
   * @method stop
   * @returns Promise that resolves once recording is complete and file has been written, or rejects if fails
   */
  stop(): Promise<File>;

  /**
   * Releases resources from the recorder.
   * @method dispose
   * @returns Promise that resolves once recorder has been released and disposed, or rejects if fails
   */
  dispose(): Promise<void>;

  /**
   * For Android, returns the maximum absolute amplitude (unsigned 16-bit integer values from 0-32767 ) that was sampled since the last call to this method. Call this only after the setAudioSource().
   * For iOS, returns the average power, in decibels full-scale (dBFS), for an audio channel.
   * @param channel [number] iOS-only
   */
  getMeters(channel?: number): number;

  /**
   * Returns true if the audio recorder is currently recording, false if not
   * @method isRecording
   */
  isRecording(): boolean;

  /**
   * Merges the mp4 files specified by audioFileUrls (array of file paths) into an mp4 audio file
   *      at the outputPath.
   * NOTE: inputs must all be AAC encoded MP4 audio files!
   * @method mergeAudioFiles
   * @param audioFileUrls
   * @param outputPath
   **/
  mergeAudioFiles(audioFiles: string[], outputPath: string): Promise<File>;

  /**
   * Events
   */
  /**
   * @event startedEvent emitted when recording has started
   */
  public static startedEvent = 'startedEvent';
  /**
   * @event stoppedEvent emitted when recording has stopped
   */
  public static stoppedEvent = 'stoppedEvent';
  /**
   * @event completeEvent eemitted when recording has completed and file is ready, will pass the recording file path
   */
  public static completeEvent = 'completeEvent'; //will pass the recording file path
  /**
   * @event errorEvent emitted when recording has errored, will pass an error object
   */
  public static errorEvent = 'errorEvent'; //will pass the error object
}

/**
 * Utility to find the duration in milliseconds of the mp4 file at `mp4Path`
 * @function getDuration
 * @param mp4Path string with the path of the audio file to examine
 */
export function getDuration(mp4Path: string): number;
