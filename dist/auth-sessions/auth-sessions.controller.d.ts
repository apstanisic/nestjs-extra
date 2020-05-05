import { UUID } from '../types';
import { Request } from 'express';
import { BaseUser } from '../users/base-user.entity';
import { AuthSession } from './auth-session.entity';
import { LoginUserDto, SignInResponse } from './auth-sessions.dto';
import { AuthSessionsService } from './auth-sessions.service';
export declare class AuthSessionsController<User extends BaseUser = BaseUser> {
    private readonly service;
    constructor(service: AuthSessionsService);
    login(params: LoginUserDto, req: Request): Promise<SignInResponse>;
    getAll(user: User): Promise<{
        data: AuthSession<BaseUser>[];
    }>;
    revoke(id: UUID, user: User): Promise<AuthSession<BaseUser>>;
    getNewAccessToken(refreshToken: string, req: Request): Promise<SignInResponse>;
}
