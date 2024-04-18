import { FlashlightCommon } from './common';

export class FlashlightImpl extends FlashlightCommon {
  private _camera: AVCaptureDevice = null;
  private get camera(): AVCaptureDevice {
    if (!this._camera) {
      this._camera = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo);
    }
    return this._camera;
  }

  /**
   * @property isAvailable
   * @returns if flashlight is available on this device
   */
  public get isAvailable(): boolean {
    return !!this.camera && this.camera.hasTorch && this.camera.isTorchModeSupported(AVCaptureTorchMode.On);
  }

  protected _isOn = false;
  /**
   * @property isOn
   * @returns: if flashlight is currently enabled on this device
   */
  public get isOn(): boolean {
    this._isOn = this.camera.torchMode == AVCaptureTorchMode.On && this.camera.flashMode == AVCaptureFlashMode.On;
    return this._isOn;
  }

  /**
   * Toggles the device flashlight on/off
   * @function toggle
   * @param number between 0.0 and 1.0 (iOS only)
   * @returns if flashlight is currently enabled on this device after toggle
   */
  public toggle(intensity?: number): boolean {
    if (this.isOn) this.disable();
    else this.enable(intensity);
    return this.isOn;
  }

  /**
   * Enables the device flashlight
   * @function enable
   * @param number between 0.0 and 1.0 (iOS only)
   * @returns if flashlight is currently enabled on this device after enabling
   */
  public enable(intensity?: number): boolean {
    if (!this.isAvailable) return false;
    let requestedIntensity = AVCaptureMaxAvailableTorchLevel;
    if (intensity) {
      if (intensity > 0.0 && intensity < 1.0) {
        requestedIntensity = intensity;
      }
    }
    if (this.camera.lockForConfiguration()) {
      this.camera.setTorchModeOnWithLevelError(requestedIntensity);
      this.camera.torchMode = AVCaptureTorchMode.On;
      this.camera.flashMode = AVCaptureFlashMode.On;
      this.camera.unlockForConfiguration();
    }
    return this.isOn;
  }

  /**
   * Disables the device flashlight
   * @function disable
   * @returns if flashlight is currently enabled on this device
   */
  public disable(): boolean {
    if (this.camera.lockForConfiguration()) {
      this.camera.torchMode = AVCaptureTorchMode.Off;
      this.camera.flashMode = AVCaptureFlashMode.Off;
      this.camera.unlockForConfiguration();
    }
    return this.isOn;
  }
}

export const Flashlight = new FlashlightImpl();
