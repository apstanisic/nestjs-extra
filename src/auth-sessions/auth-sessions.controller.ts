import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { ValidUUID } from '../pipes/uuid.pipe';
import { UUID } from '../types';
import { Request, Response } from 'express';
import { BaseUser } from '../users/base-user.entity';
import { AuthSession } from './auth-session.entity';
import { LoginUserDto, SignInResponse } from './auth-sessions.dto';
import { AuthSessionsService } from './auth-sessions.service';
import * as moment from 'moment';

@Controller('auth')
export class AuthSessionsController<User extends BaseUser = BaseUser> {
  constructor(private readonly service: AuthSessionsService) {}

  /**
   * Attempt to login user
   * Send response manually because we're setting cookies, and we can't just return value
   */
  @Post('login')
  async login(
    @Body() params: LoginUserDto,
    @Req() req: Request,
    @Res() res: Response<SignInResponse>,
  ): Promise<void> {
    const result = await this.service.attemptLogin(
      params.email,
      params.password,
      req.headers['user-agent'],
    );

    res.cookie('refresh-token', result.refreshToken, {
      httpOnly: true,
      expires: moment().add(6, 'months').toDate(),
    });

    res.cookie('access-token', result.token, { httpOnly: true });
    res.send({ user: result.user, token: result.token });
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
   * Send response manually because we're setting cookies, and we can't just return value
   */
  @Post('sessions/new-token')
  async getNewAccessToken(
    @Req() req: Request,
    @Res() res: Response<SignInResponse>,
  ): Promise<void> {
    const isProduction = process.env.NODE_ENV === 'production';
    const userAgent = req.headers['user-agent'];
    const refreshToken = req.cookies['refresh-token'];
    const result = await this.service.getNewAccessToken(refreshToken, { userAgent });
    res.cookie('refresh-token', result.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      expires: moment().add(6, 'months').toDate(),
    });
    res.cookie('access-token', result.token, { httpOnly: true });
    res.send({ user: result.user, token: result.token });
  }
}
