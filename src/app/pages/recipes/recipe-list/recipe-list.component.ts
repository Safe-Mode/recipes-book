import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { DataStorageService } from '../../../shared/data-storage.service';
import * as fromApp from '../../../store/app.reducer';
import * as fromRecipes from '../../../store/recipes/recipes.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  private recipesSub: Subscription;
  private recipesChangedSub: Subscription;

  recipes: Recipe[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit() {
    // Managing state via events
    // this.recipesSub = this.dataStorageService
    //   .fetchRecipes()
    //   .subscribe((recipes: Recipe[]) => {
    //     this.recipes = recipes;
    //   });
    //
    // this.recipesChangedSub = this.recipeService.recipesChanged$.subscribe((recipes: Recipe[]) => {
    //   this.recipes = recipes;
    // });

    // Managing state via ngRx
    this.recipesSub = this.store
      .select('recipes')
      .pipe(
        map(({ recipes }: fromRecipes.State) => recipes)
      )
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    this.recipesSub.unsubscribe();

    // Managing state via events
    // this.recipesChangedSub.unsubscribe();
  }

  createNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
