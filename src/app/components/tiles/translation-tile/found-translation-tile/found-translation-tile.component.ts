import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TileActionBarOptions } from 'src/app/models/tile-action-bar-options';
import { Translation } from 'src/app/models/translation';
import { FacadeService } from 'src/app/services/facade/facade.service';
import { EditStrategy } from '../../states/active-state-strategy/edit.strategy';
import { ActiveState } from '../../states/active.state';
import { DeletedState } from '../../states/deleted.state';
import { InactiveState } from '../../states/inactive.state';
import { SubmittedState } from '../../states/submitted.state';
import { TileState } from '../../states/tile.state';
import { TranslationTile } from '../translation-tile';


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
  @Input() content!: Translation;
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
    this.initialState = new InactiveState(this);

    this.changeState(this.initialState);
    this.getTermTypes();   
    this.fillTileForm( this.content );  
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

  override getCurrentTranslation(): Translation {
      this.content.wordFrom = this.term?.value ?? '';
      this.content.wordTo = this.translation?.value ?? '';
      this.content.wordTypeId = this.type?.value ?? -1;
      this.content.description = this.description?.value ?? '';

      return this.content;
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
    console.log( this.resetStatistics?.value );

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
    const activeState = new ActiveState(this);
    activeState.setStrategy(new EditStrategy(this.facade) );

    this.changeState( activeState );
  }

  private onCopyContent(): void {
    this.duplicateFormValues.emit( this.getCurrentTranslation() );
  } 

}
