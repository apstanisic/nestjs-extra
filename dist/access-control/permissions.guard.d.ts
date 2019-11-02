import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessControlService } from './access-control.service';
import { RoleService } from './role/role.service';
export declare class PermissionsGuard implements CanActivate {
    private readonly acService;
    private readonly roleService;
    private readonly reflector;
    constructor(acService: AccessControlService, roleService: RoleService, reflector?: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
