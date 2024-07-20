/* eslint-disable @nx/enforce-module-boundaries */
import { EventData, Page, isAndroid, File, Frame, StackLayout, GridLayout, Color, Label, knownFolders } from '@nativescript/core';
import { DemoSharedAudioPlayer } from '@demo/shared';
import { AudioPlayer, AudioPlayerOptions } from '@angelengineering/audio-player';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

type AudioPlayerEventData = EventData & { data: any };

export class DemoModel extends DemoSharedAudioPlayer {
  constructor() {
    super();
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

  //CAF files don't load on Android, iOS only
  playLocalCafAudio() {
    if (isAndroid) {
      console.error('This is only available on iOS!');
      return;
    }
    this._playOptions.audioFile = knownFolders.currentApp().path + '/audio/example.caf';
    this.player
      .prepareAudio(this._playOptions)
      .then(status => {
        console.log('done preparing');
        if (status) {
          const file = File.fromPath(this._playOptions.audioFile);
          console.log('loaded file ', file.path, ' with size', file.size);
          this.showInfo(file);
          this.player.play().then(() => {
            console.log('done playing (promise complete)');
          });
          console.log('playing');
        } else {
          console.log('ERROR! Unable to prepare audio!');
        }
      })
      .catch(ex => {
        console.error('error preparing file!', ex);
      });
  }

  playLocalM4aAudio() {
    this._playOptions.audioFile = knownFolders.currentApp().path + '/audio/example.m4a';
    this.player.prepareAudio(this._playOptions).then(status => {
      console.log('done preparing');
      if (status) {
        this.player.play().then(() => {
          console.log('done playing (promise complete)');
        });
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
    this.player.prepareAudio(this._playOptions).then(status => {
      console.log('done preparing');
      if (status) {
        this.player.play().then(() => {
          console.log('done playing (promise complete)');
        });
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
    this.player.prepareAudio(this._playOptions).then(status => {
      console.log('done preparing');
      if (status) {
        this.player.play().then(() => {
          console.log('done playing (promise complete)');
        });
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
    this.player
      .prepareAudio(this._playOptions)
      .then(status => {
        console.log('done preparing');
        if (status) {
          this.player
            .play()
            .then(() => {
              console.log('done playing (promise complete)');
            })
            .catch(err => {
              console.error('error during playback!', err);
            });
          console.log('playing remote url ', this._playOptions.audioFile);
          this.showInfo(null);
        } else {
          console.log('ERROR! Unable to prepare audio!');
        }
      })
      .catch(err => {
        console.error('error during prepare!', err);
      });
  }

  stopPlayback() {
    console.log('stop player');
    this.player.pause();
  }

  showInfo(result: File): void {
    const outputStack: StackLayout = Frame.topmost().getViewById('outputStack');
    const outputLabel: Label = Frame.topmost().getViewById('outputLabel');
    outputStack.removeChildren();
    if (!result) {
      outputLabel.visibility = outputStack.visibility = 'collapsed';
      return;
    }
    console.log('currently loaded player audio file:', result);

    const fileContainer = new GridLayout();
    fileContainer['rows'] = 'auto';
    fileContainer['columns'] = 'auto, 8, *, auto';
    fileContainer['padding'] = 5;
    fileContainer['margin'] = '1 5';
    fileContainer['borderBottomColor'] = new Color('white');
    fileContainer['borderBottomWidth'] = 1;

    const textContainer = new StackLayout();
    textContainer['row'] = 0;
    textContainer['col'] = 2;
    const fileLabel = new Label();
    const fileParts = result.path.split('/');
    fileLabel.text = fileParts[fileParts.length - 1];
    fileLabel.textWrap = true;
    fileLabel.color = new Color('white');
    fileLabel.row = 0;
    fileLabel.col = 2;
    textContainer.addChild(fileLabel);

    const pathLabel = new Label();
    pathLabel.text = `Path: ${result.path}`;
    pathLabel.textWrap = true;
    pathLabel.color = new Color('white');
    pathLabel.verticalAlignment = 'top';
    pathLabel.row = 1;
    pathLabel.col = 2;
    textContainer.addChild(pathLabel);

    const sizeLabel = new Label();

    sizeLabel.text = 'Size: ' + result.size;
    sizeLabel.textWrap = true;
    sizeLabel.color = new Color('white');
    sizeLabel.row = 0;
    sizeLabel.col = 3;
    textContainer.addChild(sizeLabel);

    fileContainer.addChild(textContainer);

    outputStack.addChild(fileContainer);
    outputStack.visibility = 'visible';
    outputLabel.visibility = 'visible';
  }
}
