import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Label } from 'src/app/models/label';
import { TileActionBarOptions } from 'src/app/models/tile-action-bar-options';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { ActiveState } from 'src/app/components/shared/states/active.state';
import { SubmittedState } from 'src/app/components/shared/states/submitted.state';
import { LabelTile } from '../label-tile';
import { LabelProperties } from 'src/app/models/label-properties';
import { TileStateStatus } from 'src/app/models/tile-state-status';

const NEW_OPTIONS: TileActionBarOptions[] = [
  TileActionBarOptions.COPY_CONTENT
]

@Component({
  selector: 'app-new-label-tile',
  templateUrl: './new-label-tile.component.html',
  styleUrls: ['./new-label-tile.component.scss']
})
export class NewLabelTileComponent extends LabelTile implements OnInit {
  @Output() createNewTile = new EventEmitter<{color: string}>();
  @Output() duplicateFormValues = new EventEmitter<Label>();
  
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
    this.getLabels();
  }

  ngAfterViewInit(): void {
    if ( !this.first ) {
      this.isExpanded = true;
      this.cdref.detectChanges();
    }
  }

  findSelectedLabel(): LabelProperties | undefined {
    return this.Labels?.find(label => label.labelId == this.parent?.value );
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

  this.facade.addNewLabel( this.getCurrentFormValue() ).subscribe( res => {
      if ( res.result ) {
          this.state.changeStatus( TileStateStatus.SUCCESSFUL );
          this.updateContentAfterSubmitSuccess( res.labels );
      }
      else { 
          this.state.changeStatus( TileStateStatus.UNSUCCESSFUL );
          //error message
      }
  });      
  }

  setDefaultColor( color: string ): void {
    this.colorCode?.setValue(color);
  }

  setFirst(): void {
    this.first = true;
  }

  override tryChangeStateToSubmitted(): boolean {
    if ( this.validationCheck() ) {    
      this.changeState( new SubmittedState() );
      this.cdref.detectChanges();
      this.createNewTile.emit({color: this.colorCode?.value});
     
      return true;
    }

    return false;
  }

  private onCopyContent(): void {
    this.duplicateFormValues.emit( this.getCurrentFormValue() );
  } 
}

