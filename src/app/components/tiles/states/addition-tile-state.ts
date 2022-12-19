import { NewTranslationTileComponent } from "../new-translation-tile/new-translation-tile.component";
import { TermAdditionStatus } from "./term-addition-status";

export interface AdditionTileState {
    tile: NewTranslationTileComponent,
    tileHeader: string,
    processStatus: TermAdditionStatus,

    changeStatus(status: TermAdditionStatus): void;
    onBtnClick(): void
}