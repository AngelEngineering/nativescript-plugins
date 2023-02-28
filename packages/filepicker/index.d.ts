import { FilepickerCommon } from './common';
import { MediaType, File } from './common';

export declare class Filepicker extends FilepickerCommon {
  showPicker(type: MediaType, multiple: boolean): Promise<File[]>;
}

export { MediaType } from './common';
export { getFreeMBs } from './common';
