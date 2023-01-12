import { TileStateStatus } from "../../../../models/tile-state-status";
import { TileSubmissionStrategy } from "./tile-submission-strategy";
import { FacadeService } from "src/app/services/facade/facade.service";
import { LabelTile } from "../../label-tile/label-tile";

export class EditLabelStrategy implements TileSubmissionStrategy<LabelTile> {
    tile: LabelTile;

    constructor( private facade: FacadeService, tile: LabelTile ) {
        this.tile = tile;
    }

    setTile(tile: LabelTile): void {
        this.tile = tile;
    }

    onBtnClick(): void {
        if ( this.tile.tryChangeStateToInactive && this.tile.tryChangeStateToInactive() ) {
            return;
        }
        
        if ( this.tile.tryChangeStateToSubmitted && !this.tile.tryChangeStateToSubmitted() ) {
            return;
        }

       this.facade.editLabel( this.tile.getCurrentFormValue() ).subscribe( res => {

            if ( res.result ) {
                this.tile.state.changeStatus( TileStateStatus.SUCCESSFUL );
            }
            else { 
                this.tile.state.changeStatus( TileStateStatus.UNSUCCESSFUL );
                //error message
            }
        });      
    }  
}