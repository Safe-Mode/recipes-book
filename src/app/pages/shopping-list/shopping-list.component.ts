import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/models/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { DataStorageService } from '../../shared/data-storage.service';
import * as fromShoppingList from '../../store/shopping-list/shopping-list.reducer';
import * as ShoppingListActions from '../../store/shopping-list/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import * as Animation from './../../animations';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('inputAnimations', Animation.slideListItem())
  ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  private shoppingList$: Subscription;
  ingredients: Ingredient[];

  constructor(
    private shoppingListService: ShoppingListService,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    // Managing state via rxjs
    // this.shoppingListChangedSub = this.shoppingListService.ingredientsChanged$
    //   .subscribe((ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   });

    // Managing state via ngRx
    this.shoppingList$ = this.store
      .select('shoppingList')
      .subscribe(({ ingredients }: fromShoppingList.State) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy(): void {
    this.shoppingList$.unsubscribe();
  }

  onEditIngredient(index: number): void {
    // Managing state via rxjs
    // this.shoppingListService.ingredientEdited$.next(index);

    // Managing state via ngRx
    this.store.dispatch(new ShoppingListActions.StartEditIngredient(index));
  }

}
