import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderFormComponent } from './reminder-form.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [ReminderFormComponent],
  exports: [ReminderFormComponent],
  imports: [
    CommonModule,
    MatDialogModule,
  ]
})
export class ReminderFormModule { }
