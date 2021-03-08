import { Injectable } from '@angular/core';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor() {}

  hasRole(currentUserRoles: any, roles: string[]): boolean {
    let allowed = false;
    for (let role of currentUserRoles) {
      if (roles.indexOf(role) != -1) {
        allowed = true;
        break;
      }
    }
    //console.log("CurrentUserRoles: " + currentUserRoles, "Input Roles:", roles, "Allowed:" , allowed);
    return allowed;
  }
}
