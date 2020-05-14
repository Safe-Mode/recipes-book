import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from '../shared/models/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) { }

  resolve(): Observable<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();
    return (recipes.length) ? recipes : this.dataStorageService.fetchRecipes();
  }

}
