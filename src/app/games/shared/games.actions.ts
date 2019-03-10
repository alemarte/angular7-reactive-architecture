import { Action } from '@ngrx/store';
import { Game } from './game.model';

export const GAMES_UPDATE = 'GAMES_UPDATE';

export const GAME_UPDATE = 'GAME_UPDATE';

export const TOP_USERS_UPDATE = 'TOP_USERS_UPDATE';

export class GamesUpdate implements Action {
  readonly type = GAMES_UPDATE;
  readonly payload: { games: Game[] };

  constructor(games: Game[]) {
    this.payload = { games };
  }
}

export class GameUpdate implements Action {
  readonly type = GAME_UPDATE;
  readonly payload: { game: Game };

  constructor(game: Game) {
    this.payload = { game };
  }
}

export class TopUsersUpdate implements Action {
  readonly type = TOP_USERS_UPDATE;
  readonly payload: { topUsers: any[] };

  constructor(topUsers: any[]) {
    this.payload = { topUsers };
  }
}


export type GamesActions = GamesUpdate | GameUpdate | TopUsersUpdate;
