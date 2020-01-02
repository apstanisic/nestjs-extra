import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SIMPLE_ADMIN_MAILS } from './consts';

/** Simplest admin guard, accepts admins provided in config service */
@Injectable()
export class SimpleAdminGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  // should be stored as mail1@gmail.com;mail2@yahoo.com;
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const mailsString = this.configService.get(SIMPLE_ADMIN_MAILS);
    let mails: string[];
    if (mailsString) {
      mails = mailsString.split(';').map((mail: string) => mail.trim());
    } else {
      throw new NotImplementedException();
    }
    const req = context.switchToHttp().getRequest();

    return req.user && mails.some(mail => mail === req.user.email);
  }
}
