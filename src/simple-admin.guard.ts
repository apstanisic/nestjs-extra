import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

/*
  Simplest admin guard, with only 1 admin.
  Improve in the future if site gets bigger
 */
@Injectable()
export class SimpleAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    // return true;
    const req = context.switchToHttp().getRequest();
    const adminMail = process.env.ADMIN_EMAIL;

    return req.user && req.user.email === adminMail;
  }
}
