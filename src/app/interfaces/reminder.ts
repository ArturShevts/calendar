import { ReminderMap } from '../services/calendar.service';

export interface Reminder {
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

export const mockReminders: ReminderMap = new Map(
  [
    {
      text: 'Meeting with team',
      dateTime: new Date('2025-03-04T10:00:00'),
      color: 'red',
      city: 'Helsinki' as City,
    } as Reminder,
    {
      text: 'Doctor appointment',
      dateTime: new Date('2025-03-04T15:00:00'),
      color: 'blue',
      city: 'Kyoto',
    } as Reminder,
    {
      text: 'Lunch with friend',
      dateTime: new Date('2025-03-26T12:00:00'),
      color: 'green',
      city: 'London' as City,
    } as Reminder,
    {
      text: 'Gym session',
      dateTime: new Date('2025-03-26T18:00:00'),
      color: 'yellow',
      city: 'Paris' as City,
    } as Reminder,
  ].map((reminder, index) => [index.toString(), reminder]),
);

export const colors = [
  { name: 'Red', value: 'red' },
  { name: 'Green', value: 'green' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Blue', value: 'blue' },
];
