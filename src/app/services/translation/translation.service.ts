import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { FilterWordsOptions } from 'src/app/models/filter-words-options';
import { RequestResponse } from 'src/app/models/requests/request-response';
import { ResponseError } from 'src/app/models/requests/response-error';
import { Translation } from 'src/app/models/translation';
import { TranslationFilterHints } from 'src/app/models/translation-filter-hints';
import { WordType } from 'src/app/models/word-type';
import { MainService } from '../main/main.service';

const HEADERS = new HttpHeaders({'Content-Type': 'application/json'});

interface AddTranslationResponse {
  insertedId: number,
	result: boolean,
	errors: ResponseError[]
}

interface DeleteTranslationResponse {
  result: boolean,
  errors: string[]
}

interface GetFilterHintsResponse {
  wordsFrom: string[],
  wordsTo: string[]
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly TRANSLATION_API = '/api/translation';

  wordTypes!: WordType[];

  constructor(private http: HttpClient, 
              private mainService: MainService) {}

  addTranslation(payload: Translation): Observable<RequestResponse> {
    return this.http.post<AddTranslationResponse>( 
      this.TRANSLATION_API + '/add', 
      {
        languageFromId: this.mainService.currentLanguages.languageFrom.id,
        languageToId: this.mainService.currentLanguages.languageTo.id,
        wordFrom: payload.wordFrom,
        wordTo: payload.wordTo,
        description: payload.description,
        wordTypeId: payload.wordTypeId
      }, 
      { headers: HEADERS } )
    .pipe(
      map((data) => {
        const response: RequestResponse = {
          result: data.result,
          errors: data.errors
        }
       return response;
     }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  editTranslation( translation: Translation, resetQuizData?: boolean ): Observable<RequestResponse> {
    return this.http.post<AddTranslationResponse>( 
      this.TRANSLATION_API + '/edit/' + translation.translationId, 
      {
        languageFromId: this.mainService.currentLanguages.languageFrom.id,
        languageToId: this.mainService.currentLanguages.languageTo.id,
        wordFrom: translation.wordFrom,
        wordTo: translation.wordTo,
        description: translation.description,
        wordTypeId: translation.wordTypeId,
        resetQuizData: resetQuizData
      },
      {headers: HEADERS} )
    .pipe(
      map((data) => {
        const response: RequestResponse = {
          result: data.result,
          errors: data.errors
        }
       return response;
     }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  deleteTranslation( translation: Translation ): Observable<RequestResponse> {
    return this.http.get<DeleteTranslationResponse>( this.TRANSLATION_API + '/delete/' + translation.translationId, {headers: HEADERS} )
    .pipe(
      map( data => {
        const errors = data.errors?.map( err => ({ field: '', message: err }));

        return {
          result: data.result,
          errors: errors
        };
      }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  //TODO:
  //  REQUEST
  getTranslationFilterHints(payload: TranslationFilterHints): Observable<GetFilterHintsResponse> {
    return this.http.post<GetFilterHintsResponse>( this.TRANSLATION_API + '/word-list', payload, {headers: HEADERS} )
    .pipe(
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  //add hasNext property? 
  getTranslationsList( filters?: FilterWordsOptions, limit?: number, offset?: number ): Observable<Translation[]>  {
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
	        wordTypeId: filters?.wordTypeIds
        }
      },
      {headers: HEADERS} )
    .pipe(
      map( data => data.results 
      ),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }

  getWordTypes(): Observable<WordType[]> {
    const languageTo = this.mainService.currentLanguages.languageTo;
    return this.http.get<{wordTypes: WordType[]}>( this.TRANSLATION_API + '/word-type-list/' + languageTo.id, {headers: HEADERS} )
    .pipe(
      map((data) => {
        this.wordTypes = data.wordTypes;

       return data.wordTypes;
     }),
      catchError((err) => {
        console.error(err);
        throw err;
      })
    );
  }
}
