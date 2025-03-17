import { createAction, props } from '@ngrx/store';
import { Reminder } from '../../interfaces/reminder';

export const loadReminders = createAction('[Reminder] Load');
export const loadRemindersSuccess = createAction(
  '[Reminder] Load Success',
  props<{ reminders: Reminder[] }>(),
);
export const loadRemindersFailure = createAction(
  '[Reminder] Load Failure',
  props<{ error: string }>(),
);

export const createReminder = createAction(
  '[Reminder] Create',
  props<{ reminder: Reminder }>(),
);
export const createReminderSuccess = createAction(
  '[Reminder] Create Success',
  props<{ reminder: Reminder }>(),
);
export const createReminderFailure = createAction(
  '[Reminder] Create Failure',
  props<{ error: string }>(),
);

export const updateReminder = createAction(
  '[Reminder] Update',
  props<{ id: string; reminder: Reminder }>(),
);
export const updateReminderSuccess = createAction(
  '[Reminder] Update Success',
  props<{ id: string; reminder: Reminder }>(),
);
export const updateReminderFailure = createAction(
  '[Reminder] Update Failure',
  props<{ error: string }>(),
);

export const updateRemindersWeather = createAction(
  '[Reminder] Update Weather',
  props<{ reminders: { id: string; reminder: Reminder }[] }>(),
);
export const updateReminderWeatherSuccess = createAction(
  '[Reminder] Update Weather Success',
  props<{ id: string; weather: any }>(),
);

export const showNotification = createAction(
  '[Reminder] Show Notification',
  props<{ notification: { body: string; error: boolean } }>(),
);

export const updateRemindersWeatherComplete = createAction(
  '[Reminder] Update Weather Complete',
);

export const updateRemindersWeatherFailure = createAction(
  '[Reminder] Update Weather Failure',
);
