import { File, Utils, knownFolders, ApplicationSettings, isAndroid, isIOS } from '@nativescript/core';

const PATH_LIST_KEY = 'TempFile::deletePathLater';

function getPathList(): string[] {
  const pathListJSON: string = ApplicationSettings.getString(PATH_LIST_KEY, '[]');
  let pathList: string[] = [];
  try {
    pathList = JSON.parse(pathListJSON);
  } catch (e) {
    console.warn('Failed to parse path list: ' + pathListJSON);
  }
  return pathList;
}

function setPathList(pathList: string[]): void {
  ApplicationSettings.setString(PATH_LIST_KEY, JSON.stringify(pathList));
}

export function generateId(): string {
  if (global.isIOS) {
    return NSUUID.UUID().UUIDString;
  }
  if (global.isAndroid) {
    return java.util.UUID.randomUUID().toString();
  }
  return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export class TempFile {
  // return the absolute path to a temporary file and create it, also registering it to
  //  be deleted later (e.g. when the app closes or user calls cleanup() )
  public static getFile(prefix: string, suffix: string): string {
    let path: string = null;
    if (isAndroid) {
      const context: android.content.Context = this.getAndroidContext();
      //The system will automatically delete files in the cache directory as disk space is needed elsewhere on the device.
      // we'll attempt to get an external sd card first if one is available
      const dir = context.getExternalCacheDir() || context.getCacheDir();
      const file = java.io.File.createTempFile(prefix, suffix, dir);
      path = file.getAbsolutePath();
    } else if (isIOS) {
      const name: string = NSUUID.UUID().UUIDString;
      path = knownFolders.temp().getFile(prefix + name + suffix).path;
    }
    TempFile.deletePathLater(path);
    // console.log('TempFile returning path for created file', path);
    return path;
  }

  //return path to a valid temporary file which can be created/used by user, but doesn't leave it created
  public static getPath(prefix: string, suffix: string): string {
    let path: string = null;
    if (isAndroid) {
      const context: android.content.Context = this.getAndroidContext();
      //The system will automatically delete files in the cache directory as disk space is needed elsewhere on the device.
      //We'll attempt to get an external sd card path first if one is available
      const dir = context.getExternalCacheDir() || context.getCacheDir();
      const file = java.io.File.createTempFile(prefix, suffix, dir);
      path = file.getAbsolutePath();
      file.delete();
    } else if (isIOS) {
      const name: string = NSUUID.UUID().UUIDString;
      const tempfile = knownFolders.temp().getFile(prefix + name + suffix);
      path = tempfile.path;
      tempfile.remove();
    }
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
    if (isAndroid) {
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

  // This method is safer than Application.getApplicationContext()
  private static getAndroidContext = (): android.app.Application => {
    const ctx = java.lang.Class.forName('android.app.AppGlobals').getMethod('getInitialApplication', null).invoke(null, null) || java.lang.Class.forName('android.app.ActivityThread').getMethod('currentApplication', null).invoke(null, null);
    return ctx || Utils.android.getApplicationContext();
  };
}
