import { JwtService } from '@nestjs/jwt';
import { UUID } from '../types';
import { BaseUser } from '../users/base-user.entity';
import { BaseUserService } from '../users/base-user.service';
import { AuthSession } from './auth-session.entity';
import { LoginUserDto, SignInResponse } from './auth-sessions.dto';
import { AuthSessionsService } from './auth-sessions.service';
export declare class AuthSessionsController<User extends BaseUser = BaseUser> {
    private readonly service;
    private readonly jwtService;
    private readonly usersService;
    constructor(service: AuthSessionsService, jwtService: JwtService, usersService: BaseUserService<User>);
    login(params: LoginUserDto): Promise<SignInResponse>;
    getAll(user: User): Promise<{
        data: AuthSession<BaseUser>[];
    }>;
    revoke(id: UUID, user: User): Promise<AuthSession<BaseUser>>;
    getNewAccessToken(refreshToken: string): Promise<SignInResponse>;
}
