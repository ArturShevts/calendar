import {ReminderMap} from "../services/calendar.service";

export interface Reminder {
  text: string;
  dateTime: Date;
  color: string;
  city?: string;
  weather?: any;
}




export const mockReminders: ReminderMap = new Map([
  ['2021-10-01T10:00:00.000Z', {
    text: 'Meeting with John',
    dateTime: new Date('2021-10-01T10:00:00.000Z'),
    color: 'red',
    city: 'London'
  }],
  ['2021-10-01T12:00:00.000Z', {
    text: 'Lunch with Mary',
    dateTime: new Date('2021-10-01T12:00:00.000Z'),
    color: 'green',
    city: 'Paris'
  }],
  ['2021-10-01T14:00:00.000Z', {
    text: 'Meeting with Peter',
    dateTime: new Date('2021-10-01T14:00:00.000Z'),
    color: 'yellow',
    city: 'Berlin'
  }],
  ['2021-10-01T16:00:00.000Z', {
    text: 'Meeting with Paul',
    dateTime: new Date('2021-10-01T16:00:00.000Z'),
    color: 'red',
    city: 'Madrid'
  }],
  ['2021-10-01T18:00:00.000Z', {
    text: 'Meeting with George',
    dateTime: new Date('2021-10-01T18:00:00.000Z'),
    color: 'green',
    city: 'Rome'
  }],
  ['2021-10-01T20:00:00.000Z', {
    text: 'Meeting with Ringo',
    dateTime: new Date('2021-10-01T20:00:00.000Z'),
    color: 'yellow',
    city: 'Athens'
  }],
]);
