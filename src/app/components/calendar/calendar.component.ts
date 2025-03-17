import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
  WritableSignal,
} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  forkJoin,
  map,
  mergeMap,
  Observable,
  share,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Reminder } from '../../interfaces/reminder';
import {
  CalendarService,
  Notification,
  ReminderMap,
} from '../../services/calendar.service';
import { WeatherService } from '../../services/weather.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Day {
  date: Date;
  reminders: { id: string; reminder: Reminder }[];
  weather: any;
  display: boolean;
  selected: boolean;
  current: boolean;
}
export const MonthsMap = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: false,
})
export class CalendarComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private calendarService = inject(CalendarService);
  private matDialog = inject(MatDialog);

  public selectedDate = new BehaviorSubject<Date>(new Date());

  public $vm: Observable<{
    days: Day[];
    notification: Notification;
    selectedDate: Date;
  }> = combineLatest([
    // convert to selected month
    this.selectedDate.asObservable().pipe(distinctUntilChanged()),
    this.calendarService.$notification.pipe(
      startWith({ body: 'Welcome!', error: false }),
      tap((notification) => this.openNotification(notification)),
    ),
    this.calendarService.$reminders.pipe(
      tap((reminders) => {
        console.log('reminders', reminders);
        this.calendarService.updateRemindersWeather(reminders);
      }),
    ),
  ]).pipe(
    map(([selectedDate, notification, reminders]) => {
      let days = this.fillCalendar(selectedDate);
      for (const day of days) {
        day.reminders = Array.from(reminders.entries()).reduce(
          (acc, [id, reminder]) => {
            if (reminder.dateTime.toDateString() === day.date.toDateString()) {
              acc.push({ id, reminder });
            }
            return acc;
          },
          [] as { id: string; reminder: Reminder }[],
        );
      }
      console.log(days);

      return {
        selectedDate,
        days,
        notification,
      };
    }),
  );

  ngOnInit(): void {
    // this.calendarService.updateRemindersWeather();
  }

  openReminderForm(reminder?: Reminder) {
    this.matDialog.open(ReminderFormComponent, {
      data: {
        reminder,
      },
    });
  }

  openNotification(notification: Notification) {
    this.snackBar.open(notification.body, 'Close', {
      panelClass: notification.error ? ['error'] : ['success'],
      duration: 3000,
      verticalPosition: 'top',
    });
  }

  // CALENDAR COMPONENT

  public selectDate(selectedDate: Date) {
    this.selectedDate.next(selectedDate);
  }

  public fillCalendar(selectedDate: Date) {
    let firstDayMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    );

    let firstDisplayDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      firstDayMonth.getDate() - firstDayMonth.getDay(),
    );

    let days: Day[] = [];
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0,
    ).getDate();
    let totalDays = daysInMonth + firstDayMonth.getDay();
    if (totalDays > 28 && totalDays <= 35) {
      totalDays = 35;
    } else if (totalDays > 35) {
      totalDays = 42;
    }

    for (let i = 0; i < totalDays; i++) {
      // NOTE: small chance that feb 1st is a Sunday, in which case we only need to display 28 days but will ignore to support

      let newDate = new Date(
        firstDisplayDate.getFullYear(),
        firstDisplayDate.getMonth(),
        firstDisplayDate.getDate() + i,
      );

      let newDay: Day = {
        date: newDate,
        reminders: [],
        weather: {},
        display: newDate.getMonth() === selectedDate.getMonth(),
        selected:
          newDate.toISOString().split('T')[0] ===
          selectedDate.toISOString().split('T')[0],
        current:
          newDate.toISOString().split('T')[0] ===
          new Date().toISOString().split('T')[0],
      };

      days.push(newDay);
    }
    days;
    return days;
  }

  // year and month select

  public changeMonth(changeBy: number) {
    this.selectedDate.next(
      new Date(
        this.selectedDate.value.getFullYear(),
        this.selectedDate.value.getMonth() + changeBy,
        1,
      ),
    );
  }

  public changeYear(changeBy: number) {
    this.selectedDate.next(
      new Date(
        this.selectedDate.value.getFullYear() + changeBy,
        this.selectedDate.value.getMonth(),
        1,
      ),
    );
  }
}
