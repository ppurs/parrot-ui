import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { AdditionTileState } from './states/addition-tile-state';
import { CurrentState } from './states/current-state';
import { SubmittedState } from './states/submitted-state';
import { TermAdditionStatus } from './states/term-addition-status';

@Component({
  selector: 'app-new-translation-tile',
  templateUrl: './new-translation-tile.component.html',
  styleUrls: ['./new-translation-tile.component.scss']
})
export class NewTranslationTileComponent implements OnInit {

  termAdditionForm = this.fb.group({
    term: ['', Validators.required ],
    translation: ['', Validators.required ],
    type: ['', Validators.required ],        
    description: ['']   
  })

  Types: string[];
  state: AdditionTileState;

  constructor( private facade: FacadeService, 
               private fb: FormBuilder) { 
    this.Types = [];
    this.state = new CurrentState(this);
  }

  ngOnInit(): void {
    this.Types = this.facade.getTermTypes();
  }

  get term() {
    return this.termAdditionForm.get('term');
  }

  isCurrent(): boolean {
    return this.state.processStatus == TermAdditionStatus.CURRENT;
  }

  isBtnDisabled(): boolean {
    return this.state.processStatus.btnDisabled;
  }

  getStatus(): string {
    return this.state.processStatus.key;
  }

  onSubmit(): void {
    this.state.onBtnClick()
  }

  tryAddNewTerm(): boolean {
    return this.facade.addNewTerm();
  }

  tryChangeStateToSubmitted(): boolean {
    if ( this.validationCheck() && this.term?.value != null  ) {    
      this.state = new SubmittedState(this, this.term.value);
      this.disableInputs();
     
      return true;
    }

    return false;
  }

  private disableInputs(): void {
    this.termAdditionForm.disable();
  }

  private validationCheck(): boolean {
    if ( this.termAdditionForm.invalid ){
      this.termAdditionForm.markAllAsTouched();

      return false;
    }

    return true;
  }
}
