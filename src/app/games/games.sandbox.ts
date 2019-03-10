import { Injectable } from '@angular/core';

import * as fromApp from '../app.reducers';
import { Store } from '@ngrx/store';
import { GamesFirestoreService } from './shared/games-firestore.service';
import { Game } from './shared/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesSandbox {

  games$ = this.store.select(state => state.games);

  currentGame$ = this.store.select(state => state.games.currentGame);

  topUsers$ = this.store.select(state => state.games.topUsers);

  constructor(private gamesFirestoreService: GamesFirestoreService,
              private store: Store<fromApp.AppState>) {
  }

  public getById(id: string): Promise<Game> {
    return this.gamesFirestoreService.getById(id);
  }

  public play() {
    this.gamesFirestoreService.play();
  }

  public attempt(game: Game, value: string): Promise<boolean> {
    return this.gamesFirestoreService.attempt(game, value);
  }
}
