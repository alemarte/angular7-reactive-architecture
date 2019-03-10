import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../../shared/game.model';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.scss']
})
export class GamesListComponent {

  @Input() games$: Observable<Game>;

}
