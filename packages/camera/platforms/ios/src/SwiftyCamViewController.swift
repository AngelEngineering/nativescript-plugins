/* Copyright (c) 2016, Andrew Walz
  2023 VoiceThread - Angel Dominguez
  2024, Angel Engineering - Angel Dominguez

 Redistribution and use in source and binary forms, with or without modification,are permitted provided that the following conditions are met:
 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.
 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS
 BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
 LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import AVFoundation
import UIKit

// MARK: View Controller Declaration

/// UIViewController Camera View Subclass

@objc open class SwiftyCamViewController: UIViewController, AVCapturePhotoCaptureDelegate {
  // MARK: Enumeration Declarations

  /// Enumeration for Camera Selection
  @objc public enum CameraSelection: Int {
    /// Camera on the back of the device
    case rear
    /// Camera on the front of the device
    case front
  }

  /// Enumeration for video quality of the capture session. Corresponds to a AVCaptureSessionPreset
  @objc public enum VideoQuality: Int {
    /// AVCaptureSessionPresetHigh
    case high
    /// AVCaptureSessionPresetMedium
    case medium
    /// AVCaptureSessionPresetLow
    case low
    /// AVCaptureSessionPreset352x288
    case resolution352x288
    /// AVCaptureSessionPreset640x480
    case resolution640x480
    /// AVCaptureSessionPreset1280x720
    case resolution1280x720
    /// AVCaptureSessionPreset1920x1080
    case resolution1920x1080
    /// AVCaptureSessionPreset3840x2160
    case resolution3840x2160
    /// AVCaptureSessionPresetiFrame960x540
    case iframe960x540
    /// AVCaptureSessionPresetiFrame1280x720
    case iframe1280x720
  }

  /**
     Result from the AVCaptureSession Setup
     - success: success
     - notAuthorized: User denied access to Camera of Microphone
     - configurationFailed: Unknown error
     */
  @objc public enum SessionSetupResult: Int {
    case success
    case notAuthorized
    case configurationFailed
  }

  // MARK: Public Variable Declarations

  /// Public Camera Delegate for the Custom View Controller Subclass
  @objc public var cameraDelegate: SwiftyCamViewControllerDelegate?

  /// Maxiumum video duration if SwiftyCamButton is used
  @objc public var maximumVideoDuration: Double = 0.0

  /// Video capture quality
  @objc public var videoQuality: VideoQuality = .high

  // TODO: not implemented yet, uses device suggested video format
  // default to h264 for greater compatibility
  @objc public var videoCodecType: AVVideoCodecType = .h264
  // AVVideoCodecType.hevc

  /// Sets whether flash is enabled for photo and video capture
  @objc public var flashEnabled: Bool = false

  /// Sets whether Pinch to Zoom is enabled for the capture session
  @objc public var pinchToZoom: Bool = true

  /// Sets the maximum zoom scale allowed during gestures gesture
  @objc public var maxZoomScale: CGFloat = .greatestFiniteMagnitude

  /// Sets whether Tap to Focus and Tap to Adjust Exposure is enabled for the capture session
  @objc public var tapToFocus: Bool = true

  /// Sets whether the capture session should adjust to low light conditions automatically
  /// Note: Only supported on iPhone 5 and 5C
  @objc public var lowLightBoost: Bool = true

  /// Set whether SwiftyCam should allow background audio from other applications
  @objc public var allowBackgroundAudio: Bool = false

  /// Sets whether a double tap to switch cameras is supported
  @objc public var doubleTapCameraSwitch: Bool = true

  /// Sets whether swipe vertically to zoom is supported
  @objc public var swipeToZoom: Bool = false

  /// Sets whether swipe vertically gestures should be inverted
  @objc public var swipeToZoomInverted: Bool = false

  /// Set default launch camera
  @objc public var defaultCamera: SwiftyCamViewController.CameraSelection = CameraSelection.rear

  /// Sets wether the taken photo or video should be oriented according to the device orientation
  @objc public var shouldUseDeviceOrientation: Bool = true

  // MARK: Public Get-only Variable Declarations

  /// Returns true if the capture session is currently running
  @objc public var isSessionRunning: Bool { return session.isRunning }

  /// Returns the CameraSelection corresponding to the currently utilized camera
  @objc public private(set) var currentCamera: SwiftyCamViewController.CameraSelection =
    CameraSelection.rear

  // MARK: Private Constant Declarations

  /// Current Capture Session
  @objc public let session: AVCaptureSession = .init()

  /// Serial queue used for setting up session
  @objc public let sessionQueue: DispatchQueue = .init(
    label: "session queue", attributes: [])

  // MARK: Private Variable Declarations

  private var enableVideo: Bool = false

  /// Variable for storing current zoom scale
  @objc public var zoomScale: CGFloat = .init(1.0)

  /// Variable for storing initial zoom scale before Pinch to Zoom begins
  @objc public var beginZoomScale: CGFloat = .init(1.0)

  /// Returns true if the torch (flash) is currently enabled
  @objc public var isCameraTorchOn: Bool = false

  /// Variable to store result of capture session setup
  @objc public var setupResult: SwiftyCamViewController.SessionSetupResult = SessionSetupResult
    .success

  /// BackgroundID variable for video recording
  // Note: the UIBackgroundTaskIdentifier can't be converted to objc
  public var backgroundRecordingID: UIBackgroundTaskIdentifier? = nil

  /// Video Input/Output variables
  @objc public var videoInput: AVCaptureDeviceInput!
  @objc public var videoOutput: AVCaptureVideoDataOutput?

  // SwiftyCam variables start
  @objc public var audioInput: AVCaptureDeviceInput?
  @objc public var audioOutput: AVCaptureAudioDataOutput?
  @objc public var assetWriter: AVAssetWriter?
  @objc public var assetWriterVideoInput: AVAssetWriterInput?
  @objc public var assetWriterAudioInput: AVAssetWriterInput?

  /// Sets default camera location on initial start
  @objc public var defaultCameraLocation: AVCaptureDevice.Position = .back {
    didSet {
      if !isSessionRunning {
        cameraLocation = defaultCameraLocation
      }
    }
  }

  //
  @objc public var captureDeviceType: AVCaptureDevice.DeviceType =
    .builtInWideAngleCamera

  // Sets whether or not video recordings will record audio
  @objc public var isAudioEnabled: Bool = true

  // Directory used for uploading files Directoy
  @objc public var outputFileDirectory: URL = FileManager.default.temporaryDirectory

  /// Desired number of frame per secon. SwiftyCam will adjust the frame rate only when system is under pressure.
  @objc public var desiredFrameRate: Int = 30 {
    didSet {
      configureFrameRate()
    }
  }

  // Returns true if video is currently being recorded
  @objc public var isRecording: Bool {
    return didStartWritingSession
  }

  // allow background audio from other applications to continue playing during capture
  @objc public var allowsBackgroundAudio: Bool = true

  // SwiftyCam variables end

  /// Photo File Output variable
  @objc public var photoFileOutput: AVCapturePhotoOutput?

  /// Video Device variable
  @objc public var videoDevice: AVCaptureDevice?

  /// Audio Device variable
  @objc public var audioDevice: AVCaptureDevice?

  /// PreviewView for the capture session
  @objc public var previewLayer: PreviewView!

  /// UIView for front facing flash
  @objc public var flashView: UIView?

  /// Pan Translation
  @objc public var previousPanTranslation: CGFloat = 0.0

  /// Last changed orientation
  public var deviceOrientation: UIDeviceOrientation?

  /// Disable view autorotation for forced portrait recording
  @objc override open var shouldAutorotate: Bool {
    return true
  }

  // SwiftyCam variables start
  private let sessionPrimaryQueueIdentifier: String = "ASCamera_sessionPrimaryQueue"
  private let sessionPrimaryQueueSpecificKey: DispatchSpecificKey<Void> = .init()

  // Serial queue used for setting up session
  private var sessionPrimaryQueue: DispatchQueue

  //
  private let sessionSecondaryQueueIdentifier: String = "ASCamera_sessionSecondaryQueue"
  private let sessionSecondaryQueueSpecificKey: DispatchSpecificKey<Void> = .init()

  // Serial queue used for setting up session
  private var sessionSecondaryQueue: DispatchQueue

  // Variable
  private var lastZoomScale: CGFloat = .init(1.0)

  private var isSwitchingCameras: Bool = false

  // BackgroundID variable for video recording
  private var backgroundTaskID: UIBackgroundTaskIdentifier.RawValue.IntegerLiteralType?
  //
  private var didStartWritingSession: Bool = false
  //
  private var systemObserver: NSKeyValueObservation?
  //
  private var assetWriterInputPixelBufferAdaptor: AVAssetWriterInputPixelBufferAdaptor?
  //
  private var previousPresentationTimeStamp: CMTime = .zero
  //
  private var startingPresentationTimeStamp: CMTime = .zero
  //
  private var frameRate: Int = 0
  //
  private var frameCount: Int = 0
  //
  private var shouldCapturePhotoFromDataOutput: Bool = false
  //
  private var willStartWritingSession: Bool = false
  //
  private(set) var shouldStartWritingSession: Bool = false
  //
  private var lastVideoSampleDate: Date = .init()

  // Returns the current camera being used.
  public private(set) var cameraLocation: AVCaptureDevice.Position = .back
  //
  public private(set) var recordingDuration: Double = 0.0

  // SwiftyCam variables end

  // SwiftyCam functions

  public init() {
    self.sessionPrimaryQueue = DispatchQueue(
      label: sessionPrimaryQueueIdentifier, qos: .userInitiated, target: DispatchQueue.global())
    self.sessionSecondaryQueue = DispatchQueue(
      label: sessionSecondaryQueueIdentifier, qos: .utility, target: DispatchQueue.global())

    super.init(nibName: nil, bundle: nil)

    addApplicationObservers()
    addSessionObservers()
    if #available(iOS 11.1, *) {
      self.addSystemObervers()
    } else {
      NSLog("[SwiftyCam]: iOS 11.1+ required for observers")
    }

    sessionPrimaryQueue.setSpecific(key: sessionPrimaryQueueSpecificKey, value: ())
    sessionSecondaryQueue.setSpecific(key: sessionSecondaryQueueSpecificKey, value: ())

    session.automaticallyConfiguresApplicationAudioSession = false
  }

  @available(*, unavailable)
  public required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  deinit {
    if self.session.isRunning {
      self.session.stopRunning()
    }
    removeApplicationObservers()
    removeSessionObservers()
    removeSystemObservers()
  }

  /// ViewDidLoad Implementation

  @objc override open func viewDidLoad() {
    super.viewDidLoad()
    previewLayer = PreviewView(
      frame: CGRect(x: 0.0, y: 0.0, width: view.bounds.width, height: view.bounds.height))

    // Add Gesture Recognizers
    addGestureRecognizersTo(view: previewLayer)

    view.addSubview(previewLayer)
    previewLayer.session = session

    sessionQueue.async { [unowned self] in
      self.configureSession()
    }
  }

  // MARK: ViewDidLayoutSubviews

  /// ViewDidLayoutSubviews() Implementation
  @objc override open func viewDidLayoutSubviews() {
    previewLayer.frame = CGRect(
      x: 0.0, y: 0.0, width: view.bounds.width, height: view.bounds.height)
    super.viewDidLayoutSubviews()
    DispatchQueue.main.async {
      self.previewLayer.videoPreviewLayer.connection?.videoOrientation =
        self.getPreviewLayerOrientation()
    }
  }

  // MARK: ViewDidAppear

  @objc override open func viewDidAppear(_ animated: Bool) {
    sessionQueue.async {
      switch self.setupResult {
      case .success:
        // Begin Session
        self.session.startRunning()

        // Preview layer video orientation can be set only after the connection is created
        DispatchQueue.main.async {
          self.previewLayer.videoPreviewLayer.connection?.videoOrientation =
            self.getPreviewLayerOrientation()
        }
        super.viewDidAppear(animated)

        // Subscribe to device rotation notifications
        if self.shouldUseDeviceOrientation {
          self.subscribeToDeviceOrientationChangeNotifications()
        }

        // Set background audio preference
        self.setBackgroundAudioPreference()

      case .notAuthorized:
        // Prompt to App Settings
        // NSLog("[SwiftyCam]: Not Authorized!, Sending error and showing alert!")
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self, didError: "No permissions granted, requesting from user")
        }
        self.promptToAppSettings()
      case .configurationFailed:
        // Unknown Error
        // NSLog(
        //   "[SwiftyCam]: Unknown error while checking permissions, Sending error and showing alert!")
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self, didError: "Unknown error while checking permissions to use the camera")
        }
        DispatchQueue.main.async { [unowned self] in
          let message: String = NSLocalizedString(
            "Unable to capture media",
            comment: "Alert message when something goes wrong during capture session configuration")
          let alertController = UIAlertController(
            title: "AVCam", message: message, preferredStyle: .alert)
          alertController.addAction(
            UIAlertAction(
              title: NSLocalizedString("OK", comment: "Alert OK button"), style: .cancel,
              handler: nil))
          self.present(alertController, animated: true, completion: nil)
        }
      }
    }
  }

  // MARK: ViewDidDisappear

  /// ViewDidDisappear(_ animated:) Implementation
  @objc override open func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(animated)

    // If session is running, stop the session
    if isSessionRunning == true {
      session.stopRunning()
    }

    // Disble flash if it is currently enabled
    disableFlash()

    // Unsubscribe from device rotation notifications
    if shouldUseDeviceOrientation {
      unsubscribeFromDeviceOrientationChangeNotifications()
    }
  }

  // MARK: Public Functions

  @objc public func getEnableVideo() -> Bool {
    return enableVideo
  }

  @objc public func setEnableVideo(value: Bool) {
    guard let device: AVCaptureDevice = videoDevice else {
      NSLog("!!!!   NO Camera Device setup yet!!!!! Saving preference for when inited")
      enableVideo = value
      return
    }

    if enableVideo != value {
      if !value && isRecording {
        NSLog("currently recording, cannot change to photo mode")
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self, didError: "setEnableVideo() currently recording, cannot change to photo mode")
        }
      } else {
        enableVideo = value

        if value {
          // NSLog("Changing to Video mode")
          session.beginConfiguration()
          configureSessionQuality()
          session.commitConfiguration()
        } else {
          // NSLog("Changing to Photo mode")
          session.beginConfiguration()
          configureSessionQuality()
          session.commitConfiguration()
        }
      }
    } else {
      // NSLog("Same value for enableVideo, ignoring")
    }
  }

  /**
       Capture photo from current session
       UIImage will be returned with the SwiftyCamViewControllerDelegate function SwiftyCamDidTakePhoto(photo
     */
  @objc public func takePhoto() {
    guard let device: AVCaptureDevice = videoDevice else {
      NSLog("!!!!   NO Camera Device to capture from!!!!!")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self, didError: "takePhoto()  NO Camera Device to capture from!")
      }
      return
    }
    // make sure we're in the right mode
    if enableVideo {
      NSLog("!!!!   Not in photo mode, cannot capture photo!!!!!")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self, didError: "startVideoRecording()  Not in photo mode, cannot capture photo!")
      }
      return
    }
    // This should work for rear-cameras that have a real flash. For front-cameras on devices 6s or newer,
    //    iOS will use a Retina Flash mode which will increase the brightness of the display briefly to simulate
    //    flash lighting.
    if device.hasFlash == true
      && flashEnabled == true
    {
      changeFlashSettings(device: device, mode: .on)
      capturePhotoAsyncronously(completionHandler: { _ in })
    }  // emulate retina flash by showing a white screen for front-camera pics for devices older than 6s without retina flash support
    else if device.hasFlash == false && flashEnabled == true && currentCamera == .front {
      flashView = UIView(frame: view.frame)
      flashView?.alpha = 0.0
      flashView?.backgroundColor = UIColor.white
      previewLayer.addSubview(flashView!)

      UIView.animate(
        withDuration: 0.1, delay: 0.0, options: .curveEaseInOut,
        animations: {
          self.flashView?.alpha = 1.0

        },
        completion: { _ in
          self.capturePhotoAsyncronously(completionHandler: { _ in
            UIView.animate(
              withDuration: 0.1, delay: 0.0, options: .curveEaseInOut,
              animations: {
                self.flashView?.alpha = 0.0
              },
              completion: { _ in
                self.flashView?.removeFromSuperview()
              })
          })
        })
    } else {
      if device.isFlashActive == true {
        changeFlashSettings(device: device, mode: .off)
      }
      capturePhotoAsyncronously(completionHandler: { _ in })
    }
  }

  /**
       Begin recording video of current session
       SwiftyCamViewControllerDelegate function SwiftyCamDidBeginRecordingVideo() will be called
     */
  @objc public func startVideoRecording() {
    assert(
      Thread.isMainThread,
      "[SwiftyCam]: This function -startRecording must be called on the main thread.")

    guard let device: AVCaptureDevice = videoDevice else {
      NSLog("!!!!   NO Camera Device to capture from!!!!!")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self, didError: "startVideoRecording()  NO Camera Device to capture from!")
      }
      return
    }

    // make sure we're in the right mode
    if !enableVideo {
      NSLog("!!!!   Not in video mode, cannot start recording!!!!!")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self, didError: "startVideoRecording()  Not in video mode, cannot start recording!")
      }
      return
    }
    // make sure we're not currently recording
    if isRecording {
      NSLog("!!!!  Curently recording video, stop before trying to start recording again!!!!!")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError:
            "startVideoRecording()  Curently recording video, stop before trying to start recording again!"
        )
      }
      return
    }
    configureSessionQuality()  // update video quality based on property
    if device.hasTorch == true && flashEnabled == true {
      changeTorchSettings(device: device, mode: .on)
    }
    //    self.getVideoTransform()
    executeAsync { [weak self] in
      guard let self = self else {
        return
      }
      assert(
        !self.willStartWritingSession && !self.shouldStartWritingSession,
        "[SwiftyCam]: Called startRecording() when already recording.")
      self.willStartWritingSession = true

      let uuid = UUID().uuidString
      let fileType = self.assetWriter?.outputFileType ?? AVFileType.mp4
      assert(fileType.isVideoFileTypeSupported, "fileType is not supported for video")
      let outputFileName = (uuid as NSString).appendingPathExtension(fileType.stringValue())!
      let outputFileUrl = self.outputFileDirectory.appendingPathComponent(
        outputFileName, isDirectory: false)
      do {
        let assetWriter: AVAssetWriter =
          try self.assetWriter ?? AVAssetWriter(outputURL: outputFileUrl, fileType: fileType)
        self.assetWriter = assetWriter
      } catch let error as NSError {
        NSLog("[SwiftyCam]: error setting up avassetwrtter: \(error)")
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self, didError: "startVideoRecording() " + error.localizedDescription)
        }
        return
      }

      guard let assetWriter: AVAssetWriter = self.assetWriter else {
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self, didError: "startVideoRecording()  asset writer is nil")
        }
        fatalError("asset writer is nil")
      }

      self.setBackgroundAudioPreference()

      var videoCompressionSettings = self.videoOutput?.recommendedVideoSettingsForAssetWriter(
        writingTo: assetWriter.outputFileType)

      // videoCompressionSettings.map({
      //  NSLog($0.description)
      // })
      var compressionProperties =
        videoCompressionSettings?[AVVideoCompressionPropertiesKey] as? [String: Any]
      compressionProperties?[AVVideoExpectedSourceFrameRateKey] = self.frameRate
      videoCompressionSettings?[AVVideoCompressionPropertiesKey] = compressionProperties

      // NSLog("updated video codec in compression settings array:")
      // videoCompressionSettings.map({
      //   NSLog($0.description)
      // })

      let assetWriterVideoInput: AVAssetWriterInput =
        self.assetWriterVideoInput
        ?? AVAssetWriterInput(
          mediaType: AVMediaType.video, outputSettings: videoCompressionSettings)
      assetWriterVideoInput.expectsMediaDataInRealTime = true

      assetWriterVideoInput.transform = self.getVideoTransform()
      if assetWriter.canAdd(assetWriterVideoInput) {
        assetWriter.add(assetWriterVideoInput)
      } else {
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self, didError: "startVideoRecording()  Could not add VideoWriterInput to VideoWriter")
        }
        fatalError("[SwiftyCam]: Could not add VideoWriterInput to VideoWriter")
      }

      self.assetWriterVideoInput = assetWriterVideoInput

      if self.isAudioEnabled {
        let audioCompressionSettings =
          self.audioOutput?.recommendedAudioSettingsForAssetWriter(
            writingTo: assetWriter.outputFileType) as? [String: Any]
        let assetWriterAudioInput =
          self.assetWriterAudioInput
          ?? AVAssetWriterInput(
            mediaType: AVMediaType.audio, outputSettings: audioCompressionSettings)
        assetWriterAudioInput.expectsMediaDataInRealTime = true
        if assetWriter.canAdd(assetWriterAudioInput) {
          assetWriter.add(assetWriterAudioInput)
        } else {
          DispatchQueue.main.async {
            self.cameraDelegate?.swiftyCam(
              self, didError: "startVideoRecording()  Could not add AudioWriterInput to VideoWriter"
            )
          }
          fatalError("[SwiftyCam]: Could not add AudioWriterInput to VideoWriter")
        }
        self.assetWriterAudioInput = assetWriterAudioInput
      }

      self.assetWriterInputPixelBufferAdaptor = AVAssetWriterInputPixelBufferAdaptor(
        assetWriterInput: assetWriterVideoInput, sourcePixelBufferAttributes: nil)

      assetWriter.startWriting()

      self.shouldStartWritingSession = true
      self.willStartWritingSession = false
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didBeginRecordingVideo: self.currentCamera)
      }
    }
  }

  /**
       Transform to adjust video recording rotation
       SwiftyCamViewControllerDelegate function SwiftyCamDidBeginRecordingVideo() will be called
     */
  private func getVideoTransform() -> CGAffineTransform {
    switch UIDevice.current.orientation {
    case .portrait:
      if currentCamera == .rear {
        return CGAffineTransform(rotationAngle: .pi / 2)
      }
      return CGAffineTransform(rotationAngle: .pi / 2)
    case .portraitUpsideDown:
      if currentCamera == .rear {
        return CGAffineTransform(rotationAngle: .pi / 2)
      }
      return CGAffineTransform(rotationAngle: .pi / 2)
    case .landscapeLeft:
      if currentCamera == .rear {
        return .identity
      }
      return CGAffineTransform(rotationAngle: .pi)
    case .landscapeRight:
      if currentCamera == .rear {
        return CGAffineTransform(rotationAngle: .pi)
      }
      return .identity
    default:
      return .identity
    }
  }

  /**
       Stop video recording video of current session
       SwiftyCamViewControllerDelegate function SwiftyCamDidFinishRecordingVideo() will be called
       When video has finished processing, the URL to the video location will be returned by SwiftyCamDidFinishProcessingVideoAt(url:)
     */
  @objc public func stopVideoRecording() {
    assert(
      Thread.isMainThread,
      "[SwiftyCam]: This function -stopRecording must be called on the main thread.")
    executeAsync { [weak self] in
      guard let self = self else {
        NSLog("stopVideoRecording() Error! Unable to get reference to self")
        return
      }
      assert(
        self.shouldStartWritingSession,
        "[SwiftyCam]: Called stopRecording() while video is not being recorded")
      guard let assetWriter = self.assetWriter else {
        NSLog("stopVideoRecording() Error! Unable to get reference to assetWriter")
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self, didError: "stopVideoRecording()  Unable to get reference to assetWriter")
        }
        return
      }
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didFinishRecordingVideo: self.currentCamera)
      }
      self.shouldStartWritingSession = false
      self.didStartWritingSession = false
      self.frameCount = 0
      self.recordingDuration = 0.0

      self.assetWriterVideoInput?.markAsFinished()
      self.assetWriterAudioInput?.markAsFinished()
      assetWriter.finishWriting {
        DispatchQueue.main.async {
          if let error = assetWriter.error {
            self.didFailToProcessVideo(error)
          } else {
            self.didFinishProcessingVideoAt(assetWriter.outputURL)
          }
        }
      }

      self.assetWriter = nil
      self.assetWriterAudioInput = nil
      self.assetWriterVideoInput = nil
      // disable torch if was on during recording
      guard let device = videoDevice else {
        NSLog("!!!!   NO Camera Device available to disable torch after stopRecording() ")
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self, didError: "stopVideoRecording()  NO Camera Device available to disable torch")
        }
        return
      }
      if device.isTorchActive == true {
        self.changeTorchSettings(device: device, mode: .off)
      }
    }
  }

  /**
     cancel without saving video recorded
     TODO: also cleanup the file written to
     */
  @objc public func cancelVideoRecording() {
    assert(
      Thread.isMainThread,
      "[SwiftyCam]: This function -cancelRecording must be called on the main thread.")

    executeAsync { [weak self] in
      guard let self = self else { return }
      assert(
        self.shouldStartWritingSession,
        "[SwiftyCam]: Called cancelRecording() while video is not being recorded")
      guard let assetWriter = self.assetWriter else { return }
      self.shouldStartWritingSession = false
      self.didStartWritingSession = false
      self.frameCount = 0
      self.recordingDuration = 0.0
      //      let url = assetWriter.outputURL

      assetWriter.cancelWriting()

      // Must remove audio after recording in order to mimic Snapchat/Instagram camera
      self.session.beginConfiguration()
      self.removeAudioInput()
      self.removeAudioOutput()
      self.session.commitConfiguration()

      self.assetWriter = nil
      self.assetWriterAudioInput = nil
      self.assetWriterVideoInput = nil
    }
  }

  /**
     *  Gets the number of cameras available on this device
     */
  @objc public func getNumberOfCameras() -> Int {
    if #available(iOS 13.0, *) {
      let deviceDiscoverySession: AVCaptureDevice.DiscoverySession =
        .init(
          deviceTypes: [
            .builtInDualCamera,
            .builtInDualWideCamera,
            .builtInTripleCamera,
            .builtInWideAngleCamera,
            .builtInTelephotoCamera,
            .builtInUltraWideCamera,
          ],
          mediaType: AVMediaType.video,
          position: .unspecified)
      let foundCameras: [AVCaptureDevice] = deviceDiscoverySession.devices
      return foundCameras.count
    } else {
      // Fallback on earlier versions
      let deviceDiscoverySession: AVCaptureDevice.DiscoverySession =
        .init(
          deviceTypes: [
            .builtInDualCamera,
            .builtInWideAngleCamera,
            .builtInTelephotoCamera,
          ],
          mediaType: AVMediaType.video,
          position: .unspecified)
      let foundCameras: [AVCaptureDevice] = deviceDiscoverySession.devices
      return foundCameras.count
    }
  }

  /**
        Switch between front and rear camera
        SwiftyCamViewControllerDelegate function SwiftyCamDidSwitchCurrentCamera(camera:  will be return the current camera selection
     */
  @objc public func switchCamera() {
    switch currentCamera {
    case .front:
      currentCamera = .rear
    case .rear:
      currentCamera = .front
    }

    guard !isSwitchingCameras else { return }
    isSwitchingCameras = true
    let zoomScale: CGFloat = lastZoomScale

    executeSync { [weak self] in
      guard let self = self else { return }
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didSwitchCurrentCamera: self.currentCamera)
      }
      self.lastZoomScale = self.videoDevice?.videoZoomFactor ?? 1.0

      self.cameraLocation = self.cameraLocation.opposite()

      self.session.beginConfiguration()

      if let videoInput = self.videoInput {
        self.session.removeInput(videoInput)
      }

      if let audioInput = self.audioInput {
        self.session.removeInput(audioInput)
      }

      self.addVideoInput()
      self.configureSessionQuality()
      self.addAudioInput()

      self.session.commitConfiguration()

      do {
        try self.videoDevice?.lockForConfiguration()
        self.videoDevice?.videoZoomFactor = zoomScale
        self.videoDevice?.unlockForConfiguration()
      } catch let error as NSError {
        NSLog("[SwiftyCam]: Error locking configuration")
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self, didError: "switchCamera()  " + error.localizedDescription)
        }
      }

      self.isSwitchingCameras = false
    }
  }

  // MARK: Private Functions

  /**
      Configure session, add inputs and outputs
     */
  fileprivate func configureSession() {
    executeSync { [weak self] in
      guard let self = self else { return }
      self.session.beginConfiguration()
      for input in self.session.inputs {
        self.session.removeInput(input)
      }
      self.addVideoInput()
      self.addVideoOutput()
      self.addAudioInput()
      self.addAudioOutput()
      self.configureSessionQuality()
      configurePhotoOutput()
      self.session.commitConfiguration()
    }
  }

  /**
       Configure Photo Output
       //TODO: replace with image buffer frame grab version
     */
  fileprivate func configurePhotoOutput() {
    let photoFileOutput = AVCapturePhotoOutput()

    if session.canAddOutput(photoFileOutput) {
      session.addOutput(photoFileOutput)
      self.photoFileOutput = photoFileOutput
    }
  }

  /**
      Orientation management
     */
  @objc public func subscribeToDeviceOrientationChangeNotifications() {
    deviceOrientation = UIDevice.current.orientation
    NotificationCenter.default.addObserver(
      self, selector: #selector(deviceDidRotate), name: UIDevice.orientationDidChangeNotification,
      object: nil)
  }

  @objc public func unsubscribeFromDeviceOrientationChangeNotifications() {
    NotificationCenter.default.removeObserver(
      self, name: UIDevice.orientationDidChangeNotification, object: nil)
    deviceOrientation = nil
  }

  @objc public func deviceDidRotate() {
    if !UIDevice.current.orientation.isFlat {
      deviceOrientation = UIDevice.current.orientation
    } else {
      // NSLog("deviceDidRotate, device is flat, ignoring")
    }
  }

  @objc public func getPreviewLayerOrientation() -> AVCaptureVideoOrientation {
    // Depends on layout orientation, not device orientation
    switch UIApplication.shared.statusBarOrientation {
    case .portrait, .unknown:
      return AVCaptureVideoOrientation.portrait
    case .landscapeLeft:
      return AVCaptureVideoOrientation.landscapeLeft
    case .landscapeRight:
      return AVCaptureVideoOrientation.landscapeRight
    case .portraitUpsideDown:
      return AVCaptureVideoOrientation.portraitUpsideDown
    }
  }

  @objc public func getVideoOrientation() -> AVCaptureVideoOrientation {
    guard shouldUseDeviceOrientation, let deviceOrientation = deviceOrientation else {
      return previewLayer!.videoPreviewLayer.connection!.videoOrientation
    }
    switch deviceOrientation {
    case .landscapeLeft:
      // keep the same if using front camera
      return currentCamera == .rear ? .landscapeRight : .landscapeLeft
    case .landscapeRight:
      // keep the same if using front camera
      return currentCamera == .rear ? .landscapeLeft : .landscapeRight
    case .portraitUpsideDown:
      return .portraitUpsideDown
    default:
      return .portrait
    }
  }

  @objc public func getImageOrientation(forCamera: CameraSelection) -> UIImage.Orientation {
    guard shouldUseDeviceOrientation, let deviceOrientation = deviceOrientation else {
      return forCamera == .rear ? .right : .leftMirrored
    }
    switch deviceOrientation {
    case .landscapeLeft:
      return forCamera == .rear ? .up : .downMirrored
    case .landscapeRight:
      return forCamera == .rear ? .down : .upMirrored
    case .portraitUpsideDown:
      return forCamera == .rear ? .left : .rightMirrored
    default:
      return forCamera == .rear ? .right : .leftMirrored
    }
  }

  @objc public func getZoom() -> CGFloat {
    return zoomScale
  }

  @objc public func setZoom(value: CGFloat) {
    do {
      let videoDevice: AVCaptureDevice? = AVCaptureDevice.devices().first
      try videoDevice?.lockForConfiguration()
      if value <= 0.0 {
        zoomScale = 1.0
      } else if value > 1.0 {
        zoomScale = videoDevice!.activeFormat.videoMaxZoomFactor
        return
      } else {
        zoomScale = value * videoDevice!.activeFormat.videoMaxZoomFactor
      }
      NSLog("setZoom called with ")
      NSLog("%f", value)
      NSLog("%f", zoomScale)
      //      videoDevice?.videoZoomFactor = zoomScale
      videoDevice?.ramp(toVideoZoomFactor: zoomScale, withRate: 4.0)

      // Call Delegate function with current zoom scale
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didChangeZoomLevel: self.zoomScale)
      }

      videoDevice?.unlockForConfiguration()

    } catch let error as NSError {
      NSLog("[SwiftyCam]: Error locking configuration while changing zoom")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self, didError: "setZoom()  " + error.localizedDescription)
      }
    }
  }

  /**
        Returns a UIImage from Image Data.
        - Parameter imageData: Image Data returned from capturing photo from the capture session.
        - Returns: UIImage from the image data, adjusted for proper orientation.
     */
  @objc public func processPhoto(_ imageData: Data) -> UIImage {
    let dataProvider = CGDataProvider(data: imageData as CFData)
    let cgImageRef = CGImage(
      jpegDataProviderSource: dataProvider!, decode: nil, shouldInterpolate: true,
      intent: CGColorRenderingIntent.defaultIntent)

    // Set proper orientation for photo
    // If camera is currently set to front camera, flip image

    let image = UIImage(
      cgImage: cgImageRef!, scale: 1.0, orientation: getImageOrientation(forCamera: currentCamera))

    return image
  }

  @objc public func photoOutput(
    _ output: AVCapturePhotoOutput, didFinishProcessingPhoto photo: AVCapturePhoto, error: Error?
  ) {
    if error != nil {
      NSLog("ERROR while processing photo:")
      // NSLog(error.localizedDescription)
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError: "photoOutput()  "
            + (error?.localizedDescription ?? "Error while processing photo"))
      }
    }
    guard let photoData = photo.fileDataRepresentation() else {
      return
    }

    let photoImage = processPhoto(photoData)
    DispatchQueue.main.async {
      self.cameraDelegate?.swiftyCam(self, didTake: photoImage)
    }
  }

  @objc public func capturePhotoAsyncronously(completionHandler: @escaping (Bool) -> Void) {
    if let videoConnection: AVCaptureConnection = photoFileOutput?.connection(
      with: AVMediaType.video)
    {
      videoConnection.videoOrientation = getPreviewLayerOrientation()
      let photoSettings: AVCapturePhotoSettings!
      photoSettings = AVCapturePhotoSettings(format: [AVVideoCodecKey: AVVideoCodecType.jpeg])
      photoSettings.isAutoStillImageStabilizationEnabled = true

      if flashEnabled {
        photoSettings.flashMode = .on
      } else {
        photoSettings.flashMode = .off
      }
      photoSettings.isHighResolutionPhotoEnabled = true
      photoFileOutput?.isHighResolutionCaptureEnabled = true
      photoFileOutput?.capturePhoto(with: photoSettings, delegate: self)
    } else {
      NSLog("!!!! Error trying to get photoFileOuput connection")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError: "capturePhotoAsyncronously() Error trying to get photoFileOuput connection")
      }
      completionHandler(false)
    }
  }

  /// Handle Denied App Privacy Settings
  @objc public func promptToAppSettings() {
    // prompt User with UIAlertView
    DispatchQueue.main.async { [unowned self] in

      let message = NSLocalizedString(
        "AVCam doesn't have permission to use the camera, please change privacy settings",
        comment: "Alert message when the user has denied access to the camera")
      let alertController = UIAlertController(
        title: "AVCam", message: message, preferredStyle: .alert)
      alertController.addAction(
        UIAlertAction(
          title: NSLocalizedString("OK", comment: "Alert OK button"), style: .cancel, handler: nil))
      alertController.addAction(
        UIAlertAction(
          title: NSLocalizedString("Settings", comment: "Alert button to open Settings"),
          style: .default,
          handler: { _ in
            if #available(iOS 10.0, *) {
              UIApplication.shared.open(URL(string: UIApplication.openSettingsURLString)!)
            } else {
              if let appSettings = URL(string: UIApplication.openSettingsURLString) {
                UIApplication.shared.open(appSettings)
              }
            }
          }))
      self.present(alertController, animated: true, completion: nil)
    }
  }

  /**
        Returns an AVCapturePreset from VideoQuality Enumeration
        - Parameter quality: ViewQuality enum
        - Returns: String representing a AVCapturePreset
     */
  @objc public func videoInputPresetFromVideoQuality(quality: VideoQuality)
    -> AVCaptureSession.Preset
  {
    switch quality {
    case .high: return AVCaptureSession.Preset.high
    case .medium: return AVCaptureSession.Preset.medium
    case .low: return AVCaptureSession.Preset.low
    case .resolution352x288: return AVCaptureSession.Preset.cif352x288
    case .resolution640x480: return AVCaptureSession.Preset.vga640x480
    case .resolution1280x720: return AVCaptureSession.Preset.hd1280x720
    case .resolution1920x1080: return AVCaptureSession.Preset.hd1920x1080
    case .iframe960x540: return AVCaptureSession.Preset.iFrame960x540
    case .iframe1280x720: return AVCaptureSession.Preset.iFrame1280x720
    case .resolution3840x2160:
      if #available(iOS 9.0, *) {
        return AVCaptureSession.Preset.hd4K3840x2160
      } else {
        NSLog("[SwiftyCam]: Resolution 3840x2160 not supported on this version of iOS")
        return AVCaptureSession.Preset.high
      }
    }
  }

  /**
      Get Devices for a media type (audio or video)
     */
  @objc public class func deviceWithMediaType(
    _ mediaType: AVMediaType, preferringPosition position: AVCaptureDevice.Position
  ) -> AVCaptureDevice? {
    if let devices = AVCaptureDevice.devices(for: mediaType) as? [AVCaptureDevice] {
      return devices.filter { $0.position == position }.first
    }
    return nil
  }

  /**
      Enable or disable flash for photo
     */
  @objc public func changeFlashSettings(device: AVCaptureDevice, mode: AVCaptureDevice.FlashMode) {
    do {
      try device.lockForConfiguration()
      device.flashMode = mode
      device.unlockForConfiguration()
    } catch let error as NSError {
      NSLog("[SwiftyCam]: \(error)")

      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError: "changeFlashSettings() " + error.localizedDescription)
      }
    }
  }

  /**
      Enable or disable flash for video
     */
  @objc public func changeTorchSettings(device: AVCaptureDevice, mode: AVCaptureDevice.TorchMode) {
    do {
      guard device.isTorchAvailable else {
        NSLog("torch not available on tnis device, ignoring changeTorchSettings request ")
        return
      }
      try device.lockForConfiguration()

      if mode == AVCaptureDevice.TorchMode.on {
        try device.setTorchModeOn(level: 1.0)
        device.torchMode = .on
      } else {
        device.torchMode = .off
      }
      device.unlockForConfiguration()
    } catch let error as NSError {
      NSLog("[SwiftyCam]: \(error)")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError: "changeTorchSettings() " + error.localizedDescription)
      }
    }
  }

  /**
      Enable flash
     */
  @objc public func enableFlash() {
    if isCameraTorchOn == false {
      toggleFlash()
    }
  }

  /**
      Disable flash
     */
  @objc public func disableFlash() {
    if isCameraTorchOn == true {
      toggleFlash()
    }
  }

  /**
      Toggles between enabling and disabling flash
     */
  @objc public func toggleFlash() {
    guard currentCamera == .rear else {
      // Flash is not supported for front facing camera
      return
    }

    let device = AVCaptureDevice.default(for: AVMediaType.video)
    // Check if device has a flash
    if (device?.hasTorch)! {
      do {
        try device?.lockForConfiguration()
        if device?.torchMode == AVCaptureDevice.TorchMode.on {
          device?.torchMode = AVCaptureDevice.TorchMode.off
          isCameraTorchOn = false
        } else {
          do {
            try device?.setTorchModeOn(level: 1.0)
            isCameraTorchOn = true
          } catch let error as NSError {
            NSLog("[SwiftyCam]: \(error)")
            DispatchQueue.main.async {
              self.cameraDelegate?.swiftyCam(
                self,
                didError: "toggleFlash() " + error.localizedDescription)
            }
          }
        }
        device?.unlockForConfiguration()
      } catch let error as NSError {
        NSLog("[SwiftyCam]: \(error)")
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self,
            didError: "toggleFlash() " + error.localizedDescription)
        }
      }
    }
  }

  /**
      Sets whether SwiftyCam should enable background audio from other applications or sources
     */
  @objc public func setBackgroundAudioPreference() {
    guard allowBackgroundAudio == true else {
      return
    }

    do {
      try AVAudioSession.sharedInstance().setCategory(
        AVAudioSession.Category.playAndRecord,
        options: [.duckOthers, .defaultToSpeaker])

      session.automaticallyConfiguresApplicationAudioSession = false
    } catch let error as NSError {
      NSLog("[SwiftyCam]: Failed to set background audio preference")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError: "setBackgroundAudioPreference() " + error.localizedDescription)
      }
    }
  }
}

@objc extension SwiftyCamViewController: SwiftyCamButtonDelegate {
  /// Sets the maximum duration of the SwiftyCamButton

  public func setMaxiumVideoDuration() -> Double {
    return maximumVideoDuration
  }

  /// Set UITapGesture to take photo
  public func buttonWasTapped() {}

  /// Set UILongPressGesture start to begin video
  public func buttonDidBeginLongPress() {}

  /// Set UILongPressGesture begin to begin end video
  public func buttonDidEndLongPress() {}

  /// Called if maximum duration is reached
  public func longPressDidReachMaximumDuration() {}
}

// MARK: UIGestureRecognizer Declarations

extension SwiftyCamViewController {
  /// Handle pinch gesture
  @objc fileprivate func zoomGesture(pinch: UIPinchGestureRecognizer) {
    guard pinchToZoom == true, currentCamera == .rear else {
      // ignore pinch
      NSLog("front camera or option disabled, ignoring zoom pinch gesture")
      return
    }
    do {
      let videoDevice = AVCaptureDevice.devices().first
      try videoDevice?.lockForConfiguration()

      zoomScale = min(
        maxZoomScale,
        max(1.0, min(beginZoomScale * pinch.scale, videoDevice!.activeFormat.videoMaxZoomFactor)))

      videoDevice?.videoZoomFactor = zoomScale

      // Call Delegate function with current zoom scale
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didChangeZoomLevel: self.zoomScale)
      }

      videoDevice?.unlockForConfiguration()

    } catch let error as NSError {
      NSLog("[SwiftyCam]: Error locking configuration")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError: "zoomGesture() " + error.localizedDescription)
      }
    }
  }

  /// Handle single tap gesture
  @objc fileprivate func singleTapGesture(tap: UITapGestureRecognizer) {
    guard tapToFocus == true else {
      // Ignore taps
      return
    }

    let screenSize = previewLayer!.bounds.size
    let tapPoint = tap.location(in: previewLayer!)
    let x = tapPoint.y / screenSize.height
    let y = 1.0 - tapPoint.x / screenSize.width
    let focusPoint = CGPoint(x: x, y: y)

    if let device = videoDevice {
      do {
        try device.lockForConfiguration()

        if device.isFocusPointOfInterestSupported == true {
          device.focusPointOfInterest = focusPoint
          device.focusMode = .autoFocus
        }
        device.exposurePointOfInterest = focusPoint
        device.exposureMode = AVCaptureDevice.ExposureMode.continuousAutoExposure
        device.unlockForConfiguration()
        // Call delegate function and pass in the location of the touch

        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(self, didFocusAtPoint: tapPoint)
        }
      } catch {
        // just ignore
      }
    }
  }

  /// Handle double tap gesture
  @objc fileprivate func doubleTapGesture(tap: UITapGestureRecognizer) {
    guard doubleTapCameraSwitch == true else {
      return
    }
    switchCamera()
  }

  /// Handle pan gesture on preview screen, will trigger zoom
  @objc private func panGesture(pan: UIPanGestureRecognizer) {
    guard swipeToZoom == true && currentCamera == .rear else {
      // ignore pan
      return
    }
    let currentTranslation = pan.translation(in: view).y
    let translationDifference = currentTranslation - previousPanTranslation

    do {
      let videoDevice = AVCaptureDevice.devices().first
      try videoDevice?.lockForConfiguration()

      let currentZoom = videoDevice?.videoZoomFactor ?? 0.0

      if swipeToZoomInverted == true {
        zoomScale = min(
          maxZoomScale,
          max(
            1.0,
            min(
              currentZoom - (translationDifference / 75),
              videoDevice!.activeFormat.videoMaxZoomFactor)))
      } else {
        zoomScale = min(
          maxZoomScale,
          max(
            1.0,
            min(
              currentZoom + (translationDifference / 75),
              videoDevice!.activeFormat.videoMaxZoomFactor)))
      }

      videoDevice?.videoZoomFactor = zoomScale

      // Call Delegate function with current zoom scale
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(self, didChangeZoomLevel: self.zoomScale)
      }

      videoDevice?.unlockForConfiguration()

    } catch let error as NSError {
      NSLog("[SwiftyCam]: Error locking configuration")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError: "panGesture() " + error.localizedDescription)
      }
    }

    if pan.state == .ended || pan.state == .failed || pan.state == .cancelled {
      previousPanTranslation = 0.0
    } else {
      previousPanTranslation = currentTranslation
    }
  }

  /**
     Add pan, pinch and tap gesture recognizers to currentView
     - Parameter view: View to add gesture recognzier
     */

  fileprivate func addGestureRecognizersTo(view: UIView) {
    let pinchGesture = UIPinchGestureRecognizer(
      target: self, action: #selector(zoomGesture(pinch:)))
    pinchGesture.delegate = self
    view.addGestureRecognizer(pinchGesture)

    let singleTapGesture = UITapGestureRecognizer(
      target: self, action: #selector(singleTapGesture(tap:)))
    singleTapGesture.numberOfTapsRequired = 1
    singleTapGesture.delegate = self
    view.addGestureRecognizer(singleTapGesture)

    let doubleTapGesture = UITapGestureRecognizer(
      target: self, action: #selector(doubleTapGesture(tap:)))
    doubleTapGesture.numberOfTapsRequired = 2
    doubleTapGesture.delegate = self
    view.addGestureRecognizer(doubleTapGesture)

    let panGesture = UIPanGestureRecognizer(target: self, action: #selector(panGesture(pan:)))
    panGesture.delegate = self
    view.addGestureRecognizer(panGesture)
  }
}

// MARK: UIGestureRecognizerDelegate

extension SwiftyCamViewController: UIGestureRecognizerDelegate {
  /// Set beginZoomScale when pinch begins
  public func gestureRecognizerShouldBegin(_ gestureRecognizer: UIGestureRecognizer) -> Bool {
    if gestureRecognizer.isKind(of: UIPinchGestureRecognizer.self) {
      beginZoomScale = zoomScale
    }
    return true
  }
}

extension SwiftyCamViewController {
  private func addApplicationObservers() {
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleApplicationWillResignActive(_:)),
      name: UIApplication.willResignActiveNotification, object: nil)
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleApplicationDidBecomeActive(_:)),
      name: UIApplication.didBecomeActiveNotification, object: nil)
  }

  private func removeApplicationObservers() {
    NotificationCenter.default.removeObserver(
      self, name: UIApplication.willResignActiveNotification, object: nil)
    NotificationCenter.default.removeObserver(
      self, name: UIApplication.didBecomeActiveNotification, object: nil)
  }

  private func addSessionObservers() {
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleSessionRuntimeError(_:)),
      name: NSNotification.Name.AVCaptureSessionRuntimeError, object: session)
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleSessionWasInterrupted(_:)),
      name: NSNotification.Name.AVCaptureSessionWasInterrupted, object: session)
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleSessionInterruptionEnded(_:)),
      name: NSNotification.Name.AVCaptureSessionInterruptionEnded, object: session)
    NotificationCenter.default.addObserver(
      self, selector: #selector(handleSessionDidStartRunning(_:)),
      name: NSNotification.Name.AVCaptureSessionDidStartRunning, object: session)
  }

  private func removeSessionObservers() {
    NotificationCenter.default.removeObserver(
      self, name: NSNotification.Name.AVCaptureSessionRuntimeError, object: session)
    NotificationCenter.default.removeObserver(
      self, name: NSNotification.Name.AVCaptureSessionWasInterrupted, object: session)
    NotificationCenter.default.removeObserver(
      self, name: NSNotification.Name.AVCaptureSessionInterruptionEnded, object: session)
    NotificationCenter.default.removeObserver(
      self, name: NSNotification.Name.AVCaptureSessionDidStartRunning, object: session)
  }

  @available(iOS 11.1, *)
  private func addSystemObervers() {
    guard let videoDevice: AVCaptureDevice = videoDevice else { return }
    systemObserver = videoDevice.observe(
      \AVCaptureDevice.systemPressureState, options: [.new]
    ) { [weak self] _, change in
      guard let self = self else { return }
      guard let systemPressureState = change.newValue else { return }
      let pressureLevel = systemPressureState.level
      switch pressureLevel {
      case .serious, .critical:
        if self.isRecording {
          NSLog(
            "[SwiftyCam]: Reached elevated system pressure level: \(pressureLevel). Throttling frame rate."
          )
          self.configureFrameRate(toframeRate: 20)
        }
      case .shutdown:
        NSLog("[SwiftyCam]: Session stopped running due to shutdown system pressure level.")
      default:
        if self.isRecording {
          NSLog(
            "[SwiftyCam]: Reached normal system pressure level: \(pressureLevel). Resetting frame rate."
          )
          self.configureFrameRate()
        }
      }
    }
  }

  private func removeSystemObservers() {
    systemObserver = nil
  }

  @objc open func handleApplicationWillResignActive(_ notification: Notification) {}

  @objc open func handleApplicationDidBecomeActive(_ notification: Notification) {}

  @objc open func handleSessionRuntimeError(_ notification: Notification) {
    NSLog("[SwiftyCam]: SessionRuntimeError: \(String(describing: notification.userInfo))")
    if let error = notification.userInfo?[AVCaptureSessionErrorKey] as? AVError {
      switch error.code {
      case .deviceIsNotAvailableInBackground:
        NSLog("Media services are not available in the background")
      case .mediaServicesWereReset:
        NSLog("Media services were reset")
      // self.session.startRunning()
      default:
        break
      }
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError: "handleSessionRuntimeError() " + error.localizedDescription)
      }
    }
  }

  @objc open func handleSessionWasInterrupted(_ notification: Notification) {}

  @objc open func handleSessionInterruptionEnded(_ notification: Notification) {}

  @objc open func handleSessionDidStartRunning(_ notification: Notification) {}
}

extension SwiftyCamViewController {
  @objc open func configureSessionQuality() {
    let preset: AVCaptureSession.Preset

    if enableVideo {
      switch videoQuality {
      case .high:
        preset = AVCaptureSession.Preset.high
        NSLog("[SwiftyCam] Setting session quality high")
      case .medium:
        preset = AVCaptureSession.Preset.medium
      case .low:
        preset = AVCaptureSession.Preset.low
      case .resolution352x288:
        preset = AVCaptureSession.Preset.cif352x288
      case .resolution640x480:
        preset = AVCaptureSession.Preset.vga640x480
        NSLog("[SwiftyCam] Setting session quality vga640x480")
      case .resolution1280x720:
        preset = AVCaptureSession.Preset.hd1280x720
      case .resolution1920x1080:
        preset = AVCaptureSession.Preset.hd1920x1080
      case .resolution3840x2160:
        preset = AVCaptureSession.Preset.hd4K3840x2160
      case .iframe960x540:
        preset = AVCaptureSession.Preset.iFrame960x540
      case .iframe1280x720:
        preset = AVCaptureSession.Preset.iFrame1280x720
      default:
        preset = AVCaptureSession.Preset.medium
      }
    } else {
      preset = AVCaptureSession.Preset.photo
      NSLog(
        "[SwiftyCam]: Using photo preset for AVCaptureSession"
      )
    }

    guard session.canSetSessionPreset(preset) else {
      NSLog(
        "[SwiftyCam]: Error could not set session preset to \(preset), which enables custom video quality control. Defaulting to \(session.sessionPreset)"
      )
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError:
            "configureSessionQuality() Error could not set session preset to \(preset), which enables custom video quality control. Defaulting to \(self.session.sessionPreset)"
        )
      }
      return
    }
    if session.sessionPreset != preset {
      session.sessionPreset = preset
      NSLog(
        "[SwiftyCam]:  sessionPreset set to \(preset)."
      )
      configureFrameRate()
    }
  }

  /// Note: Fixing framerate does affect low light capture performance
  /// TODO: Make this functionality optional.
  private func configureFrameRate(toframeRate: Int? = nil) {
    guard let videoDevice = videoDevice else {
      NSLog("[SwiftyCam]: Cannot configure frame rate. Reason: Video Capture Device is nil")
      // DispatchQueue.main.async {
      //     self.cameraDelegate?.swiftyCam(
      //         self,
      //         didError:
      //         "configureFrameRate() Cannot configure frame rate. Reason: Video Capture Device is nil")
      // }
      return
    }

    let desiredFrameRate = toframeRate ?? self.desiredFrameRate
    var frameRate: Int = desiredFrameRate

    let ranges = videoDevice.activeFormat.videoSupportedFrameRateRanges

    let maxFrameRates = ranges.map { $0.maxFrameRate }

    let minFrameRates = ranges.map { $0.minFrameRate }

    var maxFrameRate = -1
    var minFrameRate = -1

    maxFrameRates.forEach { rate in
      maxFrameRate = rate > Double(maxFrameRate) ? Int(rate) : maxFrameRate
    }

    minFrameRates.forEach { rate in
      minFrameRate = rate > Double(minFrameRate) ? Int(rate) : minFrameRate
    }

    if desiredFrameRate > maxFrameRate {
      NSLog(
        "[SwiftyCam]: Desired frame rate is higher than supported frame rates. setting to \(maxFrameRate) instead."
      )
      frameRate = maxFrameRate
    } else if desiredFrameRate < minFrameRate {
      NSLog(
        "[SwiftyCam]: Desired frame rate is lower than supported frame rates. setting to \(minFrameRate) instead."
      )
      frameRate = minFrameRate
    }
    guard videoDevice.activeVideoMinFrameDuration.timescale != frameRate,
      videoDevice.activeVideoMaxFrameDuration.timescale != frameRate
    else { return }

    do {
      try videoDevice.lockForConfiguration()
      videoDevice.activeVideoMinFrameDuration = CMTime(
        value: 1, timescale: CMTimeScale(frameRate))
      videoDevice.activeVideoMaxFrameDuration = CMTime(
        value: 1, timescale: CMTimeScale(frameRate))
      videoDevice.unlockForConfiguration()

      self.frameRate = frameRate
    } catch let error as NSError {
      NSLog("[SwiftyCam]: Could not lock device for configuration: \(error)")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError: "configureFrameRate() " + error.localizedDescription)
      }
    }
  }

  private func addVideoInput() {
    if #available(iOS 10.0, *) {
      // this adds front or back cameras if available
      self.videoDevice = AVCaptureDevice.default(
        .builtInWideAngleCamera, for: .video, position: cameraLocation)
    } else {
      // Fallback on earlier versions
      self.videoDevice = AVCaptureDevice.default(for: .video)
    }

    removeSystemObservers()
    if #available(iOS 11.1, *) {
      self.addSystemObervers()
    } else {
      // Fallback on earlier versions
      NSLog("[msCamera]: iOS 11.1+ required for observers")
    }

    guard let videoDevice = videoDevice else {
      NSLog("[SwiftyCam]: Could not find video device input for the session")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError:
            "addVideoInput() Could not find video device input for the session")
      }
      return
    }

    if let device: AVCaptureDevice = self.videoDevice {
      do {
        try device.lockForConfiguration()
        if device.isFocusModeSupported(.continuousAutoFocus) {
          device.focusMode = .continuousAutoFocus
          if device.isSmoothAutoFocusSupported {
            device.isSmoothAutoFocusEnabled = true
          }
        }

        if device.isExposureModeSupported(.continuousAutoExposure) {
          device.exposureMode = .continuousAutoExposure
        }

        if device.isWhiteBalanceModeSupported(.continuousAutoWhiteBalance) {
          device.whiteBalanceMode = .continuousAutoWhiteBalance
        }

        if device.isLowLightBoostSupported, lowLightBoost == true {
          device.automaticallyEnablesLowLightBoostWhenAvailable = true
        }

        device.unlockForConfiguration()
      } catch let error as NSError {
        NSLog("[SwiftyCam]: Error locking configuration")
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self,
            didError:
              "addVideoInput() " + error.localizedDescription)
        }
      }
    }

    do {
      let videoDeviceInput = try AVCaptureDeviceInput(device: videoDevice)
      if session.canAddInput(videoDeviceInput) {
        session.addInput(videoDeviceInput)
        videoInput = videoDeviceInput
      } else {
        NSLog("[SwiftyCam]: Could not add video device input to the session")
        setupResult = .configurationFailed
        session.commitConfiguration()
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self,
            didError:
              "addVideoInput() Could not add video device input to the session")
        }
        return
      }
    } catch let error as NSError {
      NSLog("[SwiftyCam]: Could not create video device input: \(error)")
      setupResult = .configurationFailed
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError:
            "addVideoInput() " + error.localizedDescription)
      }
      return
    }
  }

  private func addVideoOutput() {
    let dataOutput = AVCaptureVideoDataOutput()
    dataOutput.setSampleBufferDelegate(self, queue: sessionSecondaryQueue)

    if session.canAddOutput(dataOutput) {
      session.addOutput(dataOutput)
    }

    videoOutput = dataOutput
  }

  private func addAudioInput() {
    guard let audioDevice = AVCaptureDevice.default(for: AVMediaType.audio) else {
      NSLog("[SwiftyCam]: Could not add audio device input to the session")
      return
    }
    // configure device AVAudioSession to allow bluetooth for playback and recording
    do {
      try AVAudioSession.sharedInstance().setCategory(
        AVAudioSession.Category.playAndRecord,
        options: [.allowBluetooth, .allowAirPlay, .defaultToSpeaker])
      // set this to false to use our preferred selection of audio inputs and options
      session.automaticallyConfiguresApplicationAudioSession = false
    } catch let error as NSError {
      NSLog("[SwiftyCam]: Failed to set AVAudioSEssion preferences")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError:
            "addAudioInput() " + error.localizedDescription)
      }
    }
    // search available audio inputs and prefer bluetooth, then wired, then headset then builtin
    // Note: default behavior is to select the last one found for each type, so if you have multiple bluetooth
    //    inputs, the last one discovered is used, but may not be the one you actually want
    do {
      let availableInputs = AVAudioSession.sharedInstance().availableInputs
      // for input: AVAudioSessionPortDescription in availableInputs! {
      //   NSLog("%@ %@", input.portName, input.portType.rawValue)
      //   // NSLog(input.portType.rawValue)
      // }
      if let bluetoothInput =
        (availableInputs?.filter { $0.portType.rawValue.contains("Bluetooth") })?
        .first
      {
        try? AVAudioSession.sharedInstance().setPreferredInput(bluetoothInput)
      } else if let wiredInput =
        (availableInputs?.filter { $0.portType.rawValue.contains("Wired") })?
        .first
      {
        try? AVAudioSession.sharedInstance().setPreferredInput(wiredInput)
      } else if let headsetInput =
        (availableInputs?.filter { $0.portType.rawValue.contains("Headset") })?
        .first
      {
        try? AVAudioSession.sharedInstance().setPreferredInput(headsetInput)
      } else if let builtinInput =
        (availableInputs?.filter { $0.portType.rawValue.contains("BuiltIn") })?
        .first
      {
        try? AVAudioSession.sharedInstance().setPreferredInput(builtinInput)
      } else {
        // NSLog("WARNING! No extra input found, using Microphone")
      }

      let audioDeviceInput = try AVCaptureDeviceInput(device: audioDevice)

      if session.canAddInput(audioDeviceInput) {
        session.addInput(audioDeviceInput)
        audioInput = audioDeviceInput
      } else {
        NSLog("[SwiftyCam]: Could not add audio device input to the session")
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self,
            didError:
              "addAudioInput() Could not add audio device input to the session")
        }
      }
    } catch let error as NSError {
      NSLog("[SwiftyCam]: Could not create audio device input: \(error)")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError:
            "addAudioInput() " + error.localizedDescription)
      }
    }
  }

  private func addAudioOutput() {
    let dataOutput = AVCaptureAudioDataOutput()
    dataOutput.setSampleBufferDelegate(self, queue: sessionSecondaryQueue)

    if session.canAddOutput(dataOutput) {
      session.addOutput(dataOutput)
      audioOutput = dataOutput
    }
  }

  private func removeAudioOutput() {
    guard let audioOutput = audioOutput else { return }
    session.removeOutput(audioOutput)
    self.audioOutput = nil
  }

  private func removeAudioInput() {
    guard let audioInput = audioInput else { return }
    session.removeInput(audioInput)
    self.audioInput = nil
  }
}

/*
 delegate functions
 */
@objc extension SwiftyCamViewController {
  func didError(_ error: String) {
    NSLog("[SwiftyCam]: didError()" + error)
    DispatchQueue.main.async {
      self.cameraDelegate?.swiftyCam(self, didError: error)
    }
  }

  func didFinishProcessingVideoAt(_ url: URL) {
    if let currentBackgroundTaskID = backgroundTaskID {
      backgroundTaskID = UIBackgroundTaskIdentifier.invalid.rawValue

      if currentBackgroundTaskID != UIBackgroundTaskIdentifier.invalid.rawValue {
        UIApplication.shared.endBackgroundTask(
          UIBackgroundTaskIdentifier(rawValue: currentBackgroundTaskID))
      }
    }
    // send event with url generated from recording process
    DispatchQueue.main.async {
      self.cameraDelegate?.swiftyCam(self, didFinishProcessVideoAt: url)
    }
  }

  func didFailToProcessVideo(_ error: Error) {
    NSLog("didFailToProcessVideo")
    NSLog(error.localizedDescription)
    if let currentBackgroundTaskID = backgroundTaskID {
      backgroundTaskID = UIBackgroundTaskIdentifier.invalid.rawValue

      if currentBackgroundTaskID != UIBackgroundTaskIdentifier.invalid.rawValue {
        UIApplication.shared.endBackgroundTask(
          UIBackgroundTaskIdentifier(rawValue: currentBackgroundTaskID))
      }
    }
  }
}

@objc
extension SwiftyCamViewController: AVCaptureVideoDataOutputSampleBufferDelegate,
  AVCaptureAudioDataOutputSampleBufferDelegate
{
  public func captureOutput(
    _ output: AVCaptureOutput, didDrop sampleBuffer: CMSampleBuffer,
    from connection: AVCaptureConnection
  ) {
    NSLog("[SwiftyCam]: Dropped \(output == audioOutput ? "audio" : "video") Frame")
  }

  public func captureOutput(
    _ output: AVCaptureOutput, didOutput sampleBuffer: CMSampleBuffer,
    from connection: AVCaptureConnection
  ) {
    if shouldCapturePhotoFromDataOutput {
      shouldCapturePhotoFromDataOutput = false

      handlePhotoCapture(sampleBuffer)
    }

    guard shouldStartWritingSession else { return }

    let isDataReady = CMSampleBufferDataIsReady(sampleBuffer)
    guard isDataReady, let assetWriter = assetWriter else { return }

    if !didStartWritingSession {
      let presentationTimestamp = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
      assetWriter.startSession(atSourceTime: presentationTimestamp)
      didStartWritingSession = true
      startingPresentationTimeStamp = presentationTimestamp
      previousPresentationTimeStamp = presentationTimestamp
    }

    guard isRecording else { return }

    if let assetWriterAudioInput = assetWriterAudioInput,
      output == audioOutput, assetWriterAudioInput.isReadyForMoreMediaData
    {
      let since = Date().timeIntervalSince(lastVideoSampleDate)
      if since < 0.05 {
        let success = assetWriterAudioInput.append(sampleBuffer)
        if !success, let error = assetWriter.error {
          NSLog(error.localizedDescription)
          DispatchQueue.main.async {
            self.cameraDelegate?.swiftyCam(
              self,
              didError:
                "captureOutput() " + error.localizedDescription)
          }
          fatalError(error.localizedDescription)
        }
      }
    }

    if let assetWriterInputPixelBufferAdaptor = assetWriterInputPixelBufferAdaptor,
      let assetWriterVideoInput = assetWriterVideoInput,
      output == videoOutput,
      assetWriterVideoInput.isReadyForMoreMediaData,
      let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer)
    {
      let currentPresentationTimestamp = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
      let previousPresentationTimeStamp = self.previousPresentationTimeStamp

      // Frame correction logic. Fixes the bug of video/audio unsynced when switching cameras
      let currentFramePosition =
        (Double(frameRate) * Double(currentPresentationTimestamp.value))
        / Double(currentPresentationTimestamp.timescale)
      let previousFramePosition =
        (Double(frameRate) * Double(previousPresentationTimeStamp.value))
        / Double(previousPresentationTimeStamp.timescale)
      var presentationTimeStamp = currentPresentationTimestamp
      let maxFrameDistance = 1.1
      let frameDistance = currentFramePosition - previousFramePosition
      if frameDistance > maxFrameDistance {
        let expectedFramePosition = previousFramePosition + 1.0
        //                NSLog(
        //                    "[asCamera]: Frame at incorrect position moving from \(currentFramePosition) to \(expectedFramePosition)")

        let newFramePosition =
          (expectedFramePosition * Double(currentPresentationTimestamp.timescale))
          / Double(frameRate)

        let newPresentationTimeStamp = CMTime(
          value: CMTimeValue(newFramePosition), timescale: currentPresentationTimestamp.timescale)

        presentationTimeStamp = newPresentationTimeStamp
      }

      let success = assetWriterInputPixelBufferAdaptor.append(
        pixelBuffer, withPresentationTime: presentationTimeStamp)
      if !success, let error = assetWriter.error {
        NSLog(error.localizedDescription)
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self,
            didError:
              "captureOutput() " + error.localizedDescription)
        }
        fatalError(error.localizedDescription)
      }
      lastVideoSampleDate = Date()
      self.previousPresentationTimeStamp = presentationTimeStamp

      let startTime =
        Double(startingPresentationTimeStamp.value)
        / Double(startingPresentationTimeStamp.timescale)
      let currentTime =
        Double(currentPresentationTimestamp.value) / Double(currentPresentationTimestamp.timescale)
      let previousTime =
        Double(previousPresentationTimeStamp.value)
        / Double(previousPresentationTimeStamp.timescale)

      frameCount += 1
      recordingDuration = currentTime - startTime

      if (Int(previousTime - startTime) == Int(currentTime - startTime)) == false {
        // NSLog("[asCamera]: Frame Count for previous second: \(self.frameCount)")
        frameCount = 0
      }
    }
  }

  private func handlePhotoCapture(_ sampleBuffer: CMSampleBuffer) {
    let isDataReady = CMSampleBufferDataIsReady(sampleBuffer)
    guard isDataReady else {
      NSLog("[SwiftyCam]: SampleBuffer was not ready")
      DispatchQueue.main.async {
        self.cameraDelegate?.swiftyCam(
          self,
          didError:
            "handlePhotoCapture() SampleBuffer was not ready")
      }
      return
    }

    //    guard let cgImage = self.cgImage(from: sampleBuffer) else { return }
    //    let size = UIScreen.main.bounds.size
    //    guard let image = UIImage.init(cgImage: cgImage).scaled(toHeight: size.height) else { return }
    //    let properties = metadata(from: sampleBuffer)
    // TODO: can use this image as a screen grab for preview purposes
  }

  private func handleAudioBuffer(_ sampleBuffer: CMSampleBuffer) {
    guard let assetWriter = assetWriter else { return }
    if let assetWriterAudioInput = assetWriterAudioInput,
      assetWriterAudioInput.isReadyForMoreMediaData
    {
      let success = assetWriterAudioInput.append(sampleBuffer)
      if !success, let error = assetWriter.error {
        NSLog(error.localizedDescription)
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self,
            didError:
              "handleAudioBuffer() " + error.localizedDescription)
        }
        fatalError(error.localizedDescription)
      }
    }
  }

  private func handleVideoBuffer(_ sampleBuffer: CMSampleBuffer) {
    guard let assetWriter = assetWriter else { return }
    if let assetWriterInputPixelBufferAdaptor = assetWriterInputPixelBufferAdaptor,
      let assetWriterVideoInput = assetWriterVideoInput,
      assetWriterVideoInput.isReadyForMoreMediaData,
      let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer)
    {
      let currentPresentationTimestamp = CMSampleBufferGetPresentationTimeStamp(sampleBuffer)
      let previousPresentationTimeStamp = self.previousPresentationTimeStamp

      // Frame correction logic. Fixes the bug of video/audio unsynced when switching cameras
      let currentFramePosition =
        (Double(frameRate) * Double(currentPresentationTimestamp.value))
        / Double(currentPresentationTimestamp.timescale)
      let previousFramePosition =
        (Double(frameRate) * Double(previousPresentationTimeStamp.value))
        / Double(previousPresentationTimeStamp.timescale)
      var presentationTimeStamp = currentPresentationTimestamp
      let maxFrameDistance = 1.1
      let frameDistance = currentFramePosition - previousFramePosition
      if frameDistance > maxFrameDistance {
        let expectedFramePosition = previousFramePosition + 1.0
        //                NSLog(
        //                    "[SwiftyCam]: Frame at incorrect position moving from \(currentFramePosition) to \(expectedFramePosition)")
        let newFramePosition =
          (expectedFramePosition * Double(currentPresentationTimestamp.timescale))
          / Double(frameRate)

        let newPresentationTimeStamp = CMTime(
          value: CMTimeValue(newFramePosition), timescale: currentPresentationTimestamp.timescale)

        presentationTimeStamp = newPresentationTimeStamp
      }

      let success = assetWriterInputPixelBufferAdaptor.append(
        pixelBuffer, withPresentationTime: presentationTimeStamp)
      if !success, let error = assetWriter.error {
        NSLog(error.localizedDescription)
        DispatchQueue.main.async {
          self.cameraDelegate?.swiftyCam(
            self,
            didError:
              "handleVideoBuffer() " + error.localizedDescription)
        }
        fatalError(error.localizedDescription)
      }

      self.previousPresentationTimeStamp = presentationTimeStamp

      let startTime =
        Double(startingPresentationTimeStamp.value)
        / Double(startingPresentationTimeStamp.timescale)
      let currentTime =
        Double(currentPresentationTimestamp.value) / Double(currentPresentationTimestamp.timescale)
      let previousTime =
        Double(previousPresentationTimeStamp.value)
        / Double(previousPresentationTimeStamp.timescale)

      frameCount += 1
      recordingDuration = currentTime - startTime

      if (Int(previousTime - startTime) == Int(currentTime - startTime)) == false {
        // NSLog("[SwiftyCam]: Frame Count for previous second: \(self.frameCount)")
        frameCount = 0
      }
    }
  }
}

extension SwiftyCamViewController {
  private func cgImage(from sampleBuffer: CMSampleBuffer) -> CGImage? {
    guard let pixelBuffer = CMSampleBufferGetImageBuffer(sampleBuffer) else { return nil }
    // Lock the base address of the pixel buffer
    CVPixelBufferLockBaseAddress(pixelBuffer, CVPixelBufferLockFlags.readOnly)
    let ciImage = CIImage(cvPixelBuffer: pixelBuffer)
    let context = CIContext()
    let cgimage = context.createCGImage(ciImage, from: ciImage.extent)
    // Unlock the pixel buffer
    CVPixelBufferUnlockBaseAddress(pixelBuffer, CVPixelBufferLockFlags.readOnly)
    return cgimage
  }

  private func metadata(from sampleBuffer: CMSampleBuffer) -> NSMutableDictionary {
    let rawMetadata = CMCopyDictionaryOfAttachments(
      allocator: nil, target: sampleBuffer,
      attachmentMode: CMAttachmentMode(kCMAttachmentMode_ShouldPropagate))
    let metadata = CFDictionaryCreateMutableCopy(nil, 0, rawMetadata) as NSMutableDictionary
    return metadata
  }

  public func createData(
    from cgImage: CGImage, fileType: AVFileType, quality: CGFloat,
    properties: NSMutableDictionary = NSMutableDictionary()
  ) -> Data? {
    let imageData = NSMutableData()
    let numberOfImages = 1
    guard
      let destination = CGImageDestinationCreateWithData(
        imageData as CFMutableData, fileType as CFString, numberOfImages, nil)
    else { return nil }

    let options = [kCGImageDestinationLossyCompressionQuality: quality]
    properties.addEntries(from: options)
    CGImageDestinationAddImage(destination, cgImage, properties as CFDictionary)
    CGImageDestinationFinalize(destination)

    return imageData as Data
  }

  public func save(
    cgImage: CGImage, fileType: AVFileType, quality: CGFloat,
    properties: NSMutableDictionary = NSMutableDictionary()
  ) -> URL? {
    let uuid = UUID().uuidString
    assert(fileType.isImageFileTypeSupported, "fileType is not supported for video")
    let outputFileName = (uuid as NSString).appendingPathExtension(fileType.stringValue())!
    let outputFileUrl = outputFileDirectory.appendingPathComponent(
      outputFileName, isDirectory: false)

    // var qual = quality
    // let compression = CFNumberCreate(kCFAllocatorDefault, CFNumberType.floatType, &qual)
    let numberOfImages = 1
    guard
      let destination = CGImageDestinationCreateWithURL(
        outputFileUrl as CFURL, fileType as CFString, numberOfImages, nil)
    else { return nil }
    let options = [kCGImageDestinationLossyCompressionQuality: quality]
    properties.addEntries(from: options)
    CGImageDestinationAddImage(destination, cgImage, properties as CFDictionary)

    guard CGImageDestinationFinalize(destination) else { return nil }

    return outputFileUrl
  }
}

@objc extension UIImage {
  fileprivate func scaled(toWidth width: CGFloat) -> UIImage? {
    let oldWidth = size.width
    let scaleFactor = width / oldWidth
    let newHeight = size.height * scaleFactor
    let newWidth = oldWidth * scaleFactor
    let newSize = CGSize(width: newWidth, height: newHeight)
    let renderer = UIGraphicsImageRenderer(size: newSize)
    let newImage = renderer.image { _ in
      self.draw(in: CGRect(origin: CGPoint.zero, size: newSize))
    }
    return newImage
  }

  fileprivate func scaled(toHeight height: CGFloat) -> UIImage? {
    let scale = height / size.height
    let newWidth = size.width * scale
    let newSize = CGSize(width: newWidth, height: height)
    let renderer = UIGraphicsImageRenderer(size: newSize)
    let newImage = renderer.image { _ in
      self.draw(in: CGRect(origin: CGPoint.zero, size: newSize))
    }

    return newImage
  }
}

@objc extension SwiftyCamViewController {
  func executeAsync(_ closure: @escaping () -> Void) {
    sessionPrimaryQueue.async(execute: closure)
  }

  func executeSync(withClosure closure: @escaping () -> Void) {
    if DispatchQueue.getSpecific(key: sessionPrimaryQueueSpecificKey) != nil {
      closure()
    } else {
      sessionPrimaryQueue.sync(execute: closure)
    }
  }
}

extension AVCaptureDevice.Position {
  fileprivate func opposite() -> AVCaptureDevice.Position {
    switch self {
    case .front: return .back
    case .back: return .front
    case .unspecified: return .unspecified
    @unknown default:
      return .unspecified
    }
  }
}

extension AVFileType {
  // swiftlint:disable cyclomatic_complexity file_length
  fileprivate func stringValue() -> String {
    var string = ""
    switch self {
    case .mov: string += "mov"
    case .mp4: string += "mp4"
    case .m4v: string += "m4v"
    case .m4a: string += "m4a"
    case .mobile3GPP: string += "3gp"
    case .mobile3GPP2: string += "3g2"
    case .caf: string += "caf"
    case .wav: string += "wav"
    case .aiff: string += "aif"
    case .aifc: string += "aifc"
    case .amr: string += "amr"
    case .mp3: string += "mp3"
    case .au: string += "au"
    case .ac3: string += "ac3"
    case .eac3: string += "eac3"
    case .jpg: string += "jpg"
    case .dng: string += "dng"
    case .heic: string += "heic"
    case .avci: string += "avci"
    case .heif: string += "heif"
    case .tif: string += "tiff"
    default: fatalError("AVFileType: \(rawValue) not supported")
    }
    return string
  }

  fileprivate var isImageFileTypeSupported: Bool {
    return self == .heic || self == .jpg || self == .tif
  }

  fileprivate var isVideoFileTypeSupported: Bool {
    return self == .mov || self == .mp4 || self == .mobile3GPP || self == .mobile3GPP2
  }
}
