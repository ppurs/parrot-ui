import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { map, Observable } from "rxjs";
import { AccountService } from "src/app/auth/services/account/account.service";

export class UniqueUsernameValidator {
    static createValidator(accountService: AccountService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors|null> => accountService
          .validateUserUnique(control.value)
          .pipe(
              map((data) => data.result ? { nonuniqueUsername: true } : null
              )
          );
    }
  }