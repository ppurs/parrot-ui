import { TileStateStatus } from "../../../models/tile-state-status";
import { TileState } from "./tile.state";
import { ListTile } from "../../../models/list-tile";

export class SubmittedState implements TileState {
    hiddenActionBar: boolean;
    inputsEnabled: boolean = false;
    hiddenButton: boolean = true;
    status: TileStateStatus;

    constructor() {
        this.hiddenActionBar = true;
        this.status = TileStateStatus.LOADING;
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

}