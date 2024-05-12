/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { EventData, Page, File, Frame, knownFolders, Button, Label, Color, isAndroid, Device, Progress, isIOS } from '@nativescript/core';
import { DemoSharedTranscoder } from '@demo/shared';
import { filePicker, galleryPicker, MediaType } from '@angelengineering/filepicker';
import { MessageData, Transcoder } from '@angelengineering/transcoder';
import { check as checkPermission, request, request as requestPermission, checkMultiple } from '@nativescript-community/perms';
import { VideoPlayer } from '@angelengineering/videoplayer';
import { executeOnMainThread } from '@nativescript/core/utils';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
  if (isIOS) {
    (page.getViewById('ios-gallery-button') as Button).visibility = 'visible';
  }
}

export class DemoModel extends DemoSharedTranscoder {
  pickedFile: File | undefined = undefined;
  transcoder: Transcoder;
  count = 0;

  constructor() {
    super();
    this.transcoder = new Transcoder();
    //Note: enabling logging may slow down encoding due to frequent event handling and console output
    this.transcoder.setLogLevel('verbose');
  }

  //Pick video from device files
  async pickVideo() {
    this.pickedFile = undefined;
    let canPick = true;
    if (isAndroid && +Device.sdkVersion > 32) {
      const result = await checkMultiple({ photo: {}, audio: {}, video: {} });
      if (result['photo'] != 'authorized') {
        console.log('No photo permission, requesting...');
        await request('photo').then(result => {
          console.log('Request result', result);
          if (result[0] != 'authorized') canPick = false;
        });
      }
      if (result['video'] != 'authorized') {
        console.log('No video permission, requesting...');
        await request('video').then(result => {
          console.log('Request result', result);
          if (result[0] != 'authorized') canPick = false;
        });
      }
      if (result['audio'] != 'authorized') {
        console.log('No audio permission, requesting...');
        await request('audio').then(result => {
          console.log('Request result', result);
          if (result[0] != 'authorized') canPick = false;
        });
      }
      console.log('canPick?:', canPick);
    } else if (isAndroid) {
      //just request external_storage perms otherwise
      const result = await checkPermission('storage');
      if (result['storage'] != 'authorized') console.log('No storage permission, requesting...');
      await request('storage').then(result => {
        console.log('Request result', result);
        if (result['android.permission.READ_EXTERNAL_STORAGE'] != 'authorized') canPick = false;
      });
    }

    if (canPick) {
      const files = await filePicker(MediaType.VIDEO, false);
      console.log('files', files);
      if (files.length) this.pickedFile = files[0];

      console.log('Selected file', this?.pickedFile, this?.pickedFile?.path);
    } else alert('Need permissions to pick files from device storage');
  }

  //Pick video from iOS photos gallery
  async pickVideoGallery() {
    this.pickedFile = undefined;
    checkPermission('photo').then(async permres => {
      if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
        await requestPermission('photo').then(async result => {
          if (result[0] == 'authorized') {
            try {
              const files = await galleryPicker(MediaType.VIDEO, false);
              if (files.length) this.pickedFile = files?.[0];
              console.log('Selected file', this?.pickedFile, this?.pickedFile?.path);
            } catch (err) {
              if (err) alert(err?.message);
            }
          } else alert("No permission for files, can't open picker");
        });
      } else alert("No permission for files, can't open picker. Grant this permission in app settings first and then try again");
    });
  }

  processVideo480() {
    this.processVideo('480p');
  }

  processVideo480FR5() {
    this.processVideo('480p', 5);
  }

  processVideo720() {
    this.processVideo('720p');
  }

  processVideo1080() {
    this.processVideo('1080p');
  }

  processVideo(quality: '480p' | '720p' | '1080p', frameRate?: number) {
    if (!this.pickedFile) {
      const outputDetailsLabel: Label = Frame.topmost().getViewById('outputDetails');
      console.error('No file selected to process');
      outputDetailsLabel.visibility = 'visible';
      outputDetailsLabel.text = `Error: No file selected to process!`;
      outputDetailsLabel.textWrap = true;
      outputDetailsLabel.fontSize = 16;
      outputDetailsLabel.color = new Color('#C70300');
      return;
    }
    const tempPath = knownFolders.documents().getFile(`video-copy-${this.count}.mp4`).path;
    this.count += 1;
    if (File.exists(tempPath)) {
      const file = File.fromPath(tempPath);
      file.removeSync();
    }
    console.log('[PROCESSING STARTED] quality: ' + quality + (frameRate ? ' frameRate:' + frameRate : ''));
    const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as VideoPlayer;
    video.visibility = 'collapsed';
    const outputDetailsLabel: Label = Frame.topmost().getViewById('outputDetails');
    outputDetailsLabel.visibility = 'collapsed';
    const progressBar = Frame.topmost().currentPage.getViewById('transcodingProgress') as Progress;
    progressBar.value = 0;
    this.transcoder.on(Transcoder.TRANSCODING_PROGRESS, (payload: MessageData) => {
      executeOnMainThread(() => {
        progressBar.value = payload.data.progress * 100;
      });
    });
    const timeStarted = new Date().getTime();
    this.transcoder
      .transcode(
        this.pickedFile.path,
        tempPath,
        isAndroid
          ? {
              quality: quality,
              // force: true,  // set to true if you want to force transocding to the same or higher resolution
            }
          : {
              quality: quality,
              frameRate: frameRate || 30,
              // force: true,  // set to true if you want to force transocding to the same or higher resolution
            }
      )
      .then(transcodedFile => {
        if (!transcodedFile) {
          console.error('transcode did not return a file, error occurred!');
          return;
        }
        const timeTaken = (new Date().getTime() - timeStarted) / 1000;
        progressBar.value = 100;
        console.log('[PROCCESSING COMPLETED]', transcodedFile.path);
        console.log('[Original Size]', this.transcoder.getVideoSizeString(this.pickedFile.path));
        const originalResolution = this.transcoder.getVideoResolution(this.pickedFile.path);
        console.log('[Original Resolution]', `${originalResolution.width}x${originalResolution.height}`);
        console.log('[Original Duration]', this.transcoder.getVideoDuration(this.pickedFile.path));
        console.log('[Transcoded Size]', this.transcoder.getVideoSizeString(transcodedFile.path));
        console.log('[Percentage Reduced]', `${(((this.pickedFile.size - transcodedFile.size) / this.pickedFile.size) * 100).toFixed(2)}%`);
        const resolution = this.transcoder.getVideoResolution(tempPath);
        console.log('[Transcoded Resolution]', `${resolution.width}x${resolution.height}`);
        console.log('[Transcoded Duration]', this.transcoder.getVideoDuration(tempPath));
        console.log('[Time Taken]', `${timeTaken} seconds`);
        video.visibility = 'visible';
        video.opacity = 1;
        video.src = tempPath;
        video.loop = true;
        video.controls = true;
        video.play();
        outputDetailsLabel.visibility = 'visible';
        outputDetailsLabel.text = `Output Size: ${this.transcoder.getVideoSizeString(transcodedFile.path)}`;
        outputDetailsLabel.textWrap = true;
        outputDetailsLabel.fontSize = 16;
        outputDetailsLabel.color = new Color('#ffffff');
      })
      .catch(error => {
        console.error('[Error Transcoding]', error);
        outputDetailsLabel.visibility = 'visible';
        outputDetailsLabel.text = `Error: ${error}`;
        outputDetailsLabel.textWrap = true;
        outputDetailsLabel.fontSize = 16;
        outputDetailsLabel.color = new Color('#C70300');
      });
  }
}
