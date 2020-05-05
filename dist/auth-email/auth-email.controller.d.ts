import { BaseUser } from '../users/base-user.entity';
import { BaseUserService } from '../users/base-user.service';
import { AuthUser, BasicUserInfo } from '../users/user.interface';
import { ChangeEmailDto } from './auth-email.dto';
import { AuthEmailService } from './auth-email.service';
export declare class AuthEmailController<User extends BaseUser = BaseUser> {
    private readonly service;
    private readonly userService;
    constructor(service: AuthEmailService, userService: BaseUserService<User>);
    confirmAccout(email: string, token: string): Promise<BasicUserInfo>;
    requestEmailChange(data: ChangeEmailDto, user: AuthUser): Promise<any>;
    changeEmail(token: string, authUser: AuthUser): Promise<any>;
}
