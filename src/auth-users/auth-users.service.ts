import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { classToClass } from 'class-transformer';
import { AuthEmailService } from '../auth-email/auth-email.service';
import { USER_SERVICE } from '../consts';
import { BaseUser } from '../users/base-user.entity';
import { BaseUserService } from '../users/base-user.service';
import { RegisterUserDto } from './auth-users.dto';

@Injectable()
export class AuthUsersService<User extends BaseUser = BaseUser> {
  constructor(
    @Inject(USER_SERVICE) private readonly usersService: BaseUserService<User>,
    private readonly authEmailService: AuthEmailService,
  ) {}

  /**
   * Register new user, and return him.
   * User must separately login by calling /auth/login,
   * that is handled by auth-sessions.module
   */
  async registerNewUser(data: RegisterUserDto): Promise<User> {
    const user = await this.usersService.createUser(data);
    // Token will always exist on creation, but for typescript
    if (!user.token) throw new ForbiddenException();
    await this.authEmailService.sendConfirmEmail(user.email, user.token);
    // For some reason user is not transformed without class to class
    return classToClass(user);
  }
}
