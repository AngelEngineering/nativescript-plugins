# @angelengineering/audio-player

# Nativescript audio player ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

This plugin provides an audio player for Android and iOS that supports playback of both local files and remote URL audio files. 


NOTE: If you try to play an HTTP URL, you'll also need to make some adjustments to your application to allow unsecure connections or audio URL loading will fail. 
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

## Installation

```javascript
ns plugin add @angelengineering/audio-player
```

## Usage



## License

Apache License Version 2.0
