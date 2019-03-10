import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of, Subject } from 'rxjs';

import * as firebase from 'firebase/app';

import { Game } from './game.model';
import { MasterMindService } from '../../master-mind.service';
import { map, take } from 'rxjs/operators';
import QuerySnapshot = firebase.firestore.QuerySnapshot;
import { User } from './user.model';
import { AbstractFirestoreService } from './abstract-firestore.service';


@Injectable({
  providedIn: 'root'
})
export class GamesFirestoreService extends AbstractFirestoreService {

  // last games
  private gamesSubscription;
  private gamesSubject = new Subject<Game[]>();

  // top users
  private topUserSubscription;
  private topUserSubject = new Subject<User[]>();

  // current game
  private currentGameSubscription;
  private currentGameSubject = new Subject<Game>();
  private currentGame: Game;

  constructor(protected afs: AngularFirestore, private masterMindService: MasterMindService) {
    super(afs);
  }

  // ----------------------------
  // API
  // ----------------------------

  public observeGames(): Observable<Game[]> {
    return this.gamesSubject.asObservable();
  }

  public observeCurrentGame(): Observable<Game> {
    return this.currentGameSubject.asObservable();
  }

  public observeTopUsers(): Observable<any> {
    return this.topUserSubject.asObservable();
  }

  public getById(id: string): Promise<Game> {
    return this.userGamesCollection().doc(id).get().pipe(map(doc => doc.data() as Game)).toPromise();
  }

  public play() {
    this.userCurrentGame().get().pipe(take(1)).subscribe((data: QuerySnapshot) => {
      if (data.size === 0) {
        const game = this.masterMindService.create();
        this.userGamesCollection().add(game).then(docRef => {
          this.userGamesCollection().doc(docRef.id).update({id: docRef.id}).then(() => {
            return { ...game, id: docRef.id } as Game;
          });
        });
      }
    });
  }

  public attempt(game: Game, value: string): Promise<boolean> {

    const result = this.masterMindService.check(game.code, value);

    const updateValue = {
      attempts: game.attempts + 1,
      attemptsDetail: [...game.attemptsDetail, {
        value,
        correctWrongPosition: result.wrongPosition,
        correctRightPosition: result.rightPosition
      }]
    }

    if (result.success) {

      // update game with success flag and score
      const endedAt = new Date().getTime();
      const score = this.masterMindService.score(endedAt - game.startedAt, game.attempts + 1);

      updateValue['terminated'] = true;
      updateValue['endedAt'] = endedAt;
      updateValue['score'] = score;

      this.userGamesCollection().doc(game.id).update(updateValue).then(() => {

        // update user grand total and total games
        this.userDocument().get().pipe(take(1)).subscribe(user => {
          let totalScore = user.data()['totalScore'];
          totalScore = isNaN(totalScore) ? score : totalScore + score;
          let totalGames = user.data()['totalGames'];
          totalGames = isNaN(totalGames) ? totalGames : totalGames + 1;
          this.userDocument().update({totalScore, totalGames}).then();
        });
      });
      return of(true).toPromise();
    }

    this.userGamesCollection().doc(game.id).update(updateValue).then();
    return of(false).toPromise();
  }

  // ----------------------------
  // Abstract and Support.
  // ----------------------------

  protected clearUserData() {
    this.currentGame = null;
  }

  protected clearUserListeners() {
    if (this.gamesSubscription) {
      this.gamesSubscription.unsubscribe();
    }
    if (this.currentGameSubscription) {
      this.currentGameSubscription.unsubscribe();
    }
  }

  protected initializeUserSubscriptionsAndListeners() {

    // subscribe current game
    this.currentGameSubscription = this.userCurrentGame().valueChanges().subscribe((data: Game[]) => {
      if (data.length === 0 && this.currentGame) {
        this.currentGame = null;
        this.currentGameSubject.next(null);
      } else if (data.length === 1) {
        this.currentGame = data[0];
        this.currentGameSubject.next(data[0]);
      } else if (data.length > 1) {
        console.error('Something went wrong ...');
      }
    });

    // subscribe to last games
    this.gamesSubscription = this.userDocument().collection('games', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('terminated', '==', true);
      query = query.orderBy('startedAt', 'desc');
      query = query.limit(10);
      return query;
    }).valueChanges().subscribe(data => {
      this.gamesSubject.next(data as Game[]);
    });
  }

  protected initializeGlobalSubscriptionAndListeners() {
    // subscribe to top users
    this.topUserSubscription = this.afs.collection('users', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.orderBy('totalScore', 'desc');
      query = query.limit(10);
      return query;
    }).valueChanges().subscribe( data => {
      this.topUserSubject.next(data as User[]);
    });
  }

  private userGamesCollection(): AngularFirestoreCollection {
    return this.userDocument().collection('games');
  }

  private userCurrentGame(): AngularFirestoreCollection {
    return this.userDocument().collection('games', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('terminated', '==', false);
      return query;
    });
  }
}
