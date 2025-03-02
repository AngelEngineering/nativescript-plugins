import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { DownloaderComponent } from './downloader.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: DownloaderComponent }])],
  declarations: [DownloaderComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class DownloaderModule {}
