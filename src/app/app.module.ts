import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { API_KEY_TOKEN, AUTH_URL_TOKEN, BASE_URL_TOKEN } from './config';
import { environment } from '../environments/environment';
import { ShoppingListService } from './services/shopping-list.service';
import { RecipeService } from './services/recipe.service';
import { AuthInterceptorService } from './interceptors/auth-interceptor.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShortenPipe } from './shared/shorten.pipe';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './pages/shopping-list/shopping-edit/shopping-edit.component';
import { RecipeListComponent } from './pages/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './pages/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './pages/recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './pages/recipes/recipes.component';
import { RecipeEmptyComponent } from './pages/recipes/recipe-empty/recipe-empty.component';
import { RecipeEditComponent } from './pages/recipes/recipe-edit/recipe-edit.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { LogoComponent } from './shared/components/logo/logo.component';
import { ModalComponent } from './shared/components/modal/modal.component';

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
    AuthComponent,
    LogoComponent,
    ModalComponent
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
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
