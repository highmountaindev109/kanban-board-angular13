// groupBy.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as SelectionActions from '../actions/groupBy.actions';

export interface SelectionState {
  selectedData: string;  // Store it as a string directly, not an object
}

const storedData = localStorage.getItem('updategroupBySelection');

const initialState: SelectionState = {
  selectedData: storedData || 'status'  // Default to 'status' if no data is in localStorage
};

export const groupByReducer = createReducer(
  initialState,
  on(SelectionActions.updategroupBySelection, (state, { selectedData }) => ({
    ...state,
    selectedData: selectedData  // Update with the string value directly
  }))
);
