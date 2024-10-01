import { emptyProps, createActionGroup, props } from '@ngrx/store';
import { Question } from '../models/question/question';
import { HttpErrorResponse } from '@angular/common/http';
import { QuizType } from '../models/quizType/quizType';

export const quizManagementActions = createActionGroup({
  source: 'Quiz',
  events: {
    'Get Quiz': props<{
      difficulty: string | null | undefined;
      quizLength: number | null | undefined;
      quizType: QuizType | null | undefined;
    }>(),
    'Load Quiz': props<{ questions: Question[] }>(),
    'Load Quiz Failure': props<{ error: HttpErrorResponse }>(),
    'Next Question': props<{ answer: string }>(),
    'Reset Quiz': emptyProps(),
  },
});
