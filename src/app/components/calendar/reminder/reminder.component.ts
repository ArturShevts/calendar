import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Reminder } from '../../../interfaces/reminder';
import { ReminderFormComponent } from '../../reminder-form/reminder-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-reminder',
  // standalone: true,
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderComponent {
  @Input() reminders: Reminder[] | undefined = [];
  private matDialog = inject(MatDialog);

  constructor() {
    this.reminders?.sort(
      (a: Reminder, b: Reminder) => a.dateTime.getTime() - b.dateTime.getTime(),
    );
  }

  openReminderForm(date: Date, reminder: Reminder) {
    console.log('Open!!!!!!!!!!!', date, reminder);
    this.matDialog.open(ReminderFormComponent, {
      data: {
        date,
        reminder,
      },
    });
  }
}
