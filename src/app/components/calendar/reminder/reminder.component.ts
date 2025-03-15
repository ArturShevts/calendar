import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Reminder } from '../../../interfaces/reminder';

@Component({
  selector: 'app-reminder',
  // standalone: true,
  templateUrl: './reminder.component.html',
  styleUrl: './reminder.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReminderComponent {
  @Input() reminders: Reminder[] | undefined = [];
  constructor() {
    this.reminders?.sort(
      (a: Reminder, b: Reminder) => a.dateTime.getTime() - b.dateTime.getTime(),
    );
  }
}
