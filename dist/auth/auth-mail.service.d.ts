import { ConfigService } from '../config/config.service';
import { MailService } from '../mail/mail.service';
import { BaseUserService } from '../base-user.service';
export declare class AuthMailService {
    private usersService;
    private readonly mailService;
    private readonly configService;
    private templates;
    private logger;
    constructor(usersService: BaseUserService, mailService: MailService, configService: ConfigService);
    sendResetPasswordEmail(email: string): Promise<void>;
    sendConfirmationEmail(email: string, token: string): Promise<void>;
    private getCommonTemplateValues;
    private storeTemplatesInMemory;
}
