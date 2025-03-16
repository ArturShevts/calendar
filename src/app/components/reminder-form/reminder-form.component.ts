import { Component, inject, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reminder } from '../../interfaces/reminder';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
})
export class ReminderFormComponent implements OnInit {
  colors = [
    { name: 'Red', value: 'red' },
    { name: 'Green', value: 'green' },
    { name: 'Yellow', value: 'yellow' },
  ];
  calendarService = inject(CalendarService);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { date: Date; reminder: Reminder },
  ) {}

  reminderFormGroup?: FormGroup;
  ngOnInit(): void {
    let reminder = this.data.reminder;
    let date = this.data.date;

    if (reminder) {
      this.reminderFormGroup = new FormGroup({
        text: new FormControl(reminder.text, Validators.required),
        date: new FormControl(reminder.dateTime, Validators.required),
        time: new FormControl(reminder.dateTime, Validators.required), // Not required for all day events
        city: new FormControl(reminder.city),
        color: new FormControl(reminder.color, Validators.required),
      });
    } else {
      this.reminderFormGroup = new FormGroup({
        text: new FormControl('', Validators.required),
        date: new FormControl(date, Validators.required),
        time: new FormControl(date.getTime(), Validators.required), // Not required for all day events
        city: new FormControl('', Validators.required),
        color: new FormControl('', Validators.required),
      });
    }
  }

  onSubmit() {
    if (!this.reminderFormGroup) {
      console.error('Form is not initialized');
      return;
    }
    this.reminderFormGroup.markAsTouched();

    let formData = this.reminderFormGroup.value;
    let newReminder: Reminder = {
      id: this.data.reminder?.id || '_' + Math.random().toString(36),
      text: formData.text,
      dateTime: new Date(this.makeDate(formData.date, formData.time)),
      city: formData.city,
      color: formData.color,
    };

    if (this.data.reminder) {
      this.calendarService.edit(newReminder);
    } else {
      this.calendarService.create(newReminder);
    }

    this.reminderFormGroup.reset();

    return;
  }

  makeDate(date: string, time: string): Date {
    let d = new Date(date);
    let t = new Date(time);
    d.setHours(
      t.getHours(),
      t.getMinutes(),
      t.getSeconds(),
      t.getMilliseconds(),
    );
    return d;
  }
}
