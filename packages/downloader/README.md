# NativeScript Downloader [![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png)]() [![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)]()[![npm](https://img.shields.io/npm/v/@angelengineering/downloader?style=flat-square)](https://www.npmjs.com/package/@angelengineering/downloader)

> @angelengineering/downloader

This downloader plugin exports class _Downloader_ that has a single function `download()`.

For **iOS**, _Downloader_ uses `NSURLSession` to initiate a download from a valid URL.

For **Android**, _Downloader_ uses `DownloadManager` to initiate a download from a valid URL.


## Contents

- [NativeScript Downloader](#nativescript-downloader)
  - [Contents](#contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Supported Downloader Options](#supported-downloader-options)
  - [Android Specifics](#android-specifics)
  - [iOS Specifics](#ios-specifics)
  - [Acknowledgements](#acknowledgements)
  - [License](#license)

## Installation

```bash
npm install @angelengineering/downloader --save
```
OR
```bash
ns plugin add @angelengineering/downloader
```

## Usage

The best way to understand how to use the plugin is to study the demo app included in this repo. You can see how the plugin is used in a TypeScript application page by looking at `apps/demo/src/plugin-demos/downloader.ts`.

1. Import the plugin.

```javascript
import { Downloader, DownloadOptions, MessageData } from '@angelengineering/downloader';
```

2. Create a downloader instance.

```javascript
const dp = new Downloader();
```

3. Download a file. 
```javascript
const dlfile = await dp.download({ url: 'https://some.domain.com/file.txt' });
```
The only required option is the URL to be downloaded. You can also pass other options as listed in [DownloadOptions](#supported-downloader-options) below before starting the download. 

You can listen to events emitted by the download during operation in case you want to update a download status message/indicator or handle an error. Upon success, the plugin will return a File reference to the downloaded file located in the app cache directory for Android and the app document's directory for iOS, which can then be used directly by the dev without extra permissions for any other operations on the file.

```javascript
dp.on(Downloader.DOWNLOAD_STARTED, (payload: MessageData) => {
  console.log('started', payload?.data?.contentLength);
});
dp.on(Downloader.DOWNLOAD_PROGRESS, (payload: MessageData) => {
  console.log(' >>>>>  ', payload?.data?.progress, payload?.data?.url, payload?.data?.destinationFilename);
});
dp.on(Downloader.DOWNLOAD_COMPLETE, (payload: MessageData) => {
  console.log('finished', payload?.data?.filepath);
});
dp.on(Downloader.DOWNLOAD_ERROR, (payload: MessageData) => {
  console.log('ERROR!', payload?.data);
});
dp.download({ url: 'https://some.domain.com/file.txt' }).then((file: File) => {
  if (!file) {
    return console.error('Failed to download file!');
  }
  console.log('Finished downloading file ', file.path);
});
```

## Supported Downloader Options

```javascript
interface DownloadOptions {
  url: string; //must be a valid url, usually https unless you allow http in your app
  request?: RequestOptions; //request header strings to be passed to the https connection
  destinationPath?: string; //must be a valid path for app to create a new file (existing directory with valid filename)
  destinationFilename?: string; //must be a string like XXXX[].[YYYYYY] without any path preceding
  copyPicker?: boolean; //present user with UI to choose destination directory to save a copy of download
  copyGallery?: boolean; //iOS only, if download has a recognized image/video file name extension, save a copy to iOS Photos, ignored on Android
  copyDownloads?: boolean; //Android only, adds a copy to device Downloads directory using legacy DIRECTORY_DOWNLOADS, or MediaStore for 29+
  notification?: boolean; //Android-only. Show system notification for download success/failure. defaults to false
}
```


For both platforms, the plugin will attempt to download the file with the filename/path supplied by the user in options, or try to find a filename to use from the url. In either case, if a file already exists at any of the output paths where a copy is being saved, it will instead append a '-#' to the filename before saving to ensure there is no conflict.

### Android Specifics

Android apps will download files by default to the app's cache directory, which is the only directory supported by DownloadManager and no special permissions are necessary. This will correspond to android.content.Context.getExternalCacheDir() if the device has an sd card, or android.content.Context.getCacheDir() if not. This file can then be used directly for other purposes in the app without any additional permissions/requests.

By default, the plugin disabled Android system notifications of downloads, which also requires you to add that permission to the Android Manifest like so:

```xml
<manifest ... >
  <uses-permission android:name="android.permission.DOWNLOAD_WITHOUT_NOTIFICATION"/>
```

You can choose to enable these notifications which will show the user progress and completion/failure notifications.

Android version of the plugin supports two destination copy approaches:

1. `copyPicker` will first download the file to the default cache directory, and then present the user with a picker UI so that they select where they'd like a copy saved. This approach avoids permission requirements since the user is involved in the destination choice.

2. `copyDownloads` will save a copy to the device's Download directory in case the user wants to use that file in another application from an easy to find location. API versions > 28 use MediaStore, and no extra permissions are necessary. For API versions 28 and below, you'll need to ensure you have Android Manifest permissions defined using:

```xml
<manifest ... >
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"/>
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
```
Tested and working on Android API 25-33.

### iOS Specifics

iOS applications will download files by default to the application's documents directory, which is defined in Nativescript as `knownFolders.documents()` and does not require any extra permissions from the user. This also has the advantage of being the location where an application can make downloaded files visible to other apps once it has been configured as a document provider.


The iOS version of the plugin supports two destination copy approaches: 
1. `copyPicker` will first download the file to the application documents directory, and then present the user with a picker UI so that they can select where they'd like a copy saved. This approach avoids permission requirements since the user is involved in the destination choice. Note: This is only available on iOS 14+

2. `copyGallery` will save a copy to the device's Photos Gallery in case the user wants to use that file in another application from an easy to find location. This approach requires the user to grant photo library permission first in order to save the downloaded file. Your app might be rejected from the Apple App Store if you do not provide a description about why you need this permission. The default message "Requires access to photo library." might not be enough for the App Store reviewers. You can customize it by editing the `app/App_Resources/iOS/Info.plist` file in your app and adding something like the following:

    ```xml
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Requires access to save downloaded media to photo library.</string>
    ```

> **NOTE**: if you do use the perms plugin in a production app, make sure to read their README.md first, as using this plugin in production apps will require you to add all iOS Info.plist permission strings to avoid being rejected by automatic processing since the plugin includes code for all permission types.

Tested and working on iOS 12.x-16.x with caveats noted above. 
## Acknowledgements

This plugin was inspired by https://github.com/tobydeh/nativescript-download-progress

## License

Apache License Version 2.0
