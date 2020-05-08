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
const base_find_service_1 = require("./base-find.service");
const consts_1 = require("./consts");
const db_logger_service_1 = require("./logger/db-logger.service");
const validate_entity_1 = require("./entities/validate-entity");
class BaseService extends base_find_service_1.BaseFindService {
    constructor(repository) {
        super(repository);
        this.logger.setContext(BaseService.name);
    }
    create(data, meta) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = this.repository.create(data);
            yield validate_entity_1.validateEntity(entity);
            const savedEntity = yield this.repository.save(entity);
            if (this.dbLoggerService && meta) {
                const log = this.dbLoggerService.generateLog({ meta });
                yield this.dbLoggerService.store(log, 'create', savedEntity);
            }
            return savedEntity;
        });
    }
    update(entityOrId, updatedData = {}, meta, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let entity;
            if (typeof entityOrId === 'string' || typeof entityOrId === 'number') {
                entity = yield this.findOne(entityOrId);
            }
            else if (options === null || options === void 0 ? void 0 : options.usePassedEntity) {
                if (!entityOrId.id)
                    throw this.internalError('Entity id is null od update');
                entity = entityOrId;
            }
            else {
                entity = yield this.findOne(entityOrId);
            }
            let log;
            if (this.dbLoggerService && meta) {
                log = this.dbLoggerService.generateLog({ meta, oldValue: entity });
            }
            const merged = this.repository.merge(entity, updatedData);
            yield validate_entity_1.validateEntity(merged);
            const updatedEntity = yield this.repository.save(merged);
            if (this.dbLoggerService && log) {
                yield this.dbLoggerService.store(log, 'update', updatedEntity);
            }
            return updatedEntity;
        });
    }
    updateWhere(where, data, meta) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.findOne(where);
            const updated = yield this.update(entity, data, meta, { usePassedEntity: true });
            return updated;
        });
    }
    mutate(entity, meta) {
        return __awaiter(this, void 0, void 0, function* () {
            let log;
            if (this.dbLoggerService && meta) {
                const oldValue = yield this.findOne(entity.id);
                log = this.dbLoggerService.generateLog({ meta, oldValue });
            }
            yield validate_entity_1.validateEntity(entity);
            const mutatedEntity = yield this.repository.save(entity);
            if (this.dbLoggerService && log) {
                yield this.dbLoggerService.store(log, 'update', mutatedEntity);
            }
            return mutatedEntity;
        });
    }
    delete(entityOrId, meta, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let entity;
            if (typeof entityOrId === 'string' || typeof entityOrId === 'number') {
                entity = yield this.findOne(entityOrId);
            }
            else if (options === null || options === void 0 ? void 0 : options.usePassedEntity) {
                entity = entityOrId;
            }
            else {
                entity = yield this.findOne(entityOrId);
            }
            if (!entity.id)
                throw this.internalError('Entity for deletion does not have id');
            let log;
            if (this.dbLoggerService && meta) {
                log = this.dbLoggerService.generateLog({ oldValue: entity, meta });
            }
            const deleted = yield this.repository.remove(entity);
            if (this.dbLoggerService && log !== undefined) {
                yield this.dbLoggerService.store(log, 'delete');
            }
            return deleted;
        });
    }
    deleteWhere(where, logMetadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.findOne(where);
            const deleted = yield this.delete(entity, logMetadata, { usePassedEntity: true });
            return deleted;
        });
    }
    deleteMany(criteria) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.repository.delete(criteria);
        });
    }
}
__decorate([
    common_1.Optional(),
    common_1.Inject(consts_1.DB_LOGGER_SERVICE),
    __metadata("design:type", db_logger_service_1.ActivityLoggerService)
], BaseService.prototype, "dbLoggerService", void 0);
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map