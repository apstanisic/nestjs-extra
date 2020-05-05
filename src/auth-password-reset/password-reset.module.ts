import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { QUEUE_RESET_PASSWORD } from '../consts';
import { initQueue } from '../utils/register-queue';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetService } from './password-reset.service';

@Global()
@Module({
  imports: [BullModule.registerQueueAsync(initQueue(QUEUE_RESET_PASSWORD))],
  providers: [PasswordResetService],
  controllers: [PasswordResetController],
})
export class AuthPasswordResetModule {}
