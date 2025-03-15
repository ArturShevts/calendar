import {Component, inject, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reminder } from '../../interfaces/reminder';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CalendarService} from "../../services/calendar.service";

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {
  colors = [
    {name: 'Red', value: 'red'},
    {name: 'Green', value: 'green'},
    {name: 'Yellow', value: 'yellow'},
  ]
  calendarService = inject(CalendarService);
  constructor(@Inject(MAT_DIALOG_DATA) public data: { date:Date, reminder: Reminder }) { }

  reminderFormGroup?:  FormGroup;
  ngOnInit(): void {
    console.log(this.data)
    let reminder = this.data.reminder;
    let date = this.data.date;

    if(reminder) {
      this.reminderFormGroup = new FormGroup({
        text: new FormControl(reminder.text, Validators.required),
            date: new FormControl( reminder.dateTime, Validators.required),
        time: new FormControl(reminder.dateTime),  // Not required for all day events
        city: new FormControl(reminder.city ),
        color: new FormControl(reminder.color, Validators.required),
      })
    } else {
      this.reminderFormGroup = new FormGroup({
        text: new FormControl( "", Validators.required),
        date: new FormControl( date, Validators.required),
        time: new FormControl( date.getTime()),  // Not required for all day events
        city: new FormControl( '', ),
        color: new FormControl( '', Validators.required),
      })

    }
   }


  onSubmit() {

if (!this.reminderFormGroup) { console.error("Form is not initialized")
  return;
}
let formData = this.reminderFormGroup.value;
    console.log(formData)
let newReminder:Reminder = {
  text: formData.text,
  dateTime:  new Date(formData.date),
  city: formData.city,
  color: formData.color,
}
this.calendarService.create(newReminder)
return
  }

  // private makeDate(date: Date, t: Date): Date {
  //   date.setHours(t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds());
  // return  date;
  // }

}
