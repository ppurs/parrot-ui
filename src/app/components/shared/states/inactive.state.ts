import { ListTile } from "../../../models/list-tile";
import { TileState } from "./tile.state";

export class InactiveState implements TileState {
    tile!: ListTile;
    hiddenActionBar: boolean = false;
    inputsEnabled: boolean = false;
    hiddenButton: boolean = true;

    constructor( tile: ListTile ) {
        this.tile = tile;
    }

    setTile( tile: ListTile ) {
        this.tile = tile;
    }

    changeStatus( status: any ): void {
        console.log('Cannot change status on \'inactive\' state.' );
    }

    onBtnClick(): void {
        console.log('Cannot submit data on \'inactive\' state.');
    };

    setStrategy(strategy: any): void {
        console.log('Cannot set strategy on \'inactive\' state.');
    }
}