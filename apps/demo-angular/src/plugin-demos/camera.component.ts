import { Component, NgZone } from '@angular/core';
import { DemoSharedCamera } from '@demo/shared';
import { } from '@angelengineering/camera';

@Component({
	selector: 'demo-camera',
	templateUrl: 'camera.component.html',
})
export class CameraComponent {
  
  demoShared: DemoSharedCamera;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedCamera();
  }

}