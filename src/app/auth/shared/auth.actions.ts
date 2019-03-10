import { Action } from '@ngrx/store';

export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS';

export const LOGOUT = 'LOGOUT';

export class AuthenticationSuccess implements Action {
  readonly type = AUTHENTICATION_SUCCESS;
  readonly payload: {email: string, username: string, token: string};
  constructor(email: string, username: string, token: string) {
    this.payload = {email, username, token};
  }
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions = AuthenticationSuccess | Logout;
