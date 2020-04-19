import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../../models/recipe.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { RecipeService } from './../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipe(params.get('id'));
    });
  }

  addIngredientsToShoppingList(event: Event): void {
    event.preventDefault();

    const shoppingListIngredients = this.shoppingListService.getIngredients();
    const containsIngredient = shoppingListIngredients.some((listIngredient) => {
      return this.recipe.ingredients.some(ingredient => ingredient.name === listIngredient.name);
    });

    if (!containsIngredient) {
      this.shoppingListService.addIngredients(this.recipe.ingredients);
    }
  }

}
