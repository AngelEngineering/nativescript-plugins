/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-unused-vars */
import { Application, Utils, ViewBase } from '@nativescript/core';
import { VideoBase, VideoFill, videoSourceProperty, fillProperty } from './common';

export * from './common';

// https://stackoverflow.com/questions/40283596/ios-10-avplayer-shows-black-screen-when-playing-video?rq=1
// https://stackoverflow.com/questions/50685681/avplayerviewcontroller-show-black-screen-some-times
// https://stackoverflow.com/questions/40808377/avplayerlayer-shows-black-screen-but-sound-is-working/50736003

/**
 * Helper functions to get the iOS window and view controller
 */
function getWindow() {
  const app = UIApplication.sharedApplication;
  if (!app) {
    return;
  }
  return app.keyWindow || (app.windows && app.windows.count > 0 && app.windows.objectAtIndex(0));
}
function rootVC() {
  if (Utils.ios.getRootViewController) {
    return Utils.ios.getRootViewController();
  } else {
    // fallback for older versions of NativeScript
    const win = getWindow();
    let vc = win && win.rootViewController;
    while (vc && vc.presentedViewController) {
      vc = vc.presentedViewController;
    }
    return vc;
  }
}

export class VideoPlayer extends VideoBase {
  private _player: AVPlayer;
  private _playerController: AVPlayerViewController;
  private _src: string;
  private _didPlayToEndTimeObserver: any;
  private _didPlayToEndTimeActive: boolean;
  private _observer: NSObject;
  private _observerActive: boolean;
  private _videoLoaded: boolean;
  private _playbackTimeObserver: any;
  private _playbackTimeObserverActive: boolean;
  private _videoPlaying: boolean;
  private _videoFinished: boolean;

  constructor() {
    super();
    this._playerController = AVPlayerViewController.new();

    if (!VideoPlayer.iosIgnoreAudioSessionChange) {
      let audioSession = AVAudioSession.sharedInstance();
      let output = audioSession.currentRoute.outputs.lastObject.portType;
      if (output.match(/Receiver/)) {
        try {
          audioSession.setCategoryError(AVAudioSessionCategoryPlayAndRecord);
          audioSession.overrideOutputAudioPortError(AVAudioSessionPortOverride.Speaker);
          audioSession.setActiveError(true);
          this.CLog('audioSession category set and active');
        } catch (err) {
          this.CLog('setting audioSession category failed');
          this._emit(VideoBase.errorEvent, err);
        }
      }
    }
    this._player = AVPlayer.new();
    this._playerController.player = this._player;
    this._playerController.showsPlaybackControls = false;

    this._observer = PlayerObserverClass.new();
    this._observer['_owner'] = this;

    this._videoFinished = false;
  }

  /**
   * Called by Nativescript to create the view for the VideoPlayer component. Most of the actual setup takes place in onLoaded
   */
  createNativeView() {
    return this._playerController.view;
  }

  onLoaded() {
    super.onLoaded();
    // we do this on onLoaded as the viewControllers are not properly setup on createNativeView
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let vcParent: ViewBase = this;
    // start iterating over viewControllers
    // we also iterate over this as if it has a viewController, it's most likely a modal
    while (vcParent && !vcParent.viewController) {
      vcParent = vcParent.parent;
    }
    const vc = vcParent?.viewController || rootVC();
    if (vc) {
      vc.addChildViewController(this._playerController);
      this._playerController.didMoveToParentViewController(vc);
    }
  }

  [videoSourceProperty.setNative](value: AVPlayerItem) {
    this._setNativeVideo(value ? (<any>value).ios : null);
  }

  [fillProperty.setNative](value: VideoFill) {
    let videoGravity = AVLayerVideoGravityResize; // default
    switch (value) {
      case VideoFill.aspect:
        videoGravity = AVLayerVideoGravityResizeAspect;
        break;
      case VideoFill.aspectFill:
        videoGravity = AVLayerVideoGravityResizeAspectFill;
        break;
    }
    if (this._playerController) {
      this._playerController.videoGravity = videoGravity;
    }
  }

  public _setNativeVideo(nativeVideoPlayer: any) {
    this.CLog('Set native video: ' + nativeVideoPlayer);
    if (this._player == null) {
      setTimeout(() => {
        this._setNativeVideo(nativeVideoPlayer);
      }, 100);
      return;
    }
    if (nativeVideoPlayer != null) {
      let currentItem = this._player.currentItem;
      this._addStatusObserver(nativeVideoPlayer);
      this._autoplayCheck();
      this._backgroundAudioCheck();
      this._videoFinished = false;
      if (currentItem !== null) {
        this._videoLoaded = false;
        this._videoPlaying = false;
        this._removeStatusObserver(currentItem);
        // Need to set to null so the previous video is not shown while its loading
        this._player.replaceCurrentItemWithPlayerItem(null);
        this._player.replaceCurrentItemWithPlayerItem(nativeVideoPlayer);
      } else {
        this._player.replaceCurrentItemWithPlayerItem(nativeVideoPlayer);
        this._init();
      }
    }
  }

  public updateAsset(nativeVideoAsset: AVAsset) {
    let newPlayerItem = AVPlayerItem.playerItemWithAsset(nativeVideoAsset);
    this._setNativeVideo(newPlayerItem);
  }

  public _setNativePlayerSource(nativePlayerSrc: string) {
    this._src = nativePlayerSrc;
    let url: NSURL = NSURL.URLWithString(this._src);
    this._player = new AVPlayer(<any>url);
    this._playerController.player = null;
    this._playerController.player = this._player;
    this._init();
  }

  private _init() {
    if (this.controls !== false) {
      this._playerController.showsPlaybackControls = true;
    }

    this._playerController.player = this._player;

    if (isNaN(<any>this.width) || isNaN(<any>this.height)) {
      this.requestLayout();
    }

    if (this.muted === true) {
      this._player.muted = true;
    }

    if (!this._didPlayToEndTimeActive) {
      this._didPlayToEndTimeObserver = Application.ios.addNotificationObserver(AVPlayerItemDidPlayToEndTimeNotification, this.AVPlayerItemDidPlayToEndTimeNotification.bind(this));
      this._didPlayToEndTimeActive = true;
    }
  }

  private AVPlayerItemDidPlayToEndTimeNotification(notification: any) {
    if (this._player && this._player.currentItem && this._player.currentItem === notification.object) {
      // This will match exactly to the object from the notification so can ensure only looping and finished event for the video that has finished.
      // Notification is structured like so: NSConcreteNotification 0x61000024f690 {name = AVPlayerItemDidPlayToEndTimeNotification; object = <AVPlayerItem: 0x600000204190, asset = <AVURLAsset: 0x60000022b7a0, URL = https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4>>}
      this._emit(VideoBase.playbackFinishedEvent);
      this._videoFinished = true;
      if (this.loop === true && this._player !== null) {
        // Go in 5ms for more seamless looping
        this._player.seekToTime(CMTimeMake(5, 100));
        this._player.play();
      }
    }
  }

  /**
   * Start playing the video.
   * NOTE: on iOS, the player must have issued the playbackReadyEvent before this can be called
   */
  public play() {
    if (this._videoFinished) {
      this._videoFinished = false;
      this.seekToTime(0);
    }

    if (this.observeCurrentTime && !this._playbackTimeObserverActive) {
      this._addPlaybackTimeObserver();
    }

    this._player.play();
  }

  /**
   * Get the native player instance.
   */
  public getPlayer(): AVPlayer {
    return this._player;
  }

  /**
   * Get the video size
   * @returns {object<width: number, height: number>}
   */
  public getVideoSize(): CGSize {
    if (this._player) {
      const size: CGSize = this._player.currentItem.presentationSize;
      return size;
    }
  }

  /**
   * Pause the currently playing video.
   */
  public pause(): void {
    if (this._player) {
      this._player.pause();
      this._emit(VideoBase.pausedEvent);
    }
    if (this._playbackTimeObserverActive) {
      this._removePlaybackTimeObserver();
    }
  }

  /**
   * on Android, stops playback of the video and resets the player and video src.
   *
   * on iOS this only pauses playback of the video.
   */
  public stop(): void {
    this._player.pause();
  }

  /**
   * Mute and unmute the video.
   * @param {boolean} mute - true to mute the video, false to unmute.
   */
  public mute(mute: boolean) {
    if (this._player) {
      this._player.muted = mute;
      if (mute) this._emit(VideoBase.mutedEvent);
      else this._emit(VideoBase.unmutedEvent);
    }
  }

  /**
   * whether the player is currently playing media
   */
  public isPlaying(): boolean {
    return this?._player.rate && !this?._player.error;
  }

  /**
   * Seek the video to a time.
   * @param {number} time - Time of the video to seek to in milliseconds.
   */
  public seekToTime(milliseconds: number) {
    const seconds = milliseconds / 1000;
    if (this._player) {
      this.CLog('timescale', this._player.currentTime().timescale);
      if (this._player.currentItem && this._player.currentItem.status === 1) {
        let time = CMTimeMakeWithSeconds(seconds, this._player.currentTime().timescale);
        try {
          this._player.seekToTimeToleranceBeforeToleranceAfterCompletionHandler(time, kCMTimeZero, kCMTimeZero, isFinished => {
            this._emit(VideoBase.seekToTimeCompleteEvent, { time: seconds });
          });
        } catch (e) {
          console.error(e);
          this._emit(VideoBase.errorEvent, e);
        }
      } else {
        this.CLog('AVPlayerItem cannot service a seek request with a completion handler until its status is ReadyToPlay.');
      }
    }
  }

  /**
   * Returns the duration of the video in milliseconds.
   * @returns {number} Video duration in milliseconds.
   */
  public getDuration(): number {
    if (!this._player || (this._player && this._player.currentItem == null)) {
      return 0;
    }
    let seconds = CMTimeGetSeconds(this._player.currentItem.asset.duration);
    let milliseconds = seconds * 1000.0;
    return milliseconds;
  }

  /**
   * Returns the current time of the video duration in milliseconds.
   * @returns {number} Current time of the video duration.
   */
  public getCurrentTime(): any {
    if (!this._player) {
      return 0;
    }
    return (this._player.currentTime().value / this._player.currentTime().timescale) * 1000;
  }

  /**
   * Set the volume of the video
   * @param {number} volume - Volume to set the video between 0 and 1
   */
  public setVolume(volume: number) {
    if (this._player) {
      this._player.volume = volume;
      this._emit(VideoBase.volumeSetEvent);
    }
  }

  /**
   * Set the playback speed of the video
   * @param {number} speed - Set the playback speed in float value 0.x - Y.y
   */
  public setPlaybackSpeed(speed: number) {
    this._player.rate = speed;
  }

  /**
   * Destroy the video player and free up resources.
   */
  public destroy() {
    if (this._player) {
      this._removeStatusObserver(this._player.currentItem);
    }

    if (this._didPlayToEndTimeActive) {
      Application.ios.removeNotificationObserver(this._didPlayToEndTimeObserver, AVPlayerItemDidPlayToEndTimeNotification);
      this._didPlayToEndTimeActive = false;
    }

    if (this._playbackTimeObserverActive) {
      this._removePlaybackTimeObserver();
    }

    this.pause();
    if (this._player) {
      // de-allocates the AVPlayer
      this._player.replaceCurrentItemWithPlayerItem(null);
    }
    this._playerController = null;
    this._player = null;
  }

  private _addStatusObserver(currentItem) {
    this._observerActive = true;
    currentItem.addObserverForKeyPathOptionsContext(this._observer, 'status', 0, null);
    this._player.addObserverForKeyPathOptionsContext(this._observer, 'rate', NSKeyValueObservingOptions.New, null);
  }

  private _removeStatusObserver(currentItem) {
    // If the observer is active, then we need to remove it...
    if (!this._observerActive) {
      return;
    }

    this._observerActive = false;
    if (currentItem) {
      currentItem.removeObserverForKeyPath(this._observer, 'status');
      this._player.removeObserverForKeyPath(this._observer, 'rate');
    }
  }

  private _addPlaybackTimeObserver() {
    this._playbackTimeObserverActive = true;
    let _interval = CMTimeMake(1, 5);
    if (this._player) {
      // only if valid player instance
      this._playbackTimeObserver = this._player.addPeriodicTimeObserverForIntervalQueueUsingBlock(_interval, null, currentTime => {
        let _seconds = CMTimeGetSeconds(currentTime);
        let _milliseconds = _seconds * 1000.0;
        this._emit(VideoBase.currentTimeUpdatedEvent, { position: _milliseconds });
      });
    }
  }

  private _removePlaybackTimeObserver() {
    this._playbackTimeObserverActive = false;
    if (this._player) {
      this._player.removeTimeObserver(this._playbackTimeObserver);
    }
  }

  private _autoplayCheck() {
    if (this.autoplay) {
      this.play();
    }
  }

  private _backgroundAudioCheck() {
    try {
      const audioSession = AVAudioSession.sharedInstance();
      if (this.backgroundAudio) {
        audioSession.setCategoryError(AVAudioSessionCategoryAmbient);
      } else {
        audioSession.setCategoryError(VideoBase.iosAudioSessionCategory || AVAudioSessionCategoryPlayAndRecord);
      }
      audioSession.setActiveError(true);
    } catch (err) {
      // If for some reason we can't change where the audio is playing, we don't care...  :-)
      this._emit(VideoBase.errorEvent, err);
    }
  }

  playbackReady() {
    this._videoLoaded = true;
    this._emit(VideoBase.playbackReadyEvent);

    //This is disabled by default, enable by setting the detectChapters property to true
    if (this.detectChapters) {
      const playerItem = <AVPlayerItem>(<AVPlayer>this._player).currentItem;
      const chapterLocalesKey = 'availableChapterLocales';
      playerItem.asset.loadValuesAsynchronouslyForKeysCompletionHandler(NSArray.arrayWithArray([chapterLocalesKey]), () => {
        let status = playerItem.asset.statusOfValueForKeyError(chapterLocalesKey);
        if (status === AVKeyValueStatus.Loaded) {
          let languages = NSLocale.preferredLanguages;
          let chapterMetadata = playerItem.asset.chapterMetadataGroupsBestMatchingPreferredLanguages(languages);
          // Emit chapter metadata for developers to work with
          // TODO: could pre-parse them however likely be most versatile allowing dev's to parse however they'd like so no data is missed
          this._emit(VideoBase.chaptersLoadedEvent, { data: chapterMetadata });
        } else {
          // Handle other status cases
        }
      });
    }
  }

  playbackStart() {
    this._videoPlaying = true;
    this._emit(VideoBase.playbackStartedEvent);
  }

  playbackPaused() {
    if (!this._videoPlaying) {
      return;
    }
    this._videoPlaying = false;
    this._emit(VideoBase.pausedEvent);
  }
}

@NativeClass()
class PlayerObserverClass extends NSObject {
  observeValueForKeyPathOfObjectChangeContext(path: string, obj: Object, change: NSDictionary<any, any>, context: any) {
    if (path === 'status') {
      if (this['_owner']._player && this['_owner']._player.currentItem.status === AVPlayerItemStatus.ReadyToPlay && !this['_owner']._videoLoaded) {
        this['_owner'].playbackReady();
      }
    } else if (path === 'rate') {
      if (this['_owner']._player && this['_owner']._player.rate > 0 && this['_owner']._videoLoaded) {
        this['_owner'].playbackStart();
      } else if (this['_owner']._player && this['_owner']._player.rate == 0 && this['_owner']._videoLoaded) {
        this['_owner'].playbackPaused();
      }
    }
  }
}
