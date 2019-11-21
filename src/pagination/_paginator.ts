import { BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { FindManyOptions, Repository } from 'typeorm';
import * as queryString from 'query-string';
import { convertToObject } from '../helpers';
import { OrmWhere, WithId } from '../types';
import { PaginationParams } from './pagination-options';
import { PaginatorResponse, PgResult, cursorField } from './pagination.types';
import { GenerateCursor } from './_generate-cursor';
import { ParseCursor } from './_parse-cursor';

/**
 * Format is: uuid;columnName;columnValue;direction
 * So if we sort by createdAt, it will look like this
 * 8a4ba6e0-6dd9-4207-b179-6d922555d38e;createdAt;1567457902579;next
 * If column name ends with "At", value will be inferred to be date.
 * It will order and filter:
 * @example
 *  order: { createdAt: this.order },
 *  take: this.limit,
 *  where: {
 *    ...additionalFilter,
 *    ...parsedQuery // Automatically added
 *  },
 */
export class Paginator<T extends WithId> {
  /* How much entities to return */
  private limit: number = 12;

  /** Select order. By default show newest. */
  private orderDirection: 'ASC' | 'DESC' = 'DESC';

  /** Column that should be ordered. Only using createdAt for now */
  private orderBy: string = 'createdAt';

  /** Cursor provided from request. If null that means that it's first page */
  private cursor?: string;

  /** Is user requesting previous or next page */
  private direction: 'prev' | 'next' = 'next';

  /** All relations that repo should fetch */
  private relations: string[] = [];

  /** Url of current request */
  private currentUrl?: string;

  /** Query from request. If filter is not provided, use this */
  private requestQuery: OrmWhere<T>;

  /** Typeorm repository for getting results */
  constructor(private readonly repo: Repository<T>) {}
  /** Repository that fetches entities */
  // private repo: Repository<T>;
  // this.repo = repo;
  // }

  /** Validate and set order, limit and cursor */
  async setOptions(params: PaginationParams): Promise<void> {
    const errors = await validate(params);
    if (errors.length > 0) throw new BadRequestException(errors);

    this.limit = params.limit || this.limit;
    this.orderDirection = params.order || 'DESC';
    this.cursor = params.cursor;
    this.requestQuery = params.where;
    this.relations = params.relations;
    this.currentUrl = params.currentUrl;
  }

  /* Execute query */
  async execute(filter?: OrmWhere<T>): PgResult<T> {
    let cursorQuery;
    if (this.cursor) {
      const cursor = new ParseCursor(this.cursor, this.orderDirection);
      cursorQuery = cursor.query;
      this.direction = cursor.direction;
    } else {
      cursorQuery = {};
    }

    // Reverse order if prev page
    if (this.direction === 'prev') {
      this.orderDirection = this.orderDirection === 'ASC' ? 'DESC' : 'ASC';
    }

    // If filter is not provided,
    // and user didn't forbid to use query, use query
    const whereQuery = filter || this.requestQuery;
    if (typeof whereQuery === 'string') {
      throw new BadRequestException('Filter is string');
    }

    let where = convertToObject(whereQuery);
    where = { ...where, ...cursorQuery };

    const result = await this.repo.find({
      where,
      order: { [this.orderBy]: this.orderDirection, id: this.orderDirection },
      take: this.limit + 1,
      relations: this.relations,
    } as FindManyOptions<T>);

    return this.parseResponse(result);
  }

  /** Result will contain one item more to check if there's next page */
  private parseResponse(result: T[]): PaginatorResponse {
    // If amount of results are same or smaller then limit, then end reached.
    // We are fetching one record more for this
    const endReached = this.limit >= result.length;
    const response = new PaginatorResponse<T>();
    let isFirstPage = false;
    let isLastPage = false;
    let next;
    let previous;
    let nextUrl;
    let previousUrl;
    let lastUrl;
    let firstUrl;

    // If end is reaced, set isLastPage or isFirstPage, depending on direction.
    // If not remove last item from result that was used for checking.
    if (endReached) {
      if (this.direction === 'next') {
        isLastPage = true;
      } else {
        isFirstPage = true;
      }
    } else {
      result.pop();
    }
    // If cursor is not provided then it's first page
    if (this.cursor === undefined) {
      isFirstPage = true;
    }

    // If user requested previous page, reverse result order.
    result = this.direction === 'next' ? result : result.reverse();

    // Set next and nextUrl
    if (!isLastPage && this.currentUrl) {
      const lastItem = result[result.length - 1];
      next = new GenerateCursor(lastItem, 'next', this.orderBy).cursor;
      const { query, url } = queryString.parseUrl(this.currentUrl);
      query[cursorField] = next;
      // nextUrl = queryString.stringify(query);
      nextUrl = `${url}?${queryString.stringify(query)}`;
    }

    // Set previous and previousUrl
    if (!isFirstPage && this.currentUrl) {
      const firstItem = result[0];
      previous = new GenerateCursor(firstItem, 'prev', this.orderBy).cursor;
      const { query, url } = queryString.parseUrl(this.currentUrl);
      query[cursorField] = previous;
      previousUrl = `${url}?${queryString.stringify(query)}`;
    }
    if (this.currentUrl) {
      const url = queryString.parseUrl(this.currentUrl);
      delete url.query[cursorField];
      firstUrl = `${url.url}?${queryString.stringify(url.query)}`;
    }

    /* return response */
    response.pagination = {
      lastUrl,
      isLastPage,
      firstUrl,
      isFirstPage,
      previous,
      next,
      nextUrl,
      previousUrl,
      perPage: this.limit,
      amount: result.length,
    };
    response.data = result;
    return response;
  }
}
