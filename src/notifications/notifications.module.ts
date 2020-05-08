import { DynamicModule, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './notifications.controller';
import { Notification } from './notification.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsCron } from './notifications.cron';

/**
 * Notifications module
 * This module has:
 * Entity with properties for notification
 * Service with methods to crud Notification entity
 * Cron that deletes notifications older then 6 months
 * Controller that has just needed options
 */
@Global()
@Module({})
export class NotificationsModule {
  static forRoot(): DynamicModule {
    return {
      module: NotificationsModule,
      imports: [TypeOrmModule.forFeature([Notification])],
      providers: [NotificationsService, NotificationsCron],
      controllers: [NotificationsController],
      exports: [NotificationsService],
    };
  }
}
