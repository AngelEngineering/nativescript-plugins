/* eslint-disable no-unused-vars */
import { FlashlightCommon } from './common';

export declare class FlashlightImpl extends FlashlightCommon {
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
}

export declare const Flashlight: FlashlightImpl;
