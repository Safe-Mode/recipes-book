import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from './models/user.model';
import { AuthService } from './services/auth.service';
import { AnimationsService } from './services/animations.service';
import * as AuthActions from './store/auth/auth.actions';
import * as RecipesActions from './store/recipes/recipes.actions';
import * as ShoppingListActions from './store/shopping-list/shopping-list.actions';
import * as fromApp from './store/app.reducer';
import * as fromAuth from './store/auth/auth.reducer';
import * as Animation from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('routeAnimations', [
      transition('Recipes => ShoppingList', Animation.slide()),
      transition('ShoppingList => Recipes', Animation.slide(true)),
      transition('Auth => *', Animation.slide(true)),
      transition('* => Auth', Animation.slide())
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('outlet', { static: true }) routerOutlet: RouterOutlet;
  private user$: Subscription;
  isAuthenticated = false;

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
    private animations: AnimationsService
  ) {
  }

  ngOnInit(): void {
    // Managing state via rxjs
    // this.authService.autoLogIn();

    // Managing state via ngRx
    // TODO: find out should it be here or not
    // if (isPlatformBrowser(this.platformId)) {
    //   this.store.dispatch(new AuthActions.AutoLogin());
    // }

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

  prepareRoute(outlet: RouterOutlet): boolean {
    return this.animations.prepareRoute(outlet);
  }

}
