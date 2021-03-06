import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';
import { RecipesComponent } from './recipes.component';
import { RecipeEmptyComponent } from './recipe-empty/recipe-empty.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolverService } from '../../services/recipes-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeEmptyComponent },
      { path: 'new', component: RecipeEditComponent, data: { animation: 'NewRecipe' } },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService], data: { animation: 'Recipe' } },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService], data: { animation: 'EditRecipe' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}
