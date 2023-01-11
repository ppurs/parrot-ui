import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WordType } from "src/app/models/word-type";
import { FacadeService } from "src/app/services/facade/facade.service";
import { ActiveState } from "../states/active.state";
import { TileStateStatus } from "../../../models/tile-state-status";
import { SubmittedState } from "../states/submitted.state";
import { TileState } from "../states/tile.state";
import { Translation } from "src/app/models/translation";
import { ListTile } from "../../../models/list-tile";
import { LabelProperties } from "src/app/models/label-properties";
import { LabelsChange } from "src/app/models/labels-change";

export class TranslationTile implements ListTile {
    content: Translation;
    isExpanded: boolean = false;
    Labels: LabelProperties[];
    Types: WordType[];
    state!: TileState;

    translationForm: FormGroup = this.fb.group({
        term: ['', Validators.required ],
        translation: ['', Validators.required ],
        type: [ <number><unknown>undefined, Validators.required ],        
        description: [''],
        labels: [<number[]><unknown>undefined]
      });

    constructor( protected facade: FacadeService,
                protected fb: FormBuilder ) {
        this.Labels = [];
        this.Types = [];
        this.content = {
            wordFrom: '',
            wordTo: '',
            wordTypeId: -1,
            description: '',
            labels: [],
            directLabelIds: undefined
        };
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

    get labels(): AbstractControl<any, any> | null {
        return this.translationForm.get('labels')
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

        const directLabelIds = content.labels
                            ?.filter(obj => obj.inherited != undefined && !obj.inherited )
                            .flatMap( obj => obj.labelId ? [ obj.labelId ] : [] );
        
        this.labels?.setValue( directLabelIds ?? undefined );
      }

    getCurrentFormValue(): Translation {
        this.content.wordFrom = this.term?.value?.trim() ?? '';
        this.content.wordTo = this.translation?.value?.trim() ?? '';
        this.content.wordTypeId = this.type?.value ?? -1;
        this.content.description = this.description?.value?.trim() ?? '';
        this.content.directLabelIds = this.labels?.value ?? undefined;
      
        return this.content;
    }

    getLabelsChange?(): LabelsChange | null;

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

    setLabelsDetails( labels: LabelProperties[] ): void {}

    tryChangeStateToInactive?(): boolean;
    
    tryChangeStateToSubmitted?(): boolean;

    updateContentAfterSubmitSuccess( content: LabelProperties[] ): void {
        this.content.labels = content;
      }

    protected checkInputsEnabled(): void {
        if ( this.state.inputsEnabled ) {
            this.translationForm.enable();
        }
        else {
            this.translationForm.disable();
        }
    }

    protected getLabels(): void {
        this.Labels = this.facade.getLabelSelectList()
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
