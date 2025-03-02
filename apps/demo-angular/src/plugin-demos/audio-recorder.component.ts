import { Component, NgZone } from '@angular/core';
import { DemoSharedAudioRecorder } from '@demo/shared';
import { } from '@angelengineering/audio-recorder';

@Component({
	selector: 'demo-audio-recorder',
	templateUrl: 'audio-recorder.component.html',
})
export class AudioRecorderComponent {
  
  demoShared: DemoSharedAudioRecorder;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedAudioRecorder();
  }

}