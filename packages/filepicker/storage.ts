import { Device } from '@nativescript/core';
import { getNativeApplication } from '@nativescript/core/application';

export function getFreeMBs(filepath: string): number {
  if (global.isIOS) {
    //iOS devices only have a single storage partition to work with, so we can use any path to check stats
    const attributeDictionary: NSDictionary<string, any> = NSFileManager.defaultManager.attributesOfFileSystemForPathError(filepath);
    let totalsize: number = +attributeDictionary.valueForKey(NSFileSystemSize) / (1024 * 1024);
    const freesize: number = +attributeDictionary.valueForKey(NSFileSystemFreeSize) / (1024 * 1024);
    return freesize;
  } else {
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
      console.log('total space: MB', totalsize);
      console.log('free space: MB', freesize);
      return freesize;
    } catch (e) {
      console.error(e);
    }
  }
}
