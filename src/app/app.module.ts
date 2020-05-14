import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { API_KEY_TOKEN, AUTH_URL_TOKEN, BASE_URL_TOKEN } from './config';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './pages/shopping-list/shopping-edit/shopping-edit.component';
import { RecipeListComponent } from './pages/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './pages/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './pages/recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './services/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeEmptyComponent } from './pages/recipes/recipe-empty/recipe-empty.component';
import { RecipeEditComponent } from './pages/recipes/recipe-edit/recipe-edit.component';
import { RecipeService } from './services/recipe.service';
import { ShortenPipe } from './shared/shorten.pipe';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './pages/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipesComponent,
    DropdownDirective,
    RecipeEmptyComponent,
    RecipeEditComponent,
    ShortenPipe,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: BASE_URL_TOKEN,
      useValue: environment.url.base
    },
    {
      provide: AUTH_URL_TOKEN,
      useValue: environment.url.auth
    },
    {
      provide: API_KEY_TOKEN,
      useValue: environment.apiKey
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
