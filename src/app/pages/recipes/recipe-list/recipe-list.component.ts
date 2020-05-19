import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../../../shared/models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { DataStorageService } from '../../../shared/data-storage.service';

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
    private dataStorageService: DataStorageService
  ) { }

  ngOnInit() {
    this.recipesSub = this.dataStorageService
      .fetchRecipes()
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });

    this.recipesChangedSub = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.recipesSub.unsubscribe();
    this.recipesChangedSub.unsubscribe();
  }

  createNewRecipe(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
