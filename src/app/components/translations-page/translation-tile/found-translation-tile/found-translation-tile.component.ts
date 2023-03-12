import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LabelsChange } from 'src/app/models/labels-change';
import { TileActionBarOptions } from 'src/app/models/tile-action-bar-options';
import { Translation } from 'src/app/models/translation';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { ActiveState } from 'src/app/components/shared/states/active.state';
import { DeletedState } from 'src/app/components/shared/states/deleted.state';
import { InactiveState } from 'src/app/components/shared/states/inactive.state';
import { SubmittedState } from 'src/app/components/shared/states/submitted.state';
import { TileState } from 'src/app/components/shared/states/tile.state';
import { TranslationTile } from '../translation-tile';
import { LabelProperties } from 'src/app/models/label-properties';
import { TileStateStatus } from 'src/app/models/tile-state-status';


const FOUND_OPTIONS: TileActionBarOptions[] = [
  TileActionBarOptions.DELETE,
  TileActionBarOptions.EDIT,
  TileActionBarOptions.COPY_CONTENT
]


@Component({
  selector: 'app-found-translation-tile',
  templateUrl: './found-translation-tile.component.html',
  styleUrls: ['./found-translation-tile.component.scss']
})
export class FoundTranslationTileComponent extends TranslationTile implements OnInit {
  @Input() override content!: Translation;
  @Output() removeEvent = new EventEmitter<Translation>();
  @Output() duplicateFormValues = new EventEmitter<Translation>();

  tileOptions: TileActionBarOptions[];
  formSubscription?: Subscription;
  translationChanged: boolean;
  showDeleteMessage: boolean;

  private initialState!: TileState;

  constructor( facade: FacadeService,
               private cdref: ChangeDetectorRef ) { 
    super( facade, new FormBuilder );

    this.translationForm.addControl('resetStatistics', this.fb.control<boolean>(false));

    this.tileOptions = FOUND_OPTIONS;
    this.translationChanged = false;
    this.showDeleteMessage = false;
  }

  override get resetStatistics() {
    return this.translationForm.get('resetStatistics');
  }

  ngOnInit(): void {
    this.initialState = new InactiveState();

    this.changeState(this.initialState);
    this.getWordTypes();   
    this.getLabels();
    this.fillTileForm( this.content );  
  }

  deleteConfirmed(event: boolean): void {
    if ( event ) {
      this.changeState( new DeletedState() );

      this.facade.deleteTranslation( this.getCurrentFormValue() ).subscribe( res => {
        if ( res.result ) {
            this.state.changeStatus( TileStateStatus.SUCCESSFUL );
            if ( this.removeFromList ) {
                this.removeFromList();
            }
        }
        else {
            this.state.changeStatus( TileStateStatus.SUCCESSFUL );
                this.tryChangeStateToInactive();
            //error message
        }
    });
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

  findSelectedLabels(): LabelProperties[] | undefined {
    return this.Labels?.filter(value => this.labels?.value?.includes(value.labelId));
  }

  override getLabelsChange(): LabelsChange | null {
    const oldLabelIds: number[] = this.content.labels?.flatMap( label => label.labelId && !label.inherited ?  [label.labelId ] : []) ?? [];
    const newLabelIds: number[] = this.labels?.value ?? []; 

    var result: LabelsChange | null = {
      addIds: newLabelIds.filter( (id: number) => id && !oldLabelIds.includes(id) ),
      deleteIds: oldLabelIds.filter( id  => id != undefined ? !newLabelIds.includes(id) : false )
    };

    if( result.addIds?.length == 0 && result.deleteIds?.length == 0 ) {
      result = null;
    }

    return result;
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

    const resetStats: boolean = this.resetStatistics?.value;
    
    if (!this.tryChangeStateToSubmitted() ) {
        return;
    }

    const currentValue = this.getCurrentFormValue();
    const labelsChange: LabelsChange | null = this.getLabelsChange();

    this.facade.editTranslation( currentValue, resetStats ).subscribe( res => {

          if ( !res.result ) {
              this.state.changeStatus( TileStateStatus.UNSUCCESSFUL );
              //error message
          } else if ( res.result && !labelsChange ) {
              this.state.changeStatus( TileStateStatus.SUCCESSFUL );
          }

      });  
      
      if( labelsChange && currentValue.translationId ) {
          this.facade.editTranslationLabelList( currentValue.translationId, labelsChange.addIds, labelsChange.deleteIds ).subscribe(
              res => {
                  if( res.result  && this.state.status != TileStateStatus.UNSUCCESSFUL ) {
                          
                      this.updateContentAfterSubmitSuccess( res.labels );
                      this.state.changeStatus( TileStateStatus.SUCCESSFUL );
                  }
                  else {
                      this.state.changeStatus( TileStateStatus.UNSUCCESSFUL );
                  }
              }
          );
      }
  }

  override removeFromList(): void {
    this.removeEvent.emit(this.content);
  }

  tryChangeStateToInactive(): boolean {
    if ( !this.checkFormValuesChange() ) {
      this.showDeleteMessage = false;
      this.changeState( this.initialState );

      return true;
    }
    else {
      return false;
    }
  }

  tryChangeStateToSubmitted(): boolean {   
     if ( this.validationCheck() && this.term?.value != null  ) {    
       this.changeState( new SubmittedState() );
       this.isExpanded = false;
       this.resetStatistics?.setValue(false);
       this.cdref.detectChanges();
  
       return true;
    }

    return false;
  }

  private checkFormValuesChange(): boolean {
    return this.checkTranslationDetailsValueChange() || this.getLabelsChange() != null;
  }

  private checkTranslationDetailsValueChange(): boolean {
    if( this.term?.value != this.content.wordFrom ||
      this.translation?.value != this.content.wordTo || 
      this.type?.value != this.content.wordTypeId ||
      this.description?.value != ( this.content.description ?? '' ) ||
      this.resetStatistics?.value ) {

    return true;
  }
  
  return false; 
  }

  private onDelete() {
    this.showDeleteMessage = true;
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
