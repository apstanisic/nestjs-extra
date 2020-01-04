import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_LOGGER_SERVICE } from '../consts';
import { DbLog } from './db-log.entity';
import { DbLoggerService } from './db-logger.service';

/** This module uses NoSql db for efficient storing.
 * @Todo fix username and password
 */
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([DbLog])],
  providers: [DbLoggerService, { provide: DB_LOGGER_SERVICE, useClass: DbLoggerService }],
  exports: [DbLoggerService, { provide: DB_LOGGER_SERVICE, useClass: DbLoggerService }],
})
export class DbLoggerModule {}
