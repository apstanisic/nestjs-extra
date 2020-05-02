"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pagination_options_1 = require("./pagination-options");
const pagination_types_1 = require("./pagination.types");
describe('Pagination options', () => {
    it('does not accept value if params are not valid', () => {
        const randomString = 'some-random-string';
        const params = pagination_options_1.PaginationParams.fromRequest({
            [pagination_types_1.limitField]: randomString,
            [pagination_types_1.orderByField]: randomString,
            [pagination_types_1.cursorField]: 5,
        });
        expect(params.limit).toBeUndefined();
        expect(params.order).toBeUndefined();
        expect(params.cursor).toBeUndefined();
    });
    it('accept correct values', () => {
        const params = pagination_options_1.PaginationParams.fromRequest({
            [pagination_types_1.limitField]: 10,
            [pagination_types_1.orderByField]: 'ASC',
            [pagination_types_1.cursorField]: 'some-string-value',
        });
        expect(params.limit).toBe(10);
        expect(params.order).toBe('ASC');
        expect(params.cursor).toBe('some-string-value');
    });
    it('does not acceppt non object in fromRequest', () => {
        const params = pagination_options_1.PaginationParams.fromRequest(5);
        expect(params.where).toBeUndefined();
    });
});
//# sourceMappingURL=pagination-options.spec.js.map