import { Module, Global } from '@nestjs/common';
import { MailService } from './mail.service';

/**
 * Wrapper around nodemailer.
 * Use this instead of @nest-modules/mailer cause it has fewer
 * dependecies. I don't want Pug or Handlebars without reason.
 */
@Global()
@Module({
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
