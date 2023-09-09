import { EventData, Page, File, Frame, StackLayout, GridLayout, Color, Label, knownFolders } from '@nativescript/core';
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

  //Doesn't load on Android, iOS only
  playLocalCafAudio() {
    this._playOptions.audioFile = knownFolders.currentApp().path + '/audio/example.caf';
    let inputFile = File.fromPath(this._playOptions.audioFile);
    if (!inputFile || inputFile.size == 0) {
      console.error('Unable to locate input file! ', this._playOptions.audioFile);
      alert('Unable to locate input file! ' + this._playOptions.audioFile);
      return;
    }
    this.player.prepareAudio(this._playOptions).then(status => {
      console.log('done preparing');
      if (status) {
        const file = File.fromPath(this._playOptions.audioFile);
        console.log('loaded file ', file.path, ' with size', file.size);
        this.showInfo(file);
        this.player.play();
        console.log('playing');
      } else {
        console.log('ERROR! Unable to prepare audio!');
      }
    });
  }

  playLocalM4aAudio() {
    this._playOptions.audioFile = knownFolders.currentApp().path + '/audio/example.m4a';
    let inputFile = File.fromPath(this._playOptions.audioFile);
    if (!inputFile || inputFile.size == 0) {
      console.error('Unable to locate input file! ', this._playOptions.audioFile);
      alert('Unable to locate input file! ' + this._playOptions.audioFile);
      return;
    }
    this.player.prepareAudio(this._playOptions).then(status => {
      console.log('done preparing');
      if (status) {
        this.player.play();
        const file = File.fromPath(this._playOptions.audioFile);
        console.log('playing file ', file.path, ' with size', file.size);
        this.showInfo(file);
      } else {
        console.log('ERROR! Unable to prepare audio!');
      }
    });
  }

  playLocalMp3Audio() {
    this._playOptions.audioFile = knownFolders.currentApp().path + '/audio/example.mp3';
    let inputFile = File.fromPath(this._playOptions.audioFile);
    if (!inputFile || inputFile.size == 0) {
      console.error('Unable to locate input file! ', this._playOptions.audioFile);
      alert('Unable to locate input file! ' + this._playOptions.audioFile);
      return;
    }
    this.player.prepareAudio(this._playOptions).then(status => {
      console.log('done preparing');
      if (status) {
        this.player.play();
        const file = File.fromPath(this._playOptions.audioFile);
        console.log('playing file ', file.path, ' with size', file.size);
        this.showInfo(file);
      } else {
        console.log('ERROR! Unable to prepare audio!');
      }
    });
  }

  playLocalWavAudio() {
    this._playOptions.audioFile = knownFolders.currentApp().path + '/audio/example.wav';
    let inputFile = File.fromPath(this._playOptions.audioFile);
    if (!inputFile || inputFile.size == 0) {
      console.error('Unable to locate input file! ', this._playOptions.audioFile);
      alert('Unable to locate input file! ' + this._playOptions.audioFile);
      return;
    }
    this.player.prepareAudio(this._playOptions).then(status => {
      console.log('done preparing');
      if (status) {
        this.player.play();
        const file = File.fromPath(this._playOptions.audioFile);
        console.log('playing file ', file.path, ' with size', file.size);
        this.showInfo(file);
      } else {
        console.log('ERROR! Unable to prepare audio!');
      }
    });
  }

  playRemoteAudio() {
    this._playOptions.audioFile = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    // await this.player.play().then(res=>{console.log("returned ",res)}).catch(err=>{console.error("error:",err)})
    this.player.prepareAudio(this._playOptions).then(status => {
      console.log('done preparing');
      if (status) {
        this.player.play();
        console.log('playing remote url ', this._playOptions.audioFile);
        this.showInfo(null);
      } else {
        console.log('ERROR! Unable to prepare audio!');
      }
    });
  }

  stopPlayback() {
    console.log('stop player');
    this.player.pause();
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
