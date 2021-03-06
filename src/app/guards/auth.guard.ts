import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../store/auth/auth.reducer';
import * as AuthActions from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: object,
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Managing state via rxjs
    // return this.authService.user$.pipe(
    //   take(1),
    //   map((user: User) => {
    //     return (user) ? true : this.router.createUrlTree(['/auth']);
    //   })
    // );

    // Managing state via ngRx
    if (isPlatformBrowser(this.platformId)) {
      this.store.dispatch(new AuthActions.AutoLogin());
    }

    return this.store
      .select('auth')
      .pipe(
        take(1),
        map((authState: fromAuth.State) => {
          // TODO: enhance functionality for 'auth' page against valid user
          return (authState.user) ? true : this.router.createUrlTree(['/auth']);
        })
      );
  }

}
