import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '../config/config.service';
import { BaseUser } from '../entities/base-user.entity';
import { AuthService } from './auth.service';
import { JWT_SECRET } from '../consts';

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
      const user = await this.authService.validateJwt(payload);
      console.log(user);

      return user;
    } catch (error) {
      console.log('doslo je do greske');

      console.log(JSON.stringify(error));

      throw new UnauthorizedException();
    }
  }
}
