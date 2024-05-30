import { Component, Signal, WritableSignal, computed, signal } from '@angular/core';
import { decode } from 'html-entities';
import { QuizService } from '../../services/quiz/quiz.service';
import { Question } from '../../interfaces/question/question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent {
  questions: Question[] = [];
  results: WritableSignal<boolean[]> = signal([]);
  score:Signal<number> = computed(() => {
    return this.results().filter(Boolean).length;
  });

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {
    this.questions = this.quizService.getAllQuestions();
    this.results.set(this.quizService.getResults());
  }

  decode(text: string): string {
    return decode(text);
  }

  restartQuiz(): void {
    this.router.navigate(['/']);
  }
}
