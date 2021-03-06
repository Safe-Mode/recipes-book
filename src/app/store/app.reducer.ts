import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from './shopping-list/shopping-list.reducer';
import * as fromAuth from './auth/auth.reducer';
import * as fromRecipes from './recipes/recipes.reducer';

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.AuthReducer,
  recipes: fromRecipes.RecipesReducer
};
