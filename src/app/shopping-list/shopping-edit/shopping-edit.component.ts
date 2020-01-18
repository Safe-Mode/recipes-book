import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from '../../models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('titleInput', { static: true }) titleInput: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInput: ElementRef;

  constructor(
    private shoppingListService: ShoppingListService
  ) { }

  ngOnInit() {
  }

  onAddIngredientBtnClick() {
    const newIngredient = new Ingredient(
      this.titleInput.nativeElement.value,
      this.amountInput.nativeElement.value
    );

    this.shoppingListService.addIngredient(newIngredient);
    this.titleInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
