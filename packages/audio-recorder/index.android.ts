/* eslint-disable no-async-promise-executor */
import { Application, Observable } from '@nativescript/core';
import { IAudioRecorder } from './common';
import { AudioRecorderOptions } from './options';

export class AudioRecorder extends Observable implements IAudioRecorder {
  private _recorder: any;

  get android() {
    return this._recorder;
  }

  public static CAN_RECORD(): boolean {
    //this only checks if device has a microphone present
    const pManager = Application.android.context.getPackageManager();
    const canRecord = pManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_MICROPHONE);
    if (canRecord) {
      return true;
    } else {
      return false;
    }
  }

  public record(options: AudioRecorderOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        if (this._recorder) {
          // reset for reuse
          this._recorder.reset();
          console.log('reset Android recorder instance');
        } else {
          this._recorder = new android.media.MediaRecorder();
          console.log('initializing Android recorder instance');
        }

        const audioSource = options.source ? options.source : android.media.MediaRecorder.AudioSource.DEFAULT; // https://developer.android.com/reference/android/media/MediaRecorder.AudioSource
        // const audioSource = android.media.MediaRecorder.AudioSource.MIC; // https://developer.android.com/reference/android/media/MediaRecorder.AudioSource
        // this._recorder.setAudioSource(android.media.MediaRecorder.AudioSource.MIC);
        console.log('setting audio Source to ', audioSource);
        // console.log('android.media.MediaRecorder.AudioSource.MIC ', android.media.MediaRecorder.AudioSource.MIC);
        this._recorder.setAudioSource(audioSource);

        const outFormat = options.format ? options.format : android.media.AudioFormat.ENCODING_PCM_16BIT; // https://developer.android.com/reference/android/media/AudioFormat#ENCODING_PCM_16BIT
        this._recorder.setOutputFormat(outFormat);

        const encoder = options.encoder ? options.encoder : android.media.MediaRecorder.AudioEncoder.AAC; // https://developer.android.com/reference/android/media/MediaRecorder.AudioEncoder#AAC
        this._recorder.setAudioEncoder(encoder);

        if (options.channels) {
          this._recorder.setAudioChannels(options.channels);
        }

        let sampleRate = options.sampleRate ? options.sampleRate : 44100;
        this._recorder.setAudioSamplingRate(sampleRate);

        let bitRate = options.bitRate ? options.bitRate : 128000;
        this._recorder.setAudioEncodingBitRate(bitRate);

        if (options.maxDuration) {
          this._recorder.setMaxDuration(options.maxDuration);
        }

        this._recorder.setOutputFile(options.filename);

        // On Error
        this._recorder.setOnErrorListener(
          new android.media.MediaRecorder.OnErrorListener({
            onError: (recorder: any, error: number, extra: number) => {
              options.errorCallback({ recorder, error, extra });
            },
          })
        );

        // On Info
        this._recorder.setOnInfoListener(
          new android.media.MediaRecorder.OnInfoListener({
            onInfo: (recorder: any, info: number, extra: number) => {
              options.infoCallback({ recorder, info, extra });
            },
          })
        );

        this._recorder.prepare();
        this._recorder.start();

        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public getMeters(): number {
    if (this._recorder != null) return this._recorder.getMaxAmplitude();
    else return 0;
  }

  public pause(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.pause();
        }
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public resume(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.resume();
        }
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public stop(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.stop();
        }
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public dispose(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.release();
        }
        this._recorder = undefined;
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }
}

// export class AudioRecorder extends AudioRecorderCommon {}
