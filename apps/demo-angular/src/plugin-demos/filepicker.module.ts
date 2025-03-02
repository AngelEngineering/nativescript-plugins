import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { FilepickerComponent } from './filepicker.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: FilepickerComponent }])],
  declarations: [FilepickerComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class FilepickerModule {}
