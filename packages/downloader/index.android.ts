import { DownloaderCommon, DownloadOptions, DownloadDestination } from './common';
import { File, knownFolders, path, Utils } from '@nativescript/core';
import { generateId } from './files';

export class Downloader extends DownloaderCommon {
  public download(options: DownloadOptions): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };
      //   const androidContext = getAndroidContext();

      let { url, request, destinationFilename, destinationPath, destinationSpecial } = options;
      try {
        let outputpath = '';
        if (destinationPath && destinationFilename) {
          outputpath = path.join(destinationPath, destinationFilename);
        } else if (!destinationPath && destinationFilename) {
          outputpath = path.join(knownFolders.documents().path, destinationFilename);
        } else if (destinationPath && !destinationFilename) {
          outputpath = path.join(destinationPath, `${generateId()}`);
        } else {
          outputpath = path.join(knownFolders.documents().path, `${generateId()}`);
        }

        // let androidDownloadsPath = androidContext.getExternalFilesDir(android.os.Environment.DIRECTORY_DOWNLOADS).toString();

        // let downloadPath = path.join(androidDownloadsPath, destinationFilename);
        //check if a file with same name already exists. if it was created by another app/install, can't use it here
        if (File.exists(outputpath)) {
          let origpath = outputpath;
          let fileParts = outputpath.split('.');
          let fileSuffix = fileParts.length > 1 ? '.' + fileParts[fileParts.length - 1] : null;
          let tempFileName = 'dl-' + generateId() + fileSuffix;
          outputpath = outputpath.replace(/\/[^/]+$/, `/${tempFileName}`);
          destinationFilename = tempFileName;
          //   downloadPath = path.join(androidDownloadsPath, tempFileName);
          console.warn('file already exists at path: ', origpath, '\n  Using new path: ', outputpath);
        }
        const localUri = android.net.Uri.fromFile(new java.io.File(outputpath));
        // console.log(`URL to download:${url}`);
        // console.log(`Destination: ${localUri.getPath()}`);
        const req = new android.app.DownloadManager.Request(android.net.Uri.parse(url));
        //Note: by default, the Android Download Manager will show a notification
        req.setNotificationVisibility(1);
        //https://developer.android.com/reference/android/app/DownloadManager.Request#VISIBILITY_VISIBLE
        //Disabling this notification will also require the following permission in AndroidManifest and explanation why:
        //   android.permission.DOWNLOAD_WITHOUT_NOTIFICATION

        // const fileName = outputpath.split('/')[outputpath.split('/').length - 1];
        //on API 31 sim, this causes filename to be set to title?
        // req.setTitle(Text.str.status_downloading + ' ' + fileName);
        // req.setDescription('');

        req.setDescription(destinationFilename);
        req.setTitle(destinationFilename);

        const { method, headers } = request || {};
        if (headers)
          for (let headerName in headers) {
            // console.log(`Adding header ${headerName}=${request.extraHeaders[headerName]}`);
            req.addRequestHeader(headerName, headers[headerName]);
          }
        //Note: uncomment to only allow downloads over wifi
        // req.setAllowedOverMetered(false);
        req.setDestinationUri(localUri);
        const refId = this.downloadManager.enqueue(req);
        let started = false;
        // console.log('Request refId: ' + refId);
        // console.log(`Downloading via downloadManager with refId: ${refId}`);
        const progressInterval = setInterval(() => {
          const status = getDownloadStatus(this.downloadManager, refId);
          //   console.log(`Download status: ${JSON.stringify(status)}`);
          if (status.state === DownloadState.RUNNING) {
            if (!started) {
              started = true;
              //   console.log(`Download started`);
              emit(DownloaderCommon.DOWNLOAD_STARTED, { contentLength: status.bytesTotal });
            } else {
              //   console.log('Downloading with status:', JSON.stringify(status));
              emit(DownloaderCommon.DOWNLOAD_PROGRESS, { progress: status.bytesTotal > 0 ? status.bytesDownloaded / status.bytesTotal : 0 });
            }
          } else if (status.state === DownloadState.FAILED) {
            // console.log(`Download FAILED! reason=${status.reason}`);
            clearInterval(progressInterval);
            emit(DownloaderCommon.DOWNLOAD_ERROR, { error: status.reason });
          } else if (status.state === DownloadState.SUCCESFUL) {
            // console.log(`Download SUCCESS!`);
            emit(DownloaderCommon.DOWNLOAD_PROGRESS, { progress: 1 });
            clearInterval(progressInterval);
            const file = File.fromPath(outputpath);
            emit(DownloaderCommon.DOWNLOAD_COMPLETE, { filepath: outputpath });
            if (destinationSpecial == DownloadDestination.picker) {
              //ask user where to add a copy to
            }
            resolve(file);
          }
        }, 250);
      } catch (err) {
        console.error(`An unhandled error occurred download.android: ${err?.filename}, line: ${err?.lineno} :`);
        emit(DownloaderCommon.DOWNLOAD_ERROR, { error: err?.message });
        reject(err?.message);
      }
    });
  }

  private _downloadManager: android.app.DownloadManager;

  private get downloadManager(): android.app.DownloadManager {
    if (!this._downloadManager) {
      this._downloadManager = getAndroidContext().getSystemService(android.content.Context.DOWNLOAD_SERVICE);
    }
    return this._downloadManager;
  }
}

enum DownloadState {
  PENDING = 1,
  RUNNING = 2,
  PAUSED = 4,
  SUCCESFUL = 8,
  FAILED = 16,
}

interface DownloadStatus {
  refId: number;
  title: string;
  downloadUri: string;
  localUri: string;
  bytesDownloaded: number;
  bytesTotal: number;
  state: number;
  reason: string;
}

function getDownloadStatus(manager: android.app.DownloadManager, refId: number): DownloadStatus {
  const query = new android.app.DownloadManager.Query();
  query.setFilterById([refId]);
  const cursor = manager.query(query);
  if (!cursor.moveToFirst()) {
    return null;
  }
  const status = getDownloadStatusFromCursor(cursor);
  cursor.close();
  return status;
}

function getDownloadStatusFromCursor(cursor: android.database.Cursor): DownloadStatus {
  return {
    refId: getCursorLong(cursor, android.app.DownloadManager.COLUMN_ID),
    title: getCursorString(cursor, android.app.DownloadManager.COLUMN_TITLE),
    bytesDownloaded: getCursorLong(cursor, android.app.DownloadManager.COLUMN_BYTES_DOWNLOADED_SO_FAR),
    bytesTotal: getCursorLong(cursor, android.app.DownloadManager.COLUMN_TOTAL_SIZE_BYTES),
    downloadUri: getCursorString(cursor, android.app.DownloadManager.COLUMN_URI),
    localUri: getCursorString(cursor, android.app.DownloadManager.COLUMN_LOCAL_URI),
    state: getCursorLong(cursor, android.app.DownloadManager.COLUMN_STATUS),
    reason: getReason(cursor),
  };
}

function getCursorLong(cursor: android.database.Cursor, colIndex: string): number {
  return cursor.getLong(cursor.getColumnIndex(colIndex));
}

function getCursorString(cursor: android.database.Cursor, colIndex: string): string {
  return cursor.getString(cursor.getColumnIndex(colIndex));
}

let reasons: Map<number, string>;
function ensureReason() {
  if (reasons) {
    return;
  }
  reasons = new Map<number, string>([
    [android.app.DownloadManager.ERROR_CANNOT_RESUME, 'error_cannot_resume'],
    [android.app.DownloadManager.ERROR_DEVICE_NOT_FOUND, 'error_device_not_found'],
    [android.app.DownloadManager.ERROR_FILE_ALREADY_EXISTS, 'error_file_already_exists'],
    [android.app.DownloadManager.ERROR_FILE_ERROR, 'error_file_error'],
    [android.app.DownloadManager.ERROR_HTTP_DATA_ERROR, 'error_http_data_error'],
    [android.app.DownloadManager.ERROR_INSUFFICIENT_SPACE, 'error_insufficient_space'],
    [android.app.DownloadManager.ERROR_TOO_MANY_REDIRECTS, 'error_too_many_redirects'],
    [android.app.DownloadManager.ERROR_UNHANDLED_HTTP_CODE, 'error_unhandled_http_code'],
    [android.app.DownloadManager.ERROR_UNKNOWN, 'error_unknown'],
    [android.app.DownloadManager.PAUSED_QUEUED_FOR_WIFI, 'paused_queued_for_wifi'],
    [android.app.DownloadManager.PAUSED_WAITING_FOR_NETWORK, 'paused_waiting_for_network'],
    [android.app.DownloadManager.PAUSED_WAITING_TO_RETRY, 'paused_waiting_to_retry'],
    [android.app.DownloadManager.PAUSED_UNKNOWN, 'paused_unknown'],
    [0, 'no'],
  ]);
}

function getReason(cursor: android.database.Cursor): string {
  const reasonIndex = getCursorLong(cursor, android.app.DownloadManager.COLUMN_REASON);
  ensureReason();
  if (reasons.has(reasonIndex)) {
    return reasons.get(reasonIndex);
  }
  return 'none';
}

// This method is safer than Application.getApplicationContext()
const getAndroidContext = (): android.app.Application => {
  const ctx = java.lang.Class.forName('android.app.AppGlobals').getMethod('getInitialApplication', null).invoke(null, null) || java.lang.Class.forName('android.app.ActivityThread').getMethod('currentApplication', null).invoke(null, null);
  return ctx || Utils.android.getApplicationContext();
};
