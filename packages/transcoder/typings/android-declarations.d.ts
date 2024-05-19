/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
declare module androidNative {
  export class Array<T> {
    constructor();
    length: number;
    [index: number]: T;
  }
}

import globalAndroid = android;

declare module native {
  export class Array<T> {
    constructor();
    length: number;
    [index: number]: T;
  }
}
declare module androidNative {
  export class Array<T> {
    constructor();
    length: number;
    [index: number]: T;
  }
}
