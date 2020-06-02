import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient('Cucumbers', 2),
    new Ingredient('Tomatoes', 3)
  ];

  ingredientsChanged$ = new Subject<Ingredient[]>();
  ingredientEdited$ = new Subject<number>();

  private updateIngredients(): void {
    this.ingredientsChanged$.next(this.ingredients.slice());
  }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  setIngredients(ingredients: Ingredient[]): void {
    this.ingredients = ingredients;
    this.updateIngredients();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.updateIngredients();
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.updateIngredients();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients.slice()[index];
  }

  editIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.updateIngredients();
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.updateIngredients();
  }

}
