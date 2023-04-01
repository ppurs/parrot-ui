import { Component, OnInit } from '@angular/core';
import { QuizFilter } from 'src/app/models/quiz-filter';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { Option } from 'src/app/models/option';
import { SelectionStrategyOptions } from 'src/app/models/selection-strategy-options';
import { forkJoin, Observable, Subject, switchMap } from 'rxjs';

const DEFAULT_NO_TILES_ON_PAGE: number = 5;

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {
  isLoadingList: boolean;
  isLoadingPage: boolean;
  noTiles: number = DEFAULT_NO_TILES_ON_PAGE;
  selectionStrategyOptions: Option[];
  selectedStrategy!: SelectionStrategyOptions;

  private reloadList = new Subject();

  constructor( private facade: FacadeService ) {
    this.isLoadingList = true;
    this.isLoadingPage = true;
    this.selectionStrategyOptions = [];
  }

  ngOnInit(): void {
    this.getSelectionStrategyOptions();
    this.loadQuizTiles();
    this.facade.setNoQuizTilesOnPage( this.noTiles );

    this.loadFilters().subscribe( () => {
      this.reloadList.next(true);
    });
  }

  applyFilter( event: QuizFilter ): void {
    this.facade.setQuizFilters( event );
    this.facade.setNoQuizTilesOnPage( DEFAULT_NO_TILES_ON_PAGE );
    this.reloadList.next(true);
  }

  getNumberList( num: number ): number[] {
    return Array(num).fill(0);
  }

  onStrategySelect(strategy: Option, event: Event): void {
    event.stopPropagation();
    
    if ( this.selectedStrategy == strategy.id ) {
      return;
    }

    this.selectedStrategy = strategy.id;
    this.selectionStrategyOptions.forEach( option => 
      option.default = ( strategy.id == option.id ) ? true : false )

    this.isLoadingList = true;
    this.facade.setSelectionStrategyOption(strategy).subscribe(
      () => {
        this.reloadList.next(true);
      }
    );  
  }

  private getSelectionStrategyOptions(): void {
    this.facade.getSelectionStrategyOptions().subscribe( res => {
      this.selectionStrategyOptions = res; 

      this.selectedStrategy = this.selectionStrategyOptions.find( obj => obj.default )?.id ?? 1;
    });
  }

  private loadFilters(): Observable<any> {
    return forkJoin([
      this.facade.loadWordTypes(),
      this.facade.loadLabelSelectList()
    ]);
  }

  private loadQuizTiles(): void {
    this.reloadList.pipe(switchMap( () => {
        this.isLoadingList = true;

        return this.facade.loadNewQuizTiles(); 
      } 
    )).subscribe(
      res => {
        this.noTiles = res.length < DEFAULT_NO_TILES_ON_PAGE ? res.length : DEFAULT_NO_TILES_ON_PAGE;
        this.facade.setNoQuizTilesOnPage( this.noTiles );

        this.isLoadingList = false;
        this.isLoadingPage = false;
      }
    )
  }
}
