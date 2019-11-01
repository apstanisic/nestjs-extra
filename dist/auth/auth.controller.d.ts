import { BasicUserInfo } from '../entities/user.interface';
import { LoginUserDto, RegisterUserDto, SignInResponse } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(params: LoginUserDto): Promise<SignInResponse>;
    register(data: RegisterUserDto): Promise<SignInResponse>;
    confirmAccout(email: string, token: string): Promise<BasicUserInfo>;
}
