import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent {

  @Input() playing: boolean;

  @Output() play = new EventEmitter();

}
