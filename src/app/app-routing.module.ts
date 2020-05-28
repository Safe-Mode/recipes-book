import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecipesRoutingModule } from './pages/recipes/recipes-routing.module';
import { ShoppingListRoutingModule } from './pages/shopping-list/shopping-list-routing.module';
import { AuthRoutingModule } from './pages/auth/auth-routing.module';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RecipesRoutingModule,
    ShoppingListRoutingModule,
    AuthRoutingModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
