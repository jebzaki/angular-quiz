import { Question } from '../question/question';

export interface QuizAPIPayload {
  response_code: number;
  results: Question[];
}
