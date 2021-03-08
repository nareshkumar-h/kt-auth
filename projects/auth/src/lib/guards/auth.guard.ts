import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let isAuthenticated = this.authService.isLoggedIn();
    //console.log('Auth Guard:', isAuthenticated);
    let url: string = state.url;
    let pathname = window.location.href;
    if (!isAuthenticated) {
      window.location.href = 'auth/login?redirectUrl=' + pathname;
    }
    return isAuthenticated;
  }
}
