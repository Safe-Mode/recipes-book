import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '../services/auth.service';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../store/auth/auth.reducer';
import * as AuthActions from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private router: Router,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }

    return this.store
      .select('auth')
      .pipe(
        take(1),
        map((authState: fromAuth.State) => {
          return (authState.user) ? this.router.createUrlTree(['/recipes']) : true;
        })
      );
  }

}
