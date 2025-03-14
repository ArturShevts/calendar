import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Reminder } from '../../interfaces/reminder';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {
  months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  constructor(@Inject(MAT_DIALOG_DATA) public data: { date:Date, reminder: Reminder }) { }

  reminderFormGroup?:  FormGroup;
  ngOnInit(): void {
    console.log(this.data)
    let reminder = this.data.reminder;
    let date = this.data.date;

    if(reminder) {
      this.reminderFormGroup = new FormGroup({
        text: new FormControl(reminder.text, Validators.required),
        year: new FormControl(reminder.dateTime.getFullYear() , Validators.required),
        month: new FormControl(reminder.dateTime.getMonth(), Validators.required),
        time: new FormControl(reminder.dateTime),  // Not required for all day events
        city: new FormControl(reminder.city ),
        color: new FormControl(reminder.color, Validators.required),
      })
    } else {
      this.reminderFormGroup = new FormGroup({
        text: new FormControl( "", Validators.required),
        year: new FormControl(  date.getFullYear(), Validators.required),
        month: new FormControl( date.getMonth(), Validators.required),
        time: new FormControl( date.getTime()),  // Not required for all day events
        city: new FormControl( '', ),
        color: new FormControl( '', Validators.required),
      })

    }
   }


  onSubmit() {
    console.log(this.reminderFormGroup?.value)
  }
}
