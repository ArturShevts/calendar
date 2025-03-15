import { ReminderMap } from '../services/calendar.service';

export interface Reminder {
  text: string;
  dateTime: Date;
  color: string;
  city?: string;
  weather?: any;
}

export const mockReminders: ReminderMap = new Map([]);
