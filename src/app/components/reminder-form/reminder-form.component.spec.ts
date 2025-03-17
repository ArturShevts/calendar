import { MatDialogRef } from '@angular/material/dialog';
import { CalendarService } from '../../services/calendar.service';
import { ReminderFormComponent } from './reminder-form.component';
import { Reminder } from '../../interfaces/reminder';
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

    // Let component initialize properly
    component.ngOnInit();
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
    component.textControl.setValue('');
    component.reminderFormGroup.markAllAsTouched();

    expect(component.reminderFormGroup.valid).toBeFalsy();
    component.onSubmit();

    expect(calendarServiceSpy.edit).not.toHaveBeenCalled();
    expect(calendarServiceSpy.create).not.toHaveBeenCalled();
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
  });

  it('should submit valid form and create reminder', () => {
    // Set a future date to pass validator
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    component.textControl.setValue('Test Reminder');
    component.newTimeControl.setValue(futureDate);
    component.cityControl.setValue('Kyoto');
    component.colorControl.setValue('Red');

    // Force validation
    component.reminderFormGroup.updateValueAndValidity();

    expect(component.reminderFormGroup.valid).toBeTruthy();

    component.onSubmit();

    expect(calendarServiceSpy.create).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should submit valid form and edit reminder', () => {
    // Set a future date to pass validator
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);

    component.data.id = '1234';
    component.textControl.setValue('Test Reminder');
    component.newTimeControl.setValue(futureDate);
    component.cityControl.setValue('Kyoto');
    component.colorControl.setValue('Red');

    // Force validation
    component.reminderFormGroup.updateValueAndValidity();
    expect(component.reminderFormGroup.valid).toBeTruthy();

    component.onSubmit();

    expect(calendarServiceSpy.edit).toHaveBeenCalled();
    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

  it('should initialize text control with max length validator', () => {
    component.textControl.setValue('a'.repeat(31));
    expect(component.textControl.hasError('maxlength')).toBeTrue();
  });
});
