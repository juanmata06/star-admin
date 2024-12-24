import { createReducer, on } from '@ngrx/store';
import * as actions from './balances.actions';
import { iBalance } from '../../../interfaces/balance.interface';

export interface State {
  items: iBalance[];
}

export const initialState: State = {
  items: [],
}

const _balancesReducer = createReducer(initialState,
  on(actions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(actions.unsetItems, state => ({ ...state, items: [] }))
);

export function balancesReducer(state: any, action: any) {
  return _balancesReducer(state, action);
}