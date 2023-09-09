import { EventData, Page, File, Frame, StackLayout, Color, Label, Image, alert, isAndroid, Device, isIOS } from '@nativescript/core';
import { DemoSharedDownloader } from '@demo/shared';
import { Downloader, DownloadOptions, MessageData } from '@angelengineering/downloader';
import { Result, check as checkPermission, request as requestPermission } from '@nativescript-community/perms';
import { iOSNativeHelper } from '@nativescript/core/utils';
//note: these two plugins don't work on iOS 12
import { LoadingIndicator, Mode, OptionsCommon } from '@nstudio/nativescript-loading-indicator';
import { Feedback, FeedbackType, FeedbackPosition } from '@valor/nativescript-feedback';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
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
const largeImageUri = 'https://www.learningcontainer.com/wp-content/uploads/2020/07/Sample-JPEG-Image-File-Download.jpg';
const badUri = 'https://static.wikia.nocookie.net/nomediatest.png';
const movieUri = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'; //10mb
const largeMovieUri = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'; //100mb
const smallMovieUrl = 'https://download.samplelib.com/mp4/sample-5s.mp4';

export class DemoModel extends DemoSharedDownloader {
  async downloadValid() {
    //iOS doesn't need permission to download to application cache directory
    //Android can also download to applications external cache directory without permissions
    try {
      this.downloadFile({ url: imageUri, destinationFilename: 'rose.png' });
    } catch (err) {
      if (err) alert(err?.message);
    }
    return;
  }

  async downloadValidLarge() {
    //iOS doesn't need permission to download to application cache directory
    //Android can also download to applications external cache directory without permissions
    try {
      this.downloadFile({ url: largeImageUri, destinationFilename: 'largejpeg.png' });
    } catch (err) {
      if (err) alert(err?.message);
    }
    return;
  }
  downloadValidDest() {
    //Android can do this if we let user select the destination directory which grants permission, otherwise need SAF storage approach to save to default Downloads directory
    //iOS also will grant permission since user is involved in selecting destination
    if (isIOS && +Device.osVersion < 13) {
      alert('Picker destination only available on iOS 13+ ');
      return;
    }
    this.downloadFile({ url: imageUri, destinationFilename: 'rose.png', copyPicker: true });
  }

  downloadValidDestDL() {
    //As long as permissions are in Manifest for API <29 no permission needed for legacy approach
    //newer APIs use MediaStore which also doesn't need any additional permissions
    if (isAndroid) {
      this.downloadFile({ url: imageUri, destinationFilename: 'rose.png', copyDownloads: true, notification: true });
    } else if (isIOS) {
      //iOS needs user permission before saving a copy to Photos Gallery
      checkPermission('photo').then(async (permres: Result) => {
        console.log('storage perm?', permres);
        await requestPermission('photo').then(async result => {
          console.log('requested perm?', result);
          if (result[0] == 'authorized' && result[1]) {
            try {
              this.downloadFile({ url: imageUri, destinationFilename: 'rose.png', copyGallery: true });
            } catch (err) {
              if (err) alert(err?.message);
            }
          } else alert("No permission for files, can't download files");
        });
      });
    }
  }

  downloadValidMovie() {
    //iOS doesn't need permission to download to application cache directory
    //Android can also download to applications external cache directory without permissions
    this.downloadFile({ url: movieUri });
  }

  downloadValidMovieDest() {
    //Android can do this if we let user select the destination directory which grants permission, otherwise need SAF storage approach to save to default Downloads directory
    //iOS also will grant permission since user is involved in selecting destination
    this.downloadFile({ url: movieUri, copyPicker: true });
  }

  downloadValidMovieDestDL() {
    if (isAndroid) {
      this.downloadFile({ url: movieUri, copyDownloads: true, notification: true });
    } else if (isIOS)
      //iOS needs user permission before saving a copy to Photos Gallery
      checkPermission('photo').then(async (permres: Result) => {
        console.log('storage perm?', permres);
        await requestPermission('photo').then(async result => {
          console.log('requested perm?', result);
          if (isIOS && result[0] == 'authorized' && result[1]) {
            try {
              this.downloadFile({ url: movieUri, copyGallery: true });
            } catch (err) {
              if (err) alert(err?.message);
            }
          } else alert("No permission for files, can't download files");
        });
      });
  }

  downloadLargeValidMovie() {
    //iOS doesn't need permission to download to application cache directory
    //Android can also download to applications external cache directory without permissions
    this.downloadFile({ url: largeMovieUri });
  }

  downloadInvalid() {
    //iOS doesn't need permission to download to application cache directory
    //Android can also download to applications external cache directory without permissions
    this.downloadFile({ url: badUri });
  }

  downloadSmallMovie() {
    //iOS doesn't need permission to download to application cache directory
    //Android can also download to applications external cache directory without permissions
    this.downloadFile({ url: smallMovieUrl });
  }

  downloadFile(dlopts: DownloadOptions): void {
    let options: OptionsCommon = {
      message: 'Downloading...',
      progress: 0.0,
      margin: 40,
      dimBackground: true,
      backgroundColor: 'white',
      color: 'black',
      userInteractionEnabled: false,
      hideBezel: false,
      mode: Mode.AnnularDeterminate,
      android: {
        cancelable: false,
      },
      ios: {},
    };
    var indicator;
    //indicator plugin doesn't work on iOS 12
    if (isAndroid || (isIOS && iOSNativeHelper.MajorVersion > 12)) indicator = new LoadingIndicator();

    if (isAndroid || (isIOS && iOSNativeHelper.MajorVersion > 12)) indicator.show(options);
    console.log('starting download');
    const dp = new Downloader();

    dp.on(Downloader.DOWNLOAD_STARTED, (payload: MessageData) => {
      console.log('started', payload?.data?.contentLength);
    });
    dp.on(Downloader.DOWNLOAD_PAUSED, (payload: MessageData) => {
      //this can happen if stalled for a while on Android
      console.log('paused', payload?.data);
    });
    dp.on(Downloader.DOWNLOAD_PROGRESS, (payload: MessageData) => {
      console.log(' >>>>>  ', payload?.data?.progress, payload?.data?.url, payload?.data?.destinationFilename);
      options.progress = +payload.data.progress;
      if (isAndroid || (isIOS && iOSNativeHelper.MajorVersion > 12)) indicator.show(options);
    });
    dp.on(Downloader.DOWNLOAD_COMPLETE, (payload: MessageData) => {
      console.log('finished', payload?.data?.filepath);
      if (isAndroid || (isIOS && iOSNativeHelper.MajorVersion > 12)) indicator.hide();
    });

    dp.on(Downloader.DOWNLOAD_ERROR, (payload: MessageData) => {
      console.log(payload?.data.error);
      if (isAndroid || (isIOS && iOSNativeHelper.MajorVersion > 12)) indicator.hide();
      this.toast('Download FAILED! error: ' + payload?.data.error, ToastStatus.error);
      this.handleFiles(null);
    });

    dp.download(dlopts).then((file: File) => {
      if (!file) {
        if (isAndroid || (isIOS && iOSNativeHelper.MajorVersion > 12)) indicator.hide();
        this.toast('No file resolved!', ToastStatus.error);
        return console.error('Failed to download file!');
      }
      console.log('Finished downloading file ', file.path, file.size);
      if (isAndroid || (isIOS && iOSNativeHelper.MajorVersion > 12)) indicator.hide();
      this.toast('File downloaded!', ToastStatus.success);
      this.handleFiles(file);
    });
  }

  toast(message: string, status: ToastStatus, position: ToastPosition = ToastPosition.TOP, title?: string) {
    if (isAndroid || (isIOS && iOSNativeHelper.MajorVersion > 12)) {
      //this plugin doesn't work on iOS 12
      try {
        const options: any = {
          message,
          title: title?.toUpperCase(),
          type: FeedbackType.Custom,
          messageSize: 18,
          messageColor: new Color('#ffffff'),
          backgroundColor:
            status === ToastStatus.success
              ? new Color('#1194B6')
              : status === ToastStatus.warning
              ? new Color('#FA923C')
              : status === ToastStatus.error
              ? new Color('#F17577')
              : new Color('#2AD3BE') /* normal */,
          position: position === ToastPosition.TOP ? FeedbackPosition.Top : FeedbackPosition.Bottom,
          duration: status === ToastStatus.error || status === ToastStatus.warning ? 2500 : 1500,
          titleColor: new Color('white'),
        };
        feedback.show(options);
      } catch (err) {
        console.error(err);
      }
    } else alert(message);
  }

  handleFiles(result: File): void {
    const itemList: StackLayout = Frame.topmost().getViewById('downloadedFiles');
    itemList.removeChildren();
    if (result) {
      const fileContainer = new StackLayout();

      const previewImage = new Image();
      previewImage.width = 'auto';
      previewImage.height = 150;
      previewImage.src = result.path;
      previewImage.backgroundColor = new Color('#0E1729');
      previewImage.borderRadius = 5;
      previewImage.stretch = 'aspectFit';
      previewImage.marginTop = 10;
      previewImage.marginBottom = 10;
      fileContainer.addChild(previewImage);

      const fileLabel = new Label();
      fileLabel.text = result.name;
      fileLabel.textWrap = true;
      fileLabel.fontSize = 14;
      fileLabel.color = new Color('white');
      fileContainer.addChild(fileLabel);

      const pathLabel = new Label();
      pathLabel.text = `Path: ${result.path}`;
      pathLabel.textWrap = true;
      pathLabel.fontSize = 12;
      pathLabel.marginTop = 5;
      fileContainer.addChild(pathLabel);
      itemList.addChild(fileContainer);
    }
  }
}
