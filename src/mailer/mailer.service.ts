import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transporter, createTransport, SendMailOptions, SentMessageInfo } from 'nodemailer';
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_PORT, EMAIL_USER } from '../consts';

/**
 * Simple mail service. Wrapper around nodemailer.
 * Default values are Ethereal test data and config.
 * Free testing email at:
 * https://ethereal.email
 */
@Injectable()
export class MailerService {
  /** Object that is in charge of sending mail */
  private transporter: Transporter;

  /** Logger */
  private logger = new Logger(MailerService.name);

  constructor(private readonly configService: ConfigService) {
    this.transporter = createTransport(
      {
        host: configService.get(EMAIL_HOST),
        port: +(this.configService.get(EMAIL_PORT) ?? '587'),
        secure: false,
        auth: {
          user: configService.get(EMAIL_USER),
          pass: configService.get(EMAIL_PASSWORD),
        },
      },
      { sender: configService.get(EMAIL_USER) },
    );

    this.transporter
      .verify()
      .then(() => this.logger.log('MailService is working correctly.'))
      .catch(e => this.logger.error('Mail is not working', e));
  }

  /** Send mail */
  sendMail(data: SendMailOptions): Promise<SentMessageInfo> {
    try {
      return this.transporter.sendMail(data);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Problem sending email.');
    }
  }
}
