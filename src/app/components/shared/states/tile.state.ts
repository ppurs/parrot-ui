import { ListTile } from "src/app/models/list-tile";
import { TileStateStatus } from "src/app/models/tile-state-status";

export interface TileState {
    hiddenActionBar: boolean,
    inputsEnabled: boolean,
    hiddenButton: boolean,
    status?: TileStateStatus,

    changeStatus( status: TileStateStatus ): void;
}