import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { ResultsComponent } from './results.component';
import { initialState as quizState } from '../../store/app.reducers';
import { QuizState } from '../../models/quizState/quizState';
import { quizManagementActions } from '../../store/app.actions';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;
  let store: MockStore<QuizState>;
  const initialState: QuizState = quizState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultsComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch reset quiz on button click', () => {
    const button = fixture.debugElement.query(By.css('button'));
    console.log(button);
    spyOn(store, 'dispatch');

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(quizManagementActions.resetQuiz());
  });
});
