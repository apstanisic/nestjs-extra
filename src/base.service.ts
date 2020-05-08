import {
  BadRequestException,
  Inject,
  InternalServerErrorException,
  Optional,
} from '@nestjs/common';
import { FindConditions, Repository, DeleteResult } from 'typeorm';
import { BaseFindService } from './base-find.service';
import { DB_LOGGER_SERVICE } from './consts';
import { ActivityLogMetadata } from './logger/activity-log-metadata';
import { ActivityLog } from './logger/activity-log.entity';
import { ActivityLoggerService } from './logger/db-logger.service';
import { WithId, IdType } from './types';
import { validate, isIn } from 'class-validator';
import { validateEntity } from './entities/validate-entity';

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
export class BaseService<Entity extends WithId = any> extends BaseFindService<Entity> {
  /**
   * Initialize BaseService
   * @param repository Repository to be used
   */
  constructor(repository: Repository<Entity>) {
    super(repository);
    this.logger.setContext(BaseService.name);
  }

  /**
   * Db logger is optional
   */
  @Optional()
  @Inject(DB_LOGGER_SERVICE)
  protected readonly dbLoggerService?: ActivityLoggerService<Entity>;

  /**
   * Create new entity in db
   */
  async create(data: Partial<Entity>, meta?: ActivityLogMetadata): Promise<Entity> {
    const entity = this.repository.create(data);
    await validateEntity(entity);
    const savedEntity = await this.repository.save(entity);

    if (this.dbLoggerService && meta) {
      const log = this.dbLoggerService.generateLog({ meta });
      await this.dbLoggerService.store(log, 'create', savedEntity);
    }

    return savedEntity;
  }

  /**
   * Update entity
   * @param usePassedEntity is used for updateWhere
   */
  async update(
    entityOrId: Entity | IdType,
    updatedData: Partial<Entity> = {},
    meta?: ActivityLogMetadata,
    options?: {
      usePassedEntity: boolean;
    },
  ): Promise<Entity> {
    // if entity is passed just update it, if id, find and update
    let entity: Entity;

    if (typeof entityOrId === 'string' || typeof entityOrId === 'number') {
      entity = await this.findOne(entityOrId);
    } else if (options?.usePassedEntity) {
      if (!entityOrId.id) throw this.internalError('Entity id is null od update');
      entity = entityOrId;
    } else {
      entity = await this.findOne(entityOrId);
    }

    let log: ActivityLog | undefined;

    if (this.dbLoggerService && meta) {
      log = this.dbLoggerService.generateLog({ meta, oldValue: entity });
    }

    const merged = this.repository.merge(entity, updatedData);
    await validateEntity(merged);
    const updatedEntity = await this.repository.save(merged);

    if (this.dbLoggerService && log) {
      await this.dbLoggerService.store(log, 'update', updatedEntity);
    }

    return updatedEntity;
  }

  /**
   * Update entity by providing where clause. Only one entity updated.
   */
  async updateWhere(
    where: FindConditions<Entity>,
    data: Partial<Entity>,
    meta?: ActivityLogMetadata,
  ): Promise<Entity> {
    const entity = await this.findOne(where);
    const updated = await this.update(entity, data, meta, { usePassedEntity: true });
    return updated;
  }

  /**
   * Accepts mutated entity, instead of original entity and changes.
   * Used when entities have special setters.
   */
  async mutate(entity: Entity, meta?: ActivityLogMetadata): Promise<Entity> {
    let log: ActivityLog | undefined;

    if (this.dbLoggerService && meta) {
      const oldValue = await this.findOne(entity.id);
      log = this.dbLoggerService.generateLog({ meta, oldValue });
    }
    await validateEntity(entity);
    const mutatedEntity = await this.repository.save(entity);

    if (this.dbLoggerService && log) {
      await this.dbLoggerService.store(log, 'update', mutatedEntity);
    }
    return mutatedEntity;
  }

  /** Remove entity. */
  async delete(
    entityOrId: Entity | IdType,
    meta?: ActivityLogMetadata,
    options?: {
      usePassedEntity: boolean;
    },
  ): Promise<Entity> {
    // if entity is passed just update it, if id, find and update
    let entity: Entity;
    if (typeof entityOrId === 'string' || typeof entityOrId === 'number') {
      entity = await this.findOne(entityOrId);
    } else if (options?.usePassedEntity) {
      entity = entityOrId;
    } else {
      entity = await this.findOne(entityOrId);
    }

    if (!entity.id) throw this.internalError('Entity for deletion does not have id');

    let log: ActivityLog | undefined;

    if (this.dbLoggerService && meta) {
      log = this.dbLoggerService.generateLog({ oldValue: entity, meta });
    }

    const deleted = await this.repository.remove(entity);

    if (this.dbLoggerService && log !== undefined) {
      await this.dbLoggerService.store(log, 'delete');
    }

    return deleted;
  }

  /**
   * Delete first entity that match condition.
   * Useful when need more validation.
   * Deletion will always be logged if logService is provided
   * @example This will delete only if id match, but also parent match
   * where = {id: someId, parentId: someParentId}
   */
  async deleteWhere(
    where: FindConditions<Entity>,
    logMetadata?: ActivityLogMetadata,
  ): Promise<Entity> {
    const entity = await this.findOne(where);
    const deleted = await this.delete(entity, logMetadata, { usePassedEntity: true });
    return deleted;
  }

  /** Delete many entities. Sometimes it's just easier */
  async deleteMany(criteria: FindConditions<Entity>): Promise<DeleteResult> {
    return this.repository.delete(criteria);
  }
}
