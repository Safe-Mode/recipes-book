import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../../../shared/models/recipe.model';
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
    const containsIngredient = shoppingListIngredients.some((listIngredient) => {
      return this.recipe.ingredients.some(ingredient => ingredient.name === listIngredient.name);
    });

    if (!containsIngredient) {
      this.shoppingListService.addIngredients(this.recipe.ingredients);
    }
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
