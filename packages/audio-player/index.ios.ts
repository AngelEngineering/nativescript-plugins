/* eslint-disable @typescript-eslint/no-this-alias */
import { knownFolders, Observable, path as nsFilePath, Utils, File } from '@nativescript/core';
import { IAudioPlayer, resolveAudioFilePath } from './common';
import { AudioPlayerOptions } from './options';

declare const AVAudioPlayer;

@NativeClass()
class NSPlayerDelegate extends NSObject implements AVAudioPlayerDelegate {
  static ObjCProtocols = [AVAudioPlayerDelegate];
  private _owner: WeakRef<AudioPlayer>;

  static initWithOwner(owner: AudioPlayer) {
    const delegate = <NSPlayerDelegate>NSPlayerDelegate.new();
    delegate._owner = new WeakRef(owner);
    return delegate;
  }

  audioPlayerDidFinishPlayingSuccessfully(player?: any, flag?: boolean) {
    const owner = this._owner.get();
    if (owner) {
      owner._sendEvent(AudioPlayer.completeEvent);
      if (flag && owner.completeCallback) {
        owner.completeCallback({ player, flag });
        if (owner._resolve) owner._resolve(true);
      } else if (!flag && owner.errorCallback) {
        owner.errorCallback({ player, flag });
        if (owner._reject) owner._reject(flag);
      }
      owner._reject = owner._resolve = null;
    }
  }

  audioPlayerDecodeErrorDidOccurError(player: any, error: NSError) {
    const owner = this._owner.get();
    if (owner) {
      owner._sendEvent(AudioPlayer.errorEvent, error);
      if (owner.errorCallback) {
        owner.errorCallback({ player, error });
      }
      if (owner._reject) owner._reject(error);
      owner._reject = owner._resolve = null;
    }
  }
}

export { NSPlayerDelegate };

export class AudioFocusManager extends Observable {}

export class AudioPlayer extends Observable implements IAudioPlayer {
  completeCallback: any;
  errorCallback: any;
  infoCallback: any;

  private _player: AVAudioPlayer;
  private _task: NSURLSessionDataTask;
  private _data: NSData;
  private delegate: NSPlayerDelegate;
  private _options: AudioPlayerOptions;
  private _readyToPlay = false;
  _resolve = null;
  _reject = null;

  get ios(): AVAudioPlayer {
    return this._player;
  }
  /**
   * Returns volume with values ranging from 0.0 for silence to 1.0 for full volume.
   */
  get volume(): number {
    return this._player ? this._player.volume : 0;
  }

  /**
   * Sets volume with values ranging from 0.0 for silence to 1.0 for full volume.
   */
  set volume(value: number) {
    if (this._player && value >= 0) {
      this._player.volume = value;
    }
  }

  get ready(): boolean {
    return this._readyToPlay;
  }

  /**
  iOS returns the total duration, in seconds, of the player’s audio, which is converted to ms to match Android
  * @property duration
  */
  public get duration() {
    if (this._player) {
      return this._player.duration * 1000;
    } else {
      return 0;
    }
  }

  /**
   * iOS returns the current playback time, in seconds, within the audio timeline, which is converted to ms to match Android
   * @property currentTime
   */
  get currentTime(): number {
    return this._player ? this._player.currentTime * 1000 : 0;
  }

  /**
   * Android-only
   */
  public setAudioFocusManager(manager: any): void {
    //not currently supported on iOS
    return;
  }

  /**
   * This function will prepare the iOS audio player for playback using the specified AudioPlayerOptions.
   * If the audio file name specified is a remote URL, it will attempt ot download the file and cache it future playback.
   * @method prepareAudio
   * @param options AudioPlayerOptions.
   * @returns Promise that resolves as true once prepared successfully, or false if there was an error.
   */
  public prepareAudio(options: AudioPlayerOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this._options = options;
        const audioPath = resolveAudioFilePath(options.audioFile);
        const that = this;
        /**
         * Handler function once we have a file ready to load into the iOS audio player
         */
        const handleFileReady = function () {
          try {
            let fileName = Utils.isString(options.audioFile) ? options.audioFile.trim() : '';
            if (fileName.indexOf('~/') === 0) {
              fileName = nsFilePath.join(knownFolders.currentApp().path, fileName.replace('~/', ''));
            }

            that.completeCallback = options.completeCallback;
            that.errorCallback = options.errorCallback;
            that.infoCallback = options.infoCallback;

            const audioSession = AVAudioSession.sharedInstance();
            if (options.audioMixing) {
              audioSession.setCategoryWithOptionsError(
                AVAudioSessionCategoryPlayAndRecord, //use this mode to ignore the mute toggle on an ios device
                //otherwise use AVAudioSessionCategoryAmbient if you want to respect it
                AVAudioSessionCategoryOptions.MixWithOthers |
                  AVAudioSessionCategoryOptions.AllowBluetoothA2DP | //this is only for high-quality audio playback, can't record
                  AVAudioSessionCategoryOptions.AllowAirPlay |
                  AVAudioSessionCategoryOptions.DefaultToSpeaker
              );
            } else {
              audioSession.setCategoryWithOptionsError(
                AVAudioSessionCategoryPlayAndRecord, //use this mode to ignore the mute toggle on an ios device
                AVAudioSessionCategoryOptions.DuckOthers |
                  AVAudioSessionCategoryOptions.AllowBluetoothA2DP | //this is only for high-quality audio playback, can't record
                  AVAudioSessionCategoryOptions.AllowAirPlay |
                  AVAudioSessionCategoryOptions.DefaultToSpeaker
              );
            }

            const output = audioSession.currentRoute.outputs.lastObject.portType;
            if (output.match(/Receiver/)) {
              try {
                audioSession.setCategoryError(AVAudioSessionCategoryPlayAndRecord);
                audioSession.overrideOutputAudioPortError(AVAudioSessionPortOverride.Speaker);
                audioSession.setActiveError(true);
              } catch (err) {
                console.error('setting audioSession catergory failed', err);
              }
            }

            const errorRef = new interop.Reference();
            that._player = AVAudioPlayer.alloc().initWithContentsOfURLError(NSURL.fileURLWithPath(fileName), errorRef);
            if (errorRef && errorRef.value) {
              that._readyToPlay = false;
              reject(errorRef.value);
              return;
            } else if (that._player) {
              if (that.delegate === undefined) that.delegate = NSPlayerDelegate.initWithOwner(that);
              that._player.delegate = that.delegate;
              // enableRate to allow change of playback speed
              that._player.enableRate = true;

              if (options.loop) {
                that._player.numberOfLoops = -1;
              }

              that._readyToPlay = true; //audio player is ready to play the file
              resolve(true);
            } else {
              reject(false);
            }
          } catch (ex) {
            if (that.errorCallback) {
              that.errorCallback({ ex });
            }
            that._readyToPlay = false;
            reject(ex);
          }
        };
        if (Utils.isFileOrResourcePath(audioPath)) {
          //if it's a local file, prepare should be almost instant
          if (!File.exists(audioPath)) {
            console.error("Audio file doesn't exist on device file system");
            reject('File not found! ' + audioPath);
            return;
          }
          handleFileReady();
        } else {
          //check if we've already downloaded the file from this url and use that if so
          let cachefilename: string = audioPath.replaceAll('://', '_').replaceAll('.', '_').replaceAll('/', '-');
          cachefilename =
            knownFolders.temp().path + '/' + cachefilename.substring(0, cachefilename.lastIndexOf('_')) + '.' + cachefilename.substring(cachefilename.lastIndexOf('_') + 1, cachefilename.length);
          console.log('remote url used for playback', audioPath);
          console.log('downloading to local file if not cached already', cachefilename);
          const localFile = File.fromPath(cachefilename);
          if (File.exists(cachefilename) && localFile.size > 100) {
            console.log('found a cached file, using that to prepare audio player');
            this._options.audioFile = cachefilename;

            handleFileReady();
          } else {
            //otherwise for a url, need to wait for urlsession to load and return the file
            try {
              this._task = NSURLSession.sharedSession.dataTaskWithURLCompletionHandler(NSURL.URLWithString(options.audioFile), (data, response, error) => {
                if (error !== null) {
                  if (this.errorCallback) {
                    this.errorCallback({ error });
                  }
                  this._readyToPlay = false;
                  reject(false);
                  return false;
                }
                this._data = data;
                const f = File.fromPath(cachefilename);
                f.writeSync(NSData.dataWithData(data), (e: any) => {
                  console.error('Failed to write data: ' + e.toString());
                  reject('Failed to write data during download: ' + e.toString());
                });
                console.log('finished downloading file from url', f.path, f.size);
                const cacheFile = File.fromPath(cachefilename);
                if (cacheFile.size < 100) {
                  console.error('Downloaded file too small, failed?', cacheFile.size);
                  reject('Remote url file invalid! ' + audioPath);
                  return;
                }

                this._options.audioFile = cachefilename;
                handleFileReady();
              });

              this._task.resume();
            } catch (ex) {
              console.error(ex);
              if (this.errorCallback) {
                this.errorCallback({ ex });
              }
              reject(ex);
            }
          }
        }
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * Pauses the currently playing audio file.
   * @method pause
   * @returns Promise that resolves as true once pause is complete, or false if there was an error during pause.
   */
  public pause(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        if (this._player && this._player.playing) {
          this._player.pause();
          this._sendEvent(AudioPlayer.pausedEvent);
        }
        resolve(true);
      } catch (ex) {
        if (this.errorCallback) {
          this._sendEvent(AudioPlayer.errorEvent, ex);
          this.errorCallback({ ex });
        }
        reject(ex);
      }
    });
  }

  /**
   * Play current audio file that has been prepared by calling prepareAudio(options).
   * @method play
   * @returns Promise that resolves as true once playback is complete, or false if there was an error during playback.
   */
  public play(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        if (!this.ready) {
          reject('Audio source not ready, call prepareAudio(options) first!');
          return false;
        }
        if (!this.isAudioPlaying()) {
          this._player.play();
          this._sendEvent(AudioPlayer.startedEvent);
          this._resolve = resolve;
          this._reject = reject;
        }
      } catch (ex) {
        this._sendEvent(AudioPlayer.errorEvent, ex);
        if (this.errorCallback) {
          this.errorCallback({ ex });
        }
        reject(ex);
      }
    });
  }

  /**
   * Resume audio player playback.
   * @method resume
   */
  public resume(): void {
    if (this._player) {
      this._player.play();
      this._sendEvent(AudioPlayer.startedEvent);
    }
  }

  /**
   * Plays audio asynchronously, starting at a specified point in the audio output device’s timeline.
   * iOS expects this in seconds so we convert time param from ms first.
   * @param time [number] - The time to start playing the audio track at, in milliseconds
   */
  public playAtTime(time: number): void {
    if (this._player) {
      this._player.playAtTime(time / 1000);
      this._sendEvent(AudioPlayer.startedEvent);
    }
  }

  /**
   * for iOS, currentTime either gets the current playback time, in seconds, within the audio timeline if playing,
   *    or if not playing, sets playback at the specified time before next play() call
   *  Convert from ms before sending to AVAudioPlayer
   * * @method seekTo
   * @returns Promise that resolves as true once seek is complete, or false if there was an error during seek.
   */
  public seekTo(time: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        if (this._player) {
          this._player.currentTime = time / 1000;
          this._sendEvent(AudioPlayer.seekEvent);
        }
        resolve(true);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  /**
   * Releases resources from the audio player.
   * @method dispose
   * @returns Promise that resolves as true once disposal is complete, or false if there was an error during disposal.
   */
  public dispose(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        if (this._player && this.isAudioPlaying()) {
          this._player.stop();
        }
        const audioSession = AVAudioSession.sharedInstance();
        audioSession.setActiveError(false);
        this._reset();
        resolve(true);
      } catch (ex) {
        if (this.errorCallback) {
          this.errorCallback({ ex });
        }
        reject(ex);
      }
    });
  }

  /**
   * Check if the audio is actively playing.
   * @method isAudioPlaying
   * @returns true if audio is playing, false if not.
   */
  public isAudioPlaying(): boolean {
    return this._player ? this._player.playing : false;
  }

  /**
   * Get the duration of the audio file prepared in player, in ms.
   * @method getAudioTrackDuration
   * @returns Promise that resolves the duration in ms, or 0 if there was an error when reading duration from native player.
   */
  public getAudioTrackDuration(): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
        const duration = this._player ? this._player.duration * 1000 : 0;
        resolve(duration);
      } catch (ex) {
        if (this.errorCallback) {
          this.errorCallback({ ex });
        }
        reject(ex);
      }
    });
  }

  /**
   * Sets the player playback speed rate. On Android this works on API 23+.
   * @param speed [number] - The speed of the playback.
   * speed should be a float from 0.0 - X.X, and is a scale factor
   */
  public changePlayerSpeed(speed): void {
    if (this._player && speed) {
      // make sure speed is a number/float
      if (typeof speed === 'string') {
        speed = parseFloat(speed);
      }
      if (isNaN(speed)) {
        console.error('speed was not parsable as a number!');
        return;
      }
      this._player.rate = speed;
    }
  }

  private _reset() {
    if (this._player) {
      this._player = undefined;
    }
    if (this.delegate) {
      this.delegate = undefined;
    }
    if (this._task) {
      this._task.cancel();
      this._task = undefined;
    }
  }

  /**
   * Events
   */

  /**
   * Notify events by name and optionally pass data
   */
  public _sendEvent(eventName: string, data?: any) {
    this.notify(<any>{
      eventName,
      object: this,
      data: data,
    });
  }
  public static seekEvent = 'seekEvent';
  public static pausedEvent = 'pausedEvent';
  public static startedEvent = 'startedEvent';
  public static completeEvent = 'completeEvent';
  public static errorEvent = 'errorEvent'; //will pass the error object
}

/**
 * Utility to find the duration in milliseconds of the mp4 file at `mp4Path`
 * @param mp4Path
 */
export function getDuration(mp4Path: string): number {
  let totalTime = 0;
  const filePath = NSURL.fileURLWithPath(mp4Path);
  const avAsset = AVURLAsset.assetWithURL(filePath);
  totalTime = CMTimeGetSeconds(avAsset.duration) * 1000;
  return totalTime;
}
