import { HttpClient } from "@angular/common/http";
import { InjectionToken } from "@angular/core";
import { JwtAuthStrategy } from "./jwt-auth.strategy";
import { Observable } from "rxjs";
import { User } from "src/app/auth/models/user";
import { RequestResponse } from "src/app/auth/models/request-response";
import { environment } from "src/environments/environment";
import { Role } from "src/app/auth/models/role";

export interface AuthStrategy {
    doLoginUser(data: any): RequestResponse;
    doLogoutUser(): void;
    doImpersonateUser(data: any): RequestResponse;
    getCurrentUser(): Observable<User | undefined>;
    getUserRoles(): Observable<Role[]>;
    isUserImpersonated(): boolean;
    undoImpersonateUser(): void;

  }
  
export const AUTH_STRATEGY = new InjectionToken<AuthStrategy>('AuthStrategy');
  
export const authStrategyProvider = {
  provide: AUTH_STRATEGY,
  deps: [HttpClient],
  useFactory: () => {
     switch (environment.auth) {
        case 'token':
          return new JwtAuthStrategy();
        default: throw Error("[ERROR]: No configuration for auth found.");
       }
  }
};