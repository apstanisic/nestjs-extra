import { Repository } from 'typeorm';
import { PgResult } from './pagination.types';
import { PaginationParams } from './pagination-options';
import { Paginator } from './_paginator';
import { WithId } from '../types';

interface Params<T> {
  repository: Repository<T>;
  options: PaginationParams<T>;
}
/**
 * Simmple helper function for Paginator class
 * @param repository TypeOrm repository to be used to fetch data
 * @param options that tell pagination what to get, and provides filter
 */
export async function paginate<T extends WithId>({
  repository,
  options,
}: Params<T>): PgResult<T> {
  const paginator = new Paginator(repository);
  await paginator.setOptions(options);
  return paginator.execute();
}
