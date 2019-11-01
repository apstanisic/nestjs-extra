import { JwtService } from '@nestjs/jwt';
import { BasicUserInfo } from '../entities/user.interface';
import { SignInResponse, RegisterUserDto } from './auth.dto';
import { JwtPayload } from './jwt.strategy';
import { AuthMailService } from './auth-mail.service';
import { BaseService } from '../base.service';
import { BaseUser } from '../entities/base-user.entity';
export declare class AuthService {
    private usersService;
    private readonly jwtService;
    private readonly authMailService;
    private validator;
    constructor(usersService: BaseService<BaseUser>, jwtService: JwtService, authMailService: AuthMailService);
    attemptLogin(email: string, password: string): Promise<SignInResponse>;
    validateJwt(payload: JwtPayload): Promise<BaseUser>;
    createJwt(email: string): string;
    registerNewUser(data: RegisterUserDto): Promise<SignInResponse>;
    confirmAccount(email: string, token: string): Promise<BasicUserInfo>;
    private findForLogin;
}
