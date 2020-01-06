import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Validator } from 'class-validator';
import { BaseUserService } from '../base-user.service';
import { USER_SERVICE } from '../consts';
import { BaseUser } from '../entities/base-user.entity';
import { BasicUserInfo } from '../entities/user.interface';
import { validJpeg } from '../storage/valid-jpeg-image';
import {
  ChangeEmailDto,
  LoginUserDto,
  OnlyPasswordDto,
  RegisterUserDto,
  SignInResponse,
  UpdatePasswordDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController<User extends BaseUser = BaseUser> {
  validator = new Validator();
  constructor(
    private readonly authService: AuthService,
    @Inject(USER_SERVICE) private readonly userService: BaseUserService<User>,
  ) {}

  /** Attempt to login user */
  @Post('login')
  async login(@Body() params: LoginUserDto): Promise<SignInResponse> {
    return this.authService.attemptLogin(params.email, params.password);
  }

  /** Register new user */
  @Post('register')
  async register(@Body() data: RegisterUserDto): Promise<SignInResponse> {
    return this.authService.registerNewUser(data);
  }

  /** Update user password */
  @UseGuards(AuthGuard('jwt'))
  @Put('password')
  async changePassword(@Body() data: UpdatePasswordDto, @GetUser() user: User): Promise<User> {
    if (user.email !== data.email) throw new ForbiddenException();
    return this.userService.changePassword(data);
  }

  /** Delete user */
  @UseGuards(AuthGuard('jwt'))
  @Delete('account')
  async deleteUser(@GetUser() user: User, @Body() data: OnlyPasswordDto): Promise<User> {
    return this.userService.deleteAccount({ email: user.email, password: data.password });
  }

  /* Confirm user account. Click on link in email */
  @Get('confirm-account/:email/:token')
  async confirmAccout(
    @Param('email') email: string,
    @Param('token') token: string,
  ): Promise<BasicUserInfo> {
    return this.authService.confirmAccount(email, token);
  }

  /** Remove user avatar */
  @Delete('avatar')
  async removeProfilePicture(@GetUser() user: User): Promise<User> {
    return this.userService.removeAvatar(user);
  }

  /** Update user avatar */
  @UseInterceptors(FileInterceptor('file', validJpeg(0.5)))
  @Put('avatar')
  async addProfilePicture(@UploadedFile() file: any, @GetUser() user: User): Promise<User> {
    return this.userService.changeAvatar(user, file);
  }

  /** Get logged user info */
  @Get('account')
  getAccount(@GetUser() user: User): User {
    return user;
  }

  /** Request change of email */
  @Put('/email')
  async changeEmailOld(@Body() data: ChangeEmailDto, @GetUser() user: User): Promise<any> {
    await this.userService.requestEmailChange(user.email, data);
    return { message: 'success' };
  }

  /** Change user email in db */
  @Get('change-email/:token')
  changeEmail(@Param('token') token: string, @GetUser() user: User): Promise<any> {
    if (!user.validToken(token)) throw new BadRequestException('Invalid token');

    const [email] = token.split('___');
    if (!this.validator.isEmail(email)) throw new BadRequestException('Invalid token');

    return this.userService.update(user, { email } as any);
  }
}
