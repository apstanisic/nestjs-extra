import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Db, DatabaseType, ConnectionOptions, EntitySchema } from 'typeorm';
import { BaseConnectionOptions } from 'typeorm/connection/BaseConnectionOptions';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
  DB_TYPE,
  DB_SYNC,
} from '../consts';
import { Notification } from '../notification/notification.entity';

export interface DbOptions {
  /** All entities in this app.  */
  entities: (Function | string | EntitySchema<any>)[];
  /** Can be used to replace any connection config for db */
  config?: Partial<Omit<BaseConnectionOptions, 'type'>>;
}

/**
 * Database module
 */
@Module({})
export class DbModule {
  static forRoot(params: DbOptions): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService): TypeOrmModuleOptions => {
            const redisHost = config.get(REDIS_HOST);
            const isProduction = config.get(NODE_ENV) === 'production';

            const options: TypeOrmModuleOptions = {
              entities: params.entities,
              type: config.get<Exclude<DatabaseType, 'sqljs'>>(DB_TYPE) ?? 'postgres',
              host: config.get(DB_HOST),
              database: config.get<string>(DB_DATABASE),
              username: config.get(DB_USER),
              password: config.get(DB_PASSWORD),
              port: Number(config.get(DB_PORT)),
              maxQueryExecutionTime: 3000,
              synchronize: !isProduction && config.get(DB_SYNC) !== 'false',
              logging: isProduction ? ['error'] : 'all',
              namingStrategy: new SnakeNamingStrategy(),
              cache: redisHost !== undefined && {
                type: 'redis',
                options: {
                  host: redisHost,
                  port: config.get(REDIS_PORT) ?? '6379',
                },
                duration: 10000,
              },
              ...params.config,
            };

            return options;
          },
        }),
      ],
    };
  }
}
DbModule.forRoot({ entities: [Notification] });
