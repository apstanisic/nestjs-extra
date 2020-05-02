import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_LOGGER_SERVICE } from '../consts';
import { ActivityLog } from './activity-log.entity';
import { ActivityLoggerService } from './db-logger.service';

/** Log user actions in db */
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ActivityLog])],
  providers: [
    ActivityLoggerService,
    { provide: DB_LOGGER_SERVICE, useClass: ActivityLoggerService },
  ],
  exports: [ActivityLoggerService, { provide: DB_LOGGER_SERVICE, useClass: ActivityLoggerService }],
})
export class ActivityLoggerModule {}
