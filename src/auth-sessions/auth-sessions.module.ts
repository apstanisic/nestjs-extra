import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSession } from './auth-session.entity';
import { AuthSessionsController } from './auth-sessions.controller';
import { AuthSessionsService } from './auth-sessions.service';
import { initJwtModule } from './init-jwt-module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AuthSession]), initJwtModule()],
  providers: [AuthSessionsService],
  controllers: [AuthSessionsController],
  exports: [AuthSessionsService],
})
export class AuthSessionsModule {}
