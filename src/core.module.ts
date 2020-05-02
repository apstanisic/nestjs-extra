import { BullModule } from '@nestjs/bull';
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
import { Notification } from './notification/notification.entity';
import { NotificationsModule } from './notification/notification.module';
import { StorageModule, StorageOptions } from './storage/storage.module';
import { initQueue } from './utils/register-queue';

/**
 * Params for dynamic module
 * @Todo auth templates not available
 * User should be able to pass handlebars templates
 */
export interface CoreModuleParams {
  config?: ConfigModuleOptions;
  storage?: StorageOptions | false;
  db: DbOptions;
  accessControl?: AccessControlOptions;
  dbLog?: boolean;
  notifications?: boolean;
  useMq?: boolean;
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

    if (params.notifications) entities.push(Notification);
    if (params.accessControl) entities.push(Role);
    if (params.dbLog) entities.push(ActivityLog);

    const modules = [
      ConfigModule.forRoot({ ...params.config, isGlobal: true }),
      BullModule.registerQueueAsync(initQueue('app')),
      ScheduleModule.forRoot(),
      DbModule.forRoot(params.db),
      AuthModule,
      MailerModule,
    ];

    if (params.storage !== false) modules.push(StorageModule.forRoot(params.storage));
    if (params.dbLog) modules.push(ActivityLoggerModule);
    if (params.notifications) modules.push(NotificationsModule.forRoot(params.useMq));
    if (params.accessControl) {
      modules.push(AccessControlModule.forRoot(params.accessControl));
    }

    return {
      imports: modules,
      module: CoreModule,
    };
  }
}
