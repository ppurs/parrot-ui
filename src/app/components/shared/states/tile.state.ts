import { TileStateStatus } from "src/app/models/tile-state-status";

export interface TileState {
    hiddenActionBar: boolean,
    inputsEnabled: boolean,
    hiddenButton: boolean,
    status?: any,

    changeStatus( status: TileStateStatus ): void;
}