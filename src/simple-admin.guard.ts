import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotImplementedException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Validator } from 'class-validator';
import { SIMPLE_ADMIN_MAILS } from './consts';
import { BaseUser } from './entities/base-user.entity';

/**
 * Simplest admin guard, accepts admins provided as env variable
 * Emails should be separated with ;
 * Example: mail1@gmail.com;mail2@yahoo.com;mail3@test.com
 */
@Injectable()
export class SimpleAdminGuard implements CanActivate {
  private logger = new Logger(SimpleAdminGuard.name);
  private validator = new Validator();

  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const combinedMails = this.configService.get<string>(SIMPLE_ADMIN_MAILS);
    if (!combinedMails) {
      this.logger.error('Not implemented.');
      throw new NotImplementedException();
    }
    const mails: string[] = combinedMails
      .split(';')
      .map(mail => mail.trim())
      .filter(email => this.validator.isEmail(email));

    const req = context.switchToHttp().getRequest();
    const userEmail = (req.user as BaseUser)?.email;

    return mails.some(mail => mail === userEmail);
  }
}
