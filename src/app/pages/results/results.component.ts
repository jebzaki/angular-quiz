import { Component, Signal, WritableSignal, computed, signal, OnDestroy } from '@angular/core';
import { decode } from 'html-entities';
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

  decode(text: string): string {
    return decode(text);
  }

  restartQuiz(): void {
    this.store.dispatch(QuizActions.quizManagementActions.resetQuiz());
  }
}
