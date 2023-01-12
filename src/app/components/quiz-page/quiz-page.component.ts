import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { QuizFilter } from 'src/app/models/quiz-filter';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { Option } from 'src/app/models/option';

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

  constructor( private cdref: ChangeDetectorRef,
               private facade: FacadeService ) {
    this.isLoadingList = true;
    this.isLoadingPage = true;
    this.selectionStrategyOptions = [];
  }

  ngOnInit(): void {
    this.getSelectionStrategyOptions();
    this.loadWordTypes();
    this.loadLabelsList();

    this.facade.resetQuiz();
    this.facade.setNoQuizTilesOnPage( this.noTiles );
    this.loadQuizTiles();
  }

  applyFilter( event: QuizFilter ): void {
    this.facade.setQuizFilters( event );
    this.facade.resetQuiz();
    this.loadQuizTiles();
    this.cdref.detectChanges();
  }

  getNumberList( num: number ): number[] {
    return Array(num).fill(0);
  }

  onStrategySelect(strategy: Option, event: Event): void {
    event.stopPropagation();
    
    this.selectionStrategyOptions.forEach( option => 
      option.default = ( strategy.id == option.id ) ? true : false )

    this.facade.setSelectionStrategyOption(strategy).subscribe();
    this.facade.resetQuiz();
    this.loadQuizTiles();
    this.cdref.detectChanges();
  }

  private getSelectionStrategyOptions(): void {
    /*this.facade.getSelectionStrategyOptions().subscribe( res => {
      this.selectionStrategyOptions = res; 
    });*/

    this.selectionStrategyOptions = [
      {
        id: 1,
        label: "Parrot Optimizer",
        default: true,
      },
      {
        id: 2,
        label: "Last time appeared",
        default: false,
      }
    ]
  }

  private loadQuizTiles(): void {
    this.isLoadingList = true;

    this.facade.loadQuizTiles().subscribe(
      res => {
        this.noTiles = res.length < this.noTiles ? res.length : this.noTiles;
        this.facade.setNoQuizTilesOnPage( this.noTiles );

        this.isLoadingList = false;
        this.isLoadingPage = false;
        
      }
    )
  }

  private loadWordTypes(): void {
    this.facade.loadWordTypes().subscribe();
  }

  private loadLabelsList(): void {
    this.facade.loadLabelSelectList().subscribe();
  }

}
