import { createSelector, createFeatureSelector } from '@ngrx/store';
import { QuizState } from '../models/quizState/quizState';
import { Question } from '../models/question/question';

export const selectFeatureQuiz = createFeatureSelector<QuizState>('quiz');

export const selectQuizAPIError = createSelector(selectFeatureQuiz, (state: QuizState) => state.apiError);

export const selectCurrentQuestion = createSelector(
  selectFeatureQuiz,
  (state: QuizState) => state.questions[state.currentQuestion] || new Question()
);

export const selectAllQuestions = createSelector(selectFeatureQuiz, (state: QuizState) => state.questions);

export const selectCurrentQuestionNumber = createSelector(
  selectFeatureQuiz,
  (state: QuizState) => state.currentQuestion
);

export const selectUserAnswers = createSelector(selectFeatureQuiz, (state: QuizState) => state.userAnswers);

export const selectIsQuizFinished = createSelector(selectFeatureQuiz, (state: QuizState) => {
  return state.currentQuestion >= state.questions.length;
});

export const selectResults = createSelector(selectFeatureQuiz, (state: QuizState) => {
  const results: boolean[] = [];

  state.questions.map((q, i) => {
    results.push(q.correct_answer.toLocaleLowerCase() === state.userAnswers[i].toLocaleLowerCase());
  });
  return results;
});
