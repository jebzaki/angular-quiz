import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { localStorageSync } from 'ngrx-store-localstorage';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideStore, ActionReducer } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { quizReducer } from './store/app.reducers';
import { QuizEffects } from './store/app.effects';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['quiz'], rehydrate: true, checkStorageAvailability: true })(reducer);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideStore(
      { quiz: quizReducer },
      {
        metaReducers: [localStorageSyncReducer],
      }
    ),
    provideEffects([QuizEffects]),
  ],
};
