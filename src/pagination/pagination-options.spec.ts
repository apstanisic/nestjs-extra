import { PaginationParams } from './pagination-options';
import { limitField, orderByField, cursorField } from './pagination.types';

describe('Pagination options', () => {
  it('does not accept value if params are not valid', () => {
    const randomString = 'some-random-string';
    const params = PaginationParams.fromRequest({
      [limitField]: randomString,
      [orderByField]: randomString,
      [cursorField]: 5,
    });

    expect(params.limit).toBeUndefined();
    expect(params.order).toBeUndefined();
    expect(params.cursor).toBeUndefined();
  });
  it('accept correct values', () => {
    const params = PaginationParams.fromRequest({
      [limitField]: 10,
      [orderByField]: 'ASC',
      [cursorField]: 'some-string-value',
    });

    expect(params.limit).toBe(10);
    expect(params.order).toBe('ASC');
    expect(params.cursor).toBe('some-string-value');
  });

  it('does not acceppt non object in fromRequest', () => {
    const params = PaginationParams.fromRequest(5 as any);
    expect(params.where).toBeUndefined();
  });
});
