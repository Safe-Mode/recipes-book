import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../../shared/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';


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

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editIngredientSub = this.shoppingListService.ingredientEdited
      .subscribe((index: number) => {
        this.editMode = true;
        this.editedIngredientIndex = index;
        this.editedIngredient = this.shoppingListService.getIngredient(index);

        this.shoppingListForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      });
  }

  ngOnDestroy(): void {
    this.editIngredientSub.unsubscribe();
  }

  clearForm(): void {
    if (this.editMode) {
      this.editMode = false;
      this.editedIngredientIndex = null;
      this.editedIngredient = null;
    }

    this.shoppingListForm.reset();
  }

  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.shoppingListService.editIngredient(this.editedIngredientIndex, form.value);
    } else {
      this.shoppingListService.addIngredient(form.value);
    }

    this.clearForm();
  }

  onClear(): void {
    this.clearForm();
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.editedIngredientIndex);
    this.clearForm();
  }

}
