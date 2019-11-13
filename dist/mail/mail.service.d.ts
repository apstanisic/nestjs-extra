import * as nodemailer from 'nodemailer';
import { ConfigService } from '../config/config.service';
export declare class MailService {
    private readonly configService;
    private transporter;
    private user;
    private password;
    private host;
    private port;
    private logger;
    constructor(configService: ConfigService);
    send(data: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo>;
    private createTransport;
    private getConfig;
}
