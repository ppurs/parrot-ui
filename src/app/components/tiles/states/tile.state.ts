import { TranslationTile } from "../translation-tile/translation-tile";

export interface TileState  {
    tile: TranslationTile,
    hiddenActionBar: boolean,
    inputsEnabled: boolean,
    hiddenButton: boolean,
    status?: any,
    strategy?: any,

    setTile( tile: TranslationTile ): void;
    changeStatus( status: any ): void;
    onBtnClick(): void;
    setStrategy( strategy: any ): void;
}