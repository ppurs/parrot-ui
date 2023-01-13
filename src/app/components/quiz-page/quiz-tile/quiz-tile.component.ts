import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { QuizTile, QuizTileContent } from 'src/app/models/quiz-tile';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { AnswerStatus } from './answer-status';
import { SelectionStrategyOptions } from '../../../models/selection-strategy-options';
import { DefaultStrategy } from './strategy/default.strategy';
import { LastTimeAppearedStrategy } from './strategy/last_time_appeared.strategy';
import { SelectionStrategy } from './strategy/selection.strategy';

@Component({
  selector: 'app-quiz-tile',
  templateUrl: './quiz-tile.component.html',
  styleUrls: ['./quiz-tile.component.scss']
})
export class QuizTileComponent implements OnInit {
  @Input() strategyOption: SelectionStrategyOptions;

  answerStatus: AnswerStatus;
  answerBtnsDisabled: boolean;
  currentContent!: QuizTileContent;
  isLoading: boolean;
  showNoMoreWordsMsg: boolean;
  userAnswer = new FormControl<string>('');

  private answerSubscription!: Subscription;
  private tileData!: QuizTile | null;
  private newWordBtnVisible: boolean;
  private subscription!: Subscription;
  private strategy: SelectionStrategy;
  
  constructor( private cdref: ChangeDetectorRef,
               private facade: FacadeService ) {
    this.answerStatus = AnswerStatus.NONE;
    this.answerBtnsDisabled = false;
    this.isLoading = false;
    this.newWordBtnVisible = false;
    this.showNoMoreWordsMsg = false;
    this.strategyOption = SelectionStrategyOptions.DEFAULT;
    this.strategy = new DefaultStrategy();
  }

  ngOnInit(): void {
    this.setNewContent();

    if( this.strategyOption != SelectionStrategyOptions.DEFAULT )
    this.strategy = new LastTimeAppearedStrategy();

    this.answerSubscription = this.userAnswer.valueChanges.subscribe( () => {
      if( this.answerStatus.key != 'none') {
        this.answerStatus = AnswerStatus.NONE;
      }
    })

    this.subscription = this.facade.getFetchMoreQuizTilesStatus().subscribe( val => {
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
    this.answerSubscription.unsubscribe();
  }

  isSubmitted(): boolean {
    return this.answerStatus.key != 'none';
  }

  onCheckClick(): void {
    this.disableAnswerActions();

    if( this.userAnswer.value == this.tileData!.content.wordTo ) {
      this.answerStatus = AnswerStatus.CORRECT;

      this.facade.notifySuccess( this.tileData!.content.translationId ).subscribe();
    }
    else {
      const otherAnswer = this.tileData!.otherAnswers
        .find( answer => answer.wordTo == this.userAnswer.value );

      this.answerStatus =  otherAnswer ? AnswerStatus.PARTLY_CORRECT : AnswerStatus.INCORRECT;
      this.enableAnswerActions();
 
      this.facade.notifyFailure( this.tileData!.content.translationId ).subscribe();
    }

    this.newWordBtnVisible = this.strategy.getNewWordBtnVisibility( this.answerStatus );
    this.cdref.detectChanges();
  }

  onEnter(): void {
    this.onCheckClick();
  }

  onGiveAnswerClick(): void {
    this.disableAnswerActions();
    this.newWordBtnVisible = true;
    this.userAnswer.setValue(this.tileData!.content.wordTo);
    this.facade.notifyRevealed( this.tileData!.content.translationId ).subscribe();
  }

  onNewWordClick(event: Event): void {
    event.stopPropagation();

    this.setNewContent();
    this.enableAnswerActions();

    this.answerStatus = AnswerStatus.NONE;
    this.cdref.detectChanges();
  }

  showNewWordBtn(): boolean {
    return this.newWordBtnVisible;
  }

  private disableAnswerActions(): void {
    this.answerBtnsDisabled = true;
    this.userAnswer.disable({emitEvent: false});
  }

  private enableAnswerActions(): void {
    this.answerBtnsDisabled = false;
    this.userAnswer.enable({emitEvent: false});
  }

  private setNewContent(): void {
    this.userAnswer.setValue('');
    this.newWordBtnVisible = false;

    if( this.tileData ) {
      this.facade.removeQuizTileContentFromMemory(this.tileData);
      this.tileData = null;
    }

    const newData = this.facade.getQuizTile();

    if( newData ){
      this.tileData = newData;
      this.currentContent = this.tileData.content; 
    }
    else {
      this.isLoading = true;
    }
    
  }
}
