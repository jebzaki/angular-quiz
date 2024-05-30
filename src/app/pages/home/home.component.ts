import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizService } from '../../services/quiz/quiz.service';
import { Question } from '../../interfaces/question/question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  quiz: Question[] = [];

  difficulties: string[] = ['Easy', 'Medium', 'Hard'];
  quizLengths: number[] = [10, 20, 30];

  isLoading: boolean = false;
  errorMessage: string = '';

  quizSetupForm = this.formBuilder.group({
    difficulty: [this.difficulties[0], Validators.required],
    quizLength: [this.quizLengths[0], Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {}

  onSubmit(): void {
    //api pull
    this.quizService.getQuiz().subscribe({
      next: data => {
        this.quizService.loadQuiz(data.results);
        this.quizSetupForm.value.difficulty = this.difficulties[0];
        this.quizSetupForm.value.quizLength = this.quizLengths[0];

        this.router.navigate(['/', 'questions']);
      },
      error: error => {
        this.errorMessage = error.message;
        console.error('There was an error!', error);
      },
    });
  }
}
