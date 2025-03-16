import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarService } from '../../services/calendar.service';
import { ReminderFormComponent } from './reminder-form.component';
import { futureDateValidator } from '../../validators/date.validator';
import { Cities, colors, Reminder } from '../../interfaces/reminder';
import { mockReminder } from '../../mocks/reminder';

describe('ReminderFormComponent', () => {
  let component: ReminderFormComponent;
  let calendarServiceSpy: jasmine.SpyObj<CalendarService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ReminderFormComponent>>;

  beforeEach(() => {
    const calendarServiceMock = jasmine.createSpyObj('CalendarService', [
      'edit',
      'create',
    ]);
    const dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    const dialogData = {
      reminder: mockReminder,
      id: undefined,
    };

    calendarServiceSpy = calendarServiceMock;
    dialogRefSpy = dialogRefMock;

    component = new ReminderFormComponent(
      dialogRefSpy,
      calendarServiceSpy,
      dialogData,
    );
    component.reminderFormGroup = new FormGroup({
      text: new FormControl('', Validators.required),
      newTime: new FormControl(new Date(), {
        validators: [Validators.required, futureDateValidator()],
        updateOn: 'blur',
      }),
      city: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.textControl).toBeTruthy();
    expect(component.newTimeControl).toBeTruthy();
    expect(component.cityControl).toBeTruthy();
    expect(component.colorControl).toBeTruthy();
  });

  it('should set form values correctly', () => {
    const reminder: Reminder = {
      text: 'Test Reminder',
      dateTime: new Date(),
      city: 'Kyoto',
      color: 'Test Color',
      weather: 'Sunny',
    };
    component['setFormValues'](reminder);
    expect(component.textControl.value).toBe(reminder.text);
    expect(component.newTimeControl.value).toEqual(reminder.dateTime);
    expect(component.cityControl.value).toBe(reminder.city);
    expect(component.colorControl.value).toBe(reminder.color);
  });

  it('should not submit invalid form', () => {
    component.reminderFormGroup.markAsTouched();
    component.onSubmit();
    expect(calendarServiceSpy.edit).not.toHaveBeenCalled();
    expect(calendarServiceSpy.create).not.toHaveBeenCalled();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should submit valid form and create reminder', () => {
    component.textControl.setValue('Test Reminder');
    component.newTimeControl.setValue(new Date());
    component.cityControl.setValue('Test City');
    component.colorControl.setValue('Test Color');
    component.onSubmit();
    expect(calendarServiceSpy.create).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should submit valid form and edit reminder', () => {
    component.data.id = '123';
    component.textControl.setValue('Test Reminder');
    component.newTimeControl.setValue(new Date());
    component.cityControl.setValue('Test City');
    component.colorControl.setValue('Test Color');
    component.onSubmit();
    expect(calendarServiceSpy.edit).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });
});
