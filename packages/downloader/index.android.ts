/* eslint-disable no-inner-declarations */
import { DownloaderCommon, DownloadOptions, DownloadDestination } from './common';
import { Application, File, knownFolders, path, Utils, AndroidApplication, AndroidActivityResultEventData, Device } from '@nativescript/core';
import { generateId } from './files';
export { DownloadDestination };

const DOWNLOADER_CODE = 26041;

export class Downloader extends DownloaderCommon {
  public download(options: DownloadOptions): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      let { url, request, destinationFilename, destinationPath, destinationSpecial } = options;

      console.log('destinationFilename', destinationFilename);
      console.log('destinationPath', destinationPath);

      if (destinationSpecial == DownloadDestination.picker) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const that = this;
        function onResult(e: AndroidActivityResultEventData): void {
          if (e.requestCode != DOWNLOADER_CODE) return;
          if (e.resultCode == android.app.Activity.RESULT_CANCELED) return;
          if (e.resultCode != android.app.Activity.RESULT_OK) {
            removeResultListener();
            reject(new Error('ERROR: FilePicker - ' + e.resultCode));
            return;
          }
          //find out which directory user selected
          const uri = e.intent.getData() as android.net.Uri;
          const uriPath = getPathFromURI(uri);
          if (uriPath == null) throw new Error('Unable to resolve SAF URI, did you request permissions?');
          const fileName = uriPath.split('/')[uriPath.split('/').length - 1];
          console.log('user selected uri', uri);
          console.log(' uriPath', uriPath);
          console.log(' fileName', fileName);
          let realpath = getPathFromURI(uri);
          options.destinationFilename = destinationFilename = fileName;
          options.destinationPath = realpath;
          that.downloadFile(options, resolve, reject);
        }
        function removeResultListener(): void {
          AndroidApplication.off(AndroidApplication.activityResultEvent, onResult);
        }

        // add the results listener to the android app
        AndroidApplication.on(AndroidApplication.activityResultEvent, onResult);

        //ask user where to add a copy to
        const Intent = android.content.Intent;
        const intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(android.content.Intent.CATEGORY_OPENABLE);
        intent.putExtra(Intent.EXTRA_TITLE, destinationFilename);
        intent.setType('*/*');

        getActivity().startActivityForResult(intent, DOWNLOADER_CODE);
      } else this.downloadFile(options, resolve, reject);
    });
  }

  private downloadFile(options: DownloadOptions, resolve, reject) {
    const emit = (event: string, data: any) => {
      this.notify({ eventName: event, object: this, data });
    };
    let { url, request, destinationFilename, destinationPath, destinationSpecial } = options;
    console.log('destinationFilename', destinationFilename);
    console.log('destinationPath', destinationPath);

    try {
      let outputpath = '';
      if (destinationPath) {
        outputpath = destinationPath;
      } else if (!destinationPath && destinationFilename) {
        outputpath = path.join(knownFolders.documents().path, destinationFilename);
      } else {
        destinationFilename = generateId(); //we don't have a filename, so let's set a random one
        outputpath = path.join(knownFolders.documents().path, `${generateId()}`);
      }
      console.log('outputpath', outputpath);

      // let androidDownloadsPath = androidContext.getExternalFilesDir(android.os.Environment.DIRECTORY_DOWNLOADS).toString();
      // let downloadPath = path.join(androidDownloadsPath, destinationFilename);

      //check if a file with same name already exists. if it was created by another app/install, can't access, rename, delete, etc.
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
      //   https://developer.android.com/reference/android/app/DownloadManager.Request#VISIBILITY_VISIBLE
      //   android.permission.DOWNLOAD_WITHOUT_NOTIFICATION
      //   Disabling this notification will also require the following permission in AndroidManifest and explanation why:
      req.setNotificationVisibility(1);

      // req.allowScanningByMediaScanner();//deprecated, files saved outside app directory will be scanned automatically

      // const fileName = outputpath.split('/')[outputpath.split('/').length - 1];
      //on API 31 sim, this causes filename to be set to title?
      // req.setTitle(Text.str.status_downloading + ' ' + fileName);
      // req.setDescription('');
      //if we don't set the title, the server may provide a valid filename, or it may provide the url with whatever querystring it has
      req.setDescription(destinationFilename);
      req.setTitle(destinationFilename);
      req.setMimeType('*/*');
      const { method, headers } = request || {};
      if (headers)
        for (let headerName in headers) {
          // console.log(`Adding header ${headerName}=${request.extraHeaders[headerName]}`);
          req.addRequestHeader(headerName, headers[headerName]);
        }
      //Note: uncomment to only allow downloads over wifi
      // req.setAllowedOverMetered(false);

      req.setDestinationUri(localUri);
      //the following doesn't seem to work
      // req.setDestinationInExternalPublicDir(android.os.Environment.DIRECTORY_DOWNLOADS, destinationFilename)

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

          resolve(file);
        }
      }, 250);
    } catch (err) {
      console.error(`An unhandled error occurred download.android: ${err?.filename}, line: ${err?.lineno} :`);
      emit(DownloaderCommon.DOWNLOAD_ERROR, { error: err?.message });
      reject(err?.message);
    }
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

function getActivity(): android.app.Activity {
  return Application.android.foregroundActivity || Application.android.startActivity;
}

// Not sure why DocumentsContact is not defined in Android types yet?
type ProviderWithDocumentsContact = typeof android.provider & {
  DocumentsContract: any;
};

// Per https://stackoverflow.com/questions/17546101/get-real-path-for-uri-android
export function getPathFromURI(uri: android.net.Uri) {
  const getDriveFilePath = (uri: android.net.Uri, context: any) => {
    let returnUri = uri;
    let returnCursor = context.getContentResolver().query(returnUri, null, null, null, null);
    /*
     * Get the column indexes of the data in the Cursor,
     *     * move to the first row in the Cursor, get the data,
     *     * and display it.
     * */
    let nameIndex = returnCursor.getColumnIndex(android.provider.OpenableColumns.DISPLAY_NAME);
    returnCursor.moveToFirst();
    let name = returnCursor.getString(nameIndex);
    let file = new java.io.File(context.getCacheDir(), name);
    try {
      let inputStream = context.getContentResolver().openInputStream(uri);
      let outputStream = new java.io.FileOutputStream(file);
      let read = 0;
      let maxBufferSize = 1 * 1024 * 1024;
      let bytesAvailable = inputStream.available();
      let bufferSize = Math.min(bytesAvailable, maxBufferSize);
      let buffers = java.lang.reflect.Array.newInstance(java.lang.Byte.class.getField('TYPE').get(null), bufferSize);
      while ((read = inputStream.read(buffers)) != -1) {
        outputStream.write(buffers, 0, read);
      }
      inputStream.close();
      outputStream.close();
    } catch (e) {
      console.error(e);
    }
    return file.getPath();
  };

  const getDataColumn = (context: any, uri: android.net.Uri, selection: any, selectionArgs: any) => {
    let cursor = null;
    const column = '_data';
    const projection = [column];

    try {
      cursor = context.getContentResolver().query(uri, projection, selection, selectionArgs, null);
      if (cursor != null && cursor.moveToFirst()) {
        let column_index = cursor.getColumnIndexOrThrow(column);
        return cursor.getString(column_index);
      }
    } catch (e) {
      return getDriveFilePath(uri, context);
    } finally {
      if (cursor != null) cursor.close();
    }
    return null;
  };

  const isExternalStorageDocument = (uri: android.net.Uri) => {
    return 'com.android.externalstorage.documents' === uri.getAuthority();
  };

  const isDownloadsDocument = (uri: android.net.Uri) => {
    return 'com.android.providers.downloads.documents' === uri.getAuthority();
  };

  const isMediaDocument = (uri: android.net.Uri) => {
    return 'com.android.providers.media.documents' === uri.getAuthority();
  };

  const isGooglePhotosUri = (uri: android.net.Uri) => {
    return 'com.google.android.apps.photos.content' === uri.getAuthority();
  };
  const isGoogleDriveUri = (uri: android.net.Uri) => {
    return 'com.google.android.apps.docs.storage' === uri.getAuthority() || 'com.google.android.apps.docs.storage.legacy' === uri.getAuthority();
  };
  const activity = Application.android.startActivity || Application.android.foregroundActivity;
  const context = activity.getApplicationContext();

  if (typeof uri === 'string') {
    uri = android.net.Uri.parse(uri);
  }
  // DocumentProvider
  if ((<ProviderWithDocumentsContact>android.provider).DocumentsContract.isDocumentUri(context, uri)) {
    // ExternalStorageProvider
    if (isExternalStorageDocument(uri)) {
      const docId: string = (<ProviderWithDocumentsContact>android.provider).DocumentsContract.getDocumentId(uri);
      const split = docId.split(':');
      const type: string = split[0].toLowerCase();
      if ('primary' === type) {
        return android.os.Environment.getExternalStorageDirectory() + '/' + split[1];
      } else {
        // https://stackoverflow.com/questions/44226029/how-get-a-file-path-by-uri-which-authority-is-com-android-externalstorage-docum
        let external = context.getExternalMediaDirs();

        if (external.length > 0) {
          let filePath = external[0].getAbsolutePath();
          filePath = filePath.substring(0, filePath.indexOf('Android')) + split[1];
          return filePath;
        }
        return uri.getPath();
      }
    }
    // DownloadsProvider
    else if (isDownloadsDocument(uri)) {
      if (parseInt(Device.sdkVersion, 10) >= 23) {
        let cursor = null;
        try {
          cursor = context.getContentResolver().query(uri, [android.provider.MediaStore.MediaColumns.DISPLAY_NAME], null, null, null);
          if (cursor != null && cursor.moveToFirst()) {
            let fileName = cursor.getString(0);
            let path = android.os.Environment.getExternalStorageDirectory().toString() + '/Download/' + fileName;
            if (!android.text.TextUtils.isEmpty(path)) {
              return path;
            }
          }
        } finally {
          if (cursor != null) cursor.close();
        }
        const id = (<ProviderWithDocumentsContact>android.provider).DocumentsContract.getDocumentId(uri);
        if (!android.text.TextUtils.isEmpty(id)) {
          if (id.startsWith('raw:')) {
            return id.replace(/^raw:/, '');
          }
          const contentUriPrefixesToTry = ['content://downloads/public_downloads', 'content://downloads/my_downloads'];
          for (let contentUriPrefix of contentUriPrefixesToTry) {
            try {
              let contentUri = android.content.ContentUris.withAppendedId(android.net.Uri.parse(contentUriPrefix), java.lang.Long.valueOf(id) as any);

              /*   final Uri contentUri = ContentUris.withAppendedId(
                            Uri.parse("content://downloads/public_downloads"), Long.valueOf(id));*/

              return getDataColumn(context, contentUri, null, null);
            } catch (e) {
              //In Android 8 and Android P the id is not a number
              return uri
                .getPath()
                .replace(/^\/document\/raw:/, '')
                .replace(/^raw:/, '');
            }
          }
        }
      } else {
        const id: string = (<ProviderWithDocumentsContact>android.provider).DocumentsContract.getDocumentId(uri);
        if (id.startsWith('raw:')) {
          return id.slice(4);
        } else {
          const contentUri = android.content.ContentUris.withAppendedId(android.net.Uri.parse('content://downloads/public_downloads'), java.lang.Long.valueOf(id) as any);

          return getDataColumn(context, contentUri, null, null);
        }
      }
    }
    // MediaProvider
    else if (isMediaDocument(uri)) {
      const docId = (<ProviderWithDocumentsContact>android.provider).DocumentsContract.getDocumentId(uri);
      const split = docId.split(':');
      const type = split[0];

      let contentUri = null;
      if ('image' === type) {
        contentUri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
      } else if ('video' === type) {
        contentUri = android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
      } else if ('audio' === type) {
        contentUri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
      } else {
        return getDriveFilePath(uri, context);
      }

      const selection = '_id=?';
      const selectionArgs = [split[1]]; // js Array?

      return getDataColumn(context, contentUri, selection, selectionArgs);
    } else if (isGoogleDriveUri(uri)) {
      return getDriveFilePath(uri, context);
    }
  }
  // MediaStore (and general)
  else if ('content' === uri.getScheme().toLowerCase()) {
    if (isGooglePhotosUri(uri)) {
      return uri.getLastPathSegment();
    }

    if (isGoogleDriveUri(uri)) {
      return getDriveFilePath(uri, context);
    }

    return getDataColumn(context, uri, null, null);
  }
  // File
  else if ('file' === uri.getScheme().toLowerCase()) {
    return uri.getPath();
  }

  return null;
}
