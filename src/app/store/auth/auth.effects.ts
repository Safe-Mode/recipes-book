import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { API_KEY_TOKEN, AUTH_URL_TOKEN } from '../../config';
import { AuthResponseData } from '../../services/auth.service';
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
  login$ = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap(({ payload: { email, password } }: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          `${this.authUrl}accounts:signInWithPassword?key=${this.apiKey}`,
          { email, password, returnSecureToken: true }
        )
        .pipe(
          map((authData: AuthResponseData) => {
            const expDateStamp = new Date().getTime() + +authData.expiresIn * MS_PER_SEC;

            return new AuthActions.Login({
              localId: authData.localId,
              idToken: authData.idToken,
              email: authData.email,
              expiresIn: new Date(expDateStamp)
            });
          }),
          catchError(({ error }: HttpErrorResponse) => {
            const isUnknownError = !error || !error.error || !ErrorMessage[error.error.message];
            const errorMessage = (isUnknownError) ? ErrorMessage.DEFAULT : ErrorMessage[error.error.message];

            return of(new AuthActions.LoginFail(errorMessage));
          })
        );
    })
  );

  @Effect({
    dispatch: false
  })
  loginSuccess$ = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(
    @Inject(AUTH_URL_TOKEN)
    private authUrl: string,
    @Inject(API_KEY_TOKEN)
    private apiKey: string,
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {
  }
}
