import { Component, NgZone } from '@angular/core';
import { DemoSharedSleepcontrol } from '@demo/shared';
import { } from '@angelengineering/sleepcontrol';

@Component({
	selector: 'demo-sleepcontrol',
	templateUrl: 'sleepcontrol.component.html',
})
export class SleepcontrolComponent {
  
  demoShared: DemoSharedSleepcontrol;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedSleepcontrol();
  }

}