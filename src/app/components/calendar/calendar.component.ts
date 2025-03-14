import { Component, OnDestroy, OnInit } from '@angular/core';
import {BehaviorSubject, debounceTime, distinctUntilChanged, map, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Reminder } from '../../interfaces/reminder';
import { CalendarService } from '../../services/calendar.service';
import { WeatherService } from '../../services/weather.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import {FormControl} from "@angular/forms";


export interface Day  {
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
 }



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  selectedDate = new  BehaviorSubject<Date>(new Date());
  $selectedDate = this.selectedDate.asObservable();


  selectedYearControl =  this.selectedDate.getValue().getFullYear()
  selectedMonthControl =  this.selectedDate.getValue().getMonth()

  tempDays: Day[] = [];
  onDestroy$ = new Subject<boolean>();

  constructor(
    private calendarService: CalendarService,
    private weatherService: WeatherService,
    private matDialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.$selectedDate.pipe(distinctUntilChanged(),
      debounceTime(300)
    ).subscribe((date) => {
      console.log("selected Date : "+date.toDateString());
      this.fillCalendar(this.selectedDate.value);
    })

this.fillCalendar(new Date());

    this.calendarService.list(new Date())
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((reminders: Reminder[]) => {
        reminders.map((reminder: Reminder) => {
          return {
            ...reminder,
            weather: this.getWeather(reminder?.city ?? ''),
          };
        });
      });
  }

  getWeather(city: string) {
    const x = this.weatherService.getWeatherInformation(city);
    console.log(x);
    return x;
  }



  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  openReminderForm(date: Date,reminder?: Reminder) {
    this.matDialog.open(ReminderFormComponent, {
      data: {
        date,
        reminder,
      },
    });
  }





// CALENDAR COMPONENT

public selectDate(selectedDate: Date) {
   this.selectedDate.next(selectedDate);

}


public fillCalendar(selectedDate:Date) {
    let firstDayMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);

    let firstDisplayDate =    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), firstDayMonth.getDate() - firstDayMonth.getDay());

    let firstSatOfNextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
 let days:Day[] = [];
for (let i = 0; i < 42; i++) {
   // NOTE: small chance that feb 1st is a Sunday, in which case we only need to display 28 days
   let newDate = new Date(firstDisplayDate.getFullYear(), firstDisplayDate.getMonth(), firstDisplayDate.getDate() + i)
  let newDay: Day = {
    date: newDate,
    reminders: [],
    weather: {},
    display: newDate.getMonth() === selectedDate.getMonth(),
    selected : false,
    current: newDate.toDateString() === new Date().toDateString()
 }

  days.push(newDay)
}
  console.log(days)
this.tempDays = days
}

// year and month select

public changeMonth(changeBy: number) {
  this.selectedDate.next(new Date(this.selectedDate.value.getFullYear(), this.selectedDate.value.getMonth() + changeBy, 1));
}


public changeYear(changeBy:number) {
  this.selectedDate.next(new Date(this.selectedDate.value.getFullYear() + changeBy, this.selectedDate.value.getMonth(), 1));
}

  protected readonly MonthsMap = MonthsMap;
}
