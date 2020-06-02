import { Action } from '@ngrx/store';
import { AuthResponseData } from '../../services/auth.service';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export class Login implements Action {
  readonly type = LOGIN;

  constructor(public payload: { localId: string, email: string, idToken: string, expiresIn: Date }) {
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthAction = Login | Logout;
