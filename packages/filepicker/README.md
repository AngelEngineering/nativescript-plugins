# @angelengineering/filepicker

# Nativescript Filepicker ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@angelengineering/filepicker?style=flat-square)](https://www.npmjs.com/package/@angelengineering/filepicker)

This file picker plugin exports function `filePicker()` that supports both single and multiple selection (for iOS, multiple selection feature depends on OS version) using only native picker approaches.

For **iOS**, `filePicker()` uses `UIDocumentPicker` to allow selection from publicly available files that can be accessed via iOS Files app. When selecting from Files, `UIDocumentPicker` supports multiple selections.

iOS also has access to the `galleryPicker()` function which selects from the iOS Photos Gallery. This picker uses `UIImagePicker` for iOS 13 and below, which only supports single selections. PHPicker is used for iOS 14+ which does support multiple selections from the Photos Gallery. This picker does require user permission before allowing access to media on iOS.

For **Android**, `filePicker()` uses `Intents` to open the stock file picker. For Android 6 (API 23) and above the permissions to read file storage should be explicitly required in AndroidManifest. See demo for implementation details. Note: `galleryPicker()` will just call `filePicker()` internally.


## Contents

- [NativeScript Filepicker  ](#nativescript-filepicker--)
  - [Contents](#contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Android Permissions](#android-permissions)
  - [iOS Permissions](#ios-permissions)
  - [Supported Picker File Types](#supported-picker-file-types)
  - [Android](#android)
  - [iOS](#ios)
  - [Additional Utils](#additional-utils)
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

## Installation

```bash
npm install @angelengineering/filepicker --save
```
OR
```bash
ns plugin install @angelengineering/filepicker
```
## Usage

The best way to understand how to use the plugin is to look at the demo app included in this repo.
In the `apps/demo` folder you can find the usage of the plugin for TypeScript non-Angular application. Refer to `apps/demo/src/plugin-demos/filepicker.ts`.

1. Import the plugin.

```javascript
import { Filepicker, MediaType } from '@angelengineering/filepicker';
```

2. Create a filepicker instance.

```javascript
let picker = new Filepicker();
```

1. Decide which types of files to include, and whether single or multiple selections allowed, then call the file picker.

```javascript
try {
  pickedFiles = await picker.filePicker(MediaType.IMAGE + MediaType.VIDEO + MediaType.AUDIO, true);
} catch (err) {
  if (err) alert(err?.message);
} finally {
  this.handleFiles(pickedFiles);
}
```

### Android Permissions

To request permissions in the demo app, we use the @nativescript-community [perms plugin](https://github.com/nativescript-community/perms). What's actually required to be granted by the user depends on the target API version and the device API version. 

If targeting API 25-33, be sure to have the legacy storage permission declared in your app by adding the following lines in AndroidManifest.xml.

```xml
<manifest ... >
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>

  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```

*NOTE*: When targeting API 34+, the legacy permission has been deprecated on devices running API 26-32, but still requires the user to grant for API <26 devices.

To request the legacy permission, use the following before opening the picker:
```javascript
request('storage');
```

To support API 33+ devices, you'll also need to add the following to the Android Manifest and request the new permissions:

```xml
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
<uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />
```

Before launching the picker on API 33+ devices, you'll need to request the following permissions to allow picker access to all file types:

```javascript
request('photo');
request('video');
request('audio');
```

For a working permissions example, look at the `pickAll` function inside the `filepicker.ts` file in the demo app. 

### iOS Permissions

Using the plugin on iOS to select from the Photos gallery with _galleryPicker()_ requires user to grant photo library permission first in order to access the selected image, otherwise it will return without any files. 

Your app might be rejected from the Apple App Store if you do not provide a description about why you need this permission. The default message "Requires access to photo library." might not be enough for the App Store reviewers. You can customize it by editing the `app/App_Resources/iOS/Info.plist` file in your app and adding the following key:

```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>Requires access to photo library to upload media.</string>
```

> **NOTE**: if you do use the perms plugin in a production app, make sure to read their README.md first, as using this plugin in production apps will require you to add all iOS Info.plist permission strings to avoid being rejected by automatic processing since the plugin includes code for all permission types.

## Supported Picker File Types

```javascript
MediaType {
  IMAGE,
  AUDIO,
  VIDEO,
  ARCHIVE,
  DOCUMENT,
  ALL     =>   (IMAGE | AUDIO | VIDEO | ARCHIVE | DOCUMENT )
}
```

Each platform natively supports a different set of file/mime types, you can see those that are used by the plugin by looking at per-platform plugin package source.

## Android

The Android stock file picker also supports selecting files from Google Photos and Google Drive if you have an account signed in on the Android device. Other document provider apps installed on your device may also offer additional services.

Tested and working on Android API 25-34.

## iOS

The iOS pickers also support selecting files from an associated iCloud account if the user has signed in on the device. Note that for a production application, you'll need to add the iCloud capability to your iOS application, and register that entitlement via the Apple Developer site for that package id. After that, update the relevant keys as shown in the demo application's `Info.plist`.

Tested and working on iOS 12.0-17.2

## Additional Utils

This plugin also exports a function `getFreeMBs` which a dev can use to check free space on the current device/app's cache folder which is where picked files get copied to. This is useful when working with larger video files to ensure you have enough free space before picking/copying the video file for use in your app.

## Acknowledgements

This plugin was based on code from [nativescript-mediafilepicker](https://github.com/jibon57/nativescript-mediafilepicker) and [ui-document-picker](https://github.com/nativescript-community/ui-document-picker)

## License

Apache License Version 2.0
