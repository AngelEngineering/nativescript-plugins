/* eslint-disable @nx/enforce-module-boundaries */
import { isIOS, alert, EventData, Page, path, Frame, File, knownFolders, isAndroid } from '@nativescript/core';
import { DemoSharedVideoplayer } from '@demo/shared';
import { VideoPlayer } from '@angelengineering/videoplayer';

//store the videoPlayer reference here once component loaded
let videoPlayer: VideoPlayer = null;

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export function navigatingFrom(args: EventData) {
  if (videoPlayer) {
    if (!isAndroid) videoPlayer.pause();
    console.log('paused video');
    videoPlayer.destroy();
    console.log('destroyed player');
    videoPlayer = null;
  } else console.warn('Unable to clear video player when leaving page!');
}

export function onLoaded(args: EventData) {
  videoPlayer = Frame.topmost().getViewById('nsVideoPlayer') as VideoPlayer;

  //attach the event handlers once the VideoPlayer has been loaded
  videoPlayer.on(VideoPlayer.errorEvent, (args: EventData & { data?: any }) => {
    console.error('>> ERROR from VideoPlayer!', args.data);
  });
  videoPlayer.on(VideoPlayer.playbackReadyEvent, (args: EventData & { data?: any }) => {
    console.log('>> player is ready');
    console.log('>> duration', videoPlayer.getDuration()); //Note: on Android this will return 0 if no mp4 metadata exists
    let size = videoPlayer.getVideoSize();
    console.log('v>> ideo size', size.width, size.height);
    videoPlayer.seekToTime(1000);
  });
  videoPlayer.on(VideoPlayer.playbackFinishedEvent, (args: EventData & { data?: any }) => {
    console.log('>> player has finished');
  });
  videoPlayer.on(VideoPlayer.playbackStartedEvent, (args: EventData & { data?: any }) => {
    console.log('>> player has started playing');
  });

  //Note: Android and iOS have slightly different behaviors for this
  //	Android will detect this when using the slider control to change current playback position.
  //  iOS will not, and will only detect this when the seekToTime function is used.
  videoPlayer.on(VideoPlayer.seekToTimeCompleteEvent, (args: EventData & { data?: any }) => {
    console.log('>> player done seeking to time', args.data);
    console.log('>> getCurrentTime', videoPlayer.getCurrentTime());
    console.log('>> playing mp4');
    videoPlayer.play();
  });
  //Note: only triggered when the mute functions is called with true
  videoPlayer.on(VideoPlayer.mutedEvent, (args: EventData & { data?: any }) => {
    console.log('>> player has been muted');
  });
  //Note: only triggered when the mute property is called with false
  videoPlayer.on(VideoPlayer.unmutedEvent, (args: EventData & { data?: any }) => {
    console.log('>> player has been unmuted');
  });

  videoPlayer.on(VideoPlayer.pausedEvent, (args: EventData & { data?: any }) => {
    console.log('>> player has been paused');
  });
  videoPlayer.on(VideoPlayer.volumeSetEvent, (args: EventData & { data?: any }) => {
    console.log('>> player volume was changed');
  });

  //Note: Enable the property in the xml object if you want to test this
  videoPlayer.on(VideoPlayer.currentTimeUpdatedEvent, (args: EventData & { data?: any }) => {
    console.log('>> player time updated', args.data);
  });

  if (isIOS)
    videoPlayer.on(VideoPlayer.chaptersLoadedEvent, (args: EventData & { data?: any }) => {
      console.log('>> player has loaded chapters information from media', args.data);
    });
}

export class DemoModel extends DemoSharedVideoplayer {
  playmp4() {
    const player = Frame.topmost().getViewById('nsVideoPlayer') as VideoPlayer;
    player.src = null;

    const moviePath = path.normalize(knownFolders.currentApp().path + '/video/mp4_example.mp4');
    const exampleFile = File.fromPath(moviePath);
    console.log('mp4 example file size:', exampleFile?.size, ' path', exampleFile.path);
    //setting the src to a different source than currently loaded will kick off the event handlers
    console.log('loading mp4');
    player.src = moviePath;
    setTimeout(() => {
      console.log('>> getCurrentTime', videoPlayer.getCurrentTime());
      console.log('setting volume to 0.5');
      videoPlayer.setVolume(0.5);
    }, 2000);
    setTimeout(() => {
      console.log('>> getCurrentTime', videoPlayer.getCurrentTime());
      console.log('muting player');
      videoPlayer.mute(true);
    }, 3000);
    setTimeout(() => {
      console.log('>> getCurrentTime', videoPlayer.getCurrentTime());
      console.log('unmuting player');
      videoPlayer.mute(false);
    }, 4000);
  }

  playmov() {
    const player = Frame.topmost().getViewById('nsVideoPlayer') as VideoPlayer;
    player.src = null;

    const moviePath = path.normalize(knownFolders.currentApp().path + '/video/mov_example.mov');
    const exampleFile = File.fromPath(moviePath);
    console.log('mov example file size:', exampleFile?.size, ' path', exampleFile.path);
    //setting the src to a different source than currently loaded will kick off the event handlers
    console.log('loading mov');
    player.src = moviePath;
  }

  playmkv() {
    if (isIOS) {
      alert('FYI: This will most likely fail to load on iOS');
    }
    const player = Frame.topmost().getViewById('nsVideoPlayer') as VideoPlayer;
    player.src = null;

    const moviePath = path.normalize(knownFolders.currentApp().path + '/video/mkv_example.mkv');
    const exampleFile = File.fromPath(moviePath);
    console.log('mkv example file size:', exampleFile?.size, ' path', exampleFile.path);
    //setting the src to a different source than currently loaded will kick off the event handlers
    console.log('loading mkv');
    player.src = moviePath;
  }
}
