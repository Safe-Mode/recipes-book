import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotAuthGuard } from '../../guards/not-auth.guard';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: '', component: AuthComponent, canActivate: [NotAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
