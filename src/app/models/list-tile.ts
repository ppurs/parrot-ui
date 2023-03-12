import { TileState } from "../components/shared/states/tile.state";
import { TileStateStatus } from "./tile-state-status";

export interface ListTile {
    state: TileState;
    
    changeState( state: TileState ): void;
    fillTileForm( content: any ): void;
    getCurrentFormValue(): any;
    getTileStateStatus(): TileStateStatus | undefined;
    removeFromList?(): void;
    updateContentAfterSubmitSuccess?( content: any ): void;
}