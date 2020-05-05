import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { ValidUUID } from '../pipes/uuid.pipe';
import { UUID } from '../types';
import { Request } from 'express';
import { BaseUser } from '../users/base-user.entity';
import { AuthSession } from './auth-session.entity';
import { LoginUserDto, SignInResponse } from './auth-sessions.dto';
import { AuthSessionsService } from './auth-sessions.service';

@Controller('auth')
export class AuthSessionsController<User extends BaseUser = BaseUser> {
  constructor(private readonly service: AuthSessionsService) {}

  /**
   * Attempt to login user
   * @TODO should return user, refresh and access token
   */
  @Post('login')
  async login(@Body() params: LoginUserDto, @Req() req: Request): Promise<SignInResponse> {
    return this.service.attemptLogin(params.email, params.password, req.headers['user-agent']);
  }

  /** Get all active sessions */
  @Get('sessions')
  async getAll(@GetUser() user: User): Promise<{ data: AuthSession<BaseUser>[] }> {
    const data = await this.service.find({ userId: user.id });
    return { data };
  }

  /** Delete session */
  @Delete('sessions/:id')
  async revoke(
    @Param('id', ValidUUID) id: UUID,
    @GetUser() user: User,
  ): Promise<AuthSession<BaseUser>> {
    return this.service.deleteWhere({ id, userId: user.id });
  }

  /**
   * Get access token
   */
  @Post('sessions/new-token')
  async getNewAccessToken(
    @Body('token') refreshToken: string,
    @Req() req: Request,
  ): Promise<SignInResponse> {
    const userAgent = req.headers['user-agent'];
    return this.service.getNewAccessToken(refreshToken, { userAgent });
  }
}
