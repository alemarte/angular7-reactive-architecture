import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoreAuthFireService, CoreAuthModule, CoreAuthService, CoreAuthServiceConfig } from './core/core-auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { HeaderModule } from './ui/header';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducers';
import { GamesModule } from './games/games.module';
import { TagsModule } from './ui/tags/tags.module';

const authConfiguration = {
  authLocalStorageVar: 'master-mind-auth-token',
  customDefaultValues: {totalScore: 0, totalGames: 0}
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // Modules of global (core) services
    CoreAuthModule.forRoot(authConfiguration),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    // Modules of pages
    AuthModule,
    HomeModule,
    GamesModule,

    // Modules of reusable components, UI
    HeaderModule,
    TagsModule,

    StoreModule.forRoot(reducers),
  ],
  providers: [
    { provide: CoreAuthService, useClass: CoreAuthFireService },
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: FirestoreSettingsToken, useValue: {} } // https://github.com/angular/angularfire2/issues/1993
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
