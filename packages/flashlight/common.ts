import { Observable } from '@nativescript/core';

export class FlashlightCommon extends Observable {
  protected _isOn = false;

  constructor() {
    super();
    this._isOn = false;
  }
}
