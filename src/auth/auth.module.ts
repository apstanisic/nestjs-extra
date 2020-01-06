import { Global, InternalServerErrorException, Logger, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { RoleModule } from '../access-control/role/roles.module';
import { JWT_SECRET } from '../consts';
import { AuthMailService } from './auth-mail.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        const secret = configService.get(JWT_SECRET);
        if (!secret) {
          new Logger(JwtModule.name).error('JWT_SECRET not defined');
          throw new InternalServerErrorException();
        }
        return { secret, signOptions: { expiresIn: '10 days' } };
      },
    }),
  ],
  providers: [JwtStrategy, AuthService, AuthMailService, PasswordResetService],
  controllers: [AuthController, PasswordResetController],
})
export class AuthModule {}

/** Reexport AuthGuard so it can be used in app without installing nest passport */
export { AuthGuard } from '@nestjs/passport';
