import {
  ApplicationConfig,
  importProvidersFrom,
  InjectionToken,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { provideStore, StoreModule } from '@ngrx/store';
import { reminderReducer } from './store/reminder/reminder.reducer';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { ReminderEffects } from './store/reminder/reminder.effects';
import {
  provideStoreDevtools,
  StoreDevtoolsModule,
} from '@ngrx/store-devtools';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
export const ENDPOINT_URL = new InjectionToken<string>('endpoint.url');
export const API_KEY = new InjectionToken<string>('endpoint.url');

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(routes),
    provideAnimations(),
    provideStore({ reminders: reminderReducer }),
    provideEffects([ReminderEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      trace: isDevMode(),
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync('noop'),
    provideHttpClient(),
    {
      provide: ENDPOINT_URL,
      useValue: environment.weatherApiUrl,
    },
    {
      provide: API_KEY,
      useValue: environment.apiKey,
    },
  ],
};
