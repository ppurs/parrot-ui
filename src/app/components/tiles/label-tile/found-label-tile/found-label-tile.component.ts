import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Label } from 'src/app/models/label';
import { TileActionBarOptions } from 'src/app/models/tile-action-bar-options';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { EditLabelStrategy } from '../../states/tile-submission-strategy/edit-label.strategy';
import { ActiveState } from '../../states/active.state';
import { DeletedState } from '../../states/deleted.state';
import { InactiveState } from '../../states/inactive.state';
import { SubmittedState } from '../../states/submitted.state';
import { TileState } from '../../states/tile.state';
import { LabelTile } from '../label-tile';


const FOUND_OPTIONS: TileActionBarOptions[] = [
  //TileActionBarOptions.DELETE,
  TileActionBarOptions.EDIT,
  TileActionBarOptions.COPY_CONTENT
]


@Component({
  selector: 'app-found-label-tile',
  templateUrl: './found-label-tile.component.html',
  styleUrls: ['./found-label-tile.component.scss']
})
export class FoundLabelTileComponent extends LabelTile implements OnInit {
  @Input() override content!: Label;
  @Output() removeEvent = new EventEmitter<Label>();
  @Output() duplicateFormValues = new EventEmitter<Label>();

  tileOptions: TileActionBarOptions[];
  formSubscription?: Subscription;
  translationChanged: boolean;
  showDeleteMessage: boolean;

  private initialState!: TileState;

  constructor( facade: FacadeService,
               private cdref: ChangeDetectorRef ) { 
    super( facade, new FormBuilder );

    this.tileOptions = FOUND_OPTIONS;
    this.translationChanged = false;
    this.showDeleteMessage = false;
  }

  ngOnInit(): void {
    this.initialState = new InactiveState(this);

    this.changeState(this.initialState);
    this.fillTileForm( this.content );  
    this.getLabels();
  }

  deleteConfirmed(event: boolean): void {
    if ( event ) {
      this.changeState( new DeletedState( this, this.facade ) );
      this.state.onBtnClick();  
    }
    else {
      this.showDeleteMessage = false;
    }
  }

  discardChanges(event: Event): void {
    this.fillTileForm( this.content );
    this.changeState(this.initialState);
    event.stopPropagation();
  }

  onActionSelect(event: string): void {
    switch ( event ) {
      case 'delete': {
        this.onDelete();

        break;
      }
      case 'edit': {
        this.onEdit();

        break;
      }
      case 'copyContent': {
        this.onCopyContent();
        break;
      }
    }
  }

  override removeFromList(): void {
    this.removeEvent.emit(this.content);
  }

  override tryChangeStateToInactive(): boolean {

    if ( !this.checkFormValuesChange() ) {
      this.showDeleteMessage = false;
      this.changeState( this.initialState );
      return true;
    }
    else {
      return false;
    }
  }

  override tryChangeStateToSubmitted(): boolean {   
     if ( this.validationCheck() ) {    
       this.changeState( new SubmittedState() );
       this.isExpanded = false;
       this.cdref.detectChanges();
  
       return true;
    }

    return false;
  }

  private checkFormValuesChange(): boolean {
    const directParentLabelId = this.content.parentLabels?.at( this.content.parentLabels.length -1 )?.labelId;

    if( this.name?.value != this.content.labelName ||
        this.colorCode?.value != this.content.colorCode ||
        this.parent?.value != directParentLabelId
       ) {

    return true;
  }
  
  return false; 
  }

  private onDelete() {
    //this.showDeleteMessage = true;
  }

  private onEdit() {
    this.isExpanded = true;
    const activeState = new ActiveState(this);
    activeState.setStrategy(new EditLabelStrategy(this.facade, this) );

    this.changeState( activeState );
  }

  private onCopyContent(): void {
    this.duplicateFormValues.emit( this.getCurrentFormValue() );
  } 

}
