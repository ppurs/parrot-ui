import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Role } from 'src/app/auth/models/role';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { AccountType } from 'src/app/models/account-type';
import { CurrentLanguages } from 'src/app/models/current-languages';
import { Language } from 'src/app/models/language';
import { NavbarData } from 'src/app/models/navbar-data';
import { NavbarNavigation } from 'src/app/models/navbar-navigation';
import { RequestResponse } from 'src/app/models/requests/request-response';


interface GETNavbarResponse {
  username: string,
  languageFromId?: number,
	languageToId?: number,
	languages?: {
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

  private readonly ACCOUNT_TYPES: AccountType[] = [
    { role: Role.USER, type: 'account.types.free' },
    { role: Role.ADMIN, type: 'account.types.admin' }
  ];

  private readonly NAVIGATIONS: NavbarNavigation[] = [
    { header: 'navigations.quiz', route: '/quiz', forRoles: [Role.USER] },
    { header: 'navigations.translations', route: '/translations', forRoles: [Role.USER] },
    { header: 'navigations.labels', route: '/labels', forRoles: [Role.USER] },
    { header: 'navigations.users', route: '/users', forRoles: [Role.ADMIN] }
  ];

  currentLanguages!: CurrentLanguages;

  constructor(private http: HttpClient,
              private auth: AuthService ) {}

  changeCurrentLanguages(payload: CurrentLanguages): Observable<RequestResponse> {
    this.currentLanguages = payload;

    return this.http.post<RequestResponse>( 
      this.LANGS_API + '/switch',
      {
        languageFromId: payload.languageFrom.id,
        languageToId: payload.languageTo.id
      }
      );
  }

  getAccountTypes(): Observable<AccountType[]> {
    return this.auth.getUserRoles$().pipe(
      map ( roles => {
      if (roles) {
        return this.ACCOUNT_TYPES.filter( type => roles.some(val => type.role == val ));
      }

      return [];
    }
    ));
  }

  getNavbarData(): Observable<NavbarData> {
    return this.http.get<GETNavbarResponse>( 
      this.NAVBAR_API
      ).pipe(
        map( (res) => {
          const languages: Language[] | undefined = res.languages?.map(lang => {
            return { id: lang.languageId, name: lang.languageName }
          });

          const currentLanguages: CurrentLanguages = {
            languageFrom: <Language>languages?.find( lang => { return lang.id === res.languageFromId } ),
            languageTo: <Language>languages?.find( lang => { return lang.id === res.languageToId } ),
          }

          this.currentLanguages = currentLanguages;

          return {
            username: res.username,
            currentLanguages: currentLanguages,
            languages: languages
          }
        }),
        catchError( error => {
          this.auth.logout();

          throw(error);
        })
      );
  }

  getNavigations(): Observable<NavbarNavigation[]> {
    return this.auth.getUserRoles$().pipe(map (roles => {
      if (roles) {
        return this.NAVIGATIONS.filter(nav => roles.some(val => nav.forRoles.includes(val)));
      }
      
      return [];
    }
    ));
  }
}
