import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { QuizService } from '../services/quiz/quiz.service';
import * as QuizActions from '../store/app.actions';
import { QuizType } from '../models/quizType/quizType';

@Injectable()
export class QuizEffects {
  getQuiz$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(QuizActions.quizManagementActions.getQuiz),
      mergeMap(action => {
        return this.quizService
          .getQuiz(action.difficulty || '', action.quizLength || 10, action.quizType || QuizType.boolean)
          .pipe(
            map(quizPayload => QuizActions.quizManagementActions.loadQuiz({ questions: quizPayload.results })),
            catchError(error => of(QuizActions.quizManagementActions.loadQuizFailure({ error })))
          );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private quizService: QuizService
  ) {}
}
