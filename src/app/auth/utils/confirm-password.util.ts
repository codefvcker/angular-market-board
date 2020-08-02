import { AbstractControl } from '@angular/forms';

export function ConfirmValidationUtil(control: AbstractControl) {
  console.log(control.value);

  return null;
}
