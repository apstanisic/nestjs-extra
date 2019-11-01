"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginatorResponse {
    constructor() {
        this.pagination = {
            amount: 0,
            perPage: 12,
            isFirstPage: true,
            isLastPage: true,
        };
    }
}
exports.PaginatorResponse = PaginatorResponse;
exports.limitField = 'pg_limit';
exports.cursorField = 'pg_cursor';
exports.orderByField = 'pg_order';
//# sourceMappingURL=pagination.types.js.map