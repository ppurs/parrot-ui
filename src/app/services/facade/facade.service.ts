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
import { Option } from 'src/app/models/option';
import { LabelService } from '../label/label.service';
import { Label } from 'src/app/models/label';
import { QuizFilter } from 'src/app/models/quiz-filter';
import { LabelsFilter } from 'src/app/models/labels-filter';
import { NotifyResponse } from 'src/app/models/requests/notify-response';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private labelService: LabelService, 
              private mainService: MainService,
              private quizService: QuizService,
              private translationService: TranslationService) {}

  addNewLabel(payload: Label): Observable<RequestResponse> {
    return this.labelService.addLabel(payload);
  }

  addNewTranslation(payload: Translation): Observable<AddTranslationResponse> {
    return this.translationService.addTranslation(payload);
  }

  changeCurrentLanguages(payload: CurrentLanguages): Observable<RequestResponse> {
    return this.mainService.changeCurrentLanguages(payload);
  }

  deleteTranslation(payload: Translation): Observable<RequestResponse> {
    return this.translationService.deleteTranslation(payload);
  }

  editLabel(payload: Label): Observable<RequestResponse> {
    return this.labelService.editLabel(payload);
  }

  editTranslation( payload: Translation, resetStatisctics?: boolean ): Observable<RequestResponse> {
    return this.translationService.editTranslation(payload, resetStatisctics);
  }

  editTranslationLabelList( translationId: number, addedIds?: number[], removedIds?: number[] ): Observable<EditTranslationLabelResponse> {
    return this.translationService.editTranslationLabelList( translationId, addedIds, removedIds );
  }  

  getFetchMoreQuizTilesStatus(): Observable<boolean> {
    return this.quizService.isFetchingMoreTiles$;
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

  getLabelParentHierarchyOptions(): Option[] {
    return this.labelService.hierarchyOptions;
  }

  getLabelsList(filter?: LabelsFilter, limit?: number, offset?: number ): Observable<Label[]> {
    return this.labelService.getLabelsList( filter, limit, offset );
  }

  getLabelSelectList(): LabelProperties[] {
    return this.translationService.labels;
  }

  getQuizTile(): QuizTile | null {
    return this.quizService.getQuizTile();
  }

  getSelectionStrategyOptions(): Observable<Option[]> {
    return this.quizService.getSelectionStrategyOptions();
  }

  getWordTypes(): WordType[] {
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

  loadLabelHierarchyOptions(): Observable<Option[]> {
    return this.labelService.getLabelHierarchyOptions();
  }

  loadLabelSelectList(): Observable<LabelProperties[]> {
    return this.translationService.getLabelsToFilter();
  }

  loadQuizTiles(): Observable<QuizTile[]> {
    return this.quizService.getQuizTranslations();
  }

  loadWordTypes(): Observable<WordType[]> {
    return this.translationService.getWordTypes();
  }

  notifyFailure( translationId: number ): Observable<NotifyResponse> {
    return this.quizService.notifyFailure( translationId );
  }

  notifyRevealed( translationId: number ): Observable<NotifyResponse> {
    return this.quizService.notifySuccess( translationId );
  }

  notifySuccess( translationId: number ): Observable<NotifyResponse> {
    return this.quizService.notifySuccess( translationId );
  }

  removeQuizTileContentFromMemory(tile: QuizTile): void {
    this.quizService.removeQuizTile(tile);
  }

  resetQuiz(): void {
    this.quizService.resetQuiz();
  }

  setNoQuizTilesOnPage( numberOfTiles: number ): void {
    this.quizService.setNoTilesOnPage( numberOfTiles );
  }

  setQuizFilters(filters: QuizFilter): void {
    this.quizService.setFilters( filters );
  }

  setSelectionStrategyOption( strategy: Option ): Observable<RequestResponse> {
    return this.quizService.setSelectionStrategyOption( strategy );
  }
  
}
