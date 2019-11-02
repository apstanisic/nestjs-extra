import {
  BadRequestException,
  InternalServerErrorException,
  Logger,
  Optional,
  Inject,
} from '@nestjs/common';
import { Validator } from 'class-validator';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { BaseFindService } from './base-find.service';
import { DbLoggerService } from './logger/db-logger.service';
import { LogMetadata } from './logger/log-metadata';
import { Log } from './logger/log.entity';
import { WithId } from './types';
import { DB_LOGGER_SERVICE } from './consts';

export type FindOneParams<T> = Omit<FindOneOptions<T>, 'where'>;
export type FindManyParams<T> = Omit<FindManyOptions<T>, 'where'>;

/**
 * Base service that implements some basic methods.
 * Services are in change of throwing HTTP errors.
 * There is no need for every controller to check if result
 * is null, this service will automatically check for him.
 * Methods that chanages data (update, delete create) can accept meta
 * as their last parameter. It's used for logging, if logger is provided.
 * Info contains user that executes operation and reason. More info
 * can be added in the future. If meta object is provided user is required.
 * Time of execution is automaticly created. Can't be manually set.
 * @warning Don't return promise directly. If repo throw an error,
 * service should catch her and pass error that can be shown
 * to users.
 */
export class BaseService<T extends WithId = any> extends BaseFindService<T> {
  /** Accepts repository for accessing data, and loger service for logging */
  constructor(repository: Repository<T>) {
    super(repository);
  }

  @Optional()
  @Inject(DB_LOGGER_SERVICE)
  protected readonly dbLoggerService?: DbLoggerService<T>;

  /** Terminal logger. All extending classes can use it */
  protected logger = new Logger();

  /** Validator */
  protected validator = new Validator();

  /** Create new entity */
  async create(data: Partial<T>, meta?: LogMetadata): Promise<T> {
    try {
      const entity = this.repository.create(data);
      const savedEntity = await this.repository.save(entity);

      if (this.dbLoggerService && meta) {
        const log = this.dbLoggerService.generateLog({ meta });
        await this.dbLoggerService.store(log, 'create', savedEntity);
      }

      return savedEntity;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  /** Update entity */
  async update(
    entityOrId: T | string,
    updatedData: Partial<T> = {},
    meta?: LogMetadata,
  ): Promise<T> {
    try {
      const entity = await this.findOne(entityOrId);
      let log: Log | undefined;

      if (this.dbLoggerService && meta) {
        log = this.dbLoggerService.generateLog({ meta, oldValue: entity });
      }

      this.repository.merge(entity, updatedData);
      const updatedEntity = await this.repository.save(entity);

      if (this.dbLoggerService && log) {
        await this.dbLoggerService.store(log, 'update', updatedEntity);
      }

      return updatedEntity;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }

  /**
   * Accepts mutated entity, instead of original entity and changes.
   * Used when entities have special setters.
   */
  async mutate(entity: T, meta?: LogMetadata): Promise<T> {
    try {
      let log: Log | undefined;

      if (this.dbLoggerService && meta) {
        const oldValue = await this.findOne(entity.id);
        log = this.dbLoggerService.generateLog({ meta, oldValue });
      }
      const mutatedEntity = await this.repository.save(entity);

      if (this.dbLoggerService && log) {
        await this.dbLoggerService.store(log, 'update', mutatedEntity);
      }
      return mutatedEntity;
    } catch (error) {
      this.logger.error(error);
      throw new BadRequestException();
    }
  }

  /** Update entity by providing where clause. Only one entity updated. */
  async updateWhere(
    where: FindConditions<T>,
    data: Partial<T>,
    meta?: LogMetadata,
  ): Promise<T> {
    const entity = await this.findOne(where);
    const updated = await this.update(entity, data, meta);
    return updated;
  }

  /** Remove entity. */
  async delete(entityOrId: T | string, meta?: LogMetadata): Promise<T> {
    try {
      const entity = await this.findOne(entityOrId);
      let log: Log | undefined;

      if (this.dbLoggerService && meta) {
        log = this.dbLoggerService.generateLog({ oldValue: entity, meta });
      }

      const deleted = await this.repository.remove(entity);

      if (this.dbLoggerService && log !== undefined) {
        await this.dbLoggerService.store(log, 'delete');
      }

      return deleted;
    } catch (error) {
      throw this.internalError(error);
    }
  }

  /**
   * Delete first entity that match condition.
   * Useful when need more validation.
   * Deletion will always be logged if logService is provided
   * @example This will delete only if id match, but also parent match
   *  where = {id: someId, parentId: someParentId}
   */
  async deleteWhere(
    where: FindConditions<T>,
    logMetadata?: LogMetadata,
  ): Promise<T> {
    const entity = await this.findOne(where);
    const deleted = await this.delete(entity, logMetadata);
    return deleted;
  }

  protected internalError(error: any): InternalServerErrorException {
    this.logger.error(error);
    return new InternalServerErrorException();
  }
}
