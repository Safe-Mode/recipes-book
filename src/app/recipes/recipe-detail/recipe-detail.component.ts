import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
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
