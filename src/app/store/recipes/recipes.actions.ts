import { Action } from '@ngrx/store';
import { Recipe } from '../../shared/models/recipe.model';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const EDIT_RECIPE = '[Recipes] Edit Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const STORE_RECIPES = '[Recipes] Store Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[] ) {
  }
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {
  }
}

export class EditRecipe implements Action {
  readonly type = EDIT_RECIPE;

  constructor(public payload: { id: string; recipe: Recipe }) {
  }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: string) {
  }
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipesAction = SetRecipes | FetchRecipes | AddRecipe | EditRecipe | DeleteRecipe | StoreRecipes;
