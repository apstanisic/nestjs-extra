import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthEmailModule } from '../auth-email/auth-email.module';
import { AuthPasswordResetModule } from '../auth-password-reset/password-reset.module';
import { AuthSessionsModule } from '../auth-sessions/auth-sessions.module';
import { AuthUsersModule } from '../auth-users/auth-users.module';
import { QUEUE_AUTH_EMAIL } from '../consts';
import { initQueue } from '../utils/register-queue';
import { initJwtModule } from './init-jwt-module';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    initJwtModule(),
    BullModule.registerQueueAsync(initQueue(QUEUE_AUTH_EMAIL)),
    AuthSessionsModule,
    AuthEmailModule,
    AuthPasswordResetModule,
    AuthUsersModule,
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}

/** Reexport AuthGuard so it can be used in app without installing nest passport */
export { AuthGuard } from '@nestjs/passport';
