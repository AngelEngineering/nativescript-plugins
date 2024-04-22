import { Observable, EventData, Page, path, Frame, File, knownFolders } from '@nativescript/core';
import { DemoSharedVideoplayer } from '@demo/shared';
import { VideoPlayer } from '@angelengineering/videoplayer';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export function navigatingFrom(args: EventData) {
  const page = <Page>args.object;
  const video: VideoPlayer = page.getViewById('nsVideoPlayer') as VideoPlayer;
  if (video) {
    if (!isAndroid) video.pause();
    console.log('paused video');
    video.destroy();
    console.log('destroyed player');
  } else console.warn('Unable to clear video player when leaving page!');
}
export class DemoModel extends DemoSharedVideoplayer {
  playmp4() {
    console.log('loading mp4');
    const player = Frame.topmost().getViewById('nsVideoPlayer') as VideoPlayer;
    player.src = path.normalize(knownFolders.currentApp().path + '/video/mp4_example.mp4');
    console.log('player source set to', path.normalize(knownFolders.currentApp().path + '/video/mp4_example.mp4'));
    const exampleFile = File.fromPath(player.src);
    console.log('mp4 example file:', exampleFile, exampleFile?.size, exampleFile?.path);
    player.play();
    console.log('playing mp4');
  }
}
