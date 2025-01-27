// effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { updategroupBySelection } from '../actions/groupBy.actions';
import { tap } from 'rxjs/operators';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class GroupingEffects {
  constructor(private actions$: Actions, private store: Store) {}

  // Save to localStorage whenever the user selects a grouping
  saveGroupingToLocalStorage$ = createEffect(
    () => 
      this.actions$.pipe(
        ofType(updategroupBySelection),
        tap(action => {
          // Save selected grouping to localStorage
          localStorage.setItem('updategroupBySelection', action.selectedData);
        })
      ),
    { dispatch: false } // We don't need to dispatch anything here
  );
}
