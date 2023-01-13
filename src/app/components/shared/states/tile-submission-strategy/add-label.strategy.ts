import { TileSubmissionStrategy } from "./tile-submission-strategy";
import { FacadeService } from "src/app/services/facade/facade.service";
import { LabelTile } from "src/app/components/labels-page/label-tile/label-tile";
import { TileStateStatus } from "src/app/models/tile-state-status";

export class AddLabelStrategy implements TileSubmissionStrategy<LabelTile> {
    tile!: LabelTile;

    constructor( private facade: FacadeService, tile: LabelTile ) {
        this.tile = tile;
    }

    setTile(tile: LabelTile): void {
        this.tile = tile;
    }

    onBtnClick(): void {
        if ( this.tile.tryChangeStateToSubmitted && !this.tile.tryChangeStateToSubmitted() ) {
            return;
        }

        this.facade.addNewLabel( this.tile.getCurrentFormValue() ).subscribe( res => {
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