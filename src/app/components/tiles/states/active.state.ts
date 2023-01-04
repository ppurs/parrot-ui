import { TranslationTile } from "../translation-tile/translation-tile";
import { ActiveStateStrategy } from "./active-state-strategy/active-state.strategy";
import { TileStateStatus } from "../../../models/tile-state-status";
import { SubmittedState } from "./submitted.state";
import { TileState } from "./tile.state";
import { FacadeService } from "src/app/services/facade/facade.service";

export class ActiveState implements TileState {
    tile!: TranslationTile;
    hiddenActionBar: boolean = true;
    inputsEnabled: boolean = true;
    hiddenButton: boolean = false;
    strategy!: ActiveStateStrategy;

    constructor( tile: TranslationTile ) {
        this.tile = tile;
    }

    setTile( tile: TranslationTile ) {
        this.tile = tile;
    }

    changeStatus( status: TileStateStatus ): void {
        console.log('Cannot change status on \'active\' state.' );
    }

    onBtnClick(): void {
        this.strategy.onBtnClick();
    }

    setStrategy(strategy: ActiveStateStrategy): void {
        this.strategy = strategy;
        this.strategy.setTile( this.tile );
    }
}
