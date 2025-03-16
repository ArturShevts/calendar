import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Cities, colors, Reminder } from '../../interfaces/reminder';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CalendarService } from '../../services/calendar.service';

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderFormComponent implements OnInit {
  private dialogRef = inject(MatDialogRef<ReminderFormComponent>);
  cities = Cities;
  calendarService = inject(CalendarService);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { reminder: Reminder; id?: string },
  ) {}

  reminderFormGroup: FormGroup = new FormGroup({});
  textControl = new FormControl('', Validators.required);
  newTimeControl = new FormControl(new Date(), {
    validators: [Validators.required],
    updateOn: 'blur',
  });
  cityControl = new FormControl('', Validators.required);
  colorControl = new FormControl('', Validators.required);

  ngOnInit(): void {
    let reminder = this.data.reminder;

    if (reminder) {
      this.textControl.setValue(reminder.text);
      this.newTimeControl.setValue(new Date(reminder.dateTime));
      this.cityControl.setValue(reminder.city);
      this.colorControl.setValue(reminder.color);
    }

    this.reminderFormGroup.addControl('text', this.textControl);
    this.reminderFormGroup.addControl('newTime', this.newTimeControl);
    this.reminderFormGroup.addControl('city', this.cityControl);
    this.reminderFormGroup.addControl('color', this.colorControl);
  }

  onSubmit() {
    if (!this.reminderFormGroup) {
      console.error('Form is not initialized');
      return;
    }
    this.reminderFormGroup.markAsTouched();

    let formData = this.reminderFormGroup.value;
    let newReminder: Reminder = {
      text: formData.text,
      dateTime: formData.newTime,
      city: formData.city,
      color: formData.color,
    };

    if (this.data.id) {
      this.calendarService.edit(newReminder, this.data.id);
    } else {
      this.calendarService.create(newReminder);
    }

    this.reminderFormGroup.reset();
    this.dialogRef.close();
    return;
  }

  canSubmit() {
    return this.reminderFormGroup.valid || !this.reminderFormGroup.pristine;
  }

  protected readonly colors = colors;
}
