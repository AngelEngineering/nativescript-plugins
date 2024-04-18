# @angelengineering/sleepcontrol

# Nativescript Sleepcontrol ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

[![npm](https://img.shields.io/npm/v/@angelengineering/sleepcontrol?style=flat-square)](https://www.npmjs.com/package/@angelengineering/sleepcontrol)

This plugin allows you to keep your device awake while the current app is running, or allow it to sleep while the current app is running. This will not affect other apps, and the screen will be prevented from sleep only while the current application is running. 


## Contents

- [NativeScript SleepControl](#sleepcontrol)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Exposed Functions](#exposed-functions)


## Installation

```bash
npm install @angelengineering/sleepcontrol --save
```

OR 

```bash
ns plugin add @angelengineering/sleepcontrol
```


## Usage

The best way to explore the usage of the plugin is to inspect the demo app in the plugin repository.
In `apps/demo` folder you can find the usage of the plugin for TypeScript non-Angular application. Refer to `apps/demo/src/plugin-demos/sleepcontrol.ts`.

In short here are the steps:

### Import the plugin functions

_TypeScript_

```
import { allowSleep, denySleep, isSleepAllowed } from '@angelengineering/sleepcontrol';
```

### Use the plugin

``` javascript
allowSleep();
if (isSleepAllowed()) console.log("success!")

denySleep();
if (!isSleepAllowed()) console.log("success!")
```

## Exposed functions
```
/**
 * Check if the current device can go into sleep mode after the current system idle time limit. Use denySleep() to disable sleep, and allowSleep() to enable sleep.
 * @function isSleepAllowed
 * @returns true if sleep is allowed, false if not
 */
export function isSleepAllowed(): boolean;

/**
 * Disable device sleep mode
 * @function denySleep
 */
export function denySleep(): void;

/**
 * Enable device sleep mode
 * @function allowSleep
 */
export function allowSleep(): void;
```


## License

Apache License Version 2.0
