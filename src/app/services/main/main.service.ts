import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, UnaryFunction } from 'rxjs';
import { CurrentLanguages } from 'src/app/models/current-languages';
import { Language } from 'src/app/models/language';
import { NavbarData } from 'src/app/models/navbar-data';
import { RequestResponse } from 'src/app/models/requests/request-response';

const HEADERS = new HttpHeaders({'Content-Type': 'application/json'});

//TODO: roles

interface GETNavbarResponse {
  username: string,
  languageFromId: number,
	languageToId: number,
	languages: {
    languageId: number,
    languageName: string
  }[]
  roles: string[] 
}

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private readonly NAVBAR_API = '/api/main-navbar';
  private readonly LANGS_API = '/api/languages';

  constructor(private http: HttpClient) {}

  changeCurrentLanguages(payload: CurrentLanguages): Observable<RequestResponse> {
    return this.http.post<RequestResponse>( 
      this.LANGS_API + '/switch',
      {
        languageFromId: payload.languageFrom.id,
        languageToId: payload.languageTo.id
      },
      {headers: HEADERS} 
      ).pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getNavbarData(): Observable<NavbarData> {
    return this.http.get<GETNavbarResponse>( 
      this.NAVBAR_API,
      {headers: HEADERS} 
      ).pipe(
        map( (res) => {
          const languages: Language[] = res.languages.map(lang => {
            return { id: lang.languageId, name: lang.languageName }
          });

          const currentLanguages: CurrentLanguages = {
            languageFrom: <Language>languages.find( lang => { return lang.id === res.languageFromId } ),
            languageTo: <Language>languages.find( lang => { return lang.id === res.languageToId } ),
          }

          return {
            username: res.username,
            currentLanguages: currentLanguages,
            languages: languages
          }
        }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
      );
  }
}
