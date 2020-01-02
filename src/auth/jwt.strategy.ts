import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from '../consts';
import { BaseUser } from '../entities/base-user.entity';
import { AuthService } from './auth.service';

export interface JwtPayload {
  email: string;
}

/** Strategy for passport. Adopted from docs */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get(JWT_SECRET),
    });
  }

  async validate(payload: JwtPayload): Promise<BaseUser> {
    try {
      return this.authService.validateJwt(payload);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
