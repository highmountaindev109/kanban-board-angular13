// effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { updateorderBySelection } from '../actions/orderBy.actions';
import { tap } from 'rxjs/operators';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class OrderingEffects {
  constructor(private actions$: Actions, private store: Store) {}

  // Save to localStorage whenever the user selects a grouping
  saveOrderingToLocalStorage$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(updateorderBySelection),
        tap(action => {
          // Save selected grouping to localStorage
          localStorage.setItem('updateorderBySelection', action.selectedOrderByData);
        })
      ),
    { dispatch: false } // We don't need to dispatch anything here
  );
}
