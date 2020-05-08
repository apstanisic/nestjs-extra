import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Inject,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { USER_SERVICE } from '../consts';
import { validJpeg } from '../storage/valid-jpeg-image';
import { BaseUser } from '../users/base-user.entity';
import { BaseUserService } from '../users/base-user.service';
import { classToClass } from 'class-transformer';
import { AuthUser } from '../users/user.interface';
import { RegisterUserDto, UpdatePasswordDto, OnlyPasswordDto } from './auth-users.dto';
import { AuthUsersService } from './auth-users.service';
import { JwtGuard } from '../auth/jwt-guard';
import { GetUser } from '../auth/get-user.decorator';

@Controller()
export class AuthUsersController<User extends BaseUser = BaseUser> {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: BaseUserService<User>,
    private readonly authUsersService: AuthUsersService,
  ) {}

  /** Register new user */
  @Post('register')
  async register(@Body() data: RegisterUserDto): Promise<BaseUser> {
    return this.authUsersService.registerNewUser(data);
  }

  /** Update user password */
  @UseGuards(JwtGuard)
  @Put('account/password')
  async changePassword(@Body() data: UpdatePasswordDto, @GetUser() user: AuthUser): Promise<User> {
    if (user.email !== data.email) throw new ForbiddenException();
    return this.userService.changePassword(data);
  }

  /** Delete user */
  @UseGuards(JwtGuard)
  @Delete('account')
  async deleteUser(@GetUser() user: AuthUser, @Body() data: OnlyPasswordDto): Promise<User> {
    return this.userService.deleteAccount({ email: user.email, password: data.password });
  }

  //   /** Remove user avatar */
  //   @Delete('avatar')
  //   async removeProfilePicture(@GetUser() user: AuthUser): Promise<User> {
  //     return this.userService.removeAvatar(user);
  //   }

  //   /** Update user avatar */
  //   @UseInterceptors(FileInterceptor('file', validJpeg(0.5)))
  //   @Put('avatar')
  //   async addProfilePicture(@UploadedFile() file: any, @GetUser() user: AuthUser): Promise<User> {
  //     return this.userService.changeAvatar(user, file);
  //   }

  /** Get logged user info */
  @Get('account')
  async getAccount(@GetUser() user: AuthUser): Promise<User> {
    const fetchedUser = await this.userService.findOne(user.id);
    return classToClass(fetchedUser);
  }
}
