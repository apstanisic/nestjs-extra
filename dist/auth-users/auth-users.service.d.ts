import { AuthEmailService } from '../auth-email/auth-email.service';
import { BaseUser } from '../users/base-user.entity';
import { BaseUserService } from '../users/base-user.service';
import { RegisterUserDto } from './auth-users.dto';
export declare class AuthUsersService<User extends BaseUser = BaseUser> {
    private readonly usersService;
    private readonly authEmailService;
    constructor(usersService: BaseUserService<User>, authEmailService: AuthEmailService);
    registerNewUser(data: RegisterUserDto): Promise<User>;
}
