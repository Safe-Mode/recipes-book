import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from '../../models/user.model';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../services/auth.service';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../store/auth/auth.reducer';
import * as AuthActions from '../../store/auth/auth.actions';
import * as RecipesActions from '../../store/recipes/recipes.actions';
import * as ShoppingListActions from '../../store/shopping-list/shopping-list.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  private user$: Subscription;
  isAuthenticated = false;

  constructor(
    private router: Router,
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    // Managing state via rxjs
    // this.userSub$ = this.authService.user$.subscribe((user: User) => {
    //   this.isAuthenticated = Boolean(user);
    // });

    // Managing state via ngRx
    this.user$ = this.store
      .select('auth')
      .pipe(
        map((authState: fromAuth.State) => authState.user)
      )
      .subscribe((user: User) => {
        this.isAuthenticated = Boolean(user);
      });
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  onSaveData(event: Event): void {
    event.preventDefault();

    // Managing state via service
    // this.dataStorageService.storeRecipes();
    // this.dataStorageService.storeIngredients();

    // Managing state via ngRx
    this.store.dispatch(new RecipesActions.StoreRecipes());
    this.store.dispatch(new ShoppingListActions.StoreIngredients());
  }

  onFetchData(event: Event): void {
    event.preventDefault();

    // Managing state via service
    // this.dataStorageService
    //   .fetchRecipes()
    //   .subscribe();
    //
    // this.dataStorageService
    //   .fetchIngredients()
    //   .subscribe();

    // Manging state via ngRx
    this.store.dispatch(new RecipesActions.FetchRecipes());
    this.store.dispatch(new ShoppingListActions.FetchIngredients());
  }

  onLogOut(event: Event): void {
    event.preventDefault();

    // Manging state via rxjs
    // this.authService.logOutUser();

    // Manging state via ngRx
    this.store.dispatch(new AuthActions.Logout());
  }

  isUrlEqualTo(url: string): boolean {
    return this.router.url === url;
  }

}
