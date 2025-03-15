import { ReminderMap } from '../services/calendar.service';

export interface Reminder {
  text: string;
  dateTime: Date;
  color: string;
  city?: string;
  weather?: any;
}

//  generate reminders for march 4 and 26 2025
export const mockReminders: ReminderMap = new Map(
  Array.from({ length: 2 }, (_, i) => {
    const date = new Date(2025, 2, i === 0 ? 4 : 26);
    const date2 = new Date(2025, 2, i === 0 ? 4 : 26);
    const date3 = new Date(2025, 2, i === 0 ? 4 : 26);
    return [
      date.toDateString(),
      [
        {
          text: `ＷＩＤＥＳＴ　ＣＨＡＲＡＣＴＥＲＳ　３０`,
          dateTime: date,
          color: 'red',
        },

        {
          text: `abcdefghijklmnopqrstuvwxyzABCD`,
          dateTime: date2,
          color: 'blue',
        },
        {
          text: `abcdefg hijlmnopq rstuvwxyzABCD`,
          dateTime: date3,
          color: 'blue',
        },
        {
          text: `walk the plank`,
          dateTime: date3,
          color: 'blue',
        },
      ],
    ];
  }),
);
