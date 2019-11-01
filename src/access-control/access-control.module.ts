import { Module, Global, DynamicModule } from '@nestjs/common';
import { PermissionsGuard } from './permissions.guard';
import { AccessControlService } from './access-control.service';
import { AC_ROLES_LIST, AC_MODEL, AC_POLICIES } from '../consts';
import { RoleModule } from '../role/role.module';

export interface AcOptions {
  availableRoles: string[];
  matcher: string;
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
        { provide: AC_MODEL, useValue: options.matcher },
        { provide: AC_POLICIES, useValue: options.policies },
        AccessControlService,
        PermissionsGuard,
      ],
      exports: [AccessControlService, PermissionsGuard],
    };
  }
}
