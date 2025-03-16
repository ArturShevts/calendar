import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderFormComponent } from './reminder-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import { MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';

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
  ],
  providers: [MatDatepickerModule],
})
export class ReminderFormModule {}
