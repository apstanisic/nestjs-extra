import { DynamicModule, Global, Module } from '@nestjs/common';
import { AC_MODEL, AC_POLICIES, AC_ROLES_LIST } from '../consts';
import { AccessControlService } from './access-control.service';
import { PermissionsGuard } from './permissions.guard';
import { RoleModule } from './role/role.module';
import { RoleService } from './role/role.service';

export interface AcOptions {
  availableRoles: string[];
  model: string;
  policies: string;
}

/**
 * Access control module. Register global guards
 * AC Module only depends on core folder.
 * user.entity is used in this module only as a type.
 */
@Global()
@Module({})
export class AccessControlModule {
  static forRoot(options: AcOptions): DynamicModule {
    return {
      module: AccessControlModule,
      imports: [RoleModule],
      providers: [
        { provide: AC_ROLES_LIST, useValue: options.availableRoles },
        { provide: AC_MODEL, useValue: options.model },
        { provide: AC_POLICIES, useValue: options.policies },
        AccessControlService,
        PermissionsGuard,
      ],
      exports: [AccessControlService, PermissionsGuard, RoleService],
    };
  }
}
