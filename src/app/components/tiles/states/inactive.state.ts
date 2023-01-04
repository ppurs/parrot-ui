import { TranslationTile } from "../translation-tile/translation-tile";
import { TileState } from "./tile.state";

export class InactiveState implements TileState {
    tile!: TranslationTile;
    hiddenActionBar: boolean = false;
    inputsEnabled: boolean = false;
    hiddenButton: boolean = true;

    constructor( tile: TranslationTile ) {
        this.tile = tile;
    }

    setTile( tile: TranslationTile ) {
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