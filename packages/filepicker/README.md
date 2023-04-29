# @angelengineering/filepicker

# Nativescript filepicker ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

This file picker plugin exports function _filePicker()_ that supports both single and multiple selection (for iOS, multiple selection feature depends on OS version) using only native picker approaches.<br>
<br />For **iOS**, _filePicker()_ uses UIDocumentPicker to allow selection from publicly available files that can be accessed via iOS Files app. When selecting from Files, UIDocumentPicker supports multiple selections. <br> <br> iOS also has access to the _galleryPicker()_ function which selects from the iOS Photos Gallery. This picker uses UIImagePicker for iOS 13 and below, which only supports single selections. PHPicker is used for iOS 14+ which does support multiple selections from the Photos Gallery. This picker does require user permission before allowing access to media on iOS.

<br />For **Android**, _filePicker()_ uses Intents to open the stock file picker. For Android 6 (API 23) and above the permissions to read file storage should be explicitly required in AndroidManifest. See demo for implementation details. Note: _galleryPicker()_ will just call _filePicker()_ internally.

```javascript
ns plugin add @angelengineering/filepicker
```

## Usage

The best way to understand how to use the plugin is to look at the demo app included in this repo.
In the `apps/demo` folder you can find the usage of the plugin for TypeScript non-Angular application. Refer to `apps/demo/src/plugin-demos/filepicker.ts`.

<br>

1. Import the plugin. 

```
import { Filepicker, MediaType } from '@angelengineering/filepicker';
```

2. Create a filepicker instance.

```
let picker = new Filepicker();
```

3. Decide which types of files to include, and whether single or multiple selections allowed, then call the file picker.

```
    try {
      pickedFiles = await picker.filePicker(MediaType.IMAGE + MediaType.VIDEO + MediaType.AUDIO, true);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
```
<br><br>
### Android Permissions

To request permissions in the demo app, we use the @nativescript-community [perms plugin](https://github.com/nativescript-community/perms). While this is not required for all OS versions and their system pickers, just to be safe you should request it so user is aware.

Be sure to have permissions add the following lines in AndroidManifest.xml if targeting API 26+.

```
<manifest ... >
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>

  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```

For API 33+, you'll also need to add the following to the Android Manifest as well as request additional permissions:

```
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
<uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />
```

Before launching the picker on API 33+, you'll need to request the following permissions to allow picker access to all file types:

```
request('photo')
request('video')
request('audio')
```

For an example, look at the `pickAll` function inside the `filepicker.ts` file in the dmeo app.

<br><br>
### iOS Permissions

Using the plugin on iOS to select from the Photos gallery with _galleryPicker()_ requires user to grant photo library permission first in order to access the selected image, otherwise it will return without any files. Your app might be rejected from the Apple App Store if you do not provide a description about why you need this permission. The default message "Requires access to photo library." might not be enough for the App Store reviewers. You can customize it by editing the `app/App_Resources/iOS/Info.plist` file in your app and adding the following key:

```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>Requires access to photo library to upload media.</string>
```
<br><br>

> **NOTE**: if you do use the perms plugin in a production app, make sure to read their README.md first, as using this plugin in production apps will require you to add all iOS Info.plist permission strings to avoid being rejected by automatic processing since the plugin includes code for all permission types.

<br>

## Supported Picker File Types

```
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

<br>

## Android

The Android stock file picker also supports selecting files from Google Photos and Google Drive if you have an account signed in on the Android device. Other document provider apps installed on your device may also offer additional services.

<br>

## iOS

The iOS pickers also support selecting files from an associated iCloud account if the user has signed in on the device. Note that for a production application, you'll need to add the iCloud capability to your iOS application, and register that entitlement via the Apple Developer site for that package id. After that, update the relevant keys as shown in the demo application's `Info.plist`.

<br>

## Additional Utils

This plugin also exports a function `getFreeMBs` which a dev can use to check free space on the current device/app's cache folder which is where picked files get copied to. This is useful when working with larger video files to ensure you have enough free space before picking/copying the video file for use in your app.

<br>

## License

Apache License Version 2.0 

<br>

## Acknowledgements
This plugin was based on code from https://github.com/jibon57/nativescript-mediafilepicker and https://github.com/nativescript-community/ui-document-picker
