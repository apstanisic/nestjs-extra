/**
 * For internal use. Result object from pagination.
 * Use PaginationResponse for docs
 */
export class PaginatorResponse<T = any> {
  constructor() {
    // There must be pagination object
    this.pagination = {
      amount: 0,
      perPage: 12,
      isFirstPage: true,
      isLastPage: true,
    };
  }

  /** Pagination metadata */
  pagination: {
    amount: number;
    perPage: number;
    isFirstPage?: boolean;
    firstUrl?: string;
    isLastPage: boolean;
    lastUrl?: string;
    next?: string;
    previous?: string;
    nextUrl?: string;
    previousUrl?: string;
  };

  /** Retrived data */
  data: T[];
}

/** Every db query is async, so response is always Promise of PgResult */
export type PgResult<T> = Promise<PaginatorResponse<T>>;

/** Fields that user can pass in query string */
export const limitField = 'pg_limit';
export const cursorField = 'pg_cursor';
/** Values are 'ASC' or 'DESC' */
export const orderByField = 'pg_order';
