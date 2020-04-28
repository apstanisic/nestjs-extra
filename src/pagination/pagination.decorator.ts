import { validate } from 'class-validator';
import { createParamDecorator, BadRequestException, ExecutionContext } from '@nestjs/common';
import { PaginationParams } from './pagination-options';

/**
 * Convert query to pagination request object
 * In most cases it will just ignore invalid values.
 * but it will run validation just in case, for added security.
 * @param query Query that user passed from request. We don't know type.
 * It is object, but it's still better to check.
 */
async function convert(query: any, url?: string): Promise<PaginationParams> {
  const options = PaginationParams.fromRequest(query);
  options.currentUrl = url;
  const errors = await validate(options);
  if (errors.length > 0) throw new BadRequestException(errors);
  return options;
}

/**
 * Pagination decorator for express.
 * @example
 *  someMethod(@GetPagination() pg: PaginationParams)
 */
export const GetPagination = createParamDecorator(
  async (data, ctx: ExecutionContext): Promise<PaginationParams> => {
    const { query, originalUrl } = ctx.switchToHttp().getRequest();
    return convert(query, originalUrl);
  },
);
