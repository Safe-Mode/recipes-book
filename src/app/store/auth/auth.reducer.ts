import { User } from '../../models/user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: User;
}

const initialState: State = {
  user: null
};

export function AuthReducer(state: State = initialState, action: AuthActions.AuthAction) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const { payload: { idToken, email, localId, expiresIn } } = action;
      const user = new User(email, localId, idToken, expiresIn);

      return {
        ...state,
        user
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}
