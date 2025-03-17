import { Component, inject, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  tap,
} from 'rxjs';
import { Reminder } from '../../interfaces/reminder';
import { CalendarService, Notification } from '../../services/calendar.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Day } from '../../interfaces/calendar';

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
      const days = this.fillCalendar(selectedDate);
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
    const firstDayMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1,
    );

    const firstDisplayDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      firstDayMonth.getDate() - firstDayMonth.getDay(),
    );

    const days: Day[] = [];
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

      const newDate = new Date(
        firstDisplayDate.getFullYear(),
        firstDisplayDate.getMonth(),
        firstDisplayDate.getDate() + i,
      );

      const newDay: Day = {
        date: newDate,
        reminders: [],
        weather: {},
        display: newDate.getMonth() === selectedDate.getMonth(),
        selected:
          newDate.toISOString().split('T')[0] ===
          selectedDate.toISOString().split('T')[0],
        current:
          newDate.toLocaleDateString() === new Date().toLocaleDateString(),
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
