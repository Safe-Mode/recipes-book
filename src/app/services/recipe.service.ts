import { EventEmitter } from '@angular/core';

import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';


export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Touchdown Chili',
      'Every year when football season rolls around and the weather begins to cool, my husband requests I make this hearty, beanless chili. It receives rave reviews from everyone.',
      'https://images.media-allrecipes.com/userphotos/600x600/5583115.jpg',
      [
        new Ingredient('2 pounds ground beef', 2),
        new Ingredient('1 large onion, chopped', 1),
        new Ingredient('6 cloves garlic, chopped', 6),
        new Ingredient('1/3 cup chili powder', 0),
        new Ingredient('1 1/2 teaspoons ground cumin', 1),
        new Ingredient('1 1/2 teaspoons dried basil', 1),
        new Ingredient('1 (28 ounce) can diced tomatoes with juice', 1),
        new Ingredient('1 (4 ounce) can diced green chile peppers, drained', 1)
      ]
    ),
    new Recipe(
      'Restaurant-Style Buffalo Chicken Wings',
      'This is similar to the hot wings recipe served at a popular restaurant chain. If you have ever had them, you have to love them.',
      'https://images.media-allrecipes.com/userphotos/4614563.jpg',
      [
        new Ingredient('½ cup all-purpose flour', 0),
        new Ingredient('¼ teaspoon paprika', 0),
        new Ingredient('¼ teaspoon cayenne pepper', 0),
        new Ingredient('¼ teaspoon salt', 0),
        new Ingredient('10 chicken wings', 10),
        new Ingredient('oil for deep frying', 1),
        new Ingredient('¼ cup butter', 0),
        new Ingredient('¼ cup hot sauce', 0)
      ]
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}
