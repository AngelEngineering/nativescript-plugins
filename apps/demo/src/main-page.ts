import { EventData, Page } from '@nativescript/core';
import { MainViewModel } from './main-view-model';
import { Application, DiscardedErrorEventData, UnhandledErrorEventData } from '@nativescript/core';

export function onLoaded(): void {
  Application.on(Application.uncaughtErrorEvent, (event: UnhandledErrorEventData) => {
    console.error(event.eventName + ':' + event.error.message + '-\n' + event.error.stack, { noSentry: true });
  });
  Application.on(Application.discardedErrorEvent, (event: DiscardedErrorEventData) => {
    console.error(event.eventName + ':' + event.error.message + '-\n' + event.error.stack, { noSentry: true });
  });
}

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  page.bindingContext = new MainViewModel();
}
