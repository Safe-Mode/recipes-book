import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from './shopping-list/shopping-list.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.AuthReducer
};
