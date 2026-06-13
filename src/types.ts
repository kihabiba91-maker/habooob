export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
}

export type QuizStatus = 'WELCOME' | 'PLAYING' | 'RESULT';
