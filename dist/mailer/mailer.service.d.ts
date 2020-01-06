import { ConfigService } from '@nestjs/config';
import { SendMailOptions, SentMessageInfo } from 'nodemailer';
export declare class MailerService {
    private readonly configService;
    private transporter;
    private logger;
    constructor(configService: ConfigService);
    sendMail(data: SendMailOptions): Promise<SentMessageInfo>;
}
