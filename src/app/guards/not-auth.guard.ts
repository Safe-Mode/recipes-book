import { Injectable } from '@angular/core';
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
    private router: Router,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Managing state via rxjs
    // return this.authService.user$.pipe(
    //   take(1),
    //   map((user: User) => {
    //     return (user) ? this.router.createUrlTree(['/']) : true;
    //   })
    // );

    // Managing state via ngRx
    this.store.dispatch(new AuthActions.AutoLogin());

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
