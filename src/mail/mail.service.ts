import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Validator } from 'class-validator';
import { ConfigService } from '../config/config.service';

/**
 * Simple mail service. Wrapper around nodemailer.
 * Default values are Ethereal test data and config.
 * @TODO Replace default values
 */
@Injectable()
export class MailService {
  /** Object that is in charge of sending mail */
  private transporter: nodemailer.Transporter;

  /** Sender email address */
  private user: string = 'toby.leffler@ethereal.email';

  /** Sender password */
  private password: string = 'tXC6AxGXHYWBmXrtyq';

  /** Sender real name */
  private senderName: string = 'Toby Leffler';

  /** Host address */
  private host: string = 'smtp.ethereal.email';

  /** Port */
  private port: number = 587;

  /** Should use secure transport */
  private secure: boolean = false;

  /** Logger */
  private logger = new Logger(MailService.name);

  /** Validator */
  private validator = new Validator();

  /** In production use values from configModule (.env file) */
  constructor(private readonly configService: ConfigService) {
    if (configService.get('NODE_ENV') === 'production') {
      const host = this.valueOrThrowIfEmpty(
        this.configService.get('EMAIL_HOST'),
      );
      this.host = host;

      const port = Number(
        this.valueOrThrowIfEmpty(this.configService.get('EMAIL_PORT')),
      );
      this.port = port;

      const user = this.valueOrThrowIfEmpty(
        this.configService.get('EMAIL_USER'),
      );
      this.user = user;

      const password = this.valueOrThrowIfEmpty(
        this.configService.get('EMAIL_PASSWORD'),
      );
      this.password = password;

      // true for 465, false for other ports
      this.secure = Boolean(this.configService.get('EMAIL_SECURE')) || false;
    }
    this.createTransport();
  }

  /** Send mail */
  send(data: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo> {
    try {
      return this.transporter.sendMail(data);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Problem sending email.');
    }
  }

  /** Creates transporter instance */
  private createTransport(): void {
    this.transporter = nodemailer.createTransport(
      {
        host: this.host,
        port: this.port,
        secure: this.secure, // true for 465, false for other ports
        auth: {
          user: this.user,
          pass: this.password,
        },
      },
      { sender: this.user },
    );
    this.transporter
      .verify()
      .then(() => this.logger.log('MailService is working correctly.'))
      .catch(e => this.logger.error('Mail is not working', e));
  }

  valueOrThrowIfEmpty(value: any): string {
    const { isEmpty } = this.validator;
    if (isEmpty(value)) {
      throw new InternalServerErrorException('Mail config invalid.');
    }
    return value;
  }
}
