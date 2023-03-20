import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedAudioPlayer } from '@demo/shared';
import {} from '@angelengineering/audio-player';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedAudioPlayer {}
