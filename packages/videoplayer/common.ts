import * as videoSource from './video-source/video-source';
import { Utils, View, Property, booleanConverter, EventData, ImageSource } from '@nativescript/core';

// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
// var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;

export interface VideoEventData extends EventData {
  data?: any;
}

function onSrcPropertyChanged(view, oldValue, newValue) {
  const video = view;
  let value = newValue;

  if (Utils.isString(value)) {
    value = value.trim();
    video.videoSource = null;
    video['_url'] = value;
    video.isLoadingProperty = true;
    if (Utils.isFileOrResourcePath(value)) {
      video.videoSource = videoSource.fromFileOrResource(value);
      video.isLoadingProperty = false;
    } else {
      if (video['_url'] === value) {
        video.videoSource = videoSource.fromUrl(value);
        video.isLoadingProperty = false;
      }
    }
  } else if (value instanceof videoSource.VideoSource) {
    video.videoSource = value;
  } else {
    video.videoSource = videoSource.fromNativeSource(value);
  }
}

function onImgSrcPropertyChanged(view, oldValue, newValue) {
  const video = view;
  let value = newValue;

  if (Utils.isString(value)) {
    value = value.trim();
    video['_url'] = value;
    video.isLoadingProperty = true;
    if (Utils.isFileOrResourcePath(value)) {
      video.imageSource = ImageSource.fromFileOrResourceSync(value);
      video.isLoadingProperty = false;
    } else {
      if (video['_url'] === value) {
        video.imageSource = ImageSource.fromUrl(value);
        video.isLoadingProperty = false;
      }
    }
  } else if (value instanceof ImageSource) {
    video.imageSource = value;
  } else {
    video.imageSource = new ImageSource(value);
  }
}

/**
 * VideoBase aspect/fill handling
 */
export enum VideoFill {
  default = 'default',
  aspect = 'aspect',
  aspectFill = 'aspectFill',
  fill = 'fill',
}

export class VideoBase extends View {
  public static finishedEvent = 'finished';
  public static playbackReadyEvent = 'playbackReady';
  public static playbackStartEvent = 'playbackStart';
  public static pausedEvent = 'paused';
  public static mutedEvent = 'muted';
  public static unmutedEvent = 'unmuted';
  public static volumeSetEvent = 'volumeSet';
  public static seekToTimeCompleteEvent = 'seekToTimeComplete';
  public static currentTimeUpdatedEvent = 'currentTimeUpdated';
  public static chaptersLoadedEvent = 'chaptersLoaded';
  public static errorEvent = 'error';

  /**
   * ignore modifying iOS AVAudioSession category change on initialization
   * by default, auto changes to: AVAudioSessionCategoryPlayAndRecord
   */
  public static iosIgnoreAudioSessionChange = false;

  public _emit: any = (event: string, data: any) => {
    this.notify({ eventName: event, object: this, data });
  };
  public src: string; /// video source file
  public srcType = 0; /// video source file type
  public imgSrc: string;
  public imgType = 1;
  public observeCurrentTime: boolean; // set to true if want to observe current time.
  public autoplay = false; /// set true for the video to start playing when ready
  public controls = true; /// set true to enable the media player's playback controls
  public loop = false; /// whether the video loops the playback after extends
  public muted = false;
  public fill: VideoFill = VideoFill.default;
  public detectChapters = false;
  public backgroundAudio = false;

  public encryptionKey: string = null;
  public encryptionIV: string = null;
  public encryption = '';

  public static IMAGETYPEMONO = 1;
  public static IMAGETYPESTEREOTOPBOTTOM = 2;
  public static IMAGETYPESTEREOLEFTRIGHT = 3;

  public static iosAudioSessionCategory: string;
}

export const encryptionKeyProperty = new Property<VideoBase, any>({
  name: 'encryptionKey',
});
encryptionKeyProperty.register(VideoBase);

export const encryptionIVProperty = new Property<VideoBase, any>({
  name: 'encryptionIV',
});
encryptionIVProperty.register(VideoBase);

export const encryptionProperty = new Property<VideoBase, any>({
  name: 'encryption',
});
encryptionProperty.register(VideoBase);

export const srcProperty = new Property<VideoBase, any>({
  name: 'src',
  valueChanged: onSrcPropertyChanged,
});
srcProperty.register(VideoBase);

export const srcTypeProperty = new Property<VideoBase, any>({
  name: 'srcType',
});
srcTypeProperty.register(VideoBase);

export const imgSrcProperty = new Property<VideoBase, any>({
  name: 'imgSrc',
  valueChanged: onImgSrcPropertyChanged,
});
imgSrcProperty.register(VideoBase);

export const imgTypeProperty = new Property<VideoBase, any>({
  name: 'imgType',
});
imgTypeProperty.register(VideoBase);

export const videoSourceProperty = new Property<VideoBase, any>({
  name: 'videoSource',
});
videoSourceProperty.register(VideoBase);

export const imageSourceProperty = new Property<VideoBase, any>({
  name: 'imageSource',
});
imageSourceProperty.register(VideoBase);

export const isLoadingProperty = new Property<VideoBase, boolean>({
  name: 'isLoading',
  valueConverter: booleanConverter,
});
isLoadingProperty.register(VideoBase);

export const observeCurrentTimeProperty = new Property<VideoBase, boolean>({
  name: 'observeCurrentTime',
  valueConverter: booleanConverter,
});
observeCurrentTimeProperty.register(VideoBase);

export const autoplayProperty = new Property<VideoBase, boolean>({
  name: 'autoplay',
  valueConverter: booleanConverter,
});
autoplayProperty.register(VideoBase);

export const controlsProperty = new Property<VideoBase, boolean>({
  name: 'controls',
  valueConverter: booleanConverter,
});
controlsProperty.register(VideoBase);

export const loopProperty = new Property<VideoBase, boolean>({
  name: 'loop',
  valueConverter: booleanConverter,
});
loopProperty.register(VideoBase);

export const mutedProperty = new Property<VideoBase, boolean>({
  name: 'muted',
  valueConverter: booleanConverter,
});
mutedProperty.register(VideoBase);

export const backgroundAudioProperty = new Property<VideoBase, boolean>({
  name: 'backgroundAudio',
  valueConverter: booleanConverter,
});
backgroundAudioProperty.register(VideoBase);

export const fillProperty = new Property<VideoBase, VideoFill>({
  name: 'fill',
});
fillProperty.register(VideoBase);
