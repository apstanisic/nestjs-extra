import { Module } from '@nestjs/common';
import { AuthEmailController } from './auth-email.controller';
import { AuthEmailService } from './auth-email.service';

@Module({
  controllers: [AuthEmailController],
  providers: [AuthEmailService],
  exports: [AuthEmailService],
})
export class AuthEmailModule {}
