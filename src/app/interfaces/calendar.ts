import { Reminder } from './reminder';

export interface Day {
  date: Date;
  reminders: { id: string; reminder: Reminder }[];
  weather: any;
  display: boolean;
  selected: boolean;
  current: boolean;
}
