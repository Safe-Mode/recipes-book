import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../../../shared/models/recipe.model';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { RecipeService } from '../../../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: Params) => {
      this.recipeId = params.get('id');
      this.recipe = this.recipeService.getRecipe(this.recipeId);
    });
  }

  onAddIngredientsToShoppingList(event: Event): void {
    event.preventDefault();

    const shoppingListIngredients = this.shoppingListService.getIngredients();
    const clonedIngredients = this.recipe.ingredients.slice();

    shoppingListIngredients.forEach((listIngredient: Ingredient) => {
      clonedIngredients.forEach((ingredient: Ingredient) => {
         if (ingredient.name === listIngredient.name) {
           clonedIngredients.splice(clonedIngredients.indexOf(ingredient), 1);
         }
      });
    });

    this.shoppingListService.addIngredients(clonedIngredients);
  }

  onEditRecipe(event: Event): void {
    event.preventDefault();
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(event: Event): void {
    event.preventDefault();

    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }

  getImagePath(): string {
    return this.recipeService.getRecipeImage(this.recipe);
  }

}
