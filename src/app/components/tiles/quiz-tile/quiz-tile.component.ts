import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { QuizTile } from 'src/app/models/quiz-tile';
import { FacadeService } from 'src/app/services/facade/facade.service';

@Component({
  selector: 'app-quiz-tile',
  templateUrl: './quiz-tile.component.html',
  styleUrls: ['./quiz-tile.component.scss']
})
export class QuizTileComponent implements OnInit {
  @Input() tileData!: QuizTile;
  
  userAnswer = new FormControl<string>('');
  isAnswerDisabled = false;

  private currentTileAnswer?: string;

  constructor( private cdref: ChangeDetectorRef,
               private facde: FacadeService ) {}

  ngOnInit(): void {

  }

  onCheckClick() {
    this.userAnswer.disable;
    //TODO
  }

  onGiveAnswerClick() {
    //TODO
  }

}
