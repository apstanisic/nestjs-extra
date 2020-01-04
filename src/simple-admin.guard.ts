import { CanActivate, ExecutionContext, Injectable, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SIMPLE_ADMIN_MAILS } from './consts';

/**
 * Simplest admin guard, accepts admins provided as env variable
 * Emails should be separated with ;
 * Example: mail1@gmail.com;mail2@yahoo.com;mail3@test.com
 */
@Injectable()
export class SimpleAdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const mailsString = this.configService.get(SIMPLE_ADMIN_MAILS);
    if (!mailsString) throw new NotImplementedException();
    const mails: string[] = mailsString.split(';').map((mail: string) => mail.trim());
    const req = context.switchToHttp().getRequest();

    return req.user && mails.some(mail => mail === req.user.email);
  }
}
