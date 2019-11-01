import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import {
  DB_HOST,
  DB_PASSWORD,
  DB_USER,
  LOG_DB_DATABASE,
  LOG_DB_PORT,
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
            // const type =

            const options: TypeOrmModuleOptions = {
              type: 'postgres',
              host: envs[DB_HOST],
              database: envs[LOG_DB_DATABASE],
              username: envs[DB_USER],
              password: envs[DB_PASSWORD],
              port: parseInt(envs[LOG_DB_PORT], 10),
              maxQueryExecutionTime: 3000,
              synchronize: false,
              logging: isProduction ? ['error'] : 'all',
              entities: params.entities,
              cache: shouldCache && {
                type: 'redis',
                options: {
                  port: envs[REDIS_PORT],
                  host: envs[REDIS_HOST],
                },
                duration: 30000,
              },
            };
            return options;
          },
        }),
      ],
    };
  }
}
