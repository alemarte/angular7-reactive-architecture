import { Component, OnInit } from '@angular/core';
import { GamesSandbox } from '../../games.sandbox';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {

  form: FormGroup;

  currentGame$ = this.sb.currentGame$;

  constructor(private sb: GamesSandbox,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.sb.play();

    this.form = new FormGroup({
      'attempt': new FormControl(null,
        [Validators.required, Validators.maxLength(3), Validators.minLength(3)])
    });
  }

  submit(game) {
    this.sb.attempt(game, this.form.value.attempt).then(success => {
      if (success) {
        this.router.navigate(['../show/' + game.id], {relativeTo: this.route}).then();
      }
    });
  }

}
