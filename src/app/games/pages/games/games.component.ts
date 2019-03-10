import { Component } from '@angular/core';
import { GamesSandbox } from '../../games.sandbox';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent {

  games$ = this.sb.games$;

  topUsers$ = this.sb.topUsers$;

  constructor(private sb: GamesSandbox) { }

}
