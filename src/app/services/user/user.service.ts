import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthToken } from 'src/app/auth/models/auth-token';
import { User } from 'src/app/auth/models/user';
import { RequestResponse } from 'src/app/models/requests/request-response';
import { UsersFilter } from 'src/app/models/users-filter';
import { UsersFilterElement } from 'src/app/models/users-filter-element';

interface ImpersonateResponse extends RequestResponse {
  token: AuthToken
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USERS_API = '/api/user';

  usersToFilter!: UsersFilterElement[];

  constructor(private http: HttpClient) { }

  getUsersList( filters?: UsersFilter): Observable<User[]> {
    return this.http.get<User[]>( this.USERS_API + '/list');
  }

  getUsersToFilters(): Observable<UsersFilterElement[]> {
    return this.http.get<{ results: UsersFilterElement[] }>( this.USERS_API + '/users-filter-resource' )
              .pipe(
                map( res => {
                  this.usersToFilter = res.results;

                  return res.results;
                 } )
              );
  }

  disableUser(userId: number): Observable<RequestResponse> {
    return this.http.get<RequestResponse>( this.USERS_API + '/distable/' + userId );
  }

  impersonateUser(userId: number): Observable<ImpersonateResponse> {
    return this.http.get<ImpersonateResponse>( this.USERS_API + 'impersonate/' + userId );
  }
}