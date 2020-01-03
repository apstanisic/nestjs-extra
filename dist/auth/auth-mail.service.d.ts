import { MailerService } from '@nest-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { BaseUserService } from '../base-user.service';
export declare class AuthMailService {
    private usersService;
    private readonly mailerService;
    private readonly configService;
    private templates;
    constructor(usersService: BaseUserService, mailerService: MailerService, configService: ConfigService);
    sendResetPasswordEmail(email: string): Promise<void>;
    sendConfirmationEmail(email: string, token: string): Promise<void>;
    private getCommonTemplateValues;
    private storeTemplatesInMemory;
}
