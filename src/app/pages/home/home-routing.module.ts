import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotAuthGuard } from '../../guards/not-auth.guard';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', canActivate: [NotAuthGuard], component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
