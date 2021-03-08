import { Injectable, Inject } from '@angular/core';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private roleService: RoleService) {}

  getLoggedInUser() {
    var user = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));
    return user;
  }

  storeLoggedInUser(user) {
    if (user.token) {
      localStorage.setItem('TOKEN', user.token);
    }
    localStorage.setItem('LOGGED_IN_USER', JSON.stringify(user));
  }

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  }

  isAuthenticated() {
    let user = this.getLoggedInUser();
    let authenticated = false;
    if (user) {
      authenticated = true;
    }
    return authenticated;
  }

  hasRole(roles) {
    let user = this.getLoggedInUser();
    let allowed = false;
    if (user) {
      allowed = this.roleService.hasRole(user.roles, roles);
    }
    return allowed;
  }
}
