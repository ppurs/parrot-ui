import { TileStateStatus } from "../../../../models/tile-state-status";
import { TileSubmissionStrategy } from "./tile-submission-strategy";
import { FacadeService } from "src/app/services/facade/facade.service";
import { TranslationTile } from "../../translation-tile/translation-tile";

export class AddTranslationStrategy implements TileSubmissionStrategy<TranslationTile> {
    tile: TranslationTile;

    constructor( private facade: FacadeService, tile: TranslationTile ) {
        this.tile = tile;
    }

    setTile( tile: TranslationTile): void {
        this.tile = tile;
    }

    onBtnClick(): void {
        if ( this.tile.tryChangeStateToSubmitted && !this.tile.tryChangeStateToSubmitted() ) {
            return;
        }

        const formContent = this.tile.getCurrentFormValue();

        this.facade.addNewTranslation( formContent ).subscribe( res => {
            if ( res.result ) {
                if( formContent.directLabelIds && formContent.directLabelIds.length > 0 ) {
                    this.setLabels( res.insertedId, formContent.directLabelIds );
                }
                else {
                    this.tile.state.changeStatus( TileStateStatus.SUCCESSFUL );
                }
            }
            else { 
                this.tile.state.changeStatus( TileStateStatus.UNSUCCESSFUL );
                //error message
            }
        });      
    }
    
    private setLabels( translationId: number, labelIds: number[]): void {
        this.facade.editTranslationLabelList( translationId, labelIds, undefined ).subscribe( res => {
            if ( res.result ) {
                if ( this.tile.updateContentAfterSubmitSuccess ) {
                    this.tile.updateContentAfterSubmitSuccess( res.labels );
                }
                
                this.tile.state.changeStatus( TileStateStatus.SUCCESSFUL );
            }
            else { 
                this.tile.state.changeStatus( TileStateStatus.UNSUCCESSFUL );
                //error message
            }
        }

        )
    }
}