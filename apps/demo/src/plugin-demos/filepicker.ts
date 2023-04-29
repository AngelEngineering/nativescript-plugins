import { EventData, Page, File, Frame, StackLayout, GridLayout, Color, Label, Image, alert, isAndroid, Device } from '@nativescript/core';
import { DemoSharedFilepicker } from '@demo/shared';
import { filePicker, galleryPicker, MediaType, getFreeMBs } from '@angelengineering/filepicker';
import { CheckBox } from '@nstudio/nativescript-checkbox';
import { TempFile } from '@angelengineering/filepicker/files';
import { checkMultiple, check as checkPermission, request, request as requestPermission } from '@nativescript-community/perms';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedFilepicker {
  async pickDocs() {
    let pickedFiles: File[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');

    try {
      pickedFiles = await filePicker(MediaType.DOCUMENT, checkBox.checked);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  async pickImages() {
    let pickedFiles: File[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');

    try {
      pickedFiles = await filePicker(MediaType.IMAGE, checkBox.checked);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }
  async pickVideos() {
    let pickedFiles: File[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      let tempPath = TempFile.getPath('tempfile', 'tmp');
      let freeSpace = getFreeMBs(tempPath);

      console.log('free MBs on file picker temp directory', freeSpace);
      console.log('temp directory path: ', tempPath);
      if (freeSpace > 400) {
        //check before allowing picker to create temp copy of selected files
        pickedFiles = await filePicker(MediaType.VIDEO, checkBox.checked);
      } else alert('Low free space on device, picking not allowed');
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  async pickAudio() {
    let pickedFiles: File[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await filePicker(MediaType.AUDIO, checkBox.checked);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  async pickArchives() {
    let pickedFiles: File[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await filePicker(MediaType.ARCHIVE, checkBox.checked);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  async pickAll() {
    let pickedFiles: File[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      let canPick = true;
      //API33+ needs new perms
      if (isAndroid && +Device.sdkVersion > 32) {
        const result = await checkMultiple({ photo: {}, audio: {}, video: {} });
        if (result['photo'] != 'authorized') {
          console.log('No photo permission, requesting...');
          await request('photo').then((result) => {
            console.log('Request result', result);
            if (result[0] != 'authorized') canPick = false;
          });
        }
        if (result['video'] != 'authorized') {
          console.log('No video permission, requesting...');
          await request('video').then((result) => {
            console.log('Request result', result);
            if (result[0] != 'authorized') canPick = false;
          });
        }
        if (result['audio'] != 'authorized') {
          console.log('No audio permission, requesting...');
          await request('audio').then((result) => {
            console.log('Request result', result);
            if (result[0] != 'authorized') canPick = false;
          });
        }
        console.log('canPick?:', canPick);
      } else if (isAndroid) {
        //just request external_storage perms otherwise
        const result = await checkPermission('storage');
        if (result['storage'] != 'authorized') console.log('No storage permission, requesting...');
        await request('storage').then((result) => {
          console.log('Request result', result);
          if (result['android.permission.READ_EXTERNAL_STORAGE'] != 'authorized') canPick = false;
        });
      }
      if (canPick) pickedFiles = await filePicker(MediaType.ALL, checkBox.checked);
      else return alert('Need permissions before picking! Try again or update in app privacy settings first');
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  async pickImageVideo() {
    let pickedFiles: File[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    //on Android, this will not trigger a perm request so we can just request it to avoid an if isAndroid
    //on iOS, this will ask user only the first time. Once denied, user has to change in settings, so you should handle this in your app
    checkPermission('photo').then(async (permres) => {
      if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
        await requestPermission('photo').then(async (result) => {
          if (result[0] == 'authorized') {
            try {
              pickedFiles = await galleryPicker(MediaType.IMAGE + MediaType.VIDEO, checkBox.checked);
            } catch (err) {
              if (err) alert(err?.message);
            } finally {
              this.handleFiles(pickedFiles);
            }
          } else alert("No permission for files, can't open picker");
        });
      } else alert("No permission for files, can't open picker. Grant this permission in app settings first and then try again");
    });
  }

  handleFiles(results: File[]): void {
    console.log('showed the picker, results:', results);
    const itemList: StackLayout = Frame.topmost().getViewById('pickedFiles');
    itemList.removeChildren();
    if (results)
      results.forEach((file: File) => {
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
        fileLabel.text = file['originalFilename'];
        fileLabel.textWrap = true;
        fileLabel.color = new Color('black');
        fileLabel.row = 0;
        fileLabel.col = 2;
        textContainer.addChild(fileLabel);

        const pathLabel = new Label();
        pathLabel.text = `Path: ${file.path}`;
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
        previewImage.src = file.path;
        previewImage.backgroundColor = new Color('yellow');
        previewImage.borderRadius = 5;
        previewImage.stretch = 'aspectFit';
        previewImage.row = 0;
        previewImage.rowSpan = 2;
        previewImage.col = 0;
        fileContainer.addChild(previewImage);
        itemList.addChild(fileContainer);
      });
  }
}
