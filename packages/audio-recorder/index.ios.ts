import { Observable, File, EventData } from '@nativescript/core';
import { IAudioRecorder } from './common';
import { AudioRecorderOptions } from './options';

declare const kAudioFormatAppleLossless, kAudioFormatMPEG4AAC;

@NativeClass()
class NSRecorderDelegate extends NSObject implements AVAudioRecorderDelegate {
  static ObjCProtocols = [AVAudioRecorderDelegate];
  private _owner: WeakRef<AudioRecorder>;
  public _resolve;
  public _reject;

  static initWithOwner(owner: AudioRecorder, resolve, reject) {
    const delegate = <NSRecorderDelegate>NSRecorderDelegate.new();
    delegate._owner = new WeakRef(owner);
    delegate._resolve = resolve;
    delegate._reject = reject;
    return delegate;
  }

  //this means an error happened and we don't have a recording
  audioRecorderDidFinishRecording(recorder: any, success: boolean) {
    const owner = this._owner.get();
    if (owner) {
      owner._sendEvent(AudioRecorder.errorEvent, 'Failed to record audio file!');
    }
    this._reject('Failed to record audio file!');
  }

  //recording completed successfully and we have an audio file
  async audioRecorderDidFinishRecordingSuccessfully(recorder: AVAudioRecorder, flag) {
    const owner = this._owner.get();
    const file = File.fromPath(owner._recorderOptions.filename);
    if (owner) {
      owner._sendEvent(AudioRecorder.completeEvent, file);
    }
    return this._resolve(file);
  }
}

export { NSRecorderDelegate };

export class AudioRecorder extends Observable implements IAudioRecorder {
  private _recorder: AVAudioRecorder;
  private _recordingSession: AVAudioSession;
  private _delegate: NSRecorderDelegate;
  public _recorderOptions: AudioRecorderOptions;

  protected getDelegate(resolve, reject): NSRecorderDelegate {
    if (!this._delegate) {
      this._delegate = NSRecorderDelegate.initWithOwner(this, resolve, reject);
    }
    return this._delegate;
  }

  get ios(): AVAudioRecorder {
    return this._recorder;
  }

  requestRecordPermission(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._recordingSession.requestRecordPermission((allowed: boolean) => {
        if (allowed) {
          resolve(true);
        } else {
          reject('Record permissions denied');
        }
      });
    });
  }

  /**
   * Starts the native audio recording control.
   * @method record
   * @param options AudioRecorderOptions to use when recording audio
   * @returns Promise that resolves once recording is complete, or rejects if fails
   */
  record(options: AudioRecorderOptions): Promise<void> {
    this._recorderOptions = options;
    return new Promise((resolve, reject) => {
      //starting a new recording
      try {
        this._recordingSession = AVAudioSession.sharedInstance();
        let errorRef = new interop.Reference();

        this._recordingSession.setActiveError(true);
        this._recordingSession.requestRecordPermission((allowed: boolean) => {
          if (allowed) {
            const recordSetting = NSMutableDictionary.alloc().init();
            const format = kAudioFormatMPEG4AAC;
            recordSetting.setValueForKey(NSNumber.numberWithInt(format), 'AVFormatIDKey');

            let avAudioQualityValue = AVAudioQuality.Medium;
            if (options.iosAudioQuality) {
              if (options.iosAudioQuality == 'Min') {
                avAudioQualityValue = AVAudioQuality.Min;
              } else if (options.iosAudioQuality == 'Low') {
                avAudioQualityValue = AVAudioQuality.Low;
              } else if (options.iosAudioQuality == 'Medium') {
                avAudioQualityValue = AVAudioQuality.Medium;
              } else if (options.iosAudioQuality == 'High') {
                avAudioQualityValue = AVAudioQuality.High;
              } else if (options.iosAudioQuality == 'Max') {
                avAudioQualityValue = AVAudioQuality.Max;
              }
            }
            recordSetting.setValueForKey(NSNumber.numberWithInt(avAudioQualityValue), 'AVEncoderAudioQualityKey');
            let sampleRate = 44100.0;
            if (options.sampleRate) sampleRate = parseFloat(parseInt(options.sampleRate).toFixed(1));
            recordSetting.setValueForKey(NSNumber.numberWithFloat(sampleRate), 'AVSampleRateKey');

            const channels = options.channels ? options.channels : 1;
            recordSetting.setValueForKey(NSNumber.numberWithInt(channels), 'AVNumberOfChannelsKey');

            AVAudioSession.sharedInstance().setCategoryWithOptionsError(
              AVAudioSessionCategoryPlayAndRecord,
              // AVAudioSessionCategoryOptions.AllowBluetoothA2DP | //this is only for high-quality audio playback, can't record
              AVAudioSessionCategoryOptions.AllowBluetooth | //this allows playback and recording
                AVAudioSessionCategoryOptions.AllowAirPlay |
                AVAudioSessionCategoryOptions.DefaultToSpeaker
            );
            const inputs = AVAudioSession.sharedInstance().availableInputs;
            if (inputs.count > 1) {
              let bluetooth = null,
                headset = null,
                wired = null,
                builtin = null;
              //if we have multiple inputs, try to select a connected bluetooth or airpod device first
              //otherwise a headset and finally the device mic
              for (let i = 0; i < inputs.count; i++) {
                if (inputs.objectAtIndex(i).portType.includes('Bluetooth')) bluetooth = i;
                else if (inputs.objectAtIndex(i).portType.includes('BuiltIn')) builtin = i;
                else if (inputs.objectAtIndex(i).portType.includes('Headset')) headset = i;
                else if (inputs.objectAtIndex(i).portType.includes('Wired')) wired = i;
              }
              AVAudioSession.sharedInstance().setPreferredInputError(inputs.objectAtIndex(bluetooth || wired || headset || builtin || 0));
            } else if (inputs.count == 1) AVAudioSession.sharedInstance().setPreferredInputError(inputs.objectAtIndex(0));
            else console.warn('AVAudioSession unable to find available microphone!');
            errorRef = new interop.Reference();

            const url = NSURL.fileURLWithPath(options.filename);
            this._recorder = (<any>AVAudioRecorder.alloc()).initWithURLSettingsError(url, recordSetting, errorRef);
            if (errorRef && errorRef.value) {
              console.error(`initWithURLSettingsError errorRef: ${errorRef.value}, ${errorRef}`);
              reject('failed to initialize AVAudioRecorder');
            } else {
              this._recorder.delegate = this.getDelegate(resolve, reject);
              if (options.metering) {
                this._recorder.meteringEnabled = true;
              }
              if (options.maxDuration) {
                this._recorder.recordForDuration(options.maxDuration / 1000);
              } else {
                this._recorder.prepareToRecord(); //creates audio file and readies recorder
                this._recorder.record();
                console.log('recorder', this._recorder);
              }
              this._sendEvent(AudioRecorder.startedEvent);
              resolve(null);
            }
          }
        });
      } catch (ex) {
        this._sendEvent(AudioRecorder.errorEvent, ex);
        reject(ex);
      }
    });
  }

  /**
   * Stops the native audio recording control.
   * @method stop
   * @returns Promise that resolves once recording is complete and file has been written, or rejects if fails
   */
  stop(): Promise<File> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._delegate._resolve = resolve;
          this._delegate._reject = reject;
          this._recorder.stop();
          this._sendEvent(AudioRecorder.stoppedEvent);
        } else {
          console.error('No native recorder instance, was this cleared by mistake!?');
          return reject('No native recorder instance, was this cleared by mistake!?');
        }
        // may need this in future
        this._recordingSession.setActiveError(false);
        this._recorder.meteringEnabled = false;
      } catch (ex) {
        reject(ex);
        this._sendEvent(AudioRecorder.errorEvent, ex);
      }
    });
  }

  /**
   * Releases resources from the recorder.
   * @method dispose
   * @returns Promise that resolves once recorder has been released and disposed, or rejects if fails
   */
  dispose(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.stop();
          this._recorder.meteringEnabled = false;
          this._recordingSession.setActiveError(false);
          this._recorder = undefined;
          this._delegate = null;
        } else return reject('No native recorder instance, was this cleared by mistake!?');
        resolve(null);
      } catch (ex) {
        this._sendEvent(AudioRecorder.errorEvent, ex);
        reject(ex);
      }
    });
  }

  /**
   * Returns true if the audio recorder is currently recording, false if not
   * @method isRecording
   */
  isRecording(): boolean {
    return this._recorder && this._recorder.recording;
  }

  /**
   *@function getMeters()
   * @returns Returns the average power, in decibels full-scale (dBFS), for an audio channel.
   * Before asking the player for its average power value, you must call updateMeters() to generate the latest data. The returned value ranges from –160 dBFS, indicating minimum power, to 0 dBFS, indicating maximum power.
   * https://developer.apple.com/documentation/avfaudio/avaudiorecorder/1387176-averagepower
   */
  getMeters(channel?: number) {
    if (this._recorder) {
      if (!this._recorder.meteringEnabled) {
        this._recorder.meteringEnabled = true;
      }
      this._recorder.updateMeters();
      return this._recorder.averagePowerForChannel(channel);
    }
  }

  /**
   * Merges the mp4 files specified by audioFileUrls (array of file paths) into an mp4 audio file
   *      at the outputPath.
   * NOTE: inputs must all be AAC encoded MP4 audio files!
   * @method mergeAudioFiles
   * @param audioFileUrls
   * @param outputPath
   **/
  public mergeAudioFiles(audioFiles: string[], outputPath: string): Promise<File> {
    return new Promise((resolve, reject) => {
      if (!audioFiles || audioFiles.length <= 0) return reject('audioFiles is empty!');
      if (!outputPath) return reject('outputPath should be a valid path string');

      if (File.exists(outputPath)) {
        // remove file if it exists
        File.fromPath(outputPath).removeSync(err => {
          console.error('Unable to remove existing file!', err);
          return reject('Unable to remove existing file!' + err.message);
        });
      }
      if (audioFiles.length == 1) {
        const suc = NSFileManager.defaultManager.copyItemAtPathToPathError(audioFiles[0], outputPath);
        if (!suc) {
          console.error('Unable to copy file!');
          return reject('Unable to copy file!');
        }
        return resolve(File.fromPath(outputPath));
      }
      const composition = AVMutableComposition.new();
      for (let i = 0; i < audioFiles.length; i++) {
        const compositionAudioTrack: AVMutableCompositionTrack = composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeAudio, 0);
        const asset = AVURLAsset.assetWithURL(NSURL.fileURLWithPath(audioFiles[i]));
        const track = asset.tracksWithMediaType(AVMediaTypeAudio)[0];
        const timeRange = CMTimeRangeMake(CMTimeMake(0, 600), track.timeRange.duration);
        compositionAudioTrack.insertTimeRangeOfTrackAtTimeError(timeRange, track, composition.duration);
      }
      const mergeAudioUrl = NSURL.fileURLWithPath(outputPath);
      const assetExport = new AVAssetExportSession({ asset: composition, presetName: AVAssetExportPresetAppleM4A });
      assetExport.outputFileType = AVFileTypeAppleM4A;
      assetExport.outputURL = mergeAudioUrl;
      assetExport.exportAsynchronouslyWithCompletionHandler(() => {
        switch (assetExport.status) {
          case AVAssetExportSessionStatus.Failed:
            // console.log('failed (assetExport?.error)', assetExport.error);
            reject(assetExport.error);
            break;
          case AVAssetExportSessionStatus.Cancelled:
            // console.log('cancelled (assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Unknown:
            // console.log('unknown(assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Waiting:
            // console.log('waiting(assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Exporting:
            // console.log('exporting(assetExport?.error)');
            break;
          case AVAssetExportSessionStatus.Completed:
            // console.log('Audio Concatenation Complete');
            resolve(File.fromPath(outputPath));
            break;
        }
      });
    });
  }

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
export function getDuration(mp4Path: string): number {
  let totalTime = 0;
  const filePath = NSURL.fileURLWithPath(mp4Path);
  const avAsset = AVURLAsset.assetWithURL(filePath);
  totalTime = CMTimeGetSeconds(avAsset.duration) * 1000;
  return totalTime;
}
