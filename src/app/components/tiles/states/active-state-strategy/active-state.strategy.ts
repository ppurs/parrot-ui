import { TranslationTile } from "../../translation-tile/translation-tile";

export interface ActiveStateStrategy {
    tile: TranslationTile;
    
    setTile( tile: TranslationTile ): void;
    onBtnClick(): void;
}