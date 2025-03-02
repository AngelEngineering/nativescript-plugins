import { Component, NgZone } from '@angular/core';
import { DemoSharedAudioPlayer } from '@demo/shared';
import { } from '@angelengineering/audio-player';

@Component({
	selector: 'demo-audio-player',
	templateUrl: 'audio-player.component.html',
})
export class AudioPlayerComponent {
  
  demoShared: DemoSharedAudioPlayer;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedAudioPlayer();
  }

}