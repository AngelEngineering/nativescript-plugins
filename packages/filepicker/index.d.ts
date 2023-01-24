import { FilepickerCommon } from './common';
import { MediaType, FPFile } from './common';

export declare class Filepicker extends FilepickerCommon {
  showPicker(type: MediaType, multiple: boolean): Promise<[FPFile]>;
}

export { MediaType } from './common';
export { FPFile } from './common';
export { getFreeMBs } from './common';
