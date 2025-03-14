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
      this.reminderFormGroup = new FormGroup({
        text: new FormControl(reminder?.text||"", Validators.required), // <- bad approach for test covarage reports, but it's
        year: new FormControl(reminder?.dateTime.getFullYear()|| date.getFullYear(), Validators.required),
        month: new FormControl(reminder?.dateTime.getMonth()||date.getMonth(), Validators.required),
        time: new FormControl(reminder?.dateTime||date.getTime()),  // Not required for all day events
        city: new FormControl(reminder?.city||'', ),
        color: new FormControl(reminder?.color||'', Validators.required),
      })

   }


  onSubmit() {
    console.log(this.reminderFormGroup?.value)
  }
}
