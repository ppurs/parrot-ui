import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { QuizFilter } from 'src/app/models/quiz-filter';
import { QuizPayload } from 'src/app/models/requests/quiz-payload';
import { QuizTile, QuizTileContent } from 'src/app/models/quiz-tile';
import { NotifyResponse } from 'src/app/models/requests/notify-response';
import { MainService } from '../main/main.service';
import { Option } from 'src/app/models/option';
import { RequestResponse } from 'src/app/models/requests/request-response';


@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly QUIZ_API = '/api/quiz-tiles';

  private isFetchigMoreTiles = new BehaviorSubject<boolean>(false);
  isFetchingMoreTiles$ = this.isFetchigMoreTiles.asObservable();

  private filter?: QuizFilter;
  private lastTileIndex: number;
  private noTilesOnPage: number = 10;
  private quizTiles: QuizTile[];

  constructor( private http: HttpClient,
               private mainService: MainService ) { 
    this.quizTiles = [];
    this.lastTileIndex = -1;
  }

  getQuizTile(): QuizTile | null {
    if ( this.lastTileIndex == this.quizTiles.length - 1 ){
      return null;
    }

    this.lastTileIndex++;

   this.checkNumberOfAvailableTiles();

    return this.quizTiles[ this.lastTileIndex ];
  }

  getQuizTranslations(): Observable<QuizTile[]> {    
    const tilesCount: number = this.quizTiles.length == 0 ? this.noTilesOnPage * 2 : this.noTilesOnPage;

    const notUsedTranslationIds: number[] = this.quizTiles .slice(this.lastTileIndex + 1)
                                              .map( tile => tile.content.translationId );

    const payload: QuizPayload = {
      languageFromId: this.mainService.currentLanguages.languageFrom.id,
      languageToId: this.mainService.currentLanguages.languageTo.id,
      excludeTranslationIds: notUsedTranslationIds,
      count: tilesCount,
      wordTypeIds: this.filter?.wordTypeIds,
      labelIds: this.filter?.labelIds
    }

    return this.http.post<{results: QuizTileContent[]}>( 
      this.QUIZ_API + '/new', 
      {
        filters: payload
      })
      .pipe(
        map( data => {
          const tilesContent: QuizTile[] = data.results
              .filter( obj => obj.useInQuiz === true )
              .map( obj => ({content: obj, otherAnswers: [] }) );


          tilesContent.forEach( tile =>
             tile.otherAnswers.push(...
                data.results.filter( obj => obj.wordFrom == tile.content.wordFrom )
              )
            );

          this.quizTiles.push(...tilesContent);  

          return tilesContent ?? [];
        })
      );
  }

  getSelectionStrategyOptions(): Observable<Option[]> {
    return this.http.get<{options: Option[]}>( this.QUIZ_API + '/options/get-selection-strategies' )
    .pipe(
      map(
        data => data.options
      )
    );
  }

  notifySuccess( translationId: number ): Observable<NotifyResponse> {
    return this.http.get<NotifyResponse>( this.QUIZ_API + '/guessed/' + translationId );
  }

  notifyRevealed( translationId: number ): Observable<NotifyResponse> {
    return this.http.get<NotifyResponse>( this.QUIZ_API + '/revealed/' + translationId );
  }

  notifyFailure( translationId: number ): Observable<NotifyResponse> {
    return this.http.get<NotifyResponse>( this.QUIZ_API + '/attempt-failed/' + translationId );
  }

  removeQuizTile( tile: QuizTile): void {
    if ( this.lastTileIndex == -1 ) {
      return;
    }
    
    this.checkNumberOfAvailableTiles();

    this.lastTileIndex--;
    
    const index = this.quizTiles.indexOf(tile, 0);
    if (index > -1) {
      this.quizTiles.splice(index, 1);
    }
  }

  resetQuiz(): void {
    this.lastTileIndex = -1;
    this.quizTiles = [];
  }

  setFilters( filter: QuizFilter ) {
    this.filter = filter;
  }

  setNoTilesOnPage( number: number ) {
    this.noTilesOnPage = number;
  }

  setSelectionStrategyOption( strategy: Option ): Observable<RequestResponse> {
    return this.http.get<RequestResponse>( this.QUIZ_API + '/options/set-selection-strategies/' + strategy.id );
  }

  private checkNumberOfAvailableTiles() {
    if ( this.isFetchigMoreTiles.value == false && this.lastTileIndex >= this.quizTiles.length - this.noTilesOnPage ) {
      this.isFetchigMoreTiles.next(true);

      this.getQuizTranslations().subscribe( res => {
        this.isFetchigMoreTiles.next(false);
      });
    }
  }
}
