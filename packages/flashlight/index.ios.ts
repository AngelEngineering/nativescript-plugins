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
   * @function isAvailable
   * returns: if flashlight is available on this device
   */
  public isAvailable(): boolean {
    return !!this.camera && this.camera.hasTorch && this.camera.isTorchModeSupported(AVCaptureTorchMode.On);
  }

  /**
   * @function isOn
   * returns: if flashlight is currently enabled on this device
   */
  public isOn(): boolean {
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
    if (this._isOn) return true;
    if (!this.isAvailable()) return false;
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
    this._isOn = this.camera.torchMode == AVCaptureTorchMode.On && this.camera.flashMode == AVCaptureFlashMode.On;
    return this._isOn;
  }

  /**
   * @function disable
   * disables flashlight
   * returns: if flashlight is currently enabled on this device
   */
  public disable(): boolean {
    if (this.camera.lockForConfiguration()) {
      this.camera.torchMode = AVCaptureTorchMode.Off;
      this.camera.flashMode = AVCaptureFlashMode.Off;
      this.camera.unlockForConfiguration();
    }
    this._isOn = this.camera.torchMode == AVCaptureTorchMode.On && this.camera.flashMode == AVCaptureFlashMode.On;
    return this._isOn;
  }
}

export const Flashlight = new FlashlightImpl();
