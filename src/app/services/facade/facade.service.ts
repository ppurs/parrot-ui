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
import { AddLabelResponse } from 'src/app/models/requests/label/add-label.response';
import { TranslationsFilter } from 'src/app/models/translations-filter';
import { UserService } from '../user/user.service';
import { UsersFilterElement } from 'src/app/models/users-filter-element';
import { User } from 'src/app/auth/models/user';
import { UsersFilter } from 'src/app/models/users-filter';
import { NavbarNavigation } from 'src/app/models/navbar-navigation';
import { AccountType } from 'src/app/models/account-type';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {

  constructor(private labelService: LabelService, 
              private mainService: MainService,
              private quizService: QuizService,
              private translationService: TranslationService,
              private usersService: UserService) {}

  addNewLabel(payload: Label): Observable<AddLabelResponse> {
    return this.labelService.addLabel(payload);
  }

  addNewTranslation(payload: Translation): Observable<AddTranslationResponse> {
    return this.translationService.addTranslation(payload);
  }

  changeCurrentLanguages(payload: CurrentLanguages): Observable<RequestResponse> {
    return this.mainService.changeCurrentLanguages(payload);
  }

  deleteLabel( payload: Label, option: number ): Observable<RequestResponse> {
    return this.labelService.deleteLabel(payload, option);
  }

  deleteTranslation(payload: Translation): Observable<RequestResponse> {
    return this.translationService.deleteTranslation(payload);
  }

  disableUser( userId: number ): Observable<RequestResponse> {
    return this.usersService.disableUser(userId);
  }

  editLabel(payload: Label): Observable<AddLabelResponse> {
    return this.labelService.editLabel(payload);
  }

  editTranslation( payload: Translation, resetStatisctics?: boolean ): Observable<RequestResponse> {
    return this.translationService.editTranslation(payload, resetStatisctics);
  }

  editTranslationLabelList( translationId: number, addedIds?: number[], removedIds?: number[] ): Observable<EditTranslationLabelResponse> {
    return this.translationService.editTranslationLabelList( translationId, addedIds, removedIds );
  }  

  getAccountTypes(): Observable<AccountType[]> {
    return this.mainService.getAccountTypes();
  }

  getFetchMoreQuizTilesStatus(): Observable<boolean> {
    return this.quizService.isFetchingMoreTiles$;
  }

  getLabelsToTranslationFilter(): Observable<LabelProperties[]> {
    return this.labelService.getLabelsToFilter();
  }

  getNavbarData(): Observable<NavbarData> {
    return this.mainService.getNavbarData();
  }

  getLabelParentHierarchyOptions(): Option[] {
    return this.labelService.hierarchyOptions;
  }

  getLabelsList(filter?: LabelsFilter, limit?: number, offset?: number ): Observable<Label[]> {
    return this.labelService.getLabelsList( filter, limit, offset );
  }

  getLabelSelectList(): Observable<LabelProperties[]> {
    return this.labelService.labels$;
  }

  getNavigations(): Observable<NavbarNavigation[]> {
    return this.mainService.getNavigations();
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

  getTranslationsList(filters?: TranslationsFilter, limit?: number, offset?: number): Observable<Translation[]> {
    return this.translationService.getTranslationsList(filters, limit, offset);
  }

  getUsersList( filters?: UsersFilter ): Observable<User[]> {
    return this.usersService.getUsersList( filters );
  }

  getUsersToFilters(): UsersFilterElement[] {
    return this.usersService.usersToFilter;
  }

  loadLabelHierarchyOptions(): Observable<Option[]> {
    return this.labelService.getLabelHierarchyOptions();
  }

  loadLabelSelectList(): Observable<LabelProperties[]> {
    return this.labelService.getLabelsToFilter();
  }

  loadNewQuizTiles(): Observable<QuizTile[]> { 
    return this.quizService.getNewQuizTranslations();
  }

  loadUsersToFilters(): Observable<UsersFilterElement[]> {
    return this.usersService.getUsersToFilters();
  }

  loadWordTypes(): Observable<WordType[]> {
    return this.translationService.getWordTypes();
  }

  notifyFailure( translationId: number ): Observable<NotifyResponse> {
    return this.quizService.notifyFailure( translationId );
  }

  notifyRevealed( translationId: number ): Observable<NotifyResponse> {
    return this.quizService.notifyRevealed( translationId );
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
