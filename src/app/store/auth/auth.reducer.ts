import { User } from '../../models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  isLoading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  isLoading: false
};

export function AuthReducer(state: State = initialState, action: AuthActions.AuthAction) {
  switch (action.type) {
    case AuthActions.SIGN_UP_START:
    case AuthActions.LOGIN_START:
      return {
        ...state,
        authError: null,
        isLoading: true
      };
    case AuthActions.AUTH_SUCCESS:
      const { payload: { idToken, email, localId, expiresIn } } = action;
      const user = new User(email, localId, idToken, expiresIn);

      return {
        ...state,
        user,
        isLoading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.AUTH_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        isLoading: false
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
