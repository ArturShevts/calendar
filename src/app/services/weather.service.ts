import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../interfaces/reminder';
import { API_KEY, ENDPOINT_URL } from '../app.config';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http = inject(HttpClient);
  url = inject(ENDPOINT_URL);
  key = inject(API_KEY);
  getWeatherInformation(city: City, date: Date) {
    let dateString = date.toISOString().split('T')[0];
    let url = this.url + city + '/' + dateString + '?key=' + this.key;
    console.log('url', url);

    return this.http
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((res) => console.log(res)),
        catchError((error) => {
          console.error('Error fetching weather information:', error);
          return throwError(
            () =>
              new Error(
                'Failed to fetch weather information. Please try again later.',
              ),
          );
        }),
      );
  }
}
