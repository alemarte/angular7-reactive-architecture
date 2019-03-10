import { Component, OnInit } from '@angular/core';
import { HomeSandbox } from '../../home.sandbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  topUsers$ = this.sb.topUsers$;

  constructor(private sb: HomeSandbox) { }

  ngOnInit() {
  }

}
