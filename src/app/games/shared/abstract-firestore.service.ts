import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractFirestoreService {

  // logged user info
  private userSubscription;
  protected user: string;

  protected constructor(protected afs: AngularFirestore) {
    this.initializeGlobalSubscriptionAndListeners();
  }

  // ----------------------------
  // API
  // ----------------------------

  public configureUserSubscription(user$: Observable<{username: string}>) {
    this.userSubscription = user$.subscribe(authData => this.userAuthenticationEventHandler(authData));
  }

  private userAuthenticationEventHandler(authData) {

    // logout event
    if (!authData || !authData.email) {
      this.user = null;
      this.clearUserListeners();
      this.clearUserData();
      return;
    }

    // same user
    if ((this.user && this.user === authData.email)) {
      return;
    }

    // initialize new logged user
    this.clearUserListeners();
    this.clearUserData();
    this.user = authData.email;
    this.initializeUserSubscriptionsAndListeners();

  }

  protected userDocument(): AngularFirestoreDocument {
    return this.afs.collection('users').doc(this.user);
  }

  protected abstract clearUserData();

  protected abstract clearUserListeners();

  protected abstract initializeGlobalSubscriptionAndListeners();

  protected abstract initializeUserSubscriptionsAndListeners();

}
