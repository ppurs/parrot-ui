import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Label } from 'src/app/models/label';
import { TileActionBarOptions } from 'src/app/models/tile-action-bar-options';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { ActiveState } from 'src/app/components/shared/states/active.state';
import { DeletedState } from 'src/app/components/shared/states/deleted.state';
import { InactiveState } from 'src/app/components/shared/states/inactive.state';
import { SubmittedState } from 'src/app/components/shared/states/submitted.state';
import { TileState } from 'src/app/components/shared/states/tile.state';
import { LabelTile } from '../label-tile';
import { LabelProperties } from 'src/app/models/label-properties';
import { TileStateStatus } from 'src/app/models/tile-state-status';


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
  @Output() override showWarnMsg = new EventEmitter();

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
    this.initialState = new InactiveState();

    this.changeState(this.initialState);
    this.fillTileForm( this.content );  
    this.getLabels();
  }

  deleteConfirmed(event: boolean): void {
    if ( event ) {
      this.changeState( new DeletedState() );
      //TODO DELETE
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

  findSelectedLabel(): LabelProperties | undefined {
    return this.Labels.find(label => label.labelId == this.parent?.value );
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

  onSubmit(): void {
    if ( this.tryChangeStateToInactive() ) {
      return;
  }
  
  if ( !this.tryChangeStateToSubmitted() ) {
      return;
  }

 this.facade.editLabel( this.getCurrentFormValue() ).subscribe( res => {

      if ( res.result ) {
          this.state.changeStatus( TileStateStatus.SUCCESSFUL );
          this.updateContentAfterSubmitSuccess( res.labels );
          this.showWarnMessage();
      }
      else { 
          this.state.changeStatus( TileStateStatus.UNSUCCESSFUL );
          //error message
      }
  });      
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
    const activeState = new ActiveState();
  
    this.changeState( activeState );
  }

  private onCopyContent(): void {
    this.duplicateFormValues.emit( this.getCurrentFormValue() );
  } 

}
