import { File } from '@nativescript/core';
export { MediaType } from './index.common';

/**
 * @function filePicker
 * Present a system picker filtered by MediaType and using single or multiple selection mode..
 * @param {MediaType} type  OR'ed from all possible MediaType's to describe types of files allowed in selection
 * @param {boolean} multiple if multiple selections are allowed
 * @returns {Promise<File[]>} Promise<File[]> returns an array of Files selected by user
 */
export function filePicker(type: MediaType, multiple: boolean): Promise<File[]>;

/**
 * @function galleryPicker
 * Present a Photos gallery picker filtered by MediaType and using single or multiple selection mode. Note: Android will just call showPicker currently.
 * @param {MediaType} type  OR'ed from all possible MediaType's to describe types of files allowed in selection
 * @param {boolean} multiple if multiple selections are allowed
 * @returns  {Promise<File[]>} Promise<File[]> Returns an array of Photos gallery files selected by user.
 */
export function galleryPicker(type: MediaType, multiple: boolean): Promise<File[]>;

/**
 * @function getFreeMBs
 * Returns the number of megabytes free on file system containing the filepath
 * @param {string} filepath full filepath on device
 */
export function getFreeMBs(filepath: string): number;
