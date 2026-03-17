export type QuestionType = 'multiple-choice' | 'fill-in-blank' | 'drag-drop' | 'graph-interactive';

export interface MultipleChoiceQuestion {
  type: 'multiple-choice';
  id: string;
  prompt: string;
  options: string[];          // always 4 options
  correctIndex: number;       // 0-3
  explanation: string;
}

export interface FillInBlankQuestion {
  type: 'fill-in-blank';
  id: string;
  prompt: string;
  correctAnswer: number;      // numeric answer
  tolerance: number;          // acceptable ± delta (default 0.001)
  unit?: string;              // optional unit label shown next to input
  explanation: string;
}

export interface DragDropQuestion {
  type: 'drag-drop';
  id: string;
  prompt: string;
  /** The chips the user drags, in their initial shuffled order */
  chips: string[];
  /** The correct ordered arrangement of chip values */
  correctOrder: string[];
  explanation: string;
}

export interface GraphInteractiveQuestion {
  type: 'graph-interactive';
  id: string;
  prompt: string;
  /** What the user needs to identify or place */
  task: 'place-point' | 'identify-value';
  correctX: number;
  correctY: number;
  tolerance: number;
  explanation: string;
}

export type Question =
  | MultipleChoiceQuestion
  | FillInBlankQuestion
  | DragDropQuestion
  | GraphInteractiveQuestion;

export type LevelTier = 1 | 2 | 3 | 4;

export interface Level {
  id: string;           // e.g. 'algebra-t1-l1'
  topicSlug: string;
  tier: LevelTier;
  tierIndex: number;    // 1-5 within tier
  title: string;
  description: string;
  /** Generates the 10 questions for this level */
  generateQuestions: () => Question[];
}

export type GameState = 'idle' | 'countdown' | 'question' | 'feedback' | 'results';

export interface AnswerRecord {
  questionId: string;
  correct: boolean;
  timeTakenMs: number;
}

export interface GameSession {
  levelId: string;
  topicSlug: string;
  questions: Question[];
  answers: AnswerRecord[];
  startedAt: number;
  finishedAt?: number;
}
