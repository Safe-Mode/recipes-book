import { Action } from '@ngrx/store';
import { Recipe } from '../../shared/models/recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[REcipes] Fetch Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[] ) {
  }
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export type RecipesAction = SetRecipes | FetchRecipes;
