import { AnswerStatus } from "../answer-status";

export interface SelectionStrategy {
    getNewWordBtnVisibility( guess: AnswerStatus ): boolean;
}