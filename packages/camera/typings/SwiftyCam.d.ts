declare const enum CameraSelection {
  Rear = 0,

  Front = 1,
}

declare class PreviewView extends UIView {
  static alloc(): PreviewView; // inherited from NSObject

  static appearance(): PreviewView; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): PreviewView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): PreviewView; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): PreviewView; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): PreviewView; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): PreviewView; // inherited from UIAppearance

  static layerClass(): typeof NSObject;

  static new(): PreviewView; // inherited from NSObject

  session: AVCaptureSession;

  readonly videoPreviewLayer: AVCaptureVideoPreviewLayer;
}

declare const enum SessionSetupResult {
  Success = 0,

  NotAuthorized = 1,

  ConfigurationFailed = 2,
}

declare class SwiftyCamButton extends UIButton {
  static alloc(): SwiftyCamButton; // inherited from NSObject

  static appearance(): SwiftyCamButton; // inherited from UIAppearance

  static appearanceForTraitCollection(trait: UITraitCollection): SwiftyCamButton; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedIn(trait: UITraitCollection, ContainerClass: typeof NSObject): SwiftyCamButton; // inherited from UIAppearance

  static appearanceForTraitCollectionWhenContainedInInstancesOfClasses(trait: UITraitCollection, containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): SwiftyCamButton; // inherited from UIAppearance

  static appearanceWhenContainedIn(ContainerClass: typeof NSObject): SwiftyCamButton; // inherited from UIAppearance

  static appearanceWhenContainedInInstancesOfClasses(containerTypes: NSArray<typeof NSObject> | (typeof NSObject)[]): SwiftyCamButton; // inherited from UIAppearance

  static buttonWithConfigurationPrimaryAction(configuration: UIButtonConfiguration, primaryAction: UIAction): SwiftyCamButton; // inherited from UIButton

  static buttonWithType(buttonType: UIButtonType): SwiftyCamButton; // inherited from UIButton

  static buttonWithTypePrimaryAction(buttonType: UIButtonType, primaryAction: UIAction): SwiftyCamButton; // inherited from UIButton

  static new(): SwiftyCamButton; // inherited from NSObject

  static systemButtonWithImageTargetAction(image: UIImage, target: any, action: string): SwiftyCamButton; // inherited from UIButton

  static systemButtonWithPrimaryAction(primaryAction: UIAction): SwiftyCamButton; // inherited from UIButton

  delegate: SwiftyCamButtonDelegate;

  changeToCircle(): void;

  changeToSquare(): void;
}

interface SwiftyCamButtonDelegate {
  buttonDidBeginLongPress(): void;

  buttonDidEndLongPress(): void;

  buttonWasTapped(): void;

  longPressDidReachMaximumDuration(): void;

  setMaxiumVideoDuration(): number;
}
declare var SwiftyCamButtonDelegate: {
  prototype: SwiftyCamButtonDelegate;
};

declare class SwiftyCamViewController
  extends UIViewController
  implements AVCaptureAudioDataOutputSampleBufferDelegate, AVCaptureVideoDataOutputSampleBufferDelegate, SwiftyCamButtonDelegate, UIGestureRecognizerDelegate
{
  static alloc(): SwiftyCamViewController; // inherited from NSObject

  static deviceWithMediaTypePreferringPosition(mediaType: string, position: AVCaptureDevicePosition): AVCaptureDevice;

  static new(): SwiftyCamViewController; // inherited from NSObject

  allowBackgroundAudio: boolean;

  allowsBackgroundAudio: boolean;

  assetWriter: AVAssetWriter;

  assetWriterAudioInput: AVAssetWriterInput;

  assetWriterVideoInput: AVAssetWriterInput;

  audioDevice: AVCaptureDevice;

  audioInput: AVCaptureDeviceInput;

  audioOutput: AVCaptureAudioDataOutput;

  beginZoomScale: number;

  cameraDelegate: SwiftyCamViewControllerDelegate;

  captureDeviceType: string;

  readonly currentCamera: CameraSelection;

  defaultCamera: CameraSelection;

  defaultCameraLocation: AVCaptureDevicePosition;

  desiredFrameRate: number;

  doubleTapCameraSwitch: boolean;

  flashEnabled: boolean;

  flashView: UIView;

  isAudioEnabled: boolean;

  isCameraTorchOn: boolean;

  readonly isRecording: boolean;

  readonly isSessionRunning: boolean;

  lowLightBoost: boolean;

  maxZoomScale: number;

  maximumVideoDuration: number;

  outputFileDirectory: NSURL;

  photoFileOutput: AVCaptureStillImageOutput;

  pinchToZoom: boolean;

  previewLayer: PreviewView;

  previousPanTranslation: number;

  readonly session: AVCaptureSession;

  setupResult: SessionSetupResult;

  shouldUseDeviceOrientation: boolean;

  swipeToZoom: boolean;

  swipeToZoomInverted: boolean;

  tapToFocus: boolean;

  videoCodecType: string;

  videoDevice: AVCaptureDevice;

  videoInput: AVCaptureDeviceInput;

  videoOutput: AVCaptureVideoDataOutput;

  videoQuality: VideoQuality;

  zoomScale: number;

  readonly debugDescription: string; // inherited from NSObjectProtocol

  readonly description: string; // inherited from NSObjectProtocol

  readonly hash: number; // inherited from NSObjectProtocol

  readonly isProxy: boolean; // inherited from NSObjectProtocol

  readonly superclass: typeof NSObject; // inherited from NSObjectProtocol

  readonly; // inherited from NSObjectProtocol

  buttonDidBeginLongPress(): void;

  buttonDidEndLongPress(): void;

  buttonWasTapped(): void;

  cancelVideoRecording(): void;

  captureOutputDidDropSampleBufferFromConnection(output: AVCaptureOutput, sampleBuffer: any, connection: AVCaptureConnection): void;

  captureOutputDidOutputSampleBufferFromConnection(output: AVCaptureOutput, sampleBuffer: any, connection: AVCaptureConnection): void;

  capturePhotoAsyncronouslyWithCompletionHandler(completionHandler: (p1: boolean) => void): void;

  changeFlashSettingsWithDeviceMode(device: AVCaptureDevice, mode: AVCaptureFlashMode): void;

  class(): typeof NSObject;

  configureSessionQuality(): void;

  conformsToProtocol(aProtocol: any /* Protocol */): boolean;

  deviceDidRotate(): void;

  didFailToProcessVideo(error: NSError): void;

  didFinishProcessingVideoAt(url: NSURL): void;

  disableFlash(): void;

  enableFlash(): void;

  executeAsync(closure: () => void): void;

  executeSyncWithClosure(closure: () => void): void;

  gestureRecognizerShouldBeRequiredToFailByGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

  gestureRecognizerShouldBegin(gestureRecognizer: UIGestureRecognizer): boolean;

  gestureRecognizerShouldReceiveEvent(gestureRecognizer: UIGestureRecognizer, event: _UIEvent): boolean;

  gestureRecognizerShouldReceivePress(gestureRecognizer: UIGestureRecognizer, press: UIPress): boolean;

  gestureRecognizerShouldReceiveTouch(gestureRecognizer: UIGestureRecognizer, touch: UITouch): boolean;

  gestureRecognizerShouldRecognizeSimultaneouslyWithGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

  gestureRecognizerShouldRequireFailureOfGestureRecognizer(gestureRecognizer: UIGestureRecognizer, otherGestureRecognizer: UIGestureRecognizer): boolean;

  getImageOrientationForCamera(forCamera: CameraSelection): UIImageOrientation;

  getPreviewLayerOrientation(): AVCaptureVideoOrientation;

  getVideoOrientation(): AVCaptureVideoOrientation;

  handleApplicationDidBecomeActive(notification: NSNotification): void;

  handleApplicationWillResignActive(notification: NSNotification): void;

  handleSessionDidStartRunning(notification: NSNotification): void;

  handleSessionInterruptionEnded(notification: NSNotification): void;

  handleSessionRuntimeError(notification: NSNotification): void;

  handleSessionWasInterrupted(notification: NSNotification): void;

  isEqual(object: any): boolean;

  isKindOfClass(aClass: typeof NSObject): boolean;

  isMemberOfClass(aClass: typeof NSObject): boolean;

  longPressDidReachMaximumDuration(): void;

  performSelector(aSelector: string): any;

  performSelectorWithObject(aSelector: string, object: any): any;

  performSelectorWithObjectWithObject(aSelector: string, object1: any, object2: any): any;

  processPhoto(imageData: NSData): UIImage;

  promptToAppSettings(): void;

  respondsToSelector(aSelector: string): boolean;

  retainCount(): number;

  self(): this;

  setBackgroundAudioPreference(): void;

  setMaxiumVideoDuration(): number;

  startVideoRecording(): void;

  stopVideoRecording(): void;

  subscribeToDeviceOrientationChangeNotifications(): void;

  switchCamera(): void;

  takePhoto(): void;

  toggleFlash(): void;

  unsubscribeFromDeviceOrientationChangeNotifications(): void;

  videoInputPresetFromVideoQualityWithQuality(quality: VideoQuality): string;
}

interface SwiftyCamViewControllerDelegate {
  swiftyCamDidBeginRecordingVideo(swiftyCam: SwiftyCamViewController, camera: CameraSelection): void;

  swiftyCamDidChangeZoomLevel(swiftyCam: SwiftyCamViewController, zoom: number): void;

  swiftyCamDidFinishProcessVideoAt(swiftyCam: SwiftyCamViewController, url: NSURL): void;

  swiftyCamDidFinishRecordingVideo(swiftyCam: SwiftyCamViewController, camera: CameraSelection): void;

  swiftyCamDidFocusAtPoint(swiftyCam: SwiftyCamViewController, point: CGPoint): void;

  swiftyCamDidSwitchCurrentCamera(swiftyCam: SwiftyCamViewController, camera: CameraSelection): void;

  swiftyCamDidTake(swiftyCam: SwiftyCamViewController, photo: UIImage): void;
}
declare var SwiftyCamViewControllerDelegate: {
  prototype: SwiftyCamViewControllerDelegate;
};

declare const enum VideoQuality {
  High = 0,

  Medium = 1,

  Low = 2,

  Resolution352x288 = 3,

  Resolution640x480 = 4,

  Resolution1280x720 = 5,

  Resolution1920x1080 = 6,

  Resolution3840x2160 = 7,

  Iframe960x540 = 8,

  Iframe1280x720 = 9,
}
