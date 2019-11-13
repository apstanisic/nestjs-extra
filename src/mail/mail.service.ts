import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '../config/config.service';

/**
 * Simple mail service. Wrapper around nodemailer.
 * Default values are Ethereal test data and config.
 * Free testing email at:
 * https://ethereal.email
 */
@Injectable()
export class MailService {
  /** Object that is in charge of sending mail */
  private transporter: nodemailer.Transporter;

  /** Sender email address */
  private user: string;

  /** Sender password */
  private password: string;

  /** Host address */
  private host: string;

  /** Port */
  private port: number = 587;

  /** Logger */
  private logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {
    this.host = this.getConfig('EMAIL_HOST');
    this.user = this.getConfig('EMAIL_USER');
    this.password = this.getConfig('EMAIL_PASSWORD');
    this.port = Number(this.configService.get('EMAIL_PORT') || 587);

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

  private getConfig(key: string): string {
    const value = this.configService.get(key);
    if (value === undefined) {
      throw new InternalServerErrorException('Mail config invalid.');
    }
    return value;
  }
}
