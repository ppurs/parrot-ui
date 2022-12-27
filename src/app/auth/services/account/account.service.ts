import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { POSTRegister } from 'src/app/auth/models/post-register';
import { RequestResponse } from 'src/app/models/requests/request-response';
import { User } from 'src/app/auth/models/user';
import { AuthStrategy, AUTH_STRATEGY } from '../auth/strategy/auth.strategy';

const HEADERS = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly REGISTRATION_API = '/api/registration';

  constructor(private http: HttpClient,
              @Inject(AUTH_STRATEGY) private auth: AuthStrategy) {
  }  

  getCurrentUser$(): Observable<User | undefined> {
    return this.auth.getCurrentUser();
  }

  register( payload: POSTRegister ): Observable<RequestResponse> {
    return this.http.post<RequestResponse>( this.REGISTRATION_API + '/register', payload, {headers: HEADERS} )
      .pipe(
        catchError((err) => {
          console.error(err);
          throw err;
        })
      );
  }

  validateUserUnique( username: string ){
    return this.http.post<{result: boolean}>( 
      this.REGISTRATION_API + '/username-exists', {username: username}, {headers: HEADERS} );
  }
  
}
