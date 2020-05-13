import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from '../models/recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[] {
    const recipes = this.recipeService.getRecipes();
    return (recipes.length) ? recipes : this.dataStorageService.fetchRecipes();
  }
}
