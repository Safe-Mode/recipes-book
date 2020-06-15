import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { BASE_URL_TOKEN } from '../../config';
import { Recipe } from '../../shared/models/recipe.model';
import * as RecipesActions from './recipes.actions';
import * as fromApp from './../app.reducer';

@Injectable()
export class RecipesEffects {
  @Effect()
  fetchRecipes$ = this.actions$.pipe(
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

  @Effect({ dispatch: false })
  storeRecipes$ = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      return this.http.put<Recipe[]>(`${this.baseUrl}recipes.json`, state.recipes);
    })
  );

  constructor(
    @Inject(BASE_URL_TOKEN) private baseUrl: string,
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {
  }
}
