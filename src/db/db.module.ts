import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
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
            const shouldCache = config.get<boolean>(REDIS_HOST) !== undefined;
            const isProduction = config.get(NODE_ENV) === 'production';

            const options: TypeOrmModuleOptions = {
              entities: params.entities,
              type: 'postgres',
              host: config.get(DB_HOST),
              database: config.get(DB_DATABASE),
              username: config.get(DB_USER),
              password: config.get(DB_PASSWORD),
              port: Number(config.get(DB_PORT) ?? 5432),
              maxQueryExecutionTime: 3000,
              synchronize: !isProduction,
              logging: isProduction ? ['error'] : 'all',
              cache: shouldCache && {
                type: 'redis',
                options: {
                  host: config.get(REDIS_HOST),
                  port: config.get(REDIS_PORT) ?? '6379',
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
