import * as GamesActions from './games.actions';
import { Game } from './game.model';
import { User } from './user.model';

export interface State {
  games: Game[];
  currentGame: {
    playing: boolean,
    game: Game,
  };
  topUsers: User[];
}

const initialState: State = {
  games: [],
  currentGame: { playing: false, game: null},
  topUsers: []
};

export function gamesReducer(state = initialState, action: GamesActions.GamesActions) {

  switch (action.type) {

    case (GamesActions.GAMES_UPDATE): {
      const newState = {...state};
      newState.games = action.payload.games;
      return newState;
    }

    case (GamesActions.GAME_UPDATE): {
      const newState = {...state};
      newState.currentGame = { playing: action.payload.game !== null, game: {...action.payload.game}};
      return newState;
    }

    case (GamesActions.TOP_USERS_UPDATE): {
      const newState = {...state};
      newState.topUsers = action.payload.topUsers;
      return newState;
    }

    default:
      return state;
  }
}


