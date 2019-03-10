import { Component, OnInit } from '@angular/core';
import { AppSandbox } from './app.sandbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  authState$ = this.sb.authState$;

  currentGame$ = this.sb.currentGame$;

  constructor(private sb: AppSandbox) {}

  public ngOnInit(): void {
    this.sb.initializeApp();
  }

  public onLogout() {
    this.sb.logout();
  }
}
