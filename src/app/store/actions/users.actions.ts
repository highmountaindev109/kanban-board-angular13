// tickets.actions.ts
import { createAction, props } from '@ngrx/store';
import { Users } from 'src/app/interfaces/users.interface';

export const UsersSelection = createAction(
  '[Users] Update Selection',
  props<{ usersData: Users[] }>()
);