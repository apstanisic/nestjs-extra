import { join } from 'path';
import { Process, Processor } from '@nestjs/bull';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Job } from 'bull';
import * as Handlebars from 'handlebars';
import { BaseUserService } from '../base-user.service';
import { USER_SERVICE, APP_URL, API_URL } from '../consts';
import { MailerService } from '../mailer/mailer.service';
import accountConfirmTemplate from './templates/account-confirm.hbs';
import passwordResetTemplate from './templates/password-reset.hbs';
import changeEmailTemplate from './templates/change-email.hbs';

interface CommonHandlebars {
  contactAddress?: string;
  contactEmail?: string;
  contactPhoneNumber?: string;
  firmName?: string;
  firmUrl?: string;
}

interface PasswordResetTemplateParams extends CommonHandlebars {
  resetUrl: string;
}

interface ConfirmTemplateParams extends CommonHandlebars {
  confirmUrl: string;
}

@Processor('auth-email')
export class AuthMailProcessor {
  /** Password reset template */
  private passwordResetTemplate: HandlebarsTemplateDelegate<PasswordResetTemplateParams>;
  /** Account confirm template */
  private accountConfirmTemplate: HandlebarsTemplateDelegate<ConfirmTemplateParams>;
  /** Change email template */
  private changeEmailTemplate: HandlebarsTemplateDelegate<ConfirmTemplateParams>;

  constructor(
    @Inject(USER_SERVICE) private readonly usersService: BaseUserService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    this.accountConfirmTemplate = Handlebars.compile(accountConfirmTemplate);
    this.passwordResetTemplate = Handlebars.compile(passwordResetTemplate);
  }

  /** Send user email that enables them to reset password. */
  @Process('reset-password')
  async resetPasswordMails(job: Job<string>): Promise<any> {
    const email = job.data;
    const user = await this.usersService.findOne({ email });
    const token = user.generateSecureToken();

    await this.usersService.mutate(user);

    const appUrl = this.configService.get(APP_URL);
    const resetUrl = join(appUrl, 'auth/reset-password', email, token);
    const commonValues = this.getCommonTemplateValues();

    await this.mailerService.sendMail({
      to: user.email,
      subject: `Resetovanje lozinke - ${commonValues.firmName}`,
      html: this.passwordResetTemplate({ ...commonValues, resetUrl }),
    });
  }

  @Process('confirm-account')
  async confirmAccountEmail(job: Job<{ email: string; token: string }>): Promise<any> {
    const { email, token } = job.data;
    const appUrl = this.configService.get(API_URL);
    const confirmUrl = join(appUrl, 'auth/confirm-account', email, token);
    const commonValues = this.getCommonTemplateValues();

    await this.mailerService.sendMail({
      to: email,
      subject: `Potvrda naloga - ${commonValues.firmName}`,
      html: this.accountConfirmTemplate({ ...commonValues, confirmUrl }),
    });
  }

  /** Send email with instruction to change email address */
  @Process('change-email')
  async changeEmail(job: Job<{ email: string; token: string }>): Promise<any> {
    const { email, token } = job.data;
    const appUrl = this.configService.get(API_URL);
    const changeEmailUrl = join(appUrl, 'auth/change-email', token);
    const commonValues = this.getCommonTemplateValues();

    await this.mailerService.sendMail({
      to: email,
      subject: `Promena emaila - ${commonValues.firmName}`,
      html: this.changeEmailTemplate({ ...commonValues, confirmUrl: changeEmailUrl }),
    });
  }

  /** Get common values from config to be used in templates. */
  private getCommonTemplateValues(): CommonHandlebars {
    const contactAddress = this.configService.get('FIRM_ADDRESS');
    const contactEmail = this.configService.get('FIRM_CONTACT_EMAIL');
    const contactPhoneNumber = this.configService.get('FIRM_PHONE_NUMBER');
    const firmUrl = this.configService.get('FIRM_URL');
    const firmName = this.configService.get('FIRM_NAME');

    return {
      contactAddress,
      contactEmail,
      contactPhoneNumber,
      firmName,
      firmUrl,
    };
  }
}
