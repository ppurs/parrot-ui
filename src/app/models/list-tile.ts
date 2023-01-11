import { TileState } from "../components/tiles/states/tile.state";

export interface ListTile {
    state: TileState;
    
    changeState( state: TileState ): void;
    getCurrentFormValue(): any;
    removeFromList?(): void;
    tryChangeStateToInactive?(): boolean;
    tryChangeStateToSubmitted?(): boolean;
    updateContentAfterSubmitSuccess?( content: any): void;
}