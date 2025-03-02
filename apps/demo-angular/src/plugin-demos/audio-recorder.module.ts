import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { AudioRecorderComponent } from './audio-recorder.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: AudioRecorderComponent }])],
  declarations: [AudioRecorderComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class AudioRecorderModule {}
