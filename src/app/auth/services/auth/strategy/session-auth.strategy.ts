import { HttpClient } from "@angular/common/http";
import { Observable, of, tap } from "rxjs";
import { User } from "src/app/auth/models/user";
import { RequestResponse } from "src/app/models/requests/request-response";
import { AuthStrategy } from "./auth.strategy";

export class SessionAuthStrategy implements AuthStrategy {

    private loggedUser?: User;
  
    constructor(private http: HttpClient) {}
  
    doLoginUser(data: any): RequestResponse {
      const result = { result: true };
      return result;
    }
  
    doLogoutUser(): void {
      this.loggedUser = undefined;
    }
  
    getCurrentUser(): Observable<User> {
      if (this.loggedUser) {
        return of(this.loggedUser);
      } else {
        return this.http.get<User>(`someurl/user`)
          .pipe(tap(user => this.loggedUser = user));
      }
    }
  }