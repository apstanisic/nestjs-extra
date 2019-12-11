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
        this.logger = new common_1.Logger();
    }
    findOne(filter, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let entity;
            let where;
            where =
                typeof filter === 'string' || typeof filter === 'number'
                    ? { id: filter }
                    : filter;
            where = parse_to_orm_query_1.parseQuery(where);
            try {
                entity = yield this.repository.findOne(Object.assign(Object.assign({}, options), { where }));
            }
            catch (error) {
                throw this.internalError(error);
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
                throw this.internalError(error);
            }
        });
    }
    find(filter = {}, searchOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield this.repository.find(Object.assign(Object.assign({}, searchOptions), { where: parse_to_orm_query_1.parseQuery(filter) }));
                return res;
            }
            catch (error) {
                throw this.internalError(error);
            }
        });
    }
    paginate(options, where) {
        return __awaiter(this, void 0, void 0, function* () {
            const { repository } = this;
            const combinedOptions = Object.assign({}, options);
            if (typeof combinedOptions.where === 'object' &&
                typeof where === 'object') {
                combinedOptions.where = Object.assign(Object.assign({}, combinedOptions.where), where);
            }
            else if (typeof where === 'object') {
                combinedOptions.where = where;
            }
            combinedOptions.where = parse_to_orm_query_1.parseQuery(combinedOptions.where);
            const paginated = yield _paginate_helper_1.paginate({ repository, options: combinedOptions });
            return paginated;
        });
    }
    count(filter, searchOptions = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const count = yield this.repository.count(Object.assign(Object.assign({}, searchOptions), { where: parse_to_orm_query_1.parseQuery(filter) }));
                return count;
            }
            catch (error) {
                throw this.internalError(error);
            }
        });
    }
    internalError(error) {
        this.logger.error('BaseServiceError', error);
        return new common_1.InternalServerErrorException();
    }
}
exports.BaseFindService = BaseFindService;
//# sourceMappingURL=base-find.service.js.map