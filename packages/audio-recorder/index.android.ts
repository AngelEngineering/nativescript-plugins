/* eslint-disable no-async-promise-executor */
import { Observable, File, Device } from '@nativescript/core';
import { IAudioRecorder } from './common';
import { AudioRecorderOptions } from './options';

export class AudioRecorder extends Observable implements IAudioRecorder {
  private _recorder: android.media.MediaRecorder;
  private _isRecording = false;
  public _recorderOptions: AudioRecorderOptions;

  get android() {
    return this._recorder;
  }

  public record(options: AudioRecorderOptions): Promise<any> {
    this._recorderOptions = options;
    return new Promise(async (resolve, reject) => {
      try {
        if (this._recorder) {
          // reset for reuse
          this._recorder.reset();
        } else {
          this._recorder = new android.media.MediaRecorder();
        }
        const audioSource = options.source ? options.source : android.media.MediaRecorder.AudioSource.DEFAULT; // https://developer.android.com/reference/android/media/MediaRecorder.AudioSource
        // const audioSource = android.media.MediaRecorder.AudioSource.MIC; // https://developer.android.com/reference/android/media/MediaRecorder.AudioSource
        this._recorder.setAudioSource(audioSource);

        //NOTE: to ensure we can merge audioFiles, only allow MP4 with AAC for now
        const outFormat = android.media.MediaRecorder.OutputFormat.MPEG_4;
        // const outFormat = options.format ? options.format : android.media.AudioFormat.ENCODING_PCM_16BIT; // https://developer.android.com/reference/android/media/AudioFormat#ENCODING_PCM_16BIT
        // const outFormat = options.format ? options.format : android.media.AudioFormat.ENCODING_AAC_LC; // https://developer.android.com/reference/android/media/AudioFormat#ENCODING_AAC_LC
        this._recorder.setOutputFormat(outFormat);
        // const encoder = options.encoder ? options.encoder : android.media.MediaRecorder.AudioEncoder.AAC; // https://developer.android.com/reference/android/media/MediaRecorder.AudioEncoder#AAC
        const encoder = android.media.MediaRecorder.AudioEncoder.AAC; // https://developer.android.com/reference/android/media/MediaRecorder.AudioEncoder#AAC
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
        this._isRecording = true;
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

  public stop(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.stop();
          this._isRecording = false;
          resolve(File.fromPath(this._recorderOptions.filename));
        } else return reject('No native recorder instance, was this cleared by mistake!?');
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public isRecording() {
    return this._recorder && this._isRecording;
  }

  public dispose(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        if (this._recorder) {
          this._recorder.release();
        }
        this._isRecording = false;
        this._recorder = undefined;
        resolve(null);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  public mergeAudioFiles(audioFiles: string[], outputPath: string): Promise<File> {
    return new Promise((resolve, reject) => {
      //Note: This will only merge audio tracks from  mp4 files, and only succeed if all input have same format/encoding
      //MediaMuxer support for multiple audio/video tracks only on API 26+ only
      if (+Device.sdkVersion < 26) {
        console.error('This is only supported on API 26+');
        return reject('This is only supported on API 26+');
      }
      if (!audioFiles || audioFiles.length <= 0) return reject('audioFiles is empty!');
      if (!outputPath) return reject('outputPath should be a valid path string');
      if (File.exists(outputPath)) {
        // remove file if it exists
        File.fromPath(outputPath).removeSync(err => {
          console.error('Unable to remove file!', err);
          return reject('Unable to remove file!' + err.message);
        });
      }
      if (audioFiles.length == 1) {
        let fileData = File.fromPath(audioFiles[0]).readSync();
        File.fromPath(outputPath).writeSync(fileData);
        return resolve(File.fromPath(outputPath));
      }

      // Create the MediaMuxer and specify the output file
      const muxer = new android.media.MediaMuxer(outputPath, android.media.MediaMuxer.OutputFormat.MUXER_OUTPUT_MPEG_4);
      const MAX_SAMPLE_SIZE = 256 * 1024;
      const APPEND_DELAY = 200; //we add a little delay between segments to make segmentation a little more obvious
      let totalDuration = 0;
      let audioFormat: android.media.MediaFormat = null;
      let audioTrackIndex = -1;
      try {
        let muxerStarted = false;
        for (let i = 0; i < audioFiles.length; i++) {
          let mediadata = new android.media.MediaMetadataRetriever();
          mediadata.setDataSource(audioFiles[i]);
          let trackDuration = 0;
          try {
            trackDuration = +mediadata.extractMetadata(android.media.MediaMetadataRetriever.METADATA_KEY_DURATION);
            // console.log('trackDuration ', trackDuration); //returned in milliseconds
          } catch (err) {
            console.error('Unable to extract trackDuration from metadata!');
          }
          let audioExtractor: android.media.MediaExtractor = new android.media.MediaExtractor();
          audioExtractor.setDataSource(audioFiles[i]);
          let tracks = audioExtractor.getTrackCount();
          if (!audioFormat)
            for (let j = 0; j < audioExtractor.getTrackCount(); j++) {
              let mf = audioExtractor.getTrackFormat(j);
              let mime = mf.getString(android.media.MediaFormat.KEY_MIME);
              if (mime.startsWith('audio/')) {
                audioExtractor.selectTrack(j);
                audioFormat = audioExtractor.getTrackFormat(j);
                break;
              }
            }
          if (audioTrackIndex == -1) {
            audioTrackIndex = muxer.addTrack(audioFormat);
          }
          let sawAudioEOS = false;
          let bufferSize = MAX_SAMPLE_SIZE;
          let audioBuf = java.nio.ByteBuffer.allocate(bufferSize);
          let offset = 0;
          let bufferInfo: android.media.MediaCodec.BufferInfo = new android.media.MediaCodec.BufferInfo();

          // start muxer if not started yet
          if (!muxerStarted) {
            muxer.start();
            muxerStarted = true;
          }
          //add file data
          while (!sawAudioEOS) {
            bufferInfo.offset = offset;
            bufferInfo.size = audioExtractor.readSampleData(audioBuf, offset);
            if (bufferInfo.size < 0) {
              sawAudioEOS = true;
              bufferInfo.size = 0;
              totalDuration += trackDuration;
              audioFormat = null;
            } else {
              bufferInfo.presentationTimeUs = audioExtractor.getSampleTime() + totalDuration + APPEND_DELAY;
              bufferInfo.flags = android.media.MediaCodec.BUFFER_FLAG_KEY_FRAME;
              muxer.writeSampleData(audioTrackIndex, audioBuf, bufferInfo);
              audioExtractor.advance();
            }
          }
          mediadata.release();
          mediadata = null;
          audioExtractor.release();
          audioExtractor = null;
        }
        muxer.stop();
        // console.log('totalDuration (ms) => ', totalDuration);
        return resolve(File.fromPath(outputPath));
      } catch (err) {
        console.error(err, err.message);
        return reject('Error during merge: ' + err.message);
      }
    });
  }
}
