// import { MailService } from '../mail/mail.service';
import { MailerService } from '@nest-modules/mailer';
import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Handlebars from 'handlebars';
import { BaseUserService } from '../base-user.service';
// import { UsersService } from "../../user/user.service";
// import { ConfigService } from '../config/config.service';
import { USER_SERVICE } from '../consts';
import { accountConfirmTemplate } from './templates/account-confirm.handlebars';
import { passwordResetTemplate } from './templates/password-reset.handlebars';

interface CommonHandlebars {
  contactAddress?: string;
  contactEmail?: string;
  contactPhoneNumber?: string;
  firmName?: string;
  firmUrl?: string;
}

interface PasswordResetHandlebars extends CommonHandlebars {
  resetUrl: string;
}

interface AccountConfirmHandlebars extends CommonHandlebars {
  confirmUrl: string;
}

interface Templates {
  accountConfirm?: HandlebarsTemplateDelegate<AccountConfirmHandlebars>;
  passwordReset?: HandlebarsTemplateDelegate<PasswordResetHandlebars>;
}

@Injectable()
export class AuthMailService {
  /** Handlebars templates */
  private templates: Templates = {};

  /** Cli logger */
  private logger = new Logger();

  constructor(
    // private readonly usersService: UsersService,

    @Inject(USER_SERVICE) private usersService: BaseUserService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {
    this.storeTemplatesInMemory();
  }

  /** Send user email that enables them to reset password. */
  async sendResetPasswordEmail(email: string): Promise<void> {
    try {
      const user = await this.usersService.findOne({ email });
      const token = user.generateSecureToken();
      await this.usersService.mutate(user);

      const appUrl = this.configService.get('APP_URL');
      const resetUrl = `${appUrl}/auth/reset-password/${email}/${token}`;

      if (!this.templates.passwordReset) {
        throw new InternalServerErrorException();
      }

      const commonValues = this.getCommonTemplateValues();
      const template = this.templates.passwordReset({
        resetUrl,
      });

      await this.mailerService.sendMail({
        to: user.email,
        subject: `Resetovanje lozinke - ${commonValues.firmName}`,
        html: template,
      });
    } catch (error) {}
  }

  /** Send email to confirm account to user */
  async sendConfirmationEmail(email: string, token: string): Promise<void> {
    const appUrl = this.configService.get('API_URL');
    const confirmUrl = `${appUrl}/auth/confirm-account/${email}/${token}`;
    const commonValues = this.getCommonTemplateValues();

    if (!this.templates.accountConfirm)
      throw new InternalServerErrorException();
    const template = this.templates.accountConfirm({
      ...commonValues,
      confirmUrl,
    });

    await this.mailerService.sendMail({
      to: email,
      subject: `Potvrda naloga - ${commonValues.firmName}`,
      html: template,
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

  /**
   * This method reads handlebars templates,
   * and saves them as string in this class.
   * It will later be compiled with Handlebars.
   */
  private storeTemplatesInMemory(): void {
    this.templates.accountConfirm = Handlebars.compile(accountConfirmTemplate);
    this.templates.passwordReset = Handlebars.compile(passwordResetTemplate);
  }
}
