import { Recipe } from '../../shared/models/recipe.model';
import * as RecipesActions from './recipes.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
};

export function RecipesReducer(state: State = initialState, action: RecipesActions.RecipesAction) {
  switch (action.type) {
    case RecipesActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipesActions.EDIT_RECIPE:
      const { id, recipe } = action.payload;
      const recipes = [...state.recipes];

      recipes[+id] = { ...recipe };

      return {
        ...state,
        recipes
      };

    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((it: Recipe, index: number) => index !== +action.payload)
      };
    default:
      return state;
  }
}
