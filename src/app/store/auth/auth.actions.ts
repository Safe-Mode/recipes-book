import { Action } from '@ngrx/store';

export const SIGN_UP_START = '[Auth] Sign Up Start';
export const LOGIN_START = '[Auth] Login Start';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const LOGOUT = '[Auth] Logout';
export const AUTH_FAIL = '[Auth] Login Fail';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const AUTO_LOGOUT = '[Auth] Auto Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string, password: string }) {
  }
}

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;

  constructor(public payload: { email: string, localId: string, idToken: string, expiresIn: Date }) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AuthFail implements Action {
  readonly type = AUTH_FAIL;

  constructor(public payload: string) {
  }
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthAction =
  SignUpStart
  | LoginStart
  | AuthSuccess
  | Logout
  | AuthFail
  | AutoLogin
  | ClearError;
