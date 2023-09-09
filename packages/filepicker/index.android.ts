import { MediaType } from './index.common';
import { AndroidApplication, AndroidActivityResultEventData, Application, Device, File, Utils } from '@nativescript/core';
import { TempFile } from './files';
import { getNativeApplication } from '@nativescript/core/application';

export { MediaType } from './index.common';

/**
 * @const FILE_PICKER_CODE
 * This is the code that the Filepicker class passes when making
 * async system requests (ie `startActvityForResult`)
 * NOTE: this is entirely arbitrary
 */
const FILE_PICKER_CODE = 10321;

/**
 * @function getFreeMBs returns the number of megabytes free on file system containing argument filepath
 * @param {string} filepath full filepath on device
 */
export function getFreeMBs(filepath: string): number {
  try {
    const applicationContext = getNativeApplication().getApplicationContext();
    let freesize: number, totalsize: number;
    if (+Device.sdkVersion > 25) {
      //only available in API26+
      const fileManager: android.os.storage.StorageManager = applicationContext.getSystemService(android.os.storage.StorageManager.class);
      const statsManager: android.app.usage.StorageStatsManager = applicationContext.getSystemService(android.app.usage.StorageStatsManager.class);
      const fileUUID: java.util.UUID = fileManager.getUuidForPath(new java.io.File(filepath + '.tmp'));
      //the following returns total free space if we clear all cache data from other apps
      // https://stackoverflow.com/questions/56663624/how-to-get-free-and-total-size-of-each-storagevolume
      // freesize = +(fileManager.getAllocatableBytes(file(1024 * 1024);UUID) / (1024 * 1024));
      //the following returns total free space currently
      freesize = +statsManager.getFreeBytes(fileUUID) / (1024 * 1024);
      totalsize = +statsManager.getTotalBytes(fileUUID) / (1024 * 1024);
    } else {
      const stat = new android.os.StatFs(filepath);
      const blockSize = stat.getBlockSize();
      const freeBlocks = stat.getAvailableBlocks();
      const totalBlocks = stat.getBlockCount();
      freesize = (freeBlocks * blockSize) / (1024 * 1024);
      totalsize = (totalBlocks * blockSize) / (1024 * 1024);
    }
    // console.log('total space: MB', totalsize);
    // console.log('free space: MB', freesize);
    return freesize;
  } catch (e) {
    console.error(e);
  }
}

/**
 * @function showPicker returns an array of public files selected by user
 * @param {MediaType} type  OR'ed from all possible MediaType's to describe types of files allowed in selection
 * @param {boolean} multiple if multiple selections are allowed
 */
export function filePicker(type: MediaType, multiple: boolean): Promise<File[]> {
  return new Promise((resolve, reject) => {
    // callback for androidActivity.showActivityForResult
    function onResult(e: AndroidActivityResultEventData): void {
      if (e.requestCode != FILE_PICKER_CODE) return;
      if (e.resultCode == android.app.Activity.RESULT_CANCELED) return;
      if (e.resultCode != android.app.Activity.RESULT_OK) {
        removeResultListener();
        reject(new Error('ERROR: FilePicker - ' + e.resultCode));
        return;
      }
      try {
        let results: File[];
        const clipData = e.intent.getClipData() as android.content.ClipData;
        if (clipData) {
          results = [];
          for (let i = 0; i < clipData.getItemCount(); i++) {
            const item = clipData.getItemAt(i);
            if (!item) continue;
            const uriPath = getPathFromURI(item.getUri());
            if (uriPath == null) throw new Error('Unable to resolve SAF URI, did you request permissions?');
            const fileName = uriPath.split('/')[uriPath.split('/').length - 1];
            const file = getNSFile(item.getUri(), fileName);
            if (file) {
              file['originalFilename'] = fileName;
              results.push(file as File);
            }
          }
        } else {
          const uri = e.intent.getData() as android.net.Uri;
          const uriPath = getPathFromURI(uri);
          if (uriPath == null) throw new Error('Unable to resolve SAF URI, did you request permissions?');
          const fileName = uriPath.split('/')[uriPath.split('/').length - 1];
          const file = getNSFile(uri, fileName);
          if (file) {
            file['originalFilename'] = fileName;
            results = [file as File];
          } else return reject(null);
        }
        removeResultListener();
        resolve(results);
      } catch (e) {
        console.error(e);
        removeResultListener();
        reject(e);
      }
    }

    // convenience for removing the results listener
    function removeResultListener(): void {
      AndroidApplication.off(AndroidApplication.activityResultEvent, onResult);
    }

    // add the results listener to the android app
    AndroidApplication.on(AndroidApplication.activityResultEvent, onResult);

    // create an intent that will open the system file picker (Android 4.4+)
    const Intent = android.content.Intent;
    // const intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);//this is just for the device file system
    const intent = new Intent(Intent.ACTION_GET_CONTENT); //this will include all file providers

    intent.setType('*/*'); //this will allow all files to be picked by default

    //set a filter to restrict by desired mime type
    intent.putExtra(android.content.Intent.EXTRA_MIME_TYPES, getMediaTypes(type));
    if (multiple) {
      intent.putExtra('android.intent.extra.ALLOW_MULTIPLE', true);
    }
    intent.addCategory(android.content.Intent.CATEGORY_OPENABLE);
    intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
    intent.putExtra('android.content.extra.SHOW_ADVANCED', true);
    intent.putExtra('android.content.extra.FANCY', true);
    intent.putExtra('android.content.extra.SHOW_FILESIZE', true);
    // show the picker
    getActivity().startActivityForResult(intent, FILE_PICKER_CODE);
  });
}

/**
 * @function galleryPicker returns an array of Photos gallery files selected by user, same as showPicker for Android currently.
 * @param {MediaType} type  OR'ed from all possible MediaType's to describe types of files allowed in selection
 * @param {boolean} multiple if multiple selections are allowed
 */
export function galleryPicker(type: MediaType, multiple: boolean): Promise<File[]> {
  console.error('Only supported for iOS currently, using filePicker instead!');
  return filePicker(type, multiple);
}

/**
 * @function getMediaTypes returns an array of mime types for Android picker intent
 * @param {MediaType} types  OR'ed from all possible MediaType's to describe types of files allowed in selection
 */
function getMediaTypes(types: MediaType) {
  let fileTypes = [];
  if (types & MediaType.AUDIO) {
    fileTypes = fileTypes.concat(MediaFileTypeExts[MediaType.AUDIO]);
  }
  if (types & MediaType.VIDEO) {
    fileTypes = fileTypes.concat(MediaFileTypeExts[MediaType.VIDEO]);
  }
  if (types & MediaType.IMAGE) {
    fileTypes = fileTypes.concat(MediaFileTypeExts[MediaType.IMAGE]);
  }
  if (types & MediaType.DOCUMENT) {
    fileTypes = fileTypes.concat(MediaFileTypeExts[MediaType.DOCUMENT]);
  }
  if (types & MediaType.ARCHIVE) {
    fileTypes = fileTypes.concat(MediaFileTypeExts[MediaType.ARCHIVE]);
  }
  let mimeTypes = fileTypes.map(s => android.webkit.MimeTypeMap.getSingleton().getMimeTypeFromExtension(s)).filter(s => !!s);
  //convert to android type syntax
  return convertToArray(mimeTypes);
}

/**
 * @function convertToArray Convert to Android Array of Strings
 */
function convertToArray(types) {
  let mimeTypes: string[];
  if (types && types.length > 0) {
    mimeTypes = Array.create(java.lang.String, types.length);
    for (let i = 0; i < types.length; i++) {
      mimeTypes[i] = types[i];
    }
  }
  return mimeTypes;
}

/**
 * @function getNSFile
 * @param uri:android.net.Uri
 * @param fileName:String
 * @returns file:File
 ** Copies file accessed from Android scoped storage uri to App temp directory and returns an NS File reference
 */

function getNSFile(uri, fileName) {
  //try to extract the filename and file suffix to create a temp file
  //Note: Android doesn't recognize file types without a suffix though and picker won't enable these for selecting
  let fileParts = fileName.split('.');
  console.log('fileName', fileName);
  let fileSuffix = fileParts.length > 1 ? '.' + fileParts[fileParts.length - 1] : null;
  let filePrefix = fileSuffix.length > 1 ? fileName.slice(0, fileName.length - fileSuffix.length) : fileName;
  let outputFilePath = TempFile.getPath(filePrefix, fileSuffix);
  const newPath = outputFilePath.replace(/\/[^/]+$/, `/${fileName}`);
  if (File.exists(newPath)) {
    // remove file if it exists
    File.fromPath(newPath).removeSync();
  }
  const success = copyFileFromUri(uri, newPath);
  if (!success) return null;
  const file = File.fromPath(newPath);
  return file;
}

/**
 * @function getActivity
 * Convenience function that returns the android app's Activity
 */
function getActivity(): android.app.Activity {
  return Application.android.foregroundActivity || Application.android.startActivity;
}

// This method is safer than Application.getApplicationContext()
const getAndroidContext = (): android.app.Application => {
  const ctx =
    java.lang.Class.forName('android.app.AppGlobals').getMethod('getInitialApplication', null).invoke(null, null) ||
    java.lang.Class.forName('android.app.ActivityThread').getMethod('currentApplication', null).invoke(null, null);
  return ctx || Utils.android.getApplicationContext();
};

function copyFileFromUri(uri, newpath) {
  try {
    const context: android.content.Context = getAndroidContext();
    let inputStream = context.getContentResolver().openInputStream(uri);

    let outputStream = new java.io.FileOutputStream(newpath);
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
  } catch (err) {
    console.error('Error copying file!', err);
    return false;
  }
  return true;
}

//Android file mime types reference
//https://developer.android.com/reference/androidx/media3/common/MimeTypes
//https://android.googlesource.com/platform/external/mime-support/+/9817b71a54a2ee8b691c1dfa937c0f9b16b3473c/mime.types
//https://developer.android.com/guide/topics/media/media-formats
//http://androidxref.com/4.4.4_r1/xref/frameworks/base/media/java/android/media/MediaFile.java#174
//http://androidxref.com/4.4.4_r1/xref/libcore/luni/src/main/java/libcore/net/MimeUtils.java
const MediaFileTypeExts: { [index: string]: string[] } = {
  [MediaType.AUDIO]: [
    'wav',
    'wave',
    'mp2',
    'g723',
    'mp3',
    'm4a',
    'mpa',
    'mpga',
    'mpega',
    'aac',
    'aif',
    'aifc',
    'aiff',
    'wma',
    'wax',
    'oga',
    'flac',
    'alac',
    'pcm',
    'au',
    'gsm',
    'ra',
    'rm',
    'ram',
    'tta',
    'webm',
    'weba',
    'mid',
    'midi',
    'ac3',
    'mpu',
    '3ga',
    'm4p',
    'amr',
    'amb',
    'mka',
    'awb',
    'snd',
    'sd2',
  ],
  [MediaType.IMAGE]: [
    'jpg',
    'jpeg',
    'jpe',
    'jp2',
    'jpg2',
    'pjpeg',
    'pjp',
    'kjp2',
    'j2k',
    'jpf',
    'jpx',
    'jpm',
    'mj2',
    'ico',
    'png',
    'svg',
    'svgz',
    'gif',
    'tif',
    'tiff',
    'psd',
    'ai',
    'eps',
    'ps',
    'raw',
    'webp',
    'wbmp',
    'heif',
    'heic',
    'ief',
    'indd',
    'ind',
    'indt',
    'jif',
    'jfif',
    'jfi',
    'arw',
    'cr2',
    'crw',
    'k25',
    'bmp',
    'dib',
    'odg',
    'cur',
    'ief',
    'pcx',
    'odi',
    'art',
    'jng',
    'nef',
    'orf',
    'avif',
  ],
  [MediaType.VIDEO]: [
    '3gp',
    '3gpp',
    '3g2',
    '3gpp2',
    'asf',
    'avi',
    'fli',
    'flv',
    'f4v',
    'swf',
    'mkv',
    'mov',
    'mpeg',
    'mpe',
    'mp4',
    'mpv',
    'm4p',
    'ts',
    'm1v',
    'm2v',
    'm4v',
    'mts',
    'ogg',
    'ogv',
    'qt',
    'rm',
    'vob',
    'wmv',
    'webm',
    'avhcd',
  ],
  [MediaType.DOCUMENT]: [
    'doc',
    'docx',
    'dot',
    'dotx',
    'pdf',
    'pot',
    'potx',
    'pps',
    'ppsx',
    'ppt',
    'pptx',
    'rtf',
    'wpd',
    'xlb',
    'xls',
    'xlsx',
    'xlt',
    'xltx',
    'odp',
    'ods',
    'odt',
    'txt',
    'htm',
    'html',
    'shtml',
    'xhtml',
    'md',
    'latex',
    'ics',
    'icz',
    'csv',
    'css',
    'asc',
    'text',
    'diff',
    'rtx',
    'tsv',
    'xml',
    'xsd',
    'epub',
    'mobi',
    'azw',
    'wpd',
    'wp5',
    'vcf',
    'vcard',
    'abw',
    'js',
    'json',
    'php',
  ],
  [MediaType.ARCHIVE]: ['zip', 'zipx', 'rar', 'gtar', 'iso', 'taz', 'gz', 'tar', 'tgz', 'jar', '7z', '7zip', 'dmg', 'lzh', 'lzx', 'lha', 'wz', 'arc', 'bz', 'bz2', 'pkg', 'ipa', 'rpm', 'pz', 'z'],
};

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
