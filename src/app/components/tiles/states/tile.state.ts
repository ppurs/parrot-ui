import { ListTile } from "../../../models/list-tile";

export interface TileState {
    tile: ListTile,
    hiddenActionBar: boolean,
    inputsEnabled: boolean,
    hiddenButton: boolean,
    status?: any,
    strategy?: any,

    setTile( tile: ListTile ): void;
    changeStatus( status: any ): void;
    onBtnClick(): void;
    setStrategy( strategy: any ): void;
}