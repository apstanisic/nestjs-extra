import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbLoggerService } from './db-logger.service';
import { Log } from './log.entity';
import { ConfigService } from '../config/config.service';

/** This module uses NoSql db for efficient storing. */
@Global()
@Module({
  imports: [
    // This db is only for logging.
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      name: 'log_db',
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        host: config.get('LOG_DB_HOST'),
        database: config.get('LOG_DB_DATABASE'),
        port: Number(config.get('LOG_DB_PORT')),
        entities: [Log],
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // username: config.get('LOG_DB_USER'),
        // password: config.get('LOG_DB_PASSWORD'),
      }),
    }),
    TypeOrmModule.forFeature([Log], 'log_db'),
  ],
  providers: [DbLoggerService],
  exports: [DbLoggerService],
})
export class LoggerModule {}
