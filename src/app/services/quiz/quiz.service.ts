import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../../models/question/question';
import { Observable } from 'rxjs/internal/Observable';
import { QuizAPIPayload } from '../../models/quizAPIPayload/quizAPIPayload';
import { QuizType } from '../../models/quizType/quizType';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private questions: Question[] = [];
  private currentQuestion: number = 0;
  private userAnswers: string[] = [];
  private quizFinishedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  quizFinished$ = this.quizFinishedSubject.asObservable();

  constructor(private http: HttpClient) {}

  getQuiz(
    difficulty: string = 'hard',
    quizLength: number = 10,
    type: QuizType = QuizType.boolean
  ): Observable<QuizAPIPayload> {
    const typeString = type.toString().toLocaleLowerCase();

    return this.http.get<QuizAPIPayload>(
      `https://opentdb.com/api.php?amount=${quizLength}&difficulty=${difficulty.toLocaleLowerCase()}&type=${typeString}`
    );
  }

  loadQuiz(questions: Question[]) {
    this.questions = questions;
    this.currentQuestion = 0;
    this.userAnswers = [];
    this.quizFinishedSubject.next(false);
  }
}
