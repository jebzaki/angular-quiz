import { HttpErrorResponse } from '@angular/common/http';
import { Question } from '../question/question';

export interface QuizState {
  questions: Question[];
  currentQuestion: number;
  userAnswers: string[];
  quizFinished: boolean;
  apiError: HttpErrorResponse | null;
}
