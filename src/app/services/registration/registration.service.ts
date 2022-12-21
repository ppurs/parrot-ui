import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const HEADERS = new HttpHeaders({'Content-Type': 'application/json'});

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private readonly REGISTRATION_API = '/api/registration';

  constructor(private http: HttpClient) {}  

  register( payload: any ) {
    this.http.post<any>( this.REGISTRATION_API + '/register', payload, {headers: HEADERS} )
        .subscribe(data => console.log(data));
  }

  validateUserUnique( username: string ) {
    this.http.post<any>( 
      this.REGISTRATION_API + '/username-exists', username, {headers: HEADERS} )
    .subscribe(data => console.log(data));
  }
}
