import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { ImpersonateResponse } from 'src/app/models/requests/impersonate-response';
import { RequestResponse } from 'src/app/models/requests/request-response';
import { UsersFilter } from 'src/app/models/users-filter';
import { UsersFilterElement } from 'src/app/models/users-filter-element';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USERS_API = '/api/user';

  usersToFilter!: UsersFilterElement[];

  constructor(private http: HttpClient) { }

  getUsersList( filters?: UsersFilter): Observable<User[]> {
    return this.http.post< {results: User[]}>( this.USERS_API + '/list', { filters: filters } )
      .pipe(
        map( res => res.results )
      );
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
    return this.http.get<RequestResponse>( this.USERS_API + '/disable/' + userId );
  }
}
