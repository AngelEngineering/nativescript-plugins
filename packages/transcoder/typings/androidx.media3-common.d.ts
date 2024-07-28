/* eslint-disable @typescript-eslint/no-loss-of-precision */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="android-declarations.d.ts"/>

declare module androidx {
  export module media3 {
    export module common {
      export class AdOverlayInfo {
        public static class: java.lang.Class<androidx.media3.common.AdOverlayInfo>;
        public static PURPOSE_CONTROLS: number = 1;
        public static PURPOSE_CLOSE_AD: number = 2;
        public static PURPOSE_OTHER: number = 3;
        public static PURPOSE_NOT_VISIBLE: number = 4;
        public view: globalAndroid.view.View;
        public purpose: number;
        public reasonDetail: string;
        /** @deprecated */
        public constructor(view: globalAndroid.view.View, purpose: number);
        /** @deprecated */
        public constructor(view: globalAndroid.view.View, purpose: number, detailedReason: string);
      }
      export module AdOverlayInfo {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.common.AdOverlayInfo.Builder>;
          public constructor(view: globalAndroid.view.View, purpose: number);
          public setDetailedReason(detailedReason: string): androidx.media3.common.AdOverlayInfo.Builder;
          public build(): androidx.media3.common.AdOverlayInfo;
        }
        export class Purpose {
          public static class: java.lang.Class<androidx.media3.common.AdOverlayInfo.Purpose>;
          /**
           * Constructs a new instance of the androidx.media3.common.AdOverlayInfo$Purpose interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class AdPlaybackState extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.AdPlaybackState>;
        public static AD_STATE_UNAVAILABLE: number = 0;
        public static AD_STATE_AVAILABLE: number = 1;
        public static AD_STATE_SKIPPED: number = 2;
        public static AD_STATE_PLAYED: number = 3;
        public static AD_STATE_ERROR: number = 4;
        public static NONE: androidx.media3.common.AdPlaybackState;
        public adsId: any;
        public adGroupCount: number;
        public adResumePositionUs: number;
        public contentDurationUs: number;
        public removedAdGroupCount: number;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.AdPlaybackState>;
        public isLivePostrollPlaceholder(adGroupIndex: number): boolean;
        public withPlayedAd(adGroupIndex: number, adIndexInAdGroup: number): androidx.media3.common.AdPlaybackState;
        public getAdGroupIndexAfterPositionUs(positionUs: number, periodDurationUs: number): number;
        public withAdGroupTimeUs(adGroupIndex: number, adGroupTimeUs: number): androidx.media3.common.AdPlaybackState;
        /** @deprecated */
        public withAvailableAdUri(adGroupIndex: number, adIndexInAdGroup: number, uri: globalAndroid.net.Uri): androidx.media3.common.AdPlaybackState;
        public withOriginalAdCount(adGroupIndex: number, originalAdCount: number): androidx.media3.common.AdPlaybackState;
        public withSkippedAd(adGroupIndex: number, adIndexInAdGroup: number): androidx.media3.common.AdPlaybackState;
        public withAdResumePositionUs(adResumePositionUs: number): androidx.media3.common.AdPlaybackState;
        public withSkippedAdGroup(adGroupIndex: number): androidx.media3.common.AdPlaybackState;
        public static fromBundle(adGroups: globalAndroid.os.Bundle): androidx.media3.common.AdPlaybackState;
        public hashCode(): number;
        public equals(o: any): boolean;
        public constructor(adsId: any, adGroupTimesUs: androidNative.Array<number>);
        public getAdGroupIndexForPositionUs(positionUs: number, periodDurationUs: number): number;
        public withRemovedAdGroupCount(this_: number): androidx.media3.common.AdPlaybackState;
        public withResetAdGroup(adGroupIndex: number): androidx.media3.common.AdPlaybackState;
        public endsWithLivePostrollPlaceHolder(): boolean;
        public withAvailableAdMediaItem(adGroupIndex: number, adIndexInAdGroup: number, mediaItem: androidx.media3.common.MediaItem): androidx.media3.common.AdPlaybackState;
        public withAvailableAd(adGroupIndex: number, adIndexInAdGroup: number): androidx.media3.common.AdPlaybackState;
        public withLastAdRemoved(adGroupIndex: number): androidx.media3.common.AdPlaybackState;
        public withLivePostrollPlaceholderAppended(): androidx.media3.common.AdPlaybackState;
        public withAdLoadError(adGroupIndex: number, adIndexInAdGroup: number): androidx.media3.common.AdPlaybackState;
        public withAdDurationsUs(adGroupIndex: number, adDurationsUs: androidNative.Array<number>): androidx.media3.common.AdPlaybackState;
        public isAdInErrorState(adGroupIndex: number, adIndexInAdGroup: number): boolean;
        public toBundle(): globalAndroid.os.Bundle;
        public withNewAdGroup(adGroupIndex: number, adGroupTimeUs: number): androidx.media3.common.AdPlaybackState;
        public withAdDurationsUs(this_: androidNative.Array<androidNative.Array<number>>): androidx.media3.common.AdPlaybackState;
        public getAdGroup(adGroupIndex: number): androidx.media3.common.AdPlaybackState.AdGroup;
        public withAdCount(adGroupIndex: number, adCount: number): androidx.media3.common.AdPlaybackState;
        public toString(): string;
        public withContentResumeOffsetUs(adGroupIndex: number, contentResumeOffsetUs: number): androidx.media3.common.AdPlaybackState;
        public withContentDurationUs(contentDurationUs: number): androidx.media3.common.AdPlaybackState;
        public withIsServerSideInserted(adGroupIndex: number, isServerSideInserted: boolean): androidx.media3.common.AdPlaybackState;
        public static fromAdPlaybackState(adGroup: any, i: androidx.media3.common.AdPlaybackState): androidx.media3.common.AdPlaybackState;
      }
      export module AdPlaybackState {
        export class AdGroup extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.AdPlaybackState.AdGroup>;
          public timeUs: number;
          public count: number;
          public originalCount: number;
          public uris: androidNative.Array<globalAndroid.net.Uri>;
          public mediaItems: androidNative.Array<androidx.media3.common.MediaItem>;
          public states: androidNative.Array<number>;
          public durationsUs: androidNative.Array<number>;
          public contentResumeOffsetUs: number;
          public isServerSideInserted: boolean;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.AdPlaybackState.AdGroup>;
          public withContentResumeOffsetUs(contentResumeOffsetUs: number): androidx.media3.common.AdPlaybackState.AdGroup;
          public withAllAdsSkipped(): androidx.media3.common.AdPlaybackState.AdGroup;
          public constructor(timeUs: number);
          public withAdDurationsUs(durationsUs: androidNative.Array<number>): androidx.media3.common.AdPlaybackState.AdGroup;
          public withLastAdRemoved(): androidx.media3.common.AdPlaybackState.AdGroup;
          public getNextAdIndexToPlay(lastPlayedAdIndex: number): number;
          public toBundle(): globalAndroid.os.Bundle;
          public withOriginalAdCount(originalCount: number): androidx.media3.common.AdPlaybackState.AdGroup;
          public equals(o: any): boolean;
          public withAdMediaItem(mediaItem: androidx.media3.common.MediaItem, index: number): androidx.media3.common.AdPlaybackState.AdGroup;
          public withAdState(state: number, index: number): androidx.media3.common.AdPlaybackState.AdGroup;
          /** @deprecated */
          public withAdUri(uri: globalAndroid.net.Uri, index: number): androidx.media3.common.AdPlaybackState.AdGroup;
          public withAdCount(count: number): androidx.media3.common.AdPlaybackState.AdGroup;
          public withIsServerSideInserted(isServerSideInserted: boolean): androidx.media3.common.AdPlaybackState.AdGroup;
          public getFirstAdIndexToPlay(): number;
          public withAllAdsReset(): androidx.media3.common.AdPlaybackState.AdGroup;
          public hasUnplayedAds(): boolean;
          public shouldPlayAdGroup(): boolean;
          public hashCode(): number;
          public withTimeUs(timeUs: number): androidx.media3.common.AdPlaybackState.AdGroup;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.AdPlaybackState.AdGroup;
        }
        export class AdState {
          public static class: java.lang.Class<androidx.media3.common.AdPlaybackState.AdState>;
          /**
           * Constructs a new instance of the androidx.media3.common.AdPlaybackState$AdState interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class AdViewProvider {
        public static class: java.lang.Class<androidx.media3.common.AdViewProvider>;
        /**
         * Constructs a new instance of the androidx.media3.common.AdViewProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { getAdViewGroup(): globalAndroid.view.ViewGroup; getAdOverlayInfos(): java.util.List<androidx.media3.common.AdOverlayInfo> });
        public constructor();
        public getAdOverlayInfos(): java.util.List<androidx.media3.common.AdOverlayInfo>;
        public getAdViewGroup(): globalAndroid.view.ViewGroup;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class AudioAttributes extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.AudioAttributes>;
        public static DEFAULT: androidx.media3.common.AudioAttributes;
        public contentType: number;
        public flags: number;
        public usage: number;
        public allowedCapturePolicy: number;
        public spatializationBehavior: number;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.AudioAttributes>;
        public equals(obj: any): boolean;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.AudioAttributes;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public getAudioAttributesV21(): androidx.media3.common.AudioAttributes.AudioAttributesV21;
      }
      export module AudioAttributes {
        export class Api29 {
          public static class: java.lang.Class<androidx.media3.common.AudioAttributes.Api29>;
          public static setAllowedCapturePolicy(builder: any, allowedCapturePolicy: number): void;
        }
        export class Api32 {
          public static class: java.lang.Class<androidx.media3.common.AudioAttributes.Api32>;
          public static setSpatializationBehavior(builder: any, spatializationBehavior: number): void;
        }
        export class AudioAttributesV21 {
          public static class: java.lang.Class<androidx.media3.common.AudioAttributes.AudioAttributesV21>;
          public audioAttributes: any;
        }
        export class Builder {
          public static class: java.lang.Class<androidx.media3.common.AudioAttributes.Builder>;
          public setContentType(contentType: number): androidx.media3.common.AudioAttributes.Builder;
          public setAllowedCapturePolicy(allowedCapturePolicy: number): androidx.media3.common.AudioAttributes.Builder;
          public constructor();
          public build(): androidx.media3.common.AudioAttributes;
          public setFlags(flags: number): androidx.media3.common.AudioAttributes.Builder;
          public setUsage(usage: number): androidx.media3.common.AudioAttributes.Builder;
          public setSpatializationBehavior(spatializationBehavior: number): androidx.media3.common.AudioAttributes.Builder;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class AuxEffectInfo {
        public static class: java.lang.Class<androidx.media3.common.AuxEffectInfo>;
        public static NO_AUX_EFFECT_ID: number = 0;
        public effectId: number;
        public sendLevel: number;
        public constructor(effectId: number, sendLevel: number);
        public hashCode(): number;
        public equals(o: any): boolean;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export abstract class BasePlayer extends androidx.media3.common.Player {
        public static class: java.lang.Class<androidx.media3.common.BasePlayer>;
        public window: androidx.media3.common.Timeline.Window;
        public getContentBufferedPosition(): number;
        public setDeviceMuted(param0: boolean, param1: number): void;
        public getMediaItemAt(index: number): androidx.media3.common.MediaItem;
        public getSurfaceSize(): androidx.media3.common.util.Size;
        public isCommandAvailable(param0: number): boolean;
        public getMediaMetadata(): androidx.media3.common.MediaMetadata;
        public getCurrentLiveOffset(): number;
        public isDeviceMuted(): boolean;
        public addMediaItem(index: number, mediaItem: androidx.media3.common.MediaItem): void;
        /** @deprecated */
        public next(): void;
        public setPlayWhenReady(param0: boolean): void;
        public prepare(): void;
        public getDeviceInfo(): androidx.media3.common.DeviceInfo;
        public addListener(param0: androidx.media3.common.Player.Listener): void;
        public getVideoSize(): androidx.media3.common.VideoSize;
        /** @deprecated */
        public setDeviceMuted(param0: boolean): void;
        public seekTo(param0: number, param1: number): void;
        public getBufferedPercentage(): number;
        public moveMediaItem(param0: number, param1: number): void;
        public setVideoSurface(param0: globalAndroid.view.Surface): void;
        public getApplicationLooper(): globalAndroid.os.Looper;
        public getNextMediaItemIndex(): number;
        public getAudioAttributes(): androidx.media3.common.AudioAttributes;
        /** @deprecated */
        public seekToPreviousWindow(): void;
        public getAvailableCommands(): androidx.media3.common.Player.Commands;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>, param1: number, param2: number): void;
        public clearVideoSurfaceView(param0: globalAndroid.view.SurfaceView): void;
        /** @deprecated */
        public setDeviceVolume(param0: number): void;
        public setMediaItem(param0: androidx.media3.common.MediaItem, param1: boolean): void;
        /** @deprecated */
        public getNextWindowIndex(): number;
        public getContentDuration(): number;
        public replaceMediaItem(index: number, mediaItem: androidx.media3.common.MediaItem): void;
        public getCurrentPosition(): number;
        /** @deprecated */
        public getPreviousWindowIndex(): number;
        public seekToNext(): void;
        public setPlaybackSpeed(speed: number): void;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>): void;
        public getCurrentPeriodIndex(): number;
        /** @deprecated */
        public seekToNextWindow(): void;
        public getShuffleModeEnabled(): boolean;
        /** @deprecated */
        public increaseDeviceVolume(): void;
        public getCurrentMediaItemIndex(): number;
        public replaceMediaItem(param0: number, param1: androidx.media3.common.MediaItem): void;
        public getTrackSelectionParameters(): androidx.media3.common.TrackSelectionParameters;
        public getDuration(): number;
        public seekToDefaultPosition(mediaItemIndex: number): void;
        public seekTo(mediaItemIndex: number, positionMs: number): void;
        public increaseDeviceVolume(param0: number): void;
        /** @deprecated */
        public hasNext(): boolean;
        public isLoading(): boolean;
        /** @deprecated */
        public hasPrevious(): boolean;
        public seekToPreviousMediaItem(): void;
        public seekTo(positionMs: number): void;
        public seekTo(param0: number, param1: number, param2: number, param3: boolean): void;
        public getSeekForwardIncrement(): number;
        public removeListener(param0: androidx.media3.common.Player.Listener): void;
        public getBufferedPosition(): number;
        public seekToPrevious(): void;
        public addMediaItems(param0: number, param1: java.util.List<androidx.media3.common.MediaItem>): void;
        public hasPreviousMediaItem(): boolean;
        public getPlaybackParameters(): androidx.media3.common.PlaybackParameters;
        public setMediaItem(mediaItem: androidx.media3.common.MediaItem, startPositionMs: number): void;
        public getMediaItemCount(): number;
        public getCurrentAdIndexInAdGroup(): number;
        public release(): void;
        public getPlaybackSuppressionReason(): number;
        public isPlaying(): boolean;
        public moveMediaItems(param0: number, param1: number, param2: number): void;
        public getContentPosition(): number;
        public clearVideoSurface(param0: globalAndroid.view.Surface): void;
        public getCurrentTracks(): androidx.media3.common.Tracks;
        /** @deprecated */
        public hasNextWindow(): boolean;
        public getPlayerError(): androidx.media3.common.PlaybackException;
        public getCurrentTimeline(): androidx.media3.common.Timeline;
        public clearMediaItems(): void;
        /** @deprecated */
        public getCurrentWindowIndex(): number;
        public getCurrentMediaItem(): androidx.media3.common.MediaItem;
        public clearVideoSurfaceHolder(param0: globalAndroid.view.SurfaceHolder): void;
        public getPlaybackState(): number;
        public setDeviceVolume(param0: number, param1: number): void;
        public getCurrentCues(): androidx.media3.common.text.CueGroup;
        public isCurrentMediaItemDynamic(): boolean;
        public isCurrentMediaItemLive(): boolean;
        public getCurrentAdGroupIndex(): number;
        public setMediaItem(mediaItem: androidx.media3.common.MediaItem, resetPosition: boolean): void;
        public removeMediaItem(param0: number): void;
        public getMediaItemAt(param0: number): androidx.media3.common.MediaItem;
        public constructor();
        public setPlaybackParameters(param0: androidx.media3.common.PlaybackParameters): void;
        public seekToDefaultPosition(): void;
        public setVolume(param0: number): void;
        public addMediaItems(mediaItems: java.util.List<androidx.media3.common.MediaItem>): void;
        public setVideoSurfaceHolder(param0: globalAndroid.view.SurfaceHolder): void;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>, param1: boolean): void;
        public addMediaItem(param0: androidx.media3.common.MediaItem): void;
        public isCurrentMediaItemSeekable(): boolean;
        public setTrackSelectionParameters(param0: androidx.media3.common.TrackSelectionParameters): void;
        /** @deprecated */
        public isCurrentWindowDynamic(): boolean;
        public replaceMediaItems(param0: number, param1: number, param2: java.util.List<androidx.media3.common.MediaItem>): void;
        public getDeviceVolume(): number;
        public setMediaItems(mediaItems: java.util.List<androidx.media3.common.MediaItem>): void;
        /** @deprecated */
        public isCurrentWindowLive(): boolean;
        public seekTo(param0: number): void;
        public removeMediaItems(param0: number, param1: number): void;
        public getPlaylistMetadata(): androidx.media3.common.MediaMetadata;
        public clearVideoTextureView(param0: globalAndroid.view.TextureView): void;
        public getVolume(): number;
        public removeMediaItem(index: number): void;
        public setMediaItem(param0: androidx.media3.common.MediaItem): void;
        public canAdvertiseSession(): boolean;
        public setRepeatMode(param0: number): void;
        public addMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>): void;
        public getSeekBackIncrement(): number;
        public setVideoTextureView(param0: globalAndroid.view.TextureView): void;
        public getPlayWhenReady(): boolean;
        public seekToNextMediaItem(): void;
        /** @deprecated */
        public previous(): void;
        public isPlayingAd(): boolean;
        /** @deprecated */
        public hasPreviousWindow(): boolean;
        public getPreviousMediaItemIndex(): number;
        public setAudioAttributes(param0: androidx.media3.common.AudioAttributes, param1: boolean): void;
        public addMediaItem(mediaItem: androidx.media3.common.MediaItem): void;
        public clearVideoSurface(): void;
        public decreaseDeviceVolume(param0: number): void;
        public setVideoSurfaceView(param0: globalAndroid.view.SurfaceView): void;
        public setPlaybackSpeed(param0: number): void;
        public seekToDefaultPosition(param0: number): void;
        public getMaxSeekToPreviousPosition(): number;
        public play(): void;
        public pause(): void;
        public seekForward(): void;
        public getRepeatMode(): number;
        public hasNextMediaItem(): boolean;
        public addMediaItem(param0: number, param1: androidx.media3.common.MediaItem): void;
        public setPlaylistMetadata(param0: androidx.media3.common.MediaMetadata): void;
        public stop(): void;
        public setShuffleModeEnabled(param0: boolean): void;
        /** @deprecated */
        public decreaseDeviceVolume(): void;
        public setMediaItem(param0: androidx.media3.common.MediaItem, param1: number): void;
        public getTotalBufferedDuration(): number;
        public seekBack(): void;
        public isCommandAvailable(command: number): boolean;
        /** @deprecated */
        public isCurrentWindowSeekable(): boolean;
        public setMediaItem(mediaItem: androidx.media3.common.MediaItem): void;
        public moveMediaItem(currentIndex: number, newIndex: number): void;
        public getCurrentManifest(): any;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class BuildConfig {
        public static class: java.lang.Class<androidx.media3.common.BuildConfig>;
        public static DEBUG: boolean = 0;
        public static LIBRARY_PACKAGE_NAME: string = 'androidx.media3.common';
        public static BUILD_TYPE: string = 'release';
        public constructor();
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class BundleListRetriever {
        public static class: java.lang.Class<androidx.media3.common.BundleListRetriever>;
        public constructor(list: java.util.List<globalAndroid.os.Bundle>);
        public static getList(binder: globalAndroid.os.IBinder): com.google.common.collect.ImmutableList<globalAndroid.os.Bundle>;
        public onTransact(code: number, data: globalAndroid.os.Parcel, reply: globalAndroid.os.Parcel, flags: number): boolean;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class Bundleable {
        public static class: java.lang.Class<androidx.media3.common.Bundleable>;
        /**
         * Constructs a new instance of the androidx.media3.common.Bundleable interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { toBundle(): globalAndroid.os.Bundle });
        public constructor();
        public toBundle(): globalAndroid.os.Bundle;
      }
      export module Bundleable {
        export class Creator<T> extends java.lang.Object {
          public static class: java.lang.Class<androidx.media3.common.Bundleable.Creator<any>>;
          /**
           * Constructs a new instance of the androidx.media3.common.Bundleable$Creator interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { fromBundle(param0: globalAndroid.os.Bundle): T });
          public constructor();
          public fromBundle(param0: globalAndroid.os.Bundle): T;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class C {
        public static class: java.lang.Class<androidx.media3.common.C>;
        public static TIME_END_OF_SOURCE: number = -9223372036854775808;
        public static TIME_UNSET: number = -9223372036854775807;
        public static INDEX_UNSET: number = -1;
        public static POSITION_UNSET: number = -1;
        public static RATE_UNSET: number = -3.4028235e38;
        public static RATE_UNSET_INT: number = -2147483647;
        public static LENGTH_UNSET: number = -1;
        public static PERCENTAGE_UNSET: number = -1;
        public static MILLIS_PER_SECOND: number = 1000;
        public static MICROS_PER_SECOND: number = 1000000;
        public static NANOS_PER_SECOND: number = 1000000000;
        public static BITS_PER_BYTE: number = 8;
        public static BYTES_PER_FLOAT: number = 4;
        public static SERIF_NAME: string = 'serif';
        public static SANS_SERIF_NAME: string = 'sans-serif';
        public static SSAI_SCHEME: string = 'ssai';
        public static CRYPTO_TYPE_NONE: number = 0;
        public static CRYPTO_TYPE_UNSUPPORTED: number = 1;
        public static CRYPTO_TYPE_FRAMEWORK: number = 2;
        public static CRYPTO_TYPE_CUSTOM_BASE: number = 10000;
        public static CRYPTO_MODE_UNENCRYPTED: number = 0;
        public static CRYPTO_MODE_AES_CTR: number = 1;
        public static CRYPTO_MODE_AES_CBC: number = 2;
        public static AUDIO_SESSION_ID_UNSET: number = 0;
        public static ENCODING_INVALID: number = 0;
        public static ENCODING_PCM_8BIT: number = 3;
        public static ENCODING_PCM_16BIT: number = 2;
        public static ENCODING_PCM_16BIT_BIG_ENDIAN: number = 268435456;
        public static ENCODING_PCM_24BIT: number = 21;
        public static ENCODING_PCM_24BIT_BIG_ENDIAN: number = 1342177280;
        public static ENCODING_PCM_32BIT: number = 22;
        public static ENCODING_PCM_32BIT_BIG_ENDIAN: number = 1610612736;
        public static ENCODING_PCM_FLOAT: number = 4;
        public static ENCODING_MP3: number = 9;
        public static ENCODING_AAC_LC: number = 10;
        public static ENCODING_AAC_HE_V1: number = 11;
        public static ENCODING_AAC_HE_V2: number = 12;
        public static ENCODING_AAC_XHE: number = 16;
        public static ENCODING_AAC_ELD: number = 15;
        public static ENCODING_AAC_ER_BSAC: number = 1073741824;
        public static ENCODING_AC3: number = 5;
        public static ENCODING_E_AC3: number = 6;
        public static ENCODING_E_AC3_JOC: number = 18;
        public static ENCODING_AC4: number = 17;
        public static ENCODING_DTS: number = 7;
        public static ENCODING_DTS_HD: number = 8;
        public static ENCODING_DTS_UHD_P2: number = 30;
        public static ENCODING_DOLBY_TRUEHD: number = 14;
        public static ENCODING_OPUS: number = 20;
        public static SPATIALIZATION_BEHAVIOR_AUTO: number = 0;
        public static SPATIALIZATION_BEHAVIOR_NEVER: number = 1;
        public static STREAM_TYPE_ALARM: number = 4;
        public static STREAM_TYPE_DTMF: number = 8;
        public static STREAM_TYPE_MUSIC: number = 3;
        public static STREAM_TYPE_NOTIFICATION: number = 5;
        public static STREAM_TYPE_RING: number = 2;
        public static STREAM_TYPE_SYSTEM: number = 1;
        public static STREAM_TYPE_VOICE_CALL: number = 0;
        public static STREAM_TYPE_DEFAULT: number = 3;
        public static VOLUME_FLAG_SHOW_UI: number = 1;
        public static VOLUME_FLAG_ALLOW_RINGER_MODES: number = 2;
        public static VOLUME_FLAG_PLAY_SOUND: number = 4;
        public static VOLUME_FLAG_REMOVE_SOUND_AND_VIBRATE: number = 8;
        public static VOLUME_FLAG_VIBRATE: number = 16;
        public static AUDIO_CONTENT_TYPE_MOVIE: number = 3;
        public static CONTENT_TYPE_MOVIE: number = 3;
        public static AUDIO_CONTENT_TYPE_MUSIC: number = 2;
        public static CONTENT_TYPE_MUSIC: number = 2;
        public static AUDIO_CONTENT_TYPE_SONIFICATION: number = 4;
        public static CONTENT_TYPE_SONIFICATION: number = 4;
        public static AUDIO_CONTENT_TYPE_SPEECH: number = 1;
        public static CONTENT_TYPE_SPEECH: number = 1;
        public static AUDIO_CONTENT_TYPE_UNKNOWN: number = 0;
        public static CONTENT_TYPE_UNKNOWN: number = 0;
        public static FLAG_AUDIBILITY_ENFORCED: number = 1;
        public static USAGE_ALARM: number = 4;
        public static USAGE_ASSISTANCE_ACCESSIBILITY: number = 11;
        public static USAGE_ASSISTANCE_NAVIGATION_GUIDANCE: number = 12;
        public static USAGE_ASSISTANCE_SONIFICATION: number = 13;
        public static USAGE_ASSISTANT: number = 16;
        public static USAGE_GAME: number = 14;
        public static USAGE_MEDIA: number = 1;
        public static USAGE_NOTIFICATION: number = 5;
        public static USAGE_NOTIFICATION_COMMUNICATION_DELAYED: number = 9;
        public static USAGE_NOTIFICATION_COMMUNICATION_INSTANT: number = 8;
        public static USAGE_NOTIFICATION_COMMUNICATION_REQUEST: number = 7;
        public static USAGE_NOTIFICATION_EVENT: number = 10;
        public static USAGE_NOTIFICATION_RINGTONE: number = 6;
        public static USAGE_UNKNOWN: number = 0;
        public static USAGE_VOICE_COMMUNICATION: number = 2;
        public static USAGE_VOICE_COMMUNICATION_SIGNALLING: number = 3;
        public static ALLOW_CAPTURE_BY_ALL: number = 1;
        public static ALLOW_CAPTURE_BY_NONE: number = 3;
        public static ALLOW_CAPTURE_BY_SYSTEM: number = 2;
        public static BUFFER_FLAG_KEY_FRAME: number = 1;
        public static BUFFER_FLAG_END_OF_STREAM: number = 4;
        public static BUFFER_FLAG_FIRST_SAMPLE: number = 134217728;
        public static BUFFER_FLAG_HAS_SUPPLEMENTAL_DATA: number = 268435456;
        public static BUFFER_FLAG_LAST_SAMPLE: number = 536870912;
        public static BUFFER_FLAG_ENCRYPTED: number = 1073741824;
        public static BUFFER_FLAG_DECODE_ONLY: number = -2147483648;
        public static MEDIA_CODEC_PRIORITY_REALTIME: number = 0;
        public static MEDIA_CODEC_PRIORITY_NON_REALTIME: number = 1;
        public static VIDEO_OUTPUT_MODE_NONE: number = -1;
        public static VIDEO_OUTPUT_MODE_YUV: number = 0;
        public static VIDEO_OUTPUT_MODE_SURFACE_YUV: number = 1;
        public static VIDEO_SCALING_MODE_SCALE_TO_FIT: number = 1;
        public static VIDEO_SCALING_MODE_SCALE_TO_FIT_WITH_CROPPING: number = 2;
        public static VIDEO_SCALING_MODE_DEFAULT: number = 1;
        public static VIDEO_CHANGE_FRAME_RATE_STRATEGY_OFF: number = -2147483648;
        public static VIDEO_CHANGE_FRAME_RATE_STRATEGY_ONLY_IF_SEAMLESS: number = 0;
        public static SELECTION_FLAG_DEFAULT: number = 1;
        public static SELECTION_FLAG_FORCED: number = 2;
        public static SELECTION_FLAG_AUTOSELECT: number = 4;
        public static LANGUAGE_UNDETERMINED: string = 'und';
        public static CONTENT_TYPE_DASH: number = 0;
        public static TYPE_DASH: number = 0;
        public static CONTENT_TYPE_SS: number = 1;
        public static TYPE_SS: number = 1;
        public static CONTENT_TYPE_HLS: number = 2;
        public static TYPE_HLS: number = 2;
        public static CONTENT_TYPE_RTSP: number = 3;
        public static TYPE_RTSP: number = 3;
        public static CONTENT_TYPE_OTHER: number = 4;
        public static TYPE_OTHER: number = 4;
        public static RESULT_END_OF_INPUT: number = -1;
        public static RESULT_MAX_LENGTH_EXCEEDED: number = -2;
        public static RESULT_NOTHING_READ: number = -3;
        public static RESULT_BUFFER_READ: number = -4;
        public static RESULT_FORMAT_READ: number = -5;
        public static DATA_TYPE_UNKNOWN: number = 0;
        public static DATA_TYPE_MEDIA: number = 1;
        public static DATA_TYPE_MEDIA_INITIALIZATION: number = 2;
        public static DATA_TYPE_DRM: number = 3;
        public static DATA_TYPE_MANIFEST: number = 4;
        public static DATA_TYPE_TIME_SYNCHRONIZATION: number = 5;
        public static DATA_TYPE_AD: number = 6;
        public static DATA_TYPE_MEDIA_PROGRESSIVE_LIVE: number = 7;
        public static DATA_TYPE_CUSTOM_BASE: number = 10000;
        public static TRACK_TYPE_NONE: number = -2;
        public static TRACK_TYPE_UNKNOWN: number = -1;
        public static TRACK_TYPE_DEFAULT: number = 0;
        public static TRACK_TYPE_AUDIO: number = 1;
        public static TRACK_TYPE_VIDEO: number = 2;
        public static TRACK_TYPE_TEXT: number = 3;
        public static TRACK_TYPE_IMAGE: number = 4;
        public static TRACK_TYPE_METADATA: number = 5;
        public static TRACK_TYPE_CAMERA_MOTION: number = 6;
        public static TRACK_TYPE_CUSTOM_BASE: number = 10000;
        public static SELECTION_REASON_UNKNOWN: number = 0;
        public static SELECTION_REASON_INITIAL: number = 1;
        public static SELECTION_REASON_MANUAL: number = 2;
        public static SELECTION_REASON_ADAPTIVE: number = 3;
        public static SELECTION_REASON_TRICK_PLAY: number = 4;
        public static SELECTION_REASON_CUSTOM_BASE: number = 10000;
        public static DEFAULT_BUFFER_SEGMENT_SIZE: number = 65536;
        public static DEFAULT_SEEK_BACK_INCREMENT_MS: number = 5000;
        public static DEFAULT_SEEK_FORWARD_INCREMENT_MS: number = 15000;
        public static DEFAULT_MAX_SEEK_TO_PREVIOUS_POSITION_MS: number = 3000;
        public static CENC_TYPE_cenc: string = 'cenc';
        public static CENC_TYPE_cbc1: string = 'cbc1';
        public static CENC_TYPE_cens: string = 'cens';
        public static CENC_TYPE_cbcs: string = 'cbcs';
        public static UUID_NIL: java.util.UUID;
        public static COMMON_PSSH_UUID: java.util.UUID;
        public static CLEARKEY_UUID: java.util.UUID;
        public static WIDEVINE_UUID: java.util.UUID;
        public static PLAYREADY_UUID: java.util.UUID;
        public static STEREO_MODE_MONO: number = 0;
        public static STEREO_MODE_TOP_BOTTOM: number = 1;
        public static STEREO_MODE_LEFT_RIGHT: number = 2;
        public static STEREO_MODE_STEREO_MESH: number = 3;
        public static COLOR_SPACE_BT601: number = 2;
        public static COLOR_SPACE_BT709: number = 1;
        public static COLOR_SPACE_BT2020: number = 6;
        public static COLOR_TRANSFER_LINEAR: number = 1;
        public static COLOR_TRANSFER_SDR: number = 3;
        public static COLOR_TRANSFER_SRGB: number = 2;
        public static COLOR_TRANSFER_GAMMA_2_2: number = 10;
        public static COLOR_TRANSFER_ST2084: number = 6;
        public static COLOR_TRANSFER_HLG: number = 7;
        public static COLOR_RANGE_LIMITED: number = 2;
        public static COLOR_RANGE_FULL: number = 1;
        public static PROJECTION_RECTANGULAR: number = 0;
        public static PROJECTION_EQUIRECTANGULAR: number = 1;
        public static PROJECTION_CUBEMAP: number = 2;
        public static PROJECTION_MESH: number = 3;
        public static PRIORITY_PLAYBACK: number = 0;
        public static PRIORITY_DOWNLOAD: number = -1000;
        public static NETWORK_TYPE_UNKNOWN: number = 0;
        public static NETWORK_TYPE_OFFLINE: number = 1;
        public static NETWORK_TYPE_WIFI: number = 2;
        public static NETWORK_TYPE_2G: number = 3;
        public static NETWORK_TYPE_3G: number = 4;
        public static NETWORK_TYPE_4G: number = 5;
        public static NETWORK_TYPE_5G_SA: number = 9;
        public static NETWORK_TYPE_5G_NSA: number = 10;
        public static NETWORK_TYPE_CELLULAR_UNKNOWN: number = 6;
        public static NETWORK_TYPE_ETHERNET: number = 7;
        public static NETWORK_TYPE_OTHER: number = 8;
        public static WAKE_MODE_NONE: number = 0;
        public static WAKE_MODE_LOCAL: number = 1;
        public static WAKE_MODE_NETWORK: number = 2;
        public static ROLE_FLAG_MAIN: number = 1;
        public static ROLE_FLAG_ALTERNATE: number = 2;
        public static ROLE_FLAG_SUPPLEMENTARY: number = 4;
        public static ROLE_FLAG_COMMENTARY: number = 8;
        public static ROLE_FLAG_DUB: number = 16;
        public static ROLE_FLAG_EMERGENCY: number = 32;
        public static ROLE_FLAG_CAPTION: number = 64;
        public static ROLE_FLAG_SUBTITLE: number = 128;
        public static ROLE_FLAG_SIGN: number = 256;
        public static ROLE_FLAG_DESCRIBES_VIDEO: number = 512;
        public static ROLE_FLAG_DESCRIBES_MUSIC_AND_SOUND: number = 1024;
        public static ROLE_FLAG_ENHANCED_DIALOG_INTELLIGIBILITY: number = 2048;
        public static ROLE_FLAG_TRANSCRIBES_DIALOG: number = 4096;
        public static ROLE_FLAG_EASY_TO_READ: number = 8192;
        public static ROLE_FLAG_TRICK_PLAY: number = 16384;
        public static FORMAT_HANDLED: number = 4;
        public static FORMAT_EXCEEDS_CAPABILITIES: number = 3;
        public static FORMAT_UNSUPPORTED_DRM: number = 2;
        public static FORMAT_UNSUPPORTED_SUBTYPE: number = 1;
        public static FORMAT_UNSUPPORTED_TYPE: number = 0;
        public static FIRST_FRAME_NOT_RENDERED_ONLY_ALLOWED_IF_STARTED: number = 0;
        public static FIRST_FRAME_NOT_RENDERED: number = 1;
        public static FIRST_FRAME_NOT_RENDERED_AFTER_STREAM_CHANGE: number = 2;
        public static FIRST_FRAME_RENDERED: number = 3;
        /** @deprecated */
        public static getFormatSupportString(formatSupport: number): string;
        /** @deprecated */
        public static getErrorCodeForMediaDrmErrorCode(mediaDrmErrorCode: number): number;
        /** @deprecated */
        public static generateAudioSessionIdV21(context: globalAndroid.content.Context): number;
        /** @deprecated */
        public static usToMs(timeUs: number): number;
        /** @deprecated */
        public static msToUs(timeMs: number): number;
      }
      export module C {
        export class AudioAllowedCapturePolicy {
          public static class: java.lang.Class<androidx.media3.common.C.AudioAllowedCapturePolicy>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$AudioAllowedCapturePolicy interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class AudioContentType {
          public static class: java.lang.Class<androidx.media3.common.C.AudioContentType>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$AudioContentType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class AudioFlags {
          public static class: java.lang.Class<androidx.media3.common.C.AudioFlags>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$AudioFlags interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class AudioUsage {
          public static class: java.lang.Class<androidx.media3.common.C.AudioUsage>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$AudioUsage interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class BufferFlags {
          public static class: java.lang.Class<androidx.media3.common.C.BufferFlags>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$BufferFlags interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class ColorRange {
          public static class: java.lang.Class<androidx.media3.common.C.ColorRange>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$ColorRange interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class ColorSpace {
          public static class: java.lang.Class<androidx.media3.common.C.ColorSpace>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$ColorSpace interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class ColorTransfer {
          public static class: java.lang.Class<androidx.media3.common.C.ColorTransfer>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$ColorTransfer interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class ContentType {
          public static class: java.lang.Class<androidx.media3.common.C.ContentType>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$ContentType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class CryptoMode {
          public static class: java.lang.Class<androidx.media3.common.C.CryptoMode>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$CryptoMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class CryptoType {
          public static class: java.lang.Class<androidx.media3.common.C.CryptoType>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$CryptoType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class DataType {
          public static class: java.lang.Class<androidx.media3.common.C.DataType>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$DataType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class Encoding {
          public static class: java.lang.Class<androidx.media3.common.C.Encoding>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$Encoding interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class FirstFrameState {
          public static class: java.lang.Class<androidx.media3.common.C.FirstFrameState>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$FirstFrameState interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class FormatSupport {
          public static class: java.lang.Class<androidx.media3.common.C.FormatSupport>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$FormatSupport interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class NetworkType {
          public static class: java.lang.Class<androidx.media3.common.C.NetworkType>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$NetworkType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class PcmEncoding {
          public static class: java.lang.Class<androidx.media3.common.C.PcmEncoding>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$PcmEncoding interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class Projection {
          public static class: java.lang.Class<androidx.media3.common.C.Projection>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$Projection interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class RoleFlags {
          public static class: java.lang.Class<androidx.media3.common.C.RoleFlags>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$RoleFlags interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class SelectionFlags {
          public static class: java.lang.Class<androidx.media3.common.C.SelectionFlags>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$SelectionFlags interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class SelectionReason {
          public static class: java.lang.Class<androidx.media3.common.C.SelectionReason>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$SelectionReason interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class SpatializationBehavior {
          public static class: java.lang.Class<androidx.media3.common.C.SpatializationBehavior>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$SpatializationBehavior interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class StereoMode {
          public static class: java.lang.Class<androidx.media3.common.C.StereoMode>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$StereoMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class StreamType {
          public static class: java.lang.Class<androidx.media3.common.C.StreamType>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$StreamType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class TrackType {
          public static class: java.lang.Class<androidx.media3.common.C.TrackType>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$TrackType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class VideoChangeFrameRateStrategy {
          public static class: java.lang.Class<androidx.media3.common.C.VideoChangeFrameRateStrategy>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$VideoChangeFrameRateStrategy interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class VideoOutputMode {
          public static class: java.lang.Class<androidx.media3.common.C.VideoOutputMode>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$VideoOutputMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class VideoScalingMode {
          public static class: java.lang.Class<androidx.media3.common.C.VideoScalingMode>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$VideoScalingMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class VolumeFlags {
          public static class: java.lang.Class<androidx.media3.common.C.VolumeFlags>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$VolumeFlags interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class WakeMode {
          public static class: java.lang.Class<androidx.media3.common.C.WakeMode>;
          /**
           * Constructs a new instance of the androidx.media3.common.C$WakeMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class ColorInfo extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.ColorInfo>;
        public static SDR_BT709_LIMITED: androidx.media3.common.ColorInfo;
        public static SRGB_BT709_FULL: androidx.media3.common.ColorInfo;
        public colorSpace: number;
        public colorRange: number;
        public colorTransfer: number;
        public hdrStaticInfo: androidNative.Array<number>;
        public lumaBitdepth: number;
        public chromaBitdepth: number;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.ColorInfo>;
        public static isoTransferCharacteristicsToColorTransfer(isoTransferCharacteristics: number): number;
        public buildUpon(): androidx.media3.common.ColorInfo.Builder;
        public static isEquivalentToAssumedSdrDefault(colorInfo: androidx.media3.common.ColorInfo): boolean;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.ColorInfo;
        public toBundle(): globalAndroid.os.Bundle;
        public isValid(): boolean;
        public toString(): string;
        public static isoColorPrimariesToColorSpace(isoColorPrimaries: number): number;
        public static isTransferHdr(colorInfo: androidx.media3.common.ColorInfo): boolean;
        public equals(obj: any): boolean;
        public isBitdepthValid(): boolean;
        public hashCode(): number;
        public isDataSpaceValid(): boolean;
        public toLogString(): string;
      }
      export module ColorInfo {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.common.ColorInfo.Builder>;
          public setColorRange(colorRange: number): androidx.media3.common.ColorInfo.Builder;
          public constructor();
          public setLumaBitdepth(lumaBitdepth: number): androidx.media3.common.ColorInfo.Builder;
          public setChromaBitdepth(chromaBitdepth: number): androidx.media3.common.ColorInfo.Builder;
          public setColorSpace(colorSpace: number): androidx.media3.common.ColorInfo.Builder;
          public setColorTransfer(colorTransfer: number): androidx.media3.common.ColorInfo.Builder;
          public setHdrStaticInfo(hdrStaticInfo: androidNative.Array<number>): androidx.media3.common.ColorInfo.Builder;
          public build(): androidx.media3.common.ColorInfo;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class DataReader {
        public static class: java.lang.Class<androidx.media3.common.DataReader>;
        /**
         * Constructs a new instance of the androidx.media3.common.DataReader interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { read(param0: androidNative.Array<number>, param1: number, param2: number): number });
        public constructor();
        public read(param0: androidNative.Array<number>, param1: number, param2: number): number;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class DebugViewProvider {
        public static class: java.lang.Class<androidx.media3.common.DebugViewProvider>;
        /**
         * Constructs a new instance of the androidx.media3.common.DebugViewProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          getDebugPreviewSurfaceView(param0: number, param1: number): globalAndroid.view.SurfaceView;
          lambda$static$0(width: number, height: number): globalAndroid.view.SurfaceView;
          '<clinit>'(): void;
        });
        public constructor();
        public static NONE: androidx.media3.common.DebugViewProvider;
        public getDebugPreviewSurfaceView(param0: number, param1: number): globalAndroid.view.SurfaceView;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class DeviceInfo extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.DeviceInfo>;
        public static PLAYBACK_TYPE_LOCAL: number = 0;
        public static PLAYBACK_TYPE_REMOTE: number = 1;
        public static UNKNOWN: androidx.media3.common.DeviceInfo;
        public playbackType: number;
        public minVolume: number;
        public maxVolume: number;
        public routingControllerId: string;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.DeviceInfo>;
        /** @deprecated */
        public constructor(playbackType: number, minVolume: number, maxVolume: number);
        public equals(obj: any): boolean;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.DeviceInfo;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
      }
      export module DeviceInfo {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.common.DeviceInfo.Builder>;
          public constructor(playbackType: number);
          public build(): androidx.media3.common.DeviceInfo;
          public setRoutingControllerId(routingControllerId: string): androidx.media3.common.DeviceInfo.Builder;
          public setMinVolume(minVolume: number): androidx.media3.common.DeviceInfo.Builder;
          public setMaxVolume(maxVolume: number): androidx.media3.common.DeviceInfo.Builder;
        }
        export class PlaybackType {
          public static class: java.lang.Class<androidx.media3.common.DeviceInfo.PlaybackType>;
          /**
           * Constructs a new instance of the androidx.media3.common.DeviceInfo$PlaybackType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class DrmInitData extends java.lang.Object {
        public static class: java.lang.Class<androidx.media3.common.DrmInitData>;
        public schemeType: string;
        public schemeDataCount: number;
        public static CREATOR: globalAndroid.os.Parcelable.Creator<androidx.media3.common.DrmInitData>;
        public constructor(schemeType: string, schemeDatas: java.util.List<androidx.media3.common.DrmInitData.SchemeData>);
        public copyWithSchemeType(schemeType: string): androidx.media3.common.DrmInitData;
        public merge(drmInitData: androidx.media3.common.DrmInitData): androidx.media3.common.DrmInitData;
        public get(index: number): androidx.media3.common.DrmInitData.SchemeData;
        public writeToParcel(dest: globalAndroid.os.Parcel, flags: number): void;
        public constructor(schemeType: string, schemeDatas: androidNative.Array<androidx.media3.common.DrmInitData.SchemeData>);
        public equals(obj: any): boolean;
        public hashCode(): number;
        public describeContents(): number;
        public constructor(schemeDatas: androidNative.Array<androidx.media3.common.DrmInitData.SchemeData>);
        public compare(first: androidx.media3.common.DrmInitData.SchemeData, second: androidx.media3.common.DrmInitData.SchemeData): number;
        public constructor(schemeDatas: java.util.List<androidx.media3.common.DrmInitData.SchemeData>);
        public static createSessionCreationData(data: androidx.media3.common.DrmInitData, data: androidx.media3.common.DrmInitData): androidx.media3.common.DrmInitData;
      }
      export module DrmInitData {
        export class SchemeData {
          public static class: java.lang.Class<androidx.media3.common.DrmInitData.SchemeData>;
          public uuid: java.util.UUID;
          public licenseServerUrl: string;
          public mimeType: string;
          public data: androidNative.Array<number>;
          public static CREATOR: globalAndroid.os.Parcelable.Creator<androidx.media3.common.DrmInitData.SchemeData>;
          public matches(schemeUuid: java.util.UUID): boolean;
          public equals(obj: any): boolean;
          public hasData(): boolean;
          public describeContents(): number;
          public writeToParcel(dest: globalAndroid.os.Parcel, flags: number): void;
          public copyWithData(data: androidNative.Array<number>): androidx.media3.common.DrmInitData.SchemeData;
          public constructor(uuid: java.util.UUID, licenseServerUrl: string, mimeType: string, data: androidNative.Array<number>);
          public hashCode(): number;
          public constructor(uuid: java.util.UUID, mimeType: string, data: androidNative.Array<number>);
          public canReplace(other: androidx.media3.common.DrmInitData.SchemeData): boolean;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class Effect {
        public static class: java.lang.Class<androidx.media3.common.Effect>;
        /**
         * Constructs a new instance of the androidx.media3.common.Effect interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {});
        public constructor();
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class ErrorMessageProvider<T> extends java.lang.Object {
        public static class: java.lang.Class<androidx.media3.common.ErrorMessageProvider<any>>;
        /**
         * Constructs a new instance of the androidx.media3.common.ErrorMessageProvider<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { getErrorMessage(param0: T): globalAndroid.util.Pair<java.lang.Integer, string> });
        public constructor();
        public getErrorMessage(param0: T): globalAndroid.util.Pair<java.lang.Integer, string>;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class FileTypes {
        public static class: java.lang.Class<androidx.media3.common.FileTypes>;
        public static UNKNOWN: number = -1;
        public static AC3: number = 0;
        public static AC4: number = 1;
        public static ADTS: number = 2;
        public static AMR: number = 3;
        public static FLAC: number = 4;
        public static FLV: number = 5;
        public static MATROSKA: number = 6;
        public static MP3: number = 7;
        public static MP4: number = 8;
        public static OGG: number = 9;
        public static PS: number = 10;
        public static TS: number = 11;
        public static WAV: number = 12;
        public static WEBVTT: number = 13;
        public static JPEG: number = 14;
        public static MIDI: number = 15;
        public static AVI: number = 16;
        public static PNG: number = 17;
        public static WEBP: number = 18;
        public static BMP: number = 19;
        public static HEIF: number = 20;
        public static inferFileTypeFromResponseHeaders(responseHeaders: java.util.Map<string, java.util.List<string>>): number;
        public static inferFileTypeFromMimeType(mimeType: string): number;
        public static inferFileTypeFromUri(uri: globalAndroid.net.Uri): number;
      }
      export module FileTypes {
        export class Type {
          public static class: java.lang.Class<androidx.media3.common.FileTypes.Type>;
          /**
           * Constructs a new instance of the androidx.media3.common.FileTypes$Type interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class FlagSet {
        public static class: java.lang.Class<androidx.media3.common.FlagSet>;
        public get(index: number): number;
        public containsAny(this_: androidNative.Array<number>): boolean;
        public equals(this_: any): boolean;
        public contains(flag: number): boolean;
        public hashCode(): number;
        public size(): number;
      }
      export module FlagSet {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.common.FlagSet.Builder>;
          public add(flag: number): androidx.media3.common.FlagSet.Builder;
          public addIf(flag: number, condition: boolean): androidx.media3.common.FlagSet.Builder;
          public build(): androidx.media3.common.FlagSet;
          public constructor();
          public addAll(this_: androidNative.Array<number>): androidx.media3.common.FlagSet.Builder;
          public removeIf(flag: number, condition: boolean): androidx.media3.common.FlagSet.Builder;
          public remove(flag: number): androidx.media3.common.FlagSet.Builder;
          public addAll(this_: androidx.media3.common.FlagSet): androidx.media3.common.FlagSet.Builder;
          public removeAll(this_: androidNative.Array<number>): androidx.media3.common.FlagSet.Builder;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class Format extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.Format>;
        public static CUE_REPLACEMENT_BEHAVIOR_MERGE: number = 1;
        public static CUE_REPLACEMENT_BEHAVIOR_REPLACE: number = 2;
        public static NO_VALUE: number = -1;
        public static OFFSET_SAMPLE_RELATIVE: number = 9223372036854775807;
        public id: string;
        public label: string;
        public labels: java.util.List<androidx.media3.common.Label>;
        public language: string;
        public selectionFlags: number;
        public roleFlags: number;
        public averageBitrate: number;
        public peakBitrate: number;
        public bitrate: number;
        public codecs: string;
        public metadata: androidx.media3.common.Metadata;
        public containerMimeType: string;
        public sampleMimeType: string;
        public maxInputSize: number;
        public initializationData: java.util.List<androidNative.Array<number>>;
        public drmInitData: androidx.media3.common.DrmInitData;
        public subsampleOffsetUs: number;
        public width: number;
        public height: number;
        public frameRate: number;
        public rotationDegrees: number;
        public pixelWidthHeightRatio: number;
        public projectionData: androidNative.Array<number>;
        public stereoMode: number;
        public colorInfo: androidx.media3.common.ColorInfo;
        public channelCount: number;
        public sampleRate: number;
        public pcmEncoding: number;
        public encoderDelay: number;
        public encoderPadding: number;
        public accessibilityChannel: number;
        public cueReplacementBehavior: number;
        public tileCountHorizontal: number;
        public tileCountVertical: number;
        public cryptoType: number;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.Format>;
        public withManifestFormatInfo(this_: androidx.media3.common.Format): androidx.media3.common.Format;
        public copyWithCryptoType(cryptoType: number): androidx.media3.common.Format;
        public buildUpon(): androidx.media3.common.Format.Builder;
        public equals(obj: any): boolean;
        public initializationDataEquals(this_: androidx.media3.common.Format): boolean;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public toString(): string;
        public static toLogString(schemeUuid: androidx.media3.common.Format): string;
        public getPixelCount(): number;
        public toBundle(this_: boolean): globalAndroid.os.Bundle;
        public static fromBundle(data: globalAndroid.os.Bundle): androidx.media3.common.Format;
      }
      export module Format {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.common.Format.Builder>;
          public setWidth(width: number): androidx.media3.common.Format.Builder;
          public setSubsampleOffsetUs(subsampleOffsetUs: number): androidx.media3.common.Format.Builder;
          public setAccessibilityChannel(accessibilityChannel: number): androidx.media3.common.Format.Builder;
          public setEncoderPadding(encoderPadding: number): androidx.media3.common.Format.Builder;
          public setCryptoType(cryptoType: number): androidx.media3.common.Format.Builder;
          public setSampleMimeType(sampleMimeType: string): androidx.media3.common.Format.Builder;
          public setSampleRate(sampleRate: number): androidx.media3.common.Format.Builder;
          public setTileCountVertical(tileCountVertical: number): androidx.media3.common.Format.Builder;
          public setMetadata(metadata: androidx.media3.common.Metadata): androidx.media3.common.Format.Builder;
          public setEncoderDelay(encoderDelay: number): androidx.media3.common.Format.Builder;
          public constructor();
          public setColorInfo(colorInfo: androidx.media3.common.ColorInfo): androidx.media3.common.Format.Builder;
          public setAverageBitrate(averageBitrate: number): androidx.media3.common.Format.Builder;
          public setDrmInitData(drmInitData: androidx.media3.common.DrmInitData): androidx.media3.common.Format.Builder;
          public setMaxInputSize(maxInputSize: number): androidx.media3.common.Format.Builder;
          public setCueReplacementBehavior(cueReplacementBehavior: number): androidx.media3.common.Format.Builder;
          public setStereoMode(stereoMode: number): androidx.media3.common.Format.Builder;
          public setLabels(labels: java.util.List<androidx.media3.common.Label>): androidx.media3.common.Format.Builder;
          public setContainerMimeType(containerMimeType: string): androidx.media3.common.Format.Builder;
          public setLabel(label: string): androidx.media3.common.Format.Builder;
          public setLanguage(language: string): androidx.media3.common.Format.Builder;
          public setId(id: number): androidx.media3.common.Format.Builder;
          public setSelectionFlags(selectionFlags: number): androidx.media3.common.Format.Builder;
          public setFrameRate(frameRate: number): androidx.media3.common.Format.Builder;
          public setPeakBitrate(peakBitrate: number): androidx.media3.common.Format.Builder;
          public setInitializationData(initializationData: java.util.List<androidNative.Array<number>>): androidx.media3.common.Format.Builder;
          public setTileCountHorizontal(tileCountHorizontal: number): androidx.media3.common.Format.Builder;
          public setPixelWidthHeightRatio(pixelWidthHeightRatio: number): androidx.media3.common.Format.Builder;
          public setCodecs(codecs: string): androidx.media3.common.Format.Builder;
          public setRoleFlags(roleFlags: number): androidx.media3.common.Format.Builder;
          public setPcmEncoding(pcmEncoding: number): androidx.media3.common.Format.Builder;
          public setRotationDegrees(rotationDegrees: number): androidx.media3.common.Format.Builder;
          public setChannelCount(channelCount: number): androidx.media3.common.Format.Builder;
          public build(): androidx.media3.common.Format;
          public setProjectionData(projectionData: androidNative.Array<number>): androidx.media3.common.Format.Builder;
          public setHeight(height: number): androidx.media3.common.Format.Builder;
          public setId(id: string): androidx.media3.common.Format.Builder;
        }
        export class CueReplacementBehavior {
          public static class: java.lang.Class<androidx.media3.common.Format.CueReplacementBehavior>;
          /**
           * Constructs a new instance of the androidx.media3.common.Format$CueReplacementBehavior interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class ForwardingPlayer extends androidx.media3.common.Player {
        public static class: java.lang.Class<androidx.media3.common.ForwardingPlayer>;
        public getContentBufferedPosition(): number;
        public setDeviceMuted(param0: boolean, param1: number): void;
        public getMediaItemAt(index: number): androidx.media3.common.MediaItem;
        public setMediaItems(mediaItems: java.util.List<androidx.media3.common.MediaItem>, startIndex: number, startPositionMs: number): void;
        public getSurfaceSize(): androidx.media3.common.util.Size;
        public setPlaylistMetadata(mediaMetadata: androidx.media3.common.MediaMetadata): void;
        public getMediaMetadata(): androidx.media3.common.MediaMetadata;
        public isCommandAvailable(param0: number): boolean;
        public getCurrentLiveOffset(): number;
        public isDeviceMuted(): boolean;
        public addMediaItem(index: number, mediaItem: androidx.media3.common.MediaItem): void;
        /** @deprecated */
        public next(): void;
        public setPlayWhenReady(param0: boolean): void;
        public prepare(): void;
        public getDeviceInfo(): androidx.media3.common.DeviceInfo;
        public addListener(param0: androidx.media3.common.Player.Listener): void;
        public getVideoSize(): androidx.media3.common.VideoSize;
        public setVideoSurfaceView(surfaceView: globalAndroid.view.SurfaceView): void;
        /** @deprecated */
        public setDeviceMuted(param0: boolean): void;
        public seekTo(param0: number, param1: number): void;
        public getBufferedPercentage(): number;
        public moveMediaItem(param0: number, param1: number): void;
        public setVideoSurface(param0: globalAndroid.view.Surface): void;
        public getApplicationLooper(): globalAndroid.os.Looper;
        public getNextMediaItemIndex(): number;
        public getAudioAttributes(): androidx.media3.common.AudioAttributes;
        public setMediaItems(mediaItems: java.util.List<androidx.media3.common.MediaItem>, resetPosition: boolean): void;
        /** @deprecated */
        public seekToPreviousWindow(): void;
        public clearVideoSurface(surface: globalAndroid.view.Surface): void;
        public getAvailableCommands(): androidx.media3.common.Player.Commands;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>, param1: number, param2: number): void;
        public clearVideoSurfaceView(param0: globalAndroid.view.SurfaceView): void;
        /** @deprecated */
        public setDeviceVolume(param0: number): void;
        public setMediaItem(param0: androidx.media3.common.MediaItem, param1: boolean): void;
        /** @deprecated */
        public getNextWindowIndex(): number;
        public getContentDuration(): number;
        public replaceMediaItem(index: number, mediaItem: androidx.media3.common.MediaItem): void;
        public setVolume(volume: number): void;
        public getCurrentPosition(): number;
        /** @deprecated */
        public getPreviousWindowIndex(): number;
        public seekToNext(): void;
        public setPlaybackSpeed(speed: number): void;
        public getCurrentPeriodIndex(): number;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>): void;
        public moveMediaItems(fromIndex: number, toIndex: number, newIndex: number): void;
        /** @deprecated */
        public seekToNextWindow(): void;
        public getShuffleModeEnabled(): boolean;
        /** @deprecated */
        public setDeviceVolume(volume: number): void;
        /** @deprecated */
        public increaseDeviceVolume(): void;
        public getCurrentMediaItemIndex(): number;
        public setPlayWhenReady(playWhenReady: boolean): void;
        public getTrackSelectionParameters(): androidx.media3.common.TrackSelectionParameters;
        public replaceMediaItem(param0: number, param1: androidx.media3.common.MediaItem): void;
        public getDuration(): number;
        public clearVideoTextureView(textureView: globalAndroid.view.TextureView): void;
        public seekToDefaultPosition(mediaItemIndex: number): void;
        public seekTo(mediaItemIndex: number, positionMs: number): void;
        public increaseDeviceVolume(param0: number): void;
        /** @deprecated */
        public hasNext(): boolean;
        public isLoading(): boolean;
        public seekTo(positionMs: number): void;
        /** @deprecated */
        public hasPrevious(): boolean;
        public seekToPreviousMediaItem(): void;
        public getSeekForwardIncrement(): number;
        public constructor(player: androidx.media3.common.Player);
        public getBufferedPosition(): number;
        public removeListener(param0: androidx.media3.common.Player.Listener): void;
        public seekToPrevious(): void;
        public setShuffleModeEnabled(shuffleModeEnabled: boolean): void;
        public addMediaItems(param0: number, param1: java.util.List<androidx.media3.common.MediaItem>): void;
        public hasPreviousMediaItem(): boolean;
        public getPlaybackParameters(): androidx.media3.common.PlaybackParameters;
        public setMediaItem(mediaItem: androidx.media3.common.MediaItem, startPositionMs: number): void;
        public getMediaItemCount(): number;
        public getCurrentAdIndexInAdGroup(): number;
        public release(): void;
        public getPlaybackSuppressionReason(): number;
        public isPlaying(): boolean;
        public moveMediaItems(param0: number, param1: number, param2: number): void;
        public getContentPosition(): number;
        public clearVideoSurface(param0: globalAndroid.view.Surface): void;
        public getCurrentTracks(): androidx.media3.common.Tracks;
        /** @deprecated */
        public hasNextWindow(): boolean;
        public getPlayerError(): androidx.media3.common.PlaybackException;
        public clearVideoSurfaceHolder(surfaceHolder: globalAndroid.view.SurfaceHolder): void;
        public getCurrentTimeline(): androidx.media3.common.Timeline;
        public clearMediaItems(): void;
        /** @deprecated */
        public getCurrentWindowIndex(): number;
        public getCurrentMediaItem(): androidx.media3.common.MediaItem;
        public replaceMediaItems(fromIndex: number, toIndex: number, mediaItems: java.util.List<androidx.media3.common.MediaItem>): void;
        public clearVideoSurfaceHolder(param0: globalAndroid.view.SurfaceHolder): void;
        public increaseDeviceVolume(flags: number): void;
        public getPlaybackState(): number;
        public setDeviceVolume(param0: number, param1: number): void;
        public getCurrentCues(): androidx.media3.common.text.CueGroup;
        public setDeviceMuted(muted: boolean, flags: number): void;
        public isCurrentMediaItemDynamic(): boolean;
        public isCurrentMediaItemLive(): boolean;
        public getCurrentAdGroupIndex(): number;
        public setMediaItem(mediaItem: androidx.media3.common.MediaItem, resetPosition: boolean): void;
        public removeMediaItem(param0: number): void;
        public getMediaItemAt(param0: number): androidx.media3.common.MediaItem;
        public setAudioAttributes(audioAttributes: androidx.media3.common.AudioAttributes, handleAudioFocus: boolean): void;
        public setPlaybackParameters(param0: androidx.media3.common.PlaybackParameters): void;
        public seekToDefaultPosition(): void;
        public setVolume(param0: number): void;
        public addMediaItems(mediaItems: java.util.List<androidx.media3.common.MediaItem>): void;
        public setVideoSurfaceHolder(param0: globalAndroid.view.SurfaceHolder): void;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>, param1: boolean): void;
        public addMediaItem(param0: androidx.media3.common.MediaItem): void;
        public isCurrentMediaItemSeekable(): boolean;
        public setTrackSelectionParameters(param0: androidx.media3.common.TrackSelectionParameters): void;
        /** @deprecated */
        public isCurrentWindowDynamic(): boolean;
        public setTrackSelectionParameters(parameters: androidx.media3.common.TrackSelectionParameters): void;
        public getDeviceVolume(): number;
        public replaceMediaItems(param0: number, param1: number, param2: java.util.List<androidx.media3.common.MediaItem>): void;
        public setPlaybackParameters(playbackParameters: androidx.media3.common.PlaybackParameters): void;
        public setMediaItems(mediaItems: java.util.List<androidx.media3.common.MediaItem>): void;
        /** @deprecated */
        public isCurrentWindowLive(): boolean;
        public seekTo(param0: number): void;
        public removeMediaItems(param0: number, param1: number): void;
        public getPlaylistMetadata(): androidx.media3.common.MediaMetadata;
        public clearVideoTextureView(param0: globalAndroid.view.TextureView): void;
        public addListener(listener: androidx.media3.common.Player.Listener): void;
        public getVolume(): number;
        public removeMediaItem(index: number): void;
        public setMediaItem(param0: androidx.media3.common.MediaItem): void;
        public canAdvertiseSession(): boolean;
        public setRepeatMode(param0: number): void;
        /** @deprecated */
        public setDeviceMuted(muted: boolean): void;
        public setVideoSurface(surface: globalAndroid.view.Surface): void;
        public addMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>): void;
        public decreaseDeviceVolume(flags: number): void;
        public getSeekBackIncrement(): number;
        public setVideoTextureView(param0: globalAndroid.view.TextureView): void;
        public removeMediaItems(fromIndex: number, toIndex: number): void;
        public addMediaItems(index: number, mediaItems: java.util.List<androidx.media3.common.MediaItem>): void;
        public getPlayWhenReady(): boolean;
        public seekToNextMediaItem(): void;
        public setDeviceVolume(volume: number, flags: number): void;
        /** @deprecated */
        public previous(): void;
        public isPlayingAd(): boolean;
        /** @deprecated */
        public hasPreviousWindow(): boolean;
        public getPreviousMediaItemIndex(): number;
        public setAudioAttributes(param0: androidx.media3.common.AudioAttributes, param1: boolean): void;
        public addMediaItem(mediaItem: androidx.media3.common.MediaItem): void;
        public clearVideoSurface(): void;
        public decreaseDeviceVolume(param0: number): void;
        public clearVideoSurfaceView(surfaceView: globalAndroid.view.SurfaceView): void;
        public setVideoSurfaceView(param0: globalAndroid.view.SurfaceView): void;
        public setPlaybackSpeed(param0: number): void;
        public seekToDefaultPosition(param0: number): void;
        public setRepeatMode(repeatMode: number): void;
        public getMaxSeekToPreviousPosition(): number;
        public play(): void;
        public pause(): void;
        public seekForward(): void;
        public getRepeatMode(): number;
        public hasNextMediaItem(): boolean;
        public setVideoSurfaceHolder(surfaceHolder: globalAndroid.view.SurfaceHolder): void;
        public addMediaItem(param0: number, param1: androidx.media3.common.MediaItem): void;
        public setPlaylistMetadata(param0: androidx.media3.common.MediaMetadata): void;
        public getWrappedPlayer(): androidx.media3.common.Player;
        public stop(): void;
        /** @deprecated */
        public decreaseDeviceVolume(): void;
        public setShuffleModeEnabled(param0: boolean): void;
        public getTotalBufferedDuration(): number;
        public setMediaItem(param0: androidx.media3.common.MediaItem, param1: number): void;
        public setVideoTextureView(textureView: globalAndroid.view.TextureView): void;
        public seekBack(): void;
        public removeListener(listener: androidx.media3.common.Player.Listener): void;
        public isCommandAvailable(command: number): boolean;
        /** @deprecated */
        public isCurrentWindowSeekable(): boolean;
        public setMediaItem(mediaItem: androidx.media3.common.MediaItem): void;
        public moveMediaItem(currentIndex: number, newIndex: number): void;
        public getCurrentManifest(): any;
      }
      export module ForwardingPlayer {
        export class ForwardingListener extends androidx.media3.common.Player.Listener {
          public static class: java.lang.Class<androidx.media3.common.ForwardingPlayer.ForwardingListener>;
          public onTimelineChanged(timeline: androidx.media3.common.Timeline, reason: number): void;
          public onPlaybackSuppressionReasonChanged(playbackSuppressionReason: number): void;
          public onCues(cues: java.util.List<androidx.media3.common.text.Cue>): void;
          public onSurfaceSizeChanged(width: number, height: number): void;
          /** @deprecated */
          public onPlayerStateChanged(playWhenReady: boolean, playbackState: number): void;
          public onRenderedFirstFrame(): void;
          public equals(o: any): boolean;
          public onPositionDiscontinuity(oldPosition: androidx.media3.common.Player.PositionInfo, newPosition: androidx.media3.common.Player.PositionInfo, reason: number): void;
          public onDeviceVolumeChanged(volume: number, muted: boolean): void;
          public onPlayerErrorChanged(error: androidx.media3.common.PlaybackException): void;
          public onVolumeChanged(volume: number): void;
          public onAvailableCommandsChanged(availableCommands: androidx.media3.common.Player.Commands): void;
          public constructor(forwardingPlayer: androidx.media3.common.ForwardingPlayer, listener: androidx.media3.common.Player.Listener);
          public onMediaItemTransition(mediaItem: androidx.media3.common.MediaItem, reason: number): void;
          public onMetadata(metadata: androidx.media3.common.Metadata): void;
          /** @deprecated */
          public onLoadingChanged(isLoading: boolean): void;
          public onRepeatModeChanged(repeatMode: number): void;
          public onVideoSizeChanged(videoSize: androidx.media3.common.VideoSize): void;
          public hashCode(): number;
          public onTracksChanged(tracks: androidx.media3.common.Tracks): void;
          public onPlayerError(error: androidx.media3.common.PlaybackException): void;
          public onLoadingChanged(isLoading: boolean): void;
          public onIsPlayingChanged(isPlaying: boolean): void;
          public onAudioAttributesChanged(audioAttributes: androidx.media3.common.AudioAttributes): void;
          public onEvents(player: androidx.media3.common.Player, events: androidx.media3.common.Player.Events): void;
          public onSeekBackIncrementChanged(seekBackIncrementMs: number): void;
          public onMaxSeekToPreviousPositionChanged(maxSeekToPreviousPositionMs: number): void;
          /** @deprecated */
          public onPositionDiscontinuity(reason: number): void;
          public onPlayWhenReadyChanged(playWhenReady: boolean, reason: number): void;
          public onShuffleModeEnabledChanged(shuffleModeEnabled: boolean): void;
          public onSeekForwardIncrementChanged(seekForwardIncrementMs: number): void;
          public onTrackSelectionParametersChanged(parameters: androidx.media3.common.TrackSelectionParameters): void;
          public onAudioSessionIdChanged(audioSessionId: number): void;
          public onMediaMetadataChanged(mediaMetadata: androidx.media3.common.MediaMetadata): void;
          public onSkipSilenceEnabledChanged(skipSilenceEnabled: boolean): void;
          public onCues(cueGroup: androidx.media3.common.text.CueGroup): void;
          /** @deprecated */
          public onCues(cues: java.util.List<androidx.media3.common.text.Cue>): void;
          public onIsLoadingChanged(isLoading: boolean): void;
          public onPlaylistMetadataChanged(mediaMetadata: androidx.media3.common.MediaMetadata): void;
          public onPlaybackParametersChanged(playbackParameters: androidx.media3.common.PlaybackParameters): void;
          public onPlaybackStateChanged(playbackState: number): void;
          public onPositionDiscontinuity(reason: number): void;
          public onDeviceInfoChanged(deviceInfo: androidx.media3.common.DeviceInfo): void;
          public onPlayerStateChanged(playWhenReady: boolean, playbackState: number): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class FrameInfo {
        public static class: java.lang.Class<androidx.media3.common.FrameInfo>;
        public colorInfo: androidx.media3.common.ColorInfo;
        public width: number;
        public height: number;
        public pixelWidthHeightRatio: number;
        public offsetToAddUs: number;
      }
      export module FrameInfo {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.common.FrameInfo.Builder>;
          public constructor(frameInfo: androidx.media3.common.FrameInfo);
          public setWidth(width: number): androidx.media3.common.FrameInfo.Builder;
          public setHeight(height: number): androidx.media3.common.FrameInfo.Builder;
          public setOffsetToAddUs(offsetToAddUs: number): androidx.media3.common.FrameInfo.Builder;
          public setColorInfo(colorInfo: androidx.media3.common.ColorInfo): androidx.media3.common.FrameInfo.Builder;
          public setPixelWidthHeightRatio(pixelWidthHeightRatio: number): androidx.media3.common.FrameInfo.Builder;
          public build(): androidx.media3.common.FrameInfo;
          public constructor(colorInfo: androidx.media3.common.ColorInfo, width: number, height: number);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class GlObjectsProvider {
        public static class: java.lang.Class<androidx.media3.common.GlObjectsProvider>;
        /**
         * Constructs a new instance of the androidx.media3.common.GlObjectsProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          createEglContext(param0: globalAndroid.opengl.EGLDisplay, param1: number, param2: androidNative.Array<number>): globalAndroid.opengl.EGLContext;
          createEglSurface(param0: globalAndroid.opengl.EGLDisplay, param1: any, param2: number, param3: boolean): globalAndroid.opengl.EGLSurface;
          createFocusedPlaceholderEglSurface(param0: globalAndroid.opengl.EGLContext, param1: globalAndroid.opengl.EGLDisplay): globalAndroid.opengl.EGLSurface;
          createBuffersForTexture(param0: number, param1: number, param2: number): androidx.media3.common.GlTextureInfo;
        });
        public constructor();
        public createEglSurface(param0: globalAndroid.opengl.EGLDisplay, param1: any, param2: number, param3: boolean): globalAndroid.opengl.EGLSurface;
        public createEglContext(param0: globalAndroid.opengl.EGLDisplay, param1: number, param2: androidNative.Array<number>): globalAndroid.opengl.EGLContext;
        public createBuffersForTexture(param0: number, param1: number, param2: number): androidx.media3.common.GlTextureInfo;
        public createFocusedPlaceholderEglSurface(param0: globalAndroid.opengl.EGLContext, param1: globalAndroid.opengl.EGLDisplay): globalAndroid.opengl.EGLSurface;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class GlTextureInfo {
        public static class: java.lang.Class<androidx.media3.common.GlTextureInfo>;
        public static UNSET: androidx.media3.common.GlTextureInfo;
        public texId: number;
        public fboId: number;
        public rboId: number;
        public width: number;
        public height: number;
        public release(): void;
        public constructor(texId: number, fboId: number, rboId: number, width: number, height: number);
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class HeartRating extends androidx.media3.common.Rating {
        public static class: java.lang.Class<androidx.media3.common.HeartRating>;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.HeartRating>;
        public constructor(isHeart: boolean);
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.HeartRating;
        public equals(obj: any): boolean;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public isHeart(): boolean;
        public isRated(): boolean;
        public constructor();
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Rating;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class IllegalSeekPositionException {
        public static class: java.lang.Class<androidx.media3.common.IllegalSeekPositionException>;
        public timeline: androidx.media3.common.Timeline;
        public windowIndex: number;
        public positionMs: number;
        public constructor(timeline: androidx.media3.common.Timeline, windowIndex: number, positionMs: number);
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class Label {
        public static class: java.lang.Class<androidx.media3.common.Label>;
        public language: string;
        public value: string;
        public hashCode(): number;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Label;
        public toBundle(): globalAndroid.os.Bundle;
        public constructor(language: string, value: string);
        public equals(o: any): boolean;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class MediaItem extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.MediaItem>;
        public static DEFAULT_MEDIA_ID: string = '';
        public static EMPTY: androidx.media3.common.MediaItem;
        public mediaId: string;
        public localConfiguration: androidx.media3.common.MediaItem.LocalConfiguration;
        public playbackProperties: androidx.media3.common.MediaItem.LocalConfiguration;
        public liveConfiguration: androidx.media3.common.MediaItem.LiveConfiguration;
        public mediaMetadata: androidx.media3.common.MediaMetadata;
        public clippingConfiguration: androidx.media3.common.MediaItem.ClippingConfiguration;
        public clippingProperties: androidx.media3.common.MediaItem.ClippingProperties;
        public requestMetadata: androidx.media3.common.MediaItem.RequestMetadata;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.MediaItem>;
        public toBundleIncludeLocalConfiguration(): globalAndroid.os.Bundle;
        public equals(obj: any): boolean;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public static fromUri(uri: string): androidx.media3.common.MediaItem;
        public static fromBundle(liveConfiguration: globalAndroid.os.Bundle): androidx.media3.common.MediaItem;
        public buildUpon(): androidx.media3.common.MediaItem.Builder;
        public static fromUri(uri: globalAndroid.net.Uri): androidx.media3.common.MediaItem;
      }
      export module MediaItem {
        export class AdsConfiguration extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.MediaItem.AdsConfiguration>;
          public adTagUri: globalAndroid.net.Uri;
          public adsId: any;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.MediaItem.AdsConfiguration>;
          public equals(obj: any): boolean;
          public buildUpon(): androidx.media3.common.MediaItem.AdsConfiguration.Builder;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.MediaItem.AdsConfiguration;
          public toBundle(): globalAndroid.os.Bundle;
          public hashCode(): number;
        }
        export module AdsConfiguration {
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.MediaItem.AdsConfiguration.Builder>;
            public build(): androidx.media3.common.MediaItem.AdsConfiguration;
            public setAdTagUri(adTagUri: globalAndroid.net.Uri): androidx.media3.common.MediaItem.AdsConfiguration.Builder;
            public setAdsId(adsId: any): androidx.media3.common.MediaItem.AdsConfiguration.Builder;
            public constructor(adTagUri: globalAndroid.net.Uri);
          }
        }
        export class Builder {
          public static class: java.lang.Class<androidx.media3.common.MediaItem.Builder>;
          /** @deprecated */
          public setDrmMultiSession(multiSession: boolean): androidx.media3.common.MediaItem.Builder;
          public setRequestMetadata(requestMetadata: androidx.media3.common.MediaItem.RequestMetadata): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setSubtitles(subtitles: java.util.List<androidx.media3.common.MediaItem.Subtitle>): androidx.media3.common.MediaItem.Builder;
          public setMediaId(mediaId: string): androidx.media3.common.MediaItem.Builder;
          public setClippingConfiguration(clippingConfiguration: androidx.media3.common.MediaItem.ClippingConfiguration): androidx.media3.common.MediaItem.Builder;
          public setImageDurationMs(imageDurationMs: number): androidx.media3.common.MediaItem.Builder;
          public setMimeType(mimeType: string): androidx.media3.common.MediaItem.Builder;
          public setSubtitleConfigurations(subtitleConfigurations: java.util.List<androidx.media3.common.MediaItem.SubtitleConfiguration>): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setLiveMinPlaybackSpeed(minPlaybackSpeed: number): androidx.media3.common.MediaItem.Builder;
          public setCustomCacheKey(customCacheKey: string): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setClipStartPositionMs(startPositionMs: number): androidx.media3.common.MediaItem.Builder;
          public setStreamKeys(streamKeys: java.util.List<androidx.media3.common.StreamKey>): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setClipRelativeToDefaultPosition(relativeToDefaultPosition: boolean): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setDrmLicenseRequestHeaders(licenseRequestHeaders: java.util.Map<string, string>): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setDrmSessionForClearPeriods(sessionForClearPeriods: boolean): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setLiveTargetOffsetMs(liveTargetOffsetMs: number): androidx.media3.common.MediaItem.Builder;
          public setTag(tag: any): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setClipRelativeToLiveWindow(relativeToLiveWindow: boolean): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setDrmUuid(uuid: java.util.UUID): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setDrmPlayClearContentWithoutKey(playClearContentWithoutKey: boolean): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setAdTagUri(adTagUri: globalAndroid.net.Uri): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setDrmForceDefaultLicenseUri(forceDefaultLicenseUri: boolean): androidx.media3.common.MediaItem.Builder;
          public setMediaMetadata(mediaMetadata: androidx.media3.common.MediaMetadata): androidx.media3.common.MediaItem.Builder;
          public constructor();
          /** @deprecated */
          public setLiveMinOffsetMs(liveMinOffsetMs: number): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setAdTagUri(adTagUri: string): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setDrmKeySetId(keySetId: androidNative.Array<number>): androidx.media3.common.MediaItem.Builder;
          public setLiveConfiguration(liveConfiguration: androidx.media3.common.MediaItem.LiveConfiguration): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setDrmLicenseUri(licenseUri: globalAndroid.net.Uri): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setLiveMaxOffsetMs(liveMaxOffsetMs: number): androidx.media3.common.MediaItem.Builder;
          public setUri(uri: globalAndroid.net.Uri): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setClipEndPositionMs(endPositionMs: number): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setClipStartsAtKeyFrame(startsAtKeyFrame: boolean): androidx.media3.common.MediaItem.Builder;
          public setDrmConfiguration(drmConfiguration: androidx.media3.common.MediaItem.DrmConfiguration): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setLiveMaxPlaybackSpeed(maxPlaybackSpeed: number): androidx.media3.common.MediaItem.Builder;
          public setUri(uri: string): androidx.media3.common.MediaItem.Builder;
          public build(): androidx.media3.common.MediaItem;
          public setAdsConfiguration(adsConfiguration: androidx.media3.common.MediaItem.AdsConfiguration): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setDrmLicenseUri(licenseUri: string): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setDrmSessionForClearTypes(sessionForClearTypes: java.util.List<java.lang.Integer>): androidx.media3.common.MediaItem.Builder;
          /** @deprecated */
          public setAdTagUri(adTagUri: globalAndroid.net.Uri, adsId: any): androidx.media3.common.MediaItem.Builder;
        }
        export class ClippingConfiguration extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.MediaItem.ClippingConfiguration>;
          public static UNSET: androidx.media3.common.MediaItem.ClippingConfiguration;
          public startPositionMs: number;
          public startPositionUs: number;
          public endPositionMs: number;
          public endPositionUs: number;
          public relativeToLiveWindow: boolean;
          public relativeToDefaultPosition: boolean;
          public startsAtKeyFrame: boolean;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.MediaItem.ClippingProperties>;
          public buildUpon(): androidx.media3.common.MediaItem.ClippingConfiguration.Builder;
          public equals(obj: any): boolean;
          public toBundle(): globalAndroid.os.Bundle;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.MediaItem.ClippingProperties;
          public hashCode(): number;
        }
        export module ClippingConfiguration {
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.MediaItem.ClippingConfiguration.Builder>;
            public constructor();
            /** @deprecated */
            public buildClippingProperties(): androidx.media3.common.MediaItem.ClippingProperties;
            public setRelativeToDefaultPosition(relativeToDefaultPosition: boolean): androidx.media3.common.MediaItem.ClippingConfiguration.Builder;
            public setStartPositionUs(startPositionUs: number): androidx.media3.common.MediaItem.ClippingConfiguration.Builder;
            public setRelativeToLiveWindow(relativeToLiveWindow: boolean): androidx.media3.common.MediaItem.ClippingConfiguration.Builder;
            public setEndPositionUs(endPositionUs: number): androidx.media3.common.MediaItem.ClippingConfiguration.Builder;
            public setStartsAtKeyFrame(startsAtKeyFrame: boolean): androidx.media3.common.MediaItem.ClippingConfiguration.Builder;
            public setStartPositionMs(startPositionMs: number): androidx.media3.common.MediaItem.ClippingConfiguration.Builder;
            public setEndPositionMs(endPositionMs: number): androidx.media3.common.MediaItem.ClippingConfiguration.Builder;
            public build(): androidx.media3.common.MediaItem.ClippingConfiguration;
          }
        }
        export class ClippingProperties extends androidx.media3.common.MediaItem.ClippingConfiguration {
          public static class: java.lang.Class<androidx.media3.common.MediaItem.ClippingProperties>;
          public static UNSET: androidx.media3.common.MediaItem.ClippingProperties;
          public toBundle(): globalAndroid.os.Bundle;
        }
        export class DrmConfiguration extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.MediaItem.DrmConfiguration>;
          public scheme: java.util.UUID;
          public uuid: java.util.UUID;
          public licenseUri: globalAndroid.net.Uri;
          public requestHeaders: com.google.common.collect.ImmutableMap<string, string>;
          public licenseRequestHeaders: com.google.common.collect.ImmutableMap<string, string>;
          public multiSession: boolean;
          public playClearContentWithoutKey: boolean;
          public forceDefaultLicenseUri: boolean;
          public sessionForClearTypes: com.google.common.collect.ImmutableList<java.lang.Integer>;
          public forcedSessionTrackTypes: com.google.common.collect.ImmutableList<java.lang.Integer>;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.MediaItem.DrmConfiguration>;
          public getKeySetId(): androidNative.Array<number>;
          public equals(obj: any): boolean;
          public buildUpon(): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
          public toBundle(): globalAndroid.os.Bundle;
          public hashCode(): number;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.MediaItem.DrmConfiguration;
        }
        export module DrmConfiguration {
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.MediaItem.DrmConfiguration.Builder>;
            public setForceSessionsForAudioAndVideoTracks(forceSessionsForAudioAndVideoTracks: boolean): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
            public setForcedSessionTrackTypes(forcedSessionTrackTypes: java.util.List<java.lang.Integer>): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
            public setForceDefaultLicenseUri(forceDefaultLicenseUri: boolean): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
            /** @deprecated */
            public forceSessionsForAudioAndVideoTracks(forceSessionsForAudioAndVideoTracks: boolean): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
            public constructor(scheme: java.util.UUID);
            public setLicenseUri(licenseUri: string): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
            public build(): androidx.media3.common.MediaItem.DrmConfiguration;
            public setLicenseRequestHeaders(licenseRequestHeaders: java.util.Map<string, string>): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
            public setLicenseUri(licenseUri: globalAndroid.net.Uri): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
            public setScheme(scheme: java.util.UUID): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
            public setMultiSession(multiSession: boolean): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
            public setPlayClearContentWithoutKey(playClearContentWithoutKey: boolean): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
            public setKeySetId(keySetId: androidNative.Array<number>): androidx.media3.common.MediaItem.DrmConfiguration.Builder;
          }
        }
        export class LiveConfiguration extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.MediaItem.LiveConfiguration>;
          public static UNSET: androidx.media3.common.MediaItem.LiveConfiguration;
          public targetOffsetMs: number;
          public minOffsetMs: number;
          public maxOffsetMs: number;
          public minPlaybackSpeed: number;
          public maxPlaybackSpeed: number;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.MediaItem.LiveConfiguration>;
          public equals(obj: any): boolean;
          public buildUpon(): androidx.media3.common.MediaItem.LiveConfiguration.Builder;
          public toBundle(): globalAndroid.os.Bundle;
          /** @deprecated */
          public constructor(targetOffsetMs: number, minOffsetMs: number, maxOffsetMs: number, minPlaybackSpeed: number, maxPlaybackSpeed: number);
          public hashCode(): number;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.MediaItem.LiveConfiguration;
        }
        export module LiveConfiguration {
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.MediaItem.LiveConfiguration.Builder>;
            public setMaxPlaybackSpeed(maxPlaybackSpeed: number): androidx.media3.common.MediaItem.LiveConfiguration.Builder;
            public build(): androidx.media3.common.MediaItem.LiveConfiguration;
            public constructor();
            public setTargetOffsetMs(targetOffsetMs: number): androidx.media3.common.MediaItem.LiveConfiguration.Builder;
            public setMinOffsetMs(minOffsetMs: number): androidx.media3.common.MediaItem.LiveConfiguration.Builder;
            public setMinPlaybackSpeed(minPlaybackSpeed: number): androidx.media3.common.MediaItem.LiveConfiguration.Builder;
            public setMaxOffsetMs(maxOffsetMs: number): androidx.media3.common.MediaItem.LiveConfiguration.Builder;
          }
        }
        export class LocalConfiguration extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.MediaItem.LocalConfiguration>;
          public uri: globalAndroid.net.Uri;
          public mimeType: string;
          public drmConfiguration: androidx.media3.common.MediaItem.DrmConfiguration;
          public adsConfiguration: androidx.media3.common.MediaItem.AdsConfiguration;
          public streamKeys: java.util.List<androidx.media3.common.StreamKey>;
          public customCacheKey: string;
          public subtitleConfigurations: com.google.common.collect.ImmutableList<androidx.media3.common.MediaItem.SubtitleConfiguration>;
          public subtitles: java.util.List<androidx.media3.common.MediaItem.Subtitle>;
          public tag: any;
          public imageDurationMs: number;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.MediaItem.LocalConfiguration>;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.MediaItem.LocalConfiguration;
          public equals(obj: any): boolean;
          public toBundle(): globalAndroid.os.Bundle;
          public hashCode(): number;
        }
        export class RequestMetadata extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.MediaItem.RequestMetadata>;
          public static EMPTY: androidx.media3.common.MediaItem.RequestMetadata;
          public mediaUri: globalAndroid.net.Uri;
          public searchQuery: string;
          public extras: globalAndroid.os.Bundle;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.MediaItem.RequestMetadata>;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.MediaItem.RequestMetadata;
          public buildUpon(): androidx.media3.common.MediaItem.RequestMetadata.Builder;
          public toBundle(): globalAndroid.os.Bundle;
          public equals(o: any): boolean;
          public hashCode(): number;
        }
        export module RequestMetadata {
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.MediaItem.RequestMetadata.Builder>;
            public constructor();
            public setMediaUri(mediaUri: globalAndroid.net.Uri): androidx.media3.common.MediaItem.RequestMetadata.Builder;
            public setExtras(extras: globalAndroid.os.Bundle): androidx.media3.common.MediaItem.RequestMetadata.Builder;
            public build(): androidx.media3.common.MediaItem.RequestMetadata;
            public setSearchQuery(searchQuery: string): androidx.media3.common.MediaItem.RequestMetadata.Builder;
          }
        }
        export class Subtitle extends androidx.media3.common.MediaItem.SubtitleConfiguration {
          public static class: java.lang.Class<androidx.media3.common.MediaItem.Subtitle>;
          public toBundle(): globalAndroid.os.Bundle;
          /** @deprecated */
          public constructor(uri: globalAndroid.net.Uri, mimeType: string, language: string);
          /** @deprecated */
          public constructor(uri: globalAndroid.net.Uri, mimeType: string, language: string, selectionFlags: number);
          /** @deprecated */
          public constructor(uri: globalAndroid.net.Uri, mimeType: string, language: string, selectionFlags: number, roleFlags: number, label: string);
        }
        export class SubtitleConfiguration extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.MediaItem.SubtitleConfiguration>;
          public uri: globalAndroid.net.Uri;
          public mimeType: string;
          public language: string;
          public selectionFlags: number;
          public roleFlags: number;
          public label: string;
          public id: string;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.MediaItem.SubtitleConfiguration>;
          public buildUpon(): androidx.media3.common.MediaItem.SubtitleConfiguration.Builder;
          public equals(obj: any): boolean;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.MediaItem.SubtitleConfiguration;
          public toBundle(): globalAndroid.os.Bundle;
          public hashCode(): number;
        }
        export module SubtitleConfiguration {
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.MediaItem.SubtitleConfiguration.Builder>;
            public constructor(uri: globalAndroid.net.Uri);
            public setMimeType(mimeType: string): androidx.media3.common.MediaItem.SubtitleConfiguration.Builder;
            public setLanguage(language: string): androidx.media3.common.MediaItem.SubtitleConfiguration.Builder;
            public setRoleFlags(roleFlags: number): androidx.media3.common.MediaItem.SubtitleConfiguration.Builder;
            public setLabel(label: string): androidx.media3.common.MediaItem.SubtitleConfiguration.Builder;
            public setSelectionFlags(selectionFlags: number): androidx.media3.common.MediaItem.SubtitleConfiguration.Builder;
            public setUri(uri: globalAndroid.net.Uri): androidx.media3.common.MediaItem.SubtitleConfiguration.Builder;
            public build(): androidx.media3.common.MediaItem.SubtitleConfiguration;
            public setId(id: string): androidx.media3.common.MediaItem.SubtitleConfiguration.Builder;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class MediaLibraryInfo {
        public static class: java.lang.Class<androidx.media3.common.MediaLibraryInfo>;
        public static TAG: string = 'AndroidXMedia3';
        public static VERSION: string = '1.3.1';
        public static VERSION_SLASHY: string = 'AndroidXMedia3/1.3.1';
        public static VERSION_INT: number = 1003001300;
        public static ASSERTIONS_ENABLED: boolean = 1;
        public static TRACE_ENABLED: boolean = 1;
        public static registeredModules(): string;
        public static registerModule(name: string): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class MediaMetadata extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.MediaMetadata>;
        public static MEDIA_TYPE_MIXED: number = 0;
        public static MEDIA_TYPE_MUSIC: number = 1;
        public static MEDIA_TYPE_AUDIO_BOOK_CHAPTER: number = 2;
        public static MEDIA_TYPE_PODCAST_EPISODE: number = 3;
        public static MEDIA_TYPE_RADIO_STATION: number = 4;
        public static MEDIA_TYPE_NEWS: number = 5;
        public static MEDIA_TYPE_VIDEO: number = 6;
        public static MEDIA_TYPE_TRAILER: number = 7;
        public static MEDIA_TYPE_MOVIE: number = 8;
        public static MEDIA_TYPE_TV_SHOW: number = 9;
        public static MEDIA_TYPE_ALBUM: number = 10;
        public static MEDIA_TYPE_ARTIST: number = 11;
        public static MEDIA_TYPE_GENRE: number = 12;
        public static MEDIA_TYPE_PLAYLIST: number = 13;
        public static MEDIA_TYPE_YEAR: number = 14;
        public static MEDIA_TYPE_AUDIO_BOOK: number = 15;
        public static MEDIA_TYPE_PODCAST: number = 16;
        public static MEDIA_TYPE_TV_CHANNEL: number = 17;
        public static MEDIA_TYPE_TV_SERIES: number = 18;
        public static MEDIA_TYPE_TV_SEASON: number = 19;
        public static MEDIA_TYPE_FOLDER_MIXED: number = 20;
        public static MEDIA_TYPE_FOLDER_ALBUMS: number = 21;
        public static MEDIA_TYPE_FOLDER_ARTISTS: number = 22;
        public static MEDIA_TYPE_FOLDER_GENRES: number = 23;
        public static MEDIA_TYPE_FOLDER_PLAYLISTS: number = 24;
        public static MEDIA_TYPE_FOLDER_YEARS: number = 25;
        public static MEDIA_TYPE_FOLDER_AUDIO_BOOKS: number = 26;
        public static MEDIA_TYPE_FOLDER_PODCASTS: number = 27;
        public static MEDIA_TYPE_FOLDER_TV_CHANNELS: number = 28;
        public static MEDIA_TYPE_FOLDER_TV_SERIES: number = 29;
        public static MEDIA_TYPE_FOLDER_TV_SHOWS: number = 30;
        public static MEDIA_TYPE_FOLDER_RADIO_STATIONS: number = 31;
        public static MEDIA_TYPE_FOLDER_NEWS: number = 32;
        public static MEDIA_TYPE_FOLDER_VIDEOS: number = 33;
        public static MEDIA_TYPE_FOLDER_TRAILERS: number = 34;
        public static MEDIA_TYPE_FOLDER_MOVIES: number = 35;
        public static FOLDER_TYPE_NONE: number = -1;
        public static FOLDER_TYPE_MIXED: number = 0;
        public static FOLDER_TYPE_TITLES: number = 1;
        public static FOLDER_TYPE_ALBUMS: number = 2;
        public static FOLDER_TYPE_ARTISTS: number = 3;
        public static FOLDER_TYPE_GENRES: number = 4;
        public static FOLDER_TYPE_PLAYLISTS: number = 5;
        public static FOLDER_TYPE_YEARS: number = 6;
        public static PICTURE_TYPE_OTHER: number = 0;
        public static PICTURE_TYPE_FILE_ICON: number = 1;
        public static PICTURE_TYPE_FILE_ICON_OTHER: number = 2;
        public static PICTURE_TYPE_FRONT_COVER: number = 3;
        public static PICTURE_TYPE_BACK_COVER: number = 4;
        public static PICTURE_TYPE_LEAFLET_PAGE: number = 5;
        public static PICTURE_TYPE_MEDIA: number = 6;
        public static PICTURE_TYPE_LEAD_ARTIST_PERFORMER: number = 7;
        public static PICTURE_TYPE_ARTIST_PERFORMER: number = 8;
        public static PICTURE_TYPE_CONDUCTOR: number = 9;
        public static PICTURE_TYPE_BAND_ORCHESTRA: number = 10;
        public static PICTURE_TYPE_COMPOSER: number = 11;
        public static PICTURE_TYPE_LYRICIST: number = 12;
        public static PICTURE_TYPE_RECORDING_LOCATION: number = 13;
        public static PICTURE_TYPE_DURING_RECORDING: number = 14;
        public static PICTURE_TYPE_DURING_PERFORMANCE: number = 15;
        public static PICTURE_TYPE_MOVIE_VIDEO_SCREEN_CAPTURE: number = 16;
        public static PICTURE_TYPE_A_BRIGHT_COLORED_FISH: number = 17;
        public static PICTURE_TYPE_ILLUSTRATION: number = 18;
        public static PICTURE_TYPE_BAND_ARTIST_LOGO: number = 19;
        public static PICTURE_TYPE_PUBLISHER_STUDIO_LOGO: number = 20;
        public static EMPTY: androidx.media3.common.MediaMetadata;
        public title: string;
        public artist: string;
        public albumTitle: string;
        public albumArtist: string;
        public displayTitle: string;
        public subtitle: string;
        public description: string;
        public userRating: androidx.media3.common.Rating;
        public overallRating: androidx.media3.common.Rating;
        public artworkData: androidNative.Array<number>;
        public artworkDataType: java.lang.Integer;
        public artworkUri: globalAndroid.net.Uri;
        public trackNumber: java.lang.Integer;
        public totalTrackCount: java.lang.Integer;
        public folderType: java.lang.Integer;
        public isBrowsable: java.lang.Boolean;
        public isPlayable: java.lang.Boolean;
        public year: java.lang.Integer;
        public recordingYear: java.lang.Integer;
        public recordingMonth: java.lang.Integer;
        public recordingDay: java.lang.Integer;
        public releaseYear: java.lang.Integer;
        public releaseMonth: java.lang.Integer;
        public releaseDay: java.lang.Integer;
        public writer: string;
        public composer: string;
        public conductor: string;
        public discNumber: java.lang.Integer;
        public totalDiscCount: java.lang.Integer;
        public genre: string;
        public compilation: string;
        public station: string;
        public mediaType: java.lang.Integer;
        public extras: globalAndroid.os.Bundle;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.MediaMetadata>;
        public buildUpon(): androidx.media3.common.MediaMetadata.Builder;
        public equals(obj: any): boolean;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public static fromBundle(fieldBundle: globalAndroid.os.Bundle): androidx.media3.common.MediaMetadata;
      }
      export module MediaMetadata {
        export class Builder {
          public static class: java.lang.Class<androidx.media3.common.MediaMetadata.Builder>;
          public setOverallRating(overallRating: androidx.media3.common.Rating): androidx.media3.common.MediaMetadata.Builder;
          public setTrackNumber(trackNumber: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public setReleaseMonth(releaseMonth: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public maybeSetArtworkData(artworkData: androidNative.Array<number>, artworkDataType: number): androidx.media3.common.MediaMetadata.Builder;
          public setReleaseDay(releaseDay: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public setArtworkUri(artworkUri: globalAndroid.net.Uri): androidx.media3.common.MediaMetadata.Builder;
          public setArtworkData(artworkData: androidNative.Array<number>, artworkDataType: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public setTitle(title: string): androidx.media3.common.MediaMetadata.Builder;
          public setSubtitle(subtitle: string): androidx.media3.common.MediaMetadata.Builder;
          public populateFromMetadata(i: androidx.media3.common.Metadata): androidx.media3.common.MediaMetadata.Builder;
          public populate(mediaMetadata: androidx.media3.common.MediaMetadata): androidx.media3.common.MediaMetadata.Builder;
          public setTotalTrackCount(totalTrackCount: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public setRecordingDay(recordingDay: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public setCompilation(compilation: string): androidx.media3.common.MediaMetadata.Builder;
          public setRecordingMonth(recordingMonth: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public constructor();
          public setWriter(writer: string): androidx.media3.common.MediaMetadata.Builder;
          /** @deprecated */
          public setYear(year: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public populateFromMetadata(j: java.util.List<androidx.media3.common.Metadata>): androidx.media3.common.MediaMetadata.Builder;
          public setDisplayTitle(displayTitle: string): androidx.media3.common.MediaMetadata.Builder;
          /** @deprecated */
          public setFolderType(folderType: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public setExtras(extras: globalAndroid.os.Bundle): androidx.media3.common.MediaMetadata.Builder;
          public setComposer(composer: string): androidx.media3.common.MediaMetadata.Builder;
          public setGenre(genre: string): androidx.media3.common.MediaMetadata.Builder;
          public setIsBrowsable(isBrowsable: java.lang.Boolean): androidx.media3.common.MediaMetadata.Builder;
          public setAlbumArtist(albumArtist: string): androidx.media3.common.MediaMetadata.Builder;
          public setRecordingYear(recordingYear: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public setDiscNumber(discNumber: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public setArtist(artist: string): androidx.media3.common.MediaMetadata.Builder;
          /** @deprecated */
          public setArtworkData(artworkData: androidNative.Array<number>): androidx.media3.common.MediaMetadata.Builder;
          public setMediaType(mediaType: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public setStation(station: string): androidx.media3.common.MediaMetadata.Builder;
          public setConductor(conductor: string): androidx.media3.common.MediaMetadata.Builder;
          public setUserRating(userRating: androidx.media3.common.Rating): androidx.media3.common.MediaMetadata.Builder;
          public setReleaseYear(releaseYear: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public setTotalDiscCount(totalDiscCount: java.lang.Integer): androidx.media3.common.MediaMetadata.Builder;
          public build(): androidx.media3.common.MediaMetadata;
          public setAlbumTitle(albumTitle: string): androidx.media3.common.MediaMetadata.Builder;
          public setDescription(description: string): androidx.media3.common.MediaMetadata.Builder;
          public setIsPlayable(isPlayable: java.lang.Boolean): androidx.media3.common.MediaMetadata.Builder;
        }
        export class FolderType {
          public static class: java.lang.Class<androidx.media3.common.MediaMetadata.FolderType>;
          /**
           * Constructs a new instance of the androidx.media3.common.MediaMetadata$FolderType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class MediaType {
          public static class: java.lang.Class<androidx.media3.common.MediaMetadata.MediaType>;
          /**
           * Constructs a new instance of the androidx.media3.common.MediaMetadata$MediaType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class PictureType {
          public static class: java.lang.Class<androidx.media3.common.MediaMetadata.PictureType>;
          /**
           * Constructs a new instance of the androidx.media3.common.MediaMetadata$PictureType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class Metadata {
        public static class: java.lang.Class<androidx.media3.common.Metadata>;
        public presentationTimeUs: number;
        public static CREATOR: globalAndroid.os.Parcelable.Creator<androidx.media3.common.Metadata>;
        public constructor(presentationTimeUs: number, entries: androidNative.Array<androidx.media3.common.Metadata.Entry>);
        public copyWithPresentationTimeUs(presentationTimeUs: number): androidx.media3.common.Metadata;
        public length(): number;
        public writeToParcel(this_: globalAndroid.os.Parcel, dest: number): void;
        public copyWithAppendedEntries(entriesToAppend: androidNative.Array<androidx.media3.common.Metadata.Entry>): androidx.media3.common.Metadata;
        public toString(): string;
        public get(index: number): androidx.media3.common.Metadata.Entry;
        public constructor(presentationTimeUs: number, entries: java.util.List<any>);
        public equals(obj: any): boolean;
        public copyWithAppendedEntriesFrom(other: androidx.media3.common.Metadata): androidx.media3.common.Metadata;
        public hashCode(): number;
        public describeContents(): number;
        public constructor(entries: androidNative.Array<androidx.media3.common.Metadata.Entry>);
        public constructor(entries: java.util.List<any>);
      }
      export module Metadata {
        export class Entry {
          public static class: java.lang.Class<androidx.media3.common.Metadata.Entry>;
          /**
           * Constructs a new instance of the androidx.media3.common.Metadata$Entry interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            getWrappedMetadataFormat(): androidx.media3.common.Format;
            getWrappedMetadataBytes(): androidNative.Array<number>;
            populateMediaMetadata(builder: androidx.media3.common.MediaMetadata.Builder): void;
          });
          public constructor();
          public populateMediaMetadata(builder: androidx.media3.common.MediaMetadata.Builder): void;
          public getWrappedMetadataFormat(): androidx.media3.common.Format;
          public getWrappedMetadataBytes(): androidNative.Array<number>;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class MimeTypes {
        public static class: java.lang.Class<androidx.media3.common.MimeTypes>;
        public static BASE_TYPE_VIDEO: string = 'video';
        public static BASE_TYPE_AUDIO: string = 'audio';
        public static BASE_TYPE_TEXT: string = 'text';
        public static BASE_TYPE_IMAGE: string = 'image';
        public static BASE_TYPE_APPLICATION: string = 'application';
        public static VIDEO_MP4: string = 'video/mp4';
        public static VIDEO_MATROSKA: string = 'video/x-matroska';
        public static VIDEO_WEBM: string = 'video/webm';
        public static VIDEO_H263: string = 'video/3gpp';
        public static VIDEO_H264: string = 'video/avc';
        public static VIDEO_H265: string = 'video/hevc';
        public static VIDEO_VP8: string = 'video/x-vnd.on2.vp8';
        public static VIDEO_VP9: string = 'video/x-vnd.on2.vp9';
        public static VIDEO_AV1: string = 'video/av01';
        public static VIDEO_MP2T: string = 'video/mp2t';
        public static VIDEO_MP4V: string = 'video/mp4v-es';
        public static VIDEO_MPEG: string = 'video/mpeg';
        public static VIDEO_PS: string = 'video/mp2p';
        public static VIDEO_MPEG2: string = 'video/mpeg2';
        public static VIDEO_VC1: string = 'video/wvc1';
        public static VIDEO_DIVX: string = 'video/divx';
        public static VIDEO_FLV: string = 'video/x-flv';
        public static VIDEO_DOLBY_VISION: string = 'video/dolby-vision';
        public static VIDEO_OGG: string = 'video/ogg';
        public static VIDEO_AVI: string = 'video/x-msvideo';
        public static VIDEO_MJPEG: string = 'video/mjpeg';
        public static VIDEO_MP42: string = 'video/mp42';
        public static VIDEO_MP43: string = 'video/mp43';
        public static VIDEO_RAW: string = 'video/raw';
        public static VIDEO_UNKNOWN: string = 'video/x-unknown';
        public static AUDIO_MP4: string = 'audio/mp4';
        public static AUDIO_AAC: string = 'audio/mp4a-latm';
        public static AUDIO_MATROSKA: string = 'audio/x-matroska';
        public static AUDIO_WEBM: string = 'audio/webm';
        public static AUDIO_MPEG: string = 'audio/mpeg';
        public static AUDIO_MPEG_L1: string = 'audio/mpeg-L1';
        public static AUDIO_MPEG_L2: string = 'audio/mpeg-L2';
        public static AUDIO_MPEGH_MHA1: string = 'audio/mha1';
        public static AUDIO_MPEGH_MHM1: string = 'audio/mhm1';
        public static AUDIO_RAW: string = 'audio/raw';
        public static AUDIO_ALAW: string = 'audio/g711-alaw';
        public static AUDIO_MLAW: string = 'audio/g711-mlaw';
        public static AUDIO_AC3: string = 'audio/ac3';
        public static AUDIO_E_AC3: string = 'audio/eac3';
        public static AUDIO_E_AC3_JOC: string = 'audio/eac3-joc';
        public static AUDIO_AC4: string = 'audio/ac4';
        public static AUDIO_TRUEHD: string = 'audio/true-hd';
        public static AUDIO_DTS: string = 'audio/vnd.dts';
        public static AUDIO_DTS_HD: string = 'audio/vnd.dts.hd';
        public static AUDIO_DTS_EXPRESS: string = 'audio/vnd.dts.hd;profile=lbr';
        public static AUDIO_DTS_X: string = 'audio/vnd.dts.uhd;profile=p2';
        public static AUDIO_VORBIS: string = 'audio/vorbis';
        public static AUDIO_OPUS: string = 'audio/opus';
        public static AUDIO_AMR: string = 'audio/amr';
        public static AUDIO_AMR_NB: string = 'audio/3gpp';
        public static AUDIO_AMR_WB: string = 'audio/amr-wb';
        public static AUDIO_FLAC: string = 'audio/flac';
        public static AUDIO_ALAC: string = 'audio/alac';
        public static AUDIO_MSGSM: string = 'audio/gsm';
        public static AUDIO_OGG: string = 'audio/ogg';
        public static AUDIO_WAV: string = 'audio/wav';
        public static AUDIO_MIDI: string = 'audio/midi';
        public static AUDIO_EXOPLAYER_MIDI: string = 'audio/x-exoplayer-midi';
        public static AUDIO_UNKNOWN: string = 'audio/x-unknown';
        public static TEXT_VTT: string = 'text/vtt';
        public static TEXT_SSA: string = 'text/x-ssa';
        public static TEXT_UNKNOWN: string = 'text/x-unknown';
        public static APPLICATION_MP4: string = 'application/mp4';
        public static APPLICATION_WEBM: string = 'application/webm';
        public static APPLICATION_MATROSKA: string = 'application/x-matroska';
        public static APPLICATION_MPD: string = 'application/dash+xml';
        public static APPLICATION_M3U8: string = 'application/x-mpegURL';
        public static APPLICATION_SS: string = 'application/vnd.ms-sstr+xml';
        public static APPLICATION_ID3: string = 'application/id3';
        public static APPLICATION_CEA608: string = 'application/cea-608';
        public static APPLICATION_CEA708: string = 'application/cea-708';
        public static APPLICATION_SUBRIP: string = 'application/x-subrip';
        public static APPLICATION_TTML: string = 'application/ttml+xml';
        public static APPLICATION_TX3G: string = 'application/x-quicktime-tx3g';
        public static APPLICATION_MP4VTT: string = 'application/x-mp4-vtt';
        public static APPLICATION_MP4CEA608: string = 'application/x-mp4-cea-608';
        public static APPLICATION_RAWCC: string = 'application/x-rawcc';
        public static APPLICATION_VOBSUB: string = 'application/vobsub';
        public static APPLICATION_PGS: string = 'application/pgs';
        public static APPLICATION_SCTE35: string = 'application/x-scte35';
        public static APPLICATION_CAMERA_MOTION: string = 'application/x-camera-motion';
        public static APPLICATION_EMSG: string = 'application/x-emsg';
        public static APPLICATION_DVBSUBS: string = 'application/dvbsubs';
        public static APPLICATION_EXIF: string = 'application/x-exif';
        public static APPLICATION_ICY: string = 'application/x-icy';
        public static APPLICATION_AIT: string = 'application/vnd.dvb.ait';
        public static APPLICATION_RTSP: string = 'application/x-rtsp';
        public static APPLICATION_MEDIA3_CUES: string = 'application/x-media3-cues';
        public static APPLICATION_EXTERNALLY_LOADED_IMAGE: string = 'application/x-image-uri';
        public static IMAGE_JPEG: string = 'image/jpeg';
        public static IMAGE_PNG: string = 'image/png';
        public static IMAGE_HEIF: string = 'image/heif';
        public static IMAGE_BMP: string = 'image/bmp';
        public static IMAGE_WEBP: string = 'image/webp';
        public static CODEC_E_AC3_JOC: string = 'ec+3';
        public static registerCustomMimeType(i: string, mimeType: string, codecPrefix: number): void;
        public static containsCodecsCorrespondingToMimeType(codecs: string, mimeType: string): boolean;
        public static getTrackType(mimeType: string): number;
        public static isVideo(mimeType: string): boolean;
        public static getEncoding(objectType: string, mimeType: string): number;
        public static getMimeTypeFromMp4ObjectType(objectType: number): string;
        public static getTrackTypeOfCodec(codec: string): number;
        public static getTextMediaMimeType(mimeType: string): string;
        public static normalizeMimeType(mimeType: string): string;
        public static getCodecsCorrespondingToMimeType(codec: string, codecs: string): string;
        public static allSamplesAreSyncSamples(objectType: string, encoding: string): boolean;
        public static getAudioMediaMimeType(mimeType: string): string;
        public static isImage(mimeType: string): boolean;
        public static getVideoMediaMimeType(mimeType: string): string;
        public static isAudio(mimeType: string): boolean;
        public static isText(mimeType: string): boolean;
        public static getMediaMimeType(objectType: string): string;
        public static isMatroska(mimeType: string): boolean;
      }
      export module MimeTypes {
        export class CustomMimeType {
          public static class: java.lang.Class<androidx.media3.common.MimeTypes.CustomMimeType>;
          public mimeType: string;
          public codecPrefix: string;
          public trackType: number;
          public constructor(mimeType: string, codecPrefix: string, trackType: number);
        }
        export class Mp4aObjectType {
          public static class: java.lang.Class<androidx.media3.common.MimeTypes.Mp4aObjectType>;
          public objectTypeIndication: number;
          public audioObjectTypeIndication: number;
          public getEncoding(): number;
          public constructor(objectTypeIndication: number, audioObjectTypeIndication: number);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class OnInputFrameProcessedListener {
        public static class: java.lang.Class<androidx.media3.common.OnInputFrameProcessedListener>;
        /**
         * Constructs a new instance of the androidx.media3.common.OnInputFrameProcessedListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: { onInputFrameProcessed(param0: number, param1: number): void });
        public constructor();
        public onInputFrameProcessed(param0: number, param1: number): void;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class ParserException {
        public static class: java.lang.Class<androidx.media3.common.ParserException>;
        public contentIsMalformed: boolean;
        public dataType: number;
        public constructor(message: string, cause: java.lang.Throwable, contentIsMalformed: boolean, dataType: number);
        public static createForMalformedManifest(message: string, cause: java.lang.Throwable): androidx.media3.common.ParserException;
        public static createForUnsupportedContainerFeature(message: string): androidx.media3.common.ParserException;
        public static createForMalformedDataOfUnknownType(message: string, cause: java.lang.Throwable): androidx.media3.common.ParserException;
        public getMessage(): string;
        public static createForMalformedContainer(message: string, cause: java.lang.Throwable): androidx.media3.common.ParserException;
        public static createForManifestWithUnsupportedFeature(message: string, cause: java.lang.Throwable): androidx.media3.common.ParserException;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class PercentageRating extends androidx.media3.common.Rating {
        public static class: java.lang.Class<androidx.media3.common.PercentageRating>;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.PercentageRating>;
        public getPercent(): number;
        public equals(obj: any): boolean;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.PercentageRating;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public constructor(percent: number);
        public isRated(): boolean;
        public constructor();
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Rating;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class PlaybackException implements androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.PlaybackException>;
        public static ERROR_CODE_UNSPECIFIED: number = 1000;
        public static ERROR_CODE_REMOTE_ERROR: number = 1001;
        public static ERROR_CODE_BEHIND_LIVE_WINDOW: number = 1002;
        public static ERROR_CODE_TIMEOUT: number = 1003;
        public static ERROR_CODE_FAILED_RUNTIME_CHECK: number = 1004;
        public static ERROR_CODE_IO_UNSPECIFIED: number = 2000;
        public static ERROR_CODE_IO_NETWORK_CONNECTION_FAILED: number = 2001;
        public static ERROR_CODE_IO_NETWORK_CONNECTION_TIMEOUT: number = 2002;
        public static ERROR_CODE_IO_INVALID_HTTP_CONTENT_TYPE: number = 2003;
        public static ERROR_CODE_IO_BAD_HTTP_STATUS: number = 2004;
        public static ERROR_CODE_IO_FILE_NOT_FOUND: number = 2005;
        public static ERROR_CODE_IO_NO_PERMISSION: number = 2006;
        public static ERROR_CODE_IO_CLEARTEXT_NOT_PERMITTED: number = 2007;
        public static ERROR_CODE_IO_READ_POSITION_OUT_OF_RANGE: number = 2008;
        public static ERROR_CODE_PARSING_CONTAINER_MALFORMED: number = 3001;
        public static ERROR_CODE_PARSING_MANIFEST_MALFORMED: number = 3002;
        public static ERROR_CODE_PARSING_CONTAINER_UNSUPPORTED: number = 3003;
        public static ERROR_CODE_PARSING_MANIFEST_UNSUPPORTED: number = 3004;
        public static ERROR_CODE_DECODER_INIT_FAILED: number = 4001;
        public static ERROR_CODE_DECODER_QUERY_FAILED: number = 4002;
        public static ERROR_CODE_DECODING_FAILED: number = 4003;
        public static ERROR_CODE_DECODING_FORMAT_EXCEEDS_CAPABILITIES: number = 4004;
        public static ERROR_CODE_DECODING_FORMAT_UNSUPPORTED: number = 4005;
        public static ERROR_CODE_AUDIO_TRACK_INIT_FAILED: number = 5001;
        public static ERROR_CODE_AUDIO_TRACK_WRITE_FAILED: number = 5002;
        public static ERROR_CODE_AUDIO_TRACK_OFFLOAD_WRITE_FAILED: number = 5003;
        public static ERROR_CODE_AUDIO_TRACK_OFFLOAD_INIT_FAILED: number = 5004;
        public static ERROR_CODE_DRM_UNSPECIFIED: number = 6000;
        public static ERROR_CODE_DRM_SCHEME_UNSUPPORTED: number = 6001;
        public static ERROR_CODE_DRM_PROVISIONING_FAILED: number = 6002;
        public static ERROR_CODE_DRM_CONTENT_ERROR: number = 6003;
        public static ERROR_CODE_DRM_LICENSE_ACQUISITION_FAILED: number = 6004;
        public static ERROR_CODE_DRM_DISALLOWED_OPERATION: number = 6005;
        public static ERROR_CODE_DRM_SYSTEM_ERROR: number = 6006;
        public static ERROR_CODE_DRM_DEVICE_REVOKED: number = 6007;
        public static ERROR_CODE_DRM_LICENSE_EXPIRED: number = 6008;
        public static ERROR_CODE_VIDEO_FRAME_PROCESSOR_INIT_FAILED: number = 7000;
        public static ERROR_CODE_VIDEO_FRAME_PROCESSING_FAILED: number = 7001;
        public static CUSTOM_ERROR_CODE_BASE: number = 1000000;
        public errorCode: number;
        public timestampMs: number;
        public static FIELD_CUSTOM_ID_BASE: number = 1000;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.PlaybackException>;
        public constructor(message: string, cause: java.lang.Throwable, errorCode: number, timestampMs: number);
        public errorInfoEquals(other: androidx.media3.common.PlaybackException): boolean;
        public constructor(message: string, cause: java.lang.Throwable, errorCode: number);
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.PlaybackException;
        public toBundle(): globalAndroid.os.Bundle;
        public constructor(bundle: globalAndroid.os.Bundle);
        public getErrorCodeName(): string;
        public static getErrorCodeName(errorCode: number): string;
      }
      export module PlaybackException {
        export class ErrorCode {
          public static class: java.lang.Class<androidx.media3.common.PlaybackException.ErrorCode>;
          /**
           * Constructs a new instance of the androidx.media3.common.PlaybackException$ErrorCode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class PlaybackParameters extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.PlaybackParameters>;
        public static DEFAULT: androidx.media3.common.PlaybackParameters;
        public speed: number;
        public pitch: number;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.PlaybackParameters>;
        public constructor(speed: number);
        public getMediaTimeUsForPlayoutTimeMs(timeMs: number): number;
        public equals(obj: any): boolean;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.PlaybackParameters;
        public constructor(speed: number, pitch: number);
        public withSpeed(speed: number): androidx.media3.common.PlaybackParameters;
        public toString(): string;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class Player {
        public static class: java.lang.Class<androidx.media3.common.Player>;
        /**
         * Constructs a new instance of the androidx.media3.common.Player interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          getApplicationLooper(): globalAndroid.os.Looper;
          addListener(param0: androidx.media3.common.Player.Listener): void;
          removeListener(param0: androidx.media3.common.Player.Listener): void;
          setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>): void;
          setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>, param1: boolean): void;
          setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>, param1: number, param2: number): void;
          setMediaItem(param0: androidx.media3.common.MediaItem): void;
          setMediaItem(param0: androidx.media3.common.MediaItem, param1: number): void;
          setMediaItem(param0: androidx.media3.common.MediaItem, param1: boolean): void;
          addMediaItem(param0: androidx.media3.common.MediaItem): void;
          addMediaItem(param0: number, param1: androidx.media3.common.MediaItem): void;
          addMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>): void;
          addMediaItems(param0: number, param1: java.util.List<androidx.media3.common.MediaItem>): void;
          moveMediaItem(param0: number, param1: number): void;
          moveMediaItems(param0: number, param1: number, param2: number): void;
          replaceMediaItem(param0: number, param1: androidx.media3.common.MediaItem): void;
          replaceMediaItems(param0: number, param1: number, param2: java.util.List<androidx.media3.common.MediaItem>): void;
          removeMediaItem(param0: number): void;
          removeMediaItems(param0: number, param1: number): void;
          clearMediaItems(): void;
          isCommandAvailable(param0: number): boolean;
          canAdvertiseSession(): boolean;
          getAvailableCommands(): androidx.media3.common.Player.Commands;
          prepare(): void;
          getPlaybackState(): number;
          getPlaybackSuppressionReason(): number;
          isPlaying(): boolean;
          getPlayerError(): androidx.media3.common.PlaybackException;
          play(): void;
          pause(): void;
          setPlayWhenReady(param0: boolean): void;
          getPlayWhenReady(): boolean;
          setRepeatMode(param0: number): void;
          getRepeatMode(): number;
          setShuffleModeEnabled(param0: boolean): void;
          getShuffleModeEnabled(): boolean;
          isLoading(): boolean;
          seekToDefaultPosition(): void;
          seekToDefaultPosition(param0: number): void;
          seekTo(param0: number): void;
          seekTo(param0: number, param1: number): void;
          getSeekBackIncrement(): number;
          seekBack(): void;
          getSeekForwardIncrement(): number;
          seekForward(): void;
          hasPrevious(): boolean;
          hasPreviousWindow(): boolean;
          hasPreviousMediaItem(): boolean;
          previous(): void;
          seekToPreviousWindow(): void;
          seekToPreviousMediaItem(): void;
          getMaxSeekToPreviousPosition(): number;
          seekToPrevious(): void;
          hasNext(): boolean;
          hasNextWindow(): boolean;
          hasNextMediaItem(): boolean;
          next(): void;
          seekToNextWindow(): void;
          seekToNextMediaItem(): void;
          seekToNext(): void;
          setPlaybackParameters(param0: androidx.media3.common.PlaybackParameters): void;
          setPlaybackSpeed(param0: number): void;
          getPlaybackParameters(): androidx.media3.common.PlaybackParameters;
          stop(): void;
          release(): void;
          getCurrentTracks(): androidx.media3.common.Tracks;
          getTrackSelectionParameters(): androidx.media3.common.TrackSelectionParameters;
          setTrackSelectionParameters(param0: androidx.media3.common.TrackSelectionParameters): void;
          getMediaMetadata(): androidx.media3.common.MediaMetadata;
          getPlaylistMetadata(): androidx.media3.common.MediaMetadata;
          setPlaylistMetadata(param0: androidx.media3.common.MediaMetadata): void;
          getCurrentManifest(): any;
          getCurrentTimeline(): androidx.media3.common.Timeline;
          getCurrentPeriodIndex(): number;
          getCurrentWindowIndex(): number;
          getCurrentMediaItemIndex(): number;
          getNextWindowIndex(): number;
          getNextMediaItemIndex(): number;
          getPreviousWindowIndex(): number;
          getPreviousMediaItemIndex(): number;
          getCurrentMediaItem(): androidx.media3.common.MediaItem;
          getMediaItemCount(): number;
          getMediaItemAt(param0: number): androidx.media3.common.MediaItem;
          getDuration(): number;
          getCurrentPosition(): number;
          getBufferedPosition(): number;
          getBufferedPercentage(): number;
          getTotalBufferedDuration(): number;
          isCurrentWindowDynamic(): boolean;
          isCurrentMediaItemDynamic(): boolean;
          isCurrentWindowLive(): boolean;
          isCurrentMediaItemLive(): boolean;
          getCurrentLiveOffset(): number;
          isCurrentWindowSeekable(): boolean;
          isCurrentMediaItemSeekable(): boolean;
          isPlayingAd(): boolean;
          getCurrentAdGroupIndex(): number;
          getCurrentAdIndexInAdGroup(): number;
          getContentDuration(): number;
          getContentPosition(): number;
          getContentBufferedPosition(): number;
          getAudioAttributes(): androidx.media3.common.AudioAttributes;
          setVolume(param0: number): void;
          getVolume(): number;
          clearVideoSurface(): void;
          clearVideoSurface(param0: globalAndroid.view.Surface): void;
          setVideoSurface(param0: globalAndroid.view.Surface): void;
          setVideoSurfaceHolder(param0: globalAndroid.view.SurfaceHolder): void;
          clearVideoSurfaceHolder(param0: globalAndroid.view.SurfaceHolder): void;
          setVideoSurfaceView(param0: globalAndroid.view.SurfaceView): void;
          clearVideoSurfaceView(param0: globalAndroid.view.SurfaceView): void;
          setVideoTextureView(param0: globalAndroid.view.TextureView): void;
          clearVideoTextureView(param0: globalAndroid.view.TextureView): void;
          getVideoSize(): androidx.media3.common.VideoSize;
          getSurfaceSize(): androidx.media3.common.util.Size;
          getCurrentCues(): androidx.media3.common.text.CueGroup;
          getDeviceInfo(): androidx.media3.common.DeviceInfo;
          getDeviceVolume(): number;
          isDeviceMuted(): boolean;
          setDeviceVolume(param0: number): void;
          setDeviceVolume(param0: number, param1: number): void;
          increaseDeviceVolume(): void;
          increaseDeviceVolume(param0: number): void;
          decreaseDeviceVolume(): void;
          decreaseDeviceVolume(param0: number): void;
          setDeviceMuted(param0: boolean): void;
          setDeviceMuted(param0: boolean, param1: number): void;
          setAudioAttributes(param0: androidx.media3.common.AudioAttributes, param1: boolean): void;
        });
        public constructor();
        public static DISCONTINUITY_REASON_REMOVE: number = 4;
        public static TIMELINE_CHANGE_REASON_PLAYLIST_CHANGED: number = 0;
        public static EVENT_POSITION_DISCONTINUITY: number = 11;
        public static COMMAND_INVALID: number = -1;
        public static EVENT_SEEK_BACK_INCREMENT_CHANGED: number = 16;
        public static EVENT_TRACKS_CHANGED: number = 2;
        public static EVENT_SEEK_FORWARD_INCREMENT_CHANGED: number = 17;
        public static COMMAND_SET_SPEED_AND_PITCH: number = 13;
        public static TIMELINE_CHANGE_REASON_SOURCE_UPDATE: number = 1;
        public static DISCONTINUITY_REASON_SILENCE_SKIP: number = 6;
        public static COMMAND_SET_DEVICE_VOLUME_WITH_FLAGS: number = 33;
        public static EVENT_AVAILABLE_COMMANDS_CHANGED: number = 13;
        public static EVENT_PLAYBACK_PARAMETERS_CHANGED: number = 12;
        public static PLAYBACK_SUPPRESSION_REASON_TRANSIENT_AUDIO_FOCUS_LOSS: number = 1;
        public static COMMAND_SEEK_TO_NEXT_WINDOW: number = 8;
        public static PLAY_WHEN_READY_CHANGE_REASON_AUDIO_FOCUS_LOSS: number = 2;
        public static DISCONTINUITY_REASON_SKIP: number = 3;
        public static EVENT_AUDIO_SESSION_ID: number = 21;
        public static COMMAND_RELEASE: number = 32;
        public static STATE_READY: number = 3;
        public static DISCONTINUITY_REASON_SEEK: number = 1;
        public static COMMAND_PREPARE: number = 2;
        public static PLAYBACK_SUPPRESSION_REASON_UNSUITABLE_AUDIO_ROUTE: number = 2;
        public static EVENT_DEVICE_VOLUME_CHANGED: number = 30;
        public static COMMAND_SEEK_TO_PREVIOUS_WINDOW: number = 6;
        public static EVENT_REPEAT_MODE_CHANGED: number = 8;
        public static COMMAND_PLAY_PAUSE: number = 1;
        public static EVENT_VIDEO_SIZE_CHANGED: number = 25;
        public static EVENT_PLAYLIST_METADATA_CHANGED: number = 15;
        public static EVENT_IS_PLAYING_CHANGED: number = 7;
        public static PLAY_WHEN_READY_CHANGE_REASON_USER_REQUEST: number = 1;
        public static EVENT_PLAYBACK_SUPPRESSION_REASON_CHANGED: number = 6;
        public static COMMAND_SET_PLAYLIST_METADATA: number = 19;
        public static EVENT_SHUFFLE_MODE_ENABLED_CHANGED: number = 9;
        public static COMMAND_SEEK_TO_MEDIA_ITEM: number = 10;
        public static COMMAND_SEEK_FORWARD: number = 12;
        public static COMMAND_SEEK_TO_NEXT_MEDIA_ITEM: number = 8;
        public static EVENT_VOLUME_CHANGED: number = 22;
        public static EVENT_MEDIA_METADATA_CHANGED: number = 14;
        public static STATE_BUFFERING: number = 2;
        public static EVENT_CUES: number = 27;
        public static EVENT_MAX_SEEK_TO_PREVIOUS_POSITION_CHANGED: number = 18;
        public static EVENT_SKIP_SILENCE_ENABLED_CHANGED: number = 23;
        public static COMMAND_GET_METADATA: number = 18;
        public static COMMAND_GET_TIMELINE: number = 17;
        public static COMMAND_SET_SHUFFLE_MODE: number = 14;
        public static MEDIA_ITEM_TRANSITION_REASON_REPEAT: number = 0;
        public static MEDIA_ITEM_TRANSITION_REASON_PLAYLIST_CHANGED: number = 3;
        public static COMMAND_SET_REPEAT_MODE: number = 15;
        public static REPEAT_MODE_ALL: number = 2;
        public static MEDIA_ITEM_TRANSITION_REASON_SEEK: number = 2;
        public static PLAYBACK_SUPPRESSION_REASON_NONE: number = 0;
        public static EVENT_TIMELINE_CHANGED: number = 0;
        public static COMMAND_GET_TEXT: number = 28;
        public static DISCONTINUITY_REASON_INTERNAL: number = 5;
        public static COMMAND_SET_VOLUME: number = 24;
        public static STATE_ENDED: number = 4;
        public static COMMAND_SEEK_IN_CURRENT_WINDOW: number = 5;
        public static EVENT_AUDIO_ATTRIBUTES_CHANGED: number = 20;
        public static COMMAND_SET_AUDIO_ATTRIBUTES: number = 35;
        public static COMMAND_SET_DEVICE_VOLUME: number = 25;
        public static COMMAND_STOP: number = 3;
        public static REPEAT_MODE_OFF: number = 0;
        public static COMMAND_SEEK_BACK: number = 11;
        public static COMMAND_GET_AUDIO_ATTRIBUTES: number = 21;
        public static PLAY_WHEN_READY_CHANGE_REASON_AUDIO_BECOMING_NOISY: number = 3;
        public static COMMAND_SET_VIDEO_SURFACE: number = 27;
        public static EVENT_DEVICE_INFO_CHANGED: number = 29;
        public static EVENT_SURFACE_SIZE_CHANGED: number = 24;
        public static EVENT_PLAYER_ERROR: number = 10;
        public static COMMAND_SEEK_TO_DEFAULT_POSITION: number = 4;
        public static EVENT_METADATA: number = 28;
        public static COMMAND_ADJUST_DEVICE_VOLUME_WITH_FLAGS: number = 34;
        public static STATE_IDLE: number = 1;
        public static REPEAT_MODE_ONE: number = 1;
        public static COMMAND_GET_VOLUME: number = 22;
        public static MEDIA_ITEM_TRANSITION_REASON_AUTO: number = 1;
        public static EVENT_PLAY_WHEN_READY_CHANGED: number = 5;
        public static EVENT_RENDERED_FIRST_FRAME: number = 26;
        public static COMMAND_GET_DEVICE_VOLUME: number = 23;
        public static PLAY_WHEN_READY_CHANGE_REASON_END_OF_MEDIA_ITEM: number = 5;
        public static EVENT_MEDIA_ITEM_TRANSITION: number = 1;
        public static COMMAND_GET_TRACKS: number = 30;
        public static DISCONTINUITY_REASON_AUTO_TRANSITION: number = 0;
        public static COMMAND_SEEK_TO_PREVIOUS: number = 7;
        public static COMMAND_SEEK_IN_CURRENT_MEDIA_ITEM: number = 5;
        public static COMMAND_SET_TRACK_SELECTION_PARAMETERS: number = 29;
        public static EVENT_IS_LOADING_CHANGED: number = 3;
        public static COMMAND_SET_MEDIA_ITEM: number = 31;
        public static EVENT_PLAYBACK_STATE_CHANGED: number = 4;
        public static COMMAND_SEEK_TO_PREVIOUS_MEDIA_ITEM: number = 6;
        public static PLAY_WHEN_READY_CHANGE_REASON_REMOTE: number = 4;
        public static DISCONTINUITY_REASON_SEEK_ADJUSTMENT: number = 2;
        public static COMMAND_CHANGE_MEDIA_ITEMS: number = 20;
        public static COMMAND_ADJUST_DEVICE_VOLUME: number = 26;
        public static COMMAND_GET_CURRENT_MEDIA_ITEM: number = 16;
        public static PLAYBACK_SUPPRESSION_REASON_UNSUITABLE_AUDIO_OUTPUT: number = 3;
        public static PLAY_WHEN_READY_CHANGE_REASON_SUPPRESSED_TOO_LONG: number = 6;
        public static COMMAND_GET_MEDIA_ITEMS_METADATA: number = 18;
        public static EVENT_TRACK_SELECTION_PARAMETERS_CHANGED: number = 19;
        public static COMMAND_SEEK_TO_WINDOW: number = 10;
        public static COMMAND_SET_MEDIA_ITEMS_METADATA: number = 19;
        public static COMMAND_SEEK_TO_NEXT: number = 9;
        public getContentBufferedPosition(): number;
        public setDeviceMuted(param0: boolean, param1: number): void;
        public getSurfaceSize(): androidx.media3.common.util.Size;
        public isCommandAvailable(param0: number): boolean;
        public getMediaMetadata(): androidx.media3.common.MediaMetadata;
        public getCurrentLiveOffset(): number;
        public isDeviceMuted(): boolean;
        public setPlayWhenReady(param0: boolean): void;
        /** @deprecated */
        public next(): void;
        public prepare(): void;
        public getDeviceInfo(): androidx.media3.common.DeviceInfo;
        public addListener(param0: androidx.media3.common.Player.Listener): void;
        public getVideoSize(): androidx.media3.common.VideoSize;
        /** @deprecated */
        public setDeviceMuted(param0: boolean): void;
        public seekTo(param0: number, param1: number): void;
        public getBufferedPercentage(): number;
        public moveMediaItem(param0: number, param1: number): void;
        public setVideoSurface(param0: globalAndroid.view.Surface): void;
        public getApplicationLooper(): globalAndroid.os.Looper;
        public getNextMediaItemIndex(): number;
        public getAudioAttributes(): androidx.media3.common.AudioAttributes;
        /** @deprecated */
        public seekToPreviousWindow(): void;
        public getAvailableCommands(): androidx.media3.common.Player.Commands;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>, param1: number, param2: number): void;
        public clearVideoSurfaceView(param0: globalAndroid.view.SurfaceView): void;
        /** @deprecated */
        public setDeviceVolume(param0: number): void;
        public setMediaItem(param0: androidx.media3.common.MediaItem, param1: boolean): void;
        /** @deprecated */
        public getNextWindowIndex(): number;
        public getContentDuration(): number;
        public getCurrentPosition(): number;
        /** @deprecated */
        public getPreviousWindowIndex(): number;
        public seekToNext(): void;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>): void;
        public getCurrentPeriodIndex(): number;
        /** @deprecated */
        public seekToNextWindow(): void;
        public getShuffleModeEnabled(): boolean;
        /** @deprecated */
        public increaseDeviceVolume(): void;
        public getCurrentMediaItemIndex(): number;
        public replaceMediaItem(param0: number, param1: androidx.media3.common.MediaItem): void;
        public getTrackSelectionParameters(): androidx.media3.common.TrackSelectionParameters;
        public getDuration(): number;
        public increaseDeviceVolume(param0: number): void;
        /** @deprecated */
        public hasNext(): boolean;
        public isLoading(): boolean;
        /** @deprecated */
        public hasPrevious(): boolean;
        public seekToPreviousMediaItem(): void;
        public getSeekForwardIncrement(): number;
        public removeListener(param0: androidx.media3.common.Player.Listener): void;
        public getBufferedPosition(): number;
        public seekToPrevious(): void;
        public addMediaItems(param0: number, param1: java.util.List<androidx.media3.common.MediaItem>): void;
        public hasPreviousMediaItem(): boolean;
        public getPlaybackParameters(): androidx.media3.common.PlaybackParameters;
        public getMediaItemCount(): number;
        public getCurrentAdIndexInAdGroup(): number;
        public release(): void;
        public getPlaybackSuppressionReason(): number;
        public moveMediaItems(param0: number, param1: number, param2: number): void;
        public isPlaying(): boolean;
        public getContentPosition(): number;
        public clearVideoSurface(param0: globalAndroid.view.Surface): void;
        public getCurrentTracks(): androidx.media3.common.Tracks;
        /** @deprecated */
        public hasNextWindow(): boolean;
        public getPlayerError(): androidx.media3.common.PlaybackException;
        public getCurrentTimeline(): androidx.media3.common.Timeline;
        public clearMediaItems(): void;
        /** @deprecated */
        public getCurrentWindowIndex(): number;
        public getCurrentMediaItem(): androidx.media3.common.MediaItem;
        public clearVideoSurfaceHolder(param0: globalAndroid.view.SurfaceHolder): void;
        public getPlaybackState(): number;
        public setDeviceVolume(param0: number, param1: number): void;
        public getCurrentCues(): androidx.media3.common.text.CueGroup;
        public isCurrentMediaItemDynamic(): boolean;
        public isCurrentMediaItemLive(): boolean;
        public getCurrentAdGroupIndex(): number;
        public removeMediaItem(param0: number): void;
        public getMediaItemAt(param0: number): androidx.media3.common.MediaItem;
        public setPlaybackParameters(param0: androidx.media3.common.PlaybackParameters): void;
        public seekToDefaultPosition(): void;
        public setVolume(param0: number): void;
        public setVideoSurfaceHolder(param0: globalAndroid.view.SurfaceHolder): void;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>, param1: boolean): void;
        public addMediaItem(param0: androidx.media3.common.MediaItem): void;
        public isCurrentMediaItemSeekable(): boolean;
        public setTrackSelectionParameters(param0: androidx.media3.common.TrackSelectionParameters): void;
        /** @deprecated */
        public isCurrentWindowDynamic(): boolean;
        public replaceMediaItems(param0: number, param1: number, param2: java.util.List<androidx.media3.common.MediaItem>): void;
        public getDeviceVolume(): number;
        public seekTo(param0: number): void;
        /** @deprecated */
        public isCurrentWindowLive(): boolean;
        public removeMediaItems(param0: number, param1: number): void;
        public getPlaylistMetadata(): androidx.media3.common.MediaMetadata;
        public clearVideoTextureView(param0: globalAndroid.view.TextureView): void;
        public getVolume(): number;
        public setMediaItem(param0: androidx.media3.common.MediaItem): void;
        public canAdvertiseSession(): boolean;
        public setRepeatMode(param0: number): void;
        public addMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>): void;
        public getSeekBackIncrement(): number;
        public setVideoTextureView(param0: globalAndroid.view.TextureView): void;
        public getPlayWhenReady(): boolean;
        public seekToNextMediaItem(): void;
        /** @deprecated */
        public previous(): void;
        public isPlayingAd(): boolean;
        /** @deprecated */
        public hasPreviousWindow(): boolean;
        public getPreviousMediaItemIndex(): number;
        public setAudioAttributes(param0: androidx.media3.common.AudioAttributes, param1: boolean): void;
        public clearVideoSurface(): void;
        public decreaseDeviceVolume(param0: number): void;
        public setVideoSurfaceView(param0: globalAndroid.view.SurfaceView): void;
        public setPlaybackSpeed(param0: number): void;
        public seekToDefaultPosition(param0: number): void;
        public getMaxSeekToPreviousPosition(): number;
        public play(): void;
        public pause(): void;
        public seekForward(): void;
        public getRepeatMode(): number;
        public hasNextMediaItem(): boolean;
        public addMediaItem(param0: number, param1: androidx.media3.common.MediaItem): void;
        public setPlaylistMetadata(param0: androidx.media3.common.MediaMetadata): void;
        public stop(): void;
        public setShuffleModeEnabled(param0: boolean): void;
        /** @deprecated */
        public decreaseDeviceVolume(): void;
        public setMediaItem(param0: androidx.media3.common.MediaItem, param1: number): void;
        public getTotalBufferedDuration(): number;
        public seekBack(): void;
        /** @deprecated */
        public isCurrentWindowSeekable(): boolean;
        public getCurrentManifest(): any;
      }
      export module Player {
        export class Command {
          public static class: java.lang.Class<androidx.media3.common.Player.Command>;
          /**
           * Constructs a new instance of the androidx.media3.common.Player$Command interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class Commands extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.Player.Commands>;
          public static EMPTY: androidx.media3.common.Player.Commands;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.Player.Commands>;
          public get(index: number): number;
          public equals(obj: any): boolean;
          public contains(command: number): boolean;
          public toBundle(): globalAndroid.os.Bundle;
          public size(): number;
          public containsAny(commands: androidNative.Array<number>): boolean;
          public buildUpon(): androidx.media3.common.Player.Commands.Builder;
          public hashCode(): number;
          public static fromBundle(i: globalAndroid.os.Bundle): androidx.media3.common.Player.Commands;
        }
        export module Commands {
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.Player.Commands.Builder>;
            public constructor();
            public addIf(command: number, condition: boolean): androidx.media3.common.Player.Commands.Builder;
            public addAll(commands: androidNative.Array<number>): androidx.media3.common.Player.Commands.Builder;
            public addAllCommands(): androidx.media3.common.Player.Commands.Builder;
            public removeAll(commands: androidNative.Array<number>): androidx.media3.common.Player.Commands.Builder;
            public remove(command: number): androidx.media3.common.Player.Commands.Builder;
            public build(): androidx.media3.common.Player.Commands;
            public removeIf(command: number, condition: boolean): androidx.media3.common.Player.Commands.Builder;
            public add(command: number): androidx.media3.common.Player.Commands.Builder;
            public addAll(commands: androidx.media3.common.Player.Commands): androidx.media3.common.Player.Commands.Builder;
          }
        }
        export class DiscontinuityReason {
          public static class: java.lang.Class<androidx.media3.common.Player.DiscontinuityReason>;
          /**
           * Constructs a new instance of the androidx.media3.common.Player$DiscontinuityReason interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class Event {
          public static class: java.lang.Class<androidx.media3.common.Player.Event>;
          /**
           * Constructs a new instance of the androidx.media3.common.Player$Event interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class Events {
          public static class: java.lang.Class<androidx.media3.common.Player.Events>;
          public containsAny(events: androidNative.Array<number>): boolean;
          public get(index: number): number;
          public equals(obj: any): boolean;
          public contains(event: number): boolean;
          public size(): number;
          public hashCode(): number;
          public constructor(flags: androidx.media3.common.FlagSet);
        }
        export class Listener {
          public static class: java.lang.Class<androidx.media3.common.Player.Listener>;
          /**
           * Constructs a new instance of the androidx.media3.common.Player$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onEvents(player: androidx.media3.common.Player, events: androidx.media3.common.Player.Events): void;
            onTimelineChanged(timeline: androidx.media3.common.Timeline, reason: number): void;
            onMediaItemTransition(mediaItem: androidx.media3.common.MediaItem, reason: number): void;
            onTracksChanged(tracks: androidx.media3.common.Tracks): void;
            onMediaMetadataChanged(mediaMetadata: androidx.media3.common.MediaMetadata): void;
            onPlaylistMetadataChanged(mediaMetadata: androidx.media3.common.MediaMetadata): void;
            onIsLoadingChanged(isLoading: boolean): void;
            onLoadingChanged(isLoading: boolean): void;
            onAvailableCommandsChanged(availableCommands: androidx.media3.common.Player.Commands): void;
            onTrackSelectionParametersChanged(parameters: androidx.media3.common.TrackSelectionParameters): void;
            onPlayerStateChanged(playWhenReady: boolean, playbackState: number): void;
            onPlaybackStateChanged(playbackState: number): void;
            onPlayWhenReadyChanged(playWhenReady: boolean, reason: number): void;
            onPlaybackSuppressionReasonChanged(playbackSuppressionReason: number): void;
            onIsPlayingChanged(isPlaying: boolean): void;
            onRepeatModeChanged(repeatMode: number): void;
            onShuffleModeEnabledChanged(shuffleModeEnabled: boolean): void;
            onPlayerError(error: androidx.media3.common.PlaybackException): void;
            onPlayerErrorChanged(error: androidx.media3.common.PlaybackException): void;
            onPositionDiscontinuity(reason: number): void;
            onPositionDiscontinuity(oldPosition: androidx.media3.common.Player.PositionInfo, newPosition: androidx.media3.common.Player.PositionInfo, reason: number): void;
            onPlaybackParametersChanged(playbackParameters: androidx.media3.common.PlaybackParameters): void;
            onSeekBackIncrementChanged(seekBackIncrementMs: number): void;
            onSeekForwardIncrementChanged(seekForwardIncrementMs: number): void;
            onMaxSeekToPreviousPositionChanged(maxSeekToPreviousPositionMs: number): void;
            onAudioSessionIdChanged(audioSessionId: number): void;
            onAudioAttributesChanged(audioAttributes: androidx.media3.common.AudioAttributes): void;
            onVolumeChanged(volume: number): void;
            onSkipSilenceEnabledChanged(skipSilenceEnabled: boolean): void;
            onDeviceInfoChanged(deviceInfo: androidx.media3.common.DeviceInfo): void;
            onDeviceVolumeChanged(volume: number, muted: boolean): void;
            onVideoSizeChanged(videoSize: androidx.media3.common.VideoSize): void;
            onSurfaceSizeChanged(width: number, height: number): void;
            onRenderedFirstFrame(): void;
            onCues(cues: java.util.List<androidx.media3.common.text.Cue>): void;
            onCues(cueGroup: androidx.media3.common.text.CueGroup): void;
            onMetadata(metadata: androidx.media3.common.Metadata): void;
          });
          public constructor();
          public onTimelineChanged(timeline: androidx.media3.common.Timeline, reason: number): void;
          public onPlaybackSuppressionReasonChanged(playbackSuppressionReason: number): void;
          /** @deprecated */
          public onPlayerStateChanged(playWhenReady: boolean, playbackState: number): void;
          public onSurfaceSizeChanged(width: number, height: number): void;
          public onRenderedFirstFrame(): void;
          public onPositionDiscontinuity(oldPosition: androidx.media3.common.Player.PositionInfo, newPosition: androidx.media3.common.Player.PositionInfo, reason: number): void;
          public onDeviceVolumeChanged(volume: number, muted: boolean): void;
          public onPlayerErrorChanged(error: androidx.media3.common.PlaybackException): void;
          public onVolumeChanged(volume: number): void;
          public onAvailableCommandsChanged(availableCommands: androidx.media3.common.Player.Commands): void;
          public onMediaItemTransition(mediaItem: androidx.media3.common.MediaItem, reason: number): void;
          /** @deprecated */
          public onLoadingChanged(isLoading: boolean): void;
          public onMetadata(metadata: androidx.media3.common.Metadata): void;
          public onRepeatModeChanged(repeatMode: number): void;
          public onVideoSizeChanged(videoSize: androidx.media3.common.VideoSize): void;
          public onTracksChanged(tracks: androidx.media3.common.Tracks): void;
          public onPlayerError(error: androidx.media3.common.PlaybackException): void;
          public onIsPlayingChanged(isPlaying: boolean): void;
          public onAudioAttributesChanged(audioAttributes: androidx.media3.common.AudioAttributes): void;
          public onEvents(player: androidx.media3.common.Player, events: androidx.media3.common.Player.Events): void;
          public onSeekBackIncrementChanged(seekBackIncrementMs: number): void;
          /** @deprecated */
          public onPositionDiscontinuity(reason: number): void;
          public onMaxSeekToPreviousPositionChanged(maxSeekToPreviousPositionMs: number): void;
          public onPlayWhenReadyChanged(playWhenReady: boolean, reason: number): void;
          public onShuffleModeEnabledChanged(shuffleModeEnabled: boolean): void;
          public onSeekForwardIncrementChanged(seekForwardIncrementMs: number): void;
          public onTrackSelectionParametersChanged(parameters: androidx.media3.common.TrackSelectionParameters): void;
          public onAudioSessionIdChanged(audioSessionId: number): void;
          public onMediaMetadataChanged(mediaMetadata: androidx.media3.common.MediaMetadata): void;
          public onSkipSilenceEnabledChanged(skipSilenceEnabled: boolean): void;
          public onCues(cueGroup: androidx.media3.common.text.CueGroup): void;
          /** @deprecated */
          public onCues(cues: java.util.List<androidx.media3.common.text.Cue>): void;
          public onIsLoadingChanged(isLoading: boolean): void;
          public onPlaylistMetadataChanged(mediaMetadata: androidx.media3.common.MediaMetadata): void;
          public onPlaybackParametersChanged(playbackParameters: androidx.media3.common.PlaybackParameters): void;
          public onPlaybackStateChanged(playbackState: number): void;
          public onDeviceInfoChanged(deviceInfo: androidx.media3.common.DeviceInfo): void;
        }
        export class MediaItemTransitionReason {
          public static class: java.lang.Class<androidx.media3.common.Player.MediaItemTransitionReason>;
          /**
           * Constructs a new instance of the androidx.media3.common.Player$MediaItemTransitionReason interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class PlayWhenReadyChangeReason {
          public static class: java.lang.Class<androidx.media3.common.Player.PlayWhenReadyChangeReason>;
          /**
           * Constructs a new instance of the androidx.media3.common.Player$PlayWhenReadyChangeReason interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class PlaybackSuppressionReason {
          public static class: java.lang.Class<androidx.media3.common.Player.PlaybackSuppressionReason>;
          /**
           * Constructs a new instance of the androidx.media3.common.Player$PlaybackSuppressionReason interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class PositionInfo extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.Player.PositionInfo>;
          public windowUid: any;
          public windowIndex: number;
          public mediaItemIndex: number;
          public mediaItem: androidx.media3.common.MediaItem;
          public periodUid: any;
          public periodIndex: number;
          public positionMs: number;
          public contentPositionMs: number;
          public adGroupIndex: number;
          public adIndexInAdGroup: number;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.Player.PositionInfo>;
          public constructor(
            windowUid: any,
            mediaItemIndex: number,
            mediaItem: androidx.media3.common.MediaItem,
            periodUid: any,
            periodIndex: number,
            positionMs: number,
            contentPositionMs: number,
            adGroupIndex: number,
            adIndexInAdGroup: number
          );
          /** @deprecated */
          public constructor(
            windowUid: any,
            mediaItemIndex: number,
            periodUid: any,
            periodIndex: number,
            positionMs: number,
            contentPositionMs: number,
            adGroupIndex: number,
            adIndexInAdGroup: number
          );
          public equalsForBundling(other: androidx.media3.common.Player.PositionInfo): boolean;
          public filterByAvailableCommands(canAccessCurrentMediaItem: boolean, canAccessTimeline: boolean): androidx.media3.common.Player.PositionInfo;
          public toBundle(controllerInterfaceVersion: number): globalAndroid.os.Bundle;
          public toBundle(): globalAndroid.os.Bundle;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Player.PositionInfo;
          public equals(o: any): boolean;
          public hashCode(): number;
        }
        export class RepeatMode {
          public static class: java.lang.Class<androidx.media3.common.Player.RepeatMode>;
          /**
           * Constructs a new instance of the androidx.media3.common.Player$RepeatMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class State {
          public static class: java.lang.Class<androidx.media3.common.Player.State>;
          /**
           * Constructs a new instance of the androidx.media3.common.Player$State interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class TimelineChangeReason {
          public static class: java.lang.Class<androidx.media3.common.Player.TimelineChangeReason>;
          /**
           * Constructs a new instance of the androidx.media3.common.Player$TimelineChangeReason interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class PreviewingVideoGraph extends androidx.media3.common.VideoGraph {
        public static class: java.lang.Class<androidx.media3.common.PreviewingVideoGraph>;
        /**
         * Constructs a new instance of the androidx.media3.common.PreviewingVideoGraph interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          renderOutputFrame(param0: number): void;
          initialize(): void;
          registerInput(): number;
          getProcessor(param0: number): androidx.media3.common.VideoFrameProcessor;
          setOutputSurfaceInfo(param0: androidx.media3.common.SurfaceInfo): void;
          hasProducedFrameWithTimestampZero(): boolean;
          release(): void;
        });
        public constructor();
        public hasProducedFrameWithTimestampZero(): boolean;
        public registerInput(): number;
        public setOutputSurfaceInfo(param0: androidx.media3.common.SurfaceInfo): void;
        public release(): void;
        public initialize(): void;
        public renderOutputFrame(param0: number): void;
        public getProcessor(param0: number): androidx.media3.common.VideoFrameProcessor;
      }
      export module PreviewingVideoGraph {
        export class Factory {
          public static class: java.lang.Class<androidx.media3.common.PreviewingVideoGraph.Factory>;
          /**
           * Constructs a new instance of the androidx.media3.common.PreviewingVideoGraph$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            create(
              param0: globalAndroid.content.Context,
              param1: androidx.media3.common.ColorInfo,
              param2: androidx.media3.common.ColorInfo,
              param3: androidx.media3.common.DebugViewProvider,
              param4: androidx.media3.common.VideoGraph.Listener,
              param5: java.util.concurrent.Executor,
              param6: java.util.List<androidx.media3.common.Effect>,
              param7: number
            ): androidx.media3.common.PreviewingVideoGraph;
          });
          public constructor();
          public create(
            param0: globalAndroid.content.Context,
            param1: androidx.media3.common.ColorInfo,
            param2: androidx.media3.common.ColorInfo,
            param3: androidx.media3.common.DebugViewProvider,
            param4: androidx.media3.common.VideoGraph.Listener,
            param5: java.util.concurrent.Executor,
            param6: java.util.List<androidx.media3.common.Effect>,
            param7: number
          ): androidx.media3.common.PreviewingVideoGraph;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class PriorityTaskManager {
        public static class: java.lang.Class<androidx.media3.common.PriorityTaskManager>;
        public add(priority: number): void;
        public proceedOrThrow(priority: number): void;
        public remove(priority: number): void;
        public proceed(priority: number): void;
        public constructor();
        public proceedNonBlocking(priority: number): boolean;
      }
      export module PriorityTaskManager {
        export class PriorityTooLowException {
          public static class: java.lang.Class<androidx.media3.common.PriorityTaskManager.PriorityTooLowException>;
          public constructor(priority: number, highestPriority: number);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export abstract class Rating extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.Rating>;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.Rating>;
        public toBundle(): globalAndroid.os.Bundle;
        public isRated(): boolean;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Rating;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export abstract class SimpleBasePlayer extends androidx.media3.common.BasePlayer {
        public static class: java.lang.Class<androidx.media3.common.SimpleBasePlayer>;
        public handleDecreaseDeviceVolume(flags: number): com.google.common.util.concurrent.ListenableFuture<any>;
        public getSurfaceSize(): androidx.media3.common.util.Size;
        public getMediaMetadata(): androidx.media3.common.MediaMetadata;
        public isCommandAvailable(param0: number): boolean;
        public setPlayWhenReady(param0: boolean): void;
        public getDeviceInfo(): androidx.media3.common.DeviceInfo;
        public getVideoSize(): androidx.media3.common.VideoSize;
        public setVideoSurfaceView(surfaceView: globalAndroid.view.SurfaceView): void;
        /** @deprecated */
        public setDeviceMuted(param0: boolean): void;
        public moveMediaItem(param0: number, param1: number): void;
        public setVideoSurface(param0: globalAndroid.view.Surface): void;
        public getApplicationLooper(): globalAndroid.os.Looper;
        public getAudioAttributes(): androidx.media3.common.AudioAttributes;
        public handleReplaceMediaItems(fromIndex: number, toIndex: number, mediaItems: java.util.List<androidx.media3.common.MediaItem>): com.google.common.util.concurrent.ListenableFuture<any>;
        public setMediaItems(mediaItems: java.util.List<androidx.media3.common.MediaItem>, resetPosition: boolean): void;
        public clearVideoSurface(surface: globalAndroid.view.Surface): void;
        public getAvailableCommands(): androidx.media3.common.Player.Commands;
        public handleSetPlaybackParameters(playbackParameters: androidx.media3.common.PlaybackParameters): com.google.common.util.concurrent.ListenableFuture<any>;
        public handleSetVideoOutput(videoOutput: any): com.google.common.util.concurrent.ListenableFuture<any>;
        public setMediaItem(param0: androidx.media3.common.MediaItem, param1: boolean): void;
        /** @deprecated */
        public getNextWindowIndex(): number;
        public getContentDuration(): number;
        public getCurrentPosition(): number;
        public seekToNext(): void;
        public getCurrentPeriodIndex(): number;
        public moveMediaItems(fromIndex: number, toIndex: number, newIndex: number): void;
        public getShuffleModeEnabled(): boolean;
        public setPlayWhenReady(playWhenReady: boolean): void;
        public getTrackSelectionParameters(): androidx.media3.common.TrackSelectionParameters;
        public replaceMediaItem(param0: number, param1: androidx.media3.common.MediaItem): void;
        public getDuration(): number;
        public getState(): androidx.media3.common.SimpleBasePlayer.State;
        public seekTo(mediaItemIndex: number, positionMs: number, seekCommand: number, isRepeatingCurrentItem: boolean): void;
        public handleSetTrackSelectionParameters(trackSelectionParameters: androidx.media3.common.TrackSelectionParameters): com.google.common.util.concurrent.ListenableFuture<any>;
        public increaseDeviceVolume(param0: number): void;
        public isLoading(): boolean;
        /** @deprecated */
        public hasPrevious(): boolean;
        public getSeekForwardIncrement(): number;
        public getBufferedPosition(): number;
        public handleIncreaseDeviceVolume(flags: number): com.google.common.util.concurrent.ListenableFuture<any>;
        public setShuffleModeEnabled(shuffleModeEnabled: boolean): void;
        public addMediaItems(param0: number, param1: java.util.List<androidx.media3.common.MediaItem>): void;
        public handleSetAudioAttributes(audioAttributes: androidx.media3.common.AudioAttributes, handleAudioFocus: boolean): com.google.common.util.concurrent.ListenableFuture<any>;
        public getPlaybackParameters(): androidx.media3.common.PlaybackParameters;
        public hasPreviousMediaItem(): boolean;
        public moveMediaItems(param0: number, param1: number, param2: number): void;
        public isPlaying(): boolean;
        public getContentPosition(): number;
        public constructor(applicationLooper: globalAndroid.os.Looper);
        public getCurrentTracks(): androidx.media3.common.Tracks;
        public handleSetDeviceMuted(muted: boolean, flags: number): com.google.common.util.concurrent.ListenableFuture<any>;
        public getPlaceholderMediaItemData(mediaItem: androidx.media3.common.MediaItem): androidx.media3.common.SimpleBasePlayer.MediaItemData;
        public getCurrentTimeline(): androidx.media3.common.Timeline;
        public clearMediaItems(): void;
        /** @deprecated */
        public getCurrentWindowIndex(): number;
        public getCurrentMediaItem(): androidx.media3.common.MediaItem;
        public clearVideoSurfaceHolder(param0: globalAndroid.view.SurfaceHolder): void;
        public setDeviceMuted(muted: boolean, flags: number): void;
        public isCurrentMediaItemDynamic(): boolean;
        public setMediaItem(mediaItem: androidx.media3.common.MediaItem, resetPosition: boolean): void;
        public getMediaItemAt(param0: number): androidx.media3.common.MediaItem;
        public constructor(applicationLooper: globalAndroid.os.Looper, clock: androidx.media3.common.util.Clock);
        public seekToDefaultPosition(): void;
        public addMediaItems(mediaItems: java.util.List<androidx.media3.common.MediaItem>): void;
        public setVideoSurfaceHolder(param0: globalAndroid.view.SurfaceHolder): void;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>, param1: boolean): void;
        public addMediaItem(param0: androidx.media3.common.MediaItem): void;
        public setTrackSelectionParameters(param0: androidx.media3.common.TrackSelectionParameters): void;
        /** @deprecated */
        public isCurrentWindowDynamic(): boolean;
        public setPlaybackParameters(playbackParameters: androidx.media3.common.PlaybackParameters): void;
        /** @deprecated */
        public isCurrentWindowLive(): boolean;
        public handlePrepare(): com.google.common.util.concurrent.ListenableFuture<any>;
        public setMediaItem(param0: androidx.media3.common.MediaItem): void;
        public canAdvertiseSession(): boolean;
        public setRepeatMode(param0: number): void;
        /** @deprecated */
        public setDeviceMuted(muted: boolean): void;
        public setVideoSurface(surface: globalAndroid.view.Surface): void;
        public decreaseDeviceVolume(flags: number): void;
        public getSeekBackIncrement(): number;
        public setVideoTextureView(param0: globalAndroid.view.TextureView): void;
        public setDeviceVolume(volume: number, flags: number): void;
        public isPlayingAd(): boolean;
        /** @deprecated */
        public previous(): void;
        /** @deprecated */
        public hasPreviousWindow(): boolean;
        public getPreviousMediaItemIndex(): number;
        public handleRelease(): com.google.common.util.concurrent.ListenableFuture<any>;
        public setAudioAttributes(param0: androidx.media3.common.AudioAttributes, param1: boolean): void;
        public setVideoSurfaceView(param0: globalAndroid.view.SurfaceView): void;
        public seekToDefaultPosition(param0: number): void;
        public invalidateState(): void;
        public getMaxSeekToPreviousPosition(): number;
        public hasNextMediaItem(): boolean;
        public addMediaItem(param0: number, param1: androidx.media3.common.MediaItem): void;
        /** @deprecated */
        public decreaseDeviceVolume(): void;
        public setMediaItem(param0: androidx.media3.common.MediaItem, param1: number): void;
        public seekBack(): void;
        public getCurrentManifest(): any;
        public getContentBufferedPosition(): number;
        public setDeviceMuted(param0: boolean, param1: number): void;
        public setMediaItems(mediaItems: java.util.List<androidx.media3.common.MediaItem>, startIndex: number, startPositionMs: number): void;
        public setPlaylistMetadata(mediaMetadata: androidx.media3.common.MediaMetadata): void;
        public isDeviceMuted(): boolean;
        public getCurrentLiveOffset(): number;
        public addMediaItem(index: number, mediaItem: androidx.media3.common.MediaItem): void;
        /** @deprecated */
        public next(): void;
        public prepare(): void;
        public addListener(param0: androidx.media3.common.Player.Listener): void;
        public seekTo(param0: number, param1: number): void;
        public getBufferedPercentage(): number;
        public getNextMediaItemIndex(): number;
        /** @deprecated */
        public seekToPreviousWindow(): void;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>, param1: number, param2: number): void;
        public clearVideoSurfaceView(param0: globalAndroid.view.SurfaceView): void;
        /** @deprecated */
        public setDeviceVolume(param0: number): void;
        public setVolume(volume: number): void;
        /** @deprecated */
        public getPreviousWindowIndex(): number;
        public setMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>): void;
        /** @deprecated */
        public seekToNextWindow(): void;
        /** @deprecated */
        public setDeviceVolume(volume: number): void;
        /** @deprecated */
        public increaseDeviceVolume(): void;
        public getCurrentMediaItemIndex(): number;
        public handleSetRepeatMode(repeatMode: number): com.google.common.util.concurrent.ListenableFuture<any>;
        public clearVideoTextureView(textureView: globalAndroid.view.TextureView): void;
        public seekTo(mediaItemIndex: number, positionMs: number): void;
        public seekToDefaultPosition(mediaItemIndex: number): void;
        /** @deprecated */
        public hasNext(): boolean;
        public seekTo(positionMs: number): void;
        public seekToPreviousMediaItem(): void;
        public handleSetDeviceVolume(deviceVolume: number, flags: number): com.google.common.util.concurrent.ListenableFuture<any>;
        public removeListener(param0: androidx.media3.common.Player.Listener): void;
        public seekToPrevious(): void;
        public handleMoveMediaItems(fromIndex: number, toIndex: number, newIndex: number): com.google.common.util.concurrent.ListenableFuture<any>;
        public setMediaItem(mediaItem: androidx.media3.common.MediaItem, startPositionMs: number): void;
        public getCurrentAdIndexInAdGroup(): number;
        public getMediaItemCount(): number;
        public release(): void;
        public getPlaybackSuppressionReason(): number;
        public clearVideoSurface(param0: globalAndroid.view.Surface): void;
        public handleSetShuffleModeEnabled(shuffleModeEnabled: boolean): com.google.common.util.concurrent.ListenableFuture<any>;
        /** @deprecated */
        public hasNextWindow(): boolean;
        public getPlayerError(): androidx.media3.common.PlaybackException;
        public clearVideoSurfaceHolder(surfaceHolder: globalAndroid.view.SurfaceHolder): void;
        public getPlaceholderState(suggestedPlaceholderState: androidx.media3.common.SimpleBasePlayer.State): androidx.media3.common.SimpleBasePlayer.State;
        public handleSeek(mediaItemIndex: number, positionMs: number, seekCommand: number): com.google.common.util.concurrent.ListenableFuture<any>;
        public handleSetPlaylistMetadata(playlistMetadata: androidx.media3.common.MediaMetadata): com.google.common.util.concurrent.ListenableFuture<any>;
        public replaceMediaItems(fromIndex: number, toIndex: number, mediaItems: java.util.List<androidx.media3.common.MediaItem>): void;
        public increaseDeviceVolume(flags: number): void;
        public handleClearVideoOutput(videoOutput: any): com.google.common.util.concurrent.ListenableFuture<any>;
        public getPlaybackState(): number;
        public verifyApplicationThread(): void;
        public setDeviceVolume(param0: number, param1: number): void;
        public getCurrentCues(): androidx.media3.common.text.CueGroup;
        public isCurrentMediaItemLive(): boolean;
        public getCurrentAdGroupIndex(): number;
        public removeMediaItem(param0: number): void;
        public constructor();
        public handleSetPlayWhenReady(playWhenReady: boolean): com.google.common.util.concurrent.ListenableFuture<any>;
        public setAudioAttributes(audioAttributes: androidx.media3.common.AudioAttributes, handleAudioFocus: boolean): void;
        public handleStop(): com.google.common.util.concurrent.ListenableFuture<any>;
        public setPlaybackParameters(param0: androidx.media3.common.PlaybackParameters): void;
        public setVolume(param0: number): void;
        public isCurrentMediaItemSeekable(): boolean;
        public setTrackSelectionParameters(parameters: androidx.media3.common.TrackSelectionParameters): void;
        public getDeviceVolume(): number;
        public replaceMediaItems(param0: number, param1: number, param2: java.util.List<androidx.media3.common.MediaItem>): void;
        public setMediaItems(mediaItems: java.util.List<androidx.media3.common.MediaItem>): void;
        public seekTo(param0: number): void;
        public handleRemoveMediaItems(fromIndex: number, toIndex: number): com.google.common.util.concurrent.ListenableFuture<any>;
        public removeMediaItems(param0: number, param1: number): void;
        public getPlaylistMetadata(): androidx.media3.common.MediaMetadata;
        public clearVideoTextureView(param0: globalAndroid.view.TextureView): void;
        public addListener(listener: androidx.media3.common.Player.Listener): void;
        public getVolume(): number;
        public handleSetMediaItems(mediaItems: java.util.List<androidx.media3.common.MediaItem>, startIndex: number, startPositionMs: number): com.google.common.util.concurrent.ListenableFuture<any>;
        public addMediaItems(param0: java.util.List<androidx.media3.common.MediaItem>): void;
        public removeMediaItems(fromIndex: number, toIndex: number): void;
        public getPlayWhenReady(): boolean;
        public addMediaItems(index: number, mediaItems: java.util.List<androidx.media3.common.MediaItem>): void;
        public seekToNextMediaItem(): void;
        public handleAddMediaItems(index: number, mediaItems: java.util.List<androidx.media3.common.MediaItem>): com.google.common.util.concurrent.ListenableFuture<any>;
        public clearVideoSurface(): void;
        public decreaseDeviceVolume(param0: number): void;
        public clearVideoSurfaceView(surfaceView: globalAndroid.view.SurfaceView): void;
        public setPlaybackSpeed(param0: number): void;
        public handleSetVolume(volume: number): com.google.common.util.concurrent.ListenableFuture<any>;
        public setRepeatMode(repeatMode: number): void;
        public play(): void;
        public pause(): void;
        public seekForward(): void;
        public getRepeatMode(): number;
        public setVideoSurfaceHolder(surfaceHolder: globalAndroid.view.SurfaceHolder): void;
        public setPlaylistMetadata(param0: androidx.media3.common.MediaMetadata): void;
        public setVideoTextureView(this_: globalAndroid.view.TextureView): void;
        public stop(): void;
        public setShuffleModeEnabled(param0: boolean): void;
        public getTotalBufferedDuration(): number;
        public removeListener(listener: androidx.media3.common.Player.Listener): void;
        /** @deprecated */
        public isCurrentWindowSeekable(): boolean;
      }
      export module SimpleBasePlayer {
        export class MediaItemData {
          public static class: java.lang.Class<androidx.media3.common.SimpleBasePlayer.MediaItemData>;
          public uid: any;
          public tracks: androidx.media3.common.Tracks;
          public mediaItem: androidx.media3.common.MediaItem;
          public mediaMetadata: androidx.media3.common.MediaMetadata;
          public manifest: any;
          public liveConfiguration: androidx.media3.common.MediaItem.LiveConfiguration;
          public presentationStartTimeMs: number;
          public windowStartTimeMs: number;
          public elapsedRealtimeEpochOffsetMs: number;
          public isSeekable: boolean;
          public isDynamic: boolean;
          public defaultPositionUs: number;
          public durationUs: number;
          public positionInFirstPeriodUs: number;
          public isPlaceholder: boolean;
          public periods: com.google.common.collect.ImmutableList<androidx.media3.common.SimpleBasePlayer.PeriodData>;
          public buildUpon(): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
          public equals(o: any): boolean;
          public hashCode(): number;
        }
        export module MediaItemData {
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder>;
            public setDurationUs(durationUs: number): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setWindowStartTimeMs(windowStartTimeMs: number): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setElapsedRealtimeEpochOffsetMs(elapsedRealtimeEpochOffsetMs: number): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public constructor(uid: any);
            public setManifest(manifest: any): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setIsDynamic(isDynamic: boolean): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setMediaMetadata(mediaMetadata: androidx.media3.common.MediaMetadata): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setMediaItem(mediaItem: androidx.media3.common.MediaItem): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setDefaultPositionUs(defaultPositionUs: number): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public build(): androidx.media3.common.SimpleBasePlayer.MediaItemData;
            public setIsSeekable(isSeekable: boolean): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setUid(uid: any): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setTracks(tracks: androidx.media3.common.Tracks): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setPositionInFirstPeriodUs(positionInFirstPeriodUs: number): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setLiveConfiguration(liveConfiguration: androidx.media3.common.MediaItem.LiveConfiguration): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setPresentationStartTimeMs(presentationStartTimeMs: number): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setPeriods(i: java.util.List<androidx.media3.common.SimpleBasePlayer.PeriodData>): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
            public setIsPlaceholder(isPlaceholder: boolean): androidx.media3.common.SimpleBasePlayer.MediaItemData.Builder;
          }
        }
        export class PeriodData {
          public static class: java.lang.Class<androidx.media3.common.SimpleBasePlayer.PeriodData>;
          public uid: any;
          public durationUs: number;
          public adPlaybackState: androidx.media3.common.AdPlaybackState;
          public isPlaceholder: boolean;
          public buildUpon(): androidx.media3.common.SimpleBasePlayer.PeriodData.Builder;
          public equals(o: any): boolean;
          public hashCode(): number;
        }
        export module PeriodData {
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.SimpleBasePlayer.PeriodData.Builder>;
            public build(): androidx.media3.common.SimpleBasePlayer.PeriodData;
            public setIsPlaceholder(isPlaceholder: boolean): androidx.media3.common.SimpleBasePlayer.PeriodData.Builder;
            public constructor(uid: any);
            public setDurationUs(durationUs: number): androidx.media3.common.SimpleBasePlayer.PeriodData.Builder;
            public setAdPlaybackState(adPlaybackState: androidx.media3.common.AdPlaybackState): androidx.media3.common.SimpleBasePlayer.PeriodData.Builder;
            public setUid(uid: any): androidx.media3.common.SimpleBasePlayer.PeriodData.Builder;
          }
        }
        export class PlaceholderUid {
          public static class: java.lang.Class<androidx.media3.common.SimpleBasePlayer.PlaceholderUid>;
        }
        export class PlaylistTimeline extends androidx.media3.common.Timeline {
          public static class: java.lang.Class<androidx.media3.common.SimpleBasePlayer.PlaylistTimeline>;
          public getPeriod(periodIndex: number, period: androidx.media3.common.Timeline.Period, setIds: boolean): androidx.media3.common.Timeline.Period;
          public getLastWindowIndex(shuffleModeEnabled: boolean): number;
          public getWindow(windowIndex: number, window: androidx.media3.common.Timeline.Window): androidx.media3.common.Timeline.Window;
          public getPreviousWindowIndex(windowIndex: number, repeatMode: number, shuffleModeEnabled: boolean): number;
          public toBundle(): globalAndroid.os.Bundle;
          public getFirstWindowIndex(shuffleModeEnabled: boolean): number;
          public getIndexOfPeriod(uid: any): number;
          public constructor(i: com.google.common.collect.ImmutableList<androidx.media3.common.SimpleBasePlayer.MediaItemData>);
          public getNextWindowIndex(windowIndex: number, repeatMode: number, shuffleModeEnabled: boolean): number;
          public getWindowCount(): number;
          public getWindow(windowIndex: number, window: androidx.media3.common.Timeline.Window, defaultPositionProjectionUs: number): androidx.media3.common.Timeline.Window;
          public getPeriod(periodIndex: number, period: androidx.media3.common.Timeline.Period): androidx.media3.common.Timeline.Period;
          public constructor();
          public getPeriodByUid(periodUid: any, period: androidx.media3.common.Timeline.Period): androidx.media3.common.Timeline.Period;
          public getUidOfPeriod(periodIndex: number): any;
          public getPeriodCount(): number;
        }
        export class PositionSupplier {
          public static class: java.lang.Class<androidx.media3.common.SimpleBasePlayer.PositionSupplier>;
          /**
           * Constructs a new instance of the androidx.media3.common.SimpleBasePlayer$PositionSupplier interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            getConstant(positionMs: number): androidx.media3.common.SimpleBasePlayer.PositionSupplier;
            getExtrapolating(currentPositionMs: number, playbackSpeed: number): androidx.media3.common.SimpleBasePlayer.PositionSupplier;
            get(): number;
            lambda$getExtrapolating$1(currentPositionMs: number, startTimeMs: number, playbackSpeed: number): number;
            lambda$getConstant$0(positionMs: number): number;
            '<clinit>'(): void;
          });
          public constructor();
          public static ZERO: androidx.media3.common.SimpleBasePlayer.PositionSupplier;
          public get(): number;
          public static getExtrapolating(currentPositionMs: number, playbackSpeed: number): androidx.media3.common.SimpleBasePlayer.PositionSupplier;
          public static getConstant(positionMs: number): androidx.media3.common.SimpleBasePlayer.PositionSupplier;
        }
        export class State {
          public static class: java.lang.Class<androidx.media3.common.SimpleBasePlayer.State>;
          public availableCommands: androidx.media3.common.Player.Commands;
          public playWhenReady: boolean;
          public playWhenReadyChangeReason: number;
          public playbackState: number;
          public playbackSuppressionReason: number;
          public playerError: androidx.media3.common.PlaybackException;
          public repeatMode: number;
          public shuffleModeEnabled: boolean;
          public isLoading: boolean;
          public seekBackIncrementMs: number;
          public seekForwardIncrementMs: number;
          public maxSeekToPreviousPositionMs: number;
          public playbackParameters: androidx.media3.common.PlaybackParameters;
          public trackSelectionParameters: androidx.media3.common.TrackSelectionParameters;
          public audioAttributes: androidx.media3.common.AudioAttributes;
          public volume: number;
          public videoSize: androidx.media3.common.VideoSize;
          public currentCues: androidx.media3.common.text.CueGroup;
          public deviceInfo: androidx.media3.common.DeviceInfo;
          public deviceVolume: number;
          public isDeviceMuted: boolean;
          public surfaceSize: androidx.media3.common.util.Size;
          public newlyRenderedFirstFrame: boolean;
          public timedMetadata: androidx.media3.common.Metadata;
          public playlist: com.google.common.collect.ImmutableList<androidx.media3.common.SimpleBasePlayer.MediaItemData>;
          public timeline: androidx.media3.common.Timeline;
          public playlistMetadata: androidx.media3.common.MediaMetadata;
          public currentMediaItemIndex: number;
          public currentAdGroupIndex: number;
          public currentAdIndexInAdGroup: number;
          public contentPositionMsSupplier: androidx.media3.common.SimpleBasePlayer.PositionSupplier;
          public adPositionMsSupplier: androidx.media3.common.SimpleBasePlayer.PositionSupplier;
          public contentBufferedPositionMsSupplier: androidx.media3.common.SimpleBasePlayer.PositionSupplier;
          public adBufferedPositionMsSupplier: androidx.media3.common.SimpleBasePlayer.PositionSupplier;
          public totalBufferedDurationMsSupplier: androidx.media3.common.SimpleBasePlayer.PositionSupplier;
          public hasPositionDiscontinuity: boolean;
          public positionDiscontinuityReason: number;
          public discontinuityPositionMs: number;
          public equals(o: any): boolean;
          public hashCode(): number;
          public buildUpon(): androidx.media3.common.SimpleBasePlayer.State.Builder;
        }
        export module State {
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.SimpleBasePlayer.State.Builder>;
            public setCurrentAd(adGroupIndex: number, adIndexInAdGroup: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setAvailableCommands(availableCommands: androidx.media3.common.Player.Commands): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setContentPositionMs(contentPositionMsSupplier: androidx.media3.common.SimpleBasePlayer.PositionSupplier): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setAdPositionMs(positionMs: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public clearPositionDiscontinuity(): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setRepeatMode(repeatMode: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setAdBufferedPositionMs(adBufferedPositionMsSupplier: androidx.media3.common.SimpleBasePlayer.PositionSupplier): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setContentPositionMs(positionMs: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setIsLoading(isLoading: boolean): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setSeekBackIncrementMs(seekBackIncrementMs: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setPlaybackParameters(playbackParameters: androidx.media3.common.PlaybackParameters): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setCurrentMediaItemIndex(currentMediaItemIndex: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setVideoSize(videoSize: androidx.media3.common.VideoSize): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setPlaylistMetadata(playlistMetadata: androidx.media3.common.MediaMetadata): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setPlaybackState(playbackState: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setTotalBufferedDurationMs(totalBufferedDurationMsSupplier: androidx.media3.common.SimpleBasePlayer.PositionSupplier): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setAudioAttributes(audioAttributes: androidx.media3.common.AudioAttributes): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setCurrentCues(currentCues: androidx.media3.common.text.CueGroup): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setPositionDiscontinuity(positionDiscontinuityReason: number, discontinuityPositionMs: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public build(): androidx.media3.common.SimpleBasePlayer.State;
            public setIsDeviceMuted(isDeviceMuted: boolean): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setPlayWhenReady(playWhenReady: boolean, playWhenReadyChangeReason: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public constructor();
            public setDeviceInfo(deviceInfo: androidx.media3.common.DeviceInfo): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setTrackSelectionParameters(trackSelectionParameters: androidx.media3.common.TrackSelectionParameters): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setTimedMetadata(timedMetadata: androidx.media3.common.Metadata): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setPlayerError(playerError: androidx.media3.common.PlaybackException): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setPlaybackSuppressionReason(playbackSuppressionReason: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setShuffleModeEnabled(shuffleModeEnabled: boolean): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setDeviceVolume(deviceVolume: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setSeekForwardIncrementMs(seekForwardIncrementMs: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setNewlyRenderedFirstFrame(newlyRenderedFirstFrame: boolean): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setMaxSeekToPreviousPositionMs(maxSeekToPreviousPositionMs: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setVolume(volume: number): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setContentBufferedPositionMs(contentBufferedPositionMsSupplier: androidx.media3.common.SimpleBasePlayer.PositionSupplier): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setSurfaceSize(surfaceSize: androidx.media3.common.util.Size): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setAdPositionMs(adPositionMsSupplier: androidx.media3.common.SimpleBasePlayer.PositionSupplier): androidx.media3.common.SimpleBasePlayer.State.Builder;
            public setPlaylist(this_: java.util.List<androidx.media3.common.SimpleBasePlayer.MediaItemData>): androidx.media3.common.SimpleBasePlayer.State.Builder;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class StarRating extends androidx.media3.common.Rating {
        public static class: java.lang.Class<androidx.media3.common.StarRating>;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.StarRating>;
        public getStarRating(): number;
        public equals(obj: any): boolean;
        public constructor(maxStars: number, starRating: number);
        public getMaxStars(): number;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public isRated(): boolean;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.StarRating;
        public constructor(maxStars: number);
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Rating;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class StreamKey extends java.lang.Object {
        public static class: java.lang.Class<androidx.media3.common.StreamKey>;
        public periodIndex: number;
        public groupIndex: number;
        public streamIndex: number;
        public static CREATOR: globalAndroid.os.Parcelable.Creator<androidx.media3.common.StreamKey>;
        public constructor(groupIndex: number, streamIndex: number);
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.StreamKey;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public describeContents(): number;
        public equals(o: any): boolean;
        public writeToParcel(dest: globalAndroid.os.Parcel, flags: number): void;
        public compareTo(o: androidx.media3.common.StreamKey): number;
        public constructor(periodIndex: number, groupIndex: number, streamIndex: number);
        public toString(): string;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class SurfaceInfo {
        public static class: java.lang.Class<androidx.media3.common.SurfaceInfo>;
        public surface: globalAndroid.view.Surface;
        public width: number;
        public height: number;
        public orientationDegrees: number;
        public constructor(surface: globalAndroid.view.Surface, width: number, height: number);
        public constructor(surface: globalAndroid.view.Surface, width: number, height: number, orientationDegrees: number);
        public hashCode(): number;
        public equals(o: any): boolean;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class ThumbRating extends androidx.media3.common.Rating {
        public static class: java.lang.Class<androidx.media3.common.ThumbRating>;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.ThumbRating>;
        public constructor(isThumbsUp: boolean);
        public isThumbsUp(): boolean;
        public equals(obj: any): boolean;
        public hashCode(): number;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.ThumbRating;
        public toBundle(): globalAndroid.os.Bundle;
        public isRated(): boolean;
        public constructor();
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Rating;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export abstract class Timeline extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.Timeline>;
        public static EMPTY: androidx.media3.common.Timeline;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.Timeline>;
        public getIndexOfPeriod(param0: any): number;
        public getUidOfPeriod(param0: number): any;
        public getPeriodPositionUs(
          window: androidx.media3.common.Timeline.Window,
          period: androidx.media3.common.Timeline.Period,
          windowIndex: number,
          windowPositionUs: number,
          defaultPositionProjectionUs: number
        ): globalAndroid.util.Pair<any, java.lang.Long>;
        public getNextPeriodIndex(this_: number, periodIndex: androidx.media3.common.Timeline.Period, period: androidx.media3.common.Timeline.Window, window: number, repeatMode: boolean): number;
        public getPeriodPositionUs(
          window: androidx.media3.common.Timeline.Window,
          period: androidx.media3.common.Timeline.Period,
          windowIndex: number,
          windowPositionUs: number
        ): globalAndroid.util.Pair<any, java.lang.Long>;
        public getLastWindowIndex(shuffleModeEnabled: boolean): number;
        public copyWithSingleWindow(i: number): androidx.media3.common.Timeline;
        public getPeriodCount(): number;
        public constructor();
        public equals(i: any): boolean;
        public getWindowCount(): number;
        /** @deprecated */
        public getPeriodPosition(
          window: androidx.media3.common.Timeline.Window,
          period: androidx.media3.common.Timeline.Period,
          windowIndex: number,
          windowPositionUs: number
        ): globalAndroid.util.Pair<any, java.lang.Long>;
        public hashCode(): number;
        public isEmpty(): boolean;
        /** @deprecated */
        public getPeriodPosition(
          window: androidx.media3.common.Timeline.Window,
          period: androidx.media3.common.Timeline.Period,
          windowIndex: number,
          windowPositionUs: number,
          defaultPositionProjectionUs: number
        ): globalAndroid.util.Pair<any, java.lang.Long>;
        public isLastPeriod(
          periodIndex: number,
          period: androidx.media3.common.Timeline.Period,
          window: androidx.media3.common.Timeline.Window,
          repeatMode: number,
          shuffleModeEnabled: boolean
        ): boolean;
        public getPeriod(param0: number, param1: androidx.media3.common.Timeline.Period, param2: boolean): androidx.media3.common.Timeline.Period;
        public getPreviousWindowIndex(windowIndex: number, repeatMode: number, shuffleModeEnabled: boolean): number;
        public toBundle(): globalAndroid.os.Bundle;
        public getPeriodByUid(periodUid: any, period: androidx.media3.common.Timeline.Period): androidx.media3.common.Timeline.Period;
        public getFirstWindowIndex(shuffleModeEnabled: boolean): number;
        public getNextWindowIndex(windowIndex: number, repeatMode: number, shuffleModeEnabled: boolean): number;
        public getWindow(windowIndex: number, window: androidx.media3.common.Timeline.Window): androidx.media3.common.Timeline.Window;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Timeline;
        public getWindow(param0: number, param1: androidx.media3.common.Timeline.Window, param2: number): androidx.media3.common.Timeline.Window;
        public getPeriod(periodIndex: number, period: androidx.media3.common.Timeline.Period): androidx.media3.common.Timeline.Period;
      }
      export module Timeline {
        export class Period extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.Timeline.Period>;
          public id: any;
          public uid: any;
          public windowIndex: number;
          public durationUs: number;
          public positionInWindowUs: number;
          public isPlaceholder: boolean;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.Timeline.Period>;
          public getAdDurationUs(adGroupIndex: number, adIndexInAdGroup: number): number;
          public equals(obj: any): boolean;
          public set(id: any, uid: any, windowIndex: number, durationUs: number, positionInWindowUs: number): androidx.media3.common.Timeline.Period;
          public getAdGroupIndexAfterPositionUs(positionUs: number): number;
          public getAdsId(): any;
          public getPositionInWindowMs(): number;
          public getPositionInWindowUs(): number;
          public isServerSideInsertedAdGroup(adGroupIndex: number): boolean;
          public getAdState(adGroupIndex: number, adIndexInAdGroup: number): number;
          public isLivePostrollPlaceholder(adGroupIndex: number): boolean;
          public constructor();
          public getDurationMs(): number;
          public getContentResumeOffsetUs(adGroupIndex: number): number;
          public hasPlayedAdGroup(adGroupIndex: number): boolean;
          public hashCode(): number;
          public getNextAdIndexToPlay(adGroupIndex: number, lastPlayedAdIndex: number): number;
          public getFirstAdIndexToPlay(adGroupIndex: number): number;
          public getAdGroupIndexForPositionUs(positionUs: number): number;
          public getAdCountInAdGroup(adGroupIndex: number): number;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Timeline.Period;
          public getDurationUs(): number;
          public toBundle(): globalAndroid.os.Bundle;
          public set(
            id: any,
            uid: any,
            windowIndex: number,
            durationUs: number,
            positionInWindowUs: number,
            adPlaybackState: androidx.media3.common.AdPlaybackState,
            isPlaceholder: boolean
          ): androidx.media3.common.Timeline.Period;
          public getRemovedAdGroupCount(): number;
          public getAdGroupCount(): number;
          public getAdGroupTimeUs(adGroupIndex: number): number;
          public getAdResumePositionUs(): number;
        }
        export class RemotableTimeline extends androidx.media3.common.Timeline {
          public static class: java.lang.Class<androidx.media3.common.Timeline.RemotableTimeline>;
          public getPeriod(periodIndex: number, period: androidx.media3.common.Timeline.Period, setIds: boolean): androidx.media3.common.Timeline.Period;
          public getLastWindowIndex(shuffleModeEnabled: boolean): number;
          public getWindow(windowIndex: number, window: androidx.media3.common.Timeline.Window): androidx.media3.common.Timeline.Window;
          public getPreviousWindowIndex(windowIndex: number, repeatMode: number, shuffleModeEnabled: boolean): number;
          public toBundle(): globalAndroid.os.Bundle;
          public getFirstWindowIndex(shuffleModeEnabled: boolean): number;
          public getIndexOfPeriod(uid: any): number;
          public getNextWindowIndex(windowIndex: number, repeatMode: number, shuffleModeEnabled: boolean): number;
          public getWindowCount(): number;
          public getWindow(windowIndex: number, window: androidx.media3.common.Timeline.Window, defaultPositionProjectionUs: number): androidx.media3.common.Timeline.Window;
          public getPeriod(periodIndex: number, period: androidx.media3.common.Timeline.Period): androidx.media3.common.Timeline.Period;
          public constructor();
          public getUidOfPeriod(periodIndex: number): any;
          public constructor(
            this_: com.google.common.collect.ImmutableList<androidx.media3.common.Timeline.Window>,
            windows: com.google.common.collect.ImmutableList<androidx.media3.common.Timeline.Period>,
            periods: androidNative.Array<number>
          );
          public getPeriodCount(): number;
        }
        export class Window extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.Timeline.Window>;
          public static SINGLE_WINDOW_UID: any;
          public uid: any;
          public tag: any;
          public mediaItem: androidx.media3.common.MediaItem;
          public manifest: any;
          public presentationStartTimeMs: number;
          public windowStartTimeMs: number;
          public elapsedRealtimeEpochOffsetMs: number;
          public isSeekable: boolean;
          public isDynamic: boolean;
          public liveConfiguration: androidx.media3.common.MediaItem.LiveConfiguration;
          public isPlaceholder: boolean;
          public defaultPositionUs: number;
          public durationUs: number;
          public firstPeriodIndex: number;
          public lastPeriodIndex: number;
          public positionInFirstPeriodUs: number;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.Timeline.Window>;
          public equals(obj: any): boolean;
          public set(
            uid: any,
            mediaItem: androidx.media3.common.MediaItem,
            manifest: any,
            presentationStartTimeMs: number,
            windowStartTimeMs: number,
            elapsedRealtimeEpochOffsetMs: number,
            isSeekable: boolean,
            isDynamic: boolean,
            liveConfiguration: androidx.media3.common.MediaItem.LiveConfiguration,
            defaultPositionUs: number,
            durationUs: number,
            firstPeriodIndex: number,
            lastPeriodIndex: number,
            positionInFirstPeriodUs: number
          ): androidx.media3.common.Timeline.Window;
          public getDurationUs(): number;
          public isLive(): boolean;
          public toBundle(): globalAndroid.os.Bundle;
          public getPositionInFirstPeriodMs(): number;
          public getPositionInFirstPeriodUs(): number;
          public getCurrentUnixTimeMs(): number;
          public constructor();
          public getDurationMs(): number;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Timeline.Window;
          public hashCode(): number;
          public getDefaultPositionMs(): number;
          public getDefaultPositionUs(): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class TrackGroup extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.TrackGroup>;
        public length: number;
        public id: string;
        public type: number;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.TrackGroup>;
        public getFormat(index: number): androidx.media3.common.Format;
        public equals(obj: any): boolean;
        public copyWithId(id: string): androidx.media3.common.TrackGroup;
        public indexOf(this_: androidx.media3.common.Format): number;
        public constructor(id: string, formats: androidNative.Array<androidx.media3.common.Format>);
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public constructor(formats: androidNative.Array<androidx.media3.common.Format>);
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.TrackGroup;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class TrackSelectionOverride extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.TrackSelectionOverride>;
        public mediaTrackGroup: androidx.media3.common.TrackGroup;
        public trackIndices: com.google.common.collect.ImmutableList<java.lang.Integer>;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.TrackSelectionOverride>;
        public equals(obj: any): boolean;
        public constructor(mediaTrackGroup: androidx.media3.common.TrackGroup, trackIndices: java.util.List<java.lang.Integer>);
        public getType(): number;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public constructor(mediaTrackGroup: androidx.media3.common.TrackGroup, trackIndex: number);
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.TrackSelectionOverride;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class TrackSelectionParameters extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.TrackSelectionParameters>;
        public static DEFAULT_WITHOUT_CONTEXT: androidx.media3.common.TrackSelectionParameters;
        public static DEFAULT: androidx.media3.common.TrackSelectionParameters;
        public maxVideoWidth: number;
        public maxVideoHeight: number;
        public maxVideoFrameRate: number;
        public maxVideoBitrate: number;
        public minVideoWidth: number;
        public minVideoHeight: number;
        public minVideoFrameRate: number;
        public minVideoBitrate: number;
        public viewportWidth: number;
        public viewportHeight: number;
        public viewportOrientationMayChange: boolean;
        public preferredVideoMimeTypes: com.google.common.collect.ImmutableList<string>;
        public preferredVideoRoleFlags: number;
        public preferredAudioLanguages: com.google.common.collect.ImmutableList<string>;
        public preferredAudioRoleFlags: number;
        public maxAudioChannelCount: number;
        public maxAudioBitrate: number;
        public preferredAudioMimeTypes: com.google.common.collect.ImmutableList<string>;
        public audioOffloadPreferences: androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences;
        public preferredTextLanguages: com.google.common.collect.ImmutableList<string>;
        public preferredTextRoleFlags: number;
        public ignoredTextSelectionFlags: number;
        public selectUndeterminedTextLanguage: boolean;
        public isPrioritizeImageOverVideoEnabled: boolean;
        public forceLowestBitrate: boolean;
        public forceHighestSupportedBitrate: boolean;
        public overrides: com.google.common.collect.ImmutableMap<androidx.media3.common.TrackGroup, androidx.media3.common.TrackSelectionOverride>;
        public disabledTrackTypes: com.google.common.collect.ImmutableSet<java.lang.Integer>;
        public static FIELD_CUSTOM_ID_BASE: number = 1000;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.TrackSelectionParameters>;
        public static getDefaults(context: globalAndroid.content.Context): androidx.media3.common.TrackSelectionParameters;
        public constructor(builder: androidx.media3.common.TrackSelectionParameters.Builder);
        public buildUpon(): androidx.media3.common.TrackSelectionParameters.Builder;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.TrackSelectionParameters;
        public equals(obj: any): boolean;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
      }
      export module TrackSelectionParameters {
        export class AudioOffloadPreferences extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences>;
          public static AUDIO_OFFLOAD_MODE_REQUIRED: number = 2;
          public static AUDIO_OFFLOAD_MODE_ENABLED: number = 1;
          public static AUDIO_OFFLOAD_MODE_DISABLED: number = 0;
          public static DEFAULT: androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences;
          public audioOffloadMode: number;
          public isGaplessSupportRequired: boolean;
          public isSpeedChangeSupportRequired: boolean;
          public equals(obj: any): boolean;
          public toBundle(): globalAndroid.os.Bundle;
          public buildUpon(): androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences.Builder;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences;
          public hashCode(): number;
        }
        export module AudioOffloadPreferences {
          export class AudioOffloadMode {
            public static class: java.lang.Class<androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences.AudioOffloadMode>;
            /**
             * Constructs a new instance of the androidx.media3.common.TrackSelectionParameters$AudioOffloadPreferences$AudioOffloadMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences.Builder>;
            public setIsGaplessSupportRequired(isGaplessSupportRequired: boolean): androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences.Builder;
            public constructor();
            public build(): androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences;
            public setAudioOffloadMode(audioOffloadMode: number): androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences.Builder;
            public setIsSpeedChangeSupportRequired(isSpeedChangeSupportRequired: boolean): androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences.Builder;
          }
        }
        export class Builder {
          public static class: java.lang.Class<androidx.media3.common.TrackSelectionParameters.Builder>;
          public setViewportSizeToPhysicalDisplaySize(context: globalAndroid.content.Context, viewportOrientationMayChange: boolean): androidx.media3.common.TrackSelectionParameters.Builder;
          public setMaxAudioChannelCount(maxAudioChannelCount: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setOverrideForType(override: androidx.media3.common.TrackSelectionOverride): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPreferredTextLanguages(preferredTextLanguages: androidNative.Array<string>): androidx.media3.common.TrackSelectionParameters.Builder;
          public clearOverrides(): androidx.media3.common.TrackSelectionParameters.Builder;
          public setForceHighestSupportedBitrate(forceHighestSupportedBitrate: boolean): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPreferredTextLanguageAndRoleFlagsToCaptioningManagerSettings(context: globalAndroid.content.Context): androidx.media3.common.TrackSelectionParameters.Builder;
          public constructor(initialValues: androidx.media3.common.TrackSelectionParameters);
          public setPreferredTextRoleFlags(preferredTextRoleFlags: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPreferredVideoMimeType(mimeType: string): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPreferredAudioMimeType(mimeType: string): androidx.media3.common.TrackSelectionParameters.Builder;
          /** @deprecated */
          public constructor();
          public set(parameters: androidx.media3.common.TrackSelectionParameters): androidx.media3.common.TrackSelectionParameters.Builder;
          public setMaxVideoSizeSd(): androidx.media3.common.TrackSelectionParameters.Builder;
          public clearOverride(mediaTrackGroup: androidx.media3.common.TrackGroup): androidx.media3.common.TrackSelectionParameters.Builder;
          public clearVideoSizeConstraints(): androidx.media3.common.TrackSelectionParameters.Builder;
          public addOverride(override: androidx.media3.common.TrackSelectionOverride): androidx.media3.common.TrackSelectionParameters.Builder;
          public build(): androidx.media3.common.TrackSelectionParameters;
          public setMinVideoFrameRate(minVideoFrameRate: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPreferredAudioLanguages(preferredAudioLanguages: androidNative.Array<string>): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPrioritizeImageOverVideoEnabled(isPrioritizeImageOverVideoEnabled: boolean): androidx.media3.common.TrackSelectionParameters.Builder;
          public clearOverridesOfType(this_: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setMaxVideoBitrate(maxVideoBitrate: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setForceLowestBitrate(forceLowestBitrate: boolean): androidx.media3.common.TrackSelectionParameters.Builder;
          public setMaxVideoFrameRate(maxVideoFrameRate: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setViewportSize(viewportWidth: number, viewportHeight: number, viewportOrientationMayChange: boolean): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPreferredVideoMimeTypes(mimeTypes: androidNative.Array<string>): androidx.media3.common.TrackSelectionParameters.Builder;
          public setIgnoredTextSelectionFlags(ignoredTextSelectionFlags: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPreferredVideoRoleFlags(preferredVideoRoleFlags: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPreferredAudioLanguage(preferredAudioLanguage: string): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPreferredTextLanguage(preferredTextLanguage: string): androidx.media3.common.TrackSelectionParameters.Builder;
          public setMaxVideoSize(maxVideoWidth: number, maxVideoHeight: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPreferredAudioRoleFlags(preferredAudioRoleFlags: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setPreferredAudioMimeTypes(mimeTypes: androidNative.Array<string>): androidx.media3.common.TrackSelectionParameters.Builder;
          public setMinVideoBitrate(minVideoBitrate: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setAudioOffloadPreferences(audioOffloadPreferences: androidx.media3.common.TrackSelectionParameters.AudioOffloadPreferences): androidx.media3.common.TrackSelectionParameters.Builder;
          /** @deprecated */
          public setDisabledTrackTypes(disabledTrackTypes: java.util.Set<java.lang.Integer>): androidx.media3.common.TrackSelectionParameters.Builder;
          public constructor(i: globalAndroid.os.Bundle);
          public clearViewportSizeConstraints(): androidx.media3.common.TrackSelectionParameters.Builder;
          public setTrackTypeDisabled(trackType: number, disabled: boolean): androidx.media3.common.TrackSelectionParameters.Builder;
          public constructor(context: globalAndroid.content.Context);
          public setMinVideoSize(minVideoWidth: number, minVideoHeight: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setMaxAudioBitrate(maxAudioBitrate: number): androidx.media3.common.TrackSelectionParameters.Builder;
          public setSelectUndeterminedTextLanguage(selectUndeterminedTextLanguage: boolean): androidx.media3.common.TrackSelectionParameters.Builder;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class Tracks extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.Tracks>;
        public static EMPTY: androidx.media3.common.Tracks;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.Tracks>;
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Tracks;
        public toBundle(): globalAndroid.os.Bundle;
        /** @deprecated */
        public isTypeSupportedOrEmpty(trackType: number, allowExceedsCapabilities: boolean): boolean;
        public isTypeSupported(trackType: number): boolean;
        public equals(other: any): boolean;
        public containsType(this_: number): boolean;
        public hashCode(): number;
        public constructor(groups: java.util.List<androidx.media3.common.Tracks.Group>);
        public isTypeSupported(this_: number, trackType: boolean): boolean;
        public isTypeSelected(i: number): boolean;
        public isEmpty(): boolean;
        public getGroups(): com.google.common.collect.ImmutableList<androidx.media3.common.Tracks.Group>;
        /** @deprecated */
        public isTypeSupportedOrEmpty(trackType: number): boolean;
      }
      export module Tracks {
        export class Group extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.Tracks.Group>;
          public length: number;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.Tracks.Group>;
          public isSupported(): boolean;
          public getType(): number;
          public isTrackSelected(trackIndex: number): boolean;
          public copyWithId(groupId: string): androidx.media3.common.Tracks.Group;
          public equals(other: any): boolean;
          public toBundle(): globalAndroid.os.Bundle;
          public getMediaTrackGroup(): androidx.media3.common.TrackGroup;
          public isTrackSupported(trackIndex: number, allowExceedsCapabilities: boolean): boolean;
          public getTrackFormat(trackIndex: number): androidx.media3.common.Format;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.Tracks.Group;
          public isSupported(this_: boolean): boolean;
          public constructor(mediaTrackGroup: androidx.media3.common.TrackGroup, adaptiveSupported: boolean, trackSupport: androidNative.Array<number>, trackSelected: androidNative.Array<boolean>);
          public isAdaptiveSupported(): boolean;
          public isTrackSupported(trackIndex: number): boolean;
          public hashCode(): number;
          public getTrackSupport(trackIndex: number): number;
          public isSelected(): boolean;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class VideoFrameProcessingException {
        public static class: java.lang.Class<androidx.media3.common.VideoFrameProcessingException>;
        public presentationTimeUs: number;
        public constructor(cause: java.lang.Throwable);
        public static from(exception: java.lang.Exception): androidx.media3.common.VideoFrameProcessingException;
        public constructor(message: string, cause: java.lang.Throwable);
        public constructor(cause: java.lang.Throwable, presentationTimeUs: number);
        public static from(exception: java.lang.Exception, presentationTimeUs: number): androidx.media3.common.VideoFrameProcessingException;
        public constructor(message: string);
        public constructor(message: string, presentationTimeUs: number);
        public constructor(message: string, cause: java.lang.Throwable, presentationTimeUs: number);
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class VideoFrameProcessor {
        public static class: java.lang.Class<androidx.media3.common.VideoFrameProcessor>;
        /**
         * Constructs a new instance of the androidx.media3.common.VideoFrameProcessor interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          queueInputBitmap(param0: globalAndroid.graphics.Bitmap, param1: androidx.media3.common.util.TimestampIterator): boolean;
          queueInputTexture(param0: number, param1: number): boolean;
          setOnInputFrameProcessedListener(param0: androidx.media3.common.OnInputFrameProcessedListener): void;
          getInputSurface(): globalAndroid.view.Surface;
          registerInputStream(param0: number, param1: java.util.List<androidx.media3.common.Effect>, param2: androidx.media3.common.FrameInfo): void;
          registerInputFrame(): boolean;
          getPendingInputFrameCount(): number;
          setOutputSurfaceInfo(param0: androidx.media3.common.SurfaceInfo): void;
          renderOutputFrame(param0: number): void;
          signalEndOfInput(): void;
          flush(): void;
          release(): void;
        });
        public constructor();
        public static DROP_OUTPUT_FRAME: number = -2;
        public static INPUT_TYPE_BITMAP: number = 2;
        public static INPUT_TYPE_TEXTURE_ID: number = 3;
        public static INPUT_TYPE_SURFACE: number = 1;
        public static RENDER_OUTPUT_FRAME_IMMEDIATELY: number = -1;
        public queueInputBitmap(param0: globalAndroid.graphics.Bitmap, param1: androidx.media3.common.util.TimestampIterator): boolean;
        public registerInputStream(param0: number, param1: java.util.List<androidx.media3.common.Effect>, param2: androidx.media3.common.FrameInfo): void;
        public getPendingInputFrameCount(): number;
        public setOutputSurfaceInfo(param0: androidx.media3.common.SurfaceInfo): void;
        public release(): void;
        public setOnInputFrameProcessedListener(param0: androidx.media3.common.OnInputFrameProcessedListener): void;
        public registerInputFrame(): boolean;
        public renderOutputFrame(param0: number): void;
        public signalEndOfInput(): void;
        public queueInputTexture(param0: number, param1: number): boolean;
        public getInputSurface(): globalAndroid.view.Surface;
        public flush(): void;
      }
      export module VideoFrameProcessor {
        export class Factory {
          public static class: java.lang.Class<androidx.media3.common.VideoFrameProcessor.Factory>;
          /**
           * Constructs a new instance of the androidx.media3.common.VideoFrameProcessor$Factory interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            create(
              param0: globalAndroid.content.Context,
              param1: androidx.media3.common.DebugViewProvider,
              param2: androidx.media3.common.ColorInfo,
              param3: boolean,
              param4: java.util.concurrent.Executor,
              param5: androidx.media3.common.VideoFrameProcessor.Listener
            ): androidx.media3.common.VideoFrameProcessor;
          });
          public constructor();
          public create(
            param0: globalAndroid.content.Context,
            param1: androidx.media3.common.DebugViewProvider,
            param2: androidx.media3.common.ColorInfo,
            param3: boolean,
            param4: java.util.concurrent.Executor,
            param5: androidx.media3.common.VideoFrameProcessor.Listener
          ): androidx.media3.common.VideoFrameProcessor;
        }
        export class InputType {
          public static class: java.lang.Class<androidx.media3.common.VideoFrameProcessor.InputType>;
          /**
           * Constructs a new instance of the androidx.media3.common.VideoFrameProcessor$InputType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
        export class Listener {
          public static class: java.lang.Class<androidx.media3.common.VideoFrameProcessor.Listener>;
          /**
           * Constructs a new instance of the androidx.media3.common.VideoFrameProcessor$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onInputStreamRegistered(param0: number, param1: java.util.List<androidx.media3.common.Effect>, param2: androidx.media3.common.FrameInfo): void;
            onOutputSizeChanged(param0: number, param1: number): void;
            onOutputFrameAvailableForRendering(param0: number): void;
            onError(param0: androidx.media3.common.VideoFrameProcessingException): void;
            onEnded(): void;
          });
          public constructor();
          public onInputStreamRegistered(param0: number, param1: java.util.List<androidx.media3.common.Effect>, param2: androidx.media3.common.FrameInfo): void;
          public onOutputFrameAvailableForRendering(param0: number): void;
          public onOutputSizeChanged(param0: number, param1: number): void;
          public onError(param0: androidx.media3.common.VideoFrameProcessingException): void;
          public onEnded(): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class VideoGraph {
        public static class: java.lang.Class<androidx.media3.common.VideoGraph>;
        /**
         * Constructs a new instance of the androidx.media3.common.VideoGraph interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
         */
        public constructor(implementation: {
          initialize(): void;
          registerInput(): number;
          getProcessor(param0: number): androidx.media3.common.VideoFrameProcessor;
          setOutputSurfaceInfo(param0: androidx.media3.common.SurfaceInfo): void;
          hasProducedFrameWithTimestampZero(): boolean;
          release(): void;
        });
        public constructor();
        public hasProducedFrameWithTimestampZero(): boolean;
        public registerInput(): number;
        public setOutputSurfaceInfo(param0: androidx.media3.common.SurfaceInfo): void;
        public release(): void;
        public initialize(): void;
        public getProcessor(param0: number): androidx.media3.common.VideoFrameProcessor;
      }
      export module VideoGraph {
        export class Listener {
          public static class: java.lang.Class<androidx.media3.common.VideoGraph.Listener>;
          /**
           * Constructs a new instance of the androidx.media3.common.VideoGraph$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            onOutputSizeChanged(param0: number, param1: number): void;
            onOutputFrameAvailableForRendering(param0: number): void;
            onEnded(param0: number): void;
            onError(param0: androidx.media3.common.VideoFrameProcessingException): void;
          });
          public constructor();
          public onOutputFrameAvailableForRendering(param0: number): void;
          public onOutputSizeChanged(param0: number, param1: number): void;
          public onError(param0: androidx.media3.common.VideoFrameProcessingException): void;
          public onEnded(param0: number): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export class VideoSize extends androidx.media3.common.Bundleable {
        public static class: java.lang.Class<androidx.media3.common.VideoSize>;
        public static UNKNOWN: androidx.media3.common.VideoSize;
        public width: number;
        public height: number;
        public unappliedRotationDegrees: number;
        public pixelWidthHeightRatio: number;
        public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.VideoSize>;
        public equals(this_: any): boolean;
        public hashCode(): number;
        public toBundle(): globalAndroid.os.Bundle;
        public constructor(width: number, height: number);
        public constructor(width: number, height: number, unappliedRotationDegrees: number, pixelWidthHeightRatio: number);
        public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.VideoSize;
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export class AudioMixingUtil {
          public static class: java.lang.Class<androidx.media3.common.audio.AudioMixingUtil>;
          public static canMix(audioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): boolean;
          public static mix(
            outputChannel: java.nio.ByteBuffer,
            position: androidx.media3.common.audio.AudioProcessor.AudioFormat,
            inputChannel: java.nio.ByteBuffer,
            inputChannel: androidx.media3.common.audio.AudioProcessor.AudioFormat,
            outputChannel: androidx.media3.common.audio.ChannelMixingMatrix,
            i: number,
            inputBuffer: boolean
          ): java.nio.ByteBuffer;
          public static canMix(inputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat, outputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): boolean;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export class AudioProcessingPipeline {
          public static class: java.lang.Class<androidx.media3.common.audio.AudioProcessingPipeline>;
          public queueInput(inputBuffer: java.nio.ByteBuffer): void;
          public reset(): void;
          public getOutputAudioFormat(): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public queueEndOfStream(): void;
          public equals(this_: any): boolean;
          public configure(nextFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public flush(): void;
          public isOperational(): boolean;
          public isEnded(): boolean;
          public hashCode(): number;
          public constructor(audioProcessors: com.google.common.collect.ImmutableList<androidx.media3.common.audio.AudioProcessor>);
          public getOutput(): java.nio.ByteBuffer;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export class AudioProcessor {
          public static class: java.lang.Class<androidx.media3.common.audio.AudioProcessor>;
          /**
           * Constructs a new instance of the androidx.media3.common.audio.AudioProcessor interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            configure(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
            isActive(): boolean;
            queueInput(param0: java.nio.ByteBuffer): void;
            queueEndOfStream(): void;
            getOutput(): java.nio.ByteBuffer;
            isEnded(): boolean;
            flush(): void;
            reset(): void;
            '<clinit>'(): void;
          });
          public constructor();
          public static EMPTY_BUFFER: java.nio.ByteBuffer;
          public isActive(): boolean;
          public reset(): void;
          public queueEndOfStream(): void;
          public queueInput(param0: java.nio.ByteBuffer): void;
          public isEnded(): boolean;
          public flush(): void;
          public configure(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public getOutput(): java.nio.ByteBuffer;
        }
        export module AudioProcessor {
          export class AudioFormat {
            public static class: java.lang.Class<androidx.media3.common.audio.AudioProcessor.AudioFormat>;
            public static NOT_SET: androidx.media3.common.audio.AudioProcessor.AudioFormat;
            public sampleRate: number;
            public channelCount: number;
            public encoding: number;
            public bytesPerFrame: number;
            public constructor(format: androidx.media3.common.Format);
            public constructor(sampleRate: number, channelCount: number, encoding: number);
            public hashCode(): number;
            public equals(o: any): boolean;
            public toString(): string;
          }
          export class UnhandledAudioFormatException {
            public static class: java.lang.Class<androidx.media3.common.audio.AudioProcessor.UnhandledAudioFormatException>;
            public inputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat;
            public constructor(inputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat);
            public constructor(message: string, audioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat);
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export class AudioProcessorChain {
          public static class: java.lang.Class<androidx.media3.common.audio.AudioProcessorChain>;
          /**
           * Constructs a new instance of the androidx.media3.common.audio.AudioProcessorChain interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            getAudioProcessors(): androidNative.Array<androidx.media3.common.audio.AudioProcessor>;
            applyPlaybackParameters(param0: androidx.media3.common.PlaybackParameters): androidx.media3.common.PlaybackParameters;
            applySkipSilenceEnabled(param0: boolean): boolean;
            getMediaDuration(param0: number): number;
            getSkippedOutputFrameCount(): number;
          });
          public constructor();
          public getMediaDuration(param0: number): number;
          public applyPlaybackParameters(param0: androidx.media3.common.PlaybackParameters): androidx.media3.common.PlaybackParameters;
          public applySkipSilenceEnabled(param0: boolean): boolean;
          public getAudioProcessors(): androidNative.Array<androidx.media3.common.audio.AudioProcessor>;
          public getSkippedOutputFrameCount(): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export abstract class BaseAudioProcessor extends androidx.media3.common.audio.AudioProcessor {
          public static class: java.lang.Class<androidx.media3.common.audio.BaseAudioProcessor>;
          public inputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public outputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public configure(inputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public reset(): void;
          public replaceOutputBuffer(size: number): java.nio.ByteBuffer;
          public onQueueEndOfStream(): void;
          public isEnded(): boolean;
          public flush(): void;
          public configure(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public getOutput(): java.nio.ByteBuffer;
          public onReset(): void;
          public onConfigure(inputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public isActive(): boolean;
          public queueEndOfStream(): void;
          public constructor();
          public queueInput(param0: java.nio.ByteBuffer): void;
          public hasPendingOutput(): boolean;
          public onFlush(): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export class ChannelMixingAudioProcessor extends androidx.media3.common.audio.BaseAudioProcessor {
          public static class: java.lang.Class<androidx.media3.common.audio.ChannelMixingAudioProcessor>;
          public onConfigure(inputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public queueInput(inputBuffer: java.nio.ByteBuffer): void;
          public isActive(): boolean;
          public reset(): void;
          public queueEndOfStream(): void;
          public constructor();
          public queueInput(param0: java.nio.ByteBuffer): void;
          public putChannelMixingMatrix(matrix: androidx.media3.common.audio.ChannelMixingMatrix): void;
          public isEnded(): boolean;
          public flush(): void;
          public configure(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public getOutput(): java.nio.ByteBuffer;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export class ChannelMixingMatrix {
          public static class: java.lang.Class<androidx.media3.common.audio.ChannelMixingMatrix>;
          public isIdentity(): boolean;
          public scaleBy(this_: number): androidx.media3.common.audio.ChannelMixingMatrix;
          public isDiagonal(): boolean;
          public isZero(): boolean;
          public getOutputChannelCount(): number;
          public isSquare(): boolean;
          public static create(inputChannelCount: number, outputChannelCount: number): androidx.media3.common.audio.ChannelMixingMatrix;
          public getMixingCoefficient(inputChannel: number, outputChannel: number): number;
          public constructor(onDiagonal: number, col: number, row: androidNative.Array<number>);
          public getInputChannelCount(): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export class Sonic {
          public static class: java.lang.Class<androidx.media3.common.audio.Sonic>;
          public getOutput(buffer: java.nio.ShortBuffer): void;
          public queueEndOfStream(): void;
          public queueInput(buffer: java.nio.ShortBuffer): void;
          public flush(): void;
          public getOutputSize(): number;
          public getPendingInputBytes(): number;
          public constructor(inputSampleRateHz: number, channelCount: number, speed: number, pitch: number, outputSampleRateHz: number);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export class SonicAudioProcessor extends androidx.media3.common.audio.AudioProcessor {
          public static class: java.lang.Class<androidx.media3.common.audio.SonicAudioProcessor>;
          public static SAMPLE_RATE_NO_CHANGE: number = -1;
          public setPitch(pitch: number): void;
          public getMediaDuration(this_: number): number;
          public configure(inputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public reset(): void;
          public setSpeed(speed: number): void;
          public isEnded(): boolean;
          public flush(): void;
          public configure(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public getOutput(): java.nio.ByteBuffer;
          public isActive(): boolean;
          public queueInput(inputBuffer: java.nio.ByteBuffer): void;
          public queueEndOfStream(): void;
          public setOutputSampleRateHz(sampleRateHz: number): void;
          public constructor();
          public queueInput(param0: java.nio.ByteBuffer): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export class SpeedChangingAudioProcessor extends androidx.media3.common.audio.BaseAudioProcessor {
          public static class: java.lang.Class<androidx.media3.common.audio.SpeedChangingAudioProcessor>;
          public reset(): void;
          public onQueueEndOfStream(): void;
          public isEnded(): boolean;
          public flush(): void;
          public configure(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public getOutput(): java.nio.ByteBuffer;
          public onReset(): void;
          public onConfigure(inputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public isActive(): boolean;
          public queueEndOfStream(): void;
          public constructor();
          public constructor(speedProvider: androidx.media3.common.audio.SpeedProvider);
          public queueInput(param0: java.nio.ByteBuffer): void;
          public queueInput(bytesToNextSpeedChange: java.nio.ByteBuffer): void;
          public onFlush(): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export class SpeedProvider {
          public static class: java.lang.Class<androidx.media3.common.audio.SpeedProvider>;
          /**
           * Constructs a new instance of the androidx.media3.common.audio.SpeedProvider interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { getSpeed(param0: number): number; getNextSpeedChangeTimeUs(param0: number): number });
          public constructor();
          public getSpeed(param0: number): number;
          public getNextSpeedChangeTimeUs(param0: number): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module audio {
        export class ToInt16PcmAudioProcessor extends androidx.media3.common.audio.BaseAudioProcessor {
          public static class: java.lang.Class<androidx.media3.common.audio.ToInt16PcmAudioProcessor>;
          public onConfigure(inputAudioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public isActive(): boolean;
          public reset(): void;
          public queueEndOfStream(): void;
          public constructor();
          public queueInput(param0: java.nio.ByteBuffer): void;
          public isEnded(): boolean;
          public flush(): void;
          public configure(param0: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.audio.AudioProcessor.AudioFormat;
          public getOutput(): java.nio.ByteBuffer;
          public queueInput(resampledSize: java.nio.ByteBuffer): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module text {
        export class Cue extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.text.Cue>;
          public static EMPTY: androidx.media3.common.text.Cue;
          public static DIMEN_UNSET: number = -3.4028235e38;
          public static TYPE_UNSET: number = -2147483648;
          public static ANCHOR_TYPE_START: number = 0;
          public static ANCHOR_TYPE_MIDDLE: number = 1;
          public static ANCHOR_TYPE_END: number = 2;
          public static LINE_TYPE_FRACTION: number = 0;
          public static LINE_TYPE_NUMBER: number = 1;
          public static TEXT_SIZE_TYPE_FRACTIONAL: number = 0;
          public static TEXT_SIZE_TYPE_FRACTIONAL_IGNORE_PADDING: number = 1;
          public static TEXT_SIZE_TYPE_ABSOLUTE: number = 2;
          public static VERTICAL_TYPE_RL: number = 1;
          public static VERTICAL_TYPE_LR: number = 2;
          public text: string;
          public textAlignment: globalAndroid.text.Layout.Alignment;
          public multiRowAlignment: globalAndroid.text.Layout.Alignment;
          public bitmap: globalAndroid.graphics.Bitmap;
          public line: number;
          public lineType: number;
          public lineAnchor: number;
          public position: number;
          public positionAnchor: number;
          public size: number;
          public bitmapHeight: number;
          public windowColorSet: boolean;
          public windowColor: number;
          public textSizeType: number;
          public textSize: number;
          public verticalType: number;
          public shearDegrees: number;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.text.Cue>;
          public equals(obj: any): boolean;
          /** @deprecated */
          public toBundle(): globalAndroid.os.Bundle;
          public static fromBundle(customSpanBundle: globalAndroid.os.Bundle): androidx.media3.common.text.Cue;
          public buildUpon(): androidx.media3.common.text.Cue.Builder;
          public toBundle(): globalAndroid.os.Bundle;
          public hashCode(): number;
          public toSerializableBundle(): globalAndroid.os.Bundle;
          public toBinderBasedBundle(): globalAndroid.os.Bundle;
        }
        export module Cue {
          export class AnchorType {
            public static class: java.lang.Class<androidx.media3.common.text.Cue.AnchorType>;
            /**
             * Constructs a new instance of the androidx.media3.common.text.Cue$AnchorType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
          export class Builder {
            public static class: java.lang.Class<androidx.media3.common.text.Cue.Builder>;
            public setLine(line: number, lineType: number): androidx.media3.common.text.Cue.Builder;
            public setWindowColor(windowColor: number): androidx.media3.common.text.Cue.Builder;
            public setVerticalType(verticalType: number): androidx.media3.common.text.Cue.Builder;
            public setSize(size: number): androidx.media3.common.text.Cue.Builder;
            public setPositionAnchor(positionAnchor: number): androidx.media3.common.text.Cue.Builder;
            public isWindowColorSet(): boolean;
            public getText(): string;
            public getLineAnchor(): number;
            public getTextSizeType(): number;
            public clearWindowColor(): androidx.media3.common.text.Cue.Builder;
            public setBitmapHeight(bitmapHeight: number): androidx.media3.common.text.Cue.Builder;
            public getLineType(): number;
            public getWindowColor(): number;
            public getBitmapHeight(): number;
            public getPositionAnchor(): number;
            public setBitmap(bitmap: globalAndroid.graphics.Bitmap): androidx.media3.common.text.Cue.Builder;
            public constructor();
            public getLine(): number;
            public setShearDegrees(shearDegrees: number): androidx.media3.common.text.Cue.Builder;
            public getPosition(): number;
            public setTextSize(textSize: number, textSizeType: number): androidx.media3.common.text.Cue.Builder;
            public getVerticalType(): number;
            public getTextAlignment(): globalAndroid.text.Layout.Alignment;
            public setMultiRowAlignment(multiRowAlignment: globalAndroid.text.Layout.Alignment): androidx.media3.common.text.Cue.Builder;
            public getBitmap(): globalAndroid.graphics.Bitmap;
            public build(): androidx.media3.common.text.Cue;
            public setPosition(position: number): androidx.media3.common.text.Cue.Builder;
            public getTextSize(): number;
            public setText(text: string): androidx.media3.common.text.Cue.Builder;
            public getSize(): number;
            public setLineAnchor(lineAnchor: number): androidx.media3.common.text.Cue.Builder;
            public setTextAlignment(textAlignment: globalAndroid.text.Layout.Alignment): androidx.media3.common.text.Cue.Builder;
          }
          export class LineType {
            public static class: java.lang.Class<androidx.media3.common.text.Cue.LineType>;
            /**
             * Constructs a new instance of the androidx.media3.common.text.Cue$LineType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
          export class TextSizeType {
            public static class: java.lang.Class<androidx.media3.common.text.Cue.TextSizeType>;
            /**
             * Constructs a new instance of the androidx.media3.common.text.Cue$TextSizeType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
          export class VerticalType {
            public static class: java.lang.Class<androidx.media3.common.text.Cue.VerticalType>;
            /**
             * Constructs a new instance of the androidx.media3.common.text.Cue$VerticalType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module text {
        export class CueGroup extends androidx.media3.common.Bundleable {
          public static class: java.lang.Class<androidx.media3.common.text.CueGroup>;
          public static EMPTY_TIME_ZERO: androidx.media3.common.text.CueGroup;
          public cues: com.google.common.collect.ImmutableList<androidx.media3.common.text.Cue>;
          public presentationTimeUs: number;
          public static CREATOR: androidx.media3.common.Bundleable.Creator<androidx.media3.common.text.CueGroup>;
          public constructor(cues: java.util.List<androidx.media3.common.text.Cue>, presentationTimeUs: number);
          public toBundle(): globalAndroid.os.Bundle;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.text.CueGroup;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module text {
        export class CustomSpanBundler {
          public static class: java.lang.Class<androidx.media3.common.text.CustomSpanBundler>;
          public static bundleCustomSpans(bundle: globalAndroid.text.Spanned): java.util.ArrayList<globalAndroid.os.Bundle>;
          public static unbundleAndApplyCustomSpan(customSpanBundle: globalAndroid.os.Bundle, text: globalAndroid.text.Spannable): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module text {
        export class HorizontalTextInVerticalContextSpan extends androidx.media3.common.text.LanguageFeatureSpan {
          public static class: java.lang.Class<androidx.media3.common.text.HorizontalTextInVerticalContextSpan>;
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module text {
        export class LanguageFeatureSpan {
          public static class: java.lang.Class<androidx.media3.common.text.LanguageFeatureSpan>;
          /**
           * Constructs a new instance of the androidx.media3.common.text.LanguageFeatureSpan interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module text {
        export class RubySpan extends androidx.media3.common.text.LanguageFeatureSpan {
          public static class: java.lang.Class<androidx.media3.common.text.RubySpan>;
          public rubyText: string;
          public position: number;
          public constructor(rubyText: string, position: number);
          public toBundle(): globalAndroid.os.Bundle;
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.text.RubySpan;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module text {
        export class SpanUtil {
          public static class: java.lang.Class<androidx.media3.common.text.SpanUtil>;
          public static addOrReplaceSpan(existingSpan: globalAndroid.text.Spannable, spannable: any, span: number, start: number, end: number): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module text {
        export class TextAnnotation {
          public static class: java.lang.Class<androidx.media3.common.text.TextAnnotation>;
          public static POSITION_UNKNOWN: number = -1;
          public static POSITION_BEFORE: number = 1;
          public static POSITION_AFTER: number = 2;
        }
        export module TextAnnotation {
          export class Position {
            public static class: java.lang.Class<androidx.media3.common.text.TextAnnotation.Position>;
            /**
             * Constructs a new instance of the androidx.media3.common.text.TextAnnotation$Position interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module text {
        export class TextEmphasisSpan extends androidx.media3.common.text.LanguageFeatureSpan {
          public static class: java.lang.Class<androidx.media3.common.text.TextEmphasisSpan>;
          public static MARK_SHAPE_NONE: number = 0;
          public static MARK_SHAPE_CIRCLE: number = 1;
          public static MARK_SHAPE_DOT: number = 2;
          public static MARK_SHAPE_SESAME: number = 3;
          public static MARK_FILL_UNKNOWN: number = 0;
          public static MARK_FILL_FILLED: number = 1;
          public static MARK_FILL_OPEN: number = 2;
          public markShape: number;
          public markFill: number;
          public position: number;
          public toBundle(): globalAndroid.os.Bundle;
          public constructor(shape: number, fill: number, position: number);
          public static fromBundle(bundle: globalAndroid.os.Bundle): androidx.media3.common.text.TextEmphasisSpan;
        }
        export module TextEmphasisSpan {
          export class MarkFill {
            public static class: java.lang.Class<androidx.media3.common.text.TextEmphasisSpan.MarkFill>;
            /**
             * Constructs a new instance of the androidx.media3.common.text.TextEmphasisSpan$MarkFill interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
          export class MarkShape {
            public static class: java.lang.Class<androidx.media3.common.text.TextEmphasisSpan.MarkShape>;
            /**
             * Constructs a new instance of the androidx.media3.common.text.TextEmphasisSpan$MarkShape interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class Assertions {
          public static class: java.lang.Class<androidx.media3.common.util.Assertions>;
          public static checkState(expression: boolean, errorMessage: any): void;
          public static checkNotNull(reference: any, errorMessage: any): any;
          public static checkArgument(expression: boolean): void;
          public static checkState(expression: boolean): void;
          public static checkStateNotNull(reference: any, errorMessage: any): any;
          public static checkArgument(expression: boolean, errorMessage: any): void;
          public static checkIndex(index: number, start: number, limit: number): number;
          public static checkMainThread(): void;
          public static checkStateNotNull(reference: any): any;
          public static checkNotEmpty(string: string): string;
          public static checkNotNull(reference: any): any;
          public static checkNotEmpty(string: string, errorMessage: any): string;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class AtomicFile {
          public static class: java.lang.Class<androidx.media3.common.util.AtomicFile>;
          public delete(): void;
          public startWrite(): java.io.OutputStream;
          public endWrite(str: java.io.OutputStream): void;
          public openRead(): java.io.InputStream;
          public constructor(baseName: java.io.File);
          public exists(): boolean;
        }
        export module AtomicFile {
          export class AtomicFileOutputStream {
            public static class: java.lang.Class<androidx.media3.common.util.AtomicFile.AtomicFileOutputStream>;
            public write(b: androidNative.Array<number>): void;
            public close(): void;
            public constructor(file: java.io.File);
            public write(b: androidNative.Array<number>, off: number, len: number): void;
            public flush(): void;
            public write(b: number): void;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class BitmapLoader {
          public static class: java.lang.Class<androidx.media3.common.util.BitmapLoader>;
          /**
           * Constructs a new instance of the androidx.media3.common.util.BitmapLoader interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            supportsMimeType(param0: string): boolean;
            decodeBitmap(param0: androidNative.Array<number>): com.google.common.util.concurrent.ListenableFuture<globalAndroid.graphics.Bitmap>;
            loadBitmap(param0: globalAndroid.net.Uri): com.google.common.util.concurrent.ListenableFuture<globalAndroid.graphics.Bitmap>;
            loadBitmapFromMetadata(future: androidx.media3.common.MediaMetadata): com.google.common.util.concurrent.ListenableFuture<globalAndroid.graphics.Bitmap>;
          });
          public constructor();
          public supportsMimeType(param0: string): boolean;
          public decodeBitmap(param0: androidNative.Array<number>): com.google.common.util.concurrent.ListenableFuture<globalAndroid.graphics.Bitmap>;
          public loadBitmapFromMetadata(future: androidx.media3.common.MediaMetadata): com.google.common.util.concurrent.ListenableFuture<globalAndroid.graphics.Bitmap>;
          public loadBitmap(param0: globalAndroid.net.Uri): com.google.common.util.concurrent.ListenableFuture<globalAndroid.graphics.Bitmap>;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class BundleCollectionUtil {
          public static class: java.lang.Class<androidx.media3.common.util.BundleCollectionUtil>;
          public static bundleToStringHashMap(value: globalAndroid.os.Bundle): java.util.HashMap<string, string>;
          public static getBundleWithDefault(bundle: globalAndroid.os.Bundle, field: string, defaultValue: globalAndroid.os.Bundle): globalAndroid.os.Bundle;
          public static ensureClassLoader(bundle: globalAndroid.os.Bundle): void;
          public static toBundleList(item: java.util.List<any>, i: com.google.common.base.Function): com.google.common.collect.ImmutableList;
          public static fromBundleList(bundle: com.google.common.base.Function, item: java.util.List<any>): com.google.common.collect.ImmutableList;
          public static toBundleSparseArray(i: globalAndroid.util.SparseArray<any>, items: com.google.common.base.Function): globalAndroid.util.SparseArray<any>;
          public static getIntegerArrayListWithDefault(bundle: globalAndroid.os.Bundle, field: string, defaultValue: java.util.ArrayList<java.lang.Integer>): java.util.ArrayList<java.lang.Integer>;
          public static bundleToStringImmutableMap(bundle: globalAndroid.os.Bundle): com.google.common.collect.ImmutableMap<string, string>;
          public static fromBundleSparseArray(i: com.google.common.base.Function, fromBundleFunc: globalAndroid.util.SparseArray<any>): globalAndroid.util.SparseArray<any>;
          public static toBundleArrayList(item: java.util.Collection<any>, items: com.google.common.base.Function): java.util.ArrayList<any>;
          public static stringMapToBundle(entry: java.util.Map<string, string>): globalAndroid.os.Bundle;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class BundleUtil {
          public static class: java.lang.Class<androidx.media3.common.util.BundleUtil>;
          public static getBinder(bundle: globalAndroid.os.Bundle, key: string): globalAndroid.os.IBinder;
          public static putBinder(bundle: globalAndroid.os.Bundle, key: string, binder: globalAndroid.os.IBinder): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class Clock {
          public static class: java.lang.Class<androidx.media3.common.util.Clock>;
          /**
           * Constructs a new instance of the androidx.media3.common.util.Clock interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            currentTimeMillis(): number;
            elapsedRealtime(): number;
            uptimeMillis(): number;
            nanoTime(): number;
            createHandler(param0: globalAndroid.os.Looper, param1: globalAndroid.os.Handler.Callback): androidx.media3.common.util.HandlerWrapper;
            onThreadBlocked(): void;
            '<clinit>'(): void;
          });
          public constructor();
          public static DEFAULT: androidx.media3.common.util.Clock;
          public onThreadBlocked(): void;
          public elapsedRealtime(): number;
          public uptimeMillis(): number;
          public currentTimeMillis(): number;
          public createHandler(param0: globalAndroid.os.Looper, param1: globalAndroid.os.Handler.Callback): androidx.media3.common.util.HandlerWrapper;
          public nanoTime(): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class CodecSpecificDataUtil {
          public static class: java.lang.Class<androidx.media3.common.util.CodecSpecificDataUtil>;
          public static buildHevcCodecString(
            i: number,
            generalProfileSpace: boolean,
            generalTierFlag: number,
            generalProfileIdc: number,
            generalProfileCompatibilityFlags: androidNative.Array<number>,
            constraintBytes: number
          ): string;
          public static parseCea708InitializationData(initializationData: java.util.List<androidNative.Array<number>>): boolean;
          public static getVideoResolutionFromMpeg4VideoConfig(numBitsToSkip: androidNative.Array<number>): globalAndroid.util.Pair<java.lang.Integer, java.lang.Integer>;
          public static parseAlacAudioSpecificConfig(audioSpecificConfig: androidNative.Array<number>): globalAndroid.util.Pair<java.lang.Integer, java.lang.Integer>;
          public static buildNalUnit(data: androidNative.Array<number>, offset: number, length: number): androidNative.Array<number>;
          public static splitNalUnits(startIndex: androidNative.Array<number>): androidNative.Array<androidNative.Array<number>>;
          public static buildCea708InitializationData(isWideAspectRatio: boolean): java.util.List<androidNative.Array<number>>;
          public static buildAvcCodecString(profileIdc: number, constraintsFlagsAndReservedZero2Bits: number, levelIdc: number): string;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class ColorParser {
          public static class: java.lang.Class<androidx.media3.common.util.ColorParser>;
          public static parseTtmlColor(colorExpression: string): number;
          public static parseCssColor(colorExpression: string): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class ConditionVariable {
          public static class: java.lang.Class<androidx.media3.common.util.ConditionVariable>;
          public block(): void;
          public isOpen(): boolean;
          public open(): boolean;
          public constructor();
          public close(): boolean;
          public block(timeoutMs: number): boolean;
          public blockUninterruptible(): void;
          public constructor(clock: androidx.media3.common.util.Clock);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class ConstantRateTimestampIterator extends androidx.media3.common.util.TimestampIterator {
          public static class: java.lang.Class<androidx.media3.common.util.ConstantRateTimestampIterator>;
          public constructor(durationUs: number, frameRate: number);
          public constructor(durationUs: number, frameRate: number, startingTimestampUs: number);
          public next(): number;
          public copyOf(): androidx.media3.common.util.ConstantRateTimestampIterator;
          public hasNext(): boolean;
          public copyOf(): androidx.media3.common.util.TimestampIterator;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class Consumer<T> extends java.lang.Object {
          public static class: java.lang.Class<androidx.media3.common.util.Consumer<any>>;
          /**
           * Constructs a new instance of the androidx.media3.common.util.Consumer<any> interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { accept(param0: T): void });
          public constructor();
          public accept(param0: T): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class CopyOnWriteMultiset<E> extends java.lang.Iterable<any> {
          public static class: java.lang.Class<androidx.media3.common.util.CopyOnWriteMultiset<any>>;
          public iterator(): java.util.Iterator<any>;
          public constructor();
          public remove(count: any): void;
          public elementSet(): java.util.Set<any>;
          public add(elements: any): void;
          public count(element: any): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class EGLSurfaceTexture {
          public static class: java.lang.Class<androidx.media3.common.util.EGLSurfaceTexture>;
          public static SECURE_MODE_NONE: number = 0;
          public static SECURE_MODE_SURFACELESS_CONTEXT: number = 1;
          public static SECURE_MODE_PROTECTED_PBUFFER: number = 2;
          public init(secureMode: number): void;
          public constructor(handler: globalAndroid.os.Handler, callback: androidx.media3.common.util.EGLSurfaceTexture.TextureImageListener);
          public run(): void;
          public onFrameAvailable(surfaceTexture: globalAndroid.graphics.SurfaceTexture): void;
          public release(): void;
          public getSurfaceTexture(): globalAndroid.graphics.SurfaceTexture;
          public constructor(handler: globalAndroid.os.Handler);
        }
        export module EGLSurfaceTexture {
          export class SecureMode {
            public static class: java.lang.Class<androidx.media3.common.util.EGLSurfaceTexture.SecureMode>;
            /**
             * Constructs a new instance of the androidx.media3.common.util.EGLSurfaceTexture$SecureMode interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
          export class TextureImageListener {
            public static class: java.lang.Class<androidx.media3.common.util.EGLSurfaceTexture.TextureImageListener>;
            /**
             * Constructs a new instance of the androidx.media3.common.util.EGLSurfaceTexture$TextureImageListener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { onFrameAvailable(): void });
            public constructor();
            public onFrameAvailable(): void;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class GlProgram {
          public static class: java.lang.Class<androidx.media3.common.util.GlProgram>;
          public delete(): void;
          public setSamplerTexIdUniform(name: string, texId: number, texUnitIndex: number): void;
          public getAttributeArrayLocationAndEnable(attributeName: string): number;
          public setIntUniform(name: string, value: number): void;
          public setBufferAttribute(name: string, values: androidNative.Array<number>, size: number): void;
          public constructor(i: string, uniform: string);
          public setFloatsUniform(name: string, value: androidNative.Array<number>): void;
          public constructor(context: globalAndroid.content.Context, vertexShaderFilePath: string, fragmentShaderFilePath: string);
          public getUniformLocation(uniformName: string): number;
          public setFloatUniform(name: string, value: number): void;
          public use(): void;
          public bindAttributesAndUniforms(): void;
          public setIntsUniform(name: string, value: androidNative.Array<number>): void;
        }
        export module GlProgram {
          export class Attribute {
            public static class: java.lang.Class<androidx.media3.common.util.GlProgram.Attribute>;
            public name: string;
            public setBuffer(buffer: androidNative.Array<number>, size: number): void;
            public static create(programId: number, index: number): androidx.media3.common.util.GlProgram.Attribute;
            public bind(): void;
          }
          export class Uniform {
            public static class: java.lang.Class<androidx.media3.common.util.GlProgram.Uniform>;
            public name: string;
            public setFloat(value: number): void;
            public static create(programId: number, index: number): androidx.media3.common.util.GlProgram.Uniform;
            public setFloats(value: androidNative.Array<number>): void;
            public setSamplerTexId(texId: number, texUnitIndex: number): void;
            public setInt(value: number): void;
            public bind(): void;
            public setInts(value: androidNative.Array<number>): void;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class GlUtil {
          public static class: java.lang.Class<androidx.media3.common.util.GlUtil>;
          public static HOMOGENEOUS_COORDINATE_VECTOR_SIZE: number = 4;
          public static LENGTH_NDC: number = 2.0;
          public static EGL_CONFIG_ATTRIBUTES_RGBA_8888: androidNative.Array<number>;
          public static EGL_CONFIG_ATTRIBUTES_RGBA_1010102: androidNative.Array<number>;
          public static checkGlException(expression: boolean, errorMessage: string): void;
          public static awaitSyncObject(syncObject: number): void;
          public static focusEglSurface(
            eglDisplay: globalAndroid.opengl.EGLDisplay,
            eglContext: globalAndroid.opengl.EGLContext,
            eglSurface: globalAndroid.opengl.EGLSurface,
            width: number,
            height: number
          ): void;
          public static createFocusedPlaceholderEglSurface(eglContext: globalAndroid.opengl.EGLContext, eglDisplay: globalAndroid.opengl.EGLDisplay): globalAndroid.opengl.EGLSurface;
          public static deleteFbo(fboId: number): void;
          public static focusFramebuffer(
            eglDisplay: globalAndroid.opengl.EGLDisplay,
            eglContext: globalAndroid.opengl.EGLContext,
            eglSurface: globalAndroid.opengl.EGLSurface,
            framebuffer: number,
            width: number,
            height: number
          ): void;
          public static createGlSyncFence(): number;
          public static isProtectedContentExtensionSupported(context: globalAndroid.content.Context): boolean;
          public static createTexture(bitmap: globalAndroid.graphics.Bitmap): number;
          public static isSurfacelessContextExtensionSupported(): boolean;
          public static getCurrentContext(): globalAndroid.opengl.EGLContext;
          public static setToIdentity(matrix: androidNative.Array<number>): void;
          public static deleteSyncObjectQuietly(syncObject: number): void;
          public static createBuffer(data: androidNative.Array<number>): java.nio.FloatBuffer;
          public static getContextMajorVersion(): number;
          public static destroyEglSurface(eglDisplay: globalAndroid.opengl.EGLDisplay, eglSurface: globalAndroid.opengl.EGLSurface): void;
          public static createTexture(width: number, height: number, useHighPrecisionColorComponents: boolean): number;
          public static createEglContext(
            sharedContext: globalAndroid.opengl.EGLContext,
            eglDisplay: globalAndroid.opengl.EGLDisplay,
            openGlVersion: number,
            configAttributes: androidNative.Array<number>
          ): globalAndroid.opengl.EGLContext;
          public static destroyEglContext(eglDisplay: globalAndroid.opengl.EGLDisplay, eglContext: globalAndroid.opengl.EGLContext): void;
          public static isYuvTargetExtensionSupported(): boolean;
          public static checkGlError(): void;
          public static deleteTexture(textureId: number): void;
          public static deleteRbo(rboId: number): void;
          public static createExternalTexture(): number;
          public static getTextureCoordinateBounds(): androidNative.Array<number>;
          public static generateTexture(): number;
          public static isBt2020PqExtensionSupported(): boolean;
          public static focusFramebufferUsingCurrentContext(framebuffer: number, width: number, height: number): void;
          public static bindTexture(textureTarget: number, texId: number): void;
          public static create4x4IdentityMatrix(): androidNative.Array<number>;
          public static createEglSurface(
            configAttributes: globalAndroid.opengl.EGLDisplay,
            windowAttributes: any,
            windowAttributes: number,
            configAttributes: boolean
          ): globalAndroid.opengl.EGLSurface;
          public static clearFocusedBuffers(): void;
          public static setTexture(texId: number, bitmap: globalAndroid.graphics.Bitmap): void;
          public static createVertexBuffer(i: java.util.List<androidNative.Array<number>>): androidNative.Array<number>;
          public static deleteSyncObject(syncObject: number): void;
          public static getNormalizedCoordinateBounds(): androidNative.Array<number>;
          public static createEglContext(eglDisplay: globalAndroid.opengl.EGLDisplay): globalAndroid.opengl.EGLContext;
          public static createFboForTexture(texId: number): number;
          public static getDefaultEglDisplay(): globalAndroid.opengl.EGLDisplay;
        }
        export module GlUtil {
          export class Api17 {
            public static class: java.lang.Class<androidx.media3.common.util.GlUtil.Api17>;
            public static isExtensionSupported(extensionName: string): boolean;
            public static createEglSurface(
              eglDisplay: globalAndroid.opengl.EGLDisplay,
              surface: any,
              configAttributes: androidNative.Array<number>,
              windowAttributes: androidNative.Array<number>
            ): globalAndroid.opengl.EGLSurface;
            public static getCurrentContext(): globalAndroid.opengl.EGLContext;
            public static getDefaultEglDisplay(): globalAndroid.opengl.EGLDisplay;
            public static focusRenderTarget(
              eglDisplay: globalAndroid.opengl.EGLDisplay,
              eglContext: globalAndroid.opengl.EGLContext,
              eglSurface: globalAndroid.opengl.EGLSurface,
              framebuffer: number,
              width: number,
              height: number
            ): void;
            public static destroyEglSurface(eglDisplay: globalAndroid.opengl.EGLDisplay, eglSurface: globalAndroid.opengl.EGLSurface): void;
            public static getContextMajorVersion(): number;
            public static createEglContext(
              sharedContext: globalAndroid.opengl.EGLContext,
              eglDisplay: globalAndroid.opengl.EGLDisplay,
              version: number,
              configAttributes: androidNative.Array<number>
            ): globalAndroid.opengl.EGLContext;
            public static checkEglException(errorMessage: string): void;
            public static destroyEglContext(eglDisplay: globalAndroid.opengl.EGLDisplay, eglContext: globalAndroid.opengl.EGLContext): void;
            public static createEglPbufferSurface(
              eglDisplay: globalAndroid.opengl.EGLDisplay,
              configAttributes: androidNative.Array<number>,
              pbufferAttributes: androidNative.Array<number>
            ): globalAndroid.opengl.EGLSurface;
          }
          export class Api18 {
            public static class: java.lang.Class<androidx.media3.common.util.GlUtil.Api18>;
            public static createSyncFence(): number;
            public static waitSync(syncObject: number): void;
            public static deleteSyncObject(syncObject: number): void;
          }
          export class GlException {
            public static class: java.lang.Class<androidx.media3.common.util.GlUtil.GlException>;
            public constructor(message: string);
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class HandlerWrapper {
          public static class: java.lang.Class<androidx.media3.common.util.HandlerWrapper>;
          /**
           * Constructs a new instance of the androidx.media3.common.util.HandlerWrapper interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {
            getLooper(): globalAndroid.os.Looper;
            hasMessages(param0: number): boolean;
            obtainMessage(param0: number): androidx.media3.common.util.HandlerWrapper.Message;
            obtainMessage(param0: number, param1: any): androidx.media3.common.util.HandlerWrapper.Message;
            obtainMessage(param0: number, param1: number, param2: number): androidx.media3.common.util.HandlerWrapper.Message;
            obtainMessage(param0: number, param1: number, param2: number, param3: any): androidx.media3.common.util.HandlerWrapper.Message;
            sendMessageAtFrontOfQueue(param0: androidx.media3.common.util.HandlerWrapper.Message): boolean;
            sendEmptyMessage(param0: number): boolean;
            sendEmptyMessageDelayed(param0: number, param1: number): boolean;
            sendEmptyMessageAtTime(param0: number, param1: number): boolean;
            removeMessages(param0: number): void;
            removeCallbacksAndMessages(param0: any): void;
            post(param0: java.lang.Runnable): boolean;
            postDelayed(param0: java.lang.Runnable, param1: number): boolean;
            postAtFrontOfQueue(param0: java.lang.Runnable): boolean;
          });
          public constructor();
          public postAtFrontOfQueue(param0: java.lang.Runnable): boolean;
          public obtainMessage(param0: number, param1: number, param2: number): androidx.media3.common.util.HandlerWrapper.Message;
          public obtainMessage(param0: number, param1: any): androidx.media3.common.util.HandlerWrapper.Message;
          public sendMessageAtFrontOfQueue(param0: androidx.media3.common.util.HandlerWrapper.Message): boolean;
          public sendEmptyMessageDelayed(param0: number, param1: number): boolean;
          public hasMessages(param0: number): boolean;
          public post(param0: java.lang.Runnable): boolean;
          public obtainMessage(param0: number): androidx.media3.common.util.HandlerWrapper.Message;
          public obtainMessage(param0: number, param1: number, param2: number, param3: any): androidx.media3.common.util.HandlerWrapper.Message;
          public sendEmptyMessageAtTime(param0: number, param1: number): boolean;
          public getLooper(): globalAndroid.os.Looper;
          public postDelayed(param0: java.lang.Runnable, param1: number): boolean;
          public removeMessages(param0: number): void;
          public removeCallbacksAndMessages(param0: any): void;
          public sendEmptyMessage(param0: number): boolean;
        }
        export module HandlerWrapper {
          export class Message {
            public static class: java.lang.Class<androidx.media3.common.util.HandlerWrapper.Message>;
            /**
             * Constructs a new instance of the androidx.media3.common.util.HandlerWrapper$Message interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { sendToTarget(): void; getTarget(): androidx.media3.common.util.HandlerWrapper });
            public constructor();
            public sendToTarget(): void;
            public getTarget(): androidx.media3.common.util.HandlerWrapper;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export abstract class LibraryLoader {
          public static class: java.lang.Class<androidx.media3.common.util.LibraryLoader>;
          public setLibraries(libraries: androidNative.Array<string>): void;
          public loadLibrary(param0: string): void;
          public constructor(libraries: androidNative.Array<string>);
          public isAvailable(): boolean;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class ListenerSet<T> extends java.lang.Object {
          public static class: java.lang.Class<androidx.media3.common.util.ListenerSet<any>>;
          public remove(this_: T): void;
          public flushEvents(): void;
          public sendEvent(eventFlag: number, event: androidx.media3.common.util.ListenerSet.Event<T>): void;
          public queueEvent(eventFlag: number, event: androidx.media3.common.util.ListenerSet.Event<T>): void;
          public clear(): void;
          public constructor(looper: globalAndroid.os.Looper, clock: androidx.media3.common.util.Clock, iterationFinishedEvent: androidx.media3.common.util.ListenerSet.IterationFinishedEvent<T>);
          public copy(looper: globalAndroid.os.Looper, iterationFinishedEvent: androidx.media3.common.util.ListenerSet.IterationFinishedEvent<T>): androidx.media3.common.util.ListenerSet<T>;
          public copy(
            looper: globalAndroid.os.Looper,
            clock: androidx.media3.common.util.Clock,
            iterationFinishedEvent: androidx.media3.common.util.ListenerSet.IterationFinishedEvent<T>
          ): androidx.media3.common.util.ListenerSet<T>;
          public size(): number;
          public release(): void;
          public add(listener: T): void;
          /** @deprecated */
          public setThrowsWhenUsingWrongThread(throwsWhenUsingWrongThread: boolean): void;
        }
        export module ListenerSet {
          export class Event<T> extends java.lang.Object {
            public static class: java.lang.Class<androidx.media3.common.util.ListenerSet.Event<any>>;
            /**
             * Constructs a new instance of the androidx.media3.common.util.ListenerSet$Event interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { invoke(param0: T): void });
            public constructor();
            public invoke(param0: T): void;
          }
          export class IterationFinishedEvent<T> extends java.lang.Object {
            public static class: java.lang.Class<androidx.media3.common.util.ListenerSet.IterationFinishedEvent<any>>;
            /**
             * Constructs a new instance of the androidx.media3.common.util.ListenerSet$IterationFinishedEvent interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { invoke(param0: T, param1: androidx.media3.common.FlagSet): void });
            public constructor();
            public invoke(param0: T, param1: androidx.media3.common.FlagSet): void;
          }
          export class ListenerHolder<T> extends java.lang.Object {
            public static class: java.lang.Class<androidx.media3.common.util.ListenerSet.ListenerHolder<any>>;
            public listener: T;
            public equals(other: any): boolean;
            public iterationFinished(this_: androidx.media3.common.util.ListenerSet.IterationFinishedEvent<T>): void;
            public hashCode(): number;
            public release(event: androidx.media3.common.util.ListenerSet.IterationFinishedEvent<T>): void;
            public constructor(listener: T);
            public invoke(eventFlag: number, event: androidx.media3.common.util.ListenerSet.Event<T>): void;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class Log {
          public static class: java.lang.Class<androidx.media3.common.util.Log>;
          public static LOG_LEVEL_ALL: number = 0;
          public static LOG_LEVEL_INFO: number = 1;
          public static LOG_LEVEL_WARNING: number = 2;
          public static LOG_LEVEL_ERROR: number = 3;
          public static LOG_LEVEL_OFF: number = 2147483647;
          public static setLogStackTraces(logStackTraces: boolean): void;
          public static w(tag: string, message: string, throwable: java.lang.Throwable): void;
          public static e(tag: string, message: string): void;
          public static w(tag: string, message: string): void;
          public static d(tag: string, message: string, throwable: java.lang.Throwable): void;
          public static i(tag: string, message: string, throwable: java.lang.Throwable): void;
          public static setLogLevel(logLevel: number): void;
          public static appendThrowableString(message: string, throwable: java.lang.Throwable): string;
          public static getLogLevel(): number;
          public static d(tag: string, message: string): void;
          public static e(tag: string, message: string, throwable: java.lang.Throwable): void;
          public static getThrowableString(throwable: java.lang.Throwable): string;
          public static setLogger(logger: androidx.media3.common.util.Log.Logger): void;
          public static i(tag: string, message: string): void;
        }
        export module Log {
          export class LogLevel {
            public static class: java.lang.Class<androidx.media3.common.util.Log.LogLevel>;
            /**
             * Constructs a new instance of the androidx.media3.common.util.Log$LogLevel interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
          export class Logger {
            public static class: java.lang.Class<androidx.media3.common.util.Log.Logger>;
            /**
             * Constructs a new instance of the androidx.media3.common.util.Log$Logger interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {
              d(param0: string, param1: string, param2: java.lang.Throwable): void;
              i(param0: string, param1: string, param2: java.lang.Throwable): void;
              w(param0: string, param1: string, param2: java.lang.Throwable): void;
              e(param0: string, param1: string, param2: java.lang.Throwable): void;
              '<clinit>'(): void;
            });
            public constructor();
            public static DEFAULT: androidx.media3.common.util.Log.Logger;
            public d(param0: string, param1: string, param2: java.lang.Throwable): void;
            public e(param0: string, param1: string, param2: java.lang.Throwable): void;
            public w(param0: string, param1: string, param2: java.lang.Throwable): void;
            public i(param0: string, param1: string, param2: java.lang.Throwable): void;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class LongArray {
          public static class: java.lang.Class<androidx.media3.common.util.LongArray>;
          public get(index: number): number;
          public constructor();
          public constructor(initialCapacity: number);
          public add(value: number): void;
          public size(): number;
          public toArray(): androidNative.Array<number>;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class LongArrayQueue {
          public static class: java.lang.Class<androidx.media3.common.util.LongArrayQueue>;
          public static DEFAULT_INITIAL_CAPACITY: number = 16;
          public constructor(minCapacity: number);
          public isEmpty(): boolean;
          public constructor();
          public add(value: number): void;
          public element(): number;
          public clear(): void;
          public size(): number;
          public remove(): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class MediaFormatUtil {
          public static class: java.lang.Class<androidx.media3.common.util.MediaFormatUtil>;
          public static KEY_PIXEL_WIDTH_HEIGHT_RATIO_FLOAT: string = 'exo-pixel-width-height-ratio-float';
          public static KEY_PCM_ENCODING_EXTENDED: string = 'exo-pcm-encoding-int';
          public static KEY_MAX_BIT_RATE: string = 'max-bitrate';
          public static getColorInfo(mediaFormat: globalAndroid.media.MediaFormat): androidx.media3.common.ColorInfo;
          public static getFloat(mediaFormat: globalAndroid.media.MediaFormat, name: string, defaultValue: number): number;
          public static maybeSetFloat(format: globalAndroid.media.MediaFormat, key: string, value: number): void;
          public static maybeSetByteBuffer(format: globalAndroid.media.MediaFormat, key: string, value: androidNative.Array<number>): void;
          public static getInteger(mediaFormat: globalAndroid.media.MediaFormat, name: string, defaultValue: number): number;
          public static createFormatFromMediaFormat(csdByteBuffer: globalAndroid.media.MediaFormat): androidx.media3.common.Format;
          public static getTimeLapseFrameRate(format: globalAndroid.media.MediaFormat): java.lang.Integer;
          public static isAudioFormat(mediaFormat: globalAndroid.media.MediaFormat): boolean;
          public static getArray(byteBuffer: java.nio.ByteBuffer): androidNative.Array<number>;
          public static setCsdBuffers(i: globalAndroid.media.MediaFormat, format: java.util.List<androidNative.Array<number>>): void;
          public static isVideoFormat(mediaFormat: globalAndroid.media.MediaFormat): boolean;
          public static createMediaFormatFromFormat(format: androidx.media3.common.Format): globalAndroid.media.MediaFormat;
          public static maybeSetColorInfo(format: globalAndroid.media.MediaFormat, colorInfo: androidx.media3.common.ColorInfo): void;
          public static maybeSetString(format: globalAndroid.media.MediaFormat, key: string, value: string): void;
          public static maybeSetInteger(format: globalAndroid.media.MediaFormat, key: string, value: number): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class NetworkTypeObserver {
          public static class: java.lang.Class<androidx.media3.common.util.NetworkTypeObserver>;
          public static resetForTests(): void;
          public register(listener: androidx.media3.common.util.NetworkTypeObserver.Listener): void;
          public getNetworkType(): number;
          public static getInstance(context: globalAndroid.content.Context): androidx.media3.common.util.NetworkTypeObserver;
        }
        export module NetworkTypeObserver {
          export class Api31 {
            public static class: java.lang.Class<androidx.media3.common.util.NetworkTypeObserver.Api31>;
            public static disambiguate4gAnd5gNsa(telephonyManager: globalAndroid.content.Context, callback: androidx.media3.common.util.NetworkTypeObserver): void;
          }
          export module Api31 {
            export class DisplayInfoCallback {
              public static class: java.lang.Class<androidx.media3.common.util.NetworkTypeObserver.Api31.DisplayInfoCallback>;
              public constructor(instance: androidx.media3.common.util.NetworkTypeObserver);
              public onDisplayInfoChanged(telephonyDisplayInfo: globalAndroid.telephony.TelephonyDisplayInfo): void;
            }
          }
          export class Listener {
            public static class: java.lang.Class<androidx.media3.common.util.NetworkTypeObserver.Listener>;
            /**
             * Constructs a new instance of the androidx.media3.common.util.NetworkTypeObserver$Listener interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: { onNetworkTypeChanged(param0: number): void });
            public constructor();
            public onNetworkTypeChanged(param0: number): void;
          }
          export class Receiver {
            public static class: java.lang.Class<androidx.media3.common.util.NetworkTypeObserver.Receiver>;
            public onReceive(context: globalAndroid.content.Context, intent: globalAndroid.content.Intent): void;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class NonNullApi {
          public static class: java.lang.Class<androidx.media3.common.util.NonNullApi>;
          /**
           * Constructs a new instance of the androidx.media3.common.util.NonNullApi interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class NotificationUtil {
          public static class: java.lang.Class<androidx.media3.common.util.NotificationUtil>;
          public static IMPORTANCE_UNSPECIFIED: number = -1000;
          public static IMPORTANCE_NONE: number = 0;
          public static IMPORTANCE_MIN: number = 1;
          public static IMPORTANCE_LOW: number = 2;
          public static IMPORTANCE_DEFAULT: number = 3;
          public static IMPORTANCE_HIGH: number = 4;
          public static createNotificationChannel(notificationManager: globalAndroid.content.Context, channel: string, context: number, id: number, nameResourceId: number): void;
          public static setNotification(context: globalAndroid.content.Context, id: number, notification: globalAndroid.app.Notification): void;
        }
        export module NotificationUtil {
          export class Importance {
            public static class: java.lang.Class<androidx.media3.common.util.NotificationUtil.Importance>;
            /**
             * Constructs a new instance of the androidx.media3.common.util.NotificationUtil$Importance interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class NullableType {
          public static class: java.lang.Class<androidx.media3.common.util.NullableType>;
          /**
           * Constructs a new instance of the androidx.media3.common.util.NullableType interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class ParsableBitArray {
          public static class: java.lang.Class<androidx.media3.common.util.ParsableBitArray>;
          public data: androidNative.Array<number>;
          public getBytePosition(): number;
          public reset(data: androidNative.Array<number>, limit: number): void;
          public skipBytes(length: number): void;
          public readBytesAsString(length: number): string;
          public skipBit(): void;
          public constructor(data: androidNative.Array<number>);
          public bitsLeft(): number;
          public constructor(data: androidNative.Array<number>, limit: number);
          public setPosition(position: number): void;
          public readBits(this_: androidNative.Array<number>, buffer: number, offset: number): void;
          public readBytesAsString(length: number, charset: java.nio.charset.Charset): string;
          public readBitsToLong(numBits: number): number;
          public byteAlign(): void;
          public readBytes(buffer: androidNative.Array<number>, offset: number, length: number): void;
          public skipBits(numBits: number): void;
          public constructor();
          public readBits(numBits: number): number;
          public reset(data: androidNative.Array<number>): void;
          public reset(parsableByteArray: androidx.media3.common.util.ParsableByteArray): void;
          public getPosition(): number;
          public readBit(): boolean;
          public putInt(value: number, numBits: number): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class ParsableByteArray {
          public static class: java.lang.Class<androidx.media3.common.util.ParsableByteArray>;
          public readBytes(buffer: java.nio.ByteBuffer, length: number): void;
          public readLine(): string;
          public readShort(): number;
          public constructor();
          public reset(limit: number): void;
          public reset(data: androidNative.Array<number>): void;
          public skipBytes(bytes: number): void;
          public readLittleEndianInt(): number;
          public getData(): androidNative.Array<number>;
          public readLittleEndianUnsignedInt(): number;
          public readString(length: number): string;
          public readString(length: number, charset: java.nio.charset.Charset): string;
          public readUnsignedByte(): number;
          public readUnsignedIntToInt(): number;
          public reset(data: androidNative.Array<number>, limit: number): void;
          public peekUnsignedByte(): number;
          public readLittleEndianInt24(): number;
          public ensureCapacity(requiredCapacity: number): void;
          public readUnsignedShort(): number;
          public readLittleEndianShort(): number;
          public readUtfCharsetFromBom(): java.nio.charset.Charset;
          public readUnsignedFixedPoint1616(): number;
          public readLittleEndianUnsignedShort(): number;
          public constructor(limit: number);
          public readUnsignedLongToLong(): number;
          public getPosition(): number;
          public readUnsignedInt(): number;
          public readLong(): number;
          public constructor(data: androidNative.Array<number>);
          public readInt24(): number;
          public readDelimiterTerminatedString(delimiter: string): string;
          public readUtf8EncodedLong(): number;
          public constructor(data: androidNative.Array<number>, limit: number);
          public setPosition(position: number): void;
          public readUnsignedInt24(): number;
          public readBytes(buffer: androidNative.Array<number>, offset: number, length: number): void;
          public readNullTerminatedString(): string;
          public readLittleEndianUnsignedIntToInt(): number;
          public readBytes(bitArray: androidx.media3.common.util.ParsableBitArray, length: number): void;
          public readLittleEndianUnsignedInt24(): number;
          public readLittleEndianLong(): number;
          public readLine(charset: java.nio.charset.Charset): string;
          public readFloat(): number;
          public readSynchSafeInt(): number;
          public readNullTerminatedString(length: number): string;
          public readInt(): number;
          public capacity(): number;
          public peekChar(): string;
          public setLimit(limit: number): void;
          public peekChar(charset: java.nio.charset.Charset): string;
          public readDouble(): number;
          public bytesLeft(): number;
          public limit(): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class RepeatModeUtil {
          public static class: java.lang.Class<androidx.media3.common.util.RepeatModeUtil>;
          public static REPEAT_TOGGLE_MODE_NONE: number = 0;
          public static REPEAT_TOGGLE_MODE_ONE: number = 1;
          public static REPEAT_TOGGLE_MODE_ALL: number = 2;
          public static isRepeatModeEnabled(repeatMode: number, enabledModes: number): boolean;
          public static getNextRepeatMode(proposedMode: number, offset: number): number;
        }
        export module RepeatModeUtil {
          export class RepeatToggleModes {
            public static class: java.lang.Class<androidx.media3.common.util.RepeatModeUtil.RepeatToggleModes>;
            /**
             * Constructs a new instance of the androidx.media3.common.util.RepeatModeUtil$RepeatToggleModes interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
             */
            public constructor(implementation: {});
            public constructor();
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export abstract class RunnableFutureTask<R, E> extends java.util.concurrent.RunnableFuture<any> {
          public static class: java.lang.Class<androidx.media3.common.util.RunnableFutureTask<any, any>>;
          public doWork(): any;
          public get(): any;
          public blockUntilStarted(): void;
          public isDone(): boolean;
          public constructor();
          public isCancelled(): boolean;
          public run(): void;
          public get(timeout: number, unit: java.util.concurrent.TimeUnit): any;
          public cancel(this_: boolean): boolean;
          public cancelWork(): void;
          public blockUntilFinished(): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class Size {
          public static class: java.lang.Class<androidx.media3.common.util.Size>;
          public static UNKNOWN: androidx.media3.common.util.Size;
          public static ZERO: androidx.media3.common.util.Size;
          public toString(): string;
          public equals(this_: any): boolean;
          public getHeight(): number;
          public getWidth(): number;
          public hashCode(): number;
          public constructor(width: number, height: number);
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class SystemClock extends androidx.media3.common.util.Clock {
          public static class: java.lang.Class<androidx.media3.common.util.SystemClock>;
          public createHandler(looper: globalAndroid.os.Looper, callback: globalAndroid.os.Handler.Callback): androidx.media3.common.util.HandlerWrapper;
          public onThreadBlocked(): void;
          public constructor();
          public elapsedRealtime(): number;
          public uptimeMillis(): number;
          public currentTimeMillis(): number;
          public createHandler(param0: globalAndroid.os.Looper, param1: globalAndroid.os.Handler.Callback): androidx.media3.common.util.HandlerWrapper;
          public nanoTime(): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class SystemHandlerWrapper extends androidx.media3.common.util.HandlerWrapper {
          public static class: java.lang.Class<androidx.media3.common.util.SystemHandlerWrapper>;
          public postAtFrontOfQueue(param0: java.lang.Runnable): boolean;
          public obtainMessage(param0: number, param1: any): androidx.media3.common.util.HandlerWrapper.Message;
          public post(runnable: java.lang.Runnable): boolean;
          public post(param0: java.lang.Runnable): boolean;
          public obtainMessage(param0: number, param1: number, param2: number, param3: any): androidx.media3.common.util.HandlerWrapper.Message;
          public getLooper(): globalAndroid.os.Looper;
          public obtainMessage(what: number): androidx.media3.common.util.HandlerWrapper.Message;
          public removeCallbacksAndMessages(token: any): void;
          public removeMessages(param0: number): void;
          public postDelayed(runnable: java.lang.Runnable, delayMs: number): boolean;
          public sendEmptyMessageAtTime(what: number, uptimeMs: number): boolean;
          public removeCallbacksAndMessages(param0: any): void;
          public obtainMessage(param0: number, param1: number, param2: number): androidx.media3.common.util.HandlerWrapper.Message;
          public obtainMessage(what: number, arg1: number, arg2: number, obj: any): androidx.media3.common.util.HandlerWrapper.Message;
          public sendMessageAtFrontOfQueue(param0: androidx.media3.common.util.HandlerWrapper.Message): boolean;
          public sendEmptyMessageDelayed(param0: number, param1: number): boolean;
          public removeMessages(what: number): void;
          public hasMessages(param0: number): boolean;
          public obtainMessage(param0: number): androidx.media3.common.util.HandlerWrapper.Message;
          public sendMessageAtFrontOfQueue(message: androidx.media3.common.util.HandlerWrapper.Message): boolean;
          public sendEmptyMessageAtTime(param0: number, param1: number): boolean;
          public constructor(handler: globalAndroid.os.Handler);
          public sendEmptyMessage(what: number): boolean;
          public hasMessages(what: number): boolean;
          public postDelayed(param0: java.lang.Runnable, param1: number): boolean;
          public postAtFrontOfQueue(runnable: java.lang.Runnable): boolean;
          public sendEmptyMessageDelayed(what: number, delayMs: number): boolean;
          public obtainMessage(what: number, obj: any): androidx.media3.common.util.HandlerWrapper.Message;
          public sendEmptyMessage(param0: number): boolean;
          public obtainMessage(what: number, arg1: number, arg2: number): androidx.media3.common.util.HandlerWrapper.Message;
        }
        export module SystemHandlerWrapper {
          export class SystemMessage extends androidx.media3.common.util.HandlerWrapper.Message {
            public static class: java.lang.Class<androidx.media3.common.util.SystemHandlerWrapper.SystemMessage>;
            public sendAtFrontOfQueue(handler: globalAndroid.os.Handler): boolean;
            public sendToTarget(): void;
            public setMessage(message: globalAndroid.os.Message, handler: androidx.media3.common.util.SystemHandlerWrapper): androidx.media3.common.util.SystemHandlerWrapper.SystemMessage;
            public getTarget(): androidx.media3.common.util.HandlerWrapper;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class TimedValueQueue<V> extends java.lang.Object {
          public static class: java.lang.Class<androidx.media3.common.util.TimedValueQueue<any>>;
          public constructor(initialBufferSize: number);
          public poll(timestamp: number): V;
          public constructor();
          public pollFirst(): V;
          public clear(): void;
          public size(): number;
          public add(timestamp: number, value: V): void;
          public pollFloor(timestamp: number): V;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class TimestampAdjuster {
          public static class: java.lang.Class<androidx.media3.common.util.TimestampAdjuster>;
          public static MODE_NO_OFFSET: number = 9223372036854775807;
          public static MODE_SHARED: number = 9223372036854775806;
          public getTimestampOffsetUs(): number;
          public static usToNonWrappedPts(us: number): number;
          public constructor(firstSampleTimestampUs: number);
          public isInitialized(): boolean;
          public adjustTsTimestampGreaterThanPreviousTimestamp(wrapCount: number): number;
          public sharedInitializeOrWait(waitStartingTimeMs: boolean, totalWaitDurationMs: number, remainingTimeoutMs: number): void;
          public getFirstSampleTimestampUs(): number;
          public static usToWrappedPts(us: number): number;
          public getLastAdjustedTimestampUs(): number;
          public static ptsToUs(pts: number): number;
          public reset(firstSampleTimestampUs: number): void;
          public adjustTsTimestamp(closestWrapCount: number): number;
          public adjustSampleTimestamp(this_: number): number;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class TimestampIterator {
          public static class: java.lang.Class<androidx.media3.common.util.TimestampIterator>;
          /**
           * Constructs a new instance of the androidx.media3.common.util.TimestampIterator interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: { hasNext(): boolean; next(): number; copyOf(): androidx.media3.common.util.TimestampIterator });
          public constructor();
          public next(): number;
          public hasNext(): boolean;
          public copyOf(): androidx.media3.common.util.TimestampIterator;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class TraceUtil {
          public static class: java.lang.Class<androidx.media3.common.util.TraceUtil>;
          public static beginSection(sectionName: string): void;
          public static endSection(): void;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class UnknownNull {
          public static class: java.lang.Class<androidx.media3.common.util.UnknownNull>;
          /**
           * Constructs a new instance of the androidx.media3.common.util.UnknownNull interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class UnstableApi {
          public static class: java.lang.Class<androidx.media3.common.util.UnstableApi>;
          /**
           * Constructs a new instance of the androidx.media3.common.util.UnstableApi interface with the provided implementation. An empty constructor exists calling super() when extending the interface class.
           */
          public constructor(implementation: {});
          public constructor();
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class UriUtil {
          public static class: java.lang.Class<androidx.media3.common.util.UriUtil>;
          public static resolve(baseLimit: string, lastSlashIndex: string): string;
          public static removeQueryParameter(value: globalAndroid.net.Uri, key: string): globalAndroid.net.Uri;
          public static getRelativePath(i: globalAndroid.net.Uri, i: globalAndroid.net.Uri): string;
          public static resolveToUri(baseUri: string, referenceUri: string): globalAndroid.net.Uri;
          public static isAbsolute(uri: string): boolean;
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class Util {
          public static class: java.lang.Class<androidx.media3.common.util.Util>;
          public static SDK_INT: number;
          public static DEVICE: string;
          public static MANUFACTURER: string;
          public static MODEL: string;
          public static DEVICE_DEBUG_INFO: string;
          public static EMPTY_BYTE_ARRAY: androidNative.Array<number>;
          public static EMPTY_LONG_ARRAY: androidNative.Array<number>;
          public static constrainValue(value: number, min: number, max: number): number;
          public static createHandlerForCurrentOrMainLooper(): globalAndroid.os.Handler;
          public static newSingleThreadScheduledExecutor(threadName: string): java.util.concurrent.ScheduledExecutorService;
          public static handlePauseButtonAction(player: androidx.media3.common.Player): boolean;
          public static parseXsDateTime(timezoneShift: string): number;
          public static sneakyThrow(t: java.lang.Throwable): void;
          public static gzip(os: androidNative.Array<number>): androidNative.Array<number>;
          public static toInteger(bytes: androidNative.Array<number>): number;
          public static getDrmUuid(e: string): java.util.UUID;
          public static crc32(i: androidNative.Array<number>, bytes: number, start: number, end: number): number;
          public static durationUsToSampleCount(durationUs: number, sampleRate: number): number;
          public static nullSafeArrayCopyOfRange(input: androidNative.Array<any>, from: number, to: number): androidNative.Array<any>;
          public static getFormatSupportString(formatSupport: number): string;
          public static getApiLevelThatAudioFormatIntroducedAudioEncoding(encoding: number): number;
          public static handlePlayButtonAction(player: androidx.media3.common.Player): boolean;
          public static minValue(i: globalAndroid.util.SparseLongArray): number;
          public static checkCleartextTrafficPermitted(i: androidNative.Array<androidx.media3.common.MediaItem>): boolean;
          /** @deprecated */
          public static getAudioContentTypeForStreamType(streamType: number): number;
          public static shouldShowPlayButton(player: androidx.media3.common.Player, playIfSuppressed: boolean): boolean;
          public static isRunningOnEmulator(): boolean;
          public static crc16(value: androidNative.Array<number>, i: number, bytes: number, start: number): number;
          public static setForegroundServiceNotification(
            service: globalAndroid.app.Service,
            notificationId: number,
            notification: globalAndroid.app.Notification,
            foregroundServiceType: number,
            foregroundServiceManifestType: string
          ): void;
          public static maxValue(i: globalAndroid.util.SparseLongArray): number;
          public static postOrRun(handler: globalAndroid.os.Handler, runnable: java.lang.Runnable): boolean;
          public static postOrRunWithCompletion(handler: globalAndroid.os.Handler, runnable: java.lang.Runnable, successValue: any): com.google.common.util.concurrent.ListenableFuture;
          public static generateAudioSessionIdV21(context: globalAndroid.content.Context): number;
          /** @deprecated */
          public static inferContentType(fileName: string): number;
          public static contains(sparseArray: globalAndroid.util.SparseArray<any>, key: number): boolean;
          public static fixSmoothStreamingIsmManifestUri(uri: globalAndroid.net.Uri): globalAndroid.net.Uri;
          public static getUserAgent(packageName: globalAndroid.content.Context, info: string): string;
          public static getErrorCodeForMediaDrmErrorCode(mediaDrmErrorCode: number): number;
          public static binarySearchCeil(listSize: java.util.List<any>, list: java.lang.Comparable<any>, value: boolean, inclusive: boolean): number;
          public static createTempFile(context: globalAndroid.content.Context, prefix: string): java.io.File;
          public static getIntegerCodeForString(i: string): number;
          public static crc8(i: androidNative.Array<number>, bytes: number, start: number, end: number): number;
          public static scaleLargeValuesInPlace(i: androidNative.Array<number>, divisionFactor: number, i: number, multiplicationFactor: java.math.RoundingMode): void;
          public static createTempDirectory(context: globalAndroid.content.Context, prefix: string): java.io.File;
          public static ceilDivide(numerator: number, denominator: number): number;
          public static getBigEndianInt(buffer: java.nio.ByteBuffer, index: number): number;
          public static toByteArray(inputStream: java.io.InputStream): androidNative.Array<number>;
          public static newSingleThreadExecutor(threadName: string): java.util.concurrent.ExecutorService;
          public static binarySearchFloor(list: java.util.List<any>, value: java.lang.Comparable<any>, inclusive: boolean, stayInBounds: boolean): number;
          public static getCodecCountOfType(codec: string, codecs: number): number;
          public static getAudioUsageForStreamType(streamType: number): number;
          public static shouldShowPlayButton(player: androidx.media3.common.Player): boolean;
          public static inferContentType(contentType: globalAndroid.net.Uri): number;
          public static scaleLargeTimestampsInPlace(timestamps: androidNative.Array<number>, multiplier: number, divisor: number): void;
          public static getMediaDurationForPlayoutDuration(playoutDuration: number, speed: number): number;
          public static startForegroundService(context: globalAndroid.content.Context, intent: globalAndroid.content.Intent): globalAndroid.content.ComponentName;
          public static writeBoolean(parcel: globalAndroid.os.Parcel, value: boolean): void;
          public static isEncodingHighResolutionPcm(encoding: number): boolean;
          public static toUnsignedLong(x: number): number;
          public static getErrorCodeFromPlatformDiagnosticsInfo(errorCode: string): number;
          public static inferContentTypeForExtension(fileExtension: string): number;
          public static getDefaultDisplayLocale(): java.util.Locale;
          public static getUtf8Bytes(value: string): androidNative.Array<number>;
          public static transformFutureAsync(
            future: com.google.common.util.concurrent.ListenableFuture,
            transformFunction: com.google.common.util.concurrent.AsyncFunction
          ): com.google.common.util.concurrent.ListenableFuture;
          public static getSystemLanguageCodes(): androidNative.Array<string>;
          public static toHexString(i: androidNative.Array<number>): string;
          /** @deprecated */
          public static maybeRequestReadExternalStoragePermission(uri: globalAndroid.app.Activity, activity: androidNative.Array<globalAndroid.net.Uri>): boolean;
          public static getPcmFrameSize(pcmEncoding: number, channelCount: number): number;
          public static scaleLargeValues(i: java.util.List<java.lang.Long>, divisionFactor: number, i: number, multiplicationFactor: java.math.RoundingMode): androidNative.Array<number>;
          public static createHandlerForCurrentLooper(): globalAndroid.os.Handler;
          public static removeRange(list: java.util.List<any>, fromIndex: number, toIndex: number): void;
          public static getCurrentOrMainLooper(): globalAndroid.os.Looper;
          public static getCodecsOfType(codec: string, codecs: number): string;
          public static getPcmFormat(pcmEncoding: number, channels: number, sampleRate: number): androidx.media3.common.Format;
          public static createHandlerForCurrentOrMainLooper(callback: globalAndroid.os.Handler.Callback): globalAndroid.os.Handler;
          public static getAdaptiveMimeTypeForContentType(contentType: number): string;
          public static getPlayoutDurationForMediaDuration(mediaDuration: number, speed: number): number;
          public static escapeFileName(i: string): string;
          public static fromUtf8Bytes(bytes: androidNative.Array<number>): string;
          public static inflate(outputSize: androidx.media3.common.util.ParsableByteArray, e: androidx.media3.common.util.ParsableByteArray, input: java.util.zip.Inflater): boolean;
          public static getCountryCode(countryCode: globalAndroid.content.Context): string;
          public static linearSearch(i: androidNative.Array<number>, array: number): number;
          public static nullSafeListToArray(list: java.util.List<any>, array: androidNative.Array<any>): void;
          public static readBoolean(parcel: globalAndroid.os.Parcel): boolean;
          public static getDrawable(context: globalAndroid.content.Context, resources: globalAndroid.content.res.Resources, drawableRes: number): globalAndroid.graphics.drawable.Drawable;
          public static toLong(mostSignificantBits: number, leastSignificantBits: number): number;
          public static loadAsset(context: globalAndroid.content.Context, assetPath: string): string;
          public static getStreamTypeForAudioUsage(usage: number): number;
          public static createReadOnlyByteBuffer(byteBuffer: java.nio.ByteBuffer): java.nio.ByteBuffer;
          public static isWear(context: globalAndroid.content.Context): boolean;
          public static getRoleFlagStrings(roleFlags: number): java.util.List<string>;
          public static getSelectionFlagStrings(selectionFlags: number): java.util.List<string>;
          public static getAudioFormat(sampleRate: number, channelConfig: number, encoding: number): globalAndroid.media.AudioFormat;
          public static getMaxPendingFramesCountForMediaCodecDecoders(context: globalAndroid.content.Context): number;
          public static isFrameDropAllowedOnSurfaceInput(context: globalAndroid.content.Context): boolean;
          public static compareLong(left: number, right: number): number;
          public static isAutomotive(context: globalAndroid.content.Context): boolean;
          public static getCurrentDisplayModeSize(width: globalAndroid.content.Context, height: globalAndroid.view.Display): globalAndroid.graphics.Point;
          public static contentEquals(key: globalAndroid.util.SparseArray<any>, index: globalAndroid.util.SparseArray<any>): boolean;
          public static normalizeLanguageCode(language: string): string;
          public static nullSafeArrayAppend(original: androidNative.Array<any>, newElement: any): androidNative.Array<any>;
          public static toByteArray(value: number): androidNative.Array<number>;
          public static createHandlerForCurrentLooper(callback: globalAndroid.os.Handler.Callback): globalAndroid.os.Handler;
          public static binarySearchFloor(midIndex: androidx.media3.common.util.LongArray, longArray: number, value: boolean, inclusive: boolean): number;
          public static getCurrentDisplayModeSize(displayManager: globalAndroid.content.Context): globalAndroid.graphics.Point;
          public static closeQuietly(closeable: java.io.Closeable): void;
          public static getAudioTrackChannelConfig(channelCount: number): number;
          public static getNowUnixTimeMs(elapsedRealtimeEpochOffsetMs: number): number;
          public static msToUs(timeMs: number): number;
          public static contentHashCode(index: globalAndroid.util.SparseArray<any>): number;
          public static getAvailableCommands(player: androidx.media3.common.Player, permanentAvailableCommands: androidx.media3.common.Player.Commands): androidx.media3.common.Player.Commands;
          public static isLinebreak(c: number): boolean;
          public static getTrackTypeString(trackType: number): string;
          public static nullSafeArrayConcatenation(first: androidNative.Array<any>, second: androidNative.Array<any>): androidNative.Array<any>;
          public static splitAtFirst(value: string, regex: string): androidNative.Array<string>;
          public static tableExists(database: globalAndroid.database.sqlite.SQLiteDatabase, tableName: string): boolean;
          public static scaleLargeTimestamps(timestamps: java.util.List<java.lang.Long>, multiplier: number, divisor: number): androidNative.Array<number>;
          public static getDataUriForString(mimeType: string, data: string): globalAndroid.net.Uri;
          public static toByteArray(byteArray: androidNative.Array<number>): androidNative.Array<number>;
          public static scaleLargeValue(divisionFactor: number, multiplicationFactor: number, divisionFactor: number, multiplicationFactor: java.math.RoundingMode): number;
          public static getPcmEncoding(bitDepth: number): number;
          public static createHandler(looper: globalAndroid.os.Looper, callback: globalAndroid.os.Handler.Callback): globalAndroid.os.Handler;
          public static scaleLargeTimestamp(timestamp: number, multiplier: number, divisor: number): number;
          public static usToMs(timeUs: number): number;
          public static getPcmFormat(audioFormat: androidx.media3.common.audio.AudioProcessor.AudioFormat): androidx.media3.common.Format;
          public static getStringForTime(builder: java.lang.StringBuilder, formatter: java.util.Formatter, timeMs: number): string;
          public static isBitmapFactorySupportedMimeType(mimeType: string): boolean;
          public static fromUtf8Bytes(bytes: androidNative.Array<number>, offset: number, length: number): string;
          public static isEncodingLinearPcm(encoding: number): boolean;
          public static castNonNullTypeArray(value: androidNative.Array<any>): androidNative.Array<any>;
          public static handlePlayPauseButtonAction(player: androidx.media3.common.Player): boolean;
          /** @deprecated */
          public static maybeRequestReadExternalStoragePermission(activity: globalAndroid.app.Activity, mediaItems: androidNative.Array<androidx.media3.common.MediaItem>): boolean;
          public static getCommaDelimitedSimpleClassNames(i: androidNative.Array<any>): string;
          public static addWithOverflowDefault(x: number, y: number, overflowResult: number): number;
          public static maybeRequestReadStoragePermission(i: globalAndroid.app.Activity, subtitleConfigs: androidNative.Array<androidx.media3.common.MediaItem>): boolean;
          /** @deprecated */
          public static inferContentType(uri: globalAndroid.net.Uri, overrideExtension: string): number;
          public static castNonNull(value: any): any;
          public static inferContentTypeForUriAndMimeType(uri: globalAndroid.net.Uri, mimeType: string): number;
          public static unescapeFileName(i: string): string;
          public static moveItems(i: java.util.List<any>, items: number, fromIndex: number, toIndex: number): void;
          public static contains(arrayItem: androidNative.Array<any>, items: any): boolean;
          public static isLocalFileUri(uri: globalAndroid.net.Uri): boolean;
          public static getLocaleLanguageTag(locale: java.util.Locale): string;
          public static areEqual(o1: any, o2: any): boolean;
          public static split(value: string, regex: string): androidNative.Array<string>;
          public static splitCodecs(codecs: string): androidNative.Array<string>;
          public static registerReceiverNotExported(
            context: globalAndroid.content.Context,
            receiver: globalAndroid.content.BroadcastReceiver,
            filter: globalAndroid.content.IntentFilter
          ): globalAndroid.content.Intent;
          public static nullSafeArrayCopy(input: androidNative.Array<any>, length: number): androidNative.Array<any>;
          public static handlePlayPauseButtonAction(player: androidx.media3.common.Player, playIfSuppressed: boolean): boolean;
          public static toFloat(bytes: androidNative.Array<number>): number;
          public static parseXsDuration(negated: string): number;
          public static sampleCountToDurationUs(sampleCount: number, sampleRate: number): number;
          public static getBytesFromHexString(stringOffset: string): androidNative.Array<number>;
          public static intToStringMaxRadix(i: number): string;
          public static subtractWithOverflowDefault(x: number, y: number, overflowResult: number): number;
          public static binarySearchFloor(array: androidNative.Array<number>, value: number, inclusive: boolean, stayInBounds: boolean): number;
          public static recursiveDelete(child: java.io.File): void;
          public static isTv(context: globalAndroid.content.Context): boolean;
          public static formatInvariant(format: string, args: androidNative.Array<any>): string;
          public static sum(summand: androidNative.Array<number>): number;
          public static binarySearchCeil(array: androidNative.Array<number>, value: number, inclusive: boolean, stayInBounds: boolean): number;
        }
        export module Util {
          export class Api21 {
            public static class: java.lang.Class<androidx.media3.common.util.Util.Api21>;
            public static getDrawable(context: globalAndroid.content.Context, resources: globalAndroid.content.res.Resources, res: number): globalAndroid.graphics.drawable.Drawable;
          }
          export class Api29 {
            public static class: java.lang.Class<androidx.media3.common.util.Util.Api29>;
            public static startForeground(
              e: globalAndroid.app.Service,
              mediaSessionService: number,
              notificationId: globalAndroid.app.Notification,
              notification: number,
              foregroundServiceType: string
            ): void;
          }
        }
      }
    }
  }
}

declare module androidx {
  export module media3 {
    export module common {
      export module util {
        export class XmlPullParserUtil {
          public static class: java.lang.Class<androidx.media3.common.util.XmlPullParserUtil>;
          public static isEndTag(xpp: org.xmlpull.v1.XmlPullParser, name: string): boolean;
          public static isStartTag(xpp: org.xmlpull.v1.XmlPullParser, name: string): boolean;
          public static isEndTag(xpp: org.xmlpull.v1.XmlPullParser): boolean;
          public static getAttributeValue(i: org.xmlpull.v1.XmlPullParser, xpp: string): string;
          public static isStartTag(xpp: org.xmlpull.v1.XmlPullParser): boolean;
          public static getAttributeValueIgnorePrefix(i: org.xmlpull.v1.XmlPullParser, xpp: string): string;
          public static isStartTagIgnorePrefix(xpp: org.xmlpull.v1.XmlPullParser, name: string): boolean;
        }
      }
    }
  }
}

//Generics information:
//androidx.media3.common.Bundleable.Creator:1
//androidx.media3.common.ErrorMessageProvider:1
//androidx.media3.common.util.Consumer:1
//androidx.media3.common.util.CopyOnWriteMultiset:1
//androidx.media3.common.util.ListenerSet:1
//androidx.media3.common.util.ListenerSet.Event:1
//androidx.media3.common.util.ListenerSet.IterationFinishedEvent:1
//androidx.media3.common.util.ListenerSet.ListenerHolder:1
//androidx.media3.common.util.RunnableFutureTask:2
//androidx.media3.common.util.TimedValueQueue:1
