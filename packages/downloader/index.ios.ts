import { DownloaderCommon, DownloadOptions, DownloadDestination } from './common';
import { File, path, knownFolders, Application, Device } from '@nativescript/core';
export { DownloadDestination };

const currentDevice = UIDevice.currentDevice;
const device = currentDevice.userInterfaceIdiom === UIUserInterfaceIdiom.Phone ? 'Phone' : 'Pad';
const osVersion = currentDevice.systemVersion;

const USER_AGENT_HEADER = 'User-Agent';
const USER_AGENT = `Mozilla/5.0 (i${device}; CPU OS ${osVersion.replace('.', '_')} like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/${osVersion} Mobile/10A5355d Safari/8536.25`;
const sessionConfig = NSURLSessionConfiguration.defaultSessionConfiguration;
const queue = NSOperationQueue.mainQueue;

export class Downloader extends DownloaderCommon {
  public download(options: DownloadOptions): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };
      let { url, request, destinationFilename, destinationPath, destinationSpecial } = options;

      let outputpath = '';
      if (destinationPath) {
        outputpath = destinationPath;
      } else if (!destinationPath && destinationFilename) {
        outputpath = path.join(knownFolders.documents().path, destinationFilename);
      } else {
        let urlParts = url.split('/');
        let urlName = urlParts[urlParts.length - 1];
        if (urlName.includes('.')) {
          outputpath = path.join(knownFolders.documents().path, urlName);
        } else outputpath = path.join(knownFolders.documents().path, 'DL' + Math.round(Math.random() * 10000000));
      }
      if (File.exists(outputpath)) {
        let fileParts = outputpath.split('/');
        let fileName = fileParts[fileParts.length - 1];
        let filePrefix = fileName.split('.', 2).length > 0 ? fileName.split('.', 2)[0] : null;
        let fileSuffix = fileName.split('.', 2).length > 0 ? '.' + fileName.split('.', 2)[1] : null;
        let tempFileName;
        for (let i = 1; i < 999999999; i++) {
          tempFileName = filePrefix + '-' + i + fileSuffix;
          outputpath = outputpath.replace(/\/[^/]+$/, `/${tempFileName}`);
          if (!File.exists(outputpath)) break;
        }
        destinationFilename = tempFileName;
      }

      let downloadedFile = File.fromPath(outputpath);

      try {
        downloadedFile.writeTextSync('', (e) => {
          console.error('Error opening outputfile path', outputpath);
          throw e;
        });
        const urlRequest = NSMutableURLRequest.requestWithURL(NSURL.URLWithString(url));
        urlRequest.setValueForHTTPHeaderField(USER_AGENT, USER_AGENT_HEADER);
        const { method, headers } = request || {};
        urlRequest.HTTPMethod = method || 'GET';
        if (headers) {
          for (const key in headers) {
            urlRequest.setValueForHTTPHeaderField(headers[key], key);
          }
        }

        @NativeClass()
        class DownloadProgressDelegate extends NSObject implements NSURLSessionDataDelegate {
          public static ObjCProtocols = [NSURLSessionDataDelegate];
          static new(): DownloadProgressDelegate {
            return <DownloadProgressDelegate>super.new();
          }
          private contentLength: number;
          private handle: NSFileHandle;

          public URLSessionDataTaskDidReceiveResponseCompletionHandler(_session: NSURLSession, _dataTask: NSURLSessionDataTask, response: NSURLResponse, completionHandler: (p1: NSURLSessionResponseDisposition) => void) {
            completionHandler(NSURLSessionResponseDisposition.Allow);
            this.handle = NSFileHandle.fileHandleForWritingAtPath(downloadedFile.path);
            this.handle.truncateAtOffsetError(0);
            this.contentLength = response.expectedContentLength;
            emit(DownloaderCommon.DOWNLOAD_STARTED, { contentLength: this.contentLength });
          }

          public URLSessionDataTaskDidReceiveData(_session: NSURLSession, _dataTask: NSURLSessionDataTask, data: NSData) {
            try {
              const written = new interop.Reference(0);
              if (!this.handle.seekToEndReturningOffsetError(written)) {
                emit(DownloaderCommon.DOWNLOAD_ERROR, { error: 'Error seeking end of file' });
                return reject();
                // throw new Error('Error seeking end of file');
              }
              if (!this.handle.writeDataError(data)) {
                // throw new Error('Error writing data');
                emit(DownloaderCommon.DOWNLOAD_ERROR, { error: 'Error writing data' });
                return reject();
              }
              if (this.contentLength > 0) {
                const progress = written.value / this.contentLength;
                emit(DownloaderCommon.DOWNLOAD_PROGRESS, { progress, url, destinationFilename });
              }
            } catch (err) {
              emit(DownloaderCommon.DOWNLOAD_ERROR, { error: err.message });
              return reject();
            }
          }

          public URLSessionTaskDidCompleteWithError(_session: NSURLSession, task: NSURLSessionTask, error: NSError) {
            this.handle.closeAndReturnError();
            if (error) {
              console.error('URLSessionTaskDidCompleteWithError error with description:');
              console.error(error.localizedDescription);
              emit(DownloaderCommon.DOWNLOAD_ERROR, { error: error.localizedDescription });
              return reject();
            } else {
              const statusCode = (task?.response as NSHTTPURLResponse)?.statusCode;
              if (statusCode < 200 || statusCode >= 400) {
                emit(DownloaderCommon.DOWNLOAD_ERROR, { error: 'Server status code:' + statusCode });
                return reject();
              }
              emit(DownloaderCommon.DOWNLOAD_COMPLETE, { filepath: downloadedFile.path });
              //Special handling if user requests a copy be saved to Photos Gallery
              if (destinationSpecial == DownloadDestination.gallery) {
                let iosurl = NSURL.URLWithString(downloadedFile.path);
                let fileParts = downloadedFile.path.split('.');
                let fileSuffix = fileParts.length > 1 ? fileParts[fileParts.length - 1] : null;
                let isImage = ['jpg', 'jpeg', 'jpe', 'jp2', 'jpg2', 'pjpeg', 'pjp', 'kjp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'ico', 'png', 'svg', 'svgz', 'gif', 'tif', 'tiff', 'psd', 'ai', 'eps', 'ps', 'raw', 'webp', 'wbmp', 'heif', 'heic', 'ief', 'indd', 'ind', 'indt', 'jif', 'jfif', 'jfi', 'arw', 'cr2', 'crw', 'k25', 'bmp', 'dib', 'odg', 'cur', 'ief', 'pcx', 'odi', 'art', 'jng', 'nef', 'orf', 'avif'].includes(fileSuffix);
                let isVideo = ['3gp', '3gpp', '3g2', '3gpp2', 'asf', 'avi', 'fli', 'flv', 'f4v', 'swf', 'mkv', 'mov', 'mpeg', 'mpe', 'mp4', 'mpv', 'm4p', 'ts', 'm1v', 'm2v', 'm4v', 'mts', 'ogg', 'ogv', 'qt', 'rm', 'vob', 'wmv', 'webm', 'avhcd'].includes(fileSuffix);
                PHPhotoLibrary.sharedPhotoLibrary().performChangesCompletionHandler(
                  () => {
                    if (isVideo) {
                      PHAssetChangeRequest.creationRequestForAssetFromVideoAtFileURL(iosurl);
                    } else if (isImage) {
                      PHAssetChangeRequest.creationRequestForAssetFromImageAtFileURL(iosurl);
                    }
                    // else console.log('neither a video or image, not saving to gallery');
                  },
                  (success, err) => {
                    if (success) {
                      // console.log('success');
                    } else {
                      // console.log('failed');
                    }
                    resolve(downloadedFile);
                  }
                );
              } else if (destinationSpecial == DownloadDestination.picker) {
                if (+Device.osVersion < 13) {
                  console.error('Destination Picker only available on iOS 13+ ');
                  resolve(downloadedFile);
                } else {
                  //Dev wants a copy made somewhere else, show them a picker to select a folder
                  const _iosDocumentPickerController = UIDocumentPickerViewController.alloc().initForOpeningContentTypes([UTTypeFolder]);
                  _iosDocumentPickerController.directoryURL = NSURL.URLWithString(downloadedFile.path);
                  _iosDocumentPickerController.modalPresentationStyle = UIModalPresentationStyle.FormSheet;
                  const delegate = UIDocumentPickerDelegateImpl.new().initWithCallbackAndOptions(resolve, reject, this, downloadedFile.path);
                  delegate.registerToGlobal();
                  _iosDocumentPickerController.delegate = delegate;
                  (Application.ios.rootController as UIViewController).presentViewControllerAnimatedCompletion(_iosDocumentPickerController, true, null);
                }
              } else resolve(downloadedFile);
            }
          }
        }
        const session = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, <DownloadProgressDelegate>DownloadProgressDelegate.new(), queue);
        const dataTask = session.dataTaskWithRequest(urlRequest);
        dataTask.resume();
      } catch (error) {
        emit(DownloaderCommon.DOWNLOAD_ERROR, { error: error?.message });
        reject();
      }
    });
  }
}

//UIDocument Picker delegate for folder selection
@NativeClass()
class UIDocumentPickerDelegateImpl extends NSObject implements UIDocumentPickerDelegate {
  public static ObjCProtocols = [UIDocumentPickerDelegate];
  static new(): UIDocumentPickerDelegateImpl {
    return <UIDocumentPickerDelegateImpl>super.new();
  }
  private _owner: WeakRef<any>;
  private _resolve: any;
  private _reject: any;
  private _downloadPath: string;
  private _downloadFilename: string;

  public initWithCallbackAndOptions(callback: (result?) => void, errorCallback: (result?) => void, owner: any, downloadPath: string): UIDocumentPickerDelegateImpl {
    this._resolve = callback;
    this._reject = errorCallback;
    this._owner = owner;
    this._downloadPath = downloadPath;
    const fileParts = downloadPath.split('/');
    this._downloadFilename = fileParts[fileParts.length - 1];
    return this;
  }

  //Need to maintain a reference otherwise iOS tends to clean it up when leaving app to launch picker
  public registerToGlobal(): any {
    (<any>global).documentPickerDelegate = this;
  }

  public deRegisterFromGlobal(): any {
    (<any>global).documentPickerDelegate = null;
  }

  public owner() {
    if (!this._owner) return null;
    return this._owner.get();
  }

  //this shouldn't be called, but we'll have the same handler code just in case
  documentPickerDidPickDocumentAtURL(controller: UIDocumentPickerViewController, url: NSURL): void {
    const access = url.startAccessingSecurityScopedResource();
    let copypath = url.path + '/' + this._downloadFilename;
    if (NSFileManager.defaultManager.fileExistsAtPath(copypath)) {
      const fileParts = copypath.split('/');
      const fileName = fileParts[fileParts.length - 1];
      const filePrefix = fileName.split('.', 2).length > 0 ? fileName.split('.', 2)[0] : null;
      const fileSuffix = fileName.split('.', 2).length > 0 ? '.' + fileName.split('.', 2)[1] : null;
      let tempFileName;
      for (let i = 1; i < 999999999; i++) {
        tempFileName = filePrefix + '-' + i + fileSuffix;
        copypath = copypath.replace(/\/[^/]+$/, `/${tempFileName}`);
        if (!NSFileManager.defaultManager.fileExistsAtPath(copypath)) break;
      }
    }
    const suc = NSFileManager.defaultManager.copyItemAtPathToPathError(this._downloadPath, copypath);
    if (access) url.stopAccessingSecurityScopedResource();
    const downloadedFile = File.fromPath(this._downloadPath);
    this._resolve(downloadedFile);
    controller.dismissViewControllerAnimatedCompletion(true, null);
    this.deRegisterFromGlobal();
  }

  //if multiple selections allowed:
  documentPickerDidPickDocumentsAtURLs(controller: UIDocumentPickerViewController, urls: NSArray<NSURL>): void {
    const files: File[] = [];
    //This view can't display an UIActivityIndicatorView inside it using the usual ios spinner approach,
    //    but picker shows a small spinner on the "Open" button while processing
    //Process picker results
    for (let i = 0; i < urls.count; i++) {
      const url = urls.objectAtIndex(i); //urls[0];
      const access = url.startAccessingSecurityScopedResource();
      let copypath = url.path + '/' + this._downloadFilename;
      if (NSFileManager.defaultManager.fileExistsAtPath(copypath)) {
        const fileParts = copypath.split('/');
        const fileName = fileParts[fileParts.length - 1];
        const filePrefix = fileName.split('.', 2).length > 0 ? fileName.split('.', 2)[0] : null;
        const fileSuffix = fileName.split('.', 2).length > 0 ? '.' + fileName.split('.', 2)[1] : null;
        // let tempFileName = 'dl-' + generateId() + fileSuffix;
        let tempFileName;
        for (let i = 1; i < 999999999; i++) {
          tempFileName = filePrefix + '-' + i + fileSuffix;
          copypath = copypath.replace(/\/[^/]+$/, `/${tempFileName}`);
          if (!NSFileManager.defaultManager.fileExistsAtPath(copypath)) break;
        }
      }
      const suc = NSFileManager.defaultManager.copyItemAtPathToPathError(this._downloadPath, copypath);
      if (access) url.stopAccessingSecurityScopedResource();
      const downloadedFile = File.fromPath(this._downloadPath);
      this._resolve(downloadedFile);
    }
    controller.dismissViewControllerAnimatedCompletion(true, null);
    this.deRegisterFromGlobal();
  }

  documentPickerWasCancelled(controller: UIDocumentPickerViewController): void {
    controller.dismissViewControllerAnimatedCompletion(true, null);
    this.deRegisterFromGlobal();
  }
}
