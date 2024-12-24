import { createAction, props } from '@ngrx/store';
import { iBalance } from '../../../logic/interfaces/balance.interface';

export const setItems = createAction('[Balances] Set Items',
  props<{ items: iBalance[] }>()
);

export const unsetItems = createAction('[Balances] Unset Items',);