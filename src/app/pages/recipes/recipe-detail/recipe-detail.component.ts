import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../../../shared/models/recipe.model';
import { Ingredient } from '../../../shared/models/ingredient.model';
import { ShoppingListService } from '../../../services/shopping-list.service';
import { RecipeService } from '../../../services/recipe.service';
import * as ShoppingListActions from '../../../store/shopping-list/shopping-list.actions';
import * as RecipesActions from '../../../store/recipes/recipes.actions';
import * as fromApp from '../../../store/app.reducer';
import * as fromRecipes from '../../../store/recipes/recipes.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  recipeId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    // Managing state via service
    // this.route.paramMap.subscribe((params: Params) => {
    //   this.recipeId = params.get('id');
    //   this.recipe = this.recipeService.getRecipe(this.recipeId);
    // });

    // managing state via ngRx
    this.route.paramMap
      .pipe(
        switchMap((params: Params) => {
          this.recipeId = params.get('id');
          return this.store.select('recipes');
        }),
        map((state: fromRecipes.State) => {
          return state.recipes.find((recipe: Recipe, index: number) => index === +this.recipeId);
        })
      )
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
  }

  onAddIngredientsToShoppingList(event: Event): void {
    event.preventDefault();

    // TODO: integrate to ngRx state management
    const shoppingListIngredients = this.shoppingListService.getIngredients();
    const clonedIngredients = this.recipe.ingredients.slice();

    shoppingListIngredients.forEach((listIngredient: Ingredient) => {
      clonedIngredients.forEach((ingredient: Ingredient) => {
         if (ingredient.name === listIngredient.name) {
           clonedIngredients.splice(clonedIngredients.indexOf(ingredient), 1);
         }
      });
    });

    // Managing state via rxjs
    // this.shoppingListService.addIngredients(clonedIngredients);

    // Managing state via ngRx
    this.store.dispatch(new ShoppingListActions.AddIngredients(clonedIngredients));
  }

  onEditRecipe(event: Event): void {
    event.preventDefault();
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe(event: Event): void {
    event.preventDefault();

    // Managing state via service
    // this.recipeService.deleteRecipe(this.recipeId);

    // Managing state via ngRx
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.recipeId));

    this.router.navigate(['/recipes']);
  }

  getImagePath(): string {
    return this.recipeService.getRecipeImage(this.recipe);
  }

}
