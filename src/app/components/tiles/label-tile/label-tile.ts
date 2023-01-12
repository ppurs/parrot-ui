import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FacadeService } from "src/app/services/facade/facade.service";
import { ActiveState } from "../states/active.state";
import { TileStateStatus } from "../../../models/tile-state-status";
import { SubmittedState } from "../states/submitted.state";
import { TileState } from "../states/tile.state";
import { ListTile } from "src/app/models/list-tile";
import { Label } from "src/app/models/label";
import { LabelProperties } from "src/app/models/label-properties";
import { EventEmitter } from "@angular/core";

const DEFAULT_COLOR: string = '#33691E';

export class LabelTile implements ListTile {
    content: Label;
    Labels: LabelProperties[];
    isExpanded: boolean = false;
    state!: TileState;
    showWarnMsg = new EventEmitter();

    labelForm: FormGroup = this.fb.group({
       name:['', [Validators.required]],
       colorCode: [ DEFAULT_COLOR,[Validators.required]],
       parent:[<number><unknown>undefined],

      });

    constructor( protected facade: FacadeService,
                protected fb: FormBuilder ) {
        this.Labels = [];
        this.content = {
            labelName: '',
            colorCode: '',
            parentLabels: []
        }
    }

    get name() {
        return this.labelForm.get('name');
    }

    get colorCode() {
        return this.labelForm.get('colorCode');
    }

    get parent() {
        return this.labelForm.get('parent');
    }

    changeState( state: TileState ): void {
        this.state = state;
        this.checkInputsEnabled();
    }

    fillTileForm( content: Label ): void {
        this.name?.setValue( content.labelName );
        this.colorCode?.setValue( content.colorCode.includes('#') ? content.colorCode : '#'.concat(content.colorCode) );

        let parentLabel = undefined;
        if( content.parentLabels ) {
            parentLabel = content.parentLabels.at( content.parentLabels.length - 1 )?.labelId ?? content.directParentLabelId;
        }

        this.parent?.setValue( parentLabel );
    }

    getCurrentFormValue(): Label {
        this.content.labelName = this.name?.value?.trim() ?? '';
        this.content.colorCode = this.colorCode?.value;
        this.content.directParentLabelId = this.parent?.value ?? undefined;
      
        return this.content;
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
    
    showWarnMessage(): void {
        this.showWarnMsg.emit();
    }
    

    tryChangeStateToInactive?(): boolean;
    
    tryChangeStateToSubmitted?(): boolean;

    protected checkInputsEnabled(): void {
        if ( this.state.inputsEnabled ) {
            this.labelForm.enable();
        }
        else {
            this.labelForm.disable();
        }
    }

    protected getLabels(): void {
        this.Labels = this.facade.getLabelSelectList()
    }

    protected validationCheck(): boolean {
        if ( this.labelForm.invalid ){
          this.labelForm.markAllAsTouched();
    
          return false;
        }
    
        return true;
    }
}