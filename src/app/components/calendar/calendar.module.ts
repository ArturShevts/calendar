import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { ReminderFormModule } from '../reminder-form/reminder-form.module';
import { ReminderComponent } from './reminder/reminder.component';
import { IconComponent } from './icon/icon.component';
import { StoreModule } from '@ngrx/store';
import { reminderReducer } from '../../store/reminder/reminder.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ReminderEffects } from '../../store/reminder/reminder.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../../environments/environment';
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
