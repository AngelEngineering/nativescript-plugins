# @angelengineering/flashlight

# Nativescript flashlight ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

This plugin allows you to enable/disable the flashlight/torch on your iOS/Android device.

```javascript
ns plugin add @angelengineering/flashlight
```

## Usage

The best way to explore the usage of the plugin is to inspect the demo app in the plugin repository.
In `apps/demo` folder you can find the usage of the plugin for TypeScript non-Angular application. Refer to `apps/demo/src/plugin-demos/flashlight.ts`.

In short here are the steps:

### Import the plugin

_TypeScript_

```
import { Flashlight } from '@angelengineering/flashlight';
```

### Use the plugin

```
Flashlight.enable();
Flashlight.disable();
```
### Exposed properties
_TypeScript_

```
 /**
   * @property isAvailable
   * returns: if flashlight is available on this device
   */
  public isAvailable: boolean;

  /**
   * @property isOn
   * returns: if flashlight is currently enabled on this device
   */
  public isOn: boolean;

  /**
   * @function toggle
   * toggles flashlight on/off
   * returns: if flashlight is currently enabled on this device
   */
  public toggle(intensity?: number): boolean;

  /**
   * @function enable
   * enables flashlight
   * returns: if flashlight is currently enabled on this device
   */
  public enable(intensity?: number): boolean;

  /**
   * @function disable
   * disables flashlight
   * returns: if flashlight is currently enabled on this device
   */
  public disable(): boolean;
```



## Important Note
In general, this util should not be used when an application is using the camera ( video preview, photo taking, video recording, etc. ) as it will throw an error trying to control the flashlight at the same time that the camera hardware is active. 

## License

Apache License Version 2.0
