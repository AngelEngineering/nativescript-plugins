import { Observable, EventData, Page } from '@nativescript/core';
import { DemoSharedDownloader } from '@demo/shared';
import {} from '@angelengineering/downloader';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new DemoModel();
}

export class DemoModel extends DemoSharedDownloader {}
