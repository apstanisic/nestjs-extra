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
const common_1 = require("@nestjs/common");
const base_find_service_1 = require("./base-find.service");
const consts_1 = require("./consts");
const db_logger_service_1 = require("./logger/db-logger.service");
const validate_entity_1 = require("./entities/validate-entity");
class BaseService extends base_find_service_1.BaseFindService {
    constructor(repository) {
        super(repository);
        this.logger.setContext(BaseService.name);
    }
    async create(data, meta) {
        const entity = this.repository.create(data);
        await validate_entity_1.validateEntity(entity);
        const savedEntity = await this.repository.save(entity);
        if (this.dbLoggerService && meta) {
            const log = this.dbLoggerService.generateLog({ meta });
            await this.dbLoggerService.store(log, 'create', savedEntity);
        }
        return savedEntity;
    }
    async update(entityOrId, updatedData = {}, meta, options) {
        let entity;
        if (typeof entityOrId === 'string' || typeof entityOrId === 'number') {
            entity = await this.findOne(entityOrId);
        }
        else if (options === null || options === void 0 ? void 0 : options.usePassedEntity) {
            if (!entityOrId.id)
                throw this.internalError('Entity id is null od update');
            entity = entityOrId;
        }
        else {
            entity = await this.findOne(entityOrId.id);
        }
        let log;
        if (this.dbLoggerService && meta) {
            log = this.dbLoggerService.generateLog({ meta, oldValue: entity });
        }
        const merged = this.repository.merge(entity, updatedData);
        await validate_entity_1.validateEntity(merged);
        const updatedEntity = await this.repository.save(merged);
        if (this.dbLoggerService && log) {
            await this.dbLoggerService.store(log, 'update', updatedEntity);
        }
        return updatedEntity;
    }
    async updateWhere(where, data, meta) {
        const entity = await this.findOne(where);
        const updated = await this.update(entity, data, meta, { usePassedEntity: true });
        return updated;
    }
    async mutate(entity, meta) {
        let log;
        if (this.dbLoggerService && meta) {
            const oldValue = await this.findOne(entity.id);
            log = this.dbLoggerService.generateLog({ meta, oldValue });
        }
        await validate_entity_1.validateEntity(entity);
        const mutatedEntity = await this.repository.save(entity);
        if (this.dbLoggerService && log) {
            await this.dbLoggerService.store(log, 'update', mutatedEntity);
        }
        return mutatedEntity;
    }
    async delete(entityOrId, meta, options) {
        let entity;
        if (typeof entityOrId === 'string' || typeof entityOrId === 'number') {
            entity = await this.findOne(entityOrId);
        }
        else if (options === null || options === void 0 ? void 0 : options.usePassedEntity) {
            entity = entityOrId;
        }
        else {
            entity = await this.findOne(entityOrId.id);
        }
        if (!entity.id)
            throw this.internalError('Entity for deletion does not have id');
        let log;
        if (this.dbLoggerService && meta) {
            log = this.dbLoggerService.generateLog({ oldValue: entity, meta });
        }
        const deleted = await this.repository.remove(entity);
        if (this.dbLoggerService && log !== undefined) {
            await this.dbLoggerService.store(log, 'delete');
        }
        return deleted;
    }
    async deleteWhere(where, logMetadata) {
        const entity = await this.findOne(where);
        const deleted = await this.delete(entity, logMetadata, { usePassedEntity: true });
        return deleted;
    }
    async deleteMany(criteria) {
        return this.repository.delete(criteria);
    }
}
__decorate([
    common_1.Optional(),
    common_1.Inject(consts_1.DB_LOGGER_SERVICE),
    __metadata("design:type", db_logger_service_1.ActivityLoggerService)
], BaseService.prototype, "dbLoggerService", void 0);
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map