import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from './auth/shared/auth.reducers';
import * as fromGames from './games/shared/games.reducers';

export const SELECT_AUTH = 'auth';

export interface AppState {
  auth: fromAuth.State;
  games: fromGames.State;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  games: fromGames.gamesReducer
};

