import { DownloaderCommon, DownloadOptions } from './common';
import { File, path, knownFolders } from '@nativescript/core';

const currentDevice = UIDevice.currentDevice;
const device = currentDevice.userInterfaceIdiom === UIUserInterfaceIdiom.Phone ? 'Phone' : 'Pad';
const osVersion = currentDevice.systemVersion;

const USER_AGENT_HEADER = 'User-Agent';
const USER_AGENT = `Mozilla/5.0 (i${device}; CPU OS ${osVersion.replace('.', '_')} like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/${osVersion} Mobile/10A5355d Safari/8536.25`;
const sessionConfig = NSURLSessionConfiguration.defaultSessionConfiguration;
const queue = NSOperationQueue.mainQueue;

export class Downloader extends DownloaderCommon {
  public download(opts: DownloadOptions): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      const emit = (event: string, data: any) => {
        this.notify({ eventName: event, object: this, data });
      };
      const { url, request, destinationFilename } = opts;
      const documentsDir = knownFolders.documents().path;

      let downloadPath = path.join(documentsDir, destinationFilename);
      let file = File.fromPath(downloadPath);

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
              emit(DownloaderCommon.DOWNLOAD_ERROR, { error });
              reject(error.localizedDescription);
            } else {
              const statusCode = (task?.response as NSHTTPURLResponse)?.statusCode;
              if (statusCode < 200 || statusCode >= 400) {
                return reject('Server responded with status code ' + statusCode);
              }
              emit(DownloaderCommon.DOWNLOAD_COMPLETE, { filepath: file.path });
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
