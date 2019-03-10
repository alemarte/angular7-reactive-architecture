import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {take, switchMap} from 'rxjs/operators';

import * as fromApp from '../../app.reducers';
import * as fromAuth from './auth.reducers';
import {SELECT_AUTH} from '../../app.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromApp.AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(SELECT_AUTH).pipe(
      take(1),
      switchMap((authState: fromAuth.State) => {
        let copiedReq;
        if (authState.token) {
          copiedReq = req.clone({params: req.params.set('auth', authState.token)});
        } else {
          copiedReq = req.clone();
        }
        return next.handle(copiedReq);
      })
    );
    // return null;
  }
}
