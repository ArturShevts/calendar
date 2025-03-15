import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { mockReminders, Reminder } from '../interfaces/reminder';
import { ApiService } from './api.service';

export type ReminderMap = Map<string, Reminder>;

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
    console.log(reminder);
    let remindersMap = this.reminders.getValue();

    if (remindersMap.has(reminder.dateTime.toISOString())) {
      this.notification.next({
        body: `Reminder already exists for ${reminder.dateTime.toDateString()}`,
        error: true,
      });
      return;
    }
    remindersMap.set(reminder.dateTime.toISOString(), reminder);
    this.reminders.next(remindersMap);
    this.notification.next({ body: 'Reminder created!', error: false });
    // this.apiService.post(reminder)
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
