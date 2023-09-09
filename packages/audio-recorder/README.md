# @angelengineering/audio-recorder

# Nativescript audio recorder ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@angelengineering/audio-recorder?style=flat-square)](https://www.npmjs.com/package/@angelengineering/audio-recorder)


This plugin provides an audio recorder for Android and iOS that supports recording of audio from a device microphone input and saved to an  MP4/AAC audio file. It also provides a function to merge multiple audio recordings together. 

## Contents
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

The best way to understand how to use the plugin is to study the demo app included in this repo. You can see how the plugin is used in a TypeScript application by looking at `apps/demo/src/plugin-demos/audio-recorder.ts`.


1. Import the plugin.
```javascript
import { AudioRecorder, AudioRecorderOptions } from '@angelengineering/audio-recorder';
```

2. Record an audio file.
```javascript
this.recorder = new AudioRecorder();
//you can tie into these events to update control UI state
this.recorder.on('RecorderFinished', () => {
  console.log('RecorderFinished');
});
this.recorder.on('RecorderFinishedSuccessfully', () => {
  console.log('RecorderFinishedSuccessfully');
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
   * Starts a recording session with the provided options.
   * @param options [AudioRecorderOptions]
   */
  record(options: AudioRecorderOptions): Promise<any>;

  /**
   * Stops the recording
   */
  stop(): Promise<File>;

  /**
   * Disposes of the recorder session
   */
  dispose(): Promise<any>;

  /**
   * Returns the maximum absolute amplitude that was sampled since the last call to this method.
   * @param channel [number]
   */
  getMeters(channel?: number): any;

  /**
   * Returns value indicating the recorder is currently recording.
   */
  isRecording(): boolean;

  /**
   * Merges all files with file paths specified in audioFiles into a new file at outputPath. This only supports MP4/AAC audio files currently
   * Note: For Android, API 26+ is required.
   */
  mergeAudioFiles(audioFiles: string[], outputPath: string): Promise<File>;
}
```

Tested and working on Android API 26-33.
Tested and working on iOS 12.x-16.x. 


## Acknowledgements

This plugin is based on https://github.com/nstudio/nativescript-audio

## License

Apache License Version 2.0
