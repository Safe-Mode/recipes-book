import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    data: { animation: 'Home' }
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule),
    data: { animation: 'Auth' }
  },
  {
    path: 'recipes',
    loadChildren: () => import('./pages/recipes/recipes.module').then(m => m.RecipesModule),
    data: { animation: 'Recipes' }
  }, {
    path: 'shopping-list',
    loadChildren: () => import('./pages/shopping-list/shopping-list.module').then(m => m.ShoppingListModule),
    data: { animation: 'ShoppingList' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
