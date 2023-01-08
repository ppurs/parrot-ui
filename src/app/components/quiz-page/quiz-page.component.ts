import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { QuizFilter } from 'src/app/models/quiz-filter';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {
  isLoadingPage: boolean;
  noTiles: number = 5;

  constructor( private cdref: ChangeDetectorRef,
               private facade: FacadeService,
               private quizService: QuizService,
               private translationService: TranslationService ) {
    this.isLoadingPage = true;
  }

  ngOnInit(): void {
    this.loadWordTypes();

    this.quizService.resetQuiz();
    this.quizService.setNoTilesOnPage( this.noTiles );
    this.loadQuizTiles();
  }

  applyFilter(event: QuizFilter ): void {
    this.quizService.setFilters( event );
    this.quizService.resetQuiz();
    this.loadQuizTiles();
    this.cdref.detectChanges();
  }

  getNumberList( num: number ): number[] {
    return Array(num).fill(0);
  }

  private loadQuizTiles(): void {
    this.facade.loadQuizTiles().subscribe(
      res => {
        this.noTiles = res.length < this.noTiles ? res.length : this.noTiles;
        this.quizService.setNoTilesOnPage( this.noTiles );

        this.isLoadingPage = false;
      }
    )
  }

  private loadWordTypes(): void {
    this.translationService.getWordTypes().subscribe();
  }

}
