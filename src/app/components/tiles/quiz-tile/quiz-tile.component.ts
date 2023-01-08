import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuizTile, QuizTileContent } from 'src/app/models/quiz-tile';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { AnswerStatus } from './answer-status';

@Component({
  selector: 'app-quiz-tile',
  templateUrl: './quiz-tile.component.html',
  styleUrls: ['./quiz-tile.component.scss']
})
export class QuizTileComponent implements OnInit {
  answerStatus: AnswerStatus;
  answerBtnsDisabled: boolean;
  currentContent!: QuizTileContent;
  isExpanded: boolean;
  isLoading: boolean;
  showNewWordBtn: boolean;
  showNoMoreWordsMsg: boolean;

  userAnswer = new FormControl<string>('');

  private tileData!: QuizTile;
  private subscription!: Subscription;
  
  constructor( private cdref: ChangeDetectorRef,
               private quizService: QuizService ) {
    this.answerStatus = AnswerStatus.NONE;
    this.answerBtnsDisabled = false;
    this.isExpanded = false;
    this.isLoading = false;
    this.showNewWordBtn = false;
    this.showNoMoreWordsMsg = false;
  }

  ngOnInit(): void {
    this.setNewContent();
    this.subscription = this.quizService.isFetchingMoreTiles$.subscribe( val => {
      if ( this.isLoading ) {

        if ( !val ) {
          this.isLoading = false;
          this.setNewContent();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isSubmitted(): boolean {
    return this.answerStatus.key != 'none';
  }

  onCheckClick(): void {
    this.disableAnswerActions();
    this.isExpanded = false;

    if( this.userAnswer.value == this.tileData.content.wordTo ) {
      this.answerStatus = AnswerStatus.CORRECT;

      this.quizService.notifySuccess( this.tileData.content.translationId ).subscribe();
    }
    else {
      const otherAnswer = this.tileData.otherAnswers
        .find( answer => answer.wordTo == this.userAnswer.value );
      
      if ( otherAnswer ) {
        this.currentContent = otherAnswer;
        this.answerStatus = AnswerStatus.PARTLY_CORRECT;
      }
      else{
        this.answerStatus = AnswerStatus.INCORRECT;
      }
    
      this.quizService.notifyFailure( this.tileData.content.translationId ).subscribe();
    }

    this.cdref.detectChanges();
  }

  onEnter(): void {
    this.onCheckClick();
  }

  onGiveAnswerClick(): void {
    this.disableAnswerActions();
    this.userAnswer.setValue(this.tileData.content.wordTo);
    this.quizService.notifyRevealed( this.tileData.content.translationId ).subscribe();
  }

  onNewWordClick(event: Event): void {
    event.stopPropagation();

    this.setNewContent();
    this.enableAnswerActions();

    this.answerStatus = AnswerStatus.NONE;
    this.cdref.detectChanges();
  }

  private disableAnswerActions(): void {
    this.answerBtnsDisabled = true;
    this.userAnswer.disable();
    this.showNewWordBtn = true;
  }

  private enableAnswerActions(): void {
    this.answerBtnsDisabled = false;
    this.userAnswer.enable();
    this.showNewWordBtn = false;
  }

  private setNewContent(): void {
    this.userAnswer.setValue('');

    const newContent = this.quizService.getQuizTile();

    if( newContent ){
      this.tileData = newContent;
      this.currentContent = this.tileData.content;
    }
    else {
      this.isLoading = true;
    }

    this.quizService.removeQuizTile(this.tileData);
  }
}
