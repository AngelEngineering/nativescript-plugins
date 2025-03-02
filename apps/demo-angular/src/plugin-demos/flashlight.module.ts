import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { FlashlightComponent } from './flashlight.component';

@NgModule({
	imports: [NativeScriptCommonModule, NativeScriptRouterModule.forChild([{ path: '', component: FlashlightComponent }])],
  declarations: [FlashlightComponent],
  schemas: [ NO_ERRORS_SCHEMA]
})
export class FlashlightModule {}
