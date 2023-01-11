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
import { AddTranslationResponse } from 'src/app/models/requests/translation/add-translation.response';
import { EditTranslationLabelResponse } from 'src/app/models/requests/translation/edit-translation-label.response';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private mainService: MainService,
              private quizService: QuizService,
              private translationService: TranslationService) {}

  addNewTranslation(payload: Translation): Observable<AddTranslationResponse> {
    return this.translationService.addTranslation(payload);
  }

  deleteTranslation(payload: Translation): Observable<RequestResponse> {
    return this.translationService.deleteTranslation(payload);
  }

  editTranslation( payload: Translation, resetStatisctics?: boolean ): Observable<RequestResponse> {
    return this.translationService.editTranslation(payload, resetStatisctics);
  }

  editTranslationLabelList( translationId: number, addedIds?: number[], removedIds?: number[] ): Observable<EditTranslationLabelResponse> {
    return this.translationService.editTranslationLabelList( translationId, addedIds, removedIds );
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

  getLabelSelectList(): LabelProperties[] {
    return this.translationService.labels;
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

  loadLabelSelectList(): Observable<LabelProperties[]> {
    return this.translationService.getLabelsToFilter();
  }
  
}
