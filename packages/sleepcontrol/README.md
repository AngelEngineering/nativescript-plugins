# @angelengineering/sleepcontrol

# Nativescript sleepcontrol ![apple](https://cdn3.iconfinder.com/data/icons/picons-social/57/16-apple-32.png) ![android](https://cdn4.iconfinder.com/data/icons/logos-3/228/android-32.png)

This plugin allows you to keep your device awake while the current app is running, or allow it to sleep while the current app is running. This will not affect other apps, and the screen will be prevented from sleep only while the current application is running. 


```javascript
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

```
allowSleep();
denySleep();
```
### Exposed properties
```
export function isSleepAllowed(): boolean;
export function denySleep(): void;
export function allowSleep(): void;
```


## License

Apache License Version 2.0
