import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { BaseService } from '../base.service';
import { BaseUser } from '../users/base-user.entity';
import { BaseUserService } from '../users/base-user.service';
import { AuthSession } from './auth-session.entity';
import { SignInResponse } from './auth-sessions.dto';
export declare class AuthSessionsService<User extends BaseUser = BaseUser> extends BaseService<AuthSession<User>> {
    private readonly usersService;
    private readonly jwtService;
    constructor(repository: Repository<AuthSession<User>>, usersService: BaseUserService<User>, jwtService: JwtService);
    attemptLogin(email: string, password: string, userAgent?: string): Promise<SignInResponse & {
        refreshToken: string;
    }>;
    getNewAccessToken(refreshToken: string, options: {
        userAgent?: string;
    }): Promise<SignInResponse & {
        refreshToken: string;
    }>;
}
