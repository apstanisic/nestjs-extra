import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Optional,
} from '@nestjs/common';
import { FindConditions, Repository, DeleteResult } from 'typeorm';
import { BaseFindService } from './base-find.service';
import { DB_LOGGER_SERVICE } from './consts';
import { DbLogMetadata } from './logger/db-log-metadata';
import { DbLog } from './logger/db-log.entity';
import { DbLoggerService } from './logger/db-logger.service';
import { WithId } from './types';

/**
 * Base service that implements some basic methods.
 * Services are in change of throwing HTTP errors.
 * There is no need for every controller to check if result
 * is null, this service will automatically check for him.
 * Methods that chanages data (update, delete create) can accept object
 * as their last parameter. It's used for logging, if logger is provided.
 * Meta contains user that executes operation, domain and reason. More info
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
    this.logger.setContext(BaseService.name);
  }

  // @Inject(DbLoggerService.name)
  /** Db logger is optional */
  @Optional()
  @Inject(DB_LOGGER_SERVICE)
  protected readonly dbLoggerService?: DbLoggerService<T>;

  /** Create new entity */
  async create(data: Partial<T>, meta?: DbLogMetadata): Promise<T> {
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

  /**
   * Update entity
   * @param usePassedEntity is used for updateWhere
   */
  async update(
    entityOrId: T | string,
    updatedData: Partial<T> = {},
    meta?: DbLogMetadata,
    options?: {
      usePassedEntity: boolean;
    },
  ): Promise<T> {
    try {
      // if entity is passed just update it, if id, find and update
      let entity: T;
      if (options?.usePassedEntity) {
        if (typeof entityOrId === 'string') {
          this.logger.error('Passed entity is string');
          throw new InternalServerErrorException();
        }
        entity = entityOrId;
      } else if (typeof entityOrId === 'string') {
        entity = await this.findOne(entityOrId);
      } else {
        // Always find latest entity for update (log should have up to date info)
        entity = await this.findOne(entityOrId.id);
      }

      let log: DbLog | undefined;

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
      this.logger.error('Error updating', error);
      throw new BadRequestException();
    }
  }

  /**
   * Accepts mutated entity, instead of original entity and changes.
   * Used when entities have special setters.
   */
  async mutate(entity: T, meta?: DbLogMetadata): Promise<T> {
    try {
      let log: DbLog | undefined;

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
      this.logger.error('Error mutation', error);
      throw new BadRequestException();
    }
  }

  /** Update entity by providing where clause. Only one entity updated. */
  async updateWhere(where: FindConditions<T>, data: Partial<T>, meta?: DbLogMetadata): Promise<T> {
    const entity = await this.findOne(where);
    const updated = await this.update(entity, data, meta, { usePassedEntity: true });
    return updated;
  }

  /** Remove entity. */
  async delete(
    entityOrId: T | string,
    meta?: DbLogMetadata,
    options?: {
      usePassedEntity: boolean;
    },
  ): Promise<T> {
    try {
      // if entity is passed just update it, if id, find and update
      let entity: T;
      if (options?.usePassedEntity) {
        if (typeof entityOrId === 'string') {
          throw new InternalServerErrorException();
        }
        entity = entityOrId;
      } else if (typeof entityOrId === 'string') {
        entity = await this.findOne(entityOrId);
      } else {
        entity = await this.findOne(entityOrId.id);
      }

      let log: DbLog | undefined;

      if (this.dbLoggerService && meta) {
        log = this.dbLoggerService.generateLog({ oldValue: entity, meta });
      }

      const deleted = await this.repository.remove(entity);

      if (this.dbLoggerService && log !== undefined) {
        await this.dbLoggerService.store(log, 'delete');
      }

      return deleted;
    } catch (error) {
      this.logger.error('Problem deleting', error);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Delete first entity that match condition.
   * Useful when need more validation.
   * Deletion will always be logged if logService is provided
   * @example This will delete only if id match, but also parent match
   *  where = {id: someId, parentId: someParentId}
   */
  async deleteWhere(where: FindConditions<T>, logMetadata?: DbLogMetadata): Promise<T> {
    const entity = await this.findOne(where);
    const deleted = await this.delete(entity, logMetadata, { usePassedEntity: true });
    return deleted;
  }

  /** Delete many entities. Sometimes it's just easier */
  async deleteMany(criteria: FindConditions<T>): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }
}
