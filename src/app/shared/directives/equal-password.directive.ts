import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, NgModel, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEqualPassword]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EqualPasswordValidatorDirective,
      multi: true
    }
  ]
})
export class EqualPasswordValidatorDirective implements Validator {

  @Input('appEqualPassword') equalPassword: NgModel;

  validate(control: AbstractControl): ValidationErrors | null {
    return (this.equalPassword.control.value !== control.value) ? { notEqualPasswords: { value: control.value } } : null;
  }

}
