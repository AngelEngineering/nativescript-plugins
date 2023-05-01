// import { Observable, EventData, Page } from '@nativescript/core';
import { EventData, Page, File, Frame, StackLayout, GridLayout, Color, Label, Image, alert, isAndroid, Device, isIOS } from '@nativescript/core';
import { DemoSharedDownloader } from '@demo/shared';
import { Downloader, DownloadOptions, MessageData } from '@angelengineering/downloader';
import { LoadingIndicator, Mode, OptionsCommon } from '@nstudio/nativescript-loading-indicator';
import { Feedback, FeedbackType, FeedbackPosition } from '@valor/nativescript-feedback';
import { TempFile } from '@angelengineering/downloader/files';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
  TempFile.cleanup();
}

enum ToastStatus {
  normal = 'normal-toast',
  success = 'success-toast',
  warning = 'warning-toast',
  error = 'error-toast',
}

enum ToastPosition {
  'BOTTOM' = 'bottom',
  'TOP' = 'top',
}

const feedback = new Feedback();
const testUri = 'https://static.wikia.nocookie.net/nickelodeon/images/2/27/STIMPYS_TINY_BRAIN.jpg/revision/latest';
const badUri = 'https://static.wikia.nocookie.net/nomediatest.png';
const movieUri = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4';
const largeMovieUri = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

export class DemoModel extends DemoSharedDownloader {
  downloadValid() {
    this.downloadFile(testUri);
  }
  downloadValidMovie() {
    this.downloadFile(movieUri);
  }
  downloadLargeValidMovie() {
    this.downloadFile(largeMovieUri);
  }
  downloadInvalid() {
    this.downloadFile(badUri);
  }

  downloadFile(testurl): void {
    let options: OptionsCommon = {
      message: 'Downloading...',
      progress: 0.0,
      margin: 40,
      dimBackground: true,
      backgroundColor: 'white',
      color: 'blue',
      userInteractionEnabled: false,
      hideBezel: false,
      mode: Mode.AnnularDeterminate,
      android: {
        cancelable: false,
      },
    };
    const indicator = new LoadingIndicator();

    indicator.show(options);
    const dp = new Downloader();

    // let fileParts = testurl.split('/');
    // let fileSuffix = fileParts.length > 1 ? '.' + fileParts[fileParts.length - 1] : null;
    // let destinationFilename = fileParts[fileParts.length - 1];
    // let filePrefix = fileSuffix.length > 1 ? destinationFilename.slice(0, destinationFilename.length - fileSuffix.length) : destinationFilename;
    let outputFilePath = TempFile.getPath('DL', '.tmp');

    dp.on(Downloader.DOWNLOAD_STARTED, (payload: MessageData) => {
      // console.log('started', payload?.data?.contentLength);
    });
    dp.on(Downloader.DOWNLOAD_PROGRESS, (payload: MessageData) => {
      console.log(' >>>>>  ', payload?.data?.progress, payload?.data?.url, payload?.data?.destinationFilename);
      options.progress = +payload.data.progress;
      indicator.show(options);
    });
    dp.on(Downloader.DOWNLOAD_COMPLETE, (payload: MessageData) => {
      // console.log('finished', payload?.data?.filepath);
    });
    dp.on(Downloader.DOWNLOAD_ERROR, (payload: MessageData) => {
      console.log('ERROR!', payload?.data);
      indicator.hide();
      this.toast('Download FAILED!!!', ToastStatus.error);
      this.handleFiles(null);
    });

    // let that = this;
    dp.download({ url: testurl, destinationFilename: outputFilePath }).then((file: File) => {
      console.log('Finished downloading file ', file.path);
      indicator.hide();
      this.toast('File downloaded!', ToastStatus.success);
      this.handleFiles(file);
    });
    // .catch((error) => {
    //   indicator.hide();
    //   console.error('Download Error', error);
    //   this.toast('Download FAILED!!!', ToastStatus.error);
    //   this.handleFiles(null);
    // });
  }

  toast(message: string, status: ToastStatus, position: ToastPosition = ToastPosition.TOP, title?: string) {
    const options: any = {
      message,
      title: title?.toUpperCase(),
      type: FeedbackType.Custom,
      messageSize: 18,
      messageColor: status === ToastStatus.normal ? new Color('white') : new Color('black'),
      backgroundColor: status === ToastStatus.success ? new Color('lightblue') : status === ToastStatus.warning ? new Color('yellow') : status === ToastStatus.error ? new Color('orange') : new Color('blue') /* normal */,
      position: position === ToastPosition.TOP ? FeedbackPosition.Top : FeedbackPosition.Bottom,
      duration: status === ToastStatus.error || status === ToastStatus.warning ? 2500 : 1500,
      titleColor: status === ToastStatus.normal ? new Color('white') : new Color('black'),
    };
    feedback.show(options);
  }

  handleFiles(result: File): void {
    // console.log('handleFile:', result);
    const itemList: StackLayout = Frame.topmost().getViewById('downloadedFiles');
    itemList.removeChildren();
    if (result) {
      const fileContainer = new GridLayout();
      fileContainer['rows'] = 'auto';
      fileContainer['columns'] = 'auto, 8, *';
      fileContainer['padding'] = 5;
      fileContainer['margin'] = '1 5';
      fileContainer['borderBottomColor'] = new Color('black');
      fileContainer['borderBottomWidth'] = 1;

      const textContainer = new StackLayout();
      textContainer['row'] = 0;
      textContainer['col'] = 2;
      const fileLabel = new Label();
      fileLabel.text = result.name;
      fileLabel.textWrap = true;
      fileLabel.color = new Color('black');
      fileLabel.row = 0;
      fileLabel.col = 2;
      textContainer.addChild(fileLabel);

      const pathLabel = new Label();
      pathLabel.text = `Path: ${result.path}`;
      pathLabel.textWrap = true;
      pathLabel.color = new Color('black');
      pathLabel.verticalAlignment = 'top';
      pathLabel.row = 1;
      pathLabel.col = 2;
      textContainer.addChild(pathLabel);
      fileContainer.addChild(textContainer);

      const previewImage = new Image();
      previewImage.width = 100;
      previewImage.height = 100;
      previewImage.src = result.path;
      previewImage.backgroundColor = new Color('white');
      previewImage.borderRadius = 5;
      previewImage.stretch = 'aspectFit';
      previewImage.row = 0;
      previewImage.rowSpan = 2;
      previewImage.col = 0;
      fileContainer.addChild(previewImage);
      itemList.addChild(fileContainer);
    }
  }
}
