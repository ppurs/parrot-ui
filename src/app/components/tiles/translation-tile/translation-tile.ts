import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WordType } from "src/app/models/word-type";
import { FacadeService } from "src/app/services/facade/facade.service";
import { ActiveState } from "../states/active.state";
import { TileStateStatus } from "../../../models/tile-state-status";
import { SubmittedState } from "../states/submitted.state";
import { TileState } from "../states/tile.state";
import { Translation } from "src/app/models/translation";

export class TranslationTile {
    isExpanded: boolean = false;
    Types!: WordType[];
    state!: TileState;

    translationForm: FormGroup = this.fb.group({
        term: ['', Validators.required ],
        translation: ['', Validators.required ],
        type: [ <number><unknown>undefined, Validators.required ],        
        description: ['']
      });

    constructor( protected facade: FacadeService,
                protected fb: FormBuilder ) {
    }

    get term(): AbstractControl<any, any> | null {
        return this.translationForm.get('term');
    }

    get translation(): AbstractControl<any, any> | null {
        return this.translationForm.get('translation');
    }

    get type(): AbstractControl<any, any> | null {
        return this.translationForm.get('type');
    }

    get description(): AbstractControl<any, any> | null {
        return this.translationForm.get('description');
    }

    get resetStatistics(): AbstractControl<any, any> | null {
        return null;
    }

    changeState( state: TileState ): void {
        this.state = state;
        this.checkInputsEnabled();
    }

    fillTileForm( content: Translation ): void {
        this.term?.setValue( content.wordFrom );
        this.translation?.setValue( content.wordTo );
        this.type?.setValue( content.wordTypeId );
        this.description?.setValue( content.description ?? '' );
      }

    getCurrentTranslation(): Translation {
        return {
            wordFrom: this.term?.value?.trim() ?? '',
            wordTo: this.translationForm.get('translation')?.value?.trim() ?? '',
            wordTypeId: this.translationForm.get('type')?.value ?? -1,
            description: this.translationForm.get('description')?.value?.trim() ?? ''
        };
    }

    getTileStateStatus(): TileStateStatus {
        return this.state.status;
    }

    isActive(): boolean {
        return this.state instanceof ActiveState;
    }

    isSubmitted(): boolean {
        return this.state instanceof SubmittedState;
    }

    isActionBarHidden(): boolean {
        return this.state.hiddenActionBar;
    }
    
    isBtnHidden(): boolean {
        return this.state.hiddenButton;
    }

    onSubmit(): void {
        this.state.onBtnClick()
    }

    removeFromList?(): void;

    tryChangeStateToInactive?(): boolean;
    
    tryChangeStateToSubmitted?(): boolean;

    protected checkInputsEnabled(): void {
        if ( this.state.inputsEnabled ) {
            this.translationForm.enable();
        }
        else {
            this.translationForm.disable();
        }
    }
    
    protected getTermTypes(): void {
        this.Types = this.facade.getTermTypes();
    }
    
    protected validationCheck(): boolean {
        if ( this.translationForm.invalid ){
          this.translationForm.markAllAsTouched();
    
          return false;
        }
    
        return true;
    }
}
