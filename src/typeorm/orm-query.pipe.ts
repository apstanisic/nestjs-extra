import { Injectable, PipeTransform } from '@nestjs/common';
import { FindOperator } from 'typeorm';
import { ParsedOrmWhere, Struct } from '../types';
import { parseQuery } from './parse-to-orm-query';

// export type OrmQuery<T = any, U = FindOperator<T>> = Struct<U>;

/**
 * Wrapper around parseQuery function to be used as a pipe
 * @example
 *   method(@Body(OrmQueryPipe) user: OrmQuery) {}
 */
@Injectable()
export class OrmQueryPipe<T = any> implements PipeTransform {
  transform(value: any): ParsedOrmWhere<T> {
    return parseQuery(value);
  }
}
