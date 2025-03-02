import { Component, NgZone } from '@angular/core';
import { DemoSharedDownloader } from '@demo/shared';
import { } from '@angelengineering/downloader';

@Component({
	selector: 'demo-downloader',
	templateUrl: 'downloader.component.html',
})
export class DownloaderComponent {
  
  demoShared: DemoSharedDownloader;
  
	constructor(private _ngZone: NgZone) {}

  ngOnInit() {
    this.demoShared = new DemoSharedDownloader();
  }

}