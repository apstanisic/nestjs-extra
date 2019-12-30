import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
  REDIS_HOST,
  REDIS_PORT,
} from '../consts';

export interface DbOptions {
  entities: any[];
}

@Module({})
export class DbModule {
  static forRoot(params: DbOptions): DynamicModule {
    return {
      module: DbModule,
      imports: [
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (config: ConfigService): TypeOrmModuleOptions => {
            const envs = config.getAll();
            const shouldCache = envs[REDIS_HOST] !== undefined;
            const isProduction = envs[NODE_ENV] === 'production';

            const options: TypeOrmModuleOptions = {
              entities: params.entities,
              type: 'postgres',
              host: envs[DB_HOST],
              database: envs[DB_DATABASE],
              username: envs[DB_USER],
              password: envs[DB_PASSWORD],
              port: Number(envs[DB_PORT] ?? 5432),
              maxQueryExecutionTime: 3000,
              synchronize: !isProduction,
              logging: isProduction ? ['error'] : 'all',
              cache: shouldCache && {
                type: 'redis',
                options: {
                  host: envs[REDIS_HOST],
                  port: envs[REDIS_PORT] ?? '6379',
                },
                duration: 10000,
              },
            };

            return options;
          },
        }),
      ],
    };
  }
}
