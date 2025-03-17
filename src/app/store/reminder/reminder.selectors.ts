import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReminderState, selectAll, selectEntities } from './reminder.reducer';

export const selectReminderState = createFeatureSelector<ReminderState>('reminders');

export const selectAllReminders = createSelector(
  selectReminderState,
  selectAll
);

export const selectReminderEntities = createSelector(
  selectReminderState,
  selectEntities
);

export const selectNotification = createSelector(
  selectReminderState,
  (state) => state.notification
);

export const selectRemindersWithoutWeather = createSelector(
  selectAllReminders,
  (reminders) => reminders.filter((reminder) => !reminder.weather)
);
