import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import { BaseUserService } from '../base-user.service';
import { MailerService } from '../mailer/mailer.service';
export declare class AuthMailProcessor {
    private readonly usersService;
    private readonly configService;
    private readonly mailerService;
    private passwordResetTemplate;
    private accountConfirmTemplate;
    private changeEmailTemplate;
    constructor(usersService: BaseUserService, configService: ConfigService, mailerService: MailerService);
    resetPasswordMails(job: Job<string>): Promise<any>;
    confirmAccountEmail(job: Job<{
        email: string;
        token: string;
    }>): Promise<any>;
    changeEmail(job: Job<{
        email: string;
        token: string;
    }>): Promise<any>;
    private getCommonTemplateValues;
}
