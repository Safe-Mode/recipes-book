import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';
import { ShoppingListComponent } from './shopping-list.component';

const routes: Routes = [
  { path: 'shopping-list', canActivate: [AuthGuard], component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {
}
