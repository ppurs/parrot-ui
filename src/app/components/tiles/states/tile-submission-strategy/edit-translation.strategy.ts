import { TileStateStatus } from "../../../../models/tile-state-status";
import { TileSubmissionStrategy } from "./tile-submission-strategy";
import { FacadeService } from "src/app/services/facade/facade.service";
import { LabelsChange } from "src/app/models/labels-change";
import { TranslationTile } from "../../translation-tile/translation-tile";

export class EditTranslationStrategy implements TileSubmissionStrategy<TranslationTile> {
    tile!: TranslationTile;

    constructor( private facade: FacadeService, tile: TranslationTile ) {
        this.tile = tile;
    }

    setTile(tile: TranslationTile): void {
        this.tile = tile;
    }

    onBtnClick(): void {
        if ( this.tile.tryChangeStateToInactive && this.tile.tryChangeStateToInactive() ) {
            return;
        }

        const resetStats: boolean = this.tile.resetStatistics?.value;
        
        if ( this.tile.tryChangeStateToSubmitted && !this.tile.tryChangeStateToSubmitted() ) {
            return;
        }

        const currentValue = this.tile.getCurrentFormValue();
        const labelsChange: LabelsChange | null = this.tile.getLabelsChange ? this.tile.getLabelsChange() : null ;

       this.facade.editTranslation( currentValue, resetStats ).subscribe( res => {

            if ( res.result && labelsChange ) {
                this.tile.state.changeStatus( TileStateStatus.SUCCESSFUL );
                //error message
            } else if ( res.result ) {
                this.tile.state.changeStatus( TileStateStatus.UNSUCCESSFUL );
            }

        });  
        
        if( labelsChange && currentValue.translationId ) {
             this.facade.editTranslationLabelList( currentValue.translationId, labelsChange.addIds, labelsChange.deleteIds ).subscribe(
                res => {
                    if( res.result && this.tile.updateContentAfterSubmitSuccess && 
                        this.tile.state.status == TileStateStatus.SUCCESSFUL ) {
                            
                        this.tile.updateContentAfterSubmitSuccess( res.labels );
                        this.tile.state.changeStatus( TileStateStatus.SUCCESSFUL );
                    }
                    else {
                        this.tile.state.changeStatus( TileStateStatus.UNSUCCESSFUL );
                    }
                }
             );
        }
    }  
}