import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Optional,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { PermissionsGuard } from '../access-control/permissions.guard';
import { Role } from '../access-control/role/roles.entity';
import { BaseUserService } from '../base-user.service';
import { USER_SERVICE } from '../consts';
import { BaseUser } from '../entities/base-user.entity';
import { BasicUserInfo } from '../entities/user.interface';
import {
  LoginUserDto,
  RegisterUserDto,
  SignInResponse,
  UpdatePasswordDto,
} from './auth.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { validJpeg } from '../storage/valid-jpeg-image';
import { RoleService } from '../access-control/role/role.service';

@Controller('auth')
export class AuthController<User extends BaseUser = BaseUser> {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: BaseUserService<User>,
    private readonly authService: AuthService,
    @Optional() @Inject() private readonly roleService?: RoleService,
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
  async changePassword(
    @Body() data: UpdatePasswordDto,
    @GetUser() user: User,
  ): Promise<User> {
    if (user.email !== data.email) throw new ForbiddenException();
    return this.userService.changePassword(data);
  }

  /** Delete user */
  @UseGuards(AuthGuard('jwt'))
  @Delete('account')
  async deleteUser(
    @GetUser() loggedUser: User,
    @Body() data: LoginUserDto,
  ): Promise<User> {
    if (loggedUser.email !== data.email) throw new ForbiddenException();
    return this.userService.deleteAccount(data);
  }

  @Get('account/roles')
  @UseGuards(AuthGuard('jwt'))
  getUsersRoles(@GetUser() user: User): Promise<Role[]> {
    // If this service is not available the is not AC
    if (!this.roleService) {
      throw new NotFoundException();
    }
    return this.roleService.find({ userId: user.id });
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
  async addProfilePicture(
    @UploadedFile() file: any,
    @GetUser() user: User,
  ): Promise<User> {
    return this.userService.changeAvatar(user, file);
  }

  /** Get logged user info */
  @Get('account')
  getAccount(@GetUser() user: User): User {
    return user;
  }
}
