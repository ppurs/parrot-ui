import { TileSubmissionStrategy } from "./tile-submission-strategy/tile-submission-strategy";
import { TileStateStatus } from "../../../models/tile-state-status";
import { TileState } from "./tile.state";
import { ListTile } from "src/app/models/list-tile";

export class ActiveState implements TileState {
    tile!: ListTile;
    hiddenActionBar: boolean = true;
    inputsEnabled: boolean = true;
    hiddenButton: boolean = false;
    strategy!: TileSubmissionStrategy<ListTile>;

    constructor( tile: ListTile ) {
        this.tile = tile;
    }

    setTile( tile: ListTile ) {
        this.tile = tile;
    }

    changeStatus( status: TileStateStatus ): void {
        console.log('Cannot change status on \'active\' state.' );
    }

    onBtnClick(): void {
        this.strategy.onBtnClick();
    }

    setStrategy(strategy: TileSubmissionStrategy<ListTile>): void {
        this.strategy = strategy;
    }
}
