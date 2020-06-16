import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from './models/user.model';
import { AuthService } from './services/auth.service';
import * as AuthActions from './store/auth/auth.actions';
import * as RecipesActions from './store/recipes/recipes.actions';
import * as ShoppingListActions from './store/shopping-list/shopping-list.actions';
import * as fromApp from './store/app.reducer';
import * as fromAuth from './store/auth/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private user$: Subscription;
  isAuthenticated = false;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    // Managing state via rxjs
    // this.authService.autoLogIn();

    // Managing state via ngRx
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }

    this.user$ = this.store
      .select('auth')
      .pipe(
        map(({ user }: fromAuth.State) => user)
      )
      .subscribe((user: User) => {
        this.isAuthenticated = Boolean(user);
      });

    if (this.isAuthenticated) {
      this.store.dispatch(new RecipesActions.FetchRecipes());
      this.store.dispatch(new ShoppingListActions.FetchIngredients());
    }
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

}
