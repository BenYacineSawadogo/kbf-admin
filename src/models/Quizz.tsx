import { Question } from "./Question";

export interface Quizz {
    quizzId?: number;
    titre: string;
    questions: Question[];
  }