/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
import { View } from '@nativescript/core';

export declare enum VideoFill { //NOTE: read the comments below for the behavior on each platform
  default = 'default',
  aspect = 'aspect',
  aspectFill = 'aspectFill',
  fill = 'fill',
}
export class VideoPlayer extends VideoBase {}

export declare class VideoBase extends View {
  /**
   * Event Strings
   */
  static playbackFinishedEvent: string;
  static playbackReadyEvent: string;
  static playbackStartedEvent: string;
  static seekToTimeCompleteEvent: string;
  static currentTimeUpdatedEvent: string;
  static pausedEvent: string;
  static mutedEvent: string;
  static unmutedEvent: string;
  static volumeSetEvent: string;
  static errorEvent: string;
  static chaptersLoadedEvent: string; //NOTE: iOS only

  /**
   * ignore modifying iOS AVAudioSession category change on initialization
   * by default, auto changes to: AVAudioSessionCategoryPlayAndRecord
   */
  static iosIgnoreAudioSessionChange: boolean;

  /**
   * used to send events
   */
  _emit: any;

  /**
   * video source file
   */
  src: string;

  /**
   * whether to add an observer for current time during playback
   */
  observeCurrentTime: boolean;

  /**
   * set true for the video to start playing when ready
   */
  autoplay: boolean;

  /**
   * set true to enable the media player's playback controls
   */
  controls: boolean;

  /**
   * whether the video loops the playback after extends
   */
  loop: boolean;

  /**
   * whether the player is currently muted
   */
  muted: boolean;

  /**
	 * aspect/fill settings
	 * Android:
	 * When set to VideoFill.aspectFill, the aspect ratio of the video will not be honored and it will fill the entire space available.

	* iOS:
	* VideoFill.default = AVLayerVideoGravityResize
	* VideoFill.aspect = AVLayerVideoGravityResizeAspect
	* VideoFill.aspectFill = AVLayerVideoGravityResizeAspectFill
	*/
  fill: VideoFill;
  static IMAGETYPEMONO: number;
  static IMAGETYPESTEREOTOPBOTTOM: number;
  static IMAGETYPESTEREOLEFTRIGHT: number;

  backgroundAudio: boolean;

  /**
   * (ios) Set the audio session playback category.
   * backgroundAudio must evaluate to false for this to work.
   * Available categories:
   * - AVAudioSessionCategoryAmbient
   * - AVAudioSessionCategoryAudioProcessing
   * - AVAudioSessionCategoryMultiRoute
   * - AVAudioSessionCategoryPlayAndRecord
   * - AVAudioSessionCategoryPlayback
   * - AVAudioSessionCategoryRecord
   * - AVAudioSessionCategorySoloAmbient
   * - AVAudioSessionCategoryAudioProcessing (Deprecated in iOS 10)
   */
  static iosAudioSessionCategory: string;

  /**
   * flag to enable/disable debug logging
   */
  debug: boolean;

  /**
   * enables/disables chaptersLoadedEvent (iOS only functionality)
   */
  detectChapters: boolean;

  /**
   * Start playing the video.
   */
  play(): void;

  /**
   * Pause the currently playing video.
   */
  pause(): void;

  /**
   * Seek the video to a time.
   * @param {number} time - Time of the video to seek to in milliseconds.
   */
  seekToTime(time: number): void;

  /**
   * Returns the current time of the video duration in milliseconds.
   * @returns {number} Current time of the video duration.
   */
  getCurrentTime(): number;

  /**
   * NOTE: iOS-only!
   * Observable for current time of the video duration in milliseconds.
   * @returns {number} Current time of the video duration.
   */
  currentTime(): number;

  /**
   * Set the volume of the video
   * @param {number} volume - Volume to set the video between 0 and 1
   */
  setVolume(volume: number): void;

  /**
   * Set the playback speed of the video
   * @param {number} speed - Set the playback speed in float value 0.x - Y.y
   */
  setPlaybackSpeed(speed: number): void;

  /**
   * Destroy the video player and free up resources.
   */
  destroy(): void;

  /**
   * Mute and unmute the video.
   * @param {boolean} mute - true to mute the video, false to unmute.
   */
  mute(mute: boolean): void;

  /**
   * Returns the duration of the video in milliseconds.
   * @returns {number} Video duration in milliseconds.
   */
  getDuration(): number;

  /**
   * whether the player is currently playing media
   */
  isPlaying(): boolean;

  /**
   * on Android, stops playback of the video and resets the player and video src.
   *
   * on iOS this only pauses playback of the video.
   */
  stop(): void;

  /**
   * Get the video size
   * @returns {object<width: number, height: number>}
   */
  getVideoSize(): { width: number; height: number };

  /**
   * Get the native player instance.
   */
  getPlayer(): AVPlayer | android.media.MediaPlayer;

  /**
   * *** IOS ONLY ***
   * Update the video player with an AVAsset file.
   */
  updateAsset(asset): void;

  /**
   * *** IOS ONLY ***
   * Callback to execute when the video is ready to play
   * @param {function} callback - The callback function to execute.
   */
  playbackReady(callback: Function): void;

  /**
   * *** IOS ONLY ***
   * Callback to execute when the video is playing.
   * @param {function} callback - The callback function to execute.
   */
  playbackStart(callback: Function): void;

  /**
   * *** IOS ONLY ***
   * Callback to execute when the video has finished seekToTime.
   * @param {function} callback - The callback function to execute.
   */
  seekToTimeComplete(callback: Function): void;

  /*
   * Logging functions controlled by debug property
   */
  CLog(...args): void;
  CError(...args): void;
}
