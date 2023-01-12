import { AnswerStatus } from "../answer-status";
import { SelectionStrategy } from "./selection.strategy";

export class DefaultStrategy implements SelectionStrategy {
    getNewWordBtnVisibility(guess: AnswerStatus): boolean {
        return true;
    }
}