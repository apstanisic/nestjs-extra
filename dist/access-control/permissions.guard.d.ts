import { CanActivate, ExecutionContext } from '@nestjs/common';
import { AccessControlService } from './access-control.service';
import { RolesService } from './role/roles.service';
export declare class PermissionsGuard implements CanActivate {
    private readonly acService;
    private readonly roleService;
    private readonly reflector;
    private readonly logger;
    constructor(acService: AccessControlService, roleService: RolesService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
