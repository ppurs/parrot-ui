export interface QuizTile {
    content: QuizTileContent,
	otherAnswers: QuizTileContent[]
}

export interface QuizTileContent {
	useInQuiz: boolean,
	wordFrom: string,
	wordTo: string,
	translationId: number,
	description: string,
	wordTypeId: number,
	wordType: string
}