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

export type ReminderMap = Map<string, Reminder[]>;

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

  apiService = inject(WeatherService);

  constructor() {}
  ngOnInit() {
    // wait for a second
    // this.updateRemindersWeather();
  }
  // create(reminder: Reminder) {
  //   console.log('!! Create Reminder !!', reminder);
  //   try {
  //     let remindersMap = this.reminders.getValue();
  //     let remindersArr =
  //       remindersMap.get(reminder.dateTime.toDateString()) || [];
  //     if (remindersArr.length >= 6) {
  //       this.notification.next({
  //         body: 'Maximum 6 reminders per day!',
  //         error: true,
  //       });
  //       return;
  //     }
  //     remindersArr.push(reminder);
  //     remindersMap.set(reminder.dateTime.toDateString(), remindersArr);
  //     this.reminders.next(remindersMap);
  //   } catch (error) {
  //     this.notification.next({ body: 'Error creating reminder!', error: true });
  //   }
  //
  //   this.notification.next({ body: 'Reminder created!', error: false });
  // }

  private updateReminders(reminder: Reminder, edit: boolean) {
    let remindersMap = this.reminders.getValue();
    let remindersArr =
      remindersMap.get(reminder.dateTime.toISOString().split('T')[0]) || [];

    if (edit) {
      let index = remindersArr.findIndex((r) => r.id === reminder.id);
      if (index === -1) {
        this.notification.next({
          body: 'Reminder not found, could not edit!',
          error: true,
        });
        return;
      }
      remindersArr[index] = reminder;
    } else {
      remindersArr.push(reminder);
    }

    remindersMap.set(
      reminder.dateTime.toISOString().split('T')[0],
      remindersArr,
    );
    this.reminders.next(remindersMap);
    this.notification.next({
      body: `Reminder ${edit ? 'edited' : 'created'}!!!`,
      error: false,
    });
  }

  public create(reminder: Reminder) {
    console.log('!! Create Reminder !!', reminder);

    try {
      this.updateReminders(reminder, false);
    } catch (error) {
      this.notification.next({ body: 'Error creating reminder!', error: true });
    }
  }

  public edit(reminder: Reminder) {
    console.log('!! Edit Reminder !!', reminder);
    try {
      this.updateReminders(reminder, true);
    } catch (error) {
      this.notification.next({ body: 'Error editing reminder!', error: true });
    }
  }

  public updateRemindersWeather() {
    let remindersMap = this.reminders.getValue();
    let updateObservables = [];

    for (let [key, value] of remindersMap.entries()) {
      let remindersArr = value;
      for (let i = 0; i < remindersArr.length; i++) {
        let reminder = remindersArr[i];
        if (reminder.city && !reminder.weather) {
          let $update = this.apiService
            .getWeatherInformation(reminder.city as City, reminder.dateTime)
            .subscribe((weather) => {
              reminder.weather = weather;
            });
          updateObservables.push(remindersArr);
        }
        remindersArr[i] = reminder;
      }
    }

    if (updateObservables.length > 0) {
      forkJoin(updateObservables).subscribe((updatedReminders) => {});
    }
  }
}
