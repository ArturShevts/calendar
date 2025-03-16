import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { City, Cities } from '../interfaces/reminder';
import { API_KEY, ENDPOINT_URL } from '../app.config';
import { catchError, map, of, take, throwError } from 'rxjs';
import { WeatherResponse } from '../interfaces/weather.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http = inject(HttpClient);
  url = inject(ENDPOINT_URL);
  key = inject(API_KEY);
  getWeatherInformation(city: City, date: Date) {
    let dateString = date.toISOString().split('T')[0];
    let url =
      this.url +
      city +
      '/' +
      dateString +
      '?key=' +
      this.key +
      '&include=days&elements=temp,icon,datetime';
    console.log('url', url);

    return this.http
      .get<WeatherResponse>(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        take(1),

        map((res: WeatherResponse) => {
          if (!res || !res.days) {
            throw new HttpErrorResponse({
              error: 'Empty Response',
              status: 204,
            });
          }

          const dayWeather = res.days.find(
            (day: any) => day.datetime === dateString,
          );
          console.log(dayWeather, '!!!');

          return dayWeather;
        }),
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

  // check if city exists {}
}
