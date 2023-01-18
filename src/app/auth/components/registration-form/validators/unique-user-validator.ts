import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { AuthService } from "src/app/auth/services/auth/auth.service";

export class UniqueUsernameValidator {
    static createValidator(authService: AuthService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors|null> => authService
          .validateUserUnique(control.value)
          .pipe(
              map((data) => data.result ? { nonuniqueUsername: true } : null
              )
          );
    }
  }