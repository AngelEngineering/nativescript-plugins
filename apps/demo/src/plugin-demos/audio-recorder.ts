/* eslint-disable @nx/enforce-module-boundaries */
import { EventData, Page, File, Frame, StackLayout, GridLayout, Color, Label, Image, alert, Button, isAndroid, path, knownFolders } from '@nativescript/core';
import { DemoSharedAudioRecorder } from '@demo/shared';
import { AudioRecorder, AudioRecorderOptions, getDuration } from '@angelengineering/audio-recorder';
import { check as checkPermission, request as requestPermission } from '@nativescript-community/perms';
import { AudioPlayer, AudioPlayerOptions } from '@angelengineering/audio-player';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

type AudioRecorderEventData = EventData & { data: any };

export class DemoModel extends DemoSharedAudioRecorder {
  constructor() {
    super();
    this.recorder = new AudioRecorder();
    //you can tie into events for updating control states
    this.recorder.on(AudioRecorder.stoppedEvent, () => {
      console.log('audio recording stopped');
    });
    this.recorder.on(AudioRecorder.completeEvent, (event: AudioRecorderEventData) => {
      console.log('audio recording completed, file: ', event.data);
      console.log('recording has duration (ms): ', getDuration(event.data.path));
    });
    this.recorder.on(AudioRecorder.startedEvent, () => {
      console.log('audio recording started');
    });
    this.recorder.on(AudioRecorder.errorEvent, (event: AudioRecorderEventData) => {
      console.log('audio recording error!', event.data);
    });
    this.player = new AudioPlayer();
  }

  protected recorder: AudioRecorder;
  protected player: AudioPlayer;
  protected audioFiles: [string] = null;
  protected lastRecorded: string = null;
  protected sessionPreview: string = null;

  protected _recordOptions: AudioRecorderOptions = {
    filename: null,
    metering: true,
    infoCallback: infoObject => {
      console.log('AudioRecorder infoCallback: ', JSON.stringify(infoObject));
    },
    errorCallback: errorObject => {
      console.log('AudioRecorder errorCallback: ', JSON.stringify(errorObject));
    },
  };

  protected _playOptions: AudioPlayerOptions = {
    audioFile: '',
    loop: false,
    audioMixing: false,
    completeCallback: async () => {
      console.log('Audio file recording complete.');
    },
    errorCallback: errorObject => {
      console.error(JSON.stringify(errorObject));
    },
    infoCallback: infoObject => {
      console.info(JSON.stringify(infoObject));
    },
  };

  recordAudio() {
    checkPermission('microphone').then(async permres => {
      if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
        await requestPermission('microphone').then(async result => {
          if (result[0] == 'authorized') {
            try {
              //An audio recording session will be active until we hit stop, at which point
              //   we merge all segments so far and show a button to play back the final audio
              //   file with filename as specified in recorderOptions.
              //Each time the session is paused, we will prepare a preview file of all segments recorded
              //     so far and present a playback button for that merged preview file, as well
              //     as another button to play back only the recently recorded segment. Another button will
              //     be shown to discard the last recorded segment of audio if user wants to record again.
              let tempFileName: string, outputPath: string;
              if (this._recordOptions.filename == null) {
                //also clear out sessionPreview since we're starting fresh
                this.sessionPreview = null;
                for (let i = 1; i < 999999999; i++) {
                  tempFileName = 'audiorecording-' + i + '.mp4';
                  outputPath = path.join(knownFolders.documents().path, tempFileName);
                  if (!File.exists(outputPath)) break;
                }
                this._recordOptions.filename = outputPath;
                console.log('No session final filename yet, starting new session for final recording:', outputPath);
                //reset controls state
                const playLastBtn: Button = Frame.topmost().getViewById('playLastBtn');
                playLastBtn.visibility = 'collapsed';
                const discardLastBtn: Button = Frame.topmost().getViewById('discardLastBtn');
                discardLastBtn.visibility = 'collapsed';
                const playBtn: Button = Frame.topmost().getViewById('playBtn');
                playBtn.visibility = 'collapsed';
              }
              if (this.sessionPreview == null) {
                for (let i = 1; i < 999999999; i++) {
                  tempFileName = 'audiopreview-' + i + '.mp4';
                  outputPath = path.join(knownFolders.documents().path, tempFileName);
                  if (!File.exists(outputPath)) break;
                }
                this.sessionPreview = outputPath;
                console.log('No session preview filename yet, using :', outputPath);
              }

              for (let i = 1; i < 999999999; i++) {
                tempFileName = 'segment-' + i + '.mp4';
                outputPath = path.join(knownFolders.documents().path, tempFileName);
                if (!File.exists(outputPath)) break;
              }
              console.log('Starting segment recording with temp filename', outputPath);
              const pauseBtn: Button = Frame.topmost().getViewById('pauseBtn');
              const recordBtn: Button = Frame.topmost().getViewById('recordBtn');
              const stopBtn: Button = Frame.topmost().getViewById('stopBtn');
              recordBtn.visibility = 'collapsed';
              pauseBtn.visibility = 'visible';
              stopBtn.visibility = 'visible';

              const tempOptions = Object.assign({}, this._recordOptions);
              this.lastRecorded = tempOptions.filename = outputPath;
              console.log('recording with options', tempOptions);
              this.recorder
                .record(tempOptions)
                .then(() => {
                  console.log('recording audio started');
                })
                .catch(err => {
                  console.error(err);
                });
            } catch (err) {
              if (err) alert(err?.message);
            }
          } else alert("No permission for audio recording, can't start recording");
        });
      } else alert('No permission for audio recording. Grant this permission in app settings first');
    });
  }

  async stopRecording() {
    //done with this session, merge all audio segments so far and prepare playback controls for final file
    const recordBtn: Button = Frame.topmost().getViewById('recordBtn');
    recordBtn.text = 'Record audio';
    recordBtn.visibility = 'visible';
    const stopBtn: Button = Frame.topmost().getViewById('stopBtn');
    stopBtn.visibility = 'collapsed';
    const pauseBtn: Button = Frame.topmost().getViewById('pauseBtn');
    pauseBtn.visibility = 'collapsed';
    if (this.recorder.isRecording()) {
      const lastSegment: File = await this.recorder.stop();
      console.log('segment just recorded', lastSegment, lastSegment.path, lastSegment.size);
      if (!this.audioFiles) {
        this.audioFiles = [lastSegment.path];
      } else {
        this.audioFiles.push(lastSegment.path);
      }
    } else {
      console.log('Was paused, so just preparing final merged audio');
    }

    console.log('stopRecording(): preparing final file', this._recordOptions.filename);
    try {
      const finalfile = await this.recorder.mergeAudioFiles(this.audioFiles, this._recordOptions.filename);
      console.log('merge func returned', finalfile, finalfile.size);
      if (finalfile.size) {
        console.log('audio file merged, deleting temporary files');
        for (let i = 0; i < this.audioFiles.length; i++) {
          if (File.exists(this.audioFiles[i])) {
            // remove file if it exists
            File.fromPath(this.audioFiles[i]).removeSync();
          }
        }
        console.log('Done cleaning out temp files merged');
        this.handleRecording(finalfile);
        this._playOptions.audioFile = finalfile.path;
        const playBtn: Button = Frame.topmost().getViewById('playBtn');
        playBtn.visibility = 'visible';
      } else {
        console.error('No file found for final audio with name', this._recordOptions.filename);
      }
    } catch (err) {
      console.error('Error preparing final file', err);
    }
    File.fromPath(this.sessionPreview).removeSync();
    this.audioFiles = null;
    this.lastRecorded = null;
    this.sessionPreview = this._recordOptions.filename;
    this._recordOptions.filename = null;
    const discardLastBtn: Button = Frame.topmost().getViewById('discardLastBtn');
    discardLastBtn.visibility = 'collapsed';
    const playLastBtn: Button = Frame.topmost().getViewById('playLastBtn');
    playLastBtn.visibility = 'collapsed';

    console.log('Done resetting recording session demo state');
  }

  async pauseRecording() {
    const recordBtn: Button = Frame.topmost().getViewById('recordBtn');
    recordBtn.text = 'Record more audio';
    recordBtn.visibility = 'visible';
    const pauseBtn: Button = Frame.topmost().getViewById('pauseBtn');
    pauseBtn.visibility = 'collapsed';
    console.log('pausing recording for session', this._recordOptions.filename);
    const lastSegment: File = await this.recorder.stop();
    console.log('Segment last recorded:', lastSegment.path);
    if (!this.audioFiles) this.audioFiles = [lastSegment.path];
    else this.audioFiles.push(lastSegment.path);

    //present playback controls for the preview file
    const playLastBtn: Button = Frame.topmost().getViewById('playLastBtn');
    playLastBtn.visibility = 'visible';
    const discardLastBtn: Button = Frame.topmost().getViewById('discardLastBtn');
    discardLastBtn.visibility = 'visible';
    this._playOptions.audioFile = lastSegment.path;

    //prepare a preview of all segments so far
    const previewfile = await this.recorder.mergeAudioFiles(this.audioFiles, this.sessionPreview);
    if (previewfile.size) {
      console.log('audio preview files merged');
      const playBtn: Button = Frame.topmost().getViewById('playBtn');
      playBtn.visibility = 'visible';
    }
  }

  playRecording() {
    console.log('playRecording(): playing all audio segments recorded during this session');
    if (!this.sessionPreview) {
      alert('No preview filename set yet');
      return;
    }
    this.player.pause();
    this._playOptions.audioFile = this.sessionPreview;
    this.player.prepareAudio(this._playOptions).then(() => {
      this.player.play();
    });
  }

  playLastsegment() {
    if (!this.audioFiles) {
      alert('No segments recorded yet');
      return;
    }
    this.player.pause();
    console.log('playLastsegment()', this.audioFiles[this.audioFiles.length - 1]);
    this._playOptions.audioFile = this.audioFiles[this.audioFiles.length - 1];
    this.player.prepareAudio(this._playOptions).then(() => {
      console.log('audio prepared, playing');
      this.player.play();
    });
  }

  async discardLastSegment() {
    console.log('discardLastSegment()', this.audioFiles[this.audioFiles.length - 1]);
    this.audioFiles.splice(this.audioFiles.length - 1, 1);
    this.player.pause();
    const playBtn: Button = Frame.topmost().getViewById('playBtn');
    if (this.audioFiles.length) {
      //generate new preview files
      const previewfile = await this.recorder.mergeAudioFiles(this.audioFiles, this.sessionPreview);
      if (previewfile.size) {
        console.log('audio preview files merged');
        playBtn.visibility = 'visible';
      }
    } else {
      playBtn.visibility = 'collapsed';
    }
    const playLastBtn: Button = Frame.topmost().getViewById('playLastBtn');
    playLastBtn.visibility = 'collapsed';
    const discardLastBtn: Button = Frame.topmost().getViewById('discardLastBtn');
    discardLastBtn.visibility = 'collapsed';
  }

  stopPlayback() {
    console.log('stopPlayback()');
    this.player.pause();
    const playBtn: Button = Frame.topmost().getViewById('playBtn');
    playBtn.visibility = 'visible';
    const stopPlayBtn: Button = Frame.topmost().getViewById('stopPlayBtn');
    stopPlayBtn.visibility = 'collapsed';
  }

  handleRecording(result: File): void {
    console.log('handleRecording(): file:', result);
    const outputStack: StackLayout = Frame.topmost().getViewById('outputStack');
    outputStack.removeChildren();
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
    const fileParts = result?.path?.split('/');
    fileLabel.text = fileParts[fileParts.length - 1];
    fileLabel.textWrap = true;
    fileLabel.color = new Color('white');
    fileLabel.row = 0;
    fileLabel.col = 2;
    textContainer.addChild(fileLabel);

    const pathLabel = new Label();
    pathLabel.text = `Path: ${result?.path}`;
    pathLabel.textWrap = true;
    pathLabel.color = new Color('white');
    pathLabel.verticalAlignment = 'top';
    pathLabel.row = 1;
    pathLabel.col = 2;
    textContainer.addChild(pathLabel);

    const sizeLabel = new Label();

    sizeLabel.text = 'Size: ' + result?.size;
    sizeLabel.textWrap = true;
    sizeLabel.color = new Color('white');
    sizeLabel.row = 0;
    sizeLabel.col = 3;
    textContainer.addChild(sizeLabel);

    fileContainer.addChild(textContainer);

    outputStack.addChild(fileContainer);
    outputStack.visibility = 'visible';
  }
}
