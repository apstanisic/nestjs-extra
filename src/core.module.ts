import { MailerModule } from '@nest-modules/mailer';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import { ScheduleModule } from '@nestjs/schedule';
import {
  AccessControlModule,
  AcOptions,
} from './access-control/access-control.module';
import { Role } from './access-control/role/roles.entity';
import { AuthModule } from './auth/auth.module';
import { EMAIL_HOST, EMAIL_PASSWORD, EMAIL_USER } from './consts';
import { DbModule, DbOptions } from './db/db.module';
import { DbLog } from './logger/db-log.entity';
import { DbLoggerModule } from './logger/db-logger.module';
import { Notification } from './notification/notification.entity';
import { NotificationModule } from './notification/notification.module';
import { StorageModule, StorageOptions } from './storage/storage.module';
import { Struct } from './types';

interface ConfigOptions {
  data: string | Buffer | Struct<string>;
}
/** Params for dynamic module */
export interface CoreModuleParams {
  // config?: ConfigOptions;
  config?: ConfigModuleOptions;
  storage: StorageOptions | false;
  db: DbOptions;
  accessControl?: AcOptions;
  dbLog: boolean;
  notifications: boolean;
  mail: boolean;
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
    if (params.dbLog) entities.push(DbLog);

    const modules = [
      ConfigModule.forRoot({ ...params.config, isGlobal: true }),
      ScheduleModule.forRoot(),
      // ConfigModule.forRoot(params.config),
      DbModule.forRoot(params.db),
      AuthModule,
    ];

    // if (params.mail) modules.push(MailModule);
    if (params.mail)
      modules.push(
        MailerModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              transport: {
                host: configService.get(EMAIL_HOST),
                secure: false,
                sender: configService.get(EMAIL_USER),
                auth: {
                  user: configService.get(EMAIL_USER),
                  pass: configService.get(EMAIL_PASSWORD),
                },
              },
            };
          },
        }),
      );
    if (params.storage) modules.push(StorageModule.forRoot(params.storage));
    if (params.dbLog) modules.push(DbLoggerModule);
    if (params.notifications) modules.push(NotificationModule);
    if (params.accessControl) {
      modules.push(AccessControlModule.forRoot(params.accessControl));
    }

    return {
      imports: modules,
      module: CoreModule,
    };
  }
}
