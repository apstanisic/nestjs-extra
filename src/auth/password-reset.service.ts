import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { BaseService } from '../base.service';
import { USER_SERVICE } from '../consts';
import { BaseUser } from '../users/base-user.entity';

@Injectable()
export class PasswordResetService<User extends BaseUser = BaseUser> {
  constructor(@Inject(USER_SERVICE) private usersService: BaseService<User>) {}

  async resetPassword(user: User, token: string, password: string): Promise<User> {
    if (!user.validToken(token)) throw new ForbiddenException();

    const expired = moment(user.tokenCreatedAt)
      .add(2, 'hours')
      .isBefore(moment());

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

    return user;
  }
}
