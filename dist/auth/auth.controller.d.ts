import { BaseUserService } from '../users/base-user.service';
import { BaseUser } from '../users/base-user.entity';
import { BasicUserInfo } from '../users/user.interface';
import { ChangeEmailDto, LoginUserDto, OnlyPasswordDto, RegisterUserDto, SignInResponse, UpdatePasswordDto } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController<User extends BaseUser = BaseUser> {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: BaseUserService<User>);
    login(params: LoginUserDto): Promise<SignInResponse>;
    register(data: RegisterUserDto): Promise<SignInResponse>;
    changePassword(data: UpdatePasswordDto, user: User): Promise<User>;
    deleteUser(user: User, data: OnlyPasswordDto): Promise<User>;
    confirmAccout(email: string, token: string): Promise<BasicUserInfo>;
    removeProfilePicture(user: User): Promise<User>;
    addProfilePicture(file: any, user: User): Promise<User>;
    getAccount(user: User): User;
    changeEmailOld(data: ChangeEmailDto, user: User): Promise<any>;
    changeEmail(token: string, user: User): Promise<any>;
}
