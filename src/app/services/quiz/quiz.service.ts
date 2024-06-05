import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from '../../models/question/question';
import { Observable } from 'rxjs/internal/Observable';
import { QuizAPIPayload } from '../../models/quizAPIPayload/quizAPIPayload';

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

  getQuiz(difficulty: string = 'hard', quizLength: number = 10, type: string = 'boolean'): Observable<QuizAPIPayload> {
    return this.http.get<QuizAPIPayload>(
      `https://opentdb.com/api.php?amount=${quizLength}&difficulty=${difficulty.toLocaleLowerCase()}&type=${type}`
    );
  }

  loadQuiz(questions: Question[]) {
    this.questions = questions;
    this.currentQuestion = 0;
    this.userAnswers = [];
    this.quizFinishedSubject.next(false);
  }
}
