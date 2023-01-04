import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { CurrentLanguages } from 'src/app/models/current-languages';
import { NavbarData } from 'src/app/models/navbar-data';
import { Observable } from 'rxjs';
import { TranslationService } from '../translation/translation.service';
import { WordType } from 'src/app/models/word-type';
import { Translation } from 'src/app/models/translation';
import { RequestResponse } from 'src/app/models/requests/request-response';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private mainService: MainService,
              private translationService: TranslationService) {}

  addNewTranslation(payload: Translation): Observable<RequestResponse> {
    return this.translationService.addTranslation(payload);
  }

  deleteTranslation(payload: Translation): Observable<RequestResponse> {
    return this.translationService.deleteTranslation(payload);
  }

  editTranslation( payload: Translation ): Observable<RequestResponse> {
    return this.translationService.editTranslation(payload);
  }

  changeCurrentLanguages(payload: CurrentLanguages): Observable<RequestResponse> {
    return this.mainService.changeCurrentLanguages(payload);
  }

  getNavbarData(): Observable<NavbarData> {
    return this.mainService.getNavbarData();
  }

  getNavbarNavigation(): string[] {
    return ['quiz', 'translations', 'labels' ];
  }

  getTermTypes(): WordType[] {
    return this.translationService.wordTypes; 
  }
  
}
