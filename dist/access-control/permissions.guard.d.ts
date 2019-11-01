import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessControlService } from './access-control.service';
export declare class PermissionsGuard implements CanActivate {
    private readonly acService;
    private readonly reflector;
    constructor(acService: AccessControlService, reflector?: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
