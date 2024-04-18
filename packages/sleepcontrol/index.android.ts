import { Application } from '@nativescript/core';

/**
 * Check if the current device can go into sleep mode after the current system idle time limit. Use denySleep() to disable sleep, and allowSleep() to enable sleep.
 * @function isSleepAllowed
 * @returns true if sleep is allowed, false if not
 */
export function isSleepAllowed(): boolean {
  const activity = Application.android.foregroundActivity || Application.android.startActivity;
  if (activity) {
    const window = activity.getWindow();
    const flags: number = window.getAttributes().flags;
    return (flags & android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON) == 0;
  } else return false;
}

/**
 * Disable device sleep mode
 * @function denySleep
 */
export function denySleep(): void {
  const activity = Application.android.foregroundActivity || Application.android.startActivity;
  if (activity) {
    keepAwake(activity);
  } else {
    Application.android.once('activityStarted', () => this.keepAwake(activity));
  }
}

/**
 * Enable device sleep mode
 * @function allowSleep
 */
export function allowSleep(): void {
  const activity = Application.android.foregroundActivity || Application.android.startActivity;
  if (activity) {
    const window = activity.getWindow();
    window.clearFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
  }
}

/**
 * Internal function to modify Android setting for sleep mode
 * @param activity
 */
function keepAwake(activity: androidx.appcompat.app.AppCompatActivity) {
  const window = activity.getWindow();
  window.addFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
}
