import { Observable, of } from "rxjs";
import { AuthToken } from "src/app/auth/models/auth-token";
import { RequestResponse } from "src/app/auth/models/request-response";
import { ResponseError } from "src/app/auth/models/response-error";
import { Role } from "src/app/auth/models/role";
import { User } from "src/app/auth/models/user";
import { ImpersonateResponse } from "src/app/models/requests/impersonate-response";
import { AuthStrategy } from "./auth.strategy";

interface LoginResponse {
  roles: Role[],
  token: string,
  tokenExpirationDateTime: string,
  result: boolean,
  errors: ResponseError[]
  
}

export class JwtAuthStrategy implements AuthStrategy {

    private readonly IMPERSONATE_TOKEN = 'IMPERSONATE_TOKEN';
    private readonly JWT_TOKEN = 'JWT_TOKEN';
    private readonly USER = 'USER';
    private readonly ROLES = 'ROLES';
  
    doLoginUser( data: any ): RequestResponse {
      data = <{username: string, response: any}>data;
      const response = <LoginResponse>data.response;
      if( response.result ) {
        const token: AuthToken = { token: response.token, tokenExpirationDateTime: response.tokenExpirationDateTime };

        localStorage.setItem(this.USER, data.username);
        localStorage.setItem(this.ROLES, JSON.stringify(data.response.roles ?? []));
        localStorage.setItem(this.JWT_TOKEN, JSON.stringify(token));
      }

      return <RequestResponse>{result: response.result, errors: response.errors};
    }
  
    doLogoutUser(): void {
      localStorage.removeItem(this.USER);
      localStorage.removeItem(this.ROLES);
      localStorage.removeItem(this.JWT_TOKEN);
    }

    doImpersonateUser(data: any): RequestResponse {
      data = <ImpersonateResponse>data;

      if ( data.result ) {
        const token: AuthToken = { token: data.token, tokenExpirationDateTime: data.tokenExpirationDateTime };
        localStorage.setItem(this.IMPERSONATE_TOKEN, JSON.stringify(token));
         
        const roles = [Role.USER];
        localStorage.setItem(this.ROLES, JSON.stringify(roles ?? []));
      }

      return <RequestResponse>{result: data.result, errors: data.errors};
    }
  
    getCurrentUser(): Observable<User | undefined> {
      const token = this.getToken();
      const user = this.getStoredUser();

      if (token) {
        return of(user);
      }
      
      return of(undefined);
    }

    getUserRoles(): Observable<Role[]> {
      const token = this.getToken();
      const roles = this.getStoredRoles();
      
      if (token) {
        return of(roles);
      }
      
      return of([]);
    }

    getImpersonateToken(): AuthToken {
      return localStorage.getItem(this.IMPERSONATE_TOKEN) != null ? 
                JSON.parse(<string>localStorage.getItem(this.IMPERSONATE_TOKEN)) : null;
    }
  
    getToken(): AuthToken {
      return localStorage.getItem(this.JWT_TOKEN) != null ? 
                JSON.parse(<string>localStorage.getItem(this.JWT_TOKEN)) : null;
    }

    isUserImpersonated(): boolean {
      return this.getImpersonateToken() ? true : false;
    }

    undoImpersonateUser(): void {
      localStorage.removeItem(this.IMPERSONATE_TOKEN);
        
      const roles = [Role.ADMIN];
      localStorage.setItem(this.ROLES, JSON.stringify(roles ?? []));
    }

    private getStoredRoles(): Role[] {
      return localStorage.getItem(this.ROLES) != null ? 
                JSON.parse(<string>localStorage.getItem(this.ROLES)) : [];
    }

    private getStoredUser(): User | undefined {
      if ( localStorage.getItem(this.USER) ) {
        const user: User = { username: <string>localStorage.getItem(this.USER) };
        return user;
      }

      return undefined;
    }
  }