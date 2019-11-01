import {
  IsArray,
  IsBase64,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { parseNumber } from '../helpers';
import { IsBetween } from '../is-between';
import { OrmWhere, Struct } from '../types';
import { cursorField, limitField, orderByField } from './pagination.types';

/** Params that user can provide. T is for OrmWhere */
export class PaginationParams<T = any> {
  /** Creates new pagination options. Factory method for this class.
   * @param queryOrBody Request body or query. Must be object.
   * Does not have to be from request, but it's keys are important
   * when using this constructor
   */
  static fromRequest<T>(queryOrBody?: Struct): PaginationParams<T> {
    const params = new PaginationParams<T>();
    if (typeof queryOrBody !== 'object') return params;
    const query = { ...queryOrBody };

    params.where = query;

    let order = query[orderByField];

    if (typeof order === 'string') {
      order = order.toUpperCase();
      if (order === 'ASC' || order === 'DESC') {
        params.order = order;
      }
    }

    params.limit = parseNumber(query[limitField]);

    if (typeof query[cursorField] === 'string') {
      params.cursor = query[cursorField];
    }
    return params;
  }

  @IsOptional()
  @IsInt()
  @IsBetween(1, 48)
  limit?: number;

  @IsOptional()
  @IsString()
  // @IsBase64()
  cursor?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';

  /** Current url provided by framework. Used for generating next url */
  @IsOptional()
  @IsString()
  currentUrl?: string;

  /** All query data */
  where?: OrmWhere<T>;

  /** Relations that needs to be fetched */
  @IsArray()
  @IsString({ each: true })
  relations: string[] = [];
}
