import { FlashlightCommon } from './common';

export declare class FlashlightImpl extends FlashlightCommon {
  /**
   * @function isAvailable
   * returns: if flashlight is available on this device
   */
  public isAvailable(): boolean;

  /**
   * @function isOn
   * returns: if flashlight is currently enabled on this device
   */
  public isOn(): boolean;

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
}

export declare const Flashlight: FlashlightImpl;
