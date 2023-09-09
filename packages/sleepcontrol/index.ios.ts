//NOTE: this only works while the current app is running
export function isSleepAllowed(): boolean {
  const app = UIApplication.sharedApplication;
  return !app.idleTimerDisabled;
}

export function denySleep(): void {
  const app = UIApplication.sharedApplication;
  if (!app.idleTimerDisabled) {
    app.idleTimerDisabled = true;
  }
}

export function allowSleep(): void {
  const app = UIApplication.sharedApplication;
  if (app.idleTimerDisabled) {
    app.idleTimerDisabled = false;
  }
}
