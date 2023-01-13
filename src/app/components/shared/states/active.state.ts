import { TileStateStatus } from "../../../models/tile-state-status";
import { TileState } from "./tile.state";

export class ActiveState implements TileState {
    hiddenActionBar: boolean = true;
    inputsEnabled: boolean = true;
    hiddenButton: boolean = false;

    changeStatus( status: TileStateStatus ): void {
        console.log('Cannot change status on \'active\' state.' );
    }
}
