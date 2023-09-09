import { Application } from '@nativescript/core';

//NOTE: this only works while the current app is running
export function isSleepAllowed(): boolean {
  const activity = Application.android.foregroundActivity || Application.android.startActivity;
  if (activity) {
    const window = activity.getWindow();
    const flags: number = window.getAttributes().flags;
    return (flags & android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON) == 0;
  } else return false;
}

export function denySleep(): void {
  const activity = Application.android.foregroundActivity || Application.android.startActivity;
  if (activity) {
    keepAwake(activity);
  } else {
    Application.android.once('activityStarted', () => this.keepAwake(activity));
  }
}

export function allowSleep(): void {
  const activity = Application.android.foregroundActivity || Application.android.startActivity;
  if (activity) {
    const window = activity.getWindow();
    window.clearFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
  }
}

function keepAwake(activity: androidx.appcompat.app.AppCompatActivity) {
  const window = activity.getWindow();
  window.addFlags(android.view.WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
}
