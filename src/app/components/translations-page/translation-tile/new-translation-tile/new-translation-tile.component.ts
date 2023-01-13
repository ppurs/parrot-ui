import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { LabelProperties } from 'src/app/models/label-properties';
import { TileActionBarOptions } from 'src/app/models/tile-action-bar-options';
import { Translation } from 'src/app/models/translation';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { ActiveState } from 'src/app/components/shared/states/active.state';
import { SubmittedState } from 'src/app/components/shared/states/submitted.state';
import { TranslationTile } from '../translation-tile';
import { TileStateStatus } from 'src/app/models/tile-state-status';

const NEW_OPTIONS: TileActionBarOptions[] = [
  TileActionBarOptions.COPY_CONTENT
]

@Component({
  selector: 'app-new-translation-tile',
  templateUrl: './new-translation-tile.component.html',
  styleUrls: ['./new-translation-tile.component.scss']
})
export class NewTranslationTileComponent extends TranslationTile implements OnInit {
  @Output() createNewTile = new EventEmitter<{labels?: number[]}>();
  @Output() duplicateFormValues = new EventEmitter<Translation>();

  
  first: boolean;
  tileOptions: TileActionBarOptions[];

  constructor(  facade: FacadeService,
                private cdref: ChangeDetectorRef ) { 
    super( facade, new FormBuilder );

    this.first = false;
    this.tileOptions = NEW_OPTIONS;
  }

  ngOnInit(): void {
    const initialState = new ActiveState();

    this.changeState(initialState);
    this.getWordTypes();
    this.getLabels();
  }

  ngAfterViewInit(): void {
    if ( !this.first ) {
      this.isExpanded = true;
      this.cdref.detectChanges();
    }
  }

  findSelectedLabels(): LabelProperties[] | undefined {
    return this.Labels.filter(value => this.labels?.value?.includes(value.labelId));;
  }

  onActionSelect(event: string): void {
    switch ( event ) {
      case 'copyContent': {
        this.onCopyContent();
        break;
      }
    }
  }

  onSubmit(): void {
    if ( !this.tryChangeStateToSubmitted() ) {
      return;
  }

  const formContent = this.getCurrentFormValue();

  this.facade.addNewTranslation( formContent ).subscribe( res => {
      if ( res.result ) {
          if( formContent.directLabelIds && formContent.directLabelIds.length > 0 ) {
              this.setLabels( res.insertedId, formContent.directLabelIds );
          }
          else {
              this.state.changeStatus( TileStateStatus.SUCCESSFUL );
          }
      }
      else { 
          this.state.changeStatus( TileStateStatus.UNSUCCESSFUL );
          //error message
      }
  });     
  }

  setDefaultLabels( labelIds?: number[]): void {
    this.labels?.setValue( labelIds );
  }

  setFirst(): void {
    this.first = true;
  }

  override tryChangeStateToSubmitted(): boolean {
    if ( this.validationCheck() && this.term?.value != null  ) {    
      this.changeState( new SubmittedState() );
      this.cdref.detectChanges();
      this.createNewTile.emit({labels: this.labels?.value});
     
      return true;
    }

    return false;
  }

  private onCopyContent(): void {
    this.duplicateFormValues.emit( this.getCurrentFormValue() );
  } 

  private setLabels( translationId: number, labelIds: number[]): void {
    this.facade.editTranslationLabelList( translationId, labelIds, undefined ).subscribe( res => {
        if ( res.result ) {
            if ( this.updateContentAfterSubmitSuccess ) {
                this.updateContentAfterSubmitSuccess( res.labels );
            }
            
            this.state.changeStatus( TileStateStatus.SUCCESSFUL );
        }
        else { 
            this.state.changeStatus( TileStateStatus.UNSUCCESSFUL );
            //error message
        }
    })
  }
}
