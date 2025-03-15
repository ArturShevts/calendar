import {
  ApplicationConfig,
  InjectionToken,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
export const ENDPOINT_URL = new InjectionToken<string>('endpoint.url');
export const API_KEY = new InjectionToken<string>('endpoint.url');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
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
