import { DownloaderCommon, DownloadOptions, DownloadDestination } from './common';
import { File, path, knownFolders } from '@nativescript/core';
import { generateId } from './files';
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
        // outputpath = path.join(knownFolders.documents().path, `${generateId()}`);
        // outputpath = path.join(knownFolders.documents().path, 'DL' + Math.random() * 10000000);
        let urlParts = url.split('/');
        let urlName = urlParts[urlParts.length - 1];
        console.log('urlName', urlName);
        if (urlName.includes('.')) {
          console.log('have a dot in last string from url after final/', urlName);
          outputpath = path.join(knownFolders.documents().path, urlName);
        } else outputpath = path.join(knownFolders.documents().path, 'DL' + Math.round(Math.random() * 10000000));
      }
      console.log('outputpath', outputpath);

      if (File.exists(outputpath)) {
        console.warn('file already exists at path: ', outputpath);
        let fileParts = outputpath.split('/');
        let fileName = fileParts[fileParts.length - 1];
        // console.log('fileName', fileName);
        let filePrefix = fileName.split('.', 2).length > 0 ? fileName.split('.', 2)[0] : null;
        // console.log('filePrefix', fileName);
        let fileSuffix = fileName.split('.', 2).length > 0 ? '.' + fileName.split('.', 2)[1] : null;
        // console.log('fileSuffix', fileSuffix);
        // let tempFileName = 'dl-' + generateId() + fileSuffix;
        let tempFileName;
        for (let i = 1; i < 999999999; i++) {
          tempFileName = filePrefix + '-' + i + fileSuffix;
          outputpath = outputpath.replace(/\/[^/]+$/, `/${tempFileName}`);
          //   console.log('checking outputpath ', outputpath);
          if (!File.exists(outputpath)) break;
        }
        console.log('using new file name ', tempFileName);
        destinationFilename = tempFileName;
        console.warn('Using new path: ', outputpath);
      }

      let file = File.fromPath(outputpath);

      try {
        file.writeTextSync('', (e) => {
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
          static ObjCProtocols = [NSURLSessionDataDelegate];
          private contentLength: number;
          private handle: NSFileHandle;

          public URLSessionDataTaskDidReceiveResponseCompletionHandler(_session: NSURLSession, _dataTask: NSURLSessionDataTask, response: NSURLResponse, completionHandler: (p1: NSURLSessionResponseDisposition) => void) {
            completionHandler(NSURLSessionResponseDisposition.Allow);
            this.handle = NSFileHandle.fileHandleForWritingAtPath(file.path);
            this.handle.truncateAtOffsetError(0);
            this.contentLength = response.expectedContentLength;
            emit(DownloaderCommon.DOWNLOAD_STARTED, { contentLength: this.contentLength });
          }

          public URLSessionDataTaskDidReceiveData(_session: NSURLSession, _dataTask: NSURLSessionDataTask, data: NSData) {
            const written = new interop.Reference(0);
            if (!this.handle.seekToEndReturningOffsetError(written)) {
              throw new Error('Error seeking end of file');
            }
            if (!this.handle.writeDataError(data)) {
              throw new Error('Error writing data');
            }
            if (this.contentLength > 0) {
              const progress = written.value / this.contentLength;
              emit(DownloaderCommon.DOWNLOAD_PROGRESS, { progress, url, destinationFilename });
            }
          }

          public URLSessionTaskDidCompleteWithError(_session: NSURLSession, task: NSURLSessionTask, error: NSError) {
            this.handle.closeAndReturnError();
            if (error) {
              //   console.log('URLSessionTaskDidCompleteWithError', error);
              emit(DownloaderCommon.DOWNLOAD_ERROR, { error });
              reject(error.localizedDescription);
            } else {
              //   console.log('URLSessionTaskDidCompleteWithError', task?.response);
              const statusCode = (task?.response as NSHTTPURLResponse)?.statusCode;
              if (statusCode < 200 || statusCode >= 400) {
                emit(DownloaderCommon.DOWNLOAD_ERROR, { error: 'Error! Server status code:' + statusCode });
                return reject('Server responded with status code ' + statusCode);
              }
              emit(DownloaderCommon.DOWNLOAD_COMPLETE, { filepath: file.path });
              //Special handling if user requests a copy be saved to Photos Gallery
              if (destinationSpecial == DownloadDestination.gallery) {
                console.log('User wants a copy in Photos Gallery');
                let iosurl = NSURL.URLWithString(file.path);
                let fileParts = file.path.split('.');
                let fileSuffix = fileParts.length > 1 ? fileParts[fileParts.length - 1] : null;
                console.log('fileSuffix', fileSuffix);
                let isImage = ['jpg', 'jpeg', 'jpe', 'jp2', 'jpg2', 'pjpeg', 'pjp', 'kjp2', 'j2k', 'jpf', 'jpx', 'jpm', 'mj2', 'ico', 'png', 'svg', 'svgz', 'gif', 'tif', 'tiff', 'psd', 'ai', 'eps', 'ps', 'raw', 'webp', 'wbmp', 'heif', 'heic', 'ief', 'indd', 'ind', 'indt', 'jif', 'jfif', 'jfi', 'arw', 'cr2', 'crw', 'k25', 'bmp', 'dib', 'odg', 'cur', 'ief', 'pcx', 'odi', 'art', 'jng', 'nef', 'orf', 'avif'].includes(fileSuffix);
                let isVideo = ['3gp', '3gpp', '3g2', '3gpp2', 'asf', 'avi', 'fli', 'flv', 'f4v', 'swf', 'mkv', 'mov', 'mpeg', 'mpe', 'mp4', 'mpv', 'm4p', 'ts', 'm1v', 'm2v', 'm4v', 'mts', 'ogg', 'ogv', 'qt', 'rm', 'vob', 'wmv', 'webm', 'avhcd'].includes(fileSuffix);
                PHPhotoLibrary.sharedPhotoLibrary().performChangesCompletionHandler(
                  () => {
                    if (isVideo) {
                      console.log('file has an video extension, saving to gallery as video');
                      PHAssetChangeRequest.creationRequestForAssetFromVideoAtFileURL(iosurl);
                    } else if (isImage) {
                      console.log('file has a image extension, saving to gallery as image');
                      PHAssetChangeRequest.creationRequestForAssetFromImageAtFileURL(iosurl);
                    } else console.log('neither a video or image, not saving to gallery');
                  },
                  (success, err) => {
                    if (success) {
                      console.log('success');
                    } else {
                      console.log('failed');
                    }
                  }
                );
              }
              resolve(file);
            }
          }
        }

        const session = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, <DownloadProgressDelegate>DownloadProgressDelegate.new(), queue);
        const dataTask = session.dataTaskWithRequest(urlRequest);
        dataTask.resume();
      } catch (error) {
        emit(DownloaderCommon.DOWNLOAD_ERROR, { error });
        reject(error);
      }
    });
  }
}
