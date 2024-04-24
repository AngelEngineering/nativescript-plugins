import { Observable, EventData, Page, path, Frame, File, knownFolders, isAndroid } from '@nativescript/core';
import { DemoSharedVideoplayer } from '@demo/shared';
import { VideoPlayer } from '@angelengineering/videoplayer';

let videoPlayer: VideoPlayer = null;

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export function navigatingFrom(args: EventData) {
  // const page = <Page>args.object;
  // const video: VideoPlayer = page.getViewById('nsVideoPlayer') as VideoPlayer;
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

  //attach the event handlers once after the VideoPlayer has been loaded
  videoPlayer.on(VideoPlayer.errorEvent, (args: EventData & { data?: any }) => {
    console.error('ERROR from VideoPlayer!', args.data);
  });

  videoPlayer.on(VideoPlayer.playbackReadyEvent, () => {
    console.log('duration', videoPlayer.getDuration()); //Note: on Android this will return 0 if no mp4 metadata exists
    let size = videoPlayer.getVideoSize();
    console.log('video size', size.width, size.height);
    videoPlayer.seekToTime(1000);
  });

  videoPlayer.on(VideoPlayer.seekToTimeCompleteEvent, () => {
    console.log('done seeking, getCurrentTime', videoPlayer.getCurrentTime());
    console.log('playing mp4');
    videoPlayer.play();
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

  //Note: this format will most likely fail on iOS and only work on some Android versions/devices
  playmkv() {
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
