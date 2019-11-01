import { BaseUser } from '../entities/base-user.entity';
import { BaseService } from '../base.service';
export declare class PasswordResetService {
    private usersService;
    constructor(usersService: BaseService);
    resetPassword<User extends BaseUser = BaseUser>(user: User, token: string, password: string): Promise<User>;
}
