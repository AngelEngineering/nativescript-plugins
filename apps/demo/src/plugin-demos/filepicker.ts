import { Observable, EventData, Page, Frame, knownFolders } from '@nativescript/core';
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
      alert(err.message);
    } finally {
      console.dir(pickedFiles);
    }
  }
  async pickImages() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await picker.showPicker(MediaType.IMAGE, checkBox.checked);
    } catch (err) {
      alert(err.message);
    } finally {
      console.dir(pickedFiles);
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
      alert(err.message);
    } finally {
      console.dir(pickedFiles);
    }
  }
  async pickAudio() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await picker.showPicker(MediaType.AUDIO, checkBox.checked);
    } catch (err) {
      alert(err.message);
    } finally {
      console.dir(pickedFiles);
    }
  }
  async pickArchives() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await picker.showPicker(MediaType.ARCHIVE, checkBox.checked);
    } catch (err) {
      alert(err.message);
    } finally {
      console.dir(pickedFiles);
    }
  }
  async pickAll() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await picker.showPicker(MediaType.ALL, checkBox.checked);
    } catch (err) {
      alert(err.message);
    } finally {
      console.dir(pickedFiles);
    }
  }
  async pickImageVideo() {
    let pickedFiles: FPFile[];
    const checkBox: CheckBox = Frame.topmost().getViewById('demoCheckbox');
    try {
      pickedFiles = await picker.showPicker(MediaType.IMAGE + MediaType.VIDEO, checkBox.checked);
    } catch (err) {
      alert(err.message);
    } finally {
      console.dir(pickedFiles);
    }
  }
}
