import { Answer } from "./Answer";

export interface Question {
    questionId?: number;
    questionText: string;
    type?: string;
    quizzId?: number;
    answers: Answer[];
  }