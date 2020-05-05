import { BadRequestException, Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { isEmail } from 'class-validator';
import { GetUser } from '../auth/get-user.decorator';
import { USER_SERVICE } from '../consts';
import { BaseUser } from '../users/base-user.entity';
import { BaseUserService } from '../users/base-user.service';
import { AuthUser, BasicUserInfo } from '../users/user.interface';
import { ChangeEmailDto } from './auth-email.dto';
import { AuthEmailService } from './auth-email.service';

@Controller('auth')
export class AuthEmailController<User extends BaseUser = BaseUser> {
  constructor(
    private readonly service: AuthEmailService,
    @Inject(USER_SERVICE) private readonly userService: BaseUserService<User>,
  ) {}

  /* Confirm user account. Click on link in email */
  @Get('confirm-account/:email/:token')
  async confirmAccout(
    @Param('email') email: string,
    @Param('token') token: string,
  ): Promise<BasicUserInfo> {
    return this.service.confirmAccount(email, token);
  }

  /** Request change of email */
  @Put('/email')
  async requestEmailChange(@Body() data: ChangeEmailDto, @GetUser() user: AuthUser): Promise<any> {
    /** Send email to confirm email change */
    await this.service.requestEmailChange(user.email, data);
    return { message: 'success' };
  }

  /** Change user email in db */
  @Get('change-email/:token')
  async changeEmail(@Param('token') token: string, @GetUser() authUser: AuthUser): Promise<any> {
    const user = await this.userService.findOne(authUser.id);
    if (!user.validToken(token)) throw new BadRequestException('Invalid token');

    const [email] = token.split('___');
    if (!isEmail(email)) throw new BadRequestException('Invalid token');

    return this.userService.update(user, { email } as any);
  }
}
