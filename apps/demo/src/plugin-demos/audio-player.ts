import { EventData, Page, File, Frame, StackLayout, GridLayout, Color, Label, Button, Folder, knownFolders } from '@nativescript/core';
import { DemoSharedAudioPlayer } from '@demo/shared';
import { AudioPlayer, AudioPlayerOptions } from '@angelengineering/audio-player';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedAudioPlayer {
  constructor() {
    super();
    this.player = new AudioPlayer();
  }

  protected player: AudioPlayer;

  protected _playOptions: AudioPlayerOptions = {
    audioFile: '',
    loop: false,
    autoPlay: false,
    // metering:?,
    // pitch:?,
    audioMixing: false,
    // sessionCategory: 'AVAudioSessionCategoryPlayAndRecord',
    //sessionMode:?,
    //sessionRouteSharingPolicy:?,
    completeCallback: async (result) => {
      console.log('AudioPlayer - Audio file playback complete.', result);
    },

    errorCallback: (errorObject) => {
      console.log('AudioPlayer error!', JSON.stringify(errorObject));
    },

    infoCallback: (infoObject) => {
      console.log('AudioPlayer info: ', JSON.stringify(infoObject));
    },
  };

  //Doesn't load on Android
  playLocalCafAudio() {
    // this._playOptions.audioFile = knownFolders.currentApp().path + '/assets/audio/example.caf';
    this._playOptions.audioFile = knownFolders.currentApp().path + '/audio/example.caf';
    // this._playOptions.audioFile = '~/audio/example.caf';
    // if (!File.exists(this._playOptions.audioFile)) {
    //   console.log("ERROR! File for playback doesn't exist!!!!", this._playOptions.audioFile);
    //   if (Folder.exists('~/audio')) {
    //     const folder = Folder.fromPath('~/audio');
    //     console.log('dumping files in path ', '~/audio');
    //     folder
    //       .getEntities()
    //       .then((entities) => {
    //         // entities is an array of files and folders.
    //         entities.forEach((entity) => {
    //           console.log(entity.name);
    //         });
    //       })
    //       .catch((err) => {
    //         // Failed to obtain folder's contents.
    //         console.log(err);
    //       });
    //   } else {
    //     console.log("Audio folder doesn't exist!");
    //     const folder = Folder.fromPath('~/');
    //     console.log('dumping files in path ~/');
    //     folder
    //       .getEntities()
    //       .then((entities) => {
    //         // entities is an array of files and folders.
    //         entities.forEach((entity) => {
    //           console.log(entity.name, entity.path);
    //         });
    //       })
    //       .catch((err) => {
    //         // Failed to obtain folder's contents.
    //         console.log(err);
    //       });
    //     return;
    //   }
    // } else {
    this.player.initFromFile(this._playOptions);
    this.player.play();

    const file = File.fromPath(this._playOptions.audioFile);
    console.log('playing file ', file.path, ' with size', file.size);
    this.showInfo(file);
    // }
  }

  playLocalM4aAudio() {
    this._playOptions.audioFile = knownFolders.currentApp().path + '/audio/example.m4a';
    this.player.initFromFile(this._playOptions);
    this.player.play();

    const file = File.fromPath(this._playOptions.audioFile);
    this.showInfo(file);
  }

  playLocalMp3Audio() {
    this._playOptions.audioFile = knownFolders.currentApp().path + '/audio/example.mp3';
    this.player.initFromFile(this._playOptions);
    this.player.play();

    const file = File.fromPath(this._playOptions.audioFile);
    this.showInfo(file);
  }

  playLocalWavAudio() {
    this._playOptions.audioFile = knownFolders.currentApp().path + '/audio/example.wav';
    this.player.initFromFile(this._playOptions);
    this.player.play();

    const file = File.fromPath(this._playOptions.audioFile);
    this.showInfo(file);
  }

  // url: 'https://www.noiseaddicts.com/samples_1w72b820/2514.mp3';
  // url: 'https://www.noiseaddicts.com/samples_1w72b820/17.mp3';
  // url: 'https://www.noiseaddicts.com/samples_1w72b820/47.mp3';
  playRemoteAudio() {
    this._playOptions.audioFile = 'https://www.noiseaddicts.com/samples_1w72b820/2514.mp3';
    this.player.initFromFile(this._playOptions);
    this.player.play();
    this.showInfo(null);
  }

  stopPlayback() {
    console.log('pausing player');
    this.player.pause();
    // const playBtn: Button = Frame.topmost().getViewById('playBtn');
    // playBtn.visibility = 'visible';
    // const stopPlayBtn: Button = Frame.topmost().getViewById('stopPlayBtn');
    // stopPlayBtn.visibility = 'collapsed';
  }

  showInfo(result: File): void {
    const outputStack: StackLayout = Frame.topmost().getViewById('outputStack');
    outputStack.removeChildren();
    if (!result) {
      outputStack.visibility = 'collapsed';
      return;
    }
    console.log('currently loaded player audio file:', result);

    const fileContainer = new GridLayout();
    fileContainer['rows'] = 'auto';
    fileContainer['columns'] = 'auto, 8, *, auto';
    fileContainer['padding'] = 5;
    fileContainer['margin'] = '1 5';
    fileContainer['borderBottomColor'] = new Color('black');
    fileContainer['borderBottomWidth'] = 1;

    const textContainer = new StackLayout();
    textContainer['row'] = 0;
    textContainer['col'] = 2;
    const fileLabel = new Label();
    let fileParts = result.path.split('/');
    fileLabel.text = fileParts[fileParts.length - 1];
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

    const sizeLabel = new Label();

    sizeLabel.text = 'Size: ' + result.size;
    sizeLabel.textWrap = true;
    sizeLabel.color = new Color('black');
    sizeLabel.row = 0;
    sizeLabel.col = 3;
    textContainer.addChild(sizeLabel);

    fileContainer.addChild(textContainer);

    outputStack.addChild(fileContainer);
    outputStack.visibility = 'visible';
    const outputLabel: Label = Frame.topmost().getViewById('outputLabel');
    outputLabel.visibility = 'visible';
  }
}
