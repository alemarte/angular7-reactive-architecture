import { Store } from '@ngrx/store';

import * as fromApp from '../app.reducers';
import * as AuthActions from './shared/auth.actions';
import { AuthToken, CoreAuthService } from '../core/core-auth';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSandbox {

  constructor(private router: Router,
              private appService: AppService,
              private authService: CoreAuthService,
              private store: Store<fromApp.AppState>) {}

  public signin(email: string, password: string): Observable<AuthToken> {
    return this.authService.signin({email, password, username: null}).pipe(
      map(authToken => {
        this.store.dispatch(new AuthActions.AuthenticationSuccess(authToken.email, authToken.username, authToken.token));
        return authToken;
      })
    );
  }

  public signup(email: string, username: string, password: string): Observable<AuthToken> {
    return this.authService.signup({email, username, password}).pipe(
      map(authToken => {
        this.store.dispatch(new AuthActions.AuthenticationSuccess(authToken.email, authToken.username, authToken.token));
        return authToken;
      })
    );
  }

}
