import { ReminderMap } from '../services/calendar.service';

export interface Reminder {
  id: string;
  text: string;
  dateTime: Date;
  color: string;
  city?: string;
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

//  generate reminders for march 4 and 26 2025
export const mockReminders: ReminderMap = new Map(
  Array.from({ length: 2 }, (_, i) => {
    const date = new Date(2025, 2, i === 0 ? 4 : 26);
    const date2 = new Date(2025, 2, i === 0 ? 4 : 26);
    const date3 = new Date(2025, 2, i === 0 ? 4 : 26);
    return [
      date.toISOString().split('T')[0],
      [
        {
          id: '123',
          text: `ＷＩＤＥＳＴ　ＣＨＡＲＡＣＴＥＲＳ　３０`,
          dateTime: date,
          color: 'red',
          city: 'Helsinki',
        },

        {
          id: '124',

          text: `abcdefghijklmnopqrstuvwxyzABCD`,
          dateTime: date2,
          color: 'blue',
          city: 'Kyoto',
        },
        {
          id: '125',

          text: `abcdefg hijlmnopq rstuvwxyzABCD`,
          dateTime: date3,
          color: 'blue',
          city: 'London',
        },
        {
          id: '126',

          text: `walk the plank`,
          dateTime: date3,
          color: 'blue',
        },
      ],
    ];
  }),
);
