import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToClass } from 'class-transformer';
import * as Handlebars from 'handlebars';
import { join } from 'path';
import { API_URL, USER_SERVICE } from '../consts';
import { CommonHandlebars, getCommonTemplateValues } from '../mailer/mailer-templates.helper';
import { MailerService } from '../mailer/mailer.service';
import { BaseUser } from '../users/base-user.entity';
import { BaseUserService } from '../users/base-user.service';
import { BasicUserInfo } from '../users/user.interface';
import { template as accountConfirmTemplate } from './account-confirm.hbs';
import { template as changeEmailTemplate } from './change-email.hbs';
import { ChangeEmailDto } from './auth-email.dto';

interface ConfirmTemplateParams extends CommonHandlebars {
  confirmUrl: string;
}

@Injectable()
export class AuthEmailService<User extends BaseUser = BaseUser> {
  /** Account confirm template */
  private accountConfirmTemplate: Handlebars.TemplateDelegate<ConfirmTemplateParams>;

  /** Change email template */
  private changeEmailTemplate: Handlebars.TemplateDelegate<ConfirmTemplateParams>;

  constructor(
    @Inject(USER_SERVICE) private usersService: BaseUserService<User>,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    // Precompile base of handlebars template
    this.accountConfirmTemplate = Handlebars.compile(accountConfirmTemplate);
    this.changeEmailTemplate = Handlebars.compile(changeEmailTemplate);
  }

  /**
   * Request email change
   */
  async requestEmailChange(oldEmail: string, data: ChangeEmailDto): Promise<void> {
    const user = await this.usersService.findForLogin(oldEmail, data.password);
    const token = user.generateSecureToken(data.newEmail);
    await this.usersService.mutate(user);

    const appUrl = this.configService.get(API_URL);
    const changeEmailUrl = join(appUrl, 'auth/change-email', token);
    const commonValues = getCommonTemplateValues(this.configService);

    await this.mailerService.sendMail({
      to: user.email,
      subject: `Promena emaila - ${commonValues.firmName}`,
      html: this.changeEmailTemplate({ ...commonValues, confirmUrl: changeEmailUrl }),
    });
  }

  async sendConfirmEmail(email: string, token: string): Promise<void> {
    const appUrl = this.configService.get(API_URL);
    const confirmUrl = join(appUrl, 'auth/confirm-account', email, token);
    const commonValues = getCommonTemplateValues(this.configService);

    await this.mailerService.sendMail({
      to: email,
      subject: `Potvrda naloga - ${commonValues.firmName}`,
      html: this.accountConfirmTemplate({ ...commonValues, confirmUrl }),
    });
  }

  /**
   * Confirm user's email address
   */
  async confirmAccount(email: string, token: string): Promise<BasicUserInfo> {
    const user = await this.usersService.findOne({ email });
    if (!user.validToken(token)) throw new BadRequestException();

    user.confirmed = true;
    user.removeSecureToken();
    await this.usersService.mutate(user, {
      user,
      domain: user.id,
      reason: 'Email address confirmed.',
    });
    return plainToClass(BasicUserInfo, user);
  }
}
