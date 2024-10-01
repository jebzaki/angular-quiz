import { QuizType } from '../quizType/quizType';

export class Question {
  category: string = '';
  type: QuizType = QuizType.boolean;
  difficulty: string = '';
  question: string = '';
  correct_answer: string = '';
  incorrect_answers: string[] = [];
}
