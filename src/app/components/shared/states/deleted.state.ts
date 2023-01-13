import { TileStateStatus } from "src/app/models/tile-state-status";
import { FacadeService } from "src/app/services/facade/facade.service";
import { ListTile } from "../../../models/list-tile";
import { TileState } from "./tile.state";

export class DeletedState implements TileState {
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