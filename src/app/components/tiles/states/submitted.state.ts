import { TranslationTile } from "../translation-tile/translation-tile";
import { TileStateStatus } from "../../../models/tile-state-status";
import { TileState } from "./tile.state";
import { ListTile } from "../../../models/list-tile";

export class SubmittedState implements TileState {
    tile!: ListTile;
    hiddenActionBar: boolean;
    inputsEnabled: boolean = false;
    hiddenButton: boolean = true;
    status: TileStateStatus;

    constructor() {
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
        console.log('Cannot submit data on \'submitted\' state.');
    };

    setStrategy(strategy: any): void {
        console.log('Cannot set strategy on \'submitted\' state.');
    }
}