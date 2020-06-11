import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { BASE_URL_TOKEN } from '../../config';
import { Recipe } from '../../shared/models/recipe.model';
import * as RecipesActions from './recipes.actions';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => this.http.get<Recipe[]>(`${this.baseUrl}recipes.json`)),
    map((recipes: Recipe[]) => {
      const recipesList = recipes.map((recipe: Recipe) => {
        return {
          ...recipe,
          ingredients: (recipe.ingredients) ? recipe.ingredients : []
        };
      });

      return new RecipesActions.SetRecipes(recipesList);
    })
  );

  constructor(
    @Inject(BASE_URL_TOKEN) private baseUrl: string,
    private actions$: Actions,
    private http: HttpClient
  ) {
  }
}
