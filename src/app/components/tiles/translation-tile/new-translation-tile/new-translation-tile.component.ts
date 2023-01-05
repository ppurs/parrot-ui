import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { TileActionBarOptions } from 'src/app/models/tile-action-bar-options';
import { Translation } from 'src/app/models/translation';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { AddStrategy } from '../../states/active-state-strategy/add.strategy';
import { ActiveState } from '../../states/active.state';
import { SubmittedState } from '../../states/submitted.state';
import { TranslationTile } from '../translation-tile';

const NEW_OPTIONS: TileActionBarOptions[] = [
  TileActionBarOptions.COPY_CONTENT
]

@Component({
  selector: 'app-new-translation-tile',
  templateUrl: './new-translation-tile.component.html',
  styleUrls: ['./new-translation-tile.component.scss']
})
export class NewTranslationTileComponent extends TranslationTile implements OnInit {
  @Output() createNewTile = new EventEmitter();
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
    const initialState = new ActiveState(this);
    initialState.setStrategy( new AddStrategy(this.facade) );

    this.changeState(initialState);
    this.getTermTypes();
  }

  ngAfterViewInit(): void {
    if ( !this.first ) {
      this.isExpanded = true;
      this.cdref.detectChanges();
    }
  }

  onActionSelect(event: string): void {
    switch ( event ) {
      case 'copyContent': {
        this.onCopyContent();
        break;
      }
    }
  }

  setFirst(): void {
    this.first = true;
  }

  override tryChangeStateToSubmitted(): boolean {
    if ( this.validationCheck() && this.term?.value != null  ) {    
      this.changeState( new SubmittedState() );
      this.cdref.detectChanges();
      this.createNewTile.emit();
     
      return true;
    }

    return false;
  }

  private onCopyContent(): void {
    this.duplicateFormValues.emit( this.getCurrentTranslation() );
  } 
}