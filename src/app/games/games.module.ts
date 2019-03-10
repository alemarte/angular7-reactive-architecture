import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GamesRoutingModule } from './games-routing.module';
import { TagsModule } from '../ui/tags/tags.module';
import { GamesComponent } from './pages/games/games.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GameStartComponent } from './pages/game-start/game-start.component';
import { GamePlayComponent } from './pages/game-play/game-play.component';
import { GameShowComponent } from './pages/game-show/game-show.component';
import { AttemptsComponent } from './components/attempts/attempts.component';
import { TopUsersListComponent } from './components/top-users-list/top-users-list.component';
import { PlayComponent } from './components/play/play.component';

@NgModule({
  declarations: [
    GamesComponent,
    GameStartComponent,
    GamePlayComponent,
    GameShowComponent,

    GamesListComponent,
    TopUsersListComponent,
    PlayComponent,
    AttemptsComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TagsModule,
    GamesRoutingModule
  ]
})
export class GamesModule {}
