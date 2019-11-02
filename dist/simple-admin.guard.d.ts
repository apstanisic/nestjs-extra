import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from './config/config.service';
export declare class SimpleAdminGuard implements CanActivate {
    private readonly configService;
    constructor(configService: ConfigService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean>;
}
