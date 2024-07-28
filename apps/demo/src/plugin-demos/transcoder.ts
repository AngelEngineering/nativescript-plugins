/* eslint-disable @nx/enforce-module-boundaries */
import { EventData, Page, File, Frame, knownFolders, Button, Label, Color, Device, Progress, Utils } from '@nativescript/core';
import { DemoSharedTranscoder } from '@demo/shared';
import { filePicker, galleryPicker, MediaType } from '@angelengineering/filepicker';
import { MessageData, Transcoder } from '@angelengineering/transcoder';
import { check as checkPermission, request, request as requestPermission, checkMultiple } from '@nativescript-community/perms';
import { VideoPlayer } from '@angelengineering/videoplayer';
import { AudioPlayer, AudioPlayerOptions } from '@angelengineering/audio-player';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
  if (__IOS__) {
    (page.getViewById('ios-gallery-button') as Button).visibility = 'visible';
    (page.getViewById('audio-convert-button') as Button).visibility = 'collapsed';
    (page.getViewById('audio-picker-button') as Button).visibility = 'collapsed';
    (page.getViewById('mp3-convert-button') as Button).visibility = 'collapsed';
  }
}

type AudioPlayerEventData = EventData & { data: any };

export class DemoModel extends DemoSharedTranscoder {
  pickedFile: File | undefined = undefined;
  pickedAudio: File | undefined = undefined;
  transcoder: Transcoder;
  count = 0;
  timeStarted = 0;

  constructor() {
    super();
    this.transcoder = new Transcoder();
    //Note: enabling logging may slow down encoding due to frequent event handling and console output
    this.transcoder.setLogLevel('verbose');
    this.transcoder.on(Transcoder.TRANSCODING_STARTED, (payload: MessageData) => {
      console.log('Transcoding started');
    });
    this.transcoder.on(Transcoder.TRANSCODING_PROGRESS, (payload: MessageData) => {
      Utils.executeOnMainThread(() => {
        // IMPORTANT! You'll have to wrap any UI updates in `executeOnMainThread` for iOS as the events are emitted from a different thread
        const progressBar = Frame.topmost().currentPage.getViewById('transcodingProgress') as Progress;
        progressBar.value = 0;
        progressBar.value = payload.data.progress * 100;
        console.log('progress', payload.data.progress);
      });
    });
    this.transcoder.on(Transcoder.TRANSCODING_ERROR, (payload: MessageData) => {
      Utils.executeOnMainThread(() => {
        // IMPORTANT! You'll have to wrap any UI updates in `executeOnMainThread` for iOS as the events are emitted from a different thread
        const progressBar = Frame.topmost().currentPage.getViewById('transcodingProgress') as Progress;
        progressBar.value = 0;
        console.error('Error during transcode, reason was:', payload.data.error);
        alert('Error during transcode, reason was: ' + payload.data.error);
      });
    });
    this.transcoder.on(Transcoder.TRANSCODING_COMPLETE, (payload: MessageData) => {
      Utils.executeOnMainThread(() => {
        // IMPORTANT! You'll have to wrap any UI updates in `executeOnMainThread` for iOS as the events are emitted from a different thread
        console.log('complete, output file:', payload.data.output);
        /*
				//NOTE: we do the rest of this in the promise result from the transcode call, though you can do it on this event instead
        const transcodedFile = File.fromPath(payload.data.output);
        const timeTaken = (new Date().getTime() - this.timeStarted) / 1000;

        console.log('[PROCCESSING COMPLETED]', transcodedFile.path);
        console.log('[Original Size]', this.transcoder.getVideoSizeString(this.pickedFile.path));
        const originalResolution = this.transcoder.getVideoResolution(this.pickedFile.path);
        console.log('[Original Resolution]', `${originalResolution.width}x${originalResolution.height}`);
        console.log('[Original Duration]', this.transcoder.getVideoDuration(this.pickedFile.path));
        console.log('[Transcoded Size]', this.transcoder.getVideoSizeString(transcodedFile.path));
        console.log('[Percentage Reduced]', `${(((this.pickedFile.size - transcodedFile.size) / this.pickedFile.size) * 100).toFixed(2)}%`);
        const resolution = this.transcoder.getVideoResolution(transcodedFile.path);
        console.log('[Transcoded Resolution]', `${resolution.width}x${resolution.height}`);
        console.log('[Transcoded Duration]', this.transcoder.getVideoDuration(transcodedFile.path));
        console.log('[Time Taken]', `${timeTaken} seconds`);

        const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as VideoPlayer;
        video.visibility = 'collapsed';
        const outputDetailsLabel: Label = Frame.topmost().getViewById('outputDetails');
        outputDetailsLabel.visibility = 'collapsed';
        video.visibility = 'visible';
        video.opacity = 1;
        video.src = transcodedFile.path;
        video.loop = true;
        video.controls = true;
        video.play();
        console.log('loaded viddo in player from ', transcodedFile.path, video.src);

        outputDetailsLabel.visibility = 'visible';
        outputDetailsLabel.text = `Output Size: ${this.transcoder.getVideoSizeString(transcodedFile.path)}`;
        outputDetailsLabel.textWrap = true;
        outputDetailsLabel.fontSize = 16;
        outputDetailsLabel.color = new Color('#ffffff');
				*/
      });
    });

    this.player = new AudioPlayer();
    this.player.on(AudioPlayer.completeEvent, () => {
      console.log('playback complete event');
    });
    this.player.on(AudioPlayer.seekEvent, () => {
      console.log('seek event');
    });
    this.player.on(AudioPlayer.startedEvent, () => {
      console.log('playback started event');
    });
    this.player.on(AudioPlayer.pausedEvent, () => {
      console.log('playback paused event');
    });
    this.player.on(AudioPlayer.errorEvent, (event: AudioPlayerEventData) => {
      console.error('Error event!', event.data);
    });
  }

  async pickAudio() {
    this.pickedFile = undefined;
    let canPick = true;
    if (__ANDROID__ && +Device.sdkVersion > 32) {
      const result = await checkMultiple({ audio: {} });
      if (result['audio'] != 'authorized') {
        console.log('No audio permission, requesting...');
        await request('audio').then(result => {
          console.log('Request result', result);
          if (result[0] != 'authorized') canPick = false;
        });
      }
      console.log('canPick?:', canPick);
    } else if (__ANDROID__) {
      //just request external_storage perms otherwise
      const result = await checkPermission('storage');
      if (result['storage'] != 'authorized') console.log('No storage permission, requesting...');
      await request('storage').then(result => {
        console.log('Request result', result);
        if (result['android.permission.READ_EXTERNAL_STORAGE'] != 'authorized') canPick = false;
      });
    }

    if (canPick) {
      const files = await filePicker(MediaType.AUDIO, false);
      console.log('files', files);
      if (files.length) this.pickedAudio = files[0];

      console.log('Selected file', this?.pickedAudio, this?.pickedAudio?.path);
    } else alert('Need permissions to pick files from device storage');
  }

  //Pick video from device files
  async pickVideo() {
    this.pickedFile = undefined;
    let canPick = true;
    if (__ANDROID__ && +Device.sdkVersion > 32) {
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
    } else if (__ANDROID__) {
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
    this.processVideo(480);
  }

  processVideo720() {
    this.processVideo(720);
  }

  processVideo1080() {
    this.processVideo(1080);
  }

  protected player: AudioPlayer;

  processAudio() {
    if (!this.pickedAudio) {
      const outputDetailsLabel: Label = Frame.topmost().getViewById('outputDetails');
      console.error('No audio file selected to process');
      outputDetailsLabel.visibility = 'visible';
      outputDetailsLabel.text = `Error: No audio file selected to process!`;
      outputDetailsLabel.textWrap = true;
      outputDetailsLabel.fontSize = 16;
      outputDetailsLabel.color = new Color('#C70300');
      return;
    }
    this.convertAudio(this.pickedAudio.path);
  }

  processURL() {
    this.convertAudio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  }

  convertAudio(inputPath: string) {
    const tempPath = knownFolders.documents().getFile(`audio-${this.count}.mp4`).path;
    this.count += 1;
    if (File.exists(tempPath)) {
      const file = File.fromPath(tempPath);
      file.removeSync();
    }

    this.timeStarted = new Date().getTime();
    const outputDetailsLabel: Label = Frame.topmost().getViewById('outputDetails');

    this.transcoder
      .convertAudioToMp4(inputPath, tempPath)
      .then(transcodedFile => {
        if (!transcodedFile) {
          console.error('transcode did not return a file, error occurred!');
          return;
        }
        const timeTaken = (new Date().getTime() - this.timeStarted) / 1000;
        const progressBar = Frame.topmost().currentPage.getViewById('transcodingProgress') as Progress;

        progressBar.value = 100;
        console.log('[PROCCESSING COMPLETED]', transcodedFile.path);
        // let inputFile = File.fromPath(this.pickedAudio.path);
        // console.log('[Original Size]', inputFile.size);
        let outputFile = File.fromPath(transcodedFile.path);
        console.log('[Transcoded Size]', outputFile.size);
        console.log('[Time Taken]', `${timeTaken} seconds`);

        this._playOptions.audioFile = transcodedFile.path;
        this.player.prepareAudio(this._playOptions).then(status => {
          console.log('done preparing');
          if (status) {
            console.log('duration:', this.player.duration);
            this.player.play().then(() => {
              console.log('done playing (promise complete)');
            });
            const file = File.fromPath(this._playOptions.audioFile);
            console.log('playing file ', file.path, ' with size', file.size);
          } else {
            console.log('ERROR! Unable to prepare audio!');
          }
        });
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

  protected _playOptions: AudioPlayerOptions = {
    audioFile: '',
    loop: false,
    audioMixing: false,
    completeCallback: async result => {
      console.log('AudioPlayer - Audio file playback complete.', result);
    },
    errorCallback: errorObject => {
      console.error('AudioPlayer error!', JSON.stringify(errorObject));
    },
    infoCallback: infoObject => {
      console.info('AudioPlayer info: ', JSON.stringify(infoObject));
    },
  };
  processVideo(height: number, frameRate?: number) {
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
    console.log('[PROCESSING STARTED] height: ' + height + (frameRate ? ' frameRate:' + frameRate : ''));

    this.timeStarted = new Date().getTime();
    const outputDetailsLabel: Label = Frame.topmost().getViewById('outputDetails');

    this.transcoder
      .transcode(this.pickedFile.path, tempPath, {
        height, //allow the plugin to resize to the appropriate width to keep input video aspect ratio
        //width:1280, // you can also set your own width though but distortions will occur if aspect ratio is not maintained
        force: true, //set this to allow transcoding to higher resolutions
      })
      .then(transcodedFile => {
        if (!transcodedFile) {
          console.error('transcode did not return a file, error occurred!');
          return;
        }
        const timeTaken = (new Date().getTime() - this.timeStarted) / 1000;
        const progressBar = Frame.topmost().currentPage.getViewById('transcodingProgress') as Progress;

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

        const video = Frame.topmost().currentPage.getViewById('nativeVideoPlayer') as VideoPlayer;
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
