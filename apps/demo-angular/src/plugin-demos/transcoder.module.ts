import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { TranscoderComponent } from './transcoder.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: TranscoderComponent }])],
  declarations: [TranscoderComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class TranscoderModule {}
