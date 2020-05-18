import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { BASE_URL_TOKEN } from '../config';
import { Recipe } from './models/recipe.model';
import { RecipeService } from '../services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    @Inject(BASE_URL_TOKEN) private baseUrl: string,
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes(): void {
    const recipes = this.recipeService.getRecipes();

    this.http
      .put<Recipe[]>(`${this.baseUrl}recipes.json`, recipes)
      .subscribe((response: Recipe[]) => {
        console.log(response);
      });
  }

  fetchRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}recipes.json`)
      .pipe(
        map((recipes: Recipe[]) => {
          return recipes.map((recipe: Recipe) => {
            return {
              ...recipe,
              ingredients: (recipe.ingredients) ? recipe.ingredients : []
            };
          });
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

}
