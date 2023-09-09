# @angelengineering/audio-player

# Nativescript audio player ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@angelengineering/audio-player?style=flat-square)](https://www.npmjs.com/package/@angelengineering/audio-player)

> @angelengineering/audio-player

This plugin provides an audio player for Android and iOS that supports playback of both local files and remote URL audio files.  For  **Android**,  MediaPlayer will internally cache remote files after first prepare/play. For **iOS**, the plugin will download and cache remote files on first prepare/play. 

## Contents
  - [Installation](#installation)
  - [Usage](#usage)
  - [Audio Player options](#supported-audio-player-options)
  - [Audio Player exports](#Audio-Player-exports) 
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

## Installation

```bash
npm install @angelengineering/audio-player --save
```

OR 

```bash
ns plugin add @angelengineering/audio-player
```

## Usage

The best way to understand how to use the plugin is to study the demo app included in this repo. You can see how the plugin is used in a TypeScript application by looking at `apps/demo/src/plugin-demos/audio-player.ts`.


1. Import the plugin.
```javascript
import { AudioPlayer, AudioPlayerOptions } from '@angelengineering/audio-player';
```

2. Play an audio file.
```javascript 
protected _playOptions: AudioPlayerOptions = {
    audioFile: knownFolders.currentApp().path + '/audio/example.m4a';,
    loop: false,
    audioMixing: false,
    completeCallback: async result => {
        console.log('AudioPlayer - Audio file playback complete.', result);
    },
    errorCallback: errorObject => {
        console.error('AudioPlayer error!', JSON.stringify(errorObject));
    },
    infoCallback: infoObject => {
        console.info('AudioPlayer info: ', JSON.stringify(infoObject));
    },
};
this.player.prepareAudio(this._playOptions).then(status => {
    if (status) {    
        this.player.play();    
    } else {
        console.log('ERROR! Unable to prepare audio!');
    }
});
```

NOTE: If you want to play an HTTP URL, you'll also need to make some adjustments to your application to allow unsecure connections or URL access will fail silently. 
For iOS, add the following to your app's Info.plist:
```
<key>NSAppTransportSecurity</key>  
<dict>  
    <key>NSAllowsArbitraryLoads</key>
    <true />  
</dict>
```

For Android, ensure your application tag in `App_Resources/Android/src/main/AndroidManifest.xml` has the following:

```
android:usesCleartextTraffic="true"
```

## Supported Audio Player options
```javascript 
export interface AudioPlayerOptions {
  /**
   * Gets or sets the audio file url.
   */
  audioFile: string;

  /**
   * Gets or sets the callback when the currently playing audio file completes.
   * @returns {Object} An object containing the native values for the callback.
   */
  completeCallback?: Function;

  /**
   * Get or sets the player to loop playback.
   */
  loop: boolean;

  audioMixing?: boolean;

  /**
   * Gets or sets the callback when an error occurs with the audio player.
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

## Audio Player exports

```javascript 
export interface AudioPlayer {
  /**
   * native instance getters
   */
  readonly ios?: any;
  readonly android?: any;

  /**
   * Volume getter/setter
   */
  volume: any;

  /**
   * Prepare Audio player by preloading an audio file from file oath or URL
   * @function prepareAudio
   * @param options
   */
  prepareAudio(options: AudioPlayerOptions): Promise<boolean>;

  /**
   * Play current audio file that has been prepared by calling prepareAudio(options)
   */
  play(): Promise<boolean>;

  /**
   * Pauses playing audio file.
   */
  pause(): Promise<boolean>;

  /**
   * Seeks to specific time.
   */
  seekTo(time: number): Promise<boolean>;

  /**
   * Releases resources from the audio player.
   */
  dispose(): Promise<boolean>;

  /**
   * Check if the audio is actively playing.
   */
  isAudioPlaying(): boolean;

  /**
   * Get the duration of the audio file playing.
   */
  getAudioTrackDuration(): Promise<string>;

  /**
   * current time
   */
  readonly currentTime: number;
}
```

Tested and working on Android API 25-33.
Tested and working on iOS 12.x-16.x. 

## Acknowledgements

This plugin is based on https://github.com/nstudio/nativescript-audio


## License

Apache License Version 2.0
