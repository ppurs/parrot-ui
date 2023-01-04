import { TranslationTile } from "../../translation-tile/translation-tile";
import { TileStateStatus } from "../../../../models/tile-state-status";
import { ActiveStateStrategy } from "./active-state.strategy";
import { FacadeService } from "src/app/services/facade/facade.service";

export class AddStrategy implements ActiveStateStrategy {
    tile!: TranslationTile;

    constructor( private facade: FacadeService ) {}

    setTile( tile: TranslationTile ) {
        this.tile = tile;
    }

    onBtnClick(): void {
        if ( this.tile.tryChangeStateToSubmitted && !this.tile.tryChangeStateToSubmitted() ) {
            return;
        }

        this.facade.addNewTranslation( this.tile.getCurrentTranslation() ).subscribe( res => {
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