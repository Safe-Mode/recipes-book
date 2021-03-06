import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/models/ingredient.model';

export const FETCH_INGREDIENTS = '[Shopping List] Fetch Ingredients';
export const SET_INGREDIENTS = '[Shopping List] SetIngredients';
export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const EDIT_INGREDIENT = '[Shopping List] Edit Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT_INGREDIENT = '[Shopping List] Start Edit Ingredient';
export const STOP_EDIT_INGREDIENT = '[Shopping List] Stop Edit Ingredient';
export const STORE_INGREDIENTS = '[Shopping List] StoreIngredients';

export class FetchIngredients implements Action {
  readonly type = FETCH_INGREDIENTS;
}

export class SetIngredients implements Action {
  readonly type = SET_INGREDIENTS;

  constructor(public payload: Ingredient[]) {
  }
}

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {
  }
}

export class EditIngredient implements Action {
  readonly type = EDIT_INGREDIENT;

  constructor(public payload: Ingredient) {
  }
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEditIngredient implements Action {
  readonly type = START_EDIT_INGREDIENT;

  constructor(public payload: number) {
  }
}

export class StopEditIngredient implements Action {
  readonly type = STOP_EDIT_INGREDIENT;
}

export class StoreIngredients implements Action {
  readonly type = STORE_INGREDIENTS;
}

export type ShoppingListAction =
  FetchIngredients
  | SetIngredients
  | AddIngredient
  | AddIngredients
  | EditIngredient
  | DeleteIngredient
  | StartEditIngredient
  | StopEditIngredient
  | StoreIngredients;
