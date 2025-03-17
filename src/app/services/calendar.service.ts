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
  map,
  Observable,
  of,
  startWith,
  Subject,
  take,
  tap,
} from 'rxjs';
import { Reminder } from '../interfaces/reminder';
import { WeatherService } from './weather.service';
import { mockReminders } from '../mocks/reminder';

export type ReminderMap = Map<string, Reminder>;

export interface Notification {
  body: string;
  error: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService implements OnInit {
  private notification: Subject<Notification> = new Subject<Notification>();
  public $notification = this.notification.asObservable();
  private reminders: BehaviorSubject<ReminderMap> =
    new BehaviorSubject<ReminderMap>(mockReminders); // new Map<string, Reminder>()
  public $reminders = this.reminders
    .asObservable()
    .pipe(startWith(mockReminders));

  weatherService = inject(WeatherService);

  constructor() {}
  ngOnInit() {}

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

  public updateRemindersWeather(remindersMap: ReminderMap) {
    const weatherObservables: Observable<{ key: string; data: any }>[] = [];

    for (const [key, reminder] of remindersMap.entries()) {
      if (!reminder.weather) {
        weatherObservables.push(
          this.weatherService
            .getWeatherInformation(reminder.city, reminder.dateTime)
            .pipe(map((data) => ({ key, data }))),
        );
      }
    }

    if (weatherObservables.length === 0) return;

    forkJoin(weatherObservables)
      .pipe(take(1))
      .subscribe((results) => {
        results.forEach(({ key, data }) => {
          const reminder = remindersMap.get(key);
          if (reminder) {
            reminder.weather = data;
          }
        });

        // Since we are not using state, but rather a subscription to a pointer, there is no need to force updates, because the zoning will handle the updates without possibly triggering a data leak
        // this.reminders.next(new Map(remindersMap));
      });
  }
}
