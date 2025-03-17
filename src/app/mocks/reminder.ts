import { Reminder } from '../interfaces/reminder';

// Map<id, Reminder>
export const mockReminders = new Map<string, Reminder>([
  [
    'reminder1',
    {
      id: 'reminder1',
      text: 'Doctor Appointment',
      dateTime: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        10,
        9,
        0,
      ), // 10th of current month
      color: 'red',
      city: 'London',
    },
  ],
  [
    'reminder2',
    {
      id: 'reminder2',
      text: 'Team Meeting',
      dateTime: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        15,
        14,
        30,
      ), // 15th of current month
      color: 'blue',
      city: 'Paris',
    },
  ],
  [
    'reminder3',
    {
      id: 'reminder3',
      text: 'Birthday Party',
      dateTime: new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        22,
        18,
        0,
      ), // 22nd of current month
      color: 'green',
      city: 'Helsinki',
    },
  ],
  [
    'reminder4',
    {
      id: 'reminder4',
      text: 'Dentist Appointment',
      dateTime: new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        5,
        11,
        0,
      ), // 5th of next month
      color: 'yellow',
      city: 'Moscow',
    },
  ],
]);
