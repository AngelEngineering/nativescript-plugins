import { Application, knownFolders, path as nsFilePath, Utils } from '@nativescript/core';

// leave the export so the functions in common are exported
export * from './video-source-common';

export class VideoSource {
  public android: any; /// android.widget.VideoView;
  public ios: any;

  public loadFromResource(name: string): boolean {
    // console.log(`VideoSource.loadFromResource ---`, `name: ${name}`);
    this.android = null;
    const res = Utils.android.getApplicationContext().getResources();
    if (res) {
      const packageName = Application.android.context.getPackageName();
      const UrlPath = `android.resource://${packageName}/R.raw.${name}`;
      // console.log(`VideoSource.loadFromResource ---`, `UrlPath: ${UrlPath}`);
      this.android = UrlPath;
    }

    return this.android != null;
  }

  public loadFromUrl(url: string): boolean {
    // console.log(`VideoSource.loadFromUrl ---`, `url: ${url}`);
    this.android = null;
    this.android = url;
    return this.android != null;
  }

  public loadFromFile(path: string): boolean {
    // console.log(`VideoSource.loadFromFile ---`, `path: ${path}`);
    let fileName = Utils.isString(path) ? path.trim() : '';
    if (fileName.indexOf('~/') === 0) {
      fileName = nsFilePath.join(knownFolders.currentApp().path, fileName.replace('~/', ''));
      // console.log(`VideoSource.loadFromFile ---`, `fileName: ${fileName}`);
    }
    this.android = fileName;
    return this.android != null;
  }

  public setNativeSource(source: any): boolean {
    // console.log(`VideoSource.setNativeSource ---`, `source: ${source}`);
    this.android = source;
    return source != null;
  }

  get height(): number {
    if (this.android) {
      const h = this.android.getHeight();
      // console.log(`VideoSource.height --- returning ${h}`);
      return h;
    }
    return NaN;
  }

  get width(): number {
    if (this.android) {
      const w = this.android.getWidth();
      // console.log(`VideoSource.width --- returning ${w}`);
      return w;
    }
    return NaN;
  }
}
