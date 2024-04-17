/* eslint-disable @typescript-eslint/ban-types */

import { Observable } from '@nativescript/core';

export interface AudioPlayerOptions {
  /**
   * The audio file to play.
   */
  audioFile: string;

  /**
   * Set true to loop audio playback.
   */
  loop: boolean;

  /**
   * enable/disable audio playback mixing with other active audio playback sources. Defaults to false.
   */
  audioMixing?: boolean;

  /**
   * Callback to execute when playback has completed.
   * @returns [Object] An object containing the native values for the callback.
   */
  completeCallback?: Function;

  /**
   * Callback to execute when playback has an error.
   * @returns [Object] An object containing the native values for the error callback.
   */
  errorCallback?: Function;

  /**
   * Callback to execute when info is emitted from the player.
   * @returns [Object] An object containing the native values for the info callback.
   */
  infoCallback?: Function;
}

export interface IAudioPlayer {
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
   * Sets the player playback speed rate. On Android this works on API 23+.
   * @param speed [number] - The speed of the playback.
   * speed should be a float from 0.0 - X.X, and is a scale factor
   */
  changePlayerSpeed(speed: number): void;

  /**
   Begins playback at a certain delay, relative to the current playback time.
   * @param time [number] - The time to start playing the audio track at, in milliseconds
   */
  playAtTime(time: number): void;
}

export declare class AudioPlayer extends Observable {
  static ObjCProtocols: any[];
  readonly ios: any; //AVAudioPlayer
  readonly android: any; //android.media.MediaPlayer

  /**
   * supports values ranging from 0.0 for silence to 1.0 for full volume.
   * @property volume
   */
  volume: any;

  /**
   * Duration getter in milliseconds.
   *    Returns 0 if there is no audio file loaded.
   *    Returns -1 if there is an issue getting duration (Android).
   * @property duration
   */
  duration: number;

  /**
   * The current playback time, in ms, for the audio loaded in the native player.
   * @property currentTime
   */
  readonly currentTime: number;

  /**
   * @param  {AudioFocusDurationHint} durationHint - Determines differents behaviors by
   * the system and the other application that previously held audio focus.
   * See the {@link https://developer.android.com/reference/android/media/AudioFocusRequest#the-different-types-of-focus-requests different  types of focus requests}
   */
  constructor(durationHint?: AudioFocusDurationHint | AudioFocusManager);

  /**
   * Sets the audio focus manager for this player
   * @param manager new Audio Focus Manager
   */
  setAudioFocusManager(manager: AudioFocusManager): void;

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
   * Events
   */
  public static seekEvent = 'seekEvent';
  public static pausedEvent = 'pausedEvent';
  public static startedEvent = 'startedEvent';
  public static completeEvent = 'completeEvent';
  public static errorEvent = 'errorEvent'; //will pass the error object
}

export enum AudioFocusDurationHint {
  /**
   * Expresses the fact that your application is now the sole source
   * of audio that the user is listening to. The duration of the
   * audio playback is unknown, and is possibly very long: after the
   * user finishes interacting with your application, (s)he doesn’t
   * expect another audio stream to resume.
   */
  AUDIOFOCUS_GAIN = android.media.AudioManager.AUDIOFOCUS_GAIN,
  /**
   * For a situation when you know your application is temporarily
   * grabbing focus from the current owner, but the user expects
   * playback to go back to where it was once your application no
   * longer requires audio focus.
   */
  AUDIOFOCUS_GAIN_TRANSIENT = android.media.AudioManager.AUDIOFOCUS_GAIN_TRANSIENT,
  /**
   * This focus request type is similar to AUDIOFOCUS_GAIN_TRANSIENT
   * for the temporary aspect of the focus request, but it also
   * expresses the fact during the time you own focus, you allow
   * another application to keep playing at a reduced volume,
   * “ducked”.
   */
  AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK = android.media.AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK,
  /**
   * Also for a temporary request, but also expresses that your
   * application expects the device to not play anything else. This
   * is typically used if you are doing audio recording or speech
   * recognition, and don’t want for examples notifications to be
   * played by the system during that time.
   */
  AUDIOFOCUS_GAIN_TRANSIENT_EXCLUSIVE = android.media.AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK,
}

export interface AudioFocusManagerOptions {
  durationHint?: AudioFocusDurationHint;
  usage?: number; // android.media.AudioAttributes.USAGE_MEDIA
  contentType?: number; // android.media.AudioAttributes.CONTENT_TYPE_MUSIC
}
export interface AudioFocusChangeEventData extends EventData {
  focusChange: number;
}

export class AudioFocusManager extends Observable {
  constructor(options?: AudioFocusManagerOptions);
  on(event: 'audioFocusChange', callback: (data: AudioFocusChangeEventData) => void, thisArg?: any);
}

/**
 * Utility to find the duration in milliseconds of the mp4 file at `mp4Path`
 * @param mp4Path
 */
export function getDuration(mp4Path: string): number;
