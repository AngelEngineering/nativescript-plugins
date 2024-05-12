/* eslint-disable @typescript-eslint/ban-ts-comment */
import { File } from '@nativescript/core';
import { TranscoderCommon, Asset, Segment, Track, VideoConfig, VideoResolution } from './common';

export interface AssetInternal extends Asset {
  avAsset: AVURLAsset | undefined;
  audioTrack: AVAssetTrack | undefined;
  videoTrack: AVAssetTrack | undefined;
  position?: number;
}

const DefaultVideoConfig: VideoConfig = {
  quality: '720p',
  frameRate: 30,
  audioChannels: 2,
  audioSampleRate: 44100, // between 8 and 192
  audioBitRate: 128000, // default to 128 kilobits
};

export class Transcoder extends TranscoderCommon {
  assets: Record<string, AssetInternal> = {};
  segments: Segment[] = [];
  private _videoConfig: VideoConfig;

  /**
   * Transcodes video from inputPath to outputPath using videoConfig options
   * @param inputPath string
   * @param outputPath string
   * @param videoConfig VideoConfig
   * @returns Promise<File>
   *
   */
  transcode(inputPath: string, outputPath: string, videoConfig: VideoConfig): Promise<File> {
    this.reset();

    const allowedTranscodingResolution = this.getAllowedTranscodingResolution(inputPath);

    // If the input resolution is lower or the same as the target resolution, transcoding will just eat up time and create a bigger file, which is not usual purpose.
    //    If the user wants to do it anyway, pass the force flag.
    if (!videoConfig.force && !allowedTranscodingResolution.includes(videoConfig.quality)) {
      return Promise.reject(
        'Transcoding to the same or higher resolution is not allowed by default. If you want to do this intentionally, pass in { force: true } as part of the vidoeConfig object to bypass this check.'
      );
    }
    const fileName = inputPath.split('/')[inputPath.split('/').length - 1];

    // this.addAsset({
    //   name: fileName,
    //   path: inputPath,
    //   type: 'videoAudio',
    // });
    // this.addSegment({
    //   tracks: [{ asset: fileName }],
    // });
    // return this.process(outputPath, videoConfig);
  }

  // addAsset(asset: Asset) {
  //   const fileURL = NSURL.fileURLWithPath(asset.path);
  //   const avAsset = AVURLAsset.assetWithURL(fileURL);
  //   const audioTracks = avAsset.tracksWithMediaType(AVMediaTypeAudio);
  //   const videoTracks = avAsset.tracksWithMediaType(AVMediaTypeVideo);

  //   this.assets[asset.name] = {
  //     ...asset,
  //     avAsset: avAsset,
  //     audioTrack: audioTracks.count > 0 ? audioTracks.objectAtIndex(0) : undefined,
  //     videoTrack: videoTracks.count > 0 ? videoTracks.objectAtIndex(0) : undefined,
  //   };
  // }

  // addSegment(segment: Segment) {
  //   const tracks = segment.tracks;
  //   this.segments.push({ ...segment, tracks: tracks });
  // }

  reset() {
    this.assets = {};
    this.segments = [];
  }

  /*private _composition: AVMutableComposition;
  process(outputPath: string, videoConfig?: VideoConfig): Promise<File> {
    return new Promise((resolve, reject) => {
      if (videoConfig) {
        this._videoConfig = {
          ...DefaultVideoConfig,
          ...videoConfig,
        };
      } else {
        this._videoConfig = DefaultVideoConfig;
      }

      this.log('[process] Start');

      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };

      emit(TranscoderCommon.TRANSCODING_STARTED, {});

      this._composition = new AVMutableComposition();
      const compositionTrack = this._composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeVideo, kCMPersistentTrackID_Invalid);

      const mix = new AVMutableAudioMix();
      const audioParams = new AVMutableAudioMixInputParameters();

      let outputPosition = CMTimeMake(0, 1000);

      const audioTracks = NSMutableArray.new<AVMutableCompositionTrack>();
      const videoTracks = NSMutableArray.new<AVMutableCompositionTrack>();
      const instructionSegments = NSMutableArray.new<Segment & { fadeOutTrackID?: number; start?: number }>();

      videoTracks.addObject(compositionTrack);

      let firstAssetTrack: AVAssetTrack | undefined = undefined;
      let videoTrackIndex = 0;
      let audioTrackIndex = 0;

      for (let segmentIndex = 0; segmentIndex < this.segments.length; segmentIndex++) {
        this.log(`[process] Adding Segment: ${segmentIndex}`);
        const currentSegment: Segment & { fadeOutTrackID?: number; start?: number } = this.segments[segmentIndex];
        let segmentDuration = CMTimeMake(currentSegment.duration, 1000);
        let trackDuration: CMTime | undefined = undefined; // will be calaculated for each track

        videoTrackIndex = 0;
        audioTrackIndex = 0;
        const segmentTracks = currentSegment.tracks;
        this.log(`[process] Adding Segment Tracks: ${JSON.stringify(segmentTracks)}`);
        let sawError = false;
        // Loop through the tracks in the segment and add each track to the composition
        for (let trackIndex = 0; trackIndex < currentSegment.tracks.length; trackIndex++) {
          this.log(`[process] Adding Tracks: ${trackIndex}`);
          const currentTrack: Track & { trackID?: number } = currentSegment.tracks[trackIndex];
          const filter = currentTrack.filter;
          const asset = this.assets[currentTrack.asset];
          if (asset) {
            // check for tracklevel type first and fallback to asset type
            // 'videoAudio' (default) process both video and audio
            // 'video' will only process the video (no audio)
            // 'audio' will only process the audio (black screen)
            const trackType = currentTrack.type || asset.type;
            const avAsset = asset.avAsset;
            const assetTrack = asset.videoTrack;

            if (!firstAssetTrack) {
              firstAssetTrack = assetTrack;
            }

            this.log('[process] Processing Asset');
            // Start time is the seek requested plus the current position in the track
            const trackStartTime = CMTimeMake((currentTrack.seek || 0) + (asset.position || 0), 1000);

            // The duration of the track (input) will be either what is specified for the track,
            // what is specified for the segement or if nothing else the remaingin time according to
            // the legnth of the track.
            let scaleTime = false;
            if (currentTrack.duration != null) {
              scaleTime = true;
              trackDuration = CMTimeMake(currentTrack.duration, 1000);
            } else {
              trackDuration = CMTimeMake(currentSegment.duration, 1000);
            }

            if (trackDuration.value === 0) {
              trackDuration = CMTimeSubtract(avAsset.duration, trackStartTime);
            }
            const trackTimeRange = CMTimeRangeMake(trackStartTime, trackDuration);

            // Segment duration may also be the length of the track remaining if not specified
            if (segmentDuration.value === 0) {
              segmentDuration = CMTimeSubtract(avAsset.duration, trackStartTime);
            }

            // Update the position in the track based on the duration
            asset.position = trackStartTime.value + trackDuration.value;
            this.log('------------------------');
            this.log('| Track Details');
            this.log('| Track Duration:', trackDuration.value);
            this.log('| Track Start Time:', trackStartTime.value);
            this.log('| Segment Duration:', segmentDuration.value);
            this.log('------------------------');
            // Insert video track segment
            if (segmentDuration.value > 0 && (trackType === 'video' || trackType === 'videoAudio')) {
              // Determine video track to use.  We only need multiple tracks to create multiple layers for transition effects
              // however we need to force separate instructions and the composition login in IOS will consolidate adjacant
              // segments on the same track so we try to put each consectutive segment on a new track
              let videoTrack: AVMutableCompositionTrack | undefined;
              this.log('[process] Inserting Video Track');
              if (videoTrackIndex >= videoTracks.count) {
                videoTrack = this._composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeVideo, kCMPersistentTrackID_Invalid);
                videoTracks.addObject(videoTrack);
                const transform = assetTrack.preferredTransform;
                videoTrack.preferredTransform = transform;
              } else {
                videoTrack = videoTracks[videoTrackIndex];
              }
              // Add the input asset to the video track
              const audioVideoSuccess = videoTrack.insertTimeRangeOfTrackAtTimeError(trackTimeRange, asset.videoTrack, outputPosition);
              this.log(`[process] Adding Track: ${videoTrack.trackID}`);
              if (!audioVideoSuccess) {
                console.error('[process] Ran into an error while inserting video track');
                sawError = true;
                return;
              }

              if (scaleTime) {
                this.log('[process] Updating Video Scale');
                const outputRange = CMTimeRangeMake(outputPosition, trackTimeRange.duration);
                videoTrack.scaleTimeRangeToDuration(outputRange, segmentDuration);
              }
              currentTrack.trackID = videoTrack.trackID;
              // Record the filter so we can match up later when we get the layer instructions
              if (filter === 'FadeOut') {
                this.log('[process] Setting FadeOut Filter');
                currentSegment.fadeOutTrackID = videoTrack.trackID;
              }
              ++videoTrackIndex;
            }
            // Insert audio track segment
            if (segmentDuration.value > 0 && filter !== 'Mute' && !scaleTime && (trackType === 'audio' || trackType === 'videoAudio')) {
              // Same approach as video for audio tracks
              let audioTrack: AVMutableCompositionTrack;
              if (audioTrackIndex >= audioTracks.count) {
                audioTrack = this._composition.addMutableTrackWithMediaTypePreferredTrackID(AVMediaTypeAudio, kCMPersistentTrackID_Invalid);
              } else {
                audioTrack = audioTracks[audioTrackIndex];
              }

              // Add audio asset to the track
              const audioVideoSuccess = audioTrack.insertTimeRangeOfTrackAtTimeError(trackTimeRange, asset.audioTrack, outputPosition);

              if (!audioVideoSuccess) {
                console.error('[process] Ran into an error while inserting audio track');
                sawError = true;
                return;
              }
              ++audioTrackIndex;
            }
          }
        }
        if (sawError) {
          console.error('Error during audio/video preparation');
          return reject('Error during audio/video preparation');
        }
        // Calculate the time range for the segment and use to record duration in segment itself and increment outputPosition
        const outputTimeRange = CMTimeRangeMake(outputPosition, segmentDuration);
        const duration = outputTimeRange.duration.value;
        const start = outputTimeRange.start.value;
        currentSegment.duration = duration;
        currentSegment.start = start;
        outputPosition = CMTimeAdd(outputPosition, outputTimeRange.duration);
        // Keep cross reference of segments to instructions for later processing
        instructionSegments.addObject(currentSegment);
      }

      // Creating the videoComposition from the composition ensures that we have default intructions and layerInstructions
      const videoComposition: AVMutableVideoComposition = AVMutableVideoComposition.videoCompositionWithPropertiesOfAsset(this._composition);

      let trackFrameRate = firstAssetTrack.nominalFrameRate;
      if (trackFrameRate === 0) {
        trackFrameRate = 30;
      }

      if (this._videoConfig.frameRate) {
        trackFrameRate = this._videoConfig.frameRate;
      }

      videoComposition.frameDuration = CMTimeMake(1, trackFrameRate);

      // default to 720p, assuming the video is in a standard SD/HD/UHD dimension format
      let targetSize = CGSizeMake(1280.0, 720.0);
      //this code will hardcode dimensions to SD/HD/FHD
      // switch (this._videoConfig.quality) {
      //   case '1080p': {
      //     targetSize = CGSizeMake(1920.0, 1080.0);
      //     break;
      //   }
      //   case '720p': {
      //     targetSize = CGSizeMake(1280.0, 720.0);
      //     break;
      //   }
      //   case '480p': {
      //     targetSize = CGSizeMake(640.0, 480.0);
      //     break;
      //   }
      // }
      //instead of assuming it's in a standard SD/HD/FHD dimension format, check the height and width and scale appropriately based on desired height
      const currentSegment: Segment & { fadeOutTrackID?: number; start?: number } = this.segments[0];
      const currentTrack: Track & { trackID?: number } = currentSegment.tracks[0];
      const filter = currentTrack.filter;
      const asset = this.assets[currentTrack.asset];
      const assetTrack = asset.videoTrack;
      const originalSize = assetTrack.naturalSize;
      switch (this._videoConfig.quality) {
        case '1080p': {
          const ratio = 1080 / originalSize.height;
          const twidth = Math.round(originalSize.width * ratio);
          targetSize = CGSizeMake(twidth, 1080.0);
          break;
        }
        case '720p': {
          const ratio = 720 / originalSize.height;
          const twidth = Math.round(originalSize.width * ratio);
          targetSize = CGSizeMake(twidth, 720.0);
          break;
        }
        case '480p': {
          const ratio = 480 / originalSize.height;
          const twidth = Math.round(originalSize.width * ratio);
          targetSize = CGSizeMake(twidth, 480.0);
          break;
        }
      }
      this.log('setting output targetSize (WxH):' + targetSize.width + 'x' + targetSize.height);
      // const targetSize = this._videoConfig.quality === 'high' ? CGSizeMake(1920.0, 1080.0) : CGSizeMake(1280.0, 720.0);
      const transform = firstAssetTrack.preferredTransform;
      // TODO: make this configurable as orientation - horizontal vs vertical
      const targetVideoAngle = (atan2(transform.b, transform.a) * 180) / Math.PI;
      if (targetVideoAngle === 90 || targetVideoAngle === -90) {
        // flipping the video
        const width = targetSize.width;
        targetSize.width = targetSize.height;
        targetSize.height = width;
      }
      videoComposition.renderSize = targetSize;

      let layeredSegementsIndex = 0;
      for (let instructionIndex = 0; instructionIndex < videoComposition.instructions.count; instructionIndex++) {
        this.log('[process] Looping through composition instruction');
        if (layeredSegementsIndex >= instructionSegments.count) {
          this.log('[process] Composition has extra instructions that are being ignored');
          continue;
        }
        const compositionInstruction = videoComposition.instructions[instructionIndex] as AVMutableVideoCompositionInstruction;
        // Retrieve segment
        const segment = instructionSegments[layeredSegementsIndex];

        const start = segment.start;
        const duration = segment.duration;
        const transitionRange = CMTimeRangeMake(CMTimeMake(start, 1000), CMTimeMake(duration, 1000));

        // Those that have two layersInstructions relate to overlapping segments in the two tracks
        if (compositionInstruction.layerInstructions.count > 0) {
          const layerInstruction1 = compositionInstruction.layerInstructions[0] as AVMutableVideoCompositionLayerInstruction;
          // If we have multiple we need to fade out one of the layers
          if (compositionInstruction.layerInstructions.count === 2) {
            // Determine which layerInstruction to be used for fadeout
            const layerInstruction2 = compositionInstruction.layerInstructions[1] as AVMutableVideoCompositionLayerInstruction;
            if (segment.fadeOutTrackID != null) {
              const fadeOutTrackID = segment.fadeOutTrackID;
              const transitionLayerInstruction = layerInstruction1.trackID === fadeOutTrackID ? layerInstruction1 : layerInstruction2;

              this.log(`[process] Setting FadeOut TrackId ${fadeOutTrackID}`);

              // Add the opacity ramp for the entire time range of the segment
              transitionLayerInstruction.setOpacityRampFromStartOpacityToEndOpacityTimeRange(1.0, 0.0, transitionRange);
            }
          }
          ++layeredSegementsIndex;
        }

        for (let layerInstructionIndex = 0; layerInstructionIndex < compositionInstruction.layerInstructions.count; layerInstructionIndex++) {
          const layerInstruction = compositionInstruction.layerInstructions[0] as AVMutableVideoCompositionLayerInstruction;
          const trackID = layerInstruction.trackID;

          let ir: CMTimeRange;
          layerInstruction.getTransformRampForTimeStartTransformEndTransformTimeRange(transitionRange.start, null, null, null);

          const segmentTracks = segment.tracks;
          const currentTrack = segmentTracks.find(track => track.id === trackID);

          if (currentTrack == null) {
            this.log('[process] Cannot find segment track for instruction - layered ignored');
            continue;
          }
          const assetName = currentTrack.asset;
          const asset = this.assets[assetName];
          const assetTrack = asset.videoTrack;
          const transform = assetTrack.preferredTransform;
          let orientation = UIInterfaceOrientation.LandscapeLeft;

          // Determine orientation
          // Portrait
          if (transform.a == 0 && transform.b == 1.0 && transform.c == -1.0 && transform.d == 0) {
            orientation = UIInterfaceOrientation.Portrait;
          }
          // PortraitUpsideDown
          if (transform.a == 0 && transform.b == -1.0 && transform.c == 1.0 && transform.d == 0) {
            orientation = UIInterfaceOrientation.PortraitUpsideDown;
          }
          // LandscapeRight
          if (transform.a == 1.0 && transform.b == 0 && transform.c == 0 && transform.d == 1.0) {
            orientation = UIInterfaceOrientation.LandscapeRight;
          }
          // LandscapeLeft
          if (transform.a == -1.0 && transform.b == 0 && transform.c == 0 && transform.d == -1.0) {
            orientation = UIInterfaceOrientation.LandscapeLeft;
          }

          // Create a preferred transform
          const originalSize = assetTrack.naturalSize;
          let finalTransform: CGAffineTransform;
          switch (orientation) {
            case UIInterfaceOrientation.LandscapeLeft:
              finalTransform = CGAffineTransformMake(-1, 0, 0, -1, originalSize.width, originalSize.height);
              break;
            case UIInterfaceOrientation.LandscapeRight:
              finalTransform = CGAffineTransformMake(1, 0, 0, 1, 0, 0);
              break;
            case UIInterfaceOrientation.Portrait:
              finalTransform = CGAffineTransformMake(0, 1, -1, 0, originalSize.height, 0);
              break;
            case UIInterfaceOrientation.PortraitUpsideDown:
              finalTransform = CGAffineTransformMake(0, -1, 1, 0, 0, originalSize.width);
              break;
            default:
              break;
          }

          // TODO: this moves the video into a corner. still needs some working on
          if (orientation === UIInterfaceOrientation.Portrait || orientation === UIInterfaceOrientation.PortraitUpsideDown) {
            // flipping time :)
            const width = originalSize.width;
            originalSize.width = originalSize.height;
            originalSize.height = width;
          }

          // center oiriginal inside target
          const ratio = Math.min(targetSize.width / originalSize.width, targetSize.height / originalSize.height);
          const transX = (targetSize.width - originalSize.width * ratio) / 2;
          const transY = (targetSize.height - originalSize.height * ratio) / 2;
          let matrix = CGAffineTransformMakeTranslation(transX, transY);
          matrix = CGAffineTransformScale(matrix, ratio, ratio);
          finalTransform = CGAffineTransformConcat(finalTransform, matrix);
          this.log('[process] Setting transform layer instruction');
          layerInstruction.setTransformAtTime(finalTransform, transitionRange.start);
        }
      }

      videoComposition.frameDuration = CMTimeMake(1, this._videoConfig.frameRate);
      const audioChannels = this._videoConfig.audioChannels;
      const audioSampleRate = this._videoConfig.audioSampleRate;
      const audioBitrate = this._videoConfig.audioBitRate;
      const assetExportSession = new NSAVAssetExportSession().initWithAsset(this._composition, new WeakRef<Transcoder>(this), resolve, reject);
      assetExportSession.outputFileType = AVFileTypeMPEG4;
      assetExportSession.outputURL = this.getURLFromFilePath(outputPath);
      assetExportSession.shouldOptimizeForNetworkUse = true; //leave this on, slightly faster and currently only h264 in/out is supported.
      this.log('[process] Setting Video Settings');
      // const compresionSettings: any = {
      //   'AVVideoAverageBitRateKey': 6000000,
      //   'AVVideoProfileLevelKey': AVVideoProfileLevelH264Baseline30,
      // };
      const videoSettings: any = {
        'AVVideoCodecKey': AVVideoCodecH264,
        'AVVideoWidthKey': targetSize.width,
        'AVVideoHeightKey': targetSize.height,
        'AVVideoScalingModeKey': AVVideoScalingModeResizeAspectFill,
        // 'AVVideoCompressionPropertiesKey': compresionSettings,
      };
      assetExportSession.videoSettings = videoSettings as NSDictionary<string, any>;
      // assetExportSession.videoSettings['AVVideoCompressionPropertiesKey'] = compresionSettings as NSDictionary<string, any>;
      assetExportSession.frameRate = this._videoConfig.frameRate;

      this.log('[process] Setting Audio Settings');
      const audioSettings: any = {
        'AVFormatIDKey': kAudioFormatMPEG4AAC,
        'AVNumberOfChannelsKey': audioChannels,
        'AVSampleRateKey': audioSampleRate,
        'AVEncoderBitRateKey': audioBitrate,
      };
      assetExportSession.audioSettings = audioSettings as NSDictionary<string, any>;
      assetExportSession.timeRange = CMTimeRangeMake(CMTimeMake(0, 1000), outputPosition);
      assetExportSession.videoComposition = videoComposition;
      assetExportSession.log = this.log;
      assetExportSession.emit = emit;

      this.log('[process] Starting Encoding');

      // Start encoding
      dispatch_async(dispatch_get_global_queue(qos_class_t.QOS_CLASS_BACKGROUND, 0), () => {
        assetExportSession.exportAsynchronouslyWithCompletionHandler(() => {
          this.log('[process] Completion Handler');
          this.reset();
          // resolve();
        });
      });
      // https://github.com/selsamman/react-native-transcode/blob/master/ios/Transcode/Transcode.m
    });
  }
*/
  getURLFromFilePath(filePath: string): NSURL {
    if (filePath.includes('assets-library://')) {
      return NSURL.URLWithString(filePath);
    } else if (filePath.includes('file://')) {
      return NSURL.URLWithString(filePath);
    }
    return NSURL.fileURLWithPath(filePath);
  }

  // utilities
  getVideoResolution(videoPath: string): VideoResolution {
    const fileURL = NSURL.fileURLWithPath(videoPath);
    const avAsset = AVURLAsset.assetWithURL(fileURL);
    const track = avAsset.tracksWithMediaType(AVMediaTypeVideo).firstObject;
    if (!track) {
      return {
        width: 0,
        height: 0,
      };
    }
    const size = track.naturalSize;
    return {
      width: size.width,
      height: size.height,
    };
  }
}
/*
class NSAVAssetExportSession {
  private _asset: AVAsset;
  timeRange: CMTimeRange;
  private _reader: AVAssetReader;
  private _writer: AVAssetWriter;
  shouldOptimizeForNetworkUse: boolean;
  private _metadata: NSArray<AVMetadataItem>;
  private _videoOutput: AVAssetReaderVideoCompositionOutput;
  private _videoInputSettings: NSDictionary<string, any>;
  videoComposition: AVMutableVideoComposition;
  videoSettings: NSDictionary<string, any>;
  frameRate: number;
  private _videoInput: AVAssetWriterInput;
  private _videoPixelBufferAdaptor;
  private _inputQueue: interop.Pointer | interop.Reference<any>;
  outputURL: NSURL;
  outputFileType: string;

  // misc
  log: (message: string, value?: any) => void;
  emit: (event: string, data: any) => void;

  // audio
  private _audioOutput: AVAssetReaderAudioMixOutput;
  private _audioMix: AVAudioMix;
  private _audioInput: AVAssetWriterInput;
  audioSettings: NSDictionary<string, any>;

  private _progress: number;
  private _lastSamplePresentationTime: CMTime;
  private _duration;
  private _error: NSError;
  private _completionHandler: () => void;
  private _resolve: any;
  private _reject: any;
  private _owner;

  initWithAsset(asset: AVAsset, owner: WeakRef<Transcoder>, resolve, reject) {
    this._asset = asset;
    this._resolve = resolve;
    this._reject = reject;
    this._owner = owner;
    this.timeRange = CMTimeRangeMake(kCMTimeZero, kCMTimePositiveInfinity);
    return this;
  }

  exportAsynchronouslyWithCompletionHandler(completionHandler: () => void): void {
    this.log('[exportAsynchronouslyWithCompletionHandler] Start');
    this.cancelExport();
    this._completionHandler = completionHandler;
    if (!this.outputURL) {
      this._error = NSError.errorWithDomainCodeUserInfo(AVFoundationErrorDomain, AVError.ExportFailed, {
        NSLocalizedDescriptionKey: 'Output URL not set',
      } as any);
      // completionHandler();
      this.error();
      return;
    }
    this.log('[exportAsynchronouslyWithCompletionHandler] Asset', this._asset);
    this._reader = AVAssetReader.alloc().initWithAssetError(this._asset);
    if (this._reader.error) {
      this._error = this._reader.error;
      this.error();
      return;
    }
    this.log('[exportAsynchronouslyWithCompletionHandler] outputURL', this.outputURL);
    this.log('[exportAsynchronouslyWithCompletionHandler] outputFileType', this.outputFileType);
    this._writer = AVAssetWriter.assetWriterWithURLFileTypeError(this.outputURL, this.outputFileType);
    if (this._writer.error) {
      this._error = this._writer.error;
      this.error();
      return;
    }
    this._reader.timeRange = this.timeRange;
    this._writer.shouldOptimizeForNetworkUse = this.shouldOptimizeForNetworkUse;
    this._writer.metadata = this._metadata;

    const videoTracks = this._asset.tracksWithMediaType(AVMediaTypeVideo);

    if (this.timeRange.duration) {
      this._duration = CMTimeGetSeconds(this.timeRange.duration);
    } else {
      this._duration = CMTimeGetSeconds(this._asset.duration);
    }
    this.log('[exportAsynchronouslyWithCompletionHandler] duration', this._duration);
    // Video output
    this.log('[exportAsynchronouslyWithCompletionHandler] ' + videoTracks.count + ' videoTracks', videoTracks);
    if (videoTracks.count > 0) {
      this.log('[exportAsynchronouslyWithCompletionHandler] Setting Video Output');
      this._videoOutput = AVAssetReaderVideoCompositionOutput.assetReaderVideoCompositionOutputWithVideoTracksVideoSettings(videoTracks, this._videoInputSettings);
      this._videoOutput.alwaysCopiesSampleData = false;
      // this check is causing the video to not scale down correctly
      // if (this.videoComposition) {
      //   // TODO: this might be the problem - https://stackoverflow.com/a/67665341/10280206
      //   // this.videoComposition.sourceTrackIDForFrameTiming = kCMPersistentTrackID_Invalid;
      //   console.log('[exportAsynchronouslyWithCompletionHandler] Setting Video Composition');
      //   this._videoOutput.videoComposition = this.videoComposition;
      // } else {
      this.log('[exportAsynchronouslyWithCompletionHandler] Buliding Video Composition');
      this._videoOutput.videoComposition = this.buildDefaultVideoComposition();
      // }

      if (this._reader.canAddOutput(this._videoOutput)) {
        this.log('[exportAsynchronouslyWithCompletionHandler] Adding Video Output to Reader');
        this._reader.addOutput(this._videoOutput);
      }

      // Video input
      this._videoInput = AVAssetWriterInput.assetWriterInputWithMediaTypeOutputSettings(AVMediaTypeVideo, this.videoSettings);
      this._videoInput.expectsMediaDataInRealTime = false;
      if (this._writer.canAddInput(this._videoInput)) {
        this.log('[exportAsynchronouslyWithCompletionHandler] Adding Video Input to Writer');
        this._writer.addInput(this._videoInput);
      }

      const pixelBufferAttributes: any = {
        kCVPixelBufferPixelFormatTypeKey: kCVPixelFormatType_32BGRA,
        kCVPixelBufferWidthKey: this._videoOutput.videoComposition.renderSize.width,
        kCVPixelBufferHeightKey: this._videoOutput.videoComposition.renderSize.height,
        IOSurfaceOpenGLESTextureCompatibility: true,
        IOSurfaceOpenGLESFBOCompatibility: true,
      };
      this._videoPixelBufferAdaptor = AVAssetWriterInputPixelBufferAdaptor.assetWriterInputPixelBufferAdaptorWithAssetWriterInputSourcePixelBufferAttributes(
        this._videoInput,
        pixelBufferAttributes as NSDictionary<any, any>
      );
    }

    // Audio output
    const audioTracks = this._asset.tracksWithMediaType(AVMediaTypeAudio);
    this.log('[exportAsynchronouslyWithCompletionHandler] ' + audioTracks.count + ' audioTracks', audioTracks);
    if (audioTracks.count > 0) {
      this._audioOutput = AVAssetReaderAudioMixOutput.assetReaderAudioMixOutputWithAudioTracksAudioSettings(audioTracks, null);
      this._audioOutput.alwaysCopiesSampleData = false;
      this._audioOutput.audioMix = this._audioMix;
      if (this._reader.canAddOutput(this._audioOutput)) {
        this.log('[exportAsynchronouslyWithCompletionHandler] Adding Audio Output to Reader');
        this._reader.addOutput(this._audioOutput);
      }
    } else {
      // Just in case this gets reused
      this._audioOutput = null;
    }

    // Audio input
    if (this._audioOutput) {
      this._audioInput = AVAssetWriterInput.assetWriterInputWithMediaTypeOutputSettings(AVMediaTypeAudio, this.audioSettings);
      this._audioInput.expectsMediaDataInRealTime = false;
      if (this._writer.canAddInput(this._audioInput)) {
        this.log('[exportAsynchronouslyWithCompletionHandler] Adding Audio Input to Writer');
        this._writer.addInput(this._audioInput);
      }
    }

    this._writer.startWriting();
    this._reader.startReading();
    this.log('[exportAsynchronouslyWithCompletionHandler] Starting Writer Session');
    this._writer.startSessionAtSourceTime(this.timeRange.start);

    let videoCompleted = false;
    let audioCompleted = false;
    // null = DISPATCH_QUEUE_SERIAL
    //@ts-ignore
    this._inputQueue = dispatch_queue_create('VideoEncoderInputQueue', null);
    if (videoTracks.count > 0) {
      //@ts-ignore
      this._videoInput.requestMediaDataWhenReadyOnQueueUsingBlock(this._inputQueue, () => {
        this.log('[exportAsynchronouslyWithCompletionHandler] Queueing Video Encoding');
        if (!this.encodeReadySamplesFromOutputToInput(this._videoOutput, this._videoInput)) {
          videoCompleted = true;
          this.log('[exportAsynchronouslyWithCompletionHandler] Video Encoding Completed');
          if (audioCompleted) {
            this.finish();
          }
        }
      });
    } else {
      videoCompleted = true;
    }

    if (!this._audioOutput) {
      audioCompleted = true;
    } else {
      //@ts-ignore
      this._audioInput.requestMediaDataWhenReadyOnQueueUsingBlock(this._inputQueue, () => {
        this.log('[exportAsynchronouslyWithCompletionHandler] Queueing Audio Encoding');
        if (!this.encodeReadySamplesFromOutputToInput(this._audioOutput, this._audioInput)) {
          audioCompleted = true;
          this.log('[exportAsynchronouslyWithCompletionHandler] Audio Encoding Completed');
          if (videoCompleted) {
            this.finish();
          }
        }
      });
    }
  }
  encodeReadySamplesFromOutputToInput(output: AVAssetReaderOutput, input: AVAssetWriterInput): boolean {
    this.log('[encodeReadySamplesFromOutputToInput] Start');
    this.log('[encodeReadySamplesFromOutputToInput] Input', input);
    this.log('[encodeReadySamplesFromOutputToInput] Output', output);

    while (input.readyForMoreMediaData) {
      const sampleBuffer = output.copyNextSampleBuffer();

      if (sampleBuffer) {
        let handled = false;
        let error = false;
        if (this._reader.error) {
          this.log('| Reader error', this._reader.error);
        }
        if (this._writer.error) {
          this.log('| Writer error', this._writer.error);
        }
        if (this._reader.status != AVAssetReaderStatus.Reading || this._writer.status != AVAssetWriterStatus.Writing) {
          // this.log('_reader.status', this._reader.status);
          // this.log('_writer.status', this._writer.status);
          handled = true;
          error = true;
        }
        if (!handled && this._videoOutput == output) {
          this._lastSamplePresentationTime = CMSampleBufferGetPresentationTimeStamp(sampleBuffer);
          this._lastSamplePresentationTime = CMTimeSubtract(this._lastSamplePresentationTime, this.timeRange.start);

          const progress = this._duration == 0 ? 1 : CMTimeGetSeconds(this._lastSamplePresentationTime) / this._duration;
          // this.log('| Progress', progress);
          this.emit(TranscoderCommon.TRANSCODING_PROGRESS, { progress });
        }

        if (!handled) {
          const appendSampleBuffer = input.appendSampleBuffer(sampleBuffer);
          if (!appendSampleBuffer) {
            error = true;
          }
        }

        // This is automatically managed by NativeScript via toll-free bridging
        // so we don't have to release this manually
        // Calling this runs the risk of causing a crash due to the object being already
        // cleaned up by NativeScript
        // CFRelease(sampleBuffer);
        if (error) {
          this.error();
          return false;
        }
      } else {
        // this.log("sampleBuffer",sampleBuffer);
        input.markAsFinished();
        this.log('[encodeReadySamplesFromOutputToInput] Done');
        return false;
      }
    }
    return true;
  }

  buildDefaultVideoComposition(): AVMutableVideoComposition {
    const videoComposition = AVMutableVideoComposition.videoComposition();
    const videoTrack = this._asset.tracksWithMediaType(AVMediaTypeVideo).objectAtIndex(0);
    // get the frame rate from videoSettings, if not set then try to get it from the video track,
    // if not set (mainly when asset is AVComposition) then use the default frame rate of 30
    let trackFrameRate = 0;
    if (this.videoSettings) {
      const videoCompressionProperties = this.videoSettings['AVVideoCompressionPropertiesKey'];
      if (videoCompressionProperties) {
        const maxKeyFrameInterval: NSNumber = videoCompressionProperties.objectForKey(AVVideoMaxKeyFrameIntervalKey);
        if (maxKeyFrameInterval) {
          trackFrameRate = maxKeyFrameInterval.floatValue;
        }
      }
    } else {
      trackFrameRate = videoTrack.nominalFrameRate;
    }

    if (trackFrameRate === 0) {
      trackFrameRate = 30;
    }

    if (this.frameRate) {
      trackFrameRate = this.frameRate;
    }

    videoComposition.frameDuration = CMTimeMake(1, trackFrameRate);
    const targetSize = CGSizeMake(this.videoSettings['AVVideoWidthKey'], this.videoSettings['AVVideoHeightKey']);
    const naturalSize = videoTrack.naturalSize;
    let transform = videoTrack.preferredTransform;
    const videoAngleInDegree = (atan2(transform.b, transform.a) * 180) / Math.PI;
    if (videoAngleInDegree === 90 || videoAngleInDegree === -90) {
      // flipping the video
      const width = naturalSize.width;
      naturalSize.width = naturalSize.height;
      naturalSize.height = width;
    }
    videoComposition.renderSize = naturalSize;

    // center inside
    const xRatio = targetSize.width / naturalSize.width;
    const yRatio = targetSize.height / naturalSize.height;
    const ratio = Math.min(xRatio, yRatio);

    const postWidth = naturalSize.width * ratio;
    const postHeight = naturalSize.height * ratio;
    const transx = (targetSize.width - postWidth) / 2;
    const transy = (targetSize.height - postHeight) / 2;

    let matrix = CGAffineTransformMakeTranslation(transx / xRatio, transy / yRatio);
    matrix = CGAffineTransformScale(matrix, ratio / xRatio, ratio / yRatio);
    transform = CGAffineTransformConcat(transform, matrix);

    // Make a "pass through video track" video composition.
    const passThroughInstruction: AVMutableVideoCompositionInstruction = AVMutableVideoCompositionInstruction.videoCompositionInstruction();
    passThroughInstruction.timeRange = CMTimeRangeMake(kCMTimeZero, this._asset.duration);

    const passThroughLayer = AVMutableVideoCompositionLayerInstruction.videoCompositionLayerInstructionWithAssetTrack(videoTrack);
    passThroughLayer.setTransformAtTime(transform, kCMTimeZero);

    passThroughInstruction.layerInstructions = NSArray.arrayWithArray([passThroughLayer]);
    videoComposition.instructions = NSArray.arrayWithArray([passThroughInstruction]);
    // videoComposition.sourceTrackIDForFrameTiming = kCMPersistentTrackID_Invalid;
    return videoComposition;
  }

  cancelExport(): void {
    if (this._inputQueue) {
      //@ts-ignore
      dispatch_async(this._inputQueue, () => {
        this.emit(TranscoderCommon.TRANSCODING_CANCELLED, {});
        this._writer.cancelWriting();
        this._reader.cancelReading();
        this.complete(this._completionHandler);
        this.reset();
      });
    }
  }

  finish(): void {
    this.log('----- FINISH -------');
    // Synchronized block to ensure we never cancel the writer before calling finishWritingWithCompletionHandler
    if (this._reader?.status == AVAssetReaderStatus.Cancelled || this._writer?.status == AVAssetWriterStatus.Cancelled) {
      return;
    }

    const completionHandler = this._completionHandler;
    this.log('Transcoded duration:', this._duration * 1000);
    this.log('Original duration:', this._asset.duration.value);
    // this._owner.get().resolve()
    if (this._writer?.status == AVAssetWriterStatus.Failed) {
      this.complete(completionHandler);
    }
    //Verify the transcoded duration is within 95% of the original duration
    else if ((this._duration * 1000) / this._asset.duration.value > 1.05 || this._asset.duration.value / (this._duration * 1000) < 0.95) {
      this._error = NSError.errorWithDomainCodeUserInfo(AVFoundationErrorDomain, AVError.ExportFailed, {
        NSLocalizedDescriptionKey: 'Output duration is not within 95% of input, transcoding failed',
      } as any);
      this.error();
      return;
    } else {
      // ----------------------------------------------------------------
      // this should be invoked automatically
      if (this._lastSamplePresentationTime.value) {
        this._writer.endSessionAtSourceTime(this._lastSamplePresentationTime);
      }
      this._writer.finishWritingWithCompletionHandler(() => {
        this.log('[finishWritingWithCompletionHandler]');
        this.complete(completionHandler);
      });
    }
  }

  complete(completionHandler: () => void): void {
    this.log('----- COMPLETE -------');

    this.emit(TranscoderCommon.TRANSCODING_COMPLETE, {});
    if (this._writer?.status == AVAssetWriterStatus.Failed || this._writer?.status == AVAssetWriterStatus.Cancelled) {
      NSFileManager.defaultManager.removeItemAtURLError(this.outputURL);
    }

    if (completionHandler) {
      this._resolve(File.fromPath(this.outputURL.path));
      completionHandler();
    }
    this.reset();
  }

  error(): NSError {
    if (this._error) {
      console.error(this._error);
      this.emit(TranscoderCommon.TRANSCODING_ERROR, { error: this._error });
      this._reject(this._error);
      this.reset();
      return this._error;
    } else {
      console.error(this._writer.error || this._reader.error);
      this.emit(TranscoderCommon.TRANSCODING_ERROR, { error: this._writer.error || this._reader.error });
      this._reject(this._writer.error || this._reader.error);
      this.reset();
      return this._writer.error || this._reader.error;
    }
  }

  reset(): void {
    this.log('------ RESET ------');
    this._error = null;
    this._progress = 0;
    this._reader = null;
    this._videoOutput = null;
    this._audioOutput = null;
    this._writer = null;
    this._videoInput = null;
    this._videoPixelBufferAdaptor = null;
    this._audioInput = null;
    this._inputQueue = null;
    this._metadata = null;
    this.shouldOptimizeForNetworkUse = null;
    this._completionHandler = null;

    this._asset = null;
    this.timeRange = null;
    this._videoInputSettings = null;
    this.videoComposition = null;
    this.videoSettings = null;
    this.outputURL = null;
    this.outputFileType = null;
    this._audioMix = null;
    this.audioSettings = null;
    this._lastSamplePresentationTime = null;
    this._duration = null;
    this.frameRate = null;
  }

  status(): AVAssetExportSessionStatus {
    switch (this._writer.status) {
      default:
      case AVAssetWriterStatus.Unknown:
        return AVAssetExportSessionStatus.Unknown;
      case AVAssetWriterStatus.Writing:
        return AVAssetExportSessionStatus.Exporting;
      case AVAssetWriterStatus.Failed:
        return AVAssetExportSessionStatus.Failed;
      case AVAssetWriterStatus.Completed:
        return AVAssetExportSessionStatus.Completed;
      case AVAssetWriterStatus.Cancelled:
        return AVAssetExportSessionStatus.Cancelled;
    }
  }
}
*/
