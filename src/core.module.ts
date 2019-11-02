import { DynamicModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigOptions } from './config/config.module';
import { CronModule } from './cron/cron.module';
import { DbModule, DbOptions } from './db/db.module';
import { DbLoggerModule } from './logger/db-logger.module';
import { MailModule } from './mail/mail.module';
import { NotificationModule } from './notification/notification.module';
import { StorageModule, StorageOptions } from './storage/storage.module';
import {
  AccessControlModule,
  AcOptions,
} from './access-control/access-control.module';
import { Notification } from './notification/notification.entity';
import { Role } from './access-control/role/roles.entity';

/** Params for dynamic module */
export interface CoreModuleParams {
  config?: ConfigOptions;
  storage?: StorageOptions;
  db: DbOptions;
  accessControl?: AcOptions;
  dbLog: boolean;
  notifications: boolean;
}

/**
 * CoreModule with bundled common modules.
 * Every module is global, so if you only need 1 or 2 modules,
 * just import them manually.
 */
@Module({})
export class CoreModule {
  static forRoot(params: CoreModuleParams): DynamicModule {
    const modules = [];

    if (params.notifications) {
      params.db.entities.push(Notification);
    }
    if (params.accessControl) {
      params.db.entities.push(Role);
    }

    modules.push(ConfigModule.forRoot(params.config));
    modules.push(DbModule.forRoot(params.db));
    modules.push(MailModule);
    modules.push(CronModule);
    modules.push(AuthModule);

    if (params.accessControl) {
      modules.push(AccessControlModule.forRoot(params.accessControl));
    }
    if (params.storage) modules.push(StorageModule.forRoot(params.storage));
    if (params.dbLog) modules.push(DbLoggerModule);
    if (params.notifications) modules.push(NotificationModule);

    return {
      imports: modules,
      module: CoreModule,
    };
  }
}
