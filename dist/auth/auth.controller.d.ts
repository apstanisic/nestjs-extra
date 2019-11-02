import { Role } from '../access-control/role/roles.entity';
import { BaseUserService } from '../base-user.service';
import { BaseUser } from '../entities/base-user.entity';
import { BasicUserInfo } from '../entities/user.interface';
import { LoginUserDto, RegisterUserDto, SignInResponse, UpdatePasswordDto } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController<User extends BaseUser = BaseUser> {
    private readonly userService;
    private readonly authService;
    constructor(userService: BaseUserService<User>, authService: AuthService);
    login(params: LoginUserDto): Promise<SignInResponse>;
    register(data: RegisterUserDto): Promise<SignInResponse>;
    changePassword(data: UpdatePasswordDto, user: User): Promise<User>;
    deleteUser(loggedUser: User, data: LoginUserDto): Promise<User>;
    getUsersRoles(user: User): Role[];
    confirmAccout(email: string, token: string): Promise<BasicUserInfo>;
    removeProfilePicture(user: User): Promise<User>;
    addProfilePicture(file: any, user: User): Promise<User>;
    getAccount(user: User): User;
}
