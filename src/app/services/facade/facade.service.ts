import { Injectable } from '@angular/core';
import { MainService } from '../main/main.service';
import { CurrentLanguages } from 'src/app/models/current-languages';
import { NavbarData } from 'src/app/models/navbar-data';
import { Observable } from 'rxjs';
import { TranslationService } from '../translation/translation.service';
import { WordType } from 'src/app/models/word-type';
import { Translation } from 'src/app/models/translation';
import { RequestResponse } from 'src/app/models/requests/request-response';
import { QuizTile } from 'src/app/models/quiz-tile';
import { QuizService } from '../quiz/quiz.service';
import { TranslationFilterHints } from 'src/app/models/translation-filter-hints';
import { LabelProperties } from 'src/app/models/label-properties';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private mainService: MainService,
              private quizService: QuizService,
              private translationService: TranslationService) {}

  addNewTranslation(payload: Translation): Observable<RequestResponse> {
    return this.translationService.addTranslation(payload);
  }

  deleteTranslation(payload: Translation): Observable<RequestResponse> {
    return this.translationService.deleteTranslation(payload);
  }

  editTranslation( payload: Translation, resetStatisctics?: boolean ): Observable<RequestResponse> {
    return this.translationService.editTranslation(payload, resetStatisctics);
  }

  changeCurrentLanguages(payload: CurrentLanguages): Observable<RequestResponse> {
    return this.mainService.changeCurrentLanguages(payload);
  }

  getLabelsToTranslationFilter(): Observable<LabelProperties[]> {
    return this.translationService.getLabelsToFilter();
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

  getTranslationsLangFromHints( payload: TranslationFilterHints ): Observable<string[]> {
    payload.filters!.languageId = this.mainService.currentLanguages.languageFrom.id;

    return this.translationService.getTranslationFilterHints( payload );
  }

  getTranslationsLangToHints( payload: TranslationFilterHints ): Observable<string[]> {
    payload.filters!.languageId = this.mainService.currentLanguages.languageTo.id;

    return this.translationService.getTranslationFilterHints( payload );
  }

  loadQuizTiles(): Observable<QuizTile[]> {
    return this.quizService.getQuizTranslations();
  }
  
}
