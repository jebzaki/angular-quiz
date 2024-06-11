import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { initialState as quizState } from '../../store/app.reducers';
import { QuizState } from '../../models/quizState/quizState';
import { quizManagementActions } from '../../store/app.actions';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore<QuizState>;
  const initialState: QuizState = quizState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, ReactiveFormsModule],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch load the quiz on form submission', () => {
    spyOn(store, 'dispatch').and.callThrough();

    const formElement = fixture.debugElement.query(By.css('form'));
    formElement.triggerEventHandler('submit', null);

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(
      quizManagementActions.getQuiz({
        difficulty: 'Easy',
        quizLength: 10,
      })
    );
  });
});
