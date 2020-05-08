"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const helpers_1 = require("../utils/helpers");
const is_between_1 = require("../utils/is-between");
const pagination_types_1 = require("./pagination.types");
class PaginationParams {
    constructor() {
        this.relations = [];
    }
    static fromRequest(queryOrBody) {
        const params = new PaginationParams();
        if (typeof queryOrBody !== 'object')
            return params;
        const query = { ...queryOrBody };
        params.where = query;
        let order = query[pagination_types_1.orderByField];
        if (typeof order === 'string') {
            order = order.toUpperCase();
            if (order === 'ASC' || order === 'DESC') {
                params.order = order;
            }
        }
        params.limit = helpers_1.parseNumber(query[pagination_types_1.limitField]);
        if (typeof query[pagination_types_1.cursorField] === 'string') {
            params.cursor = query[pagination_types_1.cursorField];
        }
        return params;
    }
}
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsInt(),
    is_between_1.IsBetween(1, 48),
    __metadata("design:type", Number)
], PaginationParams.prototype, "limit", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PaginationParams.prototype, "cursor", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsIn(['ASC', 'DESC']),
    __metadata("design:type", String)
], PaginationParams.prototype, "order", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], PaginationParams.prototype, "currentUrl", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.IsString({ each: true }),
    __metadata("design:type", Array)
], PaginationParams.prototype, "relations", void 0);
exports.PaginationParams = PaginationParams;
//# sourceMappingURL=pagination-options.js.map