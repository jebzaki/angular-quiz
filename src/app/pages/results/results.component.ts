/* eslint-disable @ngrx/no-store-subscription */
import { Component, Signal, WritableSignal, computed, signal, OnDestroy, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Question } from '../../models/question/question';
import * as QuizActions from '../../store/app.actions';
import * as QuizSelectors from '../../store/app.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent implements OnDestroy {
  @HostBinding('class')
  protected readonly classes = 'flex-1 flex justify-center';

  questions: Question[] = [];
  results: WritableSignal<boolean[]> = signal([]);
  score: Signal<number> = computed(() => {
    return this.results().filter(Boolean).length;
  });

  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly store: Store,
    private router: Router
  ) {
    this.subscriptions.add(
      this.store.select(QuizSelectors.selectAllQuestions).subscribe(questions => {
        this.questions = questions;

        if (questions.length === 0) {
          this.router.navigate(['/']);
        }
      })
    );

    this.subscriptions.add(
      this.store.select(QuizSelectors.selectResults).subscribe(results => {
        this.results.set(results);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  restartQuiz(): void {
    this.store.dispatch(QuizActions.quizManagementActions.resetQuiz());
  }
}
