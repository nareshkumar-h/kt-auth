import { Injectable, Inject } from '@angular/core';
import { SecurityService } from './security.service';

import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  currentUserRoles: any = [];

  constructor(
    private secureService: SecurityService,
    private roleService: RoleService
  ) {
    let user = secureService.getLoggedInUser();
    console.log(user);
    if (user) {
      this.currentUserRoles = user.roles;
    }
  }

  hasPermission(roles: string[]): boolean {
    return this.roleService.hasRole(this.currentUserRoles, roles);
  }
}
