import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Reminder } from '../../interfaces/reminder';
import * as ReminderActions from './reminder.actions';

export interface ReminderState extends EntityState<Reminder> {
  loading: boolean;
  error: string | null;
  notification: { body: string; error: boolean } | null;
}

export const adapter: EntityAdapter<Reminder> = createEntityAdapter<Reminder>({
  selectId: (reminder: Reminder) => reminder.id,
});

export const initialState: ReminderState = adapter.getInitialState({
  loading: false,
  error: null,
  notification: null,
});

export const reminderReducer = createReducer(
  initialState,
  on(ReminderActions.loadReminders, (state) => ({
    ...state,
    loading: true,
  })),
  on(ReminderActions.loadRemindersSuccess, (state, { reminders }) =>
    adapter.setAll(reminders, { ...state, loading: false })
  ),
  on(ReminderActions.loadRemindersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(ReminderActions.createReminderSuccess, (state, { reminder }) =>
    adapter.addOne(reminder, state)
  ),
  on(ReminderActions.updateReminderSuccess, (state, { id, reminder }) =>
    adapter.updateOne({ id, changes: reminder }, state)
  ),
  on(ReminderActions.updateReminderWeatherSuccess, (state, { id, weather }) =>
    adapter.updateOne({ id, changes: { weather } }, state)
  ),
  on(ReminderActions.showNotification, (state, { notification }) => ({
    ...state,
    notification,
  }))
);

export const { selectEntities, selectAll } = adapter.getSelectors();
