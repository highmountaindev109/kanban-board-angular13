// orderBy.actions.ts
import { createAction, props } from '@ngrx/store';

export const updateorderBySelection = createAction(
    '[Order By] Update Selection',
    props<{ selectedOrderByData: string }>()
);