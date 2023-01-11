import { QuizFilter } from "../quiz-filter";

export interface QuizPayload extends QuizFilter {              
    languageFromId: number,
    languageToId: number,
    excludeTranslationIds: number[],
	count: number
}