import { Component } from '@angular/core';
import { GamesSandbox } from '../../games.sandbox';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-show',
  templateUrl: './game-show.component.html',
  styleUrls: ['./game-show.component.scss']
})
export class GameShowComponent {

  game$;

  id: string;

  playing$ = this.sb.currentGame$.pipe(map(currentGame => currentGame.playing));

  constructor(private sb: GamesSandbox,
              private router: Router,
              private route: ActivatedRoute) {

    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.game$ = this.sb.getById(this.id);
    });
  }

  play() {
    this.router.navigate(['../../play'], {relativeTo: this.route}).then();
  }

}
