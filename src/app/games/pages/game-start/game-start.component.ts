import { Component, OnInit } from '@angular/core';
import { GamesSandbox } from '../../games.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-game-start',
  templateUrl: './game-start.component.html',
  styleUrls: ['./game-start.component.scss']
})
export class GameStartComponent implements OnInit {

  playing$ = this.sb.currentGame$.pipe(map(currentGame => currentGame.playing));

  constructor(private sb: GamesSandbox,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  play() {
    this.router.navigate(['play'], {relativeTo: this.route}).then();
  }

}
