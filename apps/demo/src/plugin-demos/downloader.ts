// import { Observable, EventData, Page } from '@nativescript/core';
import { EventData, Page, File, Frame, StackLayout, GridLayout, Color, Label, Image, alert, isAndroid, Device, isIOS } from '@nativescript/core';
import { DemoSharedDownloader } from '@demo/shared';
import { DownloadDestination, Downloader, DownloadOptions, MessageData } from '@angelengineering/downloader';
import { LoadingIndicator, Mode, OptionsCommon } from '@nstudio/nativescript-loading-indicator';
import { Feedback, FeedbackType, FeedbackPosition } from '@valor/nativescript-feedback';
import { TempFile } from '@angelengineering/downloader/files';
import { Result, checkMultiple, check as checkPermission, request, request as requestPermission } from '@nativescript-community/perms';

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
const imageUri = 'https://www.gstatic.com/webp/gallery3/1.sm.png';
const badUri = 'https://static.wikia.nocookie.net/nomediatest.png';
const movieUri = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'; //10mb
const largeMovieUri = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'; //100mb
const badMovieUrl = 'https://download.samplelib.com/mp4/sample-5s.mp4';

export class DemoModel extends DemoSharedDownloader {
  async downloadValid() {
    //iOS doesn't need permission to download to application cache directory
    //Android can also download to applications external cache directory without permissions
    //   but, if we want to download to Downloads, either user selects the destination directory first, or plugin needs to use SAF storage approach
    try {
      this.downloadFile({ url: imageUri, destinationFilename: 'rose.png' });
    } catch (err) {
      if (err) alert(err?.message);
    }
    return;
  }

  downloadValidDest() {
    //Android can do this if we let user select the destination directory which grants permission, otherwise need SAF storage approach to save to default Downloads directory
    if (isAndroid) {
      this.downloadFile({ url: imageUri, destinationFilename: 'rose.png', destinationSpecial: DownloadDestination.picker });
    }
    //iOS needs permission to save to photos gallery
    else if (isIOS)
      checkPermission('storage').then(async (permres: Result) => {
        console.log('storage perm?', permres);
        await requestPermission('storage').then(async (result) => {
          console.log('requested perm?', result);
          if ((isAndroid && result['android.permission.WRITE_EXTERNAL_STORAGE'] == 'authorized') || (isIOS && result[0] == 'authorized' && result[1])) {
            try {
              this.downloadFile({ url: imageUri, destinationFilename: 'rose.png', destinationSpecial: isAndroid ? DownloadDestination.picker : DownloadDestination.gallery });
            } catch (err) {
              if (err) alert(err?.message);
            }
          } else alert("No permission for files, can't download files");
        });
      });
  }
  downloadValidDestDL() {
    if (isAndroid) {
      this.downloadFile({ url: imageUri, destinationFilename: 'rose.png', destinationSpecial: DownloadDestination.downloads, notification: true });
    } else if (isIOS) alert('Downloads Directory not available on iOS, use gallery destination');
  }

  downloadValidMovie() {
    this.downloadFile({ url: movieUri });
  }

  downloadValidMovieDest() {
    //Android can do this if we let user select the destination directory which grants permission, otherwise need SAF storage approach to save to default Downloads directory
    if (isAndroid) {
      this.downloadFile({ url: movieUri, destinationSpecial: DownloadDestination.picker });
    }
    //iOS needs permission to save to photos gallery
    else if (isIOS)
      checkPermission('storage').then(async (permres: Result) => {
        console.log('storage perm?', permres);
        await requestPermission('storage').then(async (result) => {
          console.log('requested perm?', result);
          if ((isAndroid && result['android.permission.WRITE_EXTERNAL_STORAGE'] == 'authorized') || (isIOS && result[0] == 'authorized' && result[1])) {
            try {
              this.downloadFile({ url: movieUri, destinationSpecial: DownloadDestination.gallery });
            } catch (err) {
              if (err) alert(err?.message);
            }
          } else alert("No permission for files, can't download files");
        });
      });
  }

  downloadValidMovieDestDL() {
    if (isAndroid) {
      this.downloadFile({ url: movieUri, destinationSpecial: DownloadDestination.downloads, notification: true });
    } else if (isIOS) alert('Downloads Directory not available on iOS, use gallery destination');
  }

  downloadLargeValidMovie() {
    this.downloadFile({ url: largeMovieUri });
  }

  downloadInvalid() {
    this.downloadFile({ url: badUri });
  }
  downloadInvalidMovie() {
    this.downloadFile({ url: badMovieUrl });
  }

  downloadFile(dlopts: DownloadOptions): void {
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
      ios: {},
    };
    const indicator = new LoadingIndicator();

    indicator.show(options);
    const dp = new Downloader();

    dp.on(Downloader.DOWNLOAD_STARTED, (payload: MessageData) => {
      console.log('started', payload?.data?.contentLength);
    });
    dp.on(Downloader.DOWNLOAD_PROGRESS, (payload: MessageData) => {
      console.log(' >>>>>  ', payload?.data?.progress, payload?.data?.url, payload?.data?.destinationFilename);
      options.progress = +payload.data.progress;
      indicator.show(options);
    });
    dp.on(Downloader.DOWNLOAD_COMPLETE, (payload: MessageData) => {
      console.log('finished', payload?.data?.filepath);
      indicator.hide();
    });

    dp.on(Downloader.DOWNLOAD_ERROR, (payload: MessageData) => {
      console.log('ERROR!', payload?.data);
      indicator.hide();
      this.toast('Download FAILED!!!', ToastStatus.error);
      this.handleFiles(null);
    });

    dp.download(dlopts)
      .then((file: File) => {
        if (!file) {
          indicator.hide();
          this.toast('No file resolved!', ToastStatus.error);
          return console.error('Failed to download file!');
        }
        console.log('Finished downloading file ', file.path);
        indicator.hide();
        this.toast('File downloaded!', ToastStatus.success);
        this.handleFiles(file);
      })
      .catch((err) => {
        console.error('caught an error', err);
        indicator.hide();
        if (err.message == 'Canceled') {
          this.toast('User canceled', ToastStatus.normal);
        } else this.toast('Error! msg:' + err.message, ToastStatus.error);
      });
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
