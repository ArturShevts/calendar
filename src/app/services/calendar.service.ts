import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { mockReminders, Reminder } from '../interfaces/reminder';
import { ApiService } from './api.service';

export type ReminderMap = Map<string, Reminder[]>;

export interface Notification {
  body: string;
  error: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  private notification: Subject<Notification> = new Subject<Notification>();
  public $notification = this.notification.asObservable();
  private reminders: BehaviorSubject<ReminderMap> =
    new BehaviorSubject<ReminderMap>(mockReminders); // new Map<string, Reminder>()
  public $reminders = this.reminders.asObservable();

  apiService = inject(ApiService);

  constructor() {}

  create(reminder: Reminder) {
    console.log('!! Create Reminder !!', reminder);
    try {
      let remindersMap = this.reminders.getValue();
      let remindersArr =
        remindersMap.get(reminder.dateTime.toDateString()) || [];
      remindersArr.push(reminder);
      remindersMap.set(reminder.dateTime.toDateString(), remindersArr);
      this.reminders.next(remindersMap);
    } catch (error) {
      this.notification.next({ body: 'Error creating reminder!', error: true });
    }

    this.notification.next({ body: 'Reminder created!', error: false });
  }

  edit(data: Reminder) {
    // this.reminders.set(data.dateTime.toISOString(), data);
  }

  // list(date: Date): Observable<Reminder[]> {
  //
  //     return of(Array.from(this.reminders.values()));
  // }

  // delete(reminder: Reminder) {
  //   this.reminders.delete(reminder.dateTime.toISOString() );
  //  }
}
