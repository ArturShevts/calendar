import {
  inject,
  Injectable,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  Observable,
  of,
  startWith,
  Subject,
} from 'rxjs';
import { City, mockReminders, Reminder } from '../interfaces/reminder';
import { ApiService } from './api.service';
import { WeatherService } from './weather.service';

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
  public $reminders = this.reminders
    .asObservable()
    .pipe(startWith(mockReminders));

  weatherService = inject(WeatherService);

  constructor() {}

  create(reminder: Reminder) {
    let remindersMap = this.reminders.getValue();

    let id = '_' + Math.random().toString(36);
    try {
      this.reminders.next(remindersMap.set(id, reminder));
    } catch (error) {
      this.notification.next({ body: 'Error creating reminder!', error: true });
    }
  }

  public edit(reminder: Reminder, id: string) {
    let remindersMap = this.reminders.getValue();
    try {
      this.reminders.next(remindersMap.set(id, reminder));
    } catch (error) {
      this.notification.next({ body: 'Error editing reminder!', error: true });
    }
  }

  public updateRemindersWeather() {
    let remindersMap = this.reminders.getValue();
    let updateObservables = [];

    for (let [key, value] of remindersMap.entries()) {
      if (value.weather) {
        continue;
      }
      let $update = this.weatherService
        .getWeatherInformation(value.city, value.dateTime)
        .subscribe((data: any) => {
          value.weather = data;
        });
      updateObservables.push($update);
    }

    if (updateObservables.length > 0) {
      forkJoin(updateObservables).subscribe((updatedReminders) => {});
    }
  }
}
