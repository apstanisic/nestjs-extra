import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class SimpleAdminGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
