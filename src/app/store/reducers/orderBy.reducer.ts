// groupBy.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as SelectionActions from '../actions/orderBy.actions';

export interface SelectionOrderByState {
    selectedOrderByData: string;  // Store it as a string directly, not an object
}

const storedData = localStorage.getItem('updateorderBySelection');

const initialState: SelectionOrderByState = {
    selectedOrderByData: storedData || 'priority'  // Default to 'status' if no data is in localStorage
};

export const orderByReducer = createReducer(
  initialState,
  on(SelectionActions.updateorderBySelection, (state, { selectedOrderByData }) => ({
    ...state,
    selectedOrderByData: selectedOrderByData  // Update with the string value directly
  }))
);
