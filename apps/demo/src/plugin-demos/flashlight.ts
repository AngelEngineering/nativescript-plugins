/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { EventData, Page, getViewById, View, Label, Button, TextField } from '@nativescript/core';
import { DemoSharedFlashlight } from '@demo/shared';
import { Flashlight } from '@angelengineering/flashlight';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel(page);
}

export function onLoaded(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext.onLoaded(args);
}

export class DemoModel extends DemoSharedFlashlight {
  protected _page: View = null;
  protected _button: Button = null;
  protected _intensity: TextField = null;
  protected _label: Label = null;

  constructor(page: View) {
    super();
    this._page = page;
  }

  onLoaded(args: any) {
    this._button = getViewById(this._page, 'buttonLight') as Button;
    this._intensity = getViewById(this._page, 'inputIntensity') as TextField;
    this._label = getViewById(this._page, 'labelStatus') as Label;
    this._label.text = Flashlight.isOn ? 'On' : 'Off';
    this._button.text = Flashlight.isOn ? 'Turn off' : 'Turn on';
  }

  toggleLight() {
    try {
      Flashlight.toggle(+this._intensity.text);
    } catch (err) {
      alert(err.message);
    } finally {
      this._label.text = Flashlight.isOn ? 'On' : 'Off';
      this._button.text = Flashlight.isOn ? 'Turn off' : 'Turn on';
    }
  }
}
