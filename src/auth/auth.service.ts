import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { classToClass, plainToClass } from 'class-transformer';
import { Validator } from 'class-validator';
import { BaseUserService } from '../base-user.service';
import { USER_SERVICE } from '../consts';
import { BaseUser } from '../entities/base-user.entity';
import { BasicUserInfo } from '../entities/user.interface';
import { AuthMailService } from './auth-mail.service';
import { RegisterUserDto, SignInResponse } from './auth.dto';
import { JwtPayload } from './jwt.strategy';

@Injectable()
export class AuthService<User extends BaseUser = BaseUser> {
  private validator = new Validator();

  constructor(
    // private readonly usersService: UsersService,
    @Inject(USER_SERVICE) private usersService: BaseUserService<User>,
    private readonly jwtService: JwtService,
    private readonly authMailService: AuthMailService,
  ) {}

  /** Try to sign in user */
  async attemptLogin(email: string, password: string): Promise<SignInResponse> {
    const user = await this.findForLogin(email, password);
    const token = this.createJwt(user.email);
    return { token, user: classToClass(user) };
  }

  /** Validate token on every request. From docs
   * @TODO Check what to do with relations: ['roles']
   */
  async validateJwt(payload: JwtPayload): Promise<BaseUser> {
    if (!payload || !this.validator.isEmail(payload.email)) {
      throw new BadRequestException();
    }
    const { email } = payload;
    return this.usersService.findOne({ email });
    // { relations: ['roles'] },
  }

  /** Generate new token when user logs in */
  createJwt(email: string): string {
    return this.jwtService.sign({ email });
  }

  /** Register new user, and return him and login token. */
  async registerNewUser(data: RegisterUserDto): Promise<SignInResponse> {
    const user = await this.usersService.createUser(data);
    const token = this.createJwt(data.email);

    if (!user.secureToken) throw new ForbiddenException();
    await this.authMailService.sendConfirmationEmail(user.email, user.secureToken);

    // For some reason user is not transformed without class to class
    return { token, user: classToClass(user) };
  }

  /** Confirm user's email address */
  async confirmAccount(email: string, token: string): Promise<BasicUserInfo> {
    const user = await this.usersService.findOne({ email });
    if (!user.validToken(token)) throw new BadRequestException();

    user.confirmed = true;
    user.removeSecureToken();
    await this.usersService.mutate(user, {
      user,
      domain: user.id,
      reason: 'Email address confirmed.',
    });
    return plainToClass(BasicUserInfo, user);
  }

  /** Find user with provided email and password */
  private async findForLogin(email: string, password: string): Promise<User> {
    const user = await this.usersService.findOne({ email });
    const validPassword = await user.checkPassword(password);

    if (!validPassword) {
      throw new BadRequestException('Invalid parameters.');
    }
    return user;
  }
}
