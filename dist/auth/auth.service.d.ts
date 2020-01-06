import { JwtService } from '@nestjs/jwt';
import { BaseUserService } from '../users/base-user.service';
import { BaseUser } from '../users/base-user.entity';
import { BasicUserInfo } from '../users/user.interface';
import { AuthMailService } from './auth-mail.service';
import { RegisterUserDto, SignInResponse } from './auth.dto';
import { JwtPayload } from './jwt.strategy';
export declare class AuthService<User extends BaseUser = BaseUser> {
    private usersService;
    private readonly jwtService;
    private readonly authMailService;
    private validator;
    constructor(usersService: BaseUserService<User>, jwtService: JwtService, authMailService: AuthMailService);
    attemptLogin(email: string, password: string): Promise<SignInResponse>;
    validateJwt(payload: JwtPayload): Promise<BaseUser>;
    createJwt(email: string): string;
    registerNewUser(data: RegisterUserDto): Promise<SignInResponse>;
    confirmAccount(email: string, token: string): Promise<BasicUserInfo>;
    private findForLogin;
}
