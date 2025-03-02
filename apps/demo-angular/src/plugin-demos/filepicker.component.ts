import { Component, NgZone } from '@angular/core';
import { DemoSharedFilepicker } from '@demo/shared';
import { } from '@angelengineering/filepicker';

@Component({
	selector: 'demo-filepicker',
	templateUrl: 'filepicker.component.html',
})
export class FilepickerComponent {
  
  demoShared: DemoSharedFilepicker;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedFilepicker();
  }

}