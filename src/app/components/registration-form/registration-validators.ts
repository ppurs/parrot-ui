import { AbstractControl, ValidationErrors, Validators } from "@angular/forms"; 

export const passwordMatchValidator = (firstControlName: string, secondControlName: string) => {
  return (control: AbstractControl): ValidationErrors | null => {
    const firstControl = control.get(firstControlName);
    const secondControl = control.get(secondControlName);
  
    if (secondControl?.value && secondControl.value !== firstControl?.value) {
      secondControl.setErrors({ passwordMatchError: true });
    }
  
    return null;
  };
};

export function uniqueUsernameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control?.value ?? null;

    if( !value ) {
      return null;
    }
  
    return getUniqueUsername(value) ? null : {nonuniqueUsername: true};
  };

export function getUniqueUsername(value: string): boolean { 
    //DO REQUEST 
    return true;
}