import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { SignupFormControlsNames } from '../constants';

export const passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  if (!group) return null;

  const password = group.get(SignupFormControlsNames.PASSWORD)?.value;
  const confirmPassword = group.get(SignupFormControlsNames.PASSWORD_CONFIRMATION)?.value;

  return password === confirmPassword ? null : { passwordMismatch: true };
};
