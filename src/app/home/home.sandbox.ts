import { Injectable } from '@angular/core';

import * as fromApp from '../app.reducers';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class HomeSandbox {

  topUsers$ = this.store.select(state => state.games.topUsers);

  constructor(private store: Store<fromApp.AppState>) {}

}
