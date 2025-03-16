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
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss',
  standalone: false,
})
export class ReminderComponent {
  @Input() reminders: { id: string; reminder: Reminder }[] | undefined = [];
  private matDialog = inject(MatDialog);

  constructor() {
    this.reminders?.sort(
      (a, b) => a.reminder.dateTime.getTime() - b.reminder.dateTime.getTime(),
    );
  }

  openReminderForm(id: string, reminder: Reminder) {
    this.matDialog.open(ReminderFormComponent, {
      data: {
        id,
        reminder,
      },
    });
  }
}
