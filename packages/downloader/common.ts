import { File, Observable, EventData } from '@nativescript/core';

export interface RequestOptions {
  method?: string;
  headers?: Record<string, any>;
}

export interface DownloadOptions {
  url: string;
  request?: RequestOptions;
  destinationPath?: string; //must be a valid path for a new file (existing directory and valid filename)
  destinationFilename?: string; //must be a string like XXXX[].YYYYYY] without any path preceding
  copyPicker?: boolean; //present user with UI to choose destination directory
  copyGallery?: boolean; //iOS only, if download has a recognized image/video file name extension, saved to iOS Photos, ignored on Android
  copyDownloads?: boolean; //Android only, uses legacy DIRECTORY_DOWNLOADS, or MediaStore for 29+
  notification?: boolean; //Android-only. Show system notification for download success/failure. defaults to false
}

export interface ResponseData {
  contentLength?: string;
  progress?: string;
  url?: string;
  destinationFilename?: string;
  filepath?: string;
  error?: string;
}

export type MessageData = EventData & { data: ResponseData };

export abstract class DownloaderCommon extends Observable {
  abstract download(options: DownloadOptions): Promise<File>;
  public static DOWNLOAD_STARTED = 'download-started';
  public static DOWNLOAD_PAUSED = 'download-paused'; //only on Android for now
  public static DOWNLOAD_PROGRESS = 'download-progress';
  public static DOWNLOAD_COMPLETE = 'download-complete';
  public static DOWNLOAD_ERROR = 'download-error';
}

export class Downloader extends DownloaderCommon {
  download(options: DownloadOptions): Promise<File> {
    throw new Error('"download" has not been implemented');
  }
}
