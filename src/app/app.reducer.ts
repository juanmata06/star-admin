import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/store/ui-store/ui.reducer';
// import * as auth from './shared/state-management/auth-state/auth.reducer';
// import * as balances from './shared/state-management/balances-state/balances.reducer';

export interface AppState {
  ui: ui.State
  // auth: auth.State,
  // balances: balances.State
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  // auth: auth.authReducer,
  // balances: balances.balancesReducer

}