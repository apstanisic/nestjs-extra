import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { BaseUser } from '../entities/base-user.entity';
import { AuthService } from './auth.service';
export interface JwtPayload {
    email: string;
}
declare const JwtStrategy_base: new (...args: any[]) => typeof Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    readonly configService: ConfigService;
    constructor(authService: AuthService, configService: ConfigService);
    validate(payload: JwtPayload): Promise<BaseUser>;
}
export {};
