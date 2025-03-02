import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { SleepcontrolComponent } from './sleepcontrol.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: SleepcontrolComponent }])],
  declarations: [SleepcontrolComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class SleepcontrolModule {}
