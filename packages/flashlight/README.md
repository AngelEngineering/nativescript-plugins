# @angelengineering/flashlight

# Nativescript Flashlight ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@angelengineering/flashlight?style=flat-square)](https://www.npmjs.com/package/@angelengineering/flashlight)


This plugin allows you to enable/disable the flashlight/torch on your iOS/Android device. Note: This will fail if the current device camera is already in use. 

## Contents

- [NativeScript Flashlight](#flashlight)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Exposed Properties and Methods](#exposed-properties-and-methods)


## Installation

```bash
npm install @angelengineering/flashlight --save
```

OR 

```bash
ns plugin add @angelengineering/flashlight
```

## Usage

The best way to explore the usage of the plugin is to inspect the demo app in the plugin repository.
In `apps/demo` folder you can find the usage of the plugin for TypeScript non-Angular application. Refer to `apps/demo/src/plugin-demos/flashlight.ts`.

In short here are the steps:

### Import the plugin

_TypeScript_

``` javascript
import { Flashlight } from '@angelengineering/flashlight';
```

### Use the plugin

``` javascript
Flashlight.enable();
Flashlight.disable();
```

## Exposed Properties and Methods
_TypeScript_

``` javascript
 /**
   * @property isAvailable
   * @returns if flashlight is available on this device
   */
  public isAvailable: boolean;

  /**
   * @property isOn
   * @returns: if flashlight is currently enabled on this device
   */
  public isOn: boolean;

  /**
   * Toggles the device flashlight on/off
   * @function toggle
   * @param number between 0.0 and 1.0 (iOS only)
   * @returns if flashlight is currently enabled on this device after toggle
   */
  public toggle(intensity?: number): boolean;

  /**
   * Enables the device flashlight
   * @function enable
   * @param number between 0.0 and 1.0 (iOS only)
   * @returns if flashlight is currently enabled on this device after enabling
   */
  public enable(intensity?: number): boolean;

  /**
   * Disables the device flashlight
   * @function disable
   * @returns if flashlight is currently enabled on this device
   */
  public disable(): boolean;
```



## Important Note
This util can not be used when an application is using the camera ( video preview, photo taking, video recording, etc. ) as it will throw an error when trying to control the flashlight while camera hardware is actively being used. 

iOS supports setting an intensity by passing a number between 0.0 - 1.0 when enabling or toggling the flashlight to active. 

## License

Apache License Version 2.0
