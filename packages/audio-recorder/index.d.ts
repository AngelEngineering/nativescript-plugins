/* eslint-disable @typescript-eslint/ban-types */
export interface AudioRecorderOptions {
  /**
   * The name of the file recorded.
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
  format?: any;
  channels?: any;
  sampleRate?: any;
  bitRate?: any;
  encoder?: any;

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
  pause(): Promise<any>;
  resume(): Promise<any>;
  stop(): Promise<any>;
  dispose(): Promise<any>;
}

export declare class AudioRecorder {
  static ObjCProtocols: any[];
  private _recorder;
  private _recordingSession;
  readonly ios: any;
  readonly android: any;

  /**
   * Set to true to enable console log output for debugging.
   */
  debug: boolean;

  /**
   * Returns true if the device has a microphone available. on iOS, this returns true without any code checks.
   */
  static CAN_RECORD(): boolean;

  /**
   * Android Only
   * Returns true if the RECORD_AUDIO permission has been granted.
   */
  hasRecordPermission(): boolean;

  /**
   * Android Only
   * Promise will resolve if the user grants the permission or if the permission has already been granted.
   */
  requestRecordPermission(): Promise<any>;

  /**
   * Starts a recording session with the provided options.
   * @param options [AudioRecorderOptions]
   */
  record(options: AudioRecorderOptions): Promise<any>;

  /**
   * Pauses the recorder.
   */
  pause(): Promise<any>;

  /**
   * Resumes the recorder.
   */
  resume(): Promise<any>;

  /**
   * Stops the recording.
   */
  stop(): Promise<any>;

  /**
   * Disposes of the recorder session.
   */
  dispose(): Promise<any>;

  /**
   * Returns the maximum absolute amplitude that was sampled since the last call to this method.
   * @param channel [number]
   */
  getMeters(channel?: number): any;

  /**
   * iOS Only
   * Returns value indicating the recorder is currently recording.
   */
  isRecording(): any;
  audioRecorderDidFinishRecording(recorder: any, success: boolean): void;
}
