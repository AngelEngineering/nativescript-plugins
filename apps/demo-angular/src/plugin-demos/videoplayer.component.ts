import { Component, NgZone } from '@angular/core';
import { DemoSharedVideoplayer } from '@demo/shared';
import { } from '@angelengineering/videoplayer';

@Component({
	selector: 'demo-videoplayer',
	templateUrl: 'videoplayer.component.html',
})
export class VideoplayerComponent {
  
  demoShared: DemoSharedVideoplayer;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedVideoplayer();
  }

}