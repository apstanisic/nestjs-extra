import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Validator } from 'class-validator';
import {
  FindManyOptions,
  Repository,
  FindOneOptions,
  FindConditions,
  ObjectLiteral,
} from 'typeorm';
import { Entity } from 'aws-sdk/clients/costexplorer';
import { PaginationParams } from './pagination/pagination-options';
import { PgResult } from './pagination/pagination.types';
import { paginate } from './pagination/_paginate.helper';
import { parseQuery } from './typeorm/parse-to-orm-query';
import { OrmWhere, WithId, ParsedOrmWhere } from './types';

export type FindOneParams<T> = Omit<FindOneOptions<T>, 'where'>;
export type FindManyParams<T> = Omit<FindManyOptions<T>, 'where'>;

type Where = FindConditions<Entity>[] | FindConditions<Entity> | ObjectLiteral | string;

/**
 * Base service for finding entities.
 * BaseService extends this class with methods that changes entities.
 * This is separated because LoggerService can extend this class,
 * but not BaseService class. It's because it's used in main class.
 */
export class BaseFindService<T extends WithId = any> {
  constructor(protected readonly repository: Repository<T>) {}

  /** Terminal logger */
  protected logger = new Logger();

  /** Validator */
  protected validator = new Validator();

  /** Use only when you must. If this method is used, that means api should be updated */
  public _getRepository(): Repository<T> {
    return this.repository;
  }

  /**
   * Find companies that match criteria
   * If filter is string or number it will search for Id
   * @example Left is passed value, right is parsed
   *  ({ price__lt: 5 } => { price: LessThan(5) })
   */
  async findOne(filter: OrmWhere<T> | number, searchOptions: FindManyOptions<T> = {}): Promise<T> {
    let entity: T | undefined;
    let where;

    // If string or number, then search by id
    if (typeof filter === 'string' || typeof filter === 'number') {
      where = { id: filter };
    } else {
      where = filter;
    }

    where = this.combineWheres(where, searchOptions.where);

    try {
      entity = await this.repository.findOne({ ...searchOptions, where });
    } catch (error) {
      throw this.internalError('FindOne error', error);
    }

    if (!entity) throw new NotFoundException();
    return entity;
  }

  /** Find entities by multiple ids */
  async findByIds(ids: (string | number)[], searchOptions: FindManyOptions<T> = {}): Promise<T[]> {
    try {
      const entities = await this.repository.findByIds(ids, searchOptions);
      return entities;
    } catch (error) {
      throw this.internalError('FindbyIds error', error);
    }
  }

  /** Find all entities that match criteria */
  async find(filter: OrmWhere<T> = {}, searchOptions: FindManyOptions<T> = {}): Promise<T[]> {
    const where = this.combineWheres(filter, searchOptions.where);
    try {
      const res = await this.repository.find({ ...searchOptions, where });
      return res;
    } catch (error) {
      throw this.internalError('Find error', error);
    }
  }

  /**
   * Find entities that match criteria with pagination.
   * Pagination has it's own error handling. Don't handle errors twice
   * You can pass where query in options object or as a second param.
   * It will merge both wheres, with newer where having presedance.
   * @Todo check this
   */
  async paginate(options: PaginationParams<T>, where?: OrmWhere<T>): PgResult<T> {
    const { repository } = this;
    const combinedOptions = { ...options };

    combinedOptions.where = this.combineWheres(options.where, where);

    const paginated = await paginate({ repository, options: combinedOptions });
    return paginated;
  }

  /** Count result of a query */
  async count(filter: OrmWhere<T>, searchOptions: FindManyOptions<T> = {}): Promise<number> {
    const where = this.combineWheres(filter, searchOptions.where);
    try {
      const count = await this.repository.count({ ...searchOptions, where });
      return count;
    } catch (error) {
      throw this.internalError('Count error', error);
    }
  }

  protected internalError(message: string, error?: any): InternalServerErrorException {
    this.logger.error(message, error);
    return new InternalServerErrorException();
  }

  /** Combine 2 where. If both aren't objects take 1 that is. If neither are take 1st */
  protected combineWheres(where1: Where = {}, where2: Where = {}): ParsedOrmWhere<T> {
    let combined;
    if (typeof where1 === 'object' && typeof where2 === 'object') {
      combined = { ...where1, ...where2 };
    } else if (typeof where1 === 'object') {
      combined = { ...where1 };
    } else if (typeof where2 === 'object') {
      combined = { ...where2 };
    } else {
      combined = where1;
    }
    return parseQuery(combined);
  }
}
