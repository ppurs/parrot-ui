import { ListTile } from "src/app/models/list-tile";

export interface TileSubmissionStrategy<T extends ListTile> {
    tile: T;

    setTile(tile: T): void; 
    onBtnClick(): void;
}