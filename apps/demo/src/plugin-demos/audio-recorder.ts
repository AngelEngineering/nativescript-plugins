import { EventData, Page, File, Frame, StackLayout, GridLayout, Color, Label, Image, alert, Button, isAndroid } from '@nativescript/core';
import { DemoSharedAudioRecorder } from '@demo/shared';
import { AudioRecorder, AudioRecorderOptions } from '@angelengineering/audio-recorder';
import { TempFile } from '@angelengineering/filepicker/files';
import { check as checkPermission, request as requestPermission } from '@nativescript-community/perms';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedAudioRecorder {
  constructor() {
    super();
    this.recorder = new AudioRecorder();
  }

  protected recorder: AudioRecorder;
  protected _isRecording = false;
  protected _recordOptions: AudioRecorderOptions = isAndroid
    ? {
        filename: '',
        metering: true,
        format: android.media.MediaRecorder.OutputFormat.MPEG_4,
        source: null,
        //channels:1,
        // sampleRate:?,
        // bitRate:?,
        // android: { encoder: android.media.MediaRecorder.AudioEncoder.AAC },
        // audioMixing: false,
        infoCallback: (infoObject) => {
          console.log('infoCallback: ', JSON.stringify(infoObject));
        },

        errorCallback: (errorObject) => {
          console.log('errorCallback: ', JSON.stringify(errorObject));
        },
      }
    : {
        filename: '',
        metering: true,
        // format: ?,
        //channels:1,
        // sampleRate:?,
        // bitRate:?,
        // ios:{},
        // audioMixing: false,
        infoCallback: (infoObject) => {
          console.log('infoCallback: ', JSON.stringify(infoObject));
        },

        errorCallback: (errorObject) => {
          console.log('errorCallback: ', JSON.stringify(errorObject));
        },
        // sessionCategory: 'AVAudioSessionCategoryPlayAndRecord',
        // sessionMode:'',
        // sessionRouteSharingPolicy:'',
      };

  recordAudio() {
    checkPermission('microphone').then(async (permres) => {
      if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
        await requestPermission('microphone').then(async (result) => {
          if (result[0] == 'authorized') {
            try {
              console.log('starting recording of an audio file');
              const recordBtn: Button = Frame.topmost().getViewById('recordBtn');
              recordBtn.visibility = 'collapsed';
              const stopBtn: Button = Frame.topmost().getViewById('stopBtn');
              stopBtn.visibility = 'visible';

              //set record options and record
              let tempPath = TempFile.getPath('audio', isAndroid ? '.m4a' : '.caf');
              this._recordOptions.filename = tempPath;
              if (File.exists(tempPath)) {
                // remove file if it exists
                File.fromPath(tempPath).removeSync();
              }
              //   this._playOptions.audioFile = tempPath;
              console.log('starting recording with options', this._recordOptions);
              this._isRecording = true;
              this.recorder
                .record(this._recordOptions)
                .then(() => {
                  console.log('recording audio');
                })
                .catch((err) => {
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

  stopRecording() {
    const recordBtn: Button = Frame.topmost().getViewById('recordBtn');
    recordBtn.visibility = 'visible';
    const stopBtn: Button = Frame.topmost().getViewById('stopBtn');
    stopBtn.visibility = 'collapsed';
    // this.handleRecording();
    this.recorder.stop();
    //check if file exists
    const file = File.fromPath(this._recordOptions.filename);
    console.log(file);
    if (file.size) {
      console.log('YaY! have a non-zero output file with name', this._recordOptions.filename);
      this.handleRecording(file);
    } else {
      console.error('No file found for audio recording with name', this._recordOptions.filename);
    }
  }

  handleRecording(result: File): void {
    console.log('finished recording, output file:', result);
    const outputStack: StackLayout = Frame.topmost().getViewById('outputStack');
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
