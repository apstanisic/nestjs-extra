import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseFindService } from '../base-find.service';
import { WithId } from '../types';
import { DbLogMetadata } from './db-log-metadata';
import { DbLog } from './db-log.entity';

@Injectable()
export class DbLoggerService<T extends WithId = any> extends BaseFindService<
  DbLog
> {
  constructor(
    @InjectRepository(DbLog, 'log_db') repository: Repository<DbLog>,
  ) {
    super(repository);
  }

  /**
   * Initialize log. This will create log entity, and fill some fields.
   * @warning This will not save log in database. You must use store.
   */
  generateLog({
    oldValue,
    meta,
  }: {
    oldValue?: T;
    meta: DbLogMetadata;
  }): DbLog<T> {
    const { domain, user: by, reason } = meta;
    const log = new DbLog<T>();
    log.domainId = typeof domain === 'object' ? domain.id : domain;
    log.executedBy = by;
    log.reason = reason;
    log.initialValue = oldValue;
    if (oldValue) {
      log.entityId = oldValue.id;
    }

    return log;
  }

  /** Store provided log to database */
  async store(log: DbLog, action: string, newValue?: T): Promise<DbLog> {
    log.action = action;
    log.newValue = newValue;
    return this.repository.save(log);
  }
}
