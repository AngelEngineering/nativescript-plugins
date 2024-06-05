# @angelengineering/transcoder

# Nativescript Transcoder ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@angelengineering/audio-recorder?style=flat-square)](https://www.npmjs.com/package/@angelengineering/transcoder)

This plugin provides basic video transcoding functionality for Android API 21+ and iOS 4+ and supports modifying the video's resolution on both platforms. iOS supports a few extra options such as AVNumberOfChannelsKey, AVSampleRateKey and AVEncoderBitRateKey.

The plugin is currently only for scaling a video to a user-specified height and/or width. If only one dimension is passed,  the other will be scaled in the same ratio (based on the original video dimensions). If neither is specified, the transcoder will use a height of 720 with a scaled width based on the input video. 

Note: Only available system video/audio codecs/formats are supported, so the transcode will fail immediately for unsupported inputs. It may also fail during transcode if the video file has corrupted frame data. 

For both Android and iOS, the transcoded video files will be saved as an MP4 file using h264 and AAC encoding for maximum compatibility. 


For Android, this plugin also provides a function *convertAudioToMp4* which will convert an audio file or url to an mp4 file with AAC audio. 


## Installation

```bash
npm install @angelengineering/transcoder --save
```

OR 

```bash
ns plugin add @angelengineering/transcoder
```

## Basic Usage

The best way to understand how to use the plugin is to study the demo app included in this repo. You can see how the plugin is used in a TypeScript application by looking at `apps/demo/src/plugin-demos/transcoder.ts`.

1. Import the plugin.

```typescript
import { NativescriptTranscoder } from '@angelengineering/transcoder';
```

2. Transcode a video to a specific height and/or width (the example below uses a filepicker, but you can use a video recording file from the camera or another source) 

```typescript

selectAndTranscodeVideo(): void {
  // input
  const inputFile = await filePicker(MediaType.VIDEO, false)?.[0];

  // output
   const outputPath = knownFolders.documents().getFile('transcoded-video.mp4').path;
    if (File.exists(outputPath)) {
      const file = File.fromPath(outputPath);
      // make sure file specified as the output path doesn't exist before starting the transcoding process
      file.removeSync();
    }
    const transcoder = new NativescriptTranscoder();
    transcoder
      .transcode(
        inputFile.path,
        outputPath,
          {
              height: 720,                
              //width: 1080,  //you can also set specific width, both or neither
          }//:VideoConfig options
      ).then(transcodedFile => {
        // do something with the transcoded file
      })

}
```

## Events

The following events are emitted during the transcoding process:

- `TRANSCODING_STARTED` - emitted at the beginning of the transcoding process
- `TRANSCODING_PROGRESS` - emitted over time with the percentage (0 to 1) completed. Event data with percentage in `progress`
- `TRANSCODING_COMPLETE` - emitted after a successful transcoding process, Event data with transcoded file path in `output`
- `TRANSCODING_ERROR` - emitted when the transcoding process emits an error. Event data with error string in `error`


You can listen to these events by attaching the `on` listener to the `transcoder`

```typescript
  const transcoder = new NativescriptTranscoder()
  transcoder.on(NativescriptTranscoder.TRANSCODING_PROGRESS, (payload: MessageData) => {
      // IMPORTANT! You'll have to wrap any UI updates in `executeOnMainThread` for iOS as the events are emitted from a different thread
      executeOnMainThread(() => {
        progressBar.value = payload.data.progress * 100;
      });
    });
```

## Options 
```typescript
export interface VideoConfig {  
  height?: number;
  width?: number;
  force?: boolean; // force transcoding to allow transcoding to the same or higher quality
  frameRate?: number; // iOS only
  audioChannels?: number; // iOS only
  audioSampleRate?: number; // iOS only
  audioBitRate?: number; // iOS only
}
```

## Utilities

The transcoder plugin also contains some utilities to help you when working with videos:

| Function    | Description | Return Type | iOS | Android |
| ----------- | ----------- | ----------- | ----------- | ----------- |
| getVideoResolution(videoPath: string)      | Returns the video resolution (e.g. `1920x1080`) | `{ width: string, height: string }` | ✅ | ✅ |
| getVideoSize(videoPath: string)      | Returns the video size in bytes | number | ✅ | ✅ |
| getVideoSizeString(videoPath: string)      | Returns the video size in human readable format (e.g. `5.5 mb`) | string | ✅ | ✅ |
| getVideoCodec(videoPath: string)      | Returns the video codec if found | string | ✅ | ✅ |
| getAudioCodec(videoPath: string)      | Returns the audio codec if found | string | ✅ | ✅ |
| getVideoDuration(videoPath: string)      | Returns the duration of the video in milliseconds | number | ✅ | ✅ |

## Troubleshooting

Logs are turned off by default. If you want to view the logs as the video is being processed, you can turn them on by setting the log level to `verbose` before starting the transcode process. This will slow down transcoding due to frequent events and console output. 

```typescript

startTranscoding(): void {
  const transcdoer = new Transcoder();
  transcoder.setLogLevel('verbose');
  transcoder.transcode(...);
}
```

  
## Acknowledgements

This plugin is based on [NextLevelSessionExporter](https://github.com/NextLevel/NextLevelSessionExporter) for iOS. For Android, this uses the AndroidX [Media3 Transformer](https://developer.android.com/media/media3/transformer) libraries


## License

Apache License Version 2.0
