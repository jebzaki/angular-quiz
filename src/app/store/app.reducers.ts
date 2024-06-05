import { createReducer, on } from '@ngrx/store';
import * as QuizActions from './app.actions';
import { QuizState } from '../models/quizState/quizState';

export const initialState: QuizState = {
  questions: [],
  currentQuestion: 0,
  userAnswers: [],
  quizFinished: false,
  apiError: null,
};

export const quizReducer = createReducer(
  initialState,
  on(QuizActions.quizManagementActions.loadQuiz, (state, { questions }): QuizState => {
    return {
      ...initialState,
      questions: questions,
    };
  }),
  on(QuizActions.quizManagementActions.loadQuizFailure, (state, { error }): QuizState => {
    return {
      ...state,
      apiError: error,
    };
  }),
  on(QuizActions.quizManagementActions.nextQuestion, (state, { answer }): QuizState => {
    const answers = [...state.userAnswers];
    answers.push(answer);

    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
      userAnswers: answers,
    };
  }),
  on(QuizActions.quizManagementActions.resetQuiz, (): QuizState => {
    return initialState;
  })
);
