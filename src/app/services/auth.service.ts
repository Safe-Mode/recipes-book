import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { API_KEY_TOKEN, AUTH_URL_TOKEN } from '../config';
import { User } from '../models/user.model';

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

  user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);

  constructor(
    @Inject(AUTH_URL_TOKEN)
    private authUrl: string,
    @Inject(API_KEY_TOKEN)
    private apiKey: string,
    private http: HttpClient,
    private router: Router
  ) {
  }

  private static handleError({ error }): Observable<AuthResponseData> {
    const errorMessage = (!error || !error.error) ? ErrorMessage.DEFAULT : ErrorMessage[error.error.message];
    return throwError(errorMessage);
  }

  private handleAuth({ localId, email, idToken, expiresIn }: AuthResponseData): void {
    const expDateStamp = new Date().getTime() + +expiresIn * 1000;
    const user = new User(email, localId, idToken, new Date(expDateStamp));
    this.user$.next(user);
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
    this.user$.next(null);
    this.router.navigate(['/auth']);
  }

}
