import { DownloaderCommon } from './common';
import { EventData, File } from '@nativescript/core';

export declare class Downloader extends DownloaderCommon {
  download(options: DownloadOptions): Promise<File>;
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
