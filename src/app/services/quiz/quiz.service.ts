import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Question } from '../../interfaces/question/question';
import { Observable } from 'rxjs/internal/Observable';
import { Quiz } from '../../interfaces/quiz/quiz';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private questions: Question[] = [];
  private currentQuestion: number = 0;
  private userAnswers: boolean[] = [];
  private quizFinishedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  quizFinished$ = this.quizFinishedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getQuiz(difficulty: string = 'hard', quizLength: number = 10, type: string = 'boolean'): Observable<Quiz> {
    return this.http.get<Quiz>(
      `https://opentdb.com/api.php?amount=${quizLength}&difficulty=${difficulty}&type=${type}`
    );
  }

  loadQuiz(questions: Question[]) {
    this.questions = questions;
    this.currentQuestion = 0;
    this.userAnswers = [];
    this.quizFinishedSubject.next(false);
  }

  nextQuestion(answer: boolean) {
    this.userAnswers.push(answer);
    this.currentQuestion++;

    this.quizFinishedSubject.next(this.currentQuestion >= this.questions.length);
  }

  getQuestion(): Question | null {
    return this.questions[this.currentQuestion];
  }

  getAllQuestions(): Question[] {
    return this.questions;
  }

  getQuestionNumber(): number {
    return this.currentQuestion;
  }

  getUserAnswers(): boolean[] {
    return this.userAnswers;
  }

  getResults(): boolean[] {
    let results: boolean[] = [];

    this.questions.map((q, i) => {
      let correctAnswer = q.correct_answer === 'True' ? true : false;
      results.push( correctAnswer === this.userAnswers[i]);
    });
    return results;
  }
}
