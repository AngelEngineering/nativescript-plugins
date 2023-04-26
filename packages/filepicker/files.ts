import * as platform from '@nativescript/core/platform';
import * as application from '@nativescript/core/application';
import * as appSettings from '@nativescript/core/application-settings';
import { File, knownFolders } from '@nativescript/core';

const PATH_LIST_KEY = 'TempFile::deletePathLater';

function getPathList(): string[] {
  const pathListJSON: string = appSettings.getString(PATH_LIST_KEY, '[]');
  let pathList: string[] = [];
  try {
    pathList = JSON.parse(pathListJSON);
  } catch (e) {
    console.warn('Failed to parse path list: ' + pathListJSON);
  }
  return pathList;
}
function setPathList(pathList: string[]): void {
  appSettings.setString(PATH_LIST_KEY, JSON.stringify(pathList));
}

export class TempFile {
  // return the absolute path to a temporary file, also registering it to
  //  be deleted later (e.g. when the app closes)
  public static getPath(prefix: string, suffix: string): string {
    let path: string = null;
    if (platform.isAndroid) {
      const context: android.content.Context = application.android.context;
      //The system will automatically delete files in the cache directory as disk space is needed elsewhere on the device.
      // we'll attempt to get an external sd card first if one is available
      const dir = context.getExternalCacheDir() || context.getCacheDir();
      const file = java.io.File.createTempFile(prefix, suffix, dir);
      path = file.getAbsolutePath();
    } else if (platform.isIOS) {
      const name: string = NSUUID.UUID().UUIDString;
      path = knownFolders.temp().getFile(prefix + name + suffix).path;
    }
    TempFile.deletePathLater(path);
    // console.log('TempFile returning path', path);
    return path;
  }

  // add the given path to a list to be deleted later
  public static deletePathLater(path: string): void {
    const pathList = getPathList();
    pathList.push(path);
    setPathList(pathList);
    // NOTE: this only deletes the file on VM exit, which does not cover all
    //  app exit scenarios: https://developer.android.com/reference/java/io/File.html#deleteOnExit()
    // So, we will call cleanup() on app init as well
    if (platform.isAndroid) {
      const file = new java.io.File(path);
      file.deleteOnExit();
    }
  }

  // delete stored paths
  public static cleanup(): void {
    const pathList = getPathList();
    for (const path of pathList) {
      if (!path) continue;
      try {
        if (!File.exists(path)) continue;
      } catch (e) {
        console.warn('Failed while looking for file at ' + path + ': ' + e.toString());
        continue;
      }
      const file = File.fromPath(path);
      // console.log('removing temporary file ', path);
      file.remove().catch((reason: any) => {
        console.warn('Failed to delete file at ' + path + ' : ' + reason.toString());
        TempFile.deletePathLater(path);
      });
    }
    setPathList([]);
  }
}

type FileResolver = (value?: File | PromiseLike<File>) => void;

export class AssetDownloader {
  constructor(public readonly asset: PHAsset) {}

  public download(): Promise<File> {
    return new Promise<File>((resolve, reject) => {
      // try to get a local resource of the appropriate type for the asset
      const resource = this.getResource();
      if (resource) this.fetchResource(resource, resolve);
      // if there are no resources, we may need to use an export session
      //  for videos stored on iCloud
      else if (this.asset.mediaType == PHAssetMediaType.Video) {
        this.exportVideo(resolve);
      } else {
        console.warn('Unable to convert media asset to a file');
        resolve(null);
      }
    });
  }

  public get path(): string {
    if (!this._path) {
      // make a temp file but ensure it doesn't exist so iOS will write to it
      this._path = TempFile.getPath('asset', '.tmp');
      File.fromPath(this._path).removeSync();
    }
    return this._path;
  }
  private _path: string = null;

  protected getResource(): PHAssetResource {
    // get the media type we're looking for
    let expectedType: PHAssetResourceType = PHAssetResourceType.Photo;
    if (this.asset.mediaType == PHAssetMediaType.Video) expectedType = PHAssetResourceType.Video;
    if (this.asset.mediaType == PHAssetMediaType.Audio) expectedType = PHAssetResourceType.Audio;
    // look through resources for one of the desired type
    const resources = PHAssetResource.assetResourcesForAsset(this.asset);
    for (const resource of resources) {
      if (resource.type === expectedType) return resource;
    }
    return null;
  }

  protected fetchResource(resource: PHAssetResource, resolve: FileResolver): void {
    const options = PHAssetResourceRequestOptions.alloc().init();
    options.networkAccessAllowed = true;
    const toURL = NSURL.fileURLWithPath(this.path);
    PHAssetResourceManager.defaultManager().writeDataForAssetResourceToFileOptionsCompletionHandler(resource, toURL, options, (e: NSError) => {
      if (e) {
        console.error('Failed to copy asset: ' + e.description);
        resolve(null);
      } else {
        const file = File.fromPath(this.path);
        file['originalFilename'] = resource.originalFilename;
        resolve(file);
      }
    });
  }

  protected exportVideo(resolve: FileResolver): void {
    const options = new PHVideoRequestOptions();
    options.networkAccessAllowed = true;
    options.deliveryMode = PHVideoRequestOptionsDeliveryMode.FastFormat;
    PHImageManager.defaultManager().requestExportSessionForVideoOptionsExportPresetResultHandler(this.asset, options, AVAssetExportPresetLowQuality, (session: AVAssetExportSession, info: NSDictionary<any, any>) => {
      // export the video to our temp file
      session.outputURL = NSURL.fileURLWithPath(this.path);
      session.outputFileType = AVFileTypeMPEG4;
      session.exportAsynchronouslyWithCompletionHandler(() => {
        const status = session.status;
        try {
          if (status == AVAssetExportSessionStatus.Completed) {
            resolve(File.fromPath(this.path));
            return;
          } else if (status == AVAssetExportSessionStatus.Failed) {
            throw new Error('Failed to export asset: ' + (session.error ? session.error.description : '(no message)'));
          } else if (status == AVAssetExportSessionStatus.Cancelled) {
            // "cancelled" is valid
          } else {
            throw new Error('Asset export did not complete for unknown reasons - status: ' + status);
          }
        } catch (e) {
          console.error(e);
        }
        resolve(null);
      });
    });
  }
}
