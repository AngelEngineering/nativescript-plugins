# @angelengineering/audio-recorder

# Nativescript Audio Recorder ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@angelengineering/audio-recorder?style=flat-square)](https://www.npmjs.com/package/@angelengineering/audio-recorder)


This plugin provides an audio recorder for Android and iOS that supports recording of audio from a device microphone input and saved to an  MP4/AAC audio file. It also provides a function to merge multiple audio recordings together. 

## Contents

- [NativeScript Audio Recorder](#audio-recorder)
  - [Contents](#contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Android Specifics](#android-specifics)
  - [iOS Specifics](#ios-specifics)
  - [Audio Recorder options](#supported-audio-recorder-options)
  - [Audio Recorder exports](#Audio-Recorder-exports) 
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

## Installation

```bash
npm install @angelengineering/audio-recorder --save
```

OR 

```bash
ns plugin add @angelengineering/audio-recorder
```

## Usage

The best way to understand this plugin is to study the demo app included in this repo. You can see how the plugin is used in a TypeScript application by looking at `apps/demo/src/plugin-demos/audio-recorder.ts`.


1. Import the plugin.
```javascript
import { AudioRecorder, AudioRecorderOptions } from '@angelengineering/audio-recorder';
```

2. Record an audio file.
```javascript
this.recorder = new AudioRecorder();
//you can tie into events for updating control states
this.recorder.on(AudioRecorder.stoppedEvent, () => {
  console.log('audio recording stopped');
});
this.recorder.on(AudioRecorder.completeEvent, (event: AudioRecorderEventData) => {
  console.log('audio recording completed, file: ', event.data);
});
this.recorder.on(AudioRecorder.startedEvent, () => {
  console.log('audio recording started');
});
this.recorder.on(AudioRecorder.errorEvent, (event: AudioRecorderEventData) => {
  console.log('audio recording error!', event.data);
});
let recOptions: AudioRecorderOptions = {
    filename: path.join(knownFolders.documents().path, 'audiorecording-1.mp4');,
    infoCallback: infoObject => {
      console.log('AudioRecorder infoCallback: ', JSON.stringify(infoObject));
    },
    errorCallback: errorObject => {
      console.error('AudioRecorder errorCallback: ', JSON.stringify(errorObject));
    },
  };
try {
  this.recorder
    .record(recOptions)
    .then(() => {
      console.log('recording audio started');
    })
    .catch(err => {
      console.error(err);
    });
} catch (err) {
  alert(err?.message);
}
```
3. (Optional) Merge multiple recordings into a single file.
``` javascript
let audioFiles: [string] = ['PATH/TO/audiorecording-1.mp4','PATH/TO/audiorecording-2.mp4'];
let finalfile = await this.recorder.mergeAudioFiles(this.audioFiles, 'PATH/TO/audiorecording.mp4');
```

### Android Specifics
NOTE: This plugin will only work on API26+ devices if you want to merge audio segments together. Single file recordings only on API 25 or below. 

In order to record audio, you'll need to add the following permission to your AndroidManifest.xml:

```xml
<manifest ... >
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  ...
</manifest>
```

To request permissions in the demo app, we use the @nativescript-community [perms plugin](https://github.com/nativescript-community/perms). 


### iOS Specifics

In order to record audio, iOS will require permission to access the microphone. Add the following to your Info.plist:
``` xml
<key>NSMicrophoneUsageDescription</key>
<string>This app requires access to your microphone to record audio</string>
```

Your app might be rejected from the Apple App Store if you do not provide a description about why you need this permission. 

> **NOTE**: if you do use the perms plugin in a production app, make sure to read their README.md first, as using this plugin in production apps will require you to add all iOS Info.plist permission strings to avoid being rejected by automatic processing since the plugin includes code for all permission types.

For iOS, if the devices has multiple audio input devices available, the plugin will attempt to select a connected bluetooth or airpod device first, then a headset and finally the device microphone.

## Supported Audio Recorder options
``` javascript
export interface AudioRecorderOptions {
  /**
   * Gets or sets the recorded file name.
   */
  filename: string;

  /**
   * Sets the source for recording ***ANDROID ONLY for now ***
   */
  source?: any;

  /**
   * Gets or set the max duration of the recording session.
   * Input in milliseconds, which is Android's format.
   * Will be converted appropriately for iOS.
   */
  maxDuration?: number;

  /**
   * Enable metering. Off by default.
   */
  metering?: boolean;

  /**
   * Channels
   */
  channels?: any;

  /**
   * Sampling rate
   */
  sampleRate?: any;

  /**
   * Bit rate
   */
  bitRate?: any; //Android only, use iosAudioQuality for iOS

  /**
   * Sets the ios audio quality setting. Options are Min|Low|Medium|High|Max. Set to Medium by default.
   */
  iosAudioQuality?: string;

  /**
   * Gets or sets the callback when an error occurs with the media recorder.
   * @returns {Object} An object containing the native values for the error callback.
   */
  errorCallback?: Function;

  /**
   * Gets or sets the callback to be invoked to communicate some info and/or warning about the media or its playback.
   * @returns {Object} An object containing the native values for the info callback.
   */
  infoCallback?: Function;
}
```

## Audio Recorder exports

``` javascript
export class AudioRecorder extends Observable implements IAudioRecorder {
  readonly ios: any; //Native iOS recorder instance
  readonly android: any;  //Native Android recorder instance

  /**
   * Starts the native audio recording control.
   * @method record
   * @param options AudioRecorderOptions to use when recording audio
   * @returns Promise that resolves once recording is complete, or rejects if fails
   */
  record(options: AudioRecorderOptions): Promise<void>;

  /**
   * Stops the native audio recording control.
   * @method stop
   * @returns Promise that resolves once recording is complete and file has been written, or rejects if fails
   */
  stop(): Promise<File>;

  /**
   * Releases resources from the recorder.
   * @method dispose
   * @returns Promise that resolves once recorder has been released and disposed, or rejects if fails
   */
  dispose(): Promise<void>;

  /**
   * For Android, returns the maximum absolute amplitude (unsigned 16-bit integer values from 0-32767 ) that was sampled since the last call to this method. Call this only after the setAudioSource().
   * For iOS, returns the average power, in decibels full-scale (dBFS), for an audio channel.
   * @param channel [number] iOS-only
   */
  getMeters(channel?: number): number;

  /**
   * Returns true if the audio recorder is currently recording, false if not
   * @method isRecording
   */
  isRecording(): boolean;

  /**
   * Merges the mp4 files specified by audioFileUrls (array of file paths) into an mp4 audio file
   *      at the outputPath.
   * NOTE: inputs must all be AAC encoded MP4 audio files!
   * @method mergeAudioFiles
   * @param audioFileUrls
   * @param outputPath
   **/
  mergeAudioFiles(audioFiles: string[], outputPath: string): Promise<File>;

  /**
   * Events
   */
  public static startedEvent = 'startedEvent';
  public static stoppedEvent = 'stoppedEvent';
  public static completeEvent = 'completeEvent'; //will pass the recording filename
  public static errorEvent = 'errorEvent'; //will pass the error object or string
}
```

## Helper Utils
``` javascript
  /**
 * Utility to find the duration in milliseconds of the mp4 file at `mp4Path`
 * @function getDuration
 * @param mp4Path string with the path of the audio file to examine
 */
  export function getDuration(mp4Path: string): number;
```

Tested and working on Android API 25-33. (merge util only on 26+)
Tested and working on iOS 12.x-16.x. 


## Acknowledgements

This plugin is based on https://github.com/nstudio/nativescript-audio

## License

Apache License Version 2.0
