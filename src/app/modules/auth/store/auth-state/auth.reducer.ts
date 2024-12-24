import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';
import { iUser } from '../../../interfaces/user.interface';

export interface State {
  currentUser?: iUser | null;
}

export const initialState: State = {
  currentUser: null
}

const _authReducer = createReducer(initialState,
  on(actions.setCurrentUser, (state, { currentUser }) => ({ ...state, currentUser: { ...currentUser } })),
  on(actions.unsetCurrentUser, (state) => ({ ...state, currentUser: null })),
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}