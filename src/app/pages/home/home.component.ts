/* eslint-disable @ngrx/no-store-subscription */
import { Component, HostBinding, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

import { Question } from '../../models/question/question';
import * as QuizActions from '../../store/app.actions';
import * as QuizSelectors from '../../store/app.selectors';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnDestroy {
  @HostBinding('class')
  protected readonly classes = 'flex-1 flex justify-center';

  quiz: Question[] = [];

  difficulties: string[] = ['Easy', 'Medium', 'Hard'];
  quizLengths: number[] = [10, 20, 30];

  isLoading: boolean = false;
  errorMessage: string = '';
  error$ = Observable<HttpErrorResponse>;
  private subscriptions: Subscription = new Subscription();

  quizSetupForm = this.formBuilder.group({
    difficulty: [this.difficulties[0], Validators.required],
    quizLength: [this.quizLengths[0], Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private readonly store: Store,
    private router: Router
  ) {
    this.subscriptions.add(
      this.store.select(QuizSelectors.selectQuizAPIError).subscribe(error => {
        this.isLoading = false;
        this.errorMessage = error?.message || '';
      })
    );

    this.subscriptions.add(
      this.store.select(QuizSelectors.selectAllQuestions).subscribe(questions => {
        this.isLoading = false;

        if (questions.length > 0) {
          this.router.navigate(['/', 'questions']);
          this.quizSetupForm.value.difficulty = this.difficulties[0];
          this.quizSetupForm.value.quizLength = this.quizLengths[0];
        }
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSubmit(): void {
    this.isLoading = true;
    this.store.dispatch(
      QuizActions.quizManagementActions.getQuiz({
        difficulty: this.quizSetupForm.value.difficulty,
        quizLength: this.quizSetupForm.value.quizLength,
      })
    );
  }
}
