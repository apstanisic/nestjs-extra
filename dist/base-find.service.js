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
const _paginate_helper_1 = require("./pagination/_paginate.helper");
const parse_to_orm_query_1 = require("./typeorm/parse-to-orm-query");
class BaseFindService {
    constructor(repository) {
        this.repository = repository;
        this.logger = new common_1.Logger(BaseFindService.name);
    }
    _getRepository() {
        return this.repository;
    }
    findOne(filter, searchOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let entity;
            let where;
            where = typeof filter === 'string' || typeof filter === 'number' ? { id: filter } : filter;
            where = this.combineWheres(where, searchOptions.where);
            try {
                entity = yield this.repository.findOne(Object.assign(Object.assign({}, searchOptions), { where }));
            }
            catch (error) {
                throw this.internalError('FindOne error', error);
            }
            if (!entity)
                throw new common_1.NotFoundException();
            return entity;
        });
    }
    findByIds(ids, searchOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entities = yield this.repository.findByIds(ids, searchOptions);
                return entities;
            }
            catch (error) {
                throw this.internalError('FindbyIds error', error);
            }
        });
    }
    find(filter = {}, searchOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = this.combineWheres(filter, searchOptions.where);
            try {
                const res = yield this.repository.find(Object.assign(Object.assign({}, searchOptions), { where }));
                return res;
            }
            catch (error) {
                throw this.internalError('Find error', error);
            }
        });
    }
    paginate(options, where) {
        return __awaiter(this, void 0, void 0, function* () {
            options.where = this.combineWheres(options.where, where);
            const paginated = yield _paginate_helper_1.paginate({ repository: this.repository, options });
            return paginated;
        });
    }
    count(filter, searchOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = this.combineWheres(filter, searchOptions.where);
            try {
                const count = yield this.repository.count(Object.assign(Object.assign({}, searchOptions), { where }));
                return count;
            }
            catch (error) {
                throw this.internalError('Count error', error);
            }
        });
    }
    internalError(message, error) {
        this.logger.error(message, error);
        return new common_1.InternalServerErrorException();
    }
    combineWheres(where1 = {}, where2 = {}) {
        let combined;
        if (typeof where1 === 'object' && typeof where2 === 'object') {
            combined = Object.assign(Object.assign({}, where1), where2);
        }
        else if (typeof where1 === 'object') {
            combined = Object.assign({}, where1);
        }
        else if (typeof where2 === 'object') {
            combined = Object.assign({}, where2);
        }
        else {
            combined = where1;
        }
        return parse_to_orm_query_1.parseQuery(combined);
    }
}
exports.BaseFindService = BaseFindService;
//# sourceMappingURL=base-find.service.js.map