import { File } from '@nativescript/core';

export enum MediaType {
  NONE = 0x00,
  IMAGE = 0x01,
  AUDIO = 0x02,
  VIDEO = 0x04,
  ARCHIVE = 0x08,
  DOCUMENT = 0x10,
  ALL = IMAGE | AUDIO | VIDEO | ARCHIVE | DOCUMENT,
}
export function showPicker(type: MediaType, multiple: boolean): Promise<File[]>;
export function getFreeMBs(filepath: string): number;
