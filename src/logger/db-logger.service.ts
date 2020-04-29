import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseFindService } from '../base-find.service';
import { WithId } from '../types';
import { DbLogMetadata } from './db-log-metadata';
import { DbLog } from './db-log.entity';

interface GenerateLogParams<T> {
  oldValue?: T;
  meta: DbLogMetadata;
}

@Injectable()
export class DbLoggerService<Entity extends WithId = any> extends BaseFindService<DbLog> {
  constructor(@InjectRepository(DbLog) repository: Repository<DbLog>) {
    super(repository);
  }

  /**
   * Initialize log. This will create log entity, and fill some fields.
   * @warning This will not save log in database. This only creates instance.
   * You must use store for persisting in db.
   * @TODO Check if user as any is okay
   */
  generateLog({ oldValue, meta }: GenerateLogParams<Entity>): DbLog<Entity> {
    const { domain, user, reason } = meta;
    const log = new DbLog<Entity>(oldValue);
    log.domainId = typeof domain === 'object' ? domain.id : domain;
    log.executedBy = user as any;
    log.reason = reason;

    return log;
  }

  /** Save provided log to database */
  async store(log: DbLog, action: string, newValue?: Entity): Promise<DbLog> {
    log.action = action;
    log.newValue = newValue;
    return this.repository.save(log);
  }
}
