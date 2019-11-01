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
const typeorm_1 = require("typeorm");
const base_find_service_1 = require("./base-find.service");
const pagination_options_1 = require("./pagination/pagination-options");
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
describe('base-find.service', () => {
    let service;
    beforeEach(() => {
        service = new base_find_service_1.BaseFindService(repoMock());
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
    describe('findOne', () => {
        it('successfully finds entity with id', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.findOne('querty');
            yield expect(res).resolves.toEqual(exampleEntity);
            expect(findOne).toBeCalledTimes(1);
            expect(findOne).toBeCalledWith({ where: { id: typeorm_1.Equal('querty') } });
        }));
        it('successfully finds entity with filter', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.findOne({ id: 5 });
            yield expect(res).resolves.toEqual(exampleEntity);
            expect(findOne).toBeCalledTimes(1);
            expect(findOne).toBeCalledWith({ where: { id: typeorm_1.Equal(5) } });
        }));
        it('throws if entity not found', () => __awaiter(void 0, void 0, void 0, function* () {
            findOne.mockResolvedValue(Promise.resolve(undefined));
            const res = service.findOne('id');
            yield expect(res).rejects.toThrow(common_1.NotFoundException);
            expect(findOne).toBeCalledTimes(1);
        }));
        it('throws if entity not found', () => __awaiter(void 0, void 0, void 0, function* () {
            findOne.mockRejectedValue(new Error('findOne'));
            const res = service.findOne('id');
            yield expect(res).rejects.toThrow(common_1.InternalServerErrorException);
            expect(findOne).toBeCalledTimes(1);
        }));
    });
    describe('findByIds', () => {
        it('returns find value', () => __awaiter(void 0, void 0, void 0, function* () {
            findByIds.mockResolvedValue(Promise.resolve(['value1', 'value2']));
            const res = service.findByIds(['v1', 'x2', 'a3', '4fas']);
            yield expect(res).resolves.toEqual(['value1', 'value2']);
        }));
        it('returns if empty array', () => __awaiter(void 0, void 0, void 0, function* () {
            findByIds.mockResolvedValue(Promise.resolve([]));
            const res = service.findByIds([1, 2, 3, 4]);
            yield expect(res).resolves.toEqual([]);
        }));
        it('throws if repo throw', () => __awaiter(void 0, void 0, void 0, function* () {
            findByIds.mockRejectedValue(new Error('findByIds'));
            const res = service.findByIds([1, 2, 3, 4]);
            yield expect(res).rejects.toThrow(common_1.InternalServerErrorException);
        }));
    });
    describe('find', () => {
        it('returns found results', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.find({ some: 'value' });
            yield expect(res).resolves.toEqual([exampleEntity]);
            expect(find).toBeCalledTimes(1);
            expect(find).toBeCalledWith({ where: { some: typeorm_1.Equal('value') } });
        }));
        it('returns all if filter not provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.find();
            yield expect(res).resolves.toEqual([exampleEntity]);
            expect(find).toBeCalledTimes(1);
            expect(find).toBeCalledWith({ where: {} });
        }));
        it('throws if repo throws', () => __awaiter(void 0, void 0, void 0, function* () {
            find.mockRejectedValue(new Error('find'));
            const res = service.find({ some: 'value' });
            yield expect(res).rejects.toThrow(common_1.InternalServerErrorException);
            expect(find).toBeCalledTimes(1);
            expect(find).toBeCalledWith({ where: { some: typeorm_1.Equal('value') } });
        }));
    });
    describe('count', () => {
        it('counts results', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.count({ some: 'value' });
            yield expect(res).resolves.toEqual(3);
            expect(count).toBeCalledTimes(1);
            expect(count).toBeCalledWith({ where: { some: typeorm_1.Equal('value') } });
        }));
        it('passes second param to repo', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.count({ some: 'value' }, { relations: ['user'], take: 10 });
            yield expect(res).resolves.toEqual(3);
            expect(count).toBeCalledTimes(1);
            expect(count).toBeCalledWith({
                where: { some: typeorm_1.Equal('value') },
                relations: ['user'],
                take: 10,
            });
        }));
        it('throws if repo throws', () => __awaiter(void 0, void 0, void 0, function* () {
            count.mockRejectedValue(new Error('count'));
            const res = service.count({ some: 'value' });
            yield expect(res).rejects.toThrow(common_1.InternalServerErrorException);
            expect(count).toBeCalledTimes(1);
            expect(count).toBeCalledWith({ where: { some: typeorm_1.Equal('value') } });
        }));
    });
    describe('paginate', () => {
        let params;
        beforeEach(() => {
            params = new pagination_options_1.PaginationParams();
            params.relations = ['test'];
            params.currentUrl = 'hello-world';
        });
        it('passes data to paginate', () => __awaiter(void 0, void 0, void 0, function* () {
            const res = service.paginate(params);
            yield expect(res).resolves.toEqual(Object.assign(Object.assign({}, params), { where: {} }));
        }));
        it('combines params and where', () => __awaiter(void 0, void 0, void 0, function* () {
            params.where = { id: 7 };
            const res = service.paginate(params, { hello: 'world' });
            yield expect(res).resolves.toEqual(Object.assign(Object.assign({}, params), { where: { id: typeorm_1.Equal(7), hello: typeorm_1.Equal('world') } }));
        }));
    });
});
//# sourceMappingURL=base-find.service.spec.js.map