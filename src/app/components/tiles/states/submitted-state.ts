import { AdditionTileState } from "./addition-tile-state";
import { NewTranslationTileComponent } from "../new-translation-tile/new-translation-tile.component";
import { TermAdditionStatus } from "./term-addition-status";

export class SubmittedState implements AdditionTileState {
    tile: NewTranslationTileComponent;
    tileHeader: string;
    processStatus: TermAdditionStatus;

    constructor(tile: NewTranslationTileComponent, header: string ) {
        this.tile = tile;
        this.tileHeader = header,
        this.processStatus = TermAdditionStatus.LOADING;
    }

    changeStatus(status: TermAdditionStatus): void {
        this.processStatus = status;
    }

    onBtnClick(): void {
        this.tile.duplicateFormContent();
    }

}