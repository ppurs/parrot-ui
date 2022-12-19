import { Injectable } from '@angular/core';
import { offset } from '@popperjs/core';
import { Observable, of } from 'rxjs';
import { NavbarNavigation } from 'src/app/models/navbar-navigation';
import { TransaltionLanguages } from 'src/app/models/translation-languages';
import { User } from 'src/app/models/user';
//import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor() {}

  getUserData(): User | null {
    //return this.account.userData;
    return {username: 'Username', email: '', accountType: 'Free account' };
  }

  setUserData( loogedUser: User | null ) {
      //this.account.userData = loogedUser;
      return null;
  }

  getTermTypes(): string[] {
    return ["noun", "verb"];
  }

  addNewTerm(): boolean {
    return true;
  }

  getNavbarNavigation(): string[] {
    return ['quiz', 'translations', 'labels' ];
  }

  getUserLanguages(): TransaltionLanguages {
    return { from: ['eng'], to: ['eng'] };
  }
}
