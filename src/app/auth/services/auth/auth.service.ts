import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { RequestResponse } from 'src/app/models/requests/request-response';
import { POSTRegister } from '../../models/post-register';
import { Role } from '../../models/role';
import { User } from '../../models/user';
import { AuthStrategy, AUTH_STRATEGY } from './strategy/auth.strategy';

const HEADERS = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly LOGIN_PATH = '/login';
  public readonly INITIAL_PATH = '';

  private readonly AUTH_API = "/api/login";
  private readonly REGISTRATION_API = '/api/registration';

  constructor(private http: HttpClient,
              private router: Router,
              @Inject(AUTH_STRATEGY) private auth: AuthStrategy) { }

  getCurrentUser$(): Observable<User | undefined> {
    return this.auth.getCurrentUser();
  }

  getUserRoles$(): Observable<Role[]> {
    return this.auth.getUserRoles();
  }

  login( username: string, password: string ): Observable<RequestResponse> {
    return this.http.post<any>(
      this.AUTH_API + '/login',
      {
        username,
        password,
      },
      { headers: HEADERS }
    ).pipe(
      map( (data) => {
        return this.auth.doLoginUser({ username: username, response: data});
       } ),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  logout() {
    this.auth.doLogoutUser();
    this.router.navigate([this.LOGIN_PATH]);
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
