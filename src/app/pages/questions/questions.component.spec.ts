import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { QuestionsComponent } from './questions.component';
import { initialState as quizState } from '../../store/app.reducers';
import { QuizState } from '../../models/quizState/quizState';
import { quizManagementActions } from '../../store/app.actions';

describe('QuestionComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;
  let store: MockStore<QuizState>;
  const initialState: QuizState = quizState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionsComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch next question on button click', () => {
    const button = fixture.debugElement.query(By.css('button'));
    console.log(button);
    spyOn(store, 'dispatch');

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(quizManagementActions.nextQuestion({ answer: true }));
  });
});
