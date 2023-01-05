import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { QuizFilter } from 'src/app/models/quiz-filter';
import { QuizTile } from 'src/app/models/quiz-tile';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss']
})
export class QuizPageComponent implements OnInit {
  isLoadingPage: boolean;
  quizTiles: QuizTile[];

  private filter?: QuizFilter;

  constructor( private cdref: ChangeDetectorRef,
               private facade: FacadeService,
               private translationService: TranslationService ) {
    this.isLoadingPage = true;
    this.quizTiles = [];
  }

  ngOnInit(): void {
    this.loadWordTypes();
    this.getQuizTiles();
  }

  applyFilter(event: QuizFilter ): void {
    this.filter = event;
    this.getQuizTiles();
    this.cdref.detectChanges();
  }

  private loadWordTypes(): void {
    this.translationService.getWordTypes().subscribe( res => {
      this.isLoadingPage = false;
    });
  }

  private getQuizTiles(): void {

  }

}
