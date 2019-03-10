import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CoreAuthGuard} from '../core/core-auth';
import { GamesComponent } from './pages/games/games.component';
import { GameStartComponent } from './pages/game-start/game-start.component';
import { GamePlayComponent } from './pages/game-play/game-play.component';
import { GameShowComponent } from './pages/game-show/game-show.component';

const gamesRoutes: Routes = [
  { path: 'games', component: GamesComponent, canActivate: [CoreAuthGuard], children: [
      { path: '', component: GameStartComponent },
      { path: 'show/:id', component: GameShowComponent },
      { path: 'play', component: GamePlayComponent },
      // { path: 'new', component: CollectionEditComponent, canActivate: [CoreAuthGuard] },
      // { path: ':id', component: CollectionShowComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(gamesRoutes)
  ],
  exports: [RouterModule]
})
export class GamesRoutingModule {}
