import { createReducer, on } from '@ngrx/store';
import * as QuizActions from './app.actions';
import { QuizState } from '../models/quizState/quizState';
import { decode } from 'html-entities';

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
      questions: questions.map(question => {
        return {
          ...question,
          question: decode(question.question),
          category: decode(question.category),
          correct_answer: decode(question.correct_answer),
          incorrect_answers: question.incorrect_answers.map((ans: string) => decode(ans)),
        };
      }),
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
