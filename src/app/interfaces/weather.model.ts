export interface WeatherResponse {
  [key: string]: any;
  days?: DayWeather[];
}

export interface DayWeather {
  datetime: string;
  temp: number;
  icon: number;
}

export const WeatherIcons: Record<string, string> = {
  snow: 'Amount of snow is greater than zero',
  rain: 'Amount of rainfall is greater than zero',
  fog: 'Visibility is low (lower than one kilometer or mile)',
  wind: 'Wind speed is high (greater than 30 kph or mph)',
  cloudy: 'Cloud cover is greater than 90% cover',
  'partly-cloudy-day': 'Cloud cover is greater than 20% cover during day time',
  'partly-cloudy-night':
    'Cloud cover is greater than 20% cover during night time',
  'clear-day': 'Cloud cover is less than 20% cover during day time',
  'clear-night': 'Cloud cover is less than 20% cover during night time',
};
