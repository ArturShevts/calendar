import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cities, colors, Reminder } from '../../interfaces/reminder';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';
import { futureDateValidator } from '../../validators/date.validator';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderFormComponent implements OnInit {
  reminderFormGroup: FormGroup;
  textControl: FormControl;
  newTimeControl: FormControl;
  cityControl: FormControl;
  colorControl: FormControl;
  protected readonly colors = colors;
  protected readonly cities = Cities;

  constructor(
    private dialogRef: MatDialogRef<ReminderFormComponent>,
    private calendarService: CalendarService,
    @Inject(MAT_DIALOG_DATA) public data: { reminder?: Reminder; id?: string },
  ) {
    this.textControl = new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]);
    this.newTimeControl = new FormControl(new Date(), {
      validators: [Validators.required, futureDateValidator()],
      updateOn: 'blur',
    });
    this.cityControl = new FormControl('', Validators.required);
    this.colorControl = new FormControl('grey', Validators.required);

    this.reminderFormGroup = new FormGroup({
      text: this.textControl,
      newTime: this.newTimeControl,
      city: this.cityControl,
      color: this.colorControl,
    });
  }

  ngOnInit(): void {
    if (this.data.reminder) {
      this.setFormValues(this.data.reminder);
    }
  }

  private setFormValues(reminder: Reminder): void {
    this.textControl.setValue(reminder.text);
    this.newTimeControl.setValue(new Date(reminder.dateTime));
    this.cityControl.setValue(reminder.city);
    this.colorControl.setValue(reminder.color);
  }

  onSubmit(): void {
    if (this.reminderFormGroup.invalid) {
      this.reminderFormGroup.markAllAsTouched();
      return;
    }
    const formData = this.reminderFormGroup.value;

    const weather =
      this.data.reminder?.city == formData.city &&
      this.data.reminder?.dateTime?.toDateString() ==
        formData.dateTime?.toDateString()
        ? this.data.reminder?.weather
        : undefined;

    const newReminder: Reminder = {
      text: formData.text,
      dateTime: formData.newTime,
      city: formData.city,
      color: formData.color,
      weather: weather,
    };

    if (this.data.id) {
      this.calendarService.edit(newReminder, this.data.id);
    } else {
      this.calendarService.create(newReminder);
    }

    this.reminderFormGroup.reset();
    this.dialogRef.close();
  }
}
