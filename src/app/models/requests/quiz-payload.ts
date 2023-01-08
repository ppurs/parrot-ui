export interface QuizPayload {              
    languageFromId: number,
    languageToId: number,
    excludeTranslationIds: number[],
	count: number
}