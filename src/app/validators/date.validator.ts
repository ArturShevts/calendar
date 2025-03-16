import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentDate = new Date();
    const controlDate = new Date(control.value);

    if (controlDate <= currentDate) {
      return { invalidDate: true };
    }

    return null;
  };
}
