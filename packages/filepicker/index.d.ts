import { File } from '@nativescript/core';
export { MediaType } from './index.common';

export function filePicker(type: MediaType, multiple: boolean): Promise<File[]>;
export function galleryPicker(type: MediaType, multiple: boolean): Promise<File[]>;
export function getFreeMBs(filepath: string): number;
