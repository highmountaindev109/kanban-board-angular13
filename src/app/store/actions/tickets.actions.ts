// tickets.actions.ts
import { createAction, props } from '@ngrx/store';
import { Tickets } from 'src/app/interfaces/tickets.interface';

export const TicketsSelection = createAction(
  '[Tickets] Update Selection',
  props<{ ticketsData: Tickets[] }>()
);