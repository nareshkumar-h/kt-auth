import { NgModule, NO_ERRORS_SCHEMA, ModuleWithProviders } from '@angular/core';
import { SecurityComponent } from './security.component';
import { NgxPermissionsDirective } from './permissions.directive';
import { SecurityService } from './security.service';
import { PermissionsService } from './permissions.service';
import { RoleService } from './role.service';

@NgModule({
  declarations: [SecurityComponent, NgxPermissionsDirective],
  imports: [],
  providers: [SecurityService, RoleService, PermissionsService],
  exports: [SecurityComponent, NgxPermissionsDirective],
  schemas: [NO_ERRORS_SCHEMA],
})
export class SecurityModule {
  static forRoot(): ModuleWithProviders<SecurityModule> {
    return {
      ngModule: SecurityModule,
      providers: [SecurityService, PermissionsService, RoleService],
    };
  }
}
