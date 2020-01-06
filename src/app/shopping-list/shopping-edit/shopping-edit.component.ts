import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('titleInput', { static: true }) titleInput: ElementRef;
  @ViewChild('amountInput', { static: true }) amountInput: ElementRef;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddIngredientBtnClick() {
    const newIngredient = new Ingredient(
      this.titleInput.nativeElement.value,
      this.amountInput.nativeElement.value
    );

    this.ingredientAdded.emit(newIngredient);
    this.titleInput.nativeElement.value = '';
    this.amountInput.nativeElement.value = '';
  }
}
