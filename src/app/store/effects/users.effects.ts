// effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { UsersSelection } from '../actions/users.actions';
import { tap } from 'rxjs/operators';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private store: Store) {}

  // Save to localStorage whenever the user selects a grouping
  saveUsersToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersSelection),
        tap(action => {
          // Convert the usersData array to a string before saving to localStorage
          localStorage.setItem('usersSelection', JSON.stringify(action.usersData));
        })
      ),
    { dispatch: false } // No further actions need to be dispatched
  );
}
