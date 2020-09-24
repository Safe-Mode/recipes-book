import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../../shared/models/ingredient.model';
import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import * as fromApp from '../../../store/app.reducer';
import * as fromRecipes from '../../../store/recipes/recipes.reducer';
import * as RecipesActions from '../../../store/recipes/recipes.actions';
import * as Animation from '../../../animations';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
  animations: [
    trigger('inputAnimations', Animation.slideListItem())
  ]
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  store$: Subscription;
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
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = params.id;
      this.editMode = Boolean(this.recipeId);
      this.initForm();
    });
  }

  ngOnDestroy() {
    if (this.store$) {
      this.store$.unsubscribe();
    }
  }

  private initForm(): void {
    const { required } = Validators;

    // Managing state via service
    // const recipe = (this.editMode) ? this.recipeService
    //   .getRecipe(this.recipeId) : new Recipe('', '', '', []);

    // Managing state via ngRx
    if (this.editMode) {
      this.store$ = this.store
        .select('recipes')
        .pipe(
          map(({ recipes }: fromRecipes.State) => {
            return recipes.find((recipe: Recipe, index: number) => index === Number(this.recipeId));
          })
        )
        .subscribe((recipe: Recipe) => {
          this.recipeForm = new FormGroup({
            name: new FormControl(recipe.name, required),
            description: new FormControl(recipe.description),
            imagePath: new FormControl(recipe.imagePath),
            ingredients: new FormArray([], required)
          });

          if (recipe.ingredients.length) {
            recipe.ingredients.forEach((ingredient: Ingredient) => {
              this.addIngredient(ingredient);
            });
          } else {
            this.addIngredient(null);
          }
        });
    } else {
      this.recipeForm = new FormGroup({
        name: new FormControl('', required),
        description: new FormControl(''),
        imagePath: new FormControl(''),
        ingredients: new FormArray([], required)
      });

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
      // Managing state via service
      // this.recipeService.editRecipe(this.recipeId, this.recipeForm.value);

      // Managing state via ngRx
      this.store.dispatch(new RecipesActions.EditRecipe({ id: this.recipeId, recipe: this.recipeForm.value }));
    } else {
      // Managing state via service
      // this.recipeService.addRecipe(this.recipeForm.value);

      // Managing state via ngRx
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }

    this.navigateBack();
  }

  onCancel(): void {
    this.navigateBack();
  }

}
