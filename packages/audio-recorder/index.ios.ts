import { Observable, File } from '@nativescript/core';
import { IAudioRecorder } from './common';
import { AudioRecorderOptions } from './options';

declare const kAudioFormatAppleLossless, kAudioFormatMPEG4AAC;

@NativeClass()
class TNSRecorderDelegate extends NSObject implements AVAudioRecorderDelegate {
  static ObjCProtocols = [AVAudioRecorderDelegate];
  private _owner: WeakRef<AudioRecorder>;
  private _resolve;
  private _reject;
  static initWithOwner(owner: AudioRecorder, resolve, reject) {
    const delegate = <TNSRecorderDelegate>TNSRecorderDelegate.new();
    delegate._owner = new WeakRef(owner);
    delegate._resolve = resolve;
    delegate._reject = reject;
    return delegate;
  }

  audioRecorderDidFinishRecording(recorder: any, success: boolean) {
    const owner = this._owner.get();
    if (owner) {
      owner.notify({
        eventName: 'RecorderFinished',
      });
    }
    this._reject('Failed to record audio file!');
  }

  async audioRecorderDidFinishRecordingSuccessfully(recorder: AVAudioRecorder, flag) {
    const owner = this._owner.get();
    const file = File.fromPath(owner._recorderOptions.filename);
    if (owner) {
      owner.notify({
        eventName: 'RecorderFinishedSuccessfully',
      });
    }
    return this._resolve(file);
  }
}

export { TNSRecorderDelegate };

export class AudioRecorder extends Observable implements IAudioRecorder {
  private _recorder: AVAudioRecorder;
  private _recordingSession: any;
  private _delegate: any;
  public _recorderOptions: AudioRecorderOptions;

  protected getDelegate(resolve, reject): any {
    if (!this._delegate) {
      this._delegate = TNSRecorderDelegate.initWithOwner(this, resolve, reject);
    }
    return this._delegate;
  }

  get ios() {
    return this._recorder;
  }

  requestRecordPermission() {
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

  record(options: AudioRecorderOptions): Promise<any> {
    this._recorderOptions = options;
    return new Promise((resolve, reject) => {
      //starting a new recording
      try {
        this._recordingSession = AVAudioSession.sharedInstance();
        let errorRef = new interop.Reference();
        this._recordingSession.setCategoryError(AVAudioSessionCategoryPlayAndRecord, errorRef);
        if (errorRef) {
          console.error(`setCategoryError: ${errorRef.value}, ${errorRef}`);
        }

        this._recordingSession.setActiveError(true, null);
        this._recordingSession.requestRecordPermission((allowed: boolean) => {
          if (allowed) {
            const recordSetting = NSMutableDictionary.alloc().init();
            let format = kAudioFormatMPEG4AAC;
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

            let channels = options.channels ? options.channels : 1;
            recordSetting.setValueForKey(NSNumber.numberWithInt(channels), 'AVNumberOfChannelsKey');

            AVAudioSession.sharedInstance().setCategoryWithOptionsError(
              AVAudioSessionCategoryPlayAndRecord,
              // AVAudioSessionCategoryOptions.AllowBluetoothA2DP | //this is only for high-quality audio playback, can't record
              AVAudioSessionCategoryOptions.AllowBluetooth | //this allows playback and recording
                AVAudioSessionCategoryOptions.AllowAirPlay |
                AVAudioSessionCategoryOptions.DefaultToSpeaker
            );
            let inputs = AVAudioSession.sharedInstance().availableInputs;
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
              resolve(null);
            }
          }
        });
      } catch (ex) {
        reject(ex);
      }
    });
  }

  stop(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._delegate._resolve = resolve;
          this._delegate._reject = reject;
          this._recorder.stop();
        } else {
          console.error('No native recorder instance, was this cleared by mistake!?');
          return reject('No native recorder instance, was this cleared by mistake!?');
        }
        // may need this in future
        this._recordingSession.setActiveError(false, null);
        this._recorder.meteringEnabled = false;
      } catch (ex) {
        reject(ex);
      }
    });
  }

  dispose(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.stop();
          this._recorder.meteringEnabled = false;
          this._recordingSession.setActiveError(false, null);
          this._recorder = undefined;
          this._delegate = null;
        } else return reject('No native recorder instance, was this cleared by mistake!?');
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  isRecording() {
    return this._recorder && this._recorder.recording;
  }

  getMeters(channel?: number) {
    if (this._recorder) {
      if (!this._recorder.meteringEnabled) {
        this._recorder.meteringEnabled = true;
      }
      this._recorder.updateMeters();
      return this._recorder.averagePowerForChannel(channel);
    }
  }

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
        let suc = NSFileManager.defaultManager.copyItemAtPathToPathError(audioFiles[0], outputPath);
        if (!suc) {
          console.error('Unable to copy file!');
          return reject('Unable to copy file!');
        }
        return resolve(File.fromPath(outputPath));
      }
      let composition = AVMutableComposition.new();
      for (let i = 0; i < audioFiles.length; i++) {
        let compositionAudioTrack: AVMutableCompositionTrack = composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeAudio, 0);
        let asset = AVURLAsset.assetWithURL(NSURL.fileURLWithPath(audioFiles[i]));
        let track = asset.tracksWithMediaType(AVMediaTypeAudio)[0];
        let timeRange = CMTimeRangeMake(CMTimeMake(0, 600), track.timeRange.duration);
        compositionAudioTrack.insertTimeRangeOfTrackAtTimeError(timeRange, track, composition.duration);
      }
      let mergeAudioUrl = NSURL.fileURLWithPath(outputPath);
      let assetExport = new AVAssetExportSession({ asset: composition, presetName: AVAssetExportPresetAppleM4A });
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
}
