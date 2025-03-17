import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderFormComponent } from './reminder-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import {
  MatTimepicker,
  MatTimepickerInput,
  MatTimepickerToggle,
} from '@angular/material/timepicker';
import { MatIcon } from '@angular/material/icon';

@NgModule({
  declarations: [ReminderFormComponent],
  exports: [ReminderFormComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioGroup,
    MatRadioButton,
    MatTimepickerToggle,
    MatIcon,
    MatTimepicker,
    MatTimepickerInput,
  ],
  providers: [MatDatepickerModule, provideNativeDateAdapter()],
})
export class ReminderFormModule {}
