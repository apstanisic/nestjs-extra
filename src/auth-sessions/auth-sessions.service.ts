import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { classToClass } from 'class-transformer';
import * as Faker from 'faker';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { BaseService } from '../base.service';
import { USER_SERVICE } from '../consts';
import { BaseUser } from '../users/base-user.entity';
import { BaseUserService } from '../users/base-user.service';
import { AuthSession } from './auth-session.entity';
import { SignInResponse } from './auth-sessions.dto';
import * as useragent from 'useragent';

/**
 * Auth session service
 */
@Injectable()
export class AuthSessionsService<User extends BaseUser = BaseUser> extends BaseService<
  AuthSession<User>
> {
  constructor(
    @InjectRepository(AuthSession) repository: Repository<AuthSession<User>>,
    @Inject(USER_SERVICE) private readonly usersService: BaseUserService<User>,
    private readonly jwtService: JwtService,
  ) {
    super(repository);
  }

  /**
   * Attempt to sign in user
   */
  async attemptLogin(email: string, password: string, userAgent?: string): Promise<SignInResponse> {
    const user = await this.usersService.findOne({ email });
    const validPassword = await user.checkPassword(password);
    if (!validPassword) throw new BadRequestException('Invalid parameters.');

    const ua = useragent.lookup(userAgent);
    const session = new AuthSession<User>();
    session.email = user.email;
    session.userId = user.id;
    session.validUntil = moment().add(1, 'year').toDate();
    session.refreshToken = Faker.random.uuid();
    session.browser = ua.family;
    session.os = ua.os.family;
    const savedSession = await this.create(session);

    const accessToken = this.jwtService.sign({ email: user.email, name: user.name, id: user.id });
    return {
      token: accessToken,
      user: classToClass(user),
      refreshToken: savedSession.refreshToken,
    };
  }

  /**
   * Get new access token with provided access token
   */
  async getNewAccessToken(
    refreshToken: string,
    options: { userAgent?: string },
  ): Promise<SignInResponse> {
    const session = await this.findOne({ refreshToken, valid: true });
    const user = await this.usersService.findOne(session.userId);
    const { email, name, id } = user;

    const ua = useragent.lookup(options.userAgent);
    const browser = ua.family;
    const os = ua.os.family;
    await this.update(session, {
      browser,
      os,
      lastUsed: new Date(),
      validUntil: moment().add(6, 'months').toDate(),
    });

    const accessToken = this.jwtService.sign({ email, name, id });
    return { token: accessToken, user: classToClass(user), refreshToken };
  }
}
