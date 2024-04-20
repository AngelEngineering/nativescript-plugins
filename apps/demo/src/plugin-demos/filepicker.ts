/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { EventData, Page, File, Frame, StackLayout, Color, Label, Image, alert, isAndroid, Device } from '@nativescript/core';
import { DemoSharedFilepicker } from '@demo/shared';
import { filePicker, galleryPicker, MediaType, getFreeMBs } from '@angelengineering/filepicker';
import { TempFile } from '@angelengineering/filepicker/files';
import { checkMultiple, check as checkPermission, request, request as requestPermission } from '@nativescript-community/perms';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}
export class DemoModel extends DemoSharedFilepicker {
  async pickAllOne() {
    let pickedFiles: File[];

    try {
      let canPick = true;
      //API33+ needs new perms
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
      } else if (isAndroid && +Device.sdkVersion < 26) {
        //request external_storage perms for API <26 devices when targeting API34+
        const result = await checkPermission('storage');
        if (result['storage'] != 'authorized') console.log('No storage permission, requesting...');
        await request('storage').then(result => {
          console.log('Request result', result);
          if (result['android.permission.READ_EXTERNAL_STORAGE'] != 'authorized') canPick = false;
        });
      }
      if (canPick) pickedFiles = await filePicker(MediaType.ALL, false);
      else return alert('Need permissions before picking! Try again or update in app privacy settings first');
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  async pickAll() {
    let pickedFiles: File[];

    try {
      let canPick = true;
      //API33+ needs new perms
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
      } else if (isAndroid && +Device.sdkVersion < 26) {
        //request external_storage perms for API <26 devices when targeting API34+
        const result = await checkPermission('storage');
        if (result['storage'] != 'authorized') console.log('No storage permission, requesting...');
        await request('storage').then(result => {
          console.log('Request result', result);
          if (result['android.permission.READ_EXTERNAL_STORAGE'] != 'authorized') canPick = false;
        });
      }
      if (canPick) pickedFiles = await filePicker(MediaType.ALL, true);
      else return alert('Need permissions before picking! Try again or update in app privacy settings first');
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }
  async pickImageVideo() {
    let pickedFiles: File[];

    //on Android, this will not trigger a perm request so we can just request it to avoid an if isAndroid
    //on iOS, this will ask user only the first time. Once denied, user has to change in settings, so you should handle this in your app
    checkPermission('photo').then(async permres => {
      if (permres[0] == 'undetermined' || permres[0] == 'authorized') {
        await requestPermission('photo').then(async result => {
          if (result[0] == 'authorized') {
            try {
              pickedFiles = await galleryPicker(MediaType.IMAGE + MediaType.VIDEO, true);
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

  //The following examples may require permissions depending on the platform, OS version and build target,
  //   check the Readme for more information or look at the examples above.
  async pickDoc() {
    let pickedFiles: File[];
    try {
      pickedFiles = await filePicker(MediaType.DOCUMENT, false);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  async pickImage() {
    let pickedFiles: File[];
    try {
      pickedFiles = await filePicker(MediaType.IMAGE, false);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  async pickImages() {
    let pickedFiles: File[];
    try {
      pickedFiles = await filePicker(MediaType.IMAGE, true);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  async pickVideo() {
    let pickedFiles: File[];

    try {
      const tempPath = TempFile.getPath('tempfile', 'tmp');
      const freeSpace = getFreeMBs(tempPath);

      console.log('free MBs on file picker temp directory', freeSpace);
      console.log('temp directory path: ', tempPath);
      if (freeSpace > 400) {
        //check before allowing picker to create temp copy of selected files
        pickedFiles = await filePicker(MediaType.VIDEO, false);
      } else alert('Low free space on device, picking not allowed');
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  async pickAudio() {
    let pickedFiles: File[];

    try {
      pickedFiles = await filePicker(MediaType.AUDIO, false);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  async pickArchive() {
    let pickedFiles: File[];

    try {
      pickedFiles = await filePicker(MediaType.ARCHIVE, false);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  handleFiles(results: File[]): void {
    console.log('showed the picker, results:', results);
    const itemList: StackLayout = Frame.topmost().getViewById('pickedFiles');
    itemList.removeChildren();
    if (results)
      results.forEach((file: File) => {
        const fileContainer = new StackLayout();

        const previewImage = new Image();
        previewImage.width = 'auto';
        previewImage.height = 150;
        previewImage.src = file.path;
        previewImage.backgroundColor = new Color('#0E1729');
        previewImage.borderRadius = 5;
        previewImage.stretch = 'aspectFit';
        previewImage.marginTop = 10;
        previewImage.marginBottom = 10;
        fileContainer.addChild(previewImage);

        const fileLabel = new Label();
        fileLabel.text = file['originalFilename'];
        fileLabel.textWrap = true;
        fileLabel.fontSize = 14;
        fileLabel.color = new Color('#ffffff');
        fileContainer.addChild(fileLabel);

        const pathLabel = new Label();
        pathLabel.text = `Path: ${file.path}`;
        pathLabel.textWrap = true;
        pathLabel.fontSize = 12;
        pathLabel.marginTop = 5;
        fileContainer.addChild(pathLabel);

        itemList.addChild(fileContainer);
      });
  }
}
