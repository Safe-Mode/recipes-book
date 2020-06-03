import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { API_KEY_TOKEN, AUTH_URL_TOKEN } from '../config';
import { User } from '../models/user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../store/auth/auth.actions';

const MS_PER_SEC = 1000;

enum ErrorMessage {
  EMAIL_EXISTS = 'This email is already exists',
  EMAIL_NOT_FOUND = 'This email does not exists. You need to sign up',
  INVALID_PASSWORD = 'You have entered invalid password',
  DEFAULT = 'Unknown error is occurred'
}

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userExpTimer: any;
  // user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    @Inject(AUTH_URL_TOKEN)
    private authUrl: string,
    @Inject(API_KEY_TOKEN)
    private apiKey: string,
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
  }

  private static handleError({ error }): Observable<AuthResponseData> {
    const isUnknownError = !error || !error.error || !ErrorMessage[error.error.message];
    const errorMessage = (isUnknownError) ? ErrorMessage.DEFAULT : ErrorMessage[error.error.message];
    return throwError(errorMessage);
  }

  private handleAuth({ localId, email, idToken, expiresIn }: AuthResponseData): void {
    const expDateStamp = new Date().getTime() + +expiresIn * MS_PER_SEC;
    const user = new User(email, localId, idToken, new Date(expDateStamp));

    // Managing state via rxjs
    // this.user$.next(user);

    // Managing state via ngRx
    this.store.dispatch(new AuthActions.Login({ localId, email, idToken, expiresIn: new Date(expDateStamp) }));

    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogOut(expDateStamp);
  }

  signUpUser(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        `${this.authUrl}accounts:signUp?key=${this.apiKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(AuthService.handleError),
        tap((resData: AuthResponseData) => this.handleAuth(resData))
      );
  }

  logInUser(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        `${this.authUrl}accounts:signInWithPassword?key=${this.apiKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(AuthService.handleError),
        tap((resData: AuthResponseData) => this.handleAuth(resData))
      );
  }

  logOutUser(): void {
    localStorage.removeItem('userData');
    clearTimeout(this.userExpTimer);
    this.userExpTimer = null;

    // Managing state via rxjs
    // this.user$.next(null);

    // Manging state via ngRx
    this.store.dispatch(new AuthActions.Logout());

    this.router.navigate(['/auth']);
  }

  autoLogIn(): void {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const expDate = new Date(userData._tokenExpDate);
    const user: User = new User(userData.email, userData.id, userData._token, expDate);

    if (user.token) {
      const expDurationStamp = expDate.getTime() - new Date().getTime();

      // Managing state via rxjs
      // this.user$.next(user);

      // Managing state via ngRx
      this.store.dispatch(new AuthActions.Login({
        idToken: userData._token,
        email: userData.email,
        localId: userData.id,
        expiresIn: expDate
      }));

      this.autoLogOut(expDurationStamp);
    }
  }

  autoLogOut(expDateStamp: number): void {
    this.userExpTimer = setTimeout(() => this.logOutUser(), expDateStamp);
  }

}
