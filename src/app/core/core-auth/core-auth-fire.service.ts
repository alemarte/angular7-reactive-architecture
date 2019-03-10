import {Injectable, Optional} from '@angular/core';

import {from, Observable, of} from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {AuthData, AuthToken, CoreAuthService, CoreAuthServiceConfig} from './core-auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import UserCredential = firebase.auth.UserCredential;
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
   providedIn: 'root'
})
export class CoreAuthFireService extends CoreAuthService {

  public constructor(@Optional() config: CoreAuthServiceConfig,
                     private afAuth: AngularFireAuth,
                     private afs: AngularFirestore) {
    super(config);
  }


  public isAuthenticated(): boolean {
    return localStorage.getItem(this.getAuthLocalStorageVar()) !== null;
  }

  public getAuthentication(): AuthToken {
    return JSON.parse(localStorage.getItem(this.getAuthLocalStorageVar()));
  }

  public signup(authData: AuthData): Observable<AuthToken> {
    return this.fireAuthenticationFlow(true, authData);
  }

  public signin(authData: AuthData): Observable<AuthToken> {
    return this.fireAuthenticationFlow(false, authData);
  }

  public logout() {
    localStorage.removeItem(this.getAuthLocalStorageVar());
    this.afAuth.auth.signOut().then();
  }

  public refreshToken() {
  }

  protected fireAuthenticationFlow(signup: boolean, authData: AuthData): Observable<any> {

    const email = authData.email;
    const docRef = this.afs.collection('users').doc(email);

    const obs = signup ? from(this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password))
      : from(this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password));

    return obs.pipe(
      switchMap((uc: UserCredential) => {
        return docRef.get().pipe(
          switchMap(value => {
            if (value.exists) {
              return of({ ...uc, username: value.data().username});
            }
            // firestore user document creation
            const doc = {...this.serviceConfig.customDefaultValues, email, username: authData.username};
            return from(docRef.set(doc)).pipe(map(() => {
              return { ...uc, username: authData.username};
            }));
          })
        );
      }),
      switchMap(auth => {
        return from(auth.user.getIdToken()).pipe(
          map( (token: string) => {
            const authToken = {
              username: auth.username,
              email: auth.user.email,
              token,
              refreshToken: auth.user.refreshToken
            };
            localStorage.setItem(this.getAuthLocalStorageVar(), JSON.stringify(authToken));
            return authToken;
          })
        );
      })
    );
  }
}
