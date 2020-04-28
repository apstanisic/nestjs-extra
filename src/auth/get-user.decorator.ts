import { createParamDecorator, UnauthorizedException, ExecutionContext } from '@nestjs/common';

/**
 * Get logged user from request. Will throw if user not logged
 * @example
 *  someMethod(@GetUser() user: User) {}
 */
export const GetUser = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (!request.user) throw new UnauthorizedException();
  return request.user;
});
