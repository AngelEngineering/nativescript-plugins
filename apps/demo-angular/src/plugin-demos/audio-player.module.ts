import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { AudioPlayerComponent } from './audio-player.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: AudioPlayerComponent }])],
  declarations: [AudioPlayerComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class AudioPlayerModule {}
