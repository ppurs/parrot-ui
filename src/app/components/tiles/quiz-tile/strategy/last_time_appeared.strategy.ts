import { AnswerStatus } from "../answer-status";
import { SelectionStrategy } from "./selection.strategy";

export class LastTimeAppearedStrategy implements SelectionStrategy {
    getNewWordBtnVisibility(guess: AnswerStatus): boolean {
        return guess == AnswerStatus.CORRECT;
    }
    
}