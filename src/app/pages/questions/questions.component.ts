import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { decode } from 'html-entities';

import { Question } from '../../interfaces/question/question';
import { QuizService } from '../../services/quiz/quiz.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent {
  question: Question = new Question();
  questionNumber: number = 0;
  disableBtns: boolean = false;

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {
    this.question = this.quizService.getQuestion() || this.question;
    this.questionNumber = this.quizService.getQuestionNumber();

    if (!this.question.question) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // Subscribe to the boolean observable
    this.quizService.quizFinished$.subscribe(value => {
      this.disableBtns = value;

      if (value) {
        this.router.navigate(['/', 'results']);
      }
    });
  }

  decode(text: string): string {
    return decode(text);
  }

  submitAnswer(answer: boolean): void {
    this.quizService.nextQuestion(answer);
    this.question = this.quizService.getQuestion() || this.question;
    this.questionNumber = this.quizService.getQuestionNumber();
  }
}
