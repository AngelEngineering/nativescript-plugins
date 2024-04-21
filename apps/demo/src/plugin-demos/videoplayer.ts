import { Observable, EventData, Page, Frame, File, knownFolders } from '@nativescript/core';
import { DemoSharedVideoplayer } from '@demo/shared';
import { VideoPlayer } from '@angelengineering/videoplayer';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedVideoplayer {
  playmp4() {
    console.log('loading mp4');
    const player = Frame.topmost().getViewById('nsVideoPlayer') as VideoPlayer;
    console.log('player instance:', player);
    player.src = knownFolders.currentApp().path + '/video/mp4_example.mp4';
    const exampleFile = File.fromPath(player.src);
    console.log('example:', exampleFile, exampleFile?.size, exampleFile?.path);
    player.play();
  }
}
