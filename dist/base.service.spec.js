"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const base_service_1 = require("./base.service");
const LogUser = {
    email: 'test@ts.ts',
    id: 'fsd',
    name: 'Test',
};
common_1.Logger.overrideLogger(true);
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
    const mock = jest.fn(({ options }) => options);
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
describe('BaseService', () => {
    let service;
    beforeEach(() => {
        service = new base_service_1.BaseService(repoMock());
        jest.clearAllMocks();
        find.mockResolvedValue([exampleEntity]);
        findOne.mockResolvedValue(exampleEntity);
        create.mockReturnValue(exampleEntity);
        findByIds.mockResolvedValue([exampleEntity]);
        save.mockResolvedValue(exampleEntity);
        merge.mockReturnValue(exampleEntity);
        remove.mockResolvedValue(exampleEntity);
        count.mockResolvedValue(3);
    });
    describe('delete', () => {
        it('deletes an entity with id', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.delete('some-id');
            yield expect(res).resolves.toEqual(exampleEntity);
            expect(remove).toBeCalledTimes(1);
            expect(remove).toReturnWith(Promise.resolve(exampleEntity));
        }));
        it('deletes an entity', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.delete(exampleEntity);
            yield expect(res).resolves.toEqual(exampleEntity);
            expect(remove).toBeCalledTimes(1);
            expect(remove).toReturnWith(Promise.resolve(exampleEntity));
        }));
        it('throws if convertToEntity throws', () => __awaiter(void 0, void 0, void 0, function* () {
            findOne.mockRejectedValue(new Error('delete convert throws'));
            const res = service.delete('entity-id');
            yield expect(res).rejects.toThrow(common_1.InternalServerErrorException);
            expect(findOne).toBeCalledTimes(1);
            expect(remove).not.toBeCalled();
        }));
        it('throws if remove throws', () => __awaiter(void 0, void 0, void 0, function* () {
            remove.mockRejectedValue(new Error('delete remove throws'));
            const res = service.delete('entity-id');
            yield expect(res).rejects.toThrow(common_1.InternalServerErrorException);
            expect(findOne).toBeCalledTimes(1);
            expect(remove).toBeCalledTimes(1);
        }));
    });
    describe('update', () => {
        it('updates the entity with id', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.update('entity-id', { id: 'test' });
            yield expect(res).resolves.toEqual(exampleEntity);
            expect(findOne).toBeCalledTimes(1);
            expect(merge).toBeCalledTimes(1);
            expect(merge).toBeCalledWith(exampleEntity, { id: 'test' });
            expect(save).toBeCalledTimes(1);
        }));
        it('updates the entity', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.update(exampleEntity, { id: 'test' });
            yield expect(res).resolves.toEqual(exampleEntity);
            expect(findOne).toBeCalled();
            expect(merge).toBeCalledTimes(1);
            expect(merge).toBeCalledWith(exampleEntity, { id: 'test' });
            expect(save).toBeCalledTimes(1);
        }));
        it('throws if repo throws', () => __awaiter(void 0, void 0, void 0, function* () {
            save.mockRejectedValue(new Error('update repo throws'));
            const res = service.update(exampleEntity);
            yield expect(res).rejects.toThrow(common_1.BadRequestException);
            expect(merge).toBeCalledWith(exampleEntity, {});
        }));
        it('throws if repo.merge throws', () => __awaiter(void 0, void 0, void 0, function* () {
            merge.mockImplementation(() => {
                throw new Error('update merge throws');
            });
            const res = service.update(exampleEntity);
            yield expect(res).rejects.toThrow(common_1.BadRequestException);
            expect(merge).toBeCalledWith(exampleEntity, {});
        }));
    });
    describe('mutate', () => {
        it('mutate entity', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.mutate(exampleEntity);
            yield expect(res).resolves.toEqual(exampleEntity);
            expect(findOne).not.toBeCalled();
            expect(merge).not.toBeCalled();
            expect(save).toBeCalledTimes(1);
        }));
        it('throws if repo throws', () => __awaiter(void 0, void 0, void 0, function* () {
            save.mockRejectedValue(new Error('mutate repo throws'));
            const res = service.update(exampleEntity);
            yield expect(res).rejects.toThrow(common_1.BadRequestException);
            expect(merge).toBeCalledWith(exampleEntity, {});
        }));
    });
    describe('updateWhere', () => {
        it('updates entity with conditions', () => __awaiter(void 0, void 0, void 0, function* () {
            service.findOne = jest.fn().mockResolvedValue(exampleEntity);
            service.update = jest.fn().mockResolvedValue(exampleEntity);
            const filter = { id: '34' };
            const res = service.updateWhere(filter, exampleEntity);
            yield expect(res).resolves.toEqual(exampleEntity);
            expect(service.findOne).toBeCalledTimes(1);
            expect(service.findOne).toBeCalledWith(filter);
            expect(service.update).toBeCalledTimes(1);
            expect(service.update).toBeCalledWith(exampleEntity, exampleEntity, undefined);
        }));
    });
    describe('deleteWhere', () => {
        it('delete entity with conditions', () => __awaiter(void 0, void 0, void 0, function* () {
            service.findOne = jest.fn().mockResolvedValueOnce(exampleEntity);
            service.delete = jest.fn().mockResolvedValueOnce(exampleEntity);
            const filter = { id: '34' };
            const res = service.deleteWhere(filter);
            yield expect(res).resolves.toEqual(exampleEntity);
            expect(service.findOne).toBeCalledTimes(1);
            expect(service.findOne).toBeCalledWith(filter);
            expect(service.delete).toBeCalledTimes(1);
            expect(service.delete).toBeCalledWith(exampleEntity, undefined);
        }));
    });
    describe('create', () => {
        it('creates entity in db', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.create(exampleEntity);
            yield expect(res).resolves.toEqual(exampleEntity);
        }));
        it('throws if repo throws', () => __awaiter(void 0, void 0, void 0, function* () {
            save.mockRejectedValue(new Error('create throw'));
            const res = service.create(exampleEntity);
            yield expect(res).rejects.toThrow(common_1.BadRequestException);
        }));
    });
});
//# sourceMappingURL=base.service.spec.js.map