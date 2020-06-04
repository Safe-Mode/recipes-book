import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { API_KEY_TOKEN, AUTH_URL_TOKEN } from '../../config';
import { User } from '../../models/user.model';
import { AuthResponseData, AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';

enum ErrorMessage {
  EMAIL_EXISTS = 'This email is already exists',
  EMAIL_NOT_FOUND = 'This email does not exists. You need to sign up',
  INVALID_PASSWORD = 'You have entered invalid password',
  DEFAULT = 'Unknown error is occurred'
}

const MS_PER_SEC = 1000;

@Injectable()
export class AuthEffects {
  @Effect()
  signUp$ = this.actions$.pipe(
    ofType(AuthActions.SIGN_UP_START),
    switchMap(({ payload: { email, password } }: AuthActions.SignUpStart) => {
      return this.http
        .post<AuthResponseData>(
          `${this.authUrl}accounts:signUp?key=${this.apiKey}`,
          { email, password, returnSecureToken: true }
        )
        .pipe(
          map((authData: AuthResponseData) => this.handleAuth(authData)),
          catchError(({ error }: HttpErrorResponse) => AuthEffects.handleError(error))
        );
    })
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap(({ payload: { email, password } }: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          `${this.authUrl}accounts:signInWithPassword?key=${this.apiKey}`,
          { email, password, returnSecureToken: true }
        )
        .pipe(
          map((authData: AuthResponseData) => this.handleAuth(authData)),
          catchError(({ error }: HttpErrorResponse) => AuthEffects.handleError(error))
        );
    })
  );

  @Effect({
    dispatch: false
  })
  logout$ = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData')
      this.authService.clearLogoutTimer();
      this.router.navigate(['/auth']);
    })
  );

  @Effect({
    dispatch: false
  })
  loginRedirect$ = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect()
  autoLogin$ = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const dummyAction = { type: 'DUMMY' };
      const userData = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return dummyAction;
      }

      const expDate = new Date(userData._tokenExpDate);
      const user: User = new User(userData.email, userData.id, userData._token, expDate);

      if (user.token) {
        const expDurationStamp = expDate.getTime() - new Date().getTime();

        this.authService.setLogoutTimer(expDurationStamp);

        return new AuthActions.AuthSuccess({
          idToken: userData._token,
          email: userData.email,
          localId: userData.id,
          expiresIn: expDate
        });
      } else {
        return dummyAction;
      }
    })
  );

  constructor(
    @Inject(AUTH_URL_TOKEN)
    private authUrl: string,
    @Inject(API_KEY_TOKEN)
    private apiKey: string,
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
  }

  private static handleError(error): Observable<AuthActions.AuthFail> {
    const isUnknownError = !error || !error.error || !ErrorMessage[error.error.message];
    const errorMessage = (isUnknownError) ? ErrorMessage.DEFAULT : ErrorMessage[error.error.message];

    return of(new AuthActions.AuthFail(errorMessage));
  }

  private handleAuth({ expiresIn, localId, idToken, email }: AuthResponseData): AuthActions.AuthSuccess {
    const expDateStamp = new Date().getTime() + +expiresIn * MS_PER_SEC;
    const user = new User(email, localId, idToken, new Date(expDateStamp));

    localStorage.setItem('userData', JSON.stringify(user));
    this.authService.setLogoutTimer(+expiresIn * MS_PER_SEC);

    return new AuthActions.AuthSuccess({
      localId,
      idToken,
      email,
      expiresIn: new Date(expDateStamp)
    });
  }
}
