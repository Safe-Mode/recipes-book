import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../../../shared/models/recipe.model';
import { RecipeService } from '../../../../services/recipe.service';

enum Length {
  recipeName = 45,
  recipeDesc = 100
}

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  strLength = Length;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  getImagePath(): string {
    return this.recipeService.getRecipeImage(this.recipe);
  }

}
