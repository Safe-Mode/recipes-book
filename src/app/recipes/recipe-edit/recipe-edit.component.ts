import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Ingredient } from '../../models/ingredient.model';
import { log } from 'util';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false;
  recipeId: string;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = params.id;
      this.editMode = Boolean(this.recipeId);
      this.initForm();
    });
  }

  private initForm(): void {
    const recipe = (this.editMode) ? this.recipeService
      .getRecipe(this.recipeId) : new Recipe('', '', '', []);

    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name),
      description: new FormControl(recipe.description),
      imagePath: new FormControl(recipe.imagePath),
      ingredients: new FormArray([])
    });

    if (recipe.ingredients.length) {
      recipe.ingredients.forEach((ingredient: Ingredient ) => {
        this.addIngredient(ingredient);
      });
    }
  }

  addIngredient(ingredient: Ingredient | null): void {
    const name = (ingredient) ? ingredient.name : '';
    const amount = (ingredient) ? ingredient.amount : '';

    const formGroup = new FormGroup({
      name: new FormControl(name),
      amount: new FormControl(amount)
    });

    (this.recipeForm.get('ingredients') as FormArray).push(formGroup);
  }

  onAddIngredient(): void {
    this.addIngredient(null);
  }

  onSubmit(): void {
    console.log(this.recipeForm);
  }

}
