import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import * as ReminderActions from './reminder.actions';

@Injectable()
export class ReminderEffects {
  constructor(
    private actions$: Actions,
    private weatherService: WeatherService
  ) {}

  createReminder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReminderActions.createReminder),
      map(({ reminder }) => {
        const id = '_' + Math.random().toString(36);
        return ReminderActions.createReminderSuccess({
          reminder: { ...reminder, id },
        });
      }),
      catchError((error) =>
        of(
          ReminderActions.createReminderFailure({ error: error.message }),
          ReminderActions.showNotification({
            notification: { body: 'Error creating reminder!', error: true },
          })
        )
      )
    )
  );

  updateReminder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReminderActions.updateReminder),
      map(({ id, reminder }) =>
        ReminderActions.updateReminderSuccess({ id, reminder })
      ),
      catchError((error) =>
        of(
          ReminderActions.updateReminderFailure({ error: error.message }),
          ReminderActions.showNotification({
            notification: { body: 'Error editing reminder!', error: true },
          })
        )
      )
    )
  );

  updateWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReminderActions.updateRemindersWeather),
      switchMap(({ reminders }) => {
        if (reminders.length === 0) return of();

        const weatherObservables = reminders.map(({ id, reminder }) =>
          this.weatherService
            .getWeatherInformation(reminder.city, reminder.dateTime)
            .pipe(map((weather) => ({ id, weather })))
        );

        return forkJoin(weatherObservables).pipe(
          take(1),
          mergeMap((results) =>
            results.map(({ id, weather }) =>
              ReminderActions.updateReminderWeatherSuccess({ id, weather })
            )
          ),
          catchError(() => of())
        );
      })
    )
  );
}
