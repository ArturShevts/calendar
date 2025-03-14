import { Component, OnDestroy, OnInit } from '@angular/core';
import {BehaviorSubject, distinctUntilChanged, map, Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Reminder } from '../../interfaces/reminder';
import { CalendarService } from '../../services/calendar.service';
import { WeatherService } from '../../services/weather.service';
import { MatDialog } from '@angular/material/dialog';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';


export interface Day  {
  date: Date;
  reminders: Reminder[];
  weather: any;
  display: boolean;
  selected: boolean;
  current: boolean;
}



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {
  selectedDate = new  BehaviorSubject<Date>(new Date());
  $selectedDate = this.selectedDate.asObservable();
  $selectedMonth = this.$selectedDate.pipe(
    map((date) => date.getMonth(),
      distinctUntilChanged())
  );


  tempDays: Day[] = [];
  onDestroy$ = new Subject<boolean>();

  constructor(
    private calendarService: CalendarService,
    private weatherService: WeatherService,
    private matDialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.$selectedDate.subscribe((date) => {
      console.log(date, "selected Date");
    })
    this.$selectedMonth.subscribe((month) => {
      console.log(month, "selected Month");
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

  openReminderForm(reminder?: Reminder) {
    this.matDialog.open(ReminderFormComponent, {
      data: {
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
  this.fillCalendar(this.selectedDate.value);
}


public changeYear(changeBy:number) {
  this.selectedDate.next(new Date(this.selectedDate.value.getFullYear() + changeBy, this.selectedDate.value.getMonth(), 1));
  this.fillCalendar(this.selectedDate.value);
}

}
