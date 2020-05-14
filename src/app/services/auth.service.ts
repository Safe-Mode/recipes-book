import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { API_KEY_TOKEN, AUTH_URL_TOKEN } from '../config';

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

  constructor(
    @Inject(AUTH_URL_TOKEN)
    private authUrl: string,
    @Inject(API_KEY_TOKEN)
    private apiKey: string,
    private http: HttpClient
  ) {
  }

  private static handleError({ error }): Observable<AuthResponseData> {
    const errorMessage = (!error || !error.error) ? ErrorMessage.DEFAULT : ErrorMessage[error.error.message];
    return throwError(errorMessage);
  }

  signUpUser(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        `${this.authUrl}accounts:signUp?key=${this.apiKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(AuthService.handleError)
      );
  }

  logInUser(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(
        `${this.authUrl}accounts:signInWithPassword?key=${this.apiKey}`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(AuthService.handleError)
      );
  }
}
