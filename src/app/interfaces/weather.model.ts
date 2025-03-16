export interface WeatherResponse {
  [key: string]: any;
  days?: DayWeather[];
}

export interface DayWeather {
  datetime: string;
  datetimeEpoch: number;
  temp: number;
  feelslike: number;
  // Add other relevant fields
  hours: HourWeather[];
}

export interface HourWeather {
  datetime: string;
  // Add other relevant fields
}
