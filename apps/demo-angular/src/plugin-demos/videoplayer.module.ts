import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { VideoplayerComponent } from './videoplayer.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: VideoplayerComponent }])],
  declarations: [VideoplayerComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class VideoplayerModule {}
