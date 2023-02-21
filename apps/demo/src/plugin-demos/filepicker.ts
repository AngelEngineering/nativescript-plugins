import { EventData, Page, Frame, StackLayout, GridLayout, Color, Label, Image } from '@nativescript/core';
import { DemoSharedFilepicker } from '@demo/shared';
import { Filepicker, FPFile, MediaType, getFreeMBs } from '@angelengineering/filepicker';
import { CheckBox } from '@nstudio/nativescript-checkbox';
import { TempFile } from '@angelengineering/filepicker/files';

let picker = new Filepicker();

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedFilepicker {
  async pickDocs() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await picker.showPicker(MediaType.DOCUMENT, checkBox.checked);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }
  async pickImages() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await picker.showPicker(MediaType.IMAGE, checkBox.checked);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }
  async pickVideos() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      let tempPath = TempFile.getPath('tempfile', 'tmp');
      let freeSpace = getFreeMBs(tempPath);

      console.log('free MBs on file picker temp directory', freeSpace);
      console.log('temp directory path: ', tempPath);
      if (freeSpace > 400) {
        //check before allowing picker to create temp copy of selected files
        pickedFiles = await picker.showPicker(MediaType.VIDEO, checkBox.checked);
      } else alert('Low free space on device, picking not allowed');
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }
  async pickAudio() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await picker.showPicker(MediaType.AUDIO, checkBox.checked);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }
  async pickArchives() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await picker.showPicker(MediaType.ARCHIVE, checkBox.checked);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }
  async pickAll() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await picker.showPicker(MediaType.ALL, checkBox.checked);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }
  async pickImageVideo() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await picker.showPicker(MediaType.IMAGE + MediaType.VIDEO, checkBox.checked);
    } catch (err) {
      if (err) alert(err?.message);
    } finally {
      this.handleFiles(pickedFiles);
    }
  }

  handleFiles(results: FPFile[]): void {
    console.log('showed the picker, results:', results);
    const itemList: StackLayout = Frame.topmost().getViewById('pickedFiles');
    itemList.removeChildren();
    if (results)
      results.forEach((file: FPFile) => {
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
        fileLabel.text = file.originalFilename;
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
