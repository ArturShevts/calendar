import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { ReminderFormComponent } from '../reminder-form/reminder-form.component';
import { ReminderFormModule } from '../reminder-form/reminder-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReminderFormModule,
    MatDialogModule,
    FormsModule,
  ],
})
export class CalendarModule { }
