import { BullModule } from '@nestjs/bull';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QUEUE_NOTIFICATIONS } from '../consts';
import { initQueue } from '../utils/register-queue';
import { NotificationController } from './notification.controller';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';
import { NotificationsCronService } from './notifications.cron.service';
import { NotificationsProcessor } from './notifications.processor';

/** Can use either cron or bullmq. Use cron by default cause it's simplier */
@Global()
@Module({})
export class NotificationsModule {
  static forRoot(useMq: boolean = false): DynamicModule {
    const imports = [TypeOrmModule.forFeature([Notification])];
    const providers: any[] = [NotificationService];

    if (useMq) {
      imports.push(BullModule.registerQueueAsync(initQueue(QUEUE_NOTIFICATIONS)));
      providers.push(NotificationsProcessor);
    } else {
      providers.push(NotificationsCronService);
    }

    return {
      imports,
      providers,
      module: NotificationsModule,
      controllers: [NotificationController],
      exports: [NotificationService],
    };
  }
}
