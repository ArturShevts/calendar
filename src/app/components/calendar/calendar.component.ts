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
import { CalendarService, Notification } from '../../services/calendar.service';
import { WeatherService } from '../../services/weather.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Day {
  date: Date;
  reminders: Reminder[];
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private calendarService = inject(CalendarService);
  private weatherService = inject(WeatherService);
  private matDialog = inject(MatDialog);

  public calenderData: Day[] = [];
  public selectedDate = new BehaviorSubject<Date>(new Date());

  public $vm: Observable<{
    selectedDate: Date;
    notification: Notification;
    reminders: Reminder[];
  }> = combineLatest([
    this.selectedDate.asObservable().pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap((selectedDate: Date) => this.fillCalendar(selectedDate)),
    ),
    this.calendarService.$notification.pipe(
      startWith({ body: '', error: false }),
    ),
    this.calendarService.$reminders.pipe(
      map((reminders) => Array.from(reminders.values())),
    ),
  ]).pipe(
    map(([selectedDate, notifications, reminders]) => ({
      selectedDate,
      notification: notifications,
      reminders,
    })),
  );

  ngOnInit(): void {
    this.fillCalendar(new Date());
    // this.openNotification();
  }

  getWeather(city: string) {
    const x = this.weatherService.getWeatherInformation(city);
    console.log(x);
    return x;
  }

  openReminderForm(date: Date, reminder?: Reminder) {
    this.matDialog.open(ReminderFormComponent, {
      data: {
        date,
        reminder,
      },
    });
  }

  openNotification() {
    this.calendarService.$notification.pipe(
      tap((notice: Notification) => {
        this.snackBar.open(notice.body, 'Close', {
          panelClass: notice.error ? ['error'] : ['success'],
          duration: 3000,
          verticalPosition: 'top',
        });
      }),
    );
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

    let firstSatOfNextMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      1,
    );
    let days: Day[] = [];
    for (let i = 0; i < 42; i++) {
      // NOTE: small chance that feb 1st is a Sunday, in which case we only need to display 28 days
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
        selected: false,
        current: newDate.toDateString() === new Date().toDateString(),
      };

      days.push(newDay);
    }
    this.calenderData = days;
    console.log(days);
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
