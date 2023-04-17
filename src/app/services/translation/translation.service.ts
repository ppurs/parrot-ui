import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TranslationsFilter } from 'src/app/models/translations-filter';
import { RequestResponse } from 'src/app/models/requests/request-response';
import { Translation } from 'src/app/models/translation';
import { TranslationFilterHints } from 'src/app/models/translation-filter-hints';
import { WordType } from 'src/app/models/word-type';
import { MainService } from '../main/main.service';
import { AddTranslationResponse } from 'src/app/models/requests/translation/add-translation.response';
import { EditTranslationLabelResponse } from 'src/app/models/requests/translation/edit-translation-label.response';


interface DeleteTranslationResponse {
  result: boolean,
  errors: string[]
}

interface TranslationFilterHintsResponse {
  results: {
    word: string
  }[]
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly TRANSLATION_API = '/api/translation';

  wordTypes!: WordType[];

  constructor(private http: HttpClient, 
              private mainService: MainService) {}

  addTranslation(payload: Translation): Observable<AddTranslationResponse> {
    return this.http.post<AddTranslationResponse>( 
      this.TRANSLATION_API + '/add', 
      {
        languageFromId: this.mainService.currentLanguages.languageFrom.id,
        languageToId: this.mainService.currentLanguages.languageTo.id,
        wordFrom: payload.wordFrom,
        wordTo: payload.wordTo,
        description: payload.description,
        wordTypeId: payload.wordTypeId,
      } );
  }

  editTranslationLabelList( translationId: number, addedLabelsIds?: number[], removedLabelsIds?: number[] ): Observable<EditTranslationLabelResponse> {
    return this.http.post<EditTranslationLabelResponse>(
      this.TRANSLATION_API + '/edit-labels/' + translationId,
      {
        addIds: addedLabelsIds,
        deleteIds: removedLabelsIds
      } );
  }

  editTranslation( translation: Translation, resetStatistics?: boolean ): Observable<RequestResponse> {
    return this.http.post<AddTranslationResponse>( 
      this.TRANSLATION_API + '/edit/' + translation.translationId, 
      {
        languageFromId: this.mainService.currentLanguages.languageFrom.id,
        languageToId: this.mainService.currentLanguages.languageTo.id,
        wordFrom: translation.wordFrom,
        wordTo: translation.wordTo,
        description: translation.description,
        wordTypeId: translation.wordTypeId,
        resetStatistics
      } )
    .pipe(
      map((data) => {
        const response: RequestResponse = {
          result: data.result,
          errors: data.errors
        }
       return response;
     })
    );
  }

  deleteTranslation( translation: Translation ): Observable<RequestResponse> {
    return this.http.get<DeleteTranslationResponse>( this.TRANSLATION_API + '/delete/' + translation.translationId )
    .pipe(
      map( data => {
        const errors = data.errors?.map( err => ({ field: '', message: err }));

        return {
          result: data.result,
          errors: errors
        };
      })
    );
  }

  getTranslationFilterHints(payload: TranslationFilterHints): Observable<string[]> {
    return this.http.post<TranslationFilterHintsResponse>( this.TRANSLATION_API + '/word-list', payload )
    .pipe(
      map( data => data.results.map( obj => obj.word ) ),
    );
  }

  getTranslationsList( filters?: TranslationsFilter, limit?: number, offset?: number ): Observable<Translation[]>  {
    return this.http.post<{results: Translation[]}>( 
      this.TRANSLATION_API + '/list', 
      {
        limit,                    //default value 50
        offset,                   //default value 0
        filters: {
          languageFromId: this.mainService.currentLanguages.languageFrom.id,
          languageToId: this.mainService.currentLanguages.languageTo.id,
          wordFromPrefix: filters?.wordFromPrefix,
	        wordToPrefix: filters?.wordToPrefix,
	        wordTypeId: filters?.wordTypeIds,
          labelIds: filters?.labelIds
        }
      } )
    .pipe(
      map( data => data.results )
    );
  }

  getWordTypes(): Observable<WordType[]> {
    const languageTo = this.mainService.currentLanguages.languageTo;
    return this.http.get<{wordTypes: WordType[]}>( this.TRANSLATION_API + '/word-type-list/' + languageTo.id )
    .pipe(
      map((data) => {
        this.wordTypes = data.wordTypes;

       return data.wordTypes;
     })
    );
  }
}
