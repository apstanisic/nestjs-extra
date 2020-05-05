import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { AuthSessionsService } from '../auth-sessions/auth-sessions.service';
import { BaseService } from '../base.service';
import { MailerService } from '../mailer/mailer.service';
import { BaseUser } from '../users/base-user.entity';
export declare class PasswordResetService<User extends BaseUser = BaseUser> {
    private usersService;
    private readonly queue;
    private readonly authSessionsService;
    private readonly configService;
    private readonly mailerService;
    constructor(usersService: BaseService<User>, queue: Queue, authSessionsService: AuthSessionsService, configService: ConfigService, mailerService: MailerService);
    private passwordResetTemplate;
    sendResetPasswordEmail(email: string): Promise<void>;
    resetPassword({ user, token, password, }: {
        user: User;
        token: string;
        password: string;
    }): Promise<User>;
}
