import { Component } from '@angular/core';

@Component({
	selector: 'demo-home',
	templateUrl: 'home.component.html',
})
export class HomeComponent {
	demos = [
	{
		name: 'audio-player'
	},
	{
		name: 'audio-recorder'
	},
	{
		name: 'camera'
	},
	{
		name: 'downloader'
	},
	{
		name: 'filepicker'
	},
	{
		name: 'flashlight'
	},
	{
		name: 'sleepcontrol'
	},
	{
		name: 'transcoder'
	},
	{
		name: 'videoplayer'
	}
];
}