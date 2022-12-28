import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { CurrentLanguages } from 'src/app/models/current-languages';
import { Language } from 'src/app/models/language';
import { NavbarData } from 'src/app/models/navbar-data';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private mainService: MainService) {}

  addNewTerm(): boolean {
    return true;
  }

  changeCurrentLanguages(payload: CurrentLanguages): void {
    this.mainService.changeCurrentLanguages(payload).subscribe(
      (res) => {
        if ( !res.result ){
          //error statement or sth
          console.log( res.errors);
        }
      }
    );
  }

  getNavbarNavigation(): string[] {
    return ['quiz', 'translations', 'labels' ];
  }

  getTermTypes(): string[] {
    return ["noun", "verb"];
  }

  getNavbarData(): Observable<NavbarData> {
    return this.mainService.getNavbarData();
  }
}
