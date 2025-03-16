import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { ReminderFormModule } from '../reminder-form/reminder-form.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ReminderComponent } from './reminder/reminder.component';
import { IconComponent } from './icon/icon.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [CalendarComponent, ReminderComponent, IconComponent],
  exports: [CalendarComponent, ReminderComponent, IconComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    SharedModule,
    ReminderFormModule,
  ],
})
export class CalendarModule {}
