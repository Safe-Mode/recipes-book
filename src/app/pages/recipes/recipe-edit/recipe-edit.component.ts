import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { RecipeService } from '../../../services/recipe.service';
import { Recipe } from '../../../shared/models/recipe.model';
import { Ingredient } from '../../../shared/models/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  editMode = false;
  recipeId: string;
  recipeForm: FormGroup;
  recipes: Recipe[];

  get ingredientsControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private router: Router,
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
    const { required } = Validators;
    const recipe = (this.editMode) ? this.recipeService
      .getRecipe(this.recipeId) : new Recipe('', '', '', []);

    this.recipeForm = new FormGroup({
      name: new FormControl(recipe.name, required),
      description: new FormControl(recipe.description),
      imagePath: new FormControl(recipe.imagePath),
      ingredients: new FormArray([], required)
    });

    if (recipe.ingredients.length) {
      recipe.ingredients.forEach((ingredient: Ingredient ) => {
        this.addIngredient(ingredient);
      });
    } else {
      this.addIngredient(null);
    }
  }

  addIngredient(ingredient: Ingredient | null): void {
    const name = (ingredient) ? ingredient.name : '';
    const amount = (ingredient) ? ingredient.amount : '';
    const { required } = Validators;

    const formGroup = new FormGroup({
      name: new FormControl(name, required),
      amount: new FormControl(amount)
    });

    (this.recipeForm.get('ingredients') as FormArray).push(formGroup);
  }

  onAddIngredient(): void {
    this.addIngredient(null);
  }

  onDeleteIngredient(index: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  navigateBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSubmit(): void {
    if (this.editMode) {
      this.recipeService.editRecipe(this.recipeId, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.navigateBack();
  }

  onCancel(): void {
    this.navigateBack();
  }

}
