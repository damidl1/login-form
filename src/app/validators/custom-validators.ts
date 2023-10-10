import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static checkFirstAndLastUppercase(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length > 0) {
        const isFirstUpper =
          control.value[0] === control.value[0].toUpperCase();
        const isLastUpper =
          control.value[control.value.length - 1] ===
          control.value[control.value.length - 1].toUpperCase();

        const isValid = isFirstUpper && isLastUpper;

        if (isValid) {
          return null;
        } else {
          return { isFirstUpper: isFirstUpper, isLastUpper: isLastUpper };
        }
      } else {
        return null;
      }
    };
  }

  static checkAddressUSA() {
    return (control: AbstractControl): ValidationErrors | null => {
      const validCountryNames = [
        'usa',
        'u.s.a',
        'united states',
        'united states of america',
      ];

      const isInArray = validCountryNames.includes(control.value.toLowerCase());

      return isInArray ? null : { invalidName: control.value };
    };
  }

  static checkNotMinor() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const today = new Date().getFullYear();
      const birthDate = control.value;
      const age = today - birthDate;

      if (age < 18) {
        return { underAge: true };
      }
      return null;
    };
  }

  static isPasswordValid(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      //min 8 caratteri, almeno una maiuscola,
      //almeno uno dei nipoti di paperino, deve includere almeno due caratteri speciali (!£$?@#*€)

      if (!control.value) {
        return null;
      }

      const regex =  /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[a-z])(?=.*\d).{8,}$/;

      if (!regex.test(control.value)) {
        return { invalidPassword : true};
      }
      return null;
    };
  }

  static keywordValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const includesWord = /(qui|quo|qua)/i.test(control.value);

      if (!includesWord) {
        return { invalidKeyword : true}
      }
      return null;
    }
  }
}
