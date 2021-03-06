import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class SimpleAdminGuard implements CanActivate {
    private readonly configService;
    private logger;
    constructor(configService: ConfigService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
