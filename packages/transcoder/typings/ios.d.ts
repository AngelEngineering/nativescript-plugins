/* eslint-disable @typescript-eslint/no-misused-new */
declare class NextLevelSessionExporter extends NSObject {
  static alloc(): NextLevelSessionExporter; // inherited from NSObject

  static new(): NextLevelSessionExporter; // inherited from NSObject

  asset: AVAsset;

  audioMix: AVAudioMix;

  audioOutputConfiguration: NSDictionary<string, any>;

  expectsMediaDataInRealTime: boolean;

  metadata: NSArray<AVMetadataItem>;

  optimizeForNetworkUse: boolean;

  outputFileType: string;

  outputURL: NSURL;

  readonly progress: number;

  readonly status: AVAssetExportSessionStatus;

  timeRange: CMTimeRange;

  videoComposition: AVVideoComposition;

  videoInputConfiguration: NSDictionary<string, any>;

  videoOutputConfiguration: NSDictionary<string, any>;

  constructor(o: { asset: AVAsset });

  cancelExport(): void;

  exportWithProgressHandlerCompletionHandler(progressHandler: (p1: number) => void, completionHandler: (p1: string) => void): void;

  initWithAsset(asset: AVAsset): this;
}
