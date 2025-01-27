// groupBy.actions.ts
import { createAction, props } from '@ngrx/store';

export const updategroupBySelection = createAction(
  '[Group By] Update Selection',
  props<{ selectedData: string }>()
);