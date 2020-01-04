import * as Faker from 'faker';
import { Paginator } from './_paginator';
import { PaginationParams } from './pagination-options';
import { GenerateCursor } from './_generate-cursor';
import { PaginatorResponse, cursorField, orderByField } from './pagination.types';

describe('Paginator', () => {
  let paginator: Paginator<any>;
  let mock: jest.Mock;

  beforeEach(() => {
    mock = jest.fn(() => ['some-value']);
    paginator = new Paginator({ find: mock } as any);
  });

  it('executes with valid params', async () => {
    const params = new PaginationParams();
    params.currentUrl = '/hello/world';
    params.cursor = new GenerateCursor(
      {
        id: Faker.random.uuid(),
        createdAt: new Date(),
      },
      'next',
      'createdAt',
    ).cursor;
    params.relations = ['user'];
    params.limit = 5;
    params.order = 'ASC';

    await paginator.setOptions(params);
    expect(mock.mock.calls.length).toBe(0);

    const result = await paginator.execute();
    expect(mock.mock.calls.length).toBe(1);

    expect(result).toBeInstanceOf(PaginatorResponse);
    expect(result.data).toBe(mock.mock.results[0].value);
  });

  it('throws an error with invalid cursor', async () => {
    const invalid1 = PaginationParams.fromRequest({ [cursorField]: 'fsaffd' });
    await expect(paginator.setOptions(invalid1)).rejects.toThrow();
  });

  it('removes fields that do not match property type', async () => {
    const invalid = PaginationParams.fromRequest({ [orderByField]: 'CESC' });
    await expect(paginator.setOptions(invalid)).resolves.toBeUndefined();
  });

  it('should execute normaly if cursor not provided', async () => {
    await expect(paginator.execute()).resolves.toBeTruthy();
  });
});
