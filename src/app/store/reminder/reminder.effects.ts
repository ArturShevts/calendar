import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { WeatherService } from '../../services/weather.service';
import * as ReminderActions from './reminder.actions';

@Injectable()
export class ReminderEffects {
  actions$ = inject(Actions);
  weatherService = inject(WeatherService);

  createReminder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReminderActions.createReminder),
      map(({ reminder }) => {
        const id = '_' + Math.random().toString(36);
        return ReminderActions.createReminderSuccess({
          reminder: { ...reminder, id },
        });
      }),
      catchError((error) =>
        of(ReminderActions.createReminderFailure({ error: error.message })),
      ),
    );
  });

  updateReminder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReminderActions.updateReminder),
      map(({ id, reminder }) =>
        ReminderActions.updateReminderSuccess({ id, reminder }),
      ),
      catchError((error) =>
        of(ReminderActions.updateReminderFailure({ error: error.message })),
      ),
    );
  });

  updateWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReminderActions.updateRemindersWeather),
      switchMap(({ reminders }) => {
        if (reminders.length === 0) {
          // Return a "no-op" action instead of empty array
          return of(ReminderActions.updateRemindersWeatherComplete());
        }

        const weatherObservables = reminders.map(({ id, reminder }) =>
          this.weatherService
            .getWeatherInformation(reminder.city, reminder.dateTime)
            .pipe(map((weather) => ({ id, weather }))),
        );

        return forkJoin(weatherObservables).pipe(
          mergeMap((results) =>
            results.map(({ id, weather }) =>
              ReminderActions.updateReminderWeatherSuccess({ id, weather }),
            ),
          ),
          catchError(() => of(ReminderActions.updateRemindersWeatherFailure())),
        );
      }),
    );
  });
}
