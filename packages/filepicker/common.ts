import { Observable, File } from '@nativescript/core';
export const enum MediaType {
  IMAGE = 0x01,
  AUDIO = 0x02,
  VIDEO = 0x04,
  DOCUMENT = 0x08,
  ARCHIVE = 0x10,
  ALL = IMAGE | AUDIO | VIDEO | DOCUMENT | ARCHIVE,
}
export class FilepickerCommon extends Observable {
  public showPicker(type: MediaType, multiple: boolean): Promise<File[]> {
    throw new Error('"showPicker" has not been implemented');
  }
}
export { getFreeMBs } from './storage';
export { TempFile } from './files';
