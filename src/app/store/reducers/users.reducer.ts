// users.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as SelectionActions from '../actions/users.actions';
import { Users } from 'src/app/interfaces/users.interface';

export interface UsersSelectionState {
    usersData: Users[];  // Store it as a string directly, not an object
}

const storedData = localStorage.getItem('usersSelection');

// Parse the data, default to an empty array if null or invalid JSON
const parsedData: Users[] = storedData ? JSON.parse(storedData) : [];

const initialState: UsersSelectionState = {
    usersData: parsedData
};

export const usersReducer = createReducer(
  initialState,
  on(SelectionActions.UsersSelection, (state, { usersData }) => ({
    ...state,
    usersData: usersData  // Update with the string value directly
  }))
);
