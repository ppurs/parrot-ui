import { HttpClient } from "@angular/common/http";
import { InjectionToken } from "@angular/core";
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { Observable } from "rxjs";
import { User } from "src/app/auth/models/user";
import { RequestResponse } from "src/app/auth/models/request-response";
import { environment } from "src/environments/environment";
import { SessionAuthStrategy } from "./session-auth.strategy";

export interface AuthStrategy {
    doLoginUser(data: any): RequestResponse;
    doLogoutUser(): void;
    getCurrentUser(): Observable<User | undefined>;
  }
  
export const AUTH_STRATEGY = new InjectionToken<AuthStrategy>('AuthStrategy');
  
export const authStrategyProvider = {
  provide: AUTH_STRATEGY,
  deps: [HttpClient],
  useFactory: (http: HttpClient) => {
     switch (environment.auth) {
        case 'token':
          return new JwtAuthStrategy();
         case 'session':
           return new SessionAuthStrategy(http); 
        default: throw Error("[ERROR]: No configuration for auth found.");
       }
  }
};