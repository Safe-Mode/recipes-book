import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';

import { Recipe } from '../shared/models/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';
import * as fromApp from './../store/app.reducer';
import * as RecipesActions from './../store/recipes/recipes.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) { }

  resolve(): Observable<Recipe[]> | Recipe[] {
    // Managing state via service
    // const recipes = this.recipeService.getRecipes();
    // return (recipes.length) ? recipes : this.dataStorageService.fetchRecipes();

    // Managing state via ngRx
    this.store.dispatch(new RecipesActions.FetchRecipes());

    return this.actions$.pipe(
      ofType(RecipesActions.SET_RECIPES),
      take(1)
    );
  }

}
