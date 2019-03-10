import * as AuthActions from './auth.actions';

export interface State {
  authenticated: boolean;
  token: string;
  username: string;
  email: string;
}

const initialState: State = {
  authenticated: false,
  token: null,
  username: null,
  email: null,
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.AUTHENTICATION_SUCCESS):
      return {
        ...state,
        authenticated: true,
        username: action.payload.username,
        token: action.payload.token,
        email: action.payload.email
      };
    case (AuthActions.LOGOUT):
      return {
        ...state,
        username: null,
        token: null,
        authenticated: false,
        email: null
      };
    default:
      return state;
  }
}
