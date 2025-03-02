import { Component, NgZone } from '@angular/core';
import { DemoSharedTranscoder } from '@demo/shared';
import { } from '@angelengineering/transcoder';

@Component({
	selector: 'demo-transcoder',
	templateUrl: 'transcoder.component.html',
})
export class TranscoderComponent {
  
  demoShared: DemoSharedTranscoder;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedTranscoder();
  }

}