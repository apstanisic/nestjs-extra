import { BaseUser } from '../users/base-user.entity';
import { BaseUserService } from '../users/base-user.service';
import { AuthUser } from '../users/user.interface';
import { RegisterUserDto, UpdatePasswordDto, OnlyPasswordDto } from './auth-users.dto';
import { AuthUsersService } from './auth-users.service';
export declare class AuthUsersController<User extends BaseUser = BaseUser> {
    private readonly userService;
    private readonly authUsersService;
    constructor(userService: BaseUserService<User>, authUsersService: AuthUsersService);
    register(data: RegisterUserDto): Promise<BaseUser>;
    changePassword(data: UpdatePasswordDto, user: AuthUser): Promise<User>;
    deleteUser(user: AuthUser, data: OnlyPasswordDto): Promise<User>;
    getAccount(user: AuthUser): Promise<User>;
}
