import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {CoreAuthService} from './core-auth.service';

@Injectable({
  providedIn: 'root'
})
export class CoreAuthGuard implements CanActivate {

  constructor(private authService: CoreAuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }

}
