import { Component, NgZone } from '@angular/core';
import { DemoSharedFlashlight } from '@demo/shared';
import { } from '@angelengineering/flashlight';

@Component({
	selector: 'demo-flashlight',
	templateUrl: 'flashlight.component.html',
})
export class FlashlightComponent {
  
  demoShared: DemoSharedFlashlight;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedFlashlight();
  }

}