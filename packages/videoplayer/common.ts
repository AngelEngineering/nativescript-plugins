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
  public static seekToTimeCompleteEvent = 'seekToTimeComplete'; //passes current time position in ms of player after seek
  public static currentTimeUpdatedEvent = 'currentTimeUpdated'; //passes current time position in ms of player after seek
  public static chaptersLoadedEvent = 'chaptersLoaded';
  public static errorEvent = 'error'; //also passes an error object

  /**
   * ignore modifying iOS AVAudioSession category change on initialization
   * by default, auto changes to: AVAudioSessionCategoryPlayAndRecord
   */
  public static iosIgnoreAudioSessionChange = false;

  public _emit: any = (event: string, data: any) => {
    this.notify({ eventName: event, object: this, data });
  };
  public src: string; /// video source file
  public observeCurrentTime: boolean; // set to true if want to observe current time during playback.
  public autoplay = false; /// set true for the video to start playing when ready
  public controls = true; /// set true to enable the media player's playback controls
  public loop = false; /// whether the video loops the playback after extends
  public muted = false;
  public fill: VideoFill = VideoFill.default;
  public detectChapters = false;
  public backgroundAudio = false;

  public static IMAGETYPEMONO = 1;
  public static IMAGETYPESTEREOTOPBOTTOM = 2;
  public static IMAGETYPESTEREOLEFTRIGHT = 3;

  public static iosAudioSessionCategory: string;
}

export const srcProperty = new Property<VideoBase, any>({
  name: 'src',
  valueChanged: onSrcPropertyChanged,
});
srcProperty.register(VideoBase);

export const videoSourceProperty = new Property<VideoBase, any>({
  name: 'videoSource',
});
videoSourceProperty.register(VideoBase);

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
