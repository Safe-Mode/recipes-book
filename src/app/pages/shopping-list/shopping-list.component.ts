import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { DataStorageService } from '../../shared/data-storage.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private shoppingListSub: Subscription;
  private shoppingListChangedSub: Subscription;

  ingredients: Ingredient[];

  constructor(
    private shoppingListService: ShoppingListService,
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.shoppingListSub = this.dataStorageService
      .fetchIngredients()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });

    this.shoppingListChangedSub = this.shoppingListService.ingredientsChanged$
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.shoppingListSub.unsubscribe();
    this.shoppingListChangedSub.unsubscribe();
  }

  onEditIngredient(index: number): void {
    this.shoppingListService.ingredientEdited$.next(index);
  }

}
