import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { ScheduleModule } from '@nestjs/schedule';
import { AccessControlModule, AccessControlOptions } from './access-control/access-control.module';
import { Role } from './access-control/role/roles.entity';
import { AuthModule } from './auth/auth.module';
import { DbModule, DbOptions } from './db/db.module';
import { ActivityLog } from './logger/activity-log.entity';
import { ActivityLoggerModule } from './logger/db-logger.module';
import { MailerModule } from './mailer/mailer.module';
import { Notification } from './notifications/notification.entity';
import { NotificationsModule } from './notifications/notifications.module';
import { StorageImageOptions, StorageImagesModule } from './storage-images/storage-images.module';
import { StorageModule } from './storage/storage.module';

/**
 * Params for dynamic module
 * @Todo auth templates not available
 * User should be able to pass handlebars templates
 */
export interface CoreModuleParams {
  config?: ConfigModuleOptions;
  db: DbOptions;
  useStorage?: boolean;
  useActivityLogger?: boolean;
  useNotifications?: boolean;
  useMq?: boolean;
  useMail?: boolean;
  storageImagesOptions?: StorageImageOptions;
  accessControl?: AccessControlOptions;
  // auth?: { templates: Record<string, string> };
}

/**
 * CoreModule with bundled common modules.
 * Every module is global, so if you only need 1 or 2 modules,
 * just import them manually.
 */
@Module({})
export class CoreModule {
  static forRoot(params: CoreModuleParams): DynamicModule {
    const { entities } = params.db;

    if (params.useNotifications) entities.push(Notification);
    if (params.accessControl) entities.push(Role);
    if (params.useActivityLogger) entities.push(ActivityLog);

    const modules = [
      // Access env config
      ConfigModule.forRoot({ ...params.config, isGlobal: true }),
      // Cron jobs
      ScheduleModule.forRoot(),
      // Initialize db
      DbModule.forRoot(params.db),
      // Auth
      AuthModule,
    ];

    if (params.useActivityLogger) modules.push(ActivityLoggerModule);
    if (params.useMail) modules.push(MailerModule);
    if (params.useNotifications) modules.push(NotificationsModule.forRoot());
    if (params.accessControl) modules.push(AccessControlModule.forRoot(params.accessControl));
    if (params.useStorage) {
      modules.push(
        StorageModule.forRoot(),
        StorageImagesModule.forRoot(params.storageImagesOptions),
      );
    }

    return {
      imports: modules,
      module: CoreModule,
    };
  }
}
