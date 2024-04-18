/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { EventData, Page, getViewById, View, Label, Button } from '@nativescript/core';
import { DemoSharedSleepcontrol } from '@demo/shared';
import { allowSleep, denySleep, isSleepAllowed } from '@angelengineering/sleepcontrol';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel(page);
}

export function onLoaded(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext.onLoaded(args);
}

export class DemoModel extends DemoSharedSleepcontrol {
  protected _page: View = null;
  protected _button: Button = null;
  protected _label: Label = null;

  constructor(page: View) {
    super();
    this._page = page;
  }

  onLoaded(args: any) {
    this._button = getViewById(this._page, 'buttonSleep') as Button;
    this._label = getViewById(this._page, 'labelStatus') as Label;
    this._label.text = isSleepAllowed() ? 'Can Sleep' : 'Awake';
    this._button.text = isSleepAllowed() ? 'Keep Awake' : 'Allow Sleep';
  }

  toggleSleep() {
    try {
      if (isSleepAllowed()) {
        denySleep();
      } else {
        allowSleep();
      }
    } catch (err) {
      alert(err.message);
    } finally {
      this._label.text = isSleepAllowed() ? 'Can Sleep' : 'Awake';
      this._button.text = isSleepAllowed() ? 'Keep Awake' : 'Allow Sleep';
    }
  }
}
