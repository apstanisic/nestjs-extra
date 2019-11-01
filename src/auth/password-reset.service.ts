import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Inject,
} from '@nestjs/common';
import * as moment from 'moment';
// import { UsersService } from "../../user/user.service";
import { BaseUser } from '../entities/base-user.entity';
import { BaseService } from '../base.service';
import { USER_SERVICE } from '../consts';

@Injectable()
export class PasswordResetService {
  // constructor(private readonly usersService: UsersService) {}
  constructor(@Inject(USER_SERVICE) private usersService: BaseService) {}

  async resetPassword<User extends BaseUser = BaseUser>(
    user: User,
    token: string,
    password: string,
  ): Promise<User> {
    if (!user.compareToken(token)) throw new ForbiddenException();

    const expired = moment(user.tokenCreatedAt)
      .add(2, 'hours')
      .isBefore(moment());

    if (expired) {
      throw new BadRequestException(
        'Link is not valid. Link is valid for 2 hours',
      );
    }

    user.password = password;
    user.disableSecureToken();
    user = await this.usersService.mutate(user, {
      user,
      reason: 'Password reset',
      domain: user.id,
    });

    return user;
  }
}
