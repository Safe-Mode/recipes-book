import { EventEmitter } from '@angular/core';

import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';


export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Kimchi Fried Rice with Frizzled Eggs',
      // tslint:disable-next-line:max-line-length
      'This easy, lightning-fast fried rice is a great way to introduce kimchi to your family--mixed with rice, spinach, and eggs, its spicy nature is tempered. Make sure your pan is thoroughly pre-heated before you add any ingredients. This will help keep the cook time quick, but also produces a proper fried rice.',
      '../../assets/images/kimchi-fried-rice-with-frizzled-eggs.jpg',
      [
        new Ingredient('toasted sesame oil', '1 1/2 tablespoons'),
        new Ingredient('chopped green onions', '1 cup'),
        new Ingredient('garlic, minced', '2 cloves'),
        new Ingredient('chopped kimchi, drained', '3/4 cup'),
        new Ingredient('juice reserved', '1/4 cup'),
        new Ingredient('UNCLE BEN\'S® READY RICE® Jasmine', '2 (8.8 ounce) pouches'),
        new Ingredient('package fresh baby spinach', '1 (5 ounce)'),
        new Ingredient('reduced-sodium soy sauce', '1 1/2 tablespoons'),
        new Ingredient('gochujang (Korean hot pepper paste)', '2 teaspoons'),
        new Ingredient('sesame oil', '2 teaspoons'),
        new Ingredient('eggs', 4)
      ]
    ),
    new Recipe(
      'Tuna Melts',
      'Delicious melted cheesy tuna sandwiches.',
      '../../assets/images/tuna-melts.jpg',
      [
        new Ingredient('loaf French bread', '1 (1 pound)'),
        new Ingredient('small sweet onion, peeled and diced', 1),
        new Ingredient('can tuna, drained', '1 (12 ounce)'),
        new Ingredient('mozzarella cheese, shredded', '2 cups'),
        new Ingredient('mayonnaise', '1 cup')
      ]
    )
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }
}
