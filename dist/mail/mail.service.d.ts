import * as nodemailer from 'nodemailer';
import { ConfigService } from '../config/config.service';
export declare class MailService {
    private readonly configService;
    private transporter;
    private user;
    private password;
    private senderName;
    private host;
    private port;
    private secure;
    private logger;
    private validator;
    constructor(configService: ConfigService);
    send(data: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo>;
    private createTransport;
    valueOrThrowIfEmpty(value: any): string;
}
