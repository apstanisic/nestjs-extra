import { BaseService } from '../base.service';
import { BaseUser } from '../entities/base-user.entity';
export declare class PasswordResetService<User extends BaseUser = BaseUser> {
    private usersService;
    constructor(usersService: BaseService<User>);
    resetPassword(user: User, token: string, password: string): Promise<User>;
}
