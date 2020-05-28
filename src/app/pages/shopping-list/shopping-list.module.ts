import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingListEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ],
  imports: [
    FormsModule,
    SharedModule
  ]
})
export class ShoppingListModule {
}
