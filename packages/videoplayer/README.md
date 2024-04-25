# @angelengineering/videoplayer

# NativeScript VideoPlayer ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@angelengineering/videoplayer?style=flat-square)](https://www.npmjs.com/package/@angelengineering/videoplayer)



## Contents

- [NativeScript Videoplayer](#nativescript-videoplayer)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Properties](#properties)
  - [API](#api)
  - [Events](#events)
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

## Installation

```bash
npm install @angelengineering/videoplayer --save
```
OR
```bash
ns plugin add @angelengineering/videoplayer
```

## Usage

The best way to understand how to use the plugin is to study the demo app included in this repo. You can see how the plugin is used in a TypeScript application page by looking at `apps/demo/src/plugin-demos/videoplayer.ts`.

1. Import the plugin.

```javascript
import { VideoPlayer } from '@angelengineering/videoplayer';
```

2. Create a videoplayer instance.

```javascript
let videoPlayer: VideoPlayer = new VideoPlayer();
```

3. Play a video file/url. 
```javascript
videoPlayer.src = 'path/to/movie/file';
videoPlayer.play();
```

## Properties

| Property                            | Description                                                                                                                                                                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **src**                             | The src file for the video. Set the video file to play, for best performance use local video files if possible. The file must adhere to the platforms accepted video formats. For reference check the platform specs on playing videos. |
| **autoplay - (boolean)**            | Set if the video should start playing as soon as possible or to wait for user interaction.                                                                                                                                              |
| **controls - (boolean)**            | Set to display the native video player's media playback controls.                                                                                                                                                                           |
| **muted - (boolean)**               | Mutes the native video player.                                                                                                                                                                                                          |
| **loop - (boolean)**                | Sets the native video player to loop once playback has finished.                                                                                                                                                                        |
| **fill - (VideoFill or boolean)**                | iOS: Set the VideoFill mode to use when rendering video.  Android: either enable or disable the auto fill mode   |
| **observeCurrentTime  (boolean)**  | If true, currentTimeUpdated callback is possible.                                                                                              
| **debug - (boolean)**  | Enable or disable debugg logging to the console.                       
                                                                                                                                

## API

| Method                        | Description                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| **play**                      | Start playing the video.                                            |
| **pause**                     | Pause the video                                                     |
| **seekToTime(time: number)**  | Seek the video to a time (milliseconds)                             |
| **getCurrentTime**            | Returns the current time in the video duration (milliseconds)       |
| **getDuration**               | Returns the current time in the video duration (milliseconds)       |
| **destroy**                   | Destroy the video player and free resources                         |
| **mute(boolean)**             | If true, mutes the video. If false, unmute the video.               |
| **setVolume(volume: number)** | Set the volume - Must be between 0 and 1.                           |
| **setPlaybackSpeed(volume: number)** | Set the playback speed - Must be between 0.x and Y.Y         |
| **isPlaying**                 | Whether the player is currently playing media                       |
| **getVideoSize**                 | Returns video dimensions { width: number; height: number }       |
| **getPlayer**                 | Get the native player instance.      |
| **stop**   | Android: Stop the playback - this resets the player and remove the video src. iOS: pause playback. |

## Observable Properties

**currentTime()** - Current time of video.

## Events

| Event                   | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| errorEvent              | This event fires when an error in the source code is thrown.        |
| playbackReadyEvent      | This event fires when the video is ready.                           |
| playbackStartEvent      | This event fires when video starts playback.                        |
| seekToTimeCompleteEvent | This event fires when seeking is complete.                          |
| currentTimeUpdatedEvent | This event fires when the current time of playing video is changed. |
| playbackFinishedEvent           | This event fires when the video is complete.                        |
| mutedEvent              | This event fires when video is muted.                               |
| unmutedEvent            | This event fires when video is unmutedEvent.                        |
| pausedEvent             | This event fires when video is paused.                              |
| volumeSetEvent          | This event fires when the volume is set.                            |
| chaptersLoadedEvent          | iOS only: This event fires when the chapters have been loaded, if any.                            |





## Acknowledgements

This plugin was based on https://github.com/nstudio/nativescript-videoplayer and https://github.com/nstudio/nativescript-plugins/blob/main/packages/nativescript-exoplayer/README.md

## License

Apache License Version 2.0
