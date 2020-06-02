import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../../shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import * as ShoppingListActions from '../../../store/shopping-list/shopping-list.actions';
import * as fromShoppingList from '../../../store/shopping-list/shopping-list.reducer';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  @ViewChild('form', { static: true }) shoppingListForm: NgForm;

  private editIngredientSub: Subscription;

  editMode = false;
  editedIngredientIndex: number;
  editedIngredient: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    // Managing state via ngRx
    this.editIngredientSub = this.store
      .select('shoppingList')
      .subscribe(({ editedIngredientIndex, editedIngredient }: fromShoppingList.State) => {
        if (editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedIngredient = editedIngredient;

          this.shoppingListForm.setValue({
            name: this.editedIngredient.name,
            amount: this.editedIngredient.amount
          });
        } else {
          this.editMode = false;
        }
      });

    // Managing state via rxjs
    // this.editIngredientSub = this.shoppingListService.ingredientEdited$
    //   .subscribe((index: number) => {
    //     this.editMode = true;
    //     this.editedIngredientIndex = index;
    //     this.editedIngredient = this.shoppingListService.getIngredient(index);
    //
    //     this.shoppingListForm.setValue({
    //       name: this.editedIngredient.name,
    //       amount: this.editedIngredient.amount
    //     });
    //   });
  }

  ngOnDestroy(): void {
    // Managing state via ngRx
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());

    // Managing state via rxjs
    this.editIngredientSub.unsubscribe();
  }

  clearForm(): void {
    if (this.editMode) {
      // Managing state via ngRx
      this.editMode = false;
      this.editedIngredient = null;
      this.store.dispatch(new ShoppingListActions.StopEditIngredient());

      // Managing state via rxjs
      // this.editMode = false;
      // this.editedIngredientIndex = null;
      // this.editedIngredient = null;
    }

    this.shoppingListForm.reset();
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      // Managing state via ngRx
      this.store.dispatch(new ShoppingListActions.EditIngredient(form.value));

      // Managing state via rxjs
      // this.shoppingListService.editIngredient(this.editedIngredientIndex, form.value);
    } else {
      // Managing state via ngRx
      this.store.dispatch(new ShoppingListActions.AddIngredient(form.value));

      // Managing state via rxjs
      // this.shoppingListService.addIngredient(form.value);
    }

    this.clearForm();
  }

  onClear(): void {
    this.clearForm();
  }

  onDelete(): void {
    // Managing state via ngRx
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.clearForm();

    // Managing state via rxjs
    // this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
  }

}
