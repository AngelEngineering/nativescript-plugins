import { FlashlightCommon } from './common';
import { Utils, Device } from '@nativescript/core';

export class FlashlightImpl extends FlashlightCommon {
  private _cameraManager: android.hardware.camera2.CameraManager;
  private get cameraManager(): android.hardware.camera2.CameraManager {
    if (!this._cameraManager) {
      const appContext = Utils.android.getApplicationContext();
      this._cameraManager = appContext.getSystemService(android.content.Context.CAMERA_SERVICE);
    }
    return this._cameraManager;
  }

  private _parameters: any;
  private get parameters(): any {
    if (!this._parameters) {
      this._parameters = this._camera.getParameters();
    }
    return this._parameters;
  }

  private _camera: any = null;
  private get camera(): any {
    if (!this._camera) {
      if (+Device.sdkVersion > 20) {
        this._camera = this.cameraManager.getCameraIdList()[0];
      } else {
        this._camera = android.hardware.Camera.open(0);
      }
    }
    return this._camera;
  }

  /**
   * @function isAvailable
   * returns: if flashlight is available on this device
   */
  public isAvailable(): boolean {
    const packageManager = Utils.android.getApplicationContext().getPackageManager();
    return packageManager.hasSystemFeature(android.content.pm.PackageManager.FEATURE_CAMERA_FLASH);
  }

  /**
   * @function isOn
   * returns: if flashlight is currently enabled on this device
   */
  public get isOn(): boolean {
    return this._isOn;
  }

  /**
   * @function toggle
   * toggles flashlight on/off
   * returns: if flashlight is currently enabled on this device
   */
  public toggle(intensity?: number): boolean {
    if (this._isOn) this.disable();
    else this.enable(intensity);
    return this._isOn;
  }

  /**
   * @function enable
   * enables flashlight
   * returns: if flashlight is currently enabled on this device
   */
  public enable(intensity?: number): boolean {
    //TODO: Add intensity support for Android
    //  https://source.android.com/docs/core/camera/torch-strength-control
    //  intensity is only supported on Android 13 devices via turnOnTorchWithStrengthLevel()
    if (this._isOn) return true;
    if (!this.isAvailable()) return false;
    try {
      if (+Device.sdkVersion > 20) {
        // if (+Device.sdkVersion >= 33 && intensity) {
        //     const cameraCharacteristics: globalAndroid.hardware.camera2.CameraCharacteristics = this.cameraManager.getCameraCharacteristics(this.camera);
        // } else
        this.cameraManager.setTorchMode(this.camera, true);
      } else {
        this.parameters.setFlashMode(android.hardware.Camera.Parameters.FLASH_MODE_TORCH);
        this.camera.setParameters(this.parameters);
        this.camera.startPreview();
      }
      this._isOn = true;
    } catch (err) {
      console.error(err);
      throw new Error('Failed to enable flashlight');
    }
    return this._isOn;
  }

  /**
   * @function disable
   * disables flashlight
   * returns: if flashlight is currently enabled on this device
   */
  public disable(): boolean {
    if (!this._isOn) return false;
    try {
      if (+Device.sdkVersion > 20) {
        this.cameraManager.setTorchMode(this.camera, false);
      } else {
        this.parameters.setFlashMode(this.camera.Parameters.FLASH_MODE_OFF);
        this.camera.setParameters(this.parameters);
        this.camera.stopPreview();
        this.camera.release();
      }
      this._isOn = false;
    } catch (err) {
      throw new Error('Failed to disable flashlight');
    }
    return this._isOn;
  }
}

export const Flashlight = new FlashlightImpl();
