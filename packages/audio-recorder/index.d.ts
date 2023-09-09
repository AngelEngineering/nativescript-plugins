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
   * The max duration of the audio recording.
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
  start(options: AudioRecorderOptions): Promise<any>;
  stop(): Promise<any>;
  dispose(): Promise<any>;
}

export class AudioRecorder extends Observable implements IAudioRecorder {
  private _recorder: any;
  private _recordingSession: any;
  private _recorderOptions: AudioRecorderOptions;

  readonly ios: any;
  readonly android: any;

  /**
   * Starts a recording session with the provided options.
   * @param options [AudioRecorderOptions]
   */
  record(options: AudioRecorderOptions): Promise<any>;

  /**
   * Stops the recording
   */
  stop(): Promise<File>;

  /**
   * Disposes of the recorder session
   */
  dispose(): Promise<any>;

  /**
   * Returns the maximum absolute amplitude that was sampled since the last call to this method.
   * @param channel [number]
   */
  getMeters(channel?: number): any;

  /**
   * Returns value indicating the recorder is currently recording.
   */
  isRecording(): boolean;

  /**
   * Merges all files with file paths specified in audioFiles into a new file at outputPath
   * Note: this only supports MP4 audio files
   */
  mergeAudioFiles(audioFiles: string[], outputPath: string): Promise<File>;
}
