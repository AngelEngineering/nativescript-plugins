import { File } from '@nativescript/core';

export enum MediaType {
  IMAGE = 0x01,
  AUDIO = 0x02,
  VIDEO = 0x04,
  DOCUMENT = 0x08,
  ARCHIVE = 0x10,
  ALL = IMAGE | AUDIO | VIDEO | DOCUMENT | ARCHIVE,
}
export function showPicker(type: MediaType, multiple: boolean): Promise<File[]>;
export function getFreeMBs(filepath: string): number;
