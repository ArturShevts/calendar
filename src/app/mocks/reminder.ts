import { ReminderMap } from '../services/calendar.service';
import { City, Reminder } from '../interfaces/reminder';

export const mockReminders: ReminderMap = new Map(
  [
    {
      text: 'Meeting with team',
      dateTime: new Date('2025-03-04T10:00:00'),
      color: 'red',
      city: 'Helsinki' as City,
      weather: {
        temp: -5,
        icon: 'snow',
      },
    } as Reminder,
    {
      text: 'Doctor appointment',
      dateTime: new Date('2025-03-04T15:00:00'),
      color: 'blue',
      city: 'Kyoto',
      weather: {
        temp: 10,
        icon: 'rain',
      },
    } as Reminder,
    {
      text: 'Lunch with friend',
      dateTime: new Date('2025-03-26T12:00:00'),
      color: 'green',
      city: 'London' as City,
      weather: {
        temp: 15,
        icon: 'partly-cloudy-day',
      },
    } as Reminder,
    {
      text: 'Test!',
      dateTime: new Date('2025-03-26T18:00:00'),
      color: 'yellow',
      city: 'Paris' as City,
    } as Reminder,
  ].map((reminder, index) => [index.toString(), reminder]),
);

export const mockReminder: Reminder = {
  text: 'Sample Reminder',
  dateTime: new Date(),
  color: 'blue',
  city: 'Kyoto',
  weather: {
    temperature: 25,
    condition: 'Sunny',
  },
};
