// effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TicketsSelection } from '../actions/tickets.actions';
import { tap } from 'rxjs/operators';
import { createEffect } from '@ngrx/effects';

@Injectable()
export class TicketsEffects {
  constructor(private actions$: Actions, private store: Store) {}

  // Save to localStorage whenever the user selects a grouping
  saveTicketsToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TicketsSelection),
        tap(action => {
          // Convert the ticketsData array to a string before saving to localStorage
          localStorage.setItem('ticketsSelection', JSON.stringify(action.ticketsData));
        })
      ),
    { dispatch: false } // No further actions need to be dispatched
  );
}
