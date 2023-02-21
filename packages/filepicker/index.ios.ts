import { FilepickerCommon, MediaType, FPFile } from './common';
import { Application, action, ActionOptions, File, Color } from '@nativescript/core';
import { iOSNativeHelper } from '@nativescript/core/utils';
import { AssetDownloader, TempFile } from './files';

export { FPFile } from './common';
export { MediaType } from './common';
export { getFreeMBs } from './common';

export class Filepicker extends FilepickerCommon {
  constructor() {
    super();
  }

  protected _iosDocumentPickerController: UIDocumentPickerViewController;
  protected _iosGalleryPickerController: UIImagePickerController;
  protected _iosPHPickerController: any; //for iOS<14 we use UIImagePicker. ios14+ uses PHPicker

  public showPicker(type: MediaType, multiple: boolean): Promise<FPFile[]> {
    // console.log('showPicker() ', type, multiple);

    if (type == MediaType.IMAGE || type == MediaType.VIDEO || type == MediaType.IMAGE + MediaType.VIDEO) {
      // console.log('Only selecting image/video/both, show choice dialog');
      // present an action dialog to determine where they'd like to load from
      const message = 'Add ' + (type == MediaType.IMAGE ? 'Images' : type == MediaType.VIDEO ? 'Videos' : 'Images and Videos') + ' from?';
      const actionOptions: ActionOptions = {
        message: message,
        cancelButtonText: 'Cancel',
        actions: ['Photos', 'Files'],
      };
      return action(actionOptions).then((result) => {
        console.log(result);
        if (result == 'Photos') {
          //NOTE: iOS 14 adds new photo gallery privacy access restrictions for UIImagePicker, and introduces
          //     the new PHPicker component which doesn't requires perms and now supports multiple selections.
          if (+iOSNativeHelper.MajorVersion >= 14) {
            console.log('iOS version>=14, using Phpicker');
            return this.PHPicker(type, multiple);
          }
          //gallery UIImage Picker version(images and video) for ios<14
          //NOTE: the iOS UIImagePickerController does not allow multiple selections
          else return this.ImgPicker(type);
        } else if (result == 'Files') {
          //file provider picker version (doesn't need file system/gallery permissions)
          return this.DocPicker(type, multiple);
        } else return Promise.reject(null);
      });
    } else {
      // console.log('Can only select these types from document picker');
      return this.DocPicker(type, multiple);
    }
  }

  private PHPicker(type: MediaType, multiple: boolean): Promise<[FPFile]> {
    return new Promise((resolve, reject) => {
      console.log('multiple?', multiple);
      const config: PHPickerConfiguration = PHPickerConfiguration.new();
      config.selectionLimit = multiple ? 0 : 1;
      config.filter = PHPickerFilter.anyFilterMatchingSubfilters(iOSNativeHelper.collections.jsArrayToNSArray(getPHTypes(type)));
      this._iosPHPickerController = new PHPickerViewController({ configuration: config });
      const delegate = PHPickerViewControllerDelegateImpl.new().initWithCallbackAndOptions(resolve, reject, this);
      delegate.registerToGlobal();
      this._iosPHPickerController.delegate = delegate;
      (Application.ios.rootController as UIViewController).presentViewControllerAnimatedCompletion(this._iosPHPickerController, true, null);
    });
  }

  private ImgPicker(type: MediaType): Promise<[FPFile]> {
    return new Promise((resolve, reject) => {
      this._iosGalleryPickerController = UIImagePickerController.new();
      let mediaTypes = iOSNativeHelper.collections.jsArrayToNSArray(getMediaTypes(type));
      this._iosGalleryPickerController.mediaTypes = mediaTypes;
      //image/video editing not allowed for now as we need to process changes manually for iOS gallery picker
      this._iosGalleryPickerController.allowsEditing = false;
      this._iosGalleryPickerController.allowsImageEditing = false;

      const delegate = UIImagePickerControllerDelegateImpl.new().initWithCallbackAndOptions(resolve, reject, this);
      delegate.registerToGlobal();
      this._iosGalleryPickerController.delegate = delegate;
      (Application.ios.rootController as UIViewController).presentViewControllerAnimatedCompletion(this._iosGalleryPickerController, true, null);
    });
  }

  private DocPicker(type: MediaType, multiple: boolean): Promise<[FPFile]> {
    return new Promise((resolve, reject) => {
      let mediaTypes = iOSNativeHelper.collections.jsArrayToNSArray(getMediaTypes(type));
      this._iosDocumentPickerController = UIDocumentPickerViewController.alloc().initWithDocumentTypesInMode(
        mediaTypes,
        UIDocumentPickerMode.Import
        //Import mode is less restrictive than Open and doesn't require a file coordinator
      );
      // This picker does allow multiple selections if user chooses selection view
      this._iosDocumentPickerController.allowsMultipleSelection = multiple;
      // This doesn't actually show extensions, but we'll set it anyway
      this._iosDocumentPickerController.shouldShowFileExtensions = true;
      // If fullscreen style is used, delegate return handler throws an access error
      // If CurrentContext or others are used, delegate methods are never called
      this._iosDocumentPickerController.modalPresentationStyle = UIModalPresentationStyle.FormSheet;

      const delegate = UIDocumentPickerDelegateImpl.new().initWithCallbackAndOptions(resolve, reject, this);
      delegate.registerToGlobal();
      this._iosDocumentPickerController.delegate = delegate;

      (Application.ios.rootController as UIViewController).presentViewControllerAnimatedCompletion(this._iosDocumentPickerController, true, null);
    });
  }
}

//Document Picker delegate
@NativeClass()
class UIDocumentPickerDelegateImpl extends NSObject implements UIDocumentPickerDelegate {
  public static ObjCProtocols = [UIDocumentPickerDelegate];

  static new(): UIDocumentPickerDelegateImpl {
    return <UIDocumentPickerDelegateImpl>super.new();
  }

  private _owner: WeakRef<Filepicker>;
  private _resolve: any;
  private _reject: any;
  public initWithCallbackAndOptions(callback: (result?) => void, errorCallback: (result?) => void, owner: any): UIDocumentPickerDelegateImpl {
    this._resolve = callback;
    this._reject = errorCallback;
    this._owner = owner;
    return this;
  }

  //Need to maintain a reference otherwise iOS tends to clean it up when leaving app to launch picker
  public registerToGlobal(): any {
    (<any>global).documentPickerDelegate = this;
  }

  public deRegisterFromGlobal(): any {
    (<any>global).documentPickerDelegate = null;
  }

  public owner() {
    if (!this._owner) return null;
    return this._owner.get() as Filepicker;
  }

  // if only single selection is allowed? sometimes, usually the next one handles all returns
  documentPickerDidPickDocumentAtURL(controller: UIDocumentPickerViewController, url: NSURL): void {
    let access = url.startAccessingSecurityScopedResource();
    // log('access: ', access);
    // log('>>> did pick document >>>');
    let tmppath = TempFile.getPath('asset', '.tmp');
    File.fromPath(tmppath).removeSync();
    let success = NSFileManager.defaultManager.copyItemAtPathToPathError(url.path, tmppath);
    // log('copy success?', success);
    const file = File.fromPath(tmppath);
    // persist original file name and extension in tmp file
    const originalFilename = url.lastPathComponent;
    const newPath = tmppath.replace(/\/[^/]+$/, `/${originalFilename}`);
    if (File.exists(newPath)) {
      // remove file if it exists
      File.fromPath(newPath).removeSync();
    }
    // add originalFilename property
    file['originalFilename'] = originalFilename;
    // update name so uploaded file will have the same name as the original file
    file.renameSync(originalFilename);
    url.stopAccessingSecurityScopedResource();
    controller.dismissViewControllerAnimatedCompletion(true, null);
    this._resolve([file]);
    this.deRegisterFromGlobal();
  }

  //if multiple selections allowed:
  documentPickerDidPickDocumentsAtURLs(controller: UIDocumentPickerViewController, urls: NSArray<NSURL>): void {
    const files: File[] = [];
    //This view can't display an UIActivityIndicatorView inside it using our usual ios spinner approach,
    //    but picker shows a small spinner on the "Open" button while processing
    //Process picker results
    for (let i = 0; i < urls.count; i++) {
      let url = urls.objectAtIndex(i); //urls[0];
      let access = url.startAccessingSecurityScopedResource();
      // log('access: ', access);
      // log('>>> did pick documents >>>', url.absoluteString);
      //can't access directly, need to copy first to local app directory
      let tmppath = TempFile.getPath('asset', '.tmp');
      // log('Will save file to temp path: ', tmppath);
      File.fromPath(tmppath).removeSync();
      let suc = NSFileManager.defaultManager.copyItemAtPathToPathError(url.path, tmppath);
      // log('copy success?', suc);
      const file = File.fromPath(tmppath);
      // file['originalFilename'] = url.lastPathComponent;
      // files.push(file);
      // persist original file name and extension in tmp file
      const originalFilename = url.lastPathComponent;
      const newPath = tmppath.replace(/\/[^/]+$/, `/${originalFilename}`);
      if (File.exists(newPath)) {
        // remove file if it exists
        File.fromPath(newPath).removeSync();
      }
      // add originalFilename property
      file['originalFilename'] = originalFilename;
      // update name so uploaded file will have the same name as the original file
      file.renameSync(originalFilename);
      files.push(file as File);
      if (access) url.stopAccessingSecurityScopedResource();
    }
    controller.dismissViewControllerAnimatedCompletion(true, null);
    this._resolve(files);
    this.deRegisterFromGlobal();
  }

  documentPickerWasCancelled(controller: UIDocumentPickerViewController): void {
    // log('>>> did cancel document picker >>>');
    controller.dismissViewControllerAnimatedCompletion(true, null);
    this._reject(null);
    this.deRegisterFromGlobal();
  }
}

//Image Gallery Picker delegate
@NativeClass()
class UIImagePickerControllerDelegateImpl extends NSObject implements UIImagePickerControllerDelegate {
  public static ObjCProtocols = [UIImagePickerControllerDelegate];

  static new(): UIImagePickerControllerDelegateImpl {
    return <UIImagePickerControllerDelegateImpl>super.new();
  }

  private _owner: WeakRef<Filepicker>;
  private _resolve: any;
  private _reject: any;

  public initWithCallbackAndOptions(callback: (result?) => void, errorCallback: (result?) => void, owner: any): UIImagePickerControllerDelegateImpl {
    this._resolve = callback;
    this._reject = errorCallback;
    this._owner = owner;
    return this;
  }

  //Need to maintain a reference otherwise iOS tends to clean it up when leaving app to launch picker
  public registerToGlobal(): any {
    (<any>global).galleryPickerDelegate = this;
  }

  public deRegisterFromGlobal(): any {
    (<any>global).galleryPickerDelegate = null;
  }

  public owner() {
    if (!this._owner) return null;
    return this._owner.get() as Filepicker;
  }

  //returns media item picked from gallery
  imagePickerControllerDidFinishPickingMediaWithInfo(picker: UIImagePickerController, info: NSDictionary<string, any>): void {
    // log('>>> imagePickerControllerDidFinishPickingMediaWithInfo >>>');
    if (info) {
      //This view can't display an UIActivityIndicatorView inside it using our usual ios spinner approach,
      //    but picker shows a progress indicator when preparing video media, and images return almost instantly

      // let media = info.valueForKey(UIImagePickerControllerMediaURL);
      // let image = info.valueForKey(UIImagePickerControllerOriginalImage);
      // let image_edited = info.valueForKey(UIImagePickerControllerEditedImage);
      let asset = info.valueForKey(UIImagePickerControllerPHAsset);
      // let type = info.valueForKey(UIImagePickerControllerMediaType);
      // let meta = info.valueForKey(UIImagePickerControllerMediaMetadata);
      // log('picked media info: ', media, image, image_edited, asset, type, meta);
      const downloader = new AssetDownloader(asset);
      downloader.download().then((res) => {
        this._resolve([res]); //returns a NS file object although filename will be of form assset???.tmp, but has originalFilename attached
      });
    } else {
      // log('>>> nothing returned from picker >>>');
      this._reject();
    }
    if (!!picker && !!picker.presentingViewController) picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
    this.deRegisterFromGlobal();
  }

  //this should never be called unless we enable editing for ios gallery selections
  imagePickerControllerDidFinishPickingImageEditingInfo(picker: UIImagePickerController, image: UIImage, editingInfo: NSDictionary<string, any>) {
    console.warn('WARNING: image picker editing feature has not yet been fully implemented!', {
      sentryCategory: 'picker:warn',
    });
    // log('>>> imagePickerControllerDidFinishPickingImageEditingInfo >>>');
    if (!!picker && !!picker.presentingViewController) picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
    // log('>>> image >>>', image, editingInfo);
    this._reject();
    this.deRegisterFromGlobal();
  }

  imagePickerControllerDidCancel(picker: UIImagePickerController): void {
    // log('>>> imagePickerControllerDidCancel >>>');
    if (!!picker && !!picker.presentingViewController) picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
    this._reject();
    this.deRegisterFromGlobal();
  }
}

// iOS 14+ Image Gallery PHPicker delegate
@NativeClass()
class PHPickerViewControllerDelegateImpl extends NSObject implements PHPickerViewControllerDelegate {
  public static ObjCProtocols = [+iOSNativeHelper.MajorVersion >= 14 ? PHPickerViewControllerDelegate : UIImagePickerControllerDelegate];

  static new(): PHPickerViewControllerDelegateImpl {
    return <PHPickerViewControllerDelegateImpl>super.new();
  }

  private _owner: WeakRef<Filepicker>;
  private _resolve: any;
  private _reject: any;
  public initWithCallbackAndOptions(callback: (result?) => void, errorCallback: (result?) => void, owner: any): PHPickerViewControllerDelegateImpl {
    this._resolve = callback;
    this._reject = errorCallback;
    this._owner = owner;
    return this;
  }

  //Need to maintain a reference otherwise iOS tends to clean it up when leaving app to launch picker
  public registerToGlobal(): any {
    (<any>global).documentPickerDelegate = this;
  }

  public deRegisterFromGlobal(): any {
    (<any>global).documentPickerDelegate = null;
  }

  public owner() {
    if (!this._owner) return null;
    return this._owner.get() as Filepicker;
  }
  //returns media items picked from gallery
  pickerDidFinishPicking(picker: PHPickerViewController, results: NSArray<PHPickerResult>): void {
    // log('>>> imagePickerControllerDidFinishPickingMediaWithInfo >>>');

    let files: File[] = [];
    let waitCount = results.count;
    let errorCount = 0;
    let livePhotoFound = false;
    if (results) {
      //show activity indicator while processing selections
      let currentView = picker.view;
      let loaderView = UIView.alloc().initWithFrame(CGRectMake(0, 0, 90, 90));
      loaderView.center = currentView.center;
      loaderView.layer.cornerRadius = 4;
      loaderView.backgroundColor = UIColor.lightGrayColor;
      let indicator = UIActivityIndicatorView.alloc().initWithActivityIndicatorStyle(UIActivityIndicatorViewStyle.WhiteLarge);
      indicator.center = CGPointMake(45, 45);
      loaderView.addSubview(indicator);
      currentView.addSubview(loaderView);
      indicator.startAnimating();

      //process picker results
      for (let i = 0; i < results.count; i++) {
        let pickerresult: PHPickerResult = results.objectAtIndex(i);
        // log(pickerresult.itemProvider);
        // log('image?', pickerresult.itemProvider.hasItemConformingToTypeIdentifier(kUTTypeImage));
        // log('movie?', pickerresult.itemProvider.hasItemConformingToTypeIdentifier(kUTTypeMovie));
        let typeIdentifier = pickerresult.itemProvider.registeredTypeIdentifiers.firstObject;
        // log('type:', typeIdentifier);
        if (typeIdentifier == 'com.apple.private.auto-loop-gif') {
          // log('User trying to pick a livePhoto, not yet supported');
          livePhotoFound = true;
          //attempting this triggers the permissions dialog with the selective access option, which is not handled yet
          // let phasset = PHAsset.fetchAssetsWithLocalIdentifiersOptions([pickerresult.assetIdentifier],null)
        }
        pickerresult.itemProvider.loadFileRepresentationForTypeIdentifierCompletionHandler(typeIdentifier, (result: NSURL, err: NSError) => {
          if (result) {
            // log(result);
            //copy this to somewhere app has access to
            let tmppath = TempFile.getPath('asset', '.tmp');
            // log('Will save file to temp path: ', tmppath);
            File.fromPath(tmppath).removeSync();
            let suc = NSFileManager.defaultManager.copyItemAtPathToPathError(result.path, tmppath);
            // log('copy success?', suc);
            const file = File.fromPath(tmppath);
            // file['originalFilename'] = result.lastPathComponent;
            // persist original file name and extension in tmp file
            const originalFilename = result.lastPathComponent;
            const newPath = tmppath.replace(/\/[^/]+$/, `/${originalFilename}`);
            if (File.exists(newPath)) {
              // remove file if it exists
              File.fromPath(newPath).removeSync();
            }
            // add originalFilename property
            file['originalFilename'] = originalFilename;
            // update name so uploaded file will have the same name as the original file
            file.renameSync(originalFilename);
            // log('added file', file);
            files.push(file);
          }
          if (err) {
            console.error(err.description, { sentryCategory: 'picker:error:pick:' + i });
            errorCount++;
          }
          waitCount--;
        });
      }
      // eslint-disable-next-line no-inner-declarations
      function waitForComplete(delegate) {
        if (waitCount > 0) {
          setTimeout(() => waitForComplete(delegate), 500);
        } else {
          if (!!picker && !!picker.presentingViewController) picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
          console.log('done preparing results, resolving files array', files);
          delegate._resolve(files);
          delegate.deRegisterFromGlobal();

          if (errorCount > 0) console.warn(livePhotoFound ? 'Live Photos are not currently supported' : 'Unable to add {count, plural, one {{count} selection}} other {{count} selections}} from your device'.replace('{count, plural, one {{count} selection}} other {{count} selections}}', '' + errorCount));
        }
      }
      waitForComplete(this);
    } else {
      // log('>>> nothing returned from picker >>>');
      this._reject();
      this.deRegisterFromGlobal();
    }
  }
}

// used to configure media types for PHPicker
function getPHTypes(type: MediaType): Array<PHPickerFilter> {
  let fileTypes = [];
  // if (type & MediaType.AUDIO) {
  //   log('phpicker does not support audio type');
  // }
  if (type & MediaType.VIDEO) {
    // log('adding video types');
    fileTypes = fileTypes.concat(PHPickerFilter.videosFilter);
  }
  if (type & MediaType.IMAGE) {
    // log('adding image types');
    fileTypes = fileTypes.concat(PHPickerFilter.imagesFilter);
  }
  // if (type & MediaType.DOCUMENT) {
  //   log('phpicker does not support document type');
  // }
  // log('final types array:', fileTypes);
  // fileTypes = fileTypes.concat(PHPickerFilter.livePhotosFilter);
  //Note: currently livePhotos are included if either Image or Video types are allowed, although we don't handle them yet
  return fileTypes;
}

// used to configure media types for UIImagePicker
function getMediaTypes(type: MediaType): Array<string> {
  let fileTypes = [];
  if (type & MediaType.AUDIO) {
    // log('adding audio type');
    fileTypes = fileTypes.concat(MediaFileTypes[MediaType.AUDIO]);
  }
  if (type & MediaType.VIDEO) {
    // log('adding video type');
    fileTypes = fileTypes.concat(MediaFileTypes[MediaType.VIDEO]);
  }
  if (type & MediaType.IMAGE) {
    // log('adding image type');
    fileTypes = fileTypes.concat(MediaFileTypes[MediaType.IMAGE]);
  }
  if (type & MediaType.DOCUMENT) {
    // log('adding document type');
    fileTypes = fileTypes.concat(MediaFileTypes[MediaType.DOCUMENT]);
  }
  if (type & MediaType.ARCHIVE) {
    // log('adding archive type');
    fileTypes = fileTypes.concat(MediaFileTypes[MediaType.ARCHIVE]);
  }
  // log('final type array:', fileTypes);
  return fileTypes;
}

// iOS File types for document picker
//https://developer.apple.com/library/archive/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html
//https://escapetech.eu/manuals/qdrop/uti.html
//node_modules/@nativescript/types-ios/lib/ios/objc-x86_64/objc!CoreServices.d.ts
const MediaFileTypes: { [index: string]: string[] } = {
  [MediaType.AUDIO]: [kUTTypeMP3, kUTTypeMPEG4Audio, kUTTypeAudio, kUTTypeAudioInterchangeFileFormat, kUTTypeAppleProtectedMPEG4Audio, kUTTypeMIDIAudio, kUTTypeWaveformAudio, 'public.aifc-audio', 'public.aiff-audio', 'com.microsoft.waveform-​audio', 'com.microsoft.windows-​media-wma', 'public.audio', 'public.ulaw-audio', 'com.apple.coreaudio-​format', kUTTypeLivePhoto],
  [MediaType.IMAGE]: [kUTTypeImage, kUTTypeBMP, kUTTypeGIF, kUTTypeJPEG, kUTTypeJPEG2000, kUTTypePNG, kUTTypeQuickTimeImage, kUTTypeRawImage, kUTTypeScalableVectorGraphics, kUTTypeTIFF, 'public.image', 'public.camera-raw-image', kUTTypePICT, kUTTypeAppleICNS, kUTTypeICO],
  [MediaType.VIDEO]: [kUTTypeVideo, kUTTypeMovie, kUTTypeAudiovisualContent, kUTTypeAVIMovie, kUTTypeAppleProtectedMPEG4Video, kUTTypeMPEG, kUTTypeMPEG2TransportStream, kUTTypeMPEG2Video, kUTTypeMPEG4, kUTTypeQuickTimeMovie, 'public.movie', 'public.audiovisual-content', 'public.avi', 'public.3gpp', 'public.3gpp2', kUTTypeLivePhoto],
  [MediaType.DOCUMENT]: [kUTTypePDF, kUTTypeText, kUTTypePlainText, kUTTypeUTF8PlainText, kUTTypeUTF16ExternalPlainText, kUTTypeUTF16PlainText, kUTTypeUTF8TabSeparatedText, kUTTypePresentation, kUTTypeRTF, kUTTypeRTFD, kUTTypeSpreadsheet, kUTTypeHTML, kUTTypeXML, kUTTypeSourceCode, 'com.microsoft.word.doc', 'com.microsoft.word.docx', 'org.openxmlformats.wordprocessingml.document', 'com.microsoft.powerpoint.ppt', 'com.microsoft.powerpoint.pptx', 'org.openxmlformats.presentationml.presentation', 'public.rtf', 'com.adobe.postscript', 'com.adobe.encapsulated-postscript', 'public.presentation', 'public.text', kUTTypeCommaSeparatedText, kUTTypeDelimitedText, kUTTypeElectronicPublication, kUTTypeFlatRTFD, kUTTypeScript, kUTTypeShellScript],
  [MediaType.ARCHIVE]: [kUTTypeArchive, kUTTypeBzip2Archive, kUTTypeGNUZipArchive, 'com.sun.java-archive', 'org.gnu.gnu-tar-archive', 'public.tar-archive', 'org.gnu.gnu-zip-archive', 'org.gnu.gnu-zip-tar-archive', 'com.apple.binhex-archive', 'com.apple.macbinary-​archive', 'public.cpio-archive', 'com.pkware.zip-archive', kUTTypeWebArchive, kUTTypeZipArchive],
};
