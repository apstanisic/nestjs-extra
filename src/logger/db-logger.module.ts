import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { DbLoggerService } from './db-logger.service';
import { DbLog } from './db-log.entity';
import { LOG_DB_HOST, LOG_DB_DATABASE, LOG_DB_PORT } from '../consts';

/** This module uses NoSql db for efficient storing.
 * @Todo fix username and password
 */
@Global()
@Module({
  imports: [
    // This db is only for logging.
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: 'log_db',
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        host: config.get(LOG_DB_HOST),
        database: config.get(LOG_DB_DATABASE),
        port: parseInt(config.get(LOG_DB_PORT) || '27017', 10),
        entities: [DbLog],
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // username: config.get('LOG_DB_USER'),
        // password: config.get('LOG_DB_PASSWORD'),
      }),
    }),
    TypeOrmModule.forFeature([DbLog], 'log_db'),
  ],
  providers: [DbLoggerService],
  exports: [DbLoggerService],
})
export class DbLoggerModule {}
