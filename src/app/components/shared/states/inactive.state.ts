import { TileState } from "./tile.state";

export class InactiveState implements TileState {
    hiddenActionBar: boolean = false;
    inputsEnabled: boolean = false;
    hiddenButton: boolean = true;

    changeStatus( status: any ): void {
        console.log('Cannot change status on \'inactive\' state.' );
    }
}