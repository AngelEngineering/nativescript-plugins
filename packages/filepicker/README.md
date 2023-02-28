# @angelengineering/filepicker

# Nativescript filepicker ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

File picker plugin supporting both single and multiple selection (for iOS, multiple selection only supported on iOS 14+) using only native picker approaches.<br>
<br />For **iOS**, the plugin uses UIImagePicker for iOS 13 and below, and PHPicker for iOS 14+.<br>
<br />For **Android**, it uses Intents to open the stock file picker. For Android 6 (API 23) and above the permissions to read file storage should be explicitly required in AndroidManifest. See demo for implementation details.

```javascript
ns plugin add @angelengineering/filepicker
```

## Usage

The best way to explore the usage of the plugin is to inspect the demo app in the plugin repository.
In `apps/demo` folder you can find the usage of the plugin for TypeScript non-Angular application. Refer to `apps/demo/src/plugin-demos/filepicker.ts`.

In short here are the steps:

### Import the plugin

_TypeScript_

```
import { Filepicker, MediaType } from '@angelengineering/filepicker';
```

### Create filepicker instance

_TypeScript_

```
let picker = new Filepicker();
```

### Decide which types of files to include, and whether single or multiple selections allowed

```
    try {
      pickedFiles = await picker.showPicker(MediaType.IMAGE + MediaType.VIDEO, true);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
```

> **NOTE**: To request permissions for Android 6+ (API 23+) in the demo app, we use [perms plugin](https://github.com/nativescript-community/perms).

> **NOTE**: Be sure to have permissions add the following lines in AndroidManifest.xml, although this will be ignored on Android API 32+.

```
<manifest ... >
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>

  <application android:requestLegacyExternalStorage="true" ... >
    ...
  </application>
</manifest>
```

> **NOTE**: Using the plugin on iOS to select from the Photos gallery requires photo library permission. Your app might be rejected from the Apple App Store if you do not provide a description about why you need this permission. The default message "Requires access to photo library." might not be enough for the App Store reviewers. You can customize it by editing the `app/App_Resources/iOS/Info.plist` file in your app and adding the following key:

```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>Requires access to photo library to upload media.</string>
```

## Supported Picker File Types
```
MediaType {
  IMAGE,
  AUDIO,
  VIDEO,
  DOCUMENT,
  ARCHIVE,
  ALL     =>   (IMAGE | AUDIO | VIDEO | DOCUMENT | ARCHIVE)
}
```

## Android 
The Android stock file picker also supports selecting files from Google Photos and Google Drive if you have an account signed in on the Android device.

## iOS
When requesting Image, Video or both on iOS, the user will be presented with a system option dialog asking which source to use, which can either be the iOS Photos Gallery picker, or the iOS Files picker. Otherwise, it will automatically use the iOS Files picker. 

The iOS pickers also support selecting files from an associated iCloud account if the user has signed in on the device. Note that for a production application, you'll need to add the iCloud capability to your iOS application, and register that entitlement via the Apple Developer site for that package id. After that, update the relevant keys as shown in the demo application's `Info.plist`.

## Additional Utils
This plugin also exports a function `getFreeMBs` which a dev can use to check free space on the current device/app's cache folder which is where picked files get copied to. This is useful when working with larger video files to ensure you have enough free space before picking/copying the video file for use in your app. 
## License

Apache License Version 2.0
