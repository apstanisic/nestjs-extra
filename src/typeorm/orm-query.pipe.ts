import { PipeTransform, Injectable } from '@nestjs/common';
import { FindOperator } from 'typeorm';
import { parseQuery } from './parse-to-orm-query';
import { OrmWhere, Struct } from '../types';

export type OrmQuery<T = any, U = FindOperator<T>> = Struct<U>;

/**
 * Wrapper around parseQuery function to be used as a pipe
 * @example
 *   method(@Body(OrmQueryPipe) user: OrmQuery) {}
 */
@Injectable()
export class OrmQueryPipe implements PipeTransform {
  transform(value: any): OrmWhere {
    return parseQuery(value);
  }
}
