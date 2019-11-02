import { createParamDecorator, UnauthorizedException } from '@nestjs/common';

/**
 * Get logged user from request. Will throw if user not logged
 * @example
 *  someMethod(@GetUser() user: User) {}
 */
export const GetUser = createParamDecorator((data: string, req) => {
  if (!req.user) throw new UnauthorizedException();
  return req.user;
});
