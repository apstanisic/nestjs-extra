import { Module } from '@nestjs/common';
import { AuthUsersService } from './auth-users.service';
import { AuthUsersController } from './auth-users.controller';
import { AuthEmailModule } from '../auth-email/auth-email.module';

@Module({
  providers: [AuthUsersService],
  controllers: [AuthUsersController],
  imports: [AuthEmailModule],
})
export class AuthUsersModule {}
