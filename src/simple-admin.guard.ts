import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  NotImplementedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { isEmail } from 'class-validator';
import { SIMPLE_ADMIN_EMAILS } from './consts';
import { BaseUser } from './users/base-user.entity';

/**
 * Simplest admin guard, accepts admins provided as env variable in csv form
 * Example: mail1@gmail.com,mail2@yahoo.com,mail3@test.com
 */
@Injectable()
export class SimpleAdminGuard implements CanActivate {
  private logger = new Logger(SimpleAdminGuard.name);

  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const combinedMails = this.configService.get<string>(SIMPLE_ADMIN_EMAILS);
    if (!combinedMails) {
      this.logger.error('Not implemented.');
      throw new NotImplementedException();
    }
    const mails: string[] = combinedMails
      .split(',')
      .map((mail) => mail.trim())
      .filter((email) => isEmail(email));

    const req = context.switchToHttp().getRequest();
    const userEmail = (req.user as BaseUser)?.email;

    return mails.some((mail) => mail === userEmail);
  }
}
