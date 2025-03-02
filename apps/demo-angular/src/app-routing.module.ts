import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

import { HomeComponent } from './home.component';

const routes: Routes = [
   { path: '', redirectTo: '/home', pathMatch: 'full' },
   { path: 'home', component: HomeComponent },
	{ path: 'audio-player', loadChildren: () => import('./plugin-demos/audio-player.module').then(m => m.AudioPlayerModule) },
	{ path: 'audio-recorder', loadChildren: () => import('./plugin-demos/audio-recorder.module').then(m => m.AudioRecorderModule) },
	{ path: 'camera', loadChildren: () => import('./plugin-demos/camera.module').then(m => m.CameraModule) },
	{ path: 'downloader', loadChildren: () => import('./plugin-demos/downloader.module').then(m => m.DownloaderModule) },
	{ path: 'filepicker', loadChildren: () => import('./plugin-demos/filepicker.module').then(m => m.FilepickerModule) },
	{ path: 'flashlight', loadChildren: () => import('./plugin-demos/flashlight.module').then(m => m.FlashlightModule) },
	{ path: 'sleepcontrol', loadChildren: () => import('./plugin-demos/sleepcontrol.module').then(m => m.SleepcontrolModule) },
	{ path: 'transcoder', loadChildren: () => import('./plugin-demos/transcoder.module').then(m => m.TranscoderModule) },
	{ path: 'videoplayer', loadChildren: () => import('./plugin-demos/videoplayer.module').then(m => m.VideoplayerModule) }
];

@NgModule({
	imports: [NativeScriptRouterModule.forRoot(routes)],
	exports: [NativeScriptRouterModule],
})
export class AppRoutingModule {}
