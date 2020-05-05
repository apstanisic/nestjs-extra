import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import { BaseUser } from '../users/base-user.entity';
import { BaseUserService } from '../users/base-user.service';
import { BasicUserInfo } from '../users/user.interface';
import { ChangeEmailDto } from './auth-email.dto';
export declare class AuthEmailService<User extends BaseUser = BaseUser> {
    private usersService;
    private readonly configService;
    private readonly mailerService;
    private accountConfirmTemplate;
    private changeEmailTemplate;
    constructor(usersService: BaseUserService<User>, configService: ConfigService, mailerService: MailerService);
    requestEmailChange(oldEmail: string, data: ChangeEmailDto): Promise<void>;
    sendConfirmEmail(email: string, token: string): Promise<void>;
    confirmAccount(email: string, token: string): Promise<BasicUserInfo>;
}
