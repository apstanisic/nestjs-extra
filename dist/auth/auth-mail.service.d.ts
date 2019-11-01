import { BaseService } from '../base.service';
import { ConfigService } from '../config/config.service';
import { BaseUser } from '../entities/base-user.entity';
import { MailService } from '../mail/mail.service';
export declare class AuthMailService {
    private usersService;
    private readonly mailService;
    private readonly configService;
    private templates;
    private logger;
    constructor(usersService: BaseService<BaseUser>, mailService: MailService, configService: ConfigService);
    sendResetPasswordEmail(email: string): Promise<void>;
    sendConfirmationEmail(email: string, token: string): Promise<void>;
    private getCommonTemplateValues;
    private storeTemplatesInMemory;
}
