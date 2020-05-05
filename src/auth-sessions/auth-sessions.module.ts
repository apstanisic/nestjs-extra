import { Global, Module } from '@nestjs/common';
import { AuthSessionsController } from './auth-sessions.controller';
import { AuthSessionsService } from './auth-sessions.service';

@Global()
@Module({
  imports: [],
  providers: [AuthSessionsService],
  controllers: [AuthSessionsController],
  exports: [AuthSessionsService],
})
export class AuthSessionsModule {}
