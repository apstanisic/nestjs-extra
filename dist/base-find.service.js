"use strict";
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
    async findOne(filter, searchOptions = {}) {
        let entity;
        let where;
        where = typeof filter === 'string' || typeof filter === 'number' ? { id: filter } : filter;
        where = this.combineWheres(where, searchOptions.where);
        try {
            entity = await this.repository.findOne({ ...searchOptions, where });
        }
        catch (error) {
            throw this.internalError('FindOne error', error);
        }
        if (!entity)
            throw new common_1.NotFoundException();
        return entity;
    }
    async findByIds(ids, searchOptions = {}) {
        try {
            const entities = await this.repository.findByIds(ids, searchOptions);
            return entities;
        }
        catch (error) {
            throw this.internalError('FindbyIds error', error);
        }
    }
    async find(filter = {}, searchOptions = {}) {
        const where = this.combineWheres(filter, searchOptions.where);
        try {
            const res = await this.repository.find({ ...searchOptions, where });
            return res;
        }
        catch (error) {
            throw this.internalError('Find error', error);
        }
    }
    async paginate(options, where) {
        options.where = this.combineWheres(options.where, where);
        const paginated = await _paginate_helper_1.paginate({ repository: this.repository, options });
        return paginated;
    }
    async count(filter, searchOptions = {}) {
        const where = this.combineWheres(filter, searchOptions.where);
        try {
            const count = await this.repository.count({ ...searchOptions, where });
            return count;
        }
        catch (error) {
            throw this.internalError('Count error', error);
        }
    }
    internalError(message, error) {
        this.logger.error(message, error);
        return new common_1.InternalServerErrorException();
    }
    combineWheres(where1 = {}, where2 = {}) {
        let combined;
        if (typeof where1 === 'object' && typeof where2 === 'object') {
            combined = { ...where1, ...where2 };
        }
        else if (typeof where1 === 'object') {
            combined = { ...where1 };
        }
        else if (typeof where2 === 'object') {
            combined = { ...where2 };
        }
        else {
            combined = where1;
        }
        return parse_to_orm_query_1.parseQuery(combined);
    }
}
exports.BaseFindService = BaseFindService;
//# sourceMappingURL=base-find.service.js.map