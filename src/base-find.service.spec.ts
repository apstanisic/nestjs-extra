import { InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Equal } from 'typeorm';
import { BaseFindService } from './base-find.service';
import { PaginationParams } from './pagination/pagination-options';
import { BasicUserInfo } from './users/user.interface';

const LogUser: BasicUserInfo = {
  email: 'test@ts.ts',
  id: 'fsd',
  name: 'Test',
};

// Supres NestJs console logs
Logger.overrideLogger(true);

const exampleEntity = { id: 'qwerty', name: 'some name' };

const find = jest.fn();
const findOne = jest.fn();
const findByIds = jest.fn();
const create = jest.fn();
const save = jest.fn();
const merge = jest.fn();
const remove = jest.fn();
const count = jest.fn();
const mutate = jest.fn();
const paginateMock = jest.fn();

jest.mock('./pagination/_paginate.helper', () => {
  // Returns provided option.
  const mock = jest.fn(({ options }: any): any => options);
  return {
    __esModule: true,
    paginate: mock,
  };
});

const repoMock = jest.fn(() => ({
  find,
  findOne,
  findByIds,
  create,
  save,
  merge,
  remove,
  count,
  mutate,
}));
// Base service is abstract class

describe('base-find.service', () => {
  let service: BaseFindService;

  /** Before each test */
  beforeEach(() => {
    service = new BaseFindService(repoMock() as any);
    jest.clearAllMocks();
    // Reset return value after each test
    find.mockResolvedValue([exampleEntity]);
    findOne.mockResolvedValue(exampleEntity);
    create.mockReturnValue(exampleEntity);
    findByIds.mockResolvedValue([exampleEntity]);
    save.mockResolvedValue(exampleEntity);
    merge.mockReturnValue(exampleEntity);
    remove.mockResolvedValue(exampleEntity);
    count.mockResolvedValue(3);
  });

  /** Testing service.findOne */
  describe('findOne', () => {
    it('successfully finds entity with id', async () => {
      const res = service.findOne('querty');
      await expect(res).resolves.toEqual(exampleEntity);
      expect(findOne).toBeCalledTimes(1);
      expect(findOne).toBeCalledWith({ where: { id: Equal('querty') } });
    });

    it('successfully finds entity with filter', async () => {
      const res = service.findOne({ id: 5 });
      await expect(res).resolves.toEqual(exampleEntity);
      expect(findOne).toBeCalledTimes(1);
      expect(findOne).toBeCalledWith({ where: { id: Equal(5) } });
    });

    it('throws if entity not found', async () => {
      findOne.mockResolvedValue(Promise.resolve(undefined));
      const res = service.findOne('id');
      await expect(res).rejects.toThrow(NotFoundException);
      expect(findOne).toBeCalledTimes(1);
    });

    it('throws if entity not found', async () => {
      findOne.mockRejectedValue(new Error('findOne'));
      const res = service.findOne('id');
      await expect(res).rejects.toThrow(InternalServerErrorException);
      expect(findOne).toBeCalledTimes(1);
    });
  });

  /** Test service.findByIds */
  describe('findByIds', () => {
    it('returns find value', async () => {
      findByIds.mockResolvedValue(Promise.resolve(['value1', 'value2']));
      const res = service.findByIds(['v1', 'x2', 'a3', '4fas']);
      await expect(res).resolves.toEqual(['value1', 'value2']);
    });

    it('returns if empty array', async () => {
      findByIds.mockResolvedValue(Promise.resolve([]));
      const res = service.findByIds([1, 2, 3, 4]);
      await expect(res).resolves.toEqual([]);
    });

    it('throws if repo throw', async () => {
      findByIds.mockRejectedValue(new Error('findByIds'));
      const res = service.findByIds([1, 2, 3, 4]);
      await expect(res).rejects.toThrow(InternalServerErrorException);
    });
  });

  /** Testing service.find */
  describe('find', () => {
    it('returns found results', async () => {
      const res = service.find({ some: 'value' });
      await expect(res).resolves.toEqual([exampleEntity]);
      expect(find).toBeCalledTimes(1);
      expect(find).toBeCalledWith({ where: { some: Equal('value') } });
    });

    it('returns all if filter not provided', async () => {
      const res = service.find();
      await expect(res).resolves.toEqual([exampleEntity]);
      expect(find).toBeCalledTimes(1);
      expect(find).toBeCalledWith({ where: {} });
    });

    it('throws if repo throws', async () => {
      find.mockRejectedValue(new Error('find'));
      const res = service.find({ some: 'value' });
      await expect(res).rejects.toThrow(InternalServerErrorException);
      expect(find).toBeCalledTimes(1);
      expect(find).toBeCalledWith({ where: { some: Equal('value') } });
    });
  });

  /** Testing service.count */
  describe('count', () => {
    it('counts results', async () => {
      const res = service.count({ some: 'value' });
      await expect(res).resolves.toEqual(3);
      expect(count).toBeCalledTimes(1);
      expect(count).toBeCalledWith({ where: { some: Equal('value') } });
    });

    it('passes second param to repo', async () => {
      const res = service.count({ some: 'value' }, { relations: ['user'], take: 10 });
      await expect(res).resolves.toEqual(3);
      expect(count).toBeCalledTimes(1);
      expect(count).toBeCalledWith({
        where: { some: Equal('value') },
        relations: ['user'],
        take: 10,
      });
    });

    it('throws if repo throws', async () => {
      count.mockRejectedValue(new Error('count'));
      const res = service.count({ some: 'value' });
      await expect(res).rejects.toThrow(InternalServerErrorException);
      expect(count).toBeCalledTimes(1);
      expect(count).toBeCalledWith({ where: { some: Equal('value') } });
    });
  });

  /** Testing service.paginate
   * paginate mock always retuns options param
   */
  describe('paginate', () => {
    let params: PaginationParams;

    beforeEach(() => {
      params = new PaginationParams();
      params.relations = ['test'];
      params.currentUrl = 'hello-world';
    });

    it('passes data to paginate', async () => {
      const res = service.paginate(params);
      await expect(res).resolves.toEqual({ ...params, where: {} });
    });

    it('combines params and where', async () => {
      params.where = { id: 7 };
      const res = service.paginate(params, { hello: 'world' });
      await expect(res).resolves.toEqual({
        ...params,
        where: { id: Equal(7), hello: Equal('world') },
      });
    });
  });
});
