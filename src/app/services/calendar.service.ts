import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import { Observable, of } from 'rxjs';
import {mockReminders, Reminder} from '../interfaces/reminder';
import {ApiService} from "./api.service";

export type  ReminderMap  =Map<string, Reminder>



export interface Notification {
  body: string;
  error: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  reminders:ReminderMap= new Map();
  notification: WritableSignal<Notification|undefined> = signal(undefined);

  apiService = inject(ApiService)

  constructor() { }

  create(reminder: Reminder) {
    this.reminders.set(reminder.dateTime.toISOString(),reminder);
      // this.apiService.post(reminder)
  }

  edit(data: Reminder)  {
     this.reminders.set(data.dateTime.toISOString(), data);
  }

  list(date: Date): Observable<Reminder[]> {
      this.reminders = mockReminders;
     return of(Array.from(this.reminders.values()));
  }

  delete(reminder: Reminder) {
    this.reminders.delete(reminder.dateTime.toISOString() );
   }

}
