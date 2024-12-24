import { createAction, props } from '@ngrx/store';
import { iUser } from '../../../../logic/interfaces/user.interface';

export const setCurrentUser = createAction(
  '[Auth] Seting Current User',
  props<{ currentUser: iUser }>()
);

export const unsetCurrentUser = createAction(
  '[Auth] Unseting Current User'
);