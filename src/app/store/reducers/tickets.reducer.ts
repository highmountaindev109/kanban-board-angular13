// tickets.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as SelectionActions from '../actions/tickets.actions';
import { Tickets } from 'src/app/interfaces/tickets.interface';

export interface TicketsSelectionState {
    ticketsData: Tickets[];
}

const storedData = localStorage.getItem('ticketsSelection');

// Parse the data, default to an empty array if null or invalid JSON
const parsedData: Tickets[] = storedData ? JSON.parse(storedData) : [];

const initialState: TicketsSelectionState = {
    ticketsData: parsedData || []
};

export const ticketsReducer = createReducer(
  initialState,
  on(SelectionActions.TicketsSelection, (state, { ticketsData }) => ({
    ...state,
    ticketsData: ticketsData  // Update with the string value directly
  }))
);
