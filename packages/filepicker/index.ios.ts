import { MediaType } from './index.common';
import { Application, File, ImageAsset, ImageSource } from '@nativescript/core';
import { iOSNativeHelper } from '@nativescript/core/utils';
import { AssetDownloader, TempFile } from './files';

export { MediaType } from './index.common';

let _iosDocumentPickerController: UIDocumentPickerViewController;
let _iosGalleryPickerController: UIImagePickerController;
let _iosPHPickerController: any; //for iOS<14 we use UIImagePicker. ios14+ uses PHPicker

export function galleryPicker(type: MediaType, multiple: boolean): Promise<File[]> {
  //NOTE: iOS 14+ adds new photo/video gallery privacy access restrictions for UIImagePicker, and introduces
  //     the new PHPicker component which doesn't requires perms and supports multiple selections.
  if (+iOSNativeHelper.MajorVersion >= 14) {
    return PHPicker(type, multiple);
  }
  //gallery UIImage Picker version(images and video) for ios<14
  //NOTE: the iOS UIImagePickerController does not allow multiple selections
  else {
    if (multiple) console.warn('iOS UIImagePickerController only allows single selections!');
    return ImgPicker(type);
  }
}

export function getFreeMBs(filepath: string): number {
  //iOS devices only have a single storage partition to work with, so we can use any path to check stats
  const attributeDictionary: NSDictionary<string, any> = NSFileManager.defaultManager.attributesOfFileSystemForPathError(filepath);
  // let totalsize: number = +attributeDictionary.valueForKey(NSFileSystemSize) / (1024 * 1024);
  const freesize: number = +attributeDictionary.valueForKey(NSFileSystemFreeSize) / (1024 * 1024);
  return freesize;
}

function PHPicker(type: MediaType, multiple: boolean): Promise<[File]> {
  return new Promise((resolve, reject) => {
    const config: PHPickerConfiguration = PHPickerConfiguration.new();
    config.selectionLimit = multiple ? 0 : 1;
    config.filter = PHPickerFilter.anyFilterMatchingSubfilters(iOSNativeHelper.collections.jsArrayToNSArray(getPHTypes(type)));
    _iosPHPickerController = new PHPickerViewController({ configuration: config });
    const delegate = PHPickerViewControllerDelegateImpl.new().initWithCallbackAndOptions(resolve, reject, this);
    delegate.registerToGlobal();
    _iosPHPickerController.delegate = delegate;
    (Application.ios.rootController as UIViewController).presentViewControllerAnimatedCompletion(_iosPHPickerController, true, null);
  });
}

function ImgPicker(type: MediaType): Promise<[File]> {
  return new Promise((resolve, reject) => {
    _iosGalleryPickerController = UIImagePickerController.new();
    let mediaTypes = iOSNativeHelper.collections.jsArrayToNSArray(getMediaTypes(type));
    _iosGalleryPickerController.mediaTypes = mediaTypes;
    //image/video editing not allowed for now as we would need to process changes manually before returning media
    _iosGalleryPickerController.allowsEditing = false;
    _iosGalleryPickerController.allowsImageEditing = false;

    const delegate = UIImagePickerControllerDelegateImpl.new().initWithCallbackAndOptions(resolve, reject, this);
    delegate.registerToGlobal();
    _iosGalleryPickerController.delegate = delegate;
    (Application.ios.rootController as UIViewController).presentViewControllerAnimatedCompletion(_iosGalleryPickerController, true, null);
  });
}

export function filePicker(type: MediaType, multiple: boolean): Promise<[File]> {
  return new Promise((resolve, reject) => {
    let mediaTypes = iOSNativeHelper.collections.jsArrayToNSArray(getMediaTypes(type));
    _iosDocumentPickerController = UIDocumentPickerViewController.alloc().initWithDocumentTypesInMode(
      mediaTypes,
      UIDocumentPickerMode.Import
      //Import mode is less restrictive than Open and doesn't require a file coordinator
    );
    // This picker does allow multiple selections if user chooses selection view
    _iosDocumentPickerController.allowsMultipleSelection = multiple;
    // This doesn't actually show extensions, but we'll set it anyway
    _iosDocumentPickerController.shouldShowFileExtensions = true;
    // If fullscreen style is used, delegate return handler throws an access error
    // If CurrentContext or others are used, delegate methods are never called
    _iosDocumentPickerController.modalPresentationStyle = UIModalPresentationStyle.FormSheet;

    const delegate = UIDocumentPickerDelegateImpl.new().initWithCallbackAndOptions(resolve, reject, this);
    delegate.registerToGlobal();
    _iosDocumentPickerController.delegate = delegate;

    (Application.ios.rootController as UIViewController).presentViewControllerAnimatedCompletion(_iosDocumentPickerController, true, null);
  });
}
// }

//UIDocument Picker delegate
@NativeClass()
class UIDocumentPickerDelegateImpl extends NSObject implements UIDocumentPickerDelegate {
  public static ObjCProtocols = [UIDocumentPickerDelegate];

  static new(): UIDocumentPickerDelegateImpl {
    return <UIDocumentPickerDelegateImpl>super.new();
  }

  private _owner: WeakRef<any>;
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
    return this._owner.get();
  }

  // if only single selection is allowed? sometimes, usually the next one handles all returns
  documentPickerDidPickDocumentAtURL(controller: UIDocumentPickerViewController, url: NSURL): void {
    let access = url.startAccessingSecurityScopedResource();
    let tmppath = TempFile.getPath('asset', '.tmp');
    File.fromPath(tmppath).removeSync();
    let success = NSFileManager.defaultManager.copyItemAtPathToPathError(url.path, tmppath);
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
    //This view can't display an UIActivityIndicatorView inside it using the usual ios spinner approach,
    //    but picker shows a small spinner on the "Open" button while processing
    //Process picker results
    for (let i = 0; i < urls.count; i++) {
      let url = urls.objectAtIndex(i); //urls[0];
      let access = url.startAccessingSecurityScopedResource();
      //can't access directly, need to copy first to local app directory
      let tmppath = TempFile.getPath('asset', '.tmp');
      File.fromPath(tmppath).removeSync();
      let suc = NSFileManager.defaultManager.copyItemAtPathToPathError(url.path, tmppath);
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
      files.push(file as File);
      if (access) url.stopAccessingSecurityScopedResource();
    }
    controller.dismissViewControllerAnimatedCompletion(true, null);
    this._resolve(files);
    this.deRegisterFromGlobal();
  }

  documentPickerWasCancelled(controller: UIDocumentPickerViewController): void {
    controller.dismissViewControllerAnimatedCompletion(true, null);
    this._reject(null);
    this.deRegisterFromGlobal();
  }
}

//Photos Gallery (UIImage) Picker delegate
@NativeClass()
class UIImagePickerControllerDelegateImpl extends NSObject implements UIImagePickerControllerDelegate {
  public static ObjCProtocols = [UIImagePickerControllerDelegate];

  static new(): UIImagePickerControllerDelegateImpl {
    return <UIImagePickerControllerDelegateImpl>super.new();
  }

  private _owner: WeakRef<any>;
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
    return this._owner.get();
  }

  //returns media item picked from gallery
  imagePickerControllerDidFinishPickingMediaWithInfo(picker: UIImagePickerController, info: NSDictionary<string, any>): void {
    if (info) {
      //This view can't display an UIActivityIndicatorView inside it using the usual ios spinner approach,
      //    but picker shows a progress indicator when preparing video media, and images return almost instantly
      let asset = info.valueForKey(UIImagePickerControllerPHAsset);
      const downloader = new AssetDownloader(asset);
      downloader.download().then((res) => {
        this._resolve([res]); //returns a NS file object although filename will be of form assset???.tmp, but has originalFilename attached
      });
    } else {
      this._reject();
    }
    if (!!picker && !!picker.presentingViewController) picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
    this.deRegisterFromGlobal();
  }

  //this should never be called unless we enable editing for ios gallery selections
  imagePickerControllerDidFinishPickingImageEditingInfo(picker: UIImagePickerController, image: UIImage, editingInfo: NSDictionary<string, any>) {
    console.warn('WARNING: image picker editing feature has not yet been fully implemented!');
    if (!!picker && !!picker.presentingViewController) picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
    this._reject();
    this.deRegisterFromGlobal();
  }

  imagePickerControllerDidCancel(picker: UIImagePickerController): void {
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

  private _owner: WeakRef<any>;
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
    return this._owner.get();
  }

  //returns media items picked from gallery
  pickerDidFinishPicking(picker: PHPickerViewController, results: NSArray<PHPickerResult>): void {
    let files: File[] = [];
    let waitCount = results.count;
    let errorCount = 0;

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

      //process picker results, but warn user if a livePhoto is selected as those are not yet supported
      for (let i = 0; i < results.count; i++) {
        let pickerresult: PHPickerResult = results.objectAtIndex(i);
        let typeIdentifier = pickerresult.itemProvider.registeredTypeIdentifiers.firstObject;
        //special handling for Live Photo Bundles of an heic and a mov file (if user selects loop in their Gallery app, then these will become animated gifs)
        if (typeIdentifier == 'com.apple.live-photo-bundle') {
          pickerresult.itemProvider.loadObjectOfClassCompletionHandler(PHLivePhoto.class(), (livePhoto, err) => {
            if (err) {
              console.error(err.description);
              errorCount++;
              waitCount--;
            } else {
              let resources = PHAssetResource.assetResourcesForLivePhoto(livePhoto as PHLivePhoto);
              let photo = resources.firstObject;
              let originalFilename = photo.originalFilename;
              let imageData = NSMutableData.alloc().init();
              const options = PHAssetResourceRequestOptions.alloc().init();
              PHAssetResourceManager.defaultManager().requestDataForAssetResourceOptionsDataReceivedHandlerCompletionHandler(
                photo,
                options,
                (data: NSData) => {
                  imageData.appendData(data);
                },
                (err: NSError) => {
                  if (err) {
                    console.error(err.description);
                    waitCount--;
                    errorCount++;
                  } else {
                    let image = new UIImage({ data: imageData, scale: 1 });
                    let imageAsset: ImageAsset = new ImageAsset(image);
                    let tmppath = TempFile.getPath('asset', '.tmp');
                    File.fromPath(tmppath).removeSync();
                    ImageSource.fromAsset(imageAsset).then((source) => {
                      source.saveToFile(tmppath, 'jpeg', 0.95);
                      const file = File.fromPath(tmppath);
                      const newPath = tmppath.replace(/\/[^/]+$/, `/${originalFilename}`);
                      if (File.exists(newPath)) {
                        File.fromPath(newPath).removeSync();
                      }
                      file.renameSync(originalFilename);
                      files.push(file);
                      waitCount--;
                    });
                  }
                }
              );
            }
          });
        } else {
          pickerresult.itemProvider.loadFileRepresentationForTypeIdentifierCompletionHandler(typeIdentifier, (result: NSURL, err: NSError) => {
            if (result) {
              //copy this to somewhere app has access to
              let tmppath = TempFile.getPath('asset', '.tmp');
              File.fromPath(tmppath).removeSync();
              let suc = NSFileManager.defaultManager.copyItemAtPathToPathError(result.path, tmppath);
              const file = File.fromPath(tmppath);
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
              files.push(file);
            }
            if (err) {
              console.error(err.description);
              errorCount++;
            }
            waitCount--;
          });
        }
      }
      // eslint-disable-next-line no-inner-declarations
      function waitForComplete(delegate) {
        if (waitCount > 0) {
          setTimeout(() => waitForComplete(delegate), 500);
        } else {
          if (!!picker && !!picker.presentingViewController) picker.presentingViewController.dismissViewControllerAnimatedCompletion(true, null);
          delegate._resolve(files);
          delegate.deRegisterFromGlobal();

          if (errorCount > 0) console.warn(`Unable to select ${errorCount}? selections from your device`);
        }
      }
      waitForComplete(this);
    } else {
      this._reject();
      this.deRegisterFromGlobal();
    }
  }
}

// used to configure media types for PHPicker
function getPHTypes(type: MediaType): Array<PHPickerFilter> {
  let fileTypes = [];
  if (type & MediaType.VIDEO) {
    fileTypes = fileTypes.concat(PHPickerFilter.videosFilter);
  }
  if (type & MediaType.IMAGE) {
    fileTypes = fileTypes.concat(PHPickerFilter.imagesFilter);
  }
  return fileTypes;
}

// used to configure media types for UIImagePicker
function getMediaTypes(type: MediaType): Array<string> {
  let fileTypes = [];
  if (type & MediaType.AUDIO) {
    fileTypes = fileTypes.concat(MediaFileTypes[MediaType.AUDIO]);
  }
  if (type & MediaType.VIDEO) {
    fileTypes = fileTypes.concat(MediaFileTypes[MediaType.VIDEO]);
  }
  if (type & MediaType.IMAGE) {
    fileTypes = fileTypes.concat(MediaFileTypes[MediaType.IMAGE]);
  }
  if (type & MediaType.DOCUMENT) {
    fileTypes = fileTypes.concat(MediaFileTypes[MediaType.DOCUMENT]);
  }
  if (type & MediaType.ARCHIVE) {
    fileTypes = fileTypes.concat(MediaFileTypes[MediaType.ARCHIVE]);
  }
  return fileTypes;
}

// iOS File types for file picker
//https://developer.apple.com/library/archive/documentation/Miscellaneous/Reference/UTIRef/Articles/System-DeclaredUniformTypeIdentifiers.html
//https://escapetech.eu/manuals/qdrop/uti.html
//node_modules/@nativescript/types-ios/lib/ios/objc-x86_64/objc!CoreServices.d.ts
const MediaFileTypes: { [index: string]: string[] } = {
  [MediaType.AUDIO]: [kUTTypeMP3, kUTTypeMPEG4Audio, kUTTypeAudio, kUTTypeAudioInterchangeFileFormat, kUTTypeAppleProtectedMPEG4Audio, kUTTypeMIDIAudio, kUTTypeWaveformAudio, 'public.aifc-audio', 'public.aiff-audio', 'com.microsoft.waveform-​audio', 'com.microsoft.windows-​media-wma', 'public.audio', 'public.ulaw-audio', 'com.apple.coreaudio-​format'],
  [MediaType.IMAGE]: [kUTTypeImage, kUTTypeBMP, kUTTypeGIF, kUTTypeJPEG, kUTTypeJPEG2000, kUTTypePNG, kUTTypeQuickTimeImage, kUTTypeRawImage, kUTTypeScalableVectorGraphics, kUTTypeTIFF, 'public.image', 'public.camera-raw-image', kUTTypePICT, kUTTypeAppleICNS, kUTTypeICO, kUTTypeLivePhoto, 'com.apple.private.auto-loop-gif'],
  [MediaType.VIDEO]: [kUTTypeVideo, kUTTypeMovie, kUTTypeAudiovisualContent, kUTTypeAVIMovie, kUTTypeAppleProtectedMPEG4Video, kUTTypeMPEG, kUTTypeMPEG2TransportStream, kUTTypeMPEG2Video, kUTTypeMPEG4, kUTTypeQuickTimeMovie, 'public.movie', 'public.audiovisual-content', 'public.avi', 'public.3gpp', 'public.3gpp2'],
  [MediaType.DOCUMENT]: [kUTTypePDF, kUTTypeText, kUTTypePlainText, kUTTypeUTF8PlainText, kUTTypeUTF16ExternalPlainText, kUTTypeUTF16PlainText, kUTTypeUTF8TabSeparatedText, kUTTypePresentation, kUTTypeRTF, kUTTypeRTFD, kUTTypeSpreadsheet, kUTTypeHTML, kUTTypeXML, kUTTypeSourceCode, 'com.microsoft.word.doc', 'com.microsoft.word.docx', 'org.openxmlformats.wordprocessingml.document', 'com.microsoft.powerpoint.ppt', 'com.microsoft.powerpoint.pptx', 'org.openxmlformats.presentationml.presentation', 'public.rtf', 'com.adobe.postscript', 'com.adobe.encapsulated-postscript', 'public.presentation', 'public.text', kUTTypeCommaSeparatedText, kUTTypeDelimitedText, kUTTypeElectronicPublication, kUTTypeFlatRTFD, kUTTypeScript, kUTTypeShellScript],
  [MediaType.ARCHIVE]: [kUTTypeArchive, kUTTypeBzip2Archive, kUTTypeGNUZipArchive, 'com.sun.java-archive', 'org.gnu.gnu-tar-archive', 'public.tar-archive', 'org.gnu.gnu-zip-archive', 'org.gnu.gnu-zip-tar-archive', 'com.apple.binhex-archive', 'com.apple.macbinary-​archive', 'public.cpio-archive', 'com.pkware.zip-archive', kUTTypeWebArchive, kUTTypeZipArchive],
};
