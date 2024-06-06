/* eslint-disable @ngrx/no-store-subscription */
import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { decode } from 'html-entities';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Question } from '../../models/question/question';
import * as QuizActions from '../../store/app.actions';
import * as QuizSelectors from '../../store/app.selectors';

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
  questionNumber: number = 0;
  disableBtns: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly store: Store,
    private router: Router
  ) {
    this.subscriptions.add(
      this.store.select(QuizSelectors.selectCurrentQuestion).subscribe(question => {
        this.question = question;
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

  decode(text: string): string {
    return decode(text);
  }

  submitAnswer(answer: boolean): void {
    this.store.dispatch(
      QuizActions.quizManagementActions.nextQuestion({
        answer,
      })
    );
  }
}
