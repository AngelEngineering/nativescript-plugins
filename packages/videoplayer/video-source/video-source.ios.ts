import { knownFolders, path as nsFilePath, Utils } from '@nativescript/core';
// import { CLog, CLogTypes } from '../common';

// leave the export so the functions in common are exported
export * from './video-source-common';

export class VideoSource {
  public ios: AVPlayerItem;
  height: any;
  width: any;

  public loadFromResource(name: string): boolean {
    console.log(`VideoSource.loadFromResource --- name ${name}`);
    const videoURL = NSBundle.mainBundle.URLForResourceWithExtension(name, null);
    const player = AVPlayerItem.playerItemWithURL(videoURL);
    this.ios = player;
    return this.ios != null;
  }

  public loadFromFile(path: string): boolean {
    console.log(`VideoSource.loadFromFile --- path ${path}`);
    let fileName = Utils.isString(path) ? path.trim() : '';

    if (fileName.indexOf('~/') === 0) {
      fileName = nsFilePath.join(knownFolders.currentApp().path, fileName.replace('~/', ''));
      console.log(`VideoSource.loadFromFile --- fileName ${fileName}`);
    }

    const videoURL = NSURL.fileURLWithPath(fileName);
    const player = AVPlayerItem.playerItemWithURL(videoURL);
    this.ios = player;
    return this.ios != null;
  }

  public loadFromUrl(url: string): boolean {
    console.log(`VideoSource.loadFromUrl --- url ${url}`);
    const videoURL = NSURL.URLWithString(url);
    const player = AVPlayerItem.playerItemWithURL(videoURL);
    this.ios = player;
    return this.ios != null;
  }

  public setNativeSource(source: any): boolean {
    console.log(`VideoSource.setNativeSource --- source ${source}`);
    this.ios = source;
    return source != null;
  }
}
