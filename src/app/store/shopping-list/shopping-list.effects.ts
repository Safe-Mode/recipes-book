import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { BASE_URL_TOKEN } from '../../config';
import { Ingredient } from '../../shared/models/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import * as fromApp from './../app.reducer';

@Injectable()
export class ShoppingListEffects {
  @Effect()
  fetchIngredients$ = this.actions$.pipe(
    ofType(ShoppingListActions.FETCH_INGREDIENTS),
    switchMap(() => this.http.get<Ingredient[]>(`${this.baseUrl}ingredients.json`)),
    map((ingredients: Ingredient[]) => new ShoppingListActions.SetIngredients(ingredients))
  );

  @Effect({ dispatch: false })
  storeIngredients$ = this.actions$.pipe(
    ofType(ShoppingListActions.STORE_INGREDIENTS),
    withLatestFrom(this.store.select('shoppingList')),
    switchMap(([action, state]) => {
      return this.http.put<Ingredient[]>(`${this.baseUrl}ingredients.json`, state.ingredients);
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
