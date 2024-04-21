# @angelengineering/camera

# NativeScript Camera ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@angelengineering/camera?style=flat-square)](https://www.npmjs.com/package/@angelengineering/camera)





## Contents

- [NativeScript Camera  ](#nativescript-camera)
  - [Installation](#installation)
  - [Features](#features)
  - [Usage](#usage)
  - [Android Permissions](#android-permissions)
  - [iOS Permissions](#ios-permissions)  
  - [Properties](#properties)  
  - [Methods](#cross-platform-public-methods)  
  - [Events](#events)  
  - [Interfaces](#option-interfaces)  
  - [Caveats](#caveats)
  - [Utils](#utils)
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

------------------------------

## Installation
```bash
npm install @angelengineering/camera --save
```
OR
```bash
ns plugin install @angelengineering/camera
```

------------------------------

## Features
This nativescript camera plugin works on Android (API 26+) and Apple (iOS 12+) devices and has the following features:
* 📷 Photo and Video capture modes
* 👁️ Camera switching during video recording and option to lock device rotation while recording
* 👌 Pinch to zoom in/out and tap to focus
* 📱 Video merge utility
* 🎞️ Built-in buttons for flash, camera switch, camera 
* 📸 Flash/Torch control in both photo and video modes
* ⏱️ Supports square-cropping photos and saving photos/videos to device Photos library
* 🧩 Photo confirmation options with built-in UI to show preview
* 🔍 Customizable output photo dimensions and quality (saved as jpeg)

## Future Features
* ⏯️ Customizable video codec and dimensions
* 🌓 Video Confirmation flag and UI
* ⚡ Additional options for more control over Camera and Photo/Video capture

------------------------------

## Usage
The best way to understand how to use the plugin is to look at the demo app included in this repo.
The `apps/demo/` folder contains a simple NS TypeScript application that uses this plugin. Look at `apps/demo/src/plugin-demos/camera.ts` and `apps/demo/src/plugin-demos/camera.xml` for camera plugin usage, and `apps/demo/src/main-view-model.ts` for obtaining permissions before using the camera plugin. 

1. Import the plugin.
```javascript
import { NSCamera } from '@angelengineering/camera';
```

2. Create a camera instance via JS/TS or XML:
```javascript
this.cam = new NSCamera();
this.cam.id = "nscamera"
this.cam.enableVideo = true;
this.cam.confirmPhotos = true;
this.cam.defaultCamera = 'front';
    ......
//Check camera and microphone permissions first.
//Then, add this.cam to a Layout as a child and voila!
```
or
```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" xmlns:Cam="@angelengineering/camera">
  ......
      <Cam:NSCamera height="{{ cameraHeight }}"
          id="nscamera"
          defaultCamera="front"
          enableVideo="true"
          disablePhoto="false"
          saveToGallery="true"
          showCaptureIcon="true"
          showToggleIcon="true"
          showFlashIcon="true"
          confirmPhotos="true"
          autoSquareCrop="false"
          insetButtons="true"
          insetButtonsPercent="0.02"
          shouldLockRotation="true"
          confirmRetakeText="nah"
          confirmSaveText="yeah"
          maxDimension="800"
          quality="90"
          debug="true">         
        </Cam:NSCamera>
  ......
```

3. Hook into camera events to handle videos and photos capture events along with other useful events. 

```javascript
this.cam.on(NSCamera.errorEvent, args => {
      //handle error
    });

    this.cam.on(NSCamera.toggleCameraEvent, (args: any) => {
      // update some UI/state
    });

    this.cam.on(NSCamera.photoCapturedEvent, (args: any) => {
      // args.data should be the path of the jpeg file produced by camera library
    });

    this.cam.on(NSCamera.videoRecordingReadyEvent, (args: any) => {
      //args.data should be the path of the file created with the video recording      
    });

    this.cam.on(NSCamera.videoRecordingStartedEvent, (args: any) => {
      // update some UI/state
    });

    this.cam.on(NSCamera.videoRecordingFinishedEvent, (args: any) => {
      // some other UI updates
    });

    this.cam.on(NSCamera.cameraReadyEvent, (args: any) => {
      // lets you know once native camera instance is ready and initialized
    });
```

4. Use the built-in buttons or control the camera using exposed functions in your app.

------------------------------

### Permissions
Before creating/using a Camera instance, you will need to ensure that permissions for both the Camera an the Microphone have been granted by the user. An example using the community permissions plugin can be seen in `apps/demo/src/main-view-model.ts`.

### Android Permissions
To request permissions in the demo app, we use the @nativescript-community [perms plugin](https://github.com/nativescript-community/perms). 


Ensure your AndroidMAnifest.xml has the following declarations.

```xml
<manifest ... >
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
	<uses-permission android:name="android.permission.CAMERA" />

  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```


 To support saving to Photos Gallery for API<29 devices also add the following lines in AndroidManifest.xml 

```xml
<manifest ... >
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>

  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```
And in your application, make sure you request these permissions if you want to use the `saveToGallery` flag. You can see an example in `apps/demo/src/plugin-demos/camera.ts`. If this flag is set and no permission has been granted, a copy will not be saved to the Device Photos.


### iOS Permissions
Add the following to `app/App_Resources/iOS/Info.plist`:

```xml
    <key>NSMicrophoneUsageDescription</key>
	<string>This app requires access to your microphone to record audio</string>
	<key>NSCameraUsageDescription</key>
	<string>This app requires access to your camera to record video and take pictures</string>
```

If you want to use the `saveToGallery` flag then you will also need to add the following and request permission from user (look at the example in `apps/demo/src/plugin-demos/camera.ts` for a working example). If this flag is set and no permission has been granted, a copy will not be saved to the Photos Gallery.

```xml
  <key>NSPhotoLibraryUsageDescription</key>
  <string>Requires access to photo library to upload media.</string>
```

> **NOTE**: if you do use the perms plugin in a production app, make sure to read their README.md first, as using this plugin in production apps may require you to add all iOS Info.plist permission strings to avoid being rejected by automatic processing since the plugin includes code for all permission types.

------------------------------

## Properties

| Name                  | Type    | Default    | Description                                                                                                                  |
| --------------------- | ------- | -----------|----------------------------------------------------------------------------------------------------------------------------- |
| **debug**             | boolean | *false*      | If true logs will be output in the console to help debug the Camera plugin.                                           |
| **confirmPhotos**     | boolean | *true*       | If true the default take picture event will present a confirmation dialog before saving.                                   |
| **confirmRetakeText** | string  | *'Retake'*   | When confirming capture this text will be presented to the user to retake the photo.                                       |
| **confirmSaveText**   | string  | *'Save'*     | When confirming capture this text will be presented to the user to save the photo.                                         |
| **saveToGallery**     | boolean | *true*       | If true, photos or videos captured by the plugin will be saved to the device photos gallery.                                                        |
| **showFlashIcon**     | boolean | *true*       | If true the default flash toggle icon/button will show on the NSCamera layout. Note: if the current camera does not have a flashlight this will be automatically hidden.                                         |
| **showToggleIcon**    | boolean | *true*       | If true the default camera toggle (front/back) icon button will show on the NSCamera layout.                            |
| **showCaptureIcon**   | boolean | *true*       | If true the default capture (take picture) icon/button will show on the NSCamera layout.                                |
| **showGalleryIcon**   | boolean | *true*       | If true the choose from gallery/library icon/button will show on the NSCamera layout.                                   |
| **enableVideo**       | boolean | *false*       | If true the Camera instance can record video and will affect camera UX and main camera button icon used.                                      |
| **disablePhoto**       | boolean | *false*       | If true the Camera instance UI will only allow video mode operation. if enableVideo is false and disablePhoto is true, the main camera button will not trigger any actions.                                       |
| **defaultCamera** | `'front'` or `'rear'` | *'rear'*         | Which camera to use on launch.  `'front'` or `'rear'`.                                                  |
| **shouldLockRotation**| boolean | *true*  | If true, locks the device orientation while recording video|

## Android Only Properties
| Name                 | Type    | Description                                                                                 |
| -------------------- | ------- | ------------------------------------------------------------------------------------------- |
| **flashOnIcon**      | string  | Name of app_resource drawable for the native image button when flash is on (enabled).       |
| **flashOffIcon**     | string  | Name of app_resource drawable for the native image button when flash is off (disabled).     |
| **toggleCameraIcon** | string  | Name of app_resource drawable for the toggle camera button.                                 |
| **takePicIcon**      | string  | Name of app_resource drawable for the take picture (capture) button.                        |
| **galleryIcon**      | string  | Name of app_resource drawable for the open gallery (image library) button.                  |
| **autoFocus**        | boolean | If true (defaults to true) the camera will use continuous focus when the camera detects changes of the target. |
| **insetButtons**     | boolean | If true (defaults to false), adjusts the spacing from edge of screen for built-in buttons.                      |
| **insetButtonsPercent**|number | The percentage to inset by, from 0.0 - 1.0                                                  |

## iOS Only Properties
| Name                      | Type    | Description                                                   |
| ------------------------- | ------- | ------------------------------------------------------------- |
| **doubleTapCameraSwitch** | boolean | Enable/disable double tap gesture to switch camera. (enabled) |

------------------------------

## Cross Platform Public Methods
| Method                                       | Description                                                                                                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **isCameraAvailable()**                      | Returns true if the device has at least one camera.                                                                                                             |
| **toggleFlash()**                            | Toggles the flash mode on the active camera.                                                                                                                    |
| **toggleCamera()**                           | Toggles the active camera on the device.                                                                                                                        |
| **takePicture(opts?: ICameraOptions)**      | Takes a picture of the current camera preview. When the image file is saved, `photoCapturedEvent` event will be emitted with its path .                                                                                                       |
| **getFlashMode(): string**                   | Android: various strings possible: https://developer.android.com/reference/android/hardware/Camera.Parameters.html#getFlashMode() iOS: either `'on'` or `'off'` |
| **record(opts?: IVideoOptions)**             | Starts recording a video.                                                                                                                                       |
| **stop()**                                   | Stops the video recording. When the video file is ready, the `videoRecordingReadyEvent` event will be emitted with its path.                                                                   |

## Android Only Public Methods
| Method                                                  | Description                                                                                                                                         |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **getNumberOfCameras()**                                | Returns the number of cameras on the device.                                                                                                        |
| **hasFlash()**                                          | Returns true if the active camera has a flash mode.                                                                                                 |
------------------------------

## Events
| Name                            | Description                                                                            |
| ------------------------------- | -------------------------------------------------------------------------------------- |
| **errorEvent**                  | Executes when an error is emitted from the Camera                                     |
| **photoCapturedEvent**          | Executes when a photo is taken.                                                        |
| **toggleCameraEvent**           | Executes when the device camera is toggled.                                            |
| **videoRecordingStartedEvent**  | Executes when video starts recording.                                                  |
| **videoRecordingFinishedEvent** | Executes when video stops recording but has not process yet.                           |
| **videoRecordingReadyEvent**    | Executes when video has completed processing and is ready to be used.                  |
| **confirmScreenShownEvent**     | Executes when the picture confirm dialog is shown..                                    |
| **confirmScreenDismissedEvent** | Executes when the picture confirm dialog is dismissed either by Retake or Save button. |
| **cameraReadyEvent**            | Executes when the camera instance is done initializing                                 |
------------------------------
## Option Interfaces
Photo taking options
```TS
export interface ICameraOptions {
  confirmPhotos?: boolean;
  saveToGallery?: boolean; //shared with video options
  quality?: number;
  maxDimension?: number;
  autoSquareCrop?: boolean;
  confirmRetakeText?: string;
  confirmSaveText?: string;
}
```

Video recording options
```TS
export interface IVideoOptions {
  videoQuality?: CameraVideoQuality;  //defaults to 720p
  saveToGallery?: boolean; //shared with photo options
  androidMaxVideoBitRate?: number; //Android-only
  androidMaxFrameRate?: number; //Android-only
  androidMaxAudioBitRate?: number; //Android-only
}
export enum CameraVideoQuality {
  MAX_480P = '480p',
  MAX_720P = '720p',
  MAX_1080P = '1080p',
  MAX_2160P = '2160p',
  HIGHEST = 'highest',
  LOWEST = 'lowest',
  QVGA = 'qvga',
}
```

------------------------------

## Caveats

*Audio Inputs* - On iOS, the plugin will prefer to use available audio inputs in the following order : bluetooth, wired and built-in. On Android, the plugin will only use the built-in device microphone at this time. Support for bluetooth devices will be added in the future. 

*App Suspension and Resume* - You should add event listeners that will tear down the Camera View and re-initialize it to avoid problems with device camera access. You can see an example in the demo application. 

*Pinch to Zoom* - for iOS this is currently only supported for rear cameras. Support for front cameras may be added in the future.

*Main Camera Button* - for both platforms, the main camera button supports both tap and long-press gestures when in video recording mode. Tap to start/stop recording, or long-press the button to record until you stop pressing the button. In photo mode, long-presses are ignored.

*Camera preview mode* - If enableVideo is false and disablePhoto is true, the camera plugin will only operate in camera preview mode. In this mode, neither the main camera button or the flash buttons will be rendered even if those options are enabled. 

*Device Sleep* - Developers should handle disabling device sleep during video recording to avoid having the device/app suspend while using the camera plugin. 

*Device Orientation Lock* - If your app has it's own orientation management system, use that instead of the plugin flag to ensure consistent behavior, particularly for iOS.  

*High Resolution and Camera Switching during Recording* - Not all cameras support the same range of resolutions on the same device, so you will experience distortion in recordings made when starting with a high-res camera, and switching to a camera that only supports a lower resolution.

------------------------------

## Utils

This plugin contains a few utility functions which may be useful for developers:

`mergeVideoFiles(inputFiles: string[], outputPath: string): Promise<File>`: Merge an array of video files produced by the camera plugin. To use it, all input video files must be MP4s with the same video/audio codec and resolution. The function takes two parameters; the first is an array of file names for the input video files and the second is a path string to save the merged video file to. 
``` js
let outputFile = await this.cam.mergeVideoFiles(videoSegmentsArray, outputPath)
```

`getVideoCodec(videoPath: string): string`: Looks through metadata for information on the video codec/format of a video file from a path.
``` js
console.log('codec:', this.cam.getVideoCodec(args.data));
```

`getVideoResolution(videoPath: string): { width: number; height: number } `: Looks through metadata for information on the height and width of a video file from a path.
``` js
console.log('Height/width:', this.cam.getVideoResolution(args.data));
```

`getVideoDuration(videoPath: string): number`: Looks through metadata to find the duration in milliseconds of the video file from a path.
``` js
console.log('video duration: ', this.cam.getVideoDuration(args.data));
```

------------------------------ 

## Acknowledgements
This plugin was based on [Nativescript-Camera-Plus](https://github.com/nstudio/nativescript-camera-plus) for NS,  [SwiftyCam](https://github.com/NathanWalker/SwiftyCam) for iOS and [FancyCamera](https://github.com/triniwiz/fancycamera) for Android. 

------------------------------
## License
Apache License Version 2.0


