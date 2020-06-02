import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../store/auth/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
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
    //     // TODO: enhance functionality for 'auth' page against valid user
    //     return (user) ? true : this.router.createUrlTree(['/auth']);
    //   })
    // );

    // Managing state via ngRx
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
