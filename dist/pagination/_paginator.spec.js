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
const Faker = require("faker");
const _paginator_1 = require("./_paginator");
const pagination_options_1 = require("./pagination-options");
const _generate_cursor_1 = require("./_generate-cursor");
const pagination_types_1 = require("./pagination.types");
describe('Paginator', () => {
    let paginator;
    let mock;
    beforeEach(() => {
        mock = jest.fn(() => ['some-value']);
        paginator = new _paginator_1.Paginator({ find: mock });
    });
    it('executes with valid params', () => __awaiter(void 0, void 0, void 0, function* () {
        const params = new pagination_options_1.PaginationParams();
        params.currentUrl = '/hello/world';
        params.cursor = new _generate_cursor_1.GenerateCursor({
            id: Faker.random.uuid(),
            createdAt: new Date(),
        }, 'next', 'createdAt').cursor;
        params.relations = ['user'];
        params.limit = 5;
        params.order = 'ASC';
        yield paginator.setOptions(params);
        expect(mock.mock.calls.length).toBe(0);
        const result = yield paginator.execute();
        expect(mock.mock.calls.length).toBe(1);
        expect(result).toBeInstanceOf(pagination_types_1.PaginatorResponse);
        expect(result.data).toBe(mock.mock.results[0].value);
    }));
    it('throws an error with invalid cursor', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalid1 = pagination_options_1.PaginationParams.fromRequest({ [pagination_types_1.cursorField]: 'fsaffd' });
        yield expect(paginator.setOptions(invalid1)).rejects.toThrow();
    }));
    it('removes fields that do not match property type', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalid = pagination_options_1.PaginationParams.fromRequest({ [pagination_types_1.orderByField]: 'CESC' });
        yield expect(paginator.setOptions(invalid)).resolves.toBeUndefined();
    }));
    it('should execute normaly if cursor not provided', () => __awaiter(void 0, void 0, void 0, function* () {
        yield expect(paginator.execute()).resolves.toBeTruthy();
    }));
});
//# sourceMappingURL=_paginator.spec.js.map