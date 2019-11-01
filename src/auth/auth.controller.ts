import { Body, Controller, Param, Post, Put, Get } from '@nestjs/common';
import { BasicUserInfo } from '../entities/user.interface';
import { LoginUserDto, RegisterUserDto, SignInResponse } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  /* Confirm user account. Click on link in email */
  @Get('confirm-account/:email/:token')
  async confirmAccout(
    @Param('email') email: string,
    @Param('token') token: string,
  ): Promise<BasicUserInfo> {
    return this.authService.confirmAccount(email, token);
  }
}
