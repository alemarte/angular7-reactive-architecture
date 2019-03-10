import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs';

export interface AuthData {
  email: string;
  username: string;
  password: string;
}

export interface AuthToken {
  email: string;
  username: string;
  token: string;
  refreshToken: string;
}

export class CoreAuthServiceConfig {
  public authLocalStorageVar;
  public customDefaultValues: any;
}

const defaultConfig = {
  authLocalStorageVar: 'core-auth-token',
  customDefaultValues: {}
}

@Injectable({
  providedIn: 'root'
})
export abstract class CoreAuthService {

  protected serviceConfig: CoreAuthServiceConfig = defaultConfig;

  protected constructor(@Optional() config: CoreAuthServiceConfig) {
    if (config) {
      this.serviceConfig = config;
    }
  }

  protected getAuthLocalStorageVar() {
    return this.serviceConfig.authLocalStorageVar;
  }

  public abstract isAuthenticated(): boolean;

  public abstract getAuthentication(): AuthToken;

  public abstract signup(authData: AuthData): Observable<AuthToken>;

  public abstract signin(authData: AuthData): Observable<AuthToken>;

  public abstract logout();

  public abstract refreshToken();

}
