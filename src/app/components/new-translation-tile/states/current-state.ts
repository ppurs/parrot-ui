import { NewTranslationTileComponent } from "../new-translation-tile.component";
import { AdditionTileState } from "./addition-tile-state";
import { TermAdditionStatus } from "./term-addition-status";
   
export class CurrentState implements AdditionTileState {
    tile: NewTranslationTileComponent;
    tileHeader: string;
    processStatus: TermAdditionStatus;

    constructor( tile: NewTranslationTileComponent ) {
        this.tile = tile;
        this.tileHeader = "translation-addition-tile.default-header";
        this.processStatus = TermAdditionStatus.CURRENT;
    }

    changeStatus(status: TermAdditionStatus): void {
        console.log("You cannot change status on not submitted tile.");
    }

    onBtnClick(): void {
        var isSuccess: boolean = false;
        
        if ( this.tile.tryChangeStateToSubmitted() ) {
            isSuccess = this.tile.tryAddNewTerm();
                
            this.tile.state.changeStatus( isSuccess ? TermAdditionStatus.SUCCESSFULL : TermAdditionStatus.UNSUCCESSFULL);
            //add new tile
        }
    }

}