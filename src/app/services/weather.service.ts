import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  http = inject(HttpClient);
  getWeatherInformation({city:}) {

    return {
      city,
      weatherInfo: 'here',
    };
  }
}
