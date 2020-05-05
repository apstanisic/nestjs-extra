import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Handlebars from 'handlebars';
import * as moment from 'moment';
import { join } from 'path';
import { AuthSessionsService } from '../auth-sessions/auth-sessions.service';
import { BaseService } from '../base.service';
import { APP_URL, USER_SERVICE } from '../consts';
import { CommonHandlebars, getCommonTemplateValues } from '../mailer/mailer-templates.helper';
import { MailerService } from '../mailer/mailer.service';
import { BaseUser } from '../users/base-user.entity';
/** Handlebars template */
import passwordResetTemplate from './password-reset.hbs';

interface PasswordResetTemplateParams extends CommonHandlebars {
  resetUrl: string;
}

@Injectable()
export class PasswordResetService<User extends BaseUser = BaseUser> {
  constructor(
    @Inject(USER_SERVICE) private usersService: BaseService<User>,
    private readonly authSessionsService: AuthSessionsService,
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    this.passwordResetTemplate = Handlebars.compile(passwordResetTemplate);
  }

  /** Password reset template */
  private passwordResetTemplate: Handlebars.TemplateDelegate<PasswordResetTemplateParams>;

  /** Send user email that enables them to reset password. */
  async sendResetPasswordEmail(email: string): Promise<void> {
    // await this.queue.add({ email }, { attempts: 3 });
    // const { email } = job.data;
    const user = await this.usersService.findOne({ email });
    const token = user.generateSecureToken();

    await this.usersService.mutate(user);

    const appUrl = this.configService.get(APP_URL);
    const resetUrl = join(appUrl, 'auth/reset-password', email, token);
    const commonValues = getCommonTemplateValues(this.configService);

    await this.mailerService.sendMail({
      to: user.email,
      subject: `Resetovanje lozinke - ${commonValues.firmName}`,
      html: this.passwordResetTemplate({ ...commonValues, resetUrl }),
    });
  }

  async resetPassword({
    user,
    token,
    password,
  }: {
    user: User;
    token: string;
    password: string;
  }): Promise<User> {
    if (!user.validToken(token)) throw new ForbiddenException();

    const expired = moment(user.tokenCreatedAt).add(2, 'hours').isBefore(moment());

    if (expired) {
      throw new BadRequestException('Invalid link. Link is valid for 2 hours.');
    }

    await user.setPassword(password);
    user.removeSecureToken();
    user = await this.usersService.mutate(user, {
      user,
      reason: 'Password reset',
      domain: user.id,
    });
    // Remove all previous logins
    await this.authSessionsService.deleteWhere({ userId: user.id });

    return user;
  }
}
