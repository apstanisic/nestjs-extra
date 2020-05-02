import { InternalServerErrorException, Logger, BadRequestException } from '@nestjs/common';
import { BaseService } from './base.service';
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

/** Base service */
describe('BaseService', () => {
  let service: BaseService;

  /** Before each test */
  beforeEach(() => {
    service = new BaseService(repoMock() as any);
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

  /** Testing service.delete */
  describe('delete', () => {
    it('deletes an entity with id', async () => {
      const res = service.delete('some-id');
      await expect(res).resolves.toEqual(exampleEntity);
      expect(remove).toBeCalledTimes(1);
      expect(remove).toReturnWith(Promise.resolve(exampleEntity));
    });

    it('deletes an entity', async () => {
      const res = service.delete(exampleEntity);
      await expect(res).resolves.toEqual(exampleEntity);
      expect(remove).toBeCalledTimes(1);
      expect(remove).toReturnWith(Promise.resolve(exampleEntity));
    });

    it('throws if convertToEntity throws', async () => {
      findOne.mockRejectedValue(new Error('delete convert throws'));
      // remove.mockResolvedValue(exampleEntity);
      const res = service.delete('entity-id');
      await expect(res).rejects.toThrow(InternalServerErrorException);
      expect(findOne).toBeCalledTimes(1);
      expect(remove).not.toBeCalled();
    });

    it('throws if remove throws', async () => {
      // findOne.mockResolvedValueOnce(exampleEntity);
      remove.mockRejectedValue(new Error('delete remove throws'));
      const res = service.delete('entity-id');
      await expect(res).rejects.toThrow(InternalServerErrorException);
      expect(findOne).toBeCalledTimes(1);
      expect(remove).toBeCalledTimes(1);
    });
  });

  /** Testing service.update */
  describe('update', () => {
    it('updates the entity with id', async () => {
      const res = service.update('entity-id', { id: 'test' });
      await expect(res).resolves.toEqual(exampleEntity);
      expect(findOne).toBeCalledTimes(1);
      expect(merge).toBeCalledTimes(1);
      expect(merge).toBeCalledWith(exampleEntity, { id: 'test' });
      expect(save).toBeCalledTimes(1);
    });

    it('updates the entity', async () => {
      const res = service.update(exampleEntity, { id: 'test' });
      await expect(res).resolves.toEqual(exampleEntity);
      expect(findOne).toBeCalled();
      expect(merge).toBeCalledTimes(1);
      expect(merge).toBeCalledWith(exampleEntity, { id: 'test' });
      expect(save).toBeCalledTimes(1);
    });

    // it('updates the user without new data', async () => {
    //   const res = service.update(exampleEntity);
    //   await expect(res).resolves.toEqual(exampleEntity);
    //   expect(findOne).not.toBeCalled();
    //   expect(merge).toBeCalledTimes(1);
    //   expect(merge).toBeCalledWith(exampleEntity, {});
    //   expect(save).toBeCalledTimes(1);
    // });

    it('throws if repo throws', async () => {
      save.mockRejectedValue(new Error('update repo throws'));
      const res = service.update(exampleEntity);
      await expect(res).rejects.toThrow(BadRequestException);
      expect(merge).toBeCalledWith(exampleEntity, {});
    });

    it('throws if repo.merge throws', async () => {
      merge.mockImplementation(() => {
        throw new Error('update merge throws');
      });
      const res = service.update(exampleEntity);
      await expect(res).rejects.toThrow(BadRequestException);
      expect(merge).toBeCalledWith(exampleEntity, {});
    });
  });

  /** Testing service.mutate */
  describe('mutate', () => {
    it('mutate entity', async () => {
      const res = service.mutate(exampleEntity);
      await expect(res).resolves.toEqual(exampleEntity);
      expect(findOne).not.toBeCalled();
      expect(merge).not.toBeCalled();
      expect(save).toBeCalledTimes(1);
    });

    // it('updates the user without new data', async () => {
    //   const res = service.update(exampleEntity);
    //   await expect(res).resolves.toEqual(exampleEntity);
    //   expect(findOne).not.toBeCalled();
    //   expect(merge).toBeCalledTimes(1);
    //   expect(merge).toBeCalledWith(exampleEntity, {});
    //   expect(save).toBeCalledTimes(1);
    // });

    it('throws if repo throws', async () => {
      save.mockRejectedValue(new Error('mutate repo throws'));
      const res = service.update(exampleEntity);
      await expect(res).rejects.toThrow(BadRequestException);
      expect(merge).toBeCalledWith(exampleEntity, {});
    });
  });

  /** Testing service.updateWhere */
  describe('updateWhere', () => {
    it('updates entity with conditions', async () => {
      service.findOne = jest.fn().mockResolvedValue(exampleEntity);
      service.update = jest.fn().mockResolvedValue(exampleEntity);

      const filter = { id: '34' };

      const res = service.updateWhere(filter as any, exampleEntity);
      await expect(res).resolves.toEqual(exampleEntity);
      expect(service.findOne).toBeCalledTimes(1);
      expect(service.findOne).toBeCalledWith(filter);
      expect(service.update).toBeCalledTimes(1);
      expect(service.update).toBeCalledWith(exampleEntity, exampleEntity, undefined);
    });
  });

  /** Testing service.deleteWhere */
  describe('deleteWhere', () => {
    it('delete entity with conditions', async () => {
      service.findOne = jest.fn().mockResolvedValueOnce(exampleEntity);
      service.delete = jest.fn().mockResolvedValueOnce(exampleEntity);

      const filter = { id: '34' };

      const res = service.deleteWhere(filter as any);
      await expect(res).resolves.toEqual(exampleEntity);
      expect(service.findOne).toBeCalledTimes(1);
      expect(service.findOne).toBeCalledWith(filter);
      expect(service.delete).toBeCalledTimes(1);
      expect(service.delete).toBeCalledWith(exampleEntity, undefined);
    });
  });

  describe('create', () => {
    it('creates entity in db', async () => {
      const res = service.create(exampleEntity);
      await expect(res).resolves.toEqual(exampleEntity);
    });

    it('throws if repo throws', async () => {
      save.mockRejectedValue(new Error('create throw'));
      const res = service.create(exampleEntity);
      await expect(res).rejects.toThrow(BadRequestException);
    });
  });
});
