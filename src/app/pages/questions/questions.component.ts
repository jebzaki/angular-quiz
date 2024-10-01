/* eslint-disable @ngrx/no-store-subscription */
import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Question } from '../../models/question/question';
import * as QuizActions from '../../store/app.actions';
import * as QuizSelectors from '../../store/app.selectors';
import { QuizType } from '../../models/quizType/quizType';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnDestroy {
  @HostBinding('class')
  protected readonly classes = 'flex-1 flex justify-center';

  question: Question = new Question();
  answers: string[] = [];
  questionNumber: number = 0;
  disableBtns: boolean = false;
  QuizType = QuizType;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly store: Store,
    private router: Router
  ) {
    this.subscriptions.add(
      this.store.select(QuizSelectors.selectCurrentQuestion).subscribe(question => {
        this.question = question;

        if (question.type === QuizType.multiple) {
          this.answers = this.shuffleArray([question.correct_answer, ...question.incorrect_answers]);
        }
      })
    );

    this.subscriptions.add(
      this.store.select(QuizSelectors.selectCurrentQuestionNumber).subscribe(questionNumber => {
        this.questionNumber = questionNumber;
      })
    );

    this.subscriptions.add(
      this.store.select(QuizSelectors.selectIsQuizFinished).subscribe(isFinished => {
        this.disableBtns = isFinished;

        if (isFinished) {
          this.router.navigate(['/', 'results']);
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  submitAnswer(answer: string): void {
    this.store.dispatch(
      QuizActions.quizManagementActions.nextQuestion({
        answer,
      })
    );
  }
}
