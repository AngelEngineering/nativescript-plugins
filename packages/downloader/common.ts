import { File, Observable, EventData } from '@nativescript/core';

export class DownloaderCommon extends Observable {
  download(options: DownloadOptions): Promise<File> {
    throw new Error('"download" has not been implemented');
  }
  public static DOWNLOAD_STARTED = 'download-started';
  public static DOWNLOAD_PROGRESS = 'download-progress';
  public static DOWNLOAD_COMPLETE = 'download-complete';
  public static DOWNLOAD_ERROR = 'download-error';
}

export interface RequestOptions {
  method?: string;
  headers?: Record<string, any>;
}

export interface DownloadOptions {
  url: string;
  request?: RequestOptions;
  destinationFilename?: string;
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
