import { Utils } from '@nativescript/core';
import { VideoBase, videoSourceProperty } from './common';
export * from './common';

const STATE_IDLE = 0;
const STATE_PLAYING = 1;
const STATE_PAUSED = 2;
const SURFACE_WAITING = 0;
const SURFACE_READY = 1;

export class VideoPlayer extends VideoBase {
  private _nativeView: android.view.TextureView = null;
  public get nativeView(): android.view.TextureView {
    return this._nativeView;
  }
  public set nativeView(value: android.view.TextureView) {
    this._nativeView = value;
  }
  public player: android.media.MediaPlayer = null;
  private _src = '';
  private _owner: WeakRef<VideoPlayer> = new WeakRef(this);
  private textureSurface: android.view.Surface = null;
  private mediaController: android.widget.MediaController = null;
  private videoWidth = 0;
  private videoHeight = 0;
  private playState = STATE_IDLE;
  private mediaState = SURFACE_WAITING;
  private audioSession = null; //this will be created and set by the mediaplayer on init
  private preSeekTime = -1;
  private currentBufferPercentage = 0;
  private _playbackTimeObserver = null;
  private _playbackTimeObserverActive = false;

  constructor() {
    super();
  }

  [videoSourceProperty.setNative](value) {
    this._setNativeVideo(value ? value.android : null);
  }

  /**
   * Called by Nativescript to create the view for the VideoPlayer component
   */
  public createNativeView(): any {
    this.CLog('VideoPlayer.createNativeView');
    this.nativeView = new android.view.TextureView(this._context);
    this.nativeView.setFocusable(true);
    this.nativeView.setFocusableInTouchMode(true);
    this.nativeView.requestFocus();
    this.nativeView.setOnTouchListener(
      new android.view.View.OnTouchListener({
        onTouch: (view, event) => {
          this.CLog('OnTouchListener --- onTouch', `view: ${view}, event: ${event}`);
          this._owner.get().toggleMediaControllerVisibility();
          return false;
        },
      })
    );

    this.nativeView.setSurfaceTextureListener(
      new android.view.TextureView.SurfaceTextureListener({
        onSurfaceTextureSizeChanged: (surface, width, height) => {
          this.CLog('SurfaceTextureListener.onSurfaceTextureSizeChanged ---', `surface: ${surface}, width: ${width}, height: ${height}`);
          // do nothing
        },

        onSurfaceTextureAvailable: (surface, width, height) => {
          this.CLog('SurfaceTextureListener.onSurfaceTextureAvailable ---', `surface: ${surface}`);
          this._owner.get().textureSurface = new android.view.Surface(surface);
          this._owner.get().mediaState = SURFACE_WAITING;
          this._owner.get()._openVideo();
        },

        onSurfaceTextureDestroyed: surface => {
          this.CLog('SurfaceTextureListener.onSurfaceTextureDestroyed ---', `surface: ${surface}`);
          // after we return from this we can't use the surface any more
          if (this._owner.get().textureSurface !== null) {
            this._owner.get().textureSurface.release();
            this._owner.get().textureSurface = null;
          }
          if (this._owner.get().mediaController !== null) {
            this._owner.get().mediaController.hide();
          }
          this._owner.get().release();

          return true;
        },

        onSurfaceTextureUpdated: (/* surface */) => {
          // do nothing - this gets called a crap ton - so don't add logs
        },
      })
    );

    return this.nativeView;
  }

  public toggleMediaControllerVisibility() {
    this.CLog('VideoPlayer.toggleMediaControllerVisibility');
    if (!this.mediaController) {
      return;
    }
    if (this.mediaController.isShowing()) {
      this.mediaController.hide();
    } else {
      this.mediaController.show();
    }
  }

  /**
   * Start playing the video.
   */
  public play(): void {
    this.CLog('VideoPlayer.play');
    this.playState = STATE_PLAYING;
    if (this.mediaState === SURFACE_WAITING) {
      this._openVideo();
    } else {
      if (this.observeCurrentTime && !this._playbackTimeObserverActive) {
        this._addPlaybackTimeObserver();
      }
      this.player.start();
      this.CLog('VideoPlayer ---  emitting playbackStartedEvent');
      this._emit(VideoBase.playbackStartedEvent);
    }
  }

  /**
   * Pause the currently playing video.
   */
  public pause(): void {
    this.CLog('VideoPlayer.pause');
    this.playState = STATE_PAUSED;
    this.player.pause();
    this.CLog('VideoPlayer ---  emitting pausedEvent');
    this._emit(VideoBase.pausedEvent);
    this._removePlaybackTimeObserver();
  }

  /**
   * Mute and unmute the video.
   * @param {boolean} mute - true to mute the video, false to unmute.
   */
  public mute(mute: boolean): void {
    if (this.player) {
      if (mute === true) {
        this.player.setVolume(0, 0);
        this.CLog('VideoPlayer ---  emitting mutedEvent');
        this._emit(VideoBase.mutedEvent);
      } else if (mute === false) {
        this.player.setVolume(1, 1);
        this.CLog('VideoPlayer ---  emitting unmutedEvent');
        this._emit(VideoBase.unmutedEvent);
      }
    }
  }

  /**
   * on Android, stops playback of the video and resets the player and video src.
   *
   * on iOS this only pauses playback of the video.
   */
  public stop(): void {
    this.player.stop();
    this._removePlaybackTimeObserver();
    this.playState = STATE_IDLE;
    this.release();
  }

  /**
   * Seek the video to a time.
   * @param {number} time - Time of the video to seek to in milliseconds.
   */
  public seekToTime(ms: number): void {
    if (!this.player) {
      this.preSeekTime = ms;
      return;
    } else {
      this.preSeekTime = -1;
    }

    this.player.seekTo(ms);

    this.CLog('VideoPlayer ---  emitting seekToTimeCompleteEvent');
    this._emit(VideoBase.seekToTimeCompleteEvent, { time: ms });
  }

  /**
   * whether the player is currently playing media
   */
  public isPlaying(): boolean {
    if (!this.player) {
      return false;
    }
    return this.player.isPlaying();
  }

  /**
   * Get the native player instance.
   */
  public getPlayer(): android.media.MediaPlayer {
    return this.player;
  }

  /**
   * Returns the duration of the video in milliseconds.
   * @returns {number} Video duration in milliseconds.
   */
  public getDuration(): number {
    if (!this.player || this.mediaState === SURFACE_WAITING || this.playState === STATE_IDLE) {
      return 0;
    }
    return this.player.getDuration();
  }

  /**
   * Returns the current time of the video duration in milliseconds.
   * @returns {number} Current time of the video duration.
   */
  public getCurrentTime(): number {
    if (!this.player) {
      return 0;
    }
    return this.player.getCurrentPosition();
  }

  /**
   * Set the volume of the video
   * @param {number} volume - Volume to set the video between 0 and 1
   */
  public setVolume(volume: number) {
    this.player.setVolume(volume, volume);
    this._emit(VideoBase.volumeSetEvent);
  }

  /**
   * Set the playback speed of the video
   * @param {number} speed - Set the playback speed in float value 0.x - Y.y
   */
  public setPlaybackSpeed(speed: number) {
    this.player.setPlaybackParams(this.player.getPlaybackParams().setSpeed(speed));
  }

  /**
   * Destroy the video player and free up resources.
   */
  public destroy() {
    this.release();
    this.src = null;
    this.nativeView = null;
    this.player = null;
    this.mediaController = null;
  }

  /**
   * Get the video size
   * @returns {object<width: number, height: number>}
   */
  public getVideoSize(): { width: number; height: number } {
    return {
      width: this.videoWidth,
      height: this.videoHeight,
    };
  }

  private release(): void {
    if (this.player !== null) {
      this.mediaState = SURFACE_WAITING;
      this.player.reset();
      this.player.release();
      this.player = null;
      if (this._playbackTimeObserverActive) {
        this._removePlaybackTimeObserver();
      }
      const am = Utils.android.getApplicationContext().getSystemService(android.content.Context.AUDIO_SERVICE);
      am.abandonAudioFocus(null);
    }
  }

  /**
   * hook into your app's suspend event to clear the player
   */
  public suspendEvent(): void {
    this.release();
  }

  /**
   * hook into your app's resume event to restore the player
   */
  public resumeEvent(): void {
    this._openVideo();
  }

  private _setupMediaPlayerListeners() {
    this.CLog('VideoPlayer._setupMediaPlayerListeners');
    this.player.setOnPreparedListener(
      new android.media.MediaPlayer.OnPreparedListener({
        onPrepared: mp => {
          this.CLog('MediaPlayer.OnPreparedListener.onPrepared ---', `mp: ${mp}`);
          if (this._owner.get()) {
            if (this._owner.get().muted === true) {
              mp.setVolume(0, 0);
            }

            if (this._owner.get().mediaController != null) {
              this._owner.get().mediaController.setEnabled(true);
            }

            if (this._owner.get().preSeekTime > 0) {
              mp.seekTo(this._owner.get().preSeekTime);
            }
            this._owner.get().preSeekTime = -1;

            this._owner.get().videoWidth = mp.getVideoWidth();
            this._owner.get().videoHeight = mp.getVideoHeight();

            this._owner.get().mediaState = SURFACE_READY;

            if (this._owner.get().fill) {
              this._owner.get()._resetAspectRatio();
            } else {
              this._owner.get()._setupAspectRatio();
            }

            if (this._owner.get().videoWidth !== 0 && this._owner.get().videoHeight !== 0) {
              this._owner.get().nativeView.getSurfaceTexture().setDefaultBufferSize(this._owner.get().videoWidth, this._owner.get().videoHeight);
            }

            if (this._owner.get().autoplay === true || this._owner.get().playState === STATE_PLAYING) {
              this._owner.get().play();
            }

            this.CLog('VideoPlayer ---  emitting playbackReadyEvent');
            this._owner.get()._emit(VideoBase.playbackReadyEvent);
            if (this._owner.get().loop === true) {
              mp.setLooping(true);
            }
          }
        },
      })
    );

    this.player.setOnSeekCompleteListener(
      new android.media.MediaPlayer.OnSeekCompleteListener({
        onSeekComplete: mp => {
          this.CLog('MediaPlayer.OnSeekCompleteListener.onSeekComplete ---', `mp: ${mp}`);
          if (this._owner.get()) {
            this.CLog('VideoPlayer ---  emitting seekToTimeCompleteEvent');
            this._owner.get()._emit(VideoBase.seekToTimeCompleteEvent);
          }
        },
      })
    );

    this.player.setOnVideoSizeChangedListener(
      new android.media.MediaPlayer.OnVideoSizeChangedListener({
        onVideoSizeChanged: (mp, width, height) => {
          this.CLog('MediaPlayer.setOnVideoSizeChangedListener.onVideoSizeChanged ---', `mp: ${mp}, width: ${width}, heigth: ${height}`);

          if (this._owner.get()) {
            this._owner.get().videoWidth = mp.getVideoWidth();
            this._owner.get().videoHeight = mp.getVideoHeight();
            if (this._owner.get().videoWidth !== 0 && this._owner.get().videoHeight !== 0) {
              this._owner.get().nativeView.getSurfaceTexture().setDefaultBufferSize(this._owner.get().videoWidth, this._owner.get().videoHeight);
              if (this._owner.get().fill) {
                this._owner.get()._resetAspectRatio();
              } else {
                this._owner.get()._setupAspectRatio();
              }
            }
          }
        },
      })
    );

    this.player.setOnCompletionListener(
      new android.media.MediaPlayer.OnCompletionListener({
        onCompletion: mp => {
          this.CLog('MediaPlayer.OnCompletionListener.onCompletion ---', `mp: ${mp}`);
          if (this._owner.get()) {
            this._owner.get()._removePlaybackTimeObserver();
            this.CLog('VideoPlayer ---  emitting playbackFinishedEvent');
            this._owner.get()._emit(VideoBase.playbackFinishedEvent);
          }
        },
      })
    );

    this.player.setOnBufferingUpdateListener(
      new android.media.MediaPlayer.OnBufferingUpdateListener({
        onBufferingUpdate: (mp, percent) => {
          this.CLog('MediaPlayer.OnBufferingUpdateListener.onBufferingUpdate ---', `mp: ${mp}, percent: ${percent}`);
          this._owner.get().currentBufferPercentage = percent;
        },
      })
    );
    this.currentBufferPercentage = 0;
  }

  private _setupMediaController(): void {
    this.CLog('VideoPlayer._setupMediaController');
    if (this.controls !== false || this.controls === undefined) {
      if (this.mediaController == null) {
        this.CLog('VideoPlayer._setupMediaController ---', 'creating new MediaController');
        this.mediaController = new android.widget.MediaController(this._context);
      } else {
        // Already setup
        return;
      }

      // 'getAudioSessionId' was added in API level 18, the current generated TNS typings are level 17
      interface TNSMediaPlayerControlApiLevel18 extends android.widget.MediaController.MediaPlayerControl {
        getAudioSessionId(): number;
      }

      const mediaPlayerControl = new android.widget.MediaController.MediaPlayerControl(<TNSMediaPlayerControlApiLevel18>{
        canPause: () => {
          return true;
        },
        canSeekBackward: () => {
          return true;
        },
        canSeekForward: () => {
          return true;
        },
        getAudioSessionId: () => {
          return this._owner.get().audioSession;
        },
        getBufferPercentage: () => {
          return this._owner.get().currentBufferPercentage;
        },
        getCurrentPosition: () => {
          return this._owner.get().getCurrentTime();
        },
        getDuration: () => {
          return this._owner.get().getDuration();
        },
        isPlaying: () => {
          return this._owner.get().isPlaying();
        },
        pause: () => {
          this._owner.get().pause();
        },
        seekTo: v => {
          this._owner.get().seekToTime(v);
        },
        start: () => {
          this._owner.get().play();
        },
      });

      this.CLog(`VideoPlayer._setupMediaController ---`, `mediaController.setMediaPlayer(${mediaPlayerControl})`);
      this.mediaController.setMediaPlayer(mediaPlayerControl);
      this.CLog(`VideoPlayer._setupMediaController ---`, `mediaController.setAnchorView(${this.nativeView})`);
      this.mediaController.setAnchorView(this.nativeView);
      this.CLog(`VideoPlayer._setupMediaController ---`, `mediaController.setEnabled(true)`);
      this.mediaController.setEnabled(true);
    }
  }

  private _setupAspectRatio(): void {
    this.CLog(`VideoPlayer._setupAspectRatio`);
    const viewWidth = this.nativeView.getWidth();
    const viewHeight = this.nativeView.getHeight();
    const aspectRatio = this.videoHeight / this.videoWidth;
    this.CLog(`VideoPlayer._setupAspectRatio ---`, `viewHeight: ${viewHeight}, viewWidth: ${viewWidth}, aspectRatio: ${aspectRatio}`);

    let newWidth;
    let newHeight;
    if (viewHeight > viewWidth * aspectRatio) {
      // limited by narrow width; restrict height
      newWidth = viewWidth;
      newHeight = viewWidth * aspectRatio;
    } else {
      // limited by short height; restrict width
      newWidth = viewHeight / aspectRatio;
      newHeight = viewHeight;
    }

    this.CLog(`VideoPlayer._setupAspectRatio ---`, `newWidth: ${newWidth}, newHeight: ${newHeight}`);

    const xoff = (viewWidth - newWidth) / 2;
    const yoff = (viewHeight - newHeight) / 2;
    this.CLog(`VideoPlayer._setupAspectRatio ---`, `xoff: ${xoff}, yoff: ${yoff}`);

    const txform = new android.graphics.Matrix();
    this.CLog(`VideoPlayer._setupAspectRatio ---`, `txform: ${txform}, txform: ${txform}`);

    this.nativeView.getTransform(txform);
    txform.setScale(newWidth / viewWidth, newHeight / viewHeight);
    txform.postTranslate(xoff, yoff);
    this.nativeView.setTransform(txform);
  }

  private _resetAspectRatio() {
    const viewWidth = this.nativeView.getWidth();
    const viewHeight = this.nativeView.getHeight();
    const aspectRatio = this.videoWidth / this.videoHeight;

    let newWidth;
    let newHeight;

    newHeight = viewHeight;
    newWidth = viewHeight * aspectRatio;

    const xoff = (viewWidth - newWidth) / 2;
    const yoff = (viewHeight - newHeight) / 2;

    const txform = new android.graphics.Matrix();
    txform.setScale(newWidth / viewWidth, newHeight / viewHeight);
    txform.postTranslate(xoff, yoff);
    this.nativeView.setTransform(txform);
  }

  private _openVideo(): void {
    if (this._src === null || this.textureSurface === null || (this._src !== null && typeof this._src === 'string' && this._src.length === 0)) {
      // we have to protect In case something else calls this before we are ready
      // the Surface event will then call this when we are ready...
      return;
    }
    this.CLog(`VideoPlayer._openVideo`);

    // clear any old stuff
    this.release();

    const am = Utils.android.getApplicationContext().getSystemService(android.content.Context.AUDIO_SERVICE);
    am.requestAudioFocus(null, android.media.AudioManager.STREAM_MUSIC, android.media.AudioManager.AUDIOFOCUS_GAIN);

    try {
      this.player = new android.media.MediaPlayer();
      this.CLog(`VideoPlayer._openVideo ---`, `this.player: ${this.player}`);

      if (this.audioSession !== null) {
        this.CLog(`VideoPlayer._openVideo ---`, `setting audio session Id: ${this.audioSession}`);
        this.player.setAudioSessionId(this.audioSession);
      } else {
        this.audioSession = this.player.getAudioSessionId();
      }

      this.CLog(`VideoPlayer._openVideo --- `, `setting up MediaPlayerListeners`);
      this._setupMediaPlayerListeners();

      this.player.setSurface(this.textureSurface);
      this.player.setAudioStreamType(android.media.AudioManager.STREAM_MUSIC);
      this.player.setDataSource(this._src);
      this.player.setScreenOnWhilePlaying(true);

      this.player.setOnErrorListener(
        new android.media.MediaPlayer.OnErrorListener({
          onError: (mp, what, extra) => {
            let message = '';
            switch (what) {
              case android.media.MediaPlayer.MEDIA_ERROR_UNKNOWN:
                message = 'Unable to play media';
                break;
              case android.media.MediaPlayer.MEDIA_ERROR_SERVER_DIED:
                message = 'Server failed';
                break;
              case android.media.MediaPlayer.MEDIA_ERROR_NOT_VALID_FOR_PROGRESSIVE_PLAYBACK:
                message = 'Invalid media';
                break;
              case android.media.MediaPlayer.MEDIA_ERROR_UNSUPPORTED:
                message = 'Media not supported';
                break;
              default:
                message = 'Unknown error';
            }
            this._owner.get()._emit(VideoBase.errorEvent, {
              error: { message: message + '  what:' + what + ' extra:' + extra },
            });
            return true;
          },
        })
      );
      this._setupMediaController();
      this.player.prepareAsync();
    } catch (ex) {
      this.CLog(`VideoPlayer._openVideo --- error: ${ex}, stack: ${ex.stack}`);
      this._owner.get()._emit(VideoBase.errorEvent, { error: ex, stack: ex.stack });
    }
  }

  private _setNativeVideo(nativeVideo: any): void {
    this.CLog(`VideoPlayer._setNativeVideo`);
    this._src = nativeVideo;
    this._openVideo();
  }

  private _addPlaybackTimeObserver() {
    this.CLog(`VideoPlayer._addPlaybackTimeObserver`);
    this._playbackTimeObserverActive = true;
    this._playbackTimeObserver = Utils.setInterval(() => {
      if (this.player.isPlaying) {
        const _milliseconds = this.player.getCurrentPosition();
        this._emit(VideoBase.currentTimeUpdatedEvent, { position: _milliseconds });
      }
    }, 500);
  }

  private _removePlaybackTimeObserver() {
    this.CLog(`VideoPlayer._removePlaybackTimeObserver`);
    if (this._playbackTimeObserverActive) {
      // one last emit of the most up-to-date time index
      if (this.player !== null) {
        const _milliseconds = this.player.getCurrentPosition();
        this.CLog('VideoPlayer._removePlaybackTimeObserver', 'emitting currentTimeUpdatedEvent');
        this._emit(VideoBase.currentTimeUpdatedEvent, {
          position: _milliseconds,
        });
      }

      Utils.clearInterval(this._playbackTimeObserver);
      this._playbackTimeObserverActive = false;
    }
  }
}
