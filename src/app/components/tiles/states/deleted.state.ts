import { TileStateStatus } from "src/app/models/tile-state-status";
import { FacadeService } from "src/app/services/facade/facade.service";
import { ListTile } from "../../../models/list-tile";
import { TileState } from "./tile.state";

export class DeletedState implements TileState {
    tile!: ListTile;
    hiddenActionBar: boolean;
    inputsEnabled: boolean = false;
    hiddenButton: boolean = true;
    status: TileStateStatus;

    constructor( tile: ListTile, private facade: FacadeService ) {
        this.tile = tile;
        this.hiddenActionBar = true;
        this.status = TileStateStatus.LOADING;
    }

    setTile( tile: ListTile ) {
        this.tile = tile;
    }

    changeStatus( status: TileStateStatus ): void {
        if( status == TileStateStatus.LOADING ) {
            this.hiddenActionBar = true;
        }
        else {
            this.hiddenActionBar = false;
        }
        
        this.status = status;
    }

    onBtnClick(): void {
        this.facade.deleteTranslation( this.tile.getCurrentFormValue() ).subscribe( res => {
            if ( res.result ) {
                this.changeStatus( TileStateStatus.SUCCESSFUL );
                if ( this.tile.removeFromList ) {
                    this.tile.removeFromList();
                }
            }
            else {
                this.changeStatus( TileStateStatus.SUCCESSFUL );
                if ( this.tile.tryChangeStateToInactive ) {
                    this.tile.tryChangeStateToInactive();
                }
                //error message
            }
        });
    };

    setStrategy(strategy: any): void {
        console.log('Cannot set strategy on \'delete\' state.');
    }
}