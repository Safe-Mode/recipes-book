import { EventEmitter } from '@angular/core';

import { Recipe } from '../models/recipe.model';


export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Test Recipe 1',
      'Simple test description',
      'https://cdn.apartmenttherapy.info/image/upload/v1564775676/k/Photo/Recipes/2019-08-how-to-juiciest-turkey-meatballs/How-to-Make-the-Best-Juiciest-Turkey-Meatballs_055.jpg'
    ),
    new Recipe(
      'Test Recipe 2',
      'Simple test description',
      'https://cdn.apartmenttherapy.info/image/upload/v1564775676/k/Photo/Recipes/2019-08-how-to-juiciest-turkey-meatballs/How-to-Make-the-Best-Juiciest-Turkey-Meatballs_055.jpg'
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
