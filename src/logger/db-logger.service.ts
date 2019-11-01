import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseFindService } from '../base-find.service';
import { WithId } from '../types';
import { LogMetadata } from './log-metadata';
import { Log } from './log.entity';

// @Injectable({ scope: Scope.REQUEST })
@Injectable()
export class DbLoggerService<T extends WithId = any> extends BaseFindService<
  Log
> {
  constructor(@InjectRepository(Log, 'log_db') repository: Repository<Log>) {
    super(repository);
  }

  /**
   * Initialize log. This will create log entity, and fill some fields.
   * @warning This will not save log in database. You must use store.
   */
  generateLog({ oldValue, meta }: { oldValue?: T; meta: LogMetadata }): Log<T> {
    const { domain, user: by, reason } = meta;
    const log = new Log<T>();
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
  async store(log: Log, action: string, newValue?: T): Promise<Log> {
    log.action = action;
    log.newValue = newValue;
    return this.repository.save(log);
  }
}
