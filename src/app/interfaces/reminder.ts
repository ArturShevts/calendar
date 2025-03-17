export interface Reminder {
  id: string;
  text: string;
  dateTime: Date;
  color: string;
  city: City;
  weather?: any;
}

export type City =
  | 'Helsinki'
  | 'Kyoto'
  | 'London'
  | 'Moscow'
  | 'Oslo'
  | 'Paris';

export const Cities: City[] = [
  'Helsinki',
  'Kyoto',
  'London',
  'Moscow',
  'Oslo',
  'Paris',
];

export const colors = [
  { name: 'Red', value: 'red' },
  { name: 'Green', value: 'green' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Blue', value: 'blue' },
];
