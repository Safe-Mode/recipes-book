import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../store/auth/auth.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Managing state via rxjs
    // return this.authService.user$.pipe(
    //   take(1),
    //   exhaustMap((user: User) => {
    //     if (!user) {
    //       return next.handle(req);
    //     }
    //     const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
    //     return next.handle(modifiedReq);
    //   })
    // );

    // Managing state via ngRx
    return this.store
      .select('auth')
      .pipe(
        take(1),
        map((authState: fromAuth.State) => authState.user),
        exhaustMap((user: User) => {
          if (!user) {
            return next.handle(req);
          }
          const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token) });
          return next.handle(modifiedReq);
        })
      );
  }

}
