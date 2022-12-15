import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
//import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor() {}

  getUserData(): User | null {
    //return this.account.userData;
    return null;
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
}
