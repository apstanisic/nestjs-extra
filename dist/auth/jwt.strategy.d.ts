import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { IdType } from '../types';
import { AuthUser } from '../users/user.interface';
export interface JwtPayload {
    email: string;
    id: IdType;
    name: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    readonly configService: ConfigService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): Promise<AuthUser>;
}
export {};
