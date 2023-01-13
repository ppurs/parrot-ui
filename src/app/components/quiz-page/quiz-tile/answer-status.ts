import { TileStateStatus } from "src/app/models/tile-state-status";

export class AnswerStatus {
    static readonly CORRECT = new AnswerStatus( 'correct', 
                                                'quiz-tile.message.correct', 
                                                TileStateStatus.SUCCESSFUL 
                                                );
    static readonly INCORRECT = new AnswerStatus( 'incorrect', 
                                                'quiz-tile.message.incorrect', 
                                                TileStateStatus.UNSUCCESSFUL 
                                                );
    static readonly NONE = new AnswerStatus( 'none',
                                             '',
                                             TileStateStatus.LOADING
                                            );
    static readonly PARTLY_CORRECT = new AnswerStatus( 'partly_correct', 
                                                'quiz-tile.message.partly-correct', 
                                                TileStateStatus.UNSUCCESSFUL 
                                                );
  
    private constructor(public readonly key: string, 
                        public readonly header: string, 
                        public readonly tileStatus: TileStateStatus ) {}
  }