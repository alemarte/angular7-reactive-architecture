import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CoreAuthService } from './core/core-auth';

import * as fromApp from './app.reducers';
import * as AuthActions from './auth/shared/auth.actions';

import { AppService } from './app.service';
import { GamesFirestoreService } from './games/shared/games-firestore.service';
import { GamesUpdate, GameUpdate, TopUsersUpdate } from './games/shared/games.actions';

@Injectable({
  providedIn: 'root'
})
export class AppSandbox {

  authState$ = this.store.select(state => state.auth);

  currentGame$ = this.store.select(state => state.games.currentGame);

  constructor(private router: Router,
              private authService: CoreAuthService,
              private appService: AppService,
              private gamesFirestoreService: GamesFirestoreService,
              private store: Store<fromApp.AppState>) {}

  public initializeApp() {
    this.gamesFirestoreService.configureUserSubscription(this.authState$);

    this.gamesFirestoreService.observeGames().subscribe( games => {
      this.store.dispatch(new GamesUpdate(games));
    });
    this.gamesFirestoreService.observeCurrentGame().subscribe(game => {
      this.store.dispatch(new GameUpdate(game));
    });

    this.gamesFirestoreService.observeTopUsers().subscribe(topUsers => {
      this.store.dispatch(new TopUsersUpdate(topUsers));
    });

    if (this.authService.isAuthenticated()) {
      const authToken = this.authService.getAuthentication();
      this.store.dispatch(new AuthActions.AuthenticationSuccess(authToken.email, authToken.username, authToken.token));
    } else {
      this.store.dispatch(new AuthActions.Logout());
    }

  }

  public logout() {
    this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']).then();
  }

}
