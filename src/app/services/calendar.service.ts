import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Reminder } from '../interfaces/reminder';
import { WeatherService } from './weather.service';
import { mockReminders } from '../mocks/reminder';
import * as ReminderActions from '../store/reminder/reminder.actions';
import * as ReminderSelectors from '../store/reminder/reminder.selectors';
import { AppState } from '../store/app.state';

export interface Notification {
  body: string;
  error: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  $reminders: Observable<Reminder[]>;
  $notification: Observable<Notification | null>;

  constructor(
    private store: Store<AppState>,
    private weatherService: WeatherService,
  ) {
    this.$reminders = this.store.select(ReminderSelectors.selectAllReminders);
    this.$notification = this.store.select(
      ReminderSelectors.selectNotification,
    );

    // Initialize with mock reminders
    const remindersArray = Array.from(mockReminders.entries()).map(
      ([id, reminder]: [string, Reminder]) => ({
        ...reminder,
        id,
      }),
    );

    this.store.dispatch(
      ReminderActions.loadRemindersSuccess({ reminders: remindersArray }),
    );
  }

  create(reminder: Reminder) {
    this.store.dispatch(ReminderActions.createReminder({ reminder }));
  }

  public edit(reminder: Reminder, id: string) {
    this.store.dispatch(ReminderActions.updateReminder({ id, reminder }));
  }

  public updateRemindersWeather() {
    this.store
      .select(ReminderSelectors.selectRemindersWithoutWeather)
      .subscribe((reminders) => {
        if (reminders.length > 0) {
          this.store.dispatch(
            ReminderActions.updateRemindersWeather({
              reminders: reminders.map((reminder) => ({
                id: reminder.id,
                reminder,
              })),
            }),
          );
        }
      });
  }
}
