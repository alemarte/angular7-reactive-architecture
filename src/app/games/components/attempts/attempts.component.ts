import { Component, Input } from '@angular/core';
import { Game } from '../../shared/game.model';

@Component({
  selector: 'app-attempts',
  templateUrl: './attempts.component.html',
  styleUrls: ['./attempts.component.scss']
})
export class AttemptsComponent {

  @Input() game: Game;

}
