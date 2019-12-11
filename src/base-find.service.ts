import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository, FindManyOptions } from 'typeorm';
import { FindManyParams, FindOneParams } from './base.service';
import { PaginationParams } from './pagination/pagination-options';
import { PgResult } from './pagination/pagination.types';
import { paginate } from './pagination/_paginate.helper';
import { parseQuery } from './typeorm/parse-to-orm-query';
import { OrmWhere, WithId } from './types';

/**
 * Base service for finding entities.
 * BaseService extends this class with methods that changes entities.
 * This is separated because LoggerService can extend this class,
 * but not BaseService class. It's because it's used in main class.
 */
export class BaseFindService<T extends WithId = any> {
  constructor(protected readonly repository: Repository<T>) {}

  protected logger = new Logger();

  /**
   * Find companies that match criteria
   * If filter is string or number it will search for Id
   * @example Left is passed value, right is parsed
   *  ({ price__lt: 5 } => { price: LessThan(5) })
   */
  async findOne(
    filter: OrmWhere<T> | number,
    options: FindOneParams<T> = {},
  ): Promise<T> {
    let entity: T | undefined;
    let where;

    // If string or number, then search by id
    where =
      typeof filter === 'string' || typeof filter === 'number'
        ? { id: filter }
        : filter;
    where = parseQuery(where);

    try {
      entity = await this.repository.findOne({ ...options, where });
    } catch (error) {
      throw this.internalError(error);
    }

    if (!entity) throw new NotFoundException();
    return entity;
  }

  /** Find entities by multiple ids */
  async findByIds(
    ids: (string | number)[],
    searchOptions: FindManyOptions<T> = {},
  ): Promise<T[]> {
    try {
      const entities = await this.repository.findByIds(ids, searchOptions);
      return entities;
    } catch (error) {
      throw this.internalError(error);
    }
  }

  /** Find all entities that match criteria */
  async find(
    filter: OrmWhere<T> = {},
    searchOptions: FindManyParams<T> = {},
  ): Promise<T[]> {
    try {
      const res = await this.repository.find({
        ...searchOptions,
        where: parseQuery(filter),
      });
      return res;
    } catch (error) {
      throw this.internalError(error);
    }
  }

  /**
   * Find entities that match criteria with pagination.
   * Pagination has it's own error handling. Don't handle errors twice
   * You can pass where query in options object or as a second param.
   * It will merge both wheres, with newer where having presedance.
   */
  async paginate(
    options: PaginationParams<T>,
    where?: OrmWhere<T>,
  ): PgResult<T> {
    const { repository } = this;
    const combinedOptions = { ...options };

    if (
      typeof combinedOptions.where === 'object' &&
      typeof where === 'object'
    ) {
      combinedOptions.where = { ...combinedOptions.where, ...where };
    } else if (typeof where === 'object') {
      combinedOptions.where = where;
    }
    combinedOptions.where = parseQuery(combinedOptions.where);

    const paginated = await paginate({ repository, options: combinedOptions });
    return paginated;
  }

  /** Count result of a query */
  async count(
    filter: OrmWhere<T>,
    searchOptions: FindManyParams<T> = {},
  ): Promise<number> {
    try {
      const count = await this.repository.count({
        ...searchOptions,
        where: parseQuery(filter),
      });
      return count;
    } catch (error) {
      throw this.internalError(error);
    }
  }

  protected internalError(error: any): InternalServerErrorException {
    this.logger.error('BaseServiceError', error);
    return new InternalServerErrorException();
  }
}
