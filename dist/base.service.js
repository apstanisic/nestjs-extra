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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const base_find_service_1 = require("./base-find.service");
const db_logger_service_1 = require("./logger/db-logger.service");
let BaseService = class BaseService extends base_find_service_1.BaseFindService {
    constructor(repository, dbLoggerService) {
        super(repository);
        this.dbLoggerService = dbLoggerService;
        this.logger = new common_1.Logger();
        this.validator = new class_validator_1.Validator();
    }
    create(data, meta) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = this.repository.create(data);
                const savedEntity = yield this.repository.save(entity);
                if (this.dbLoggerService && meta) {
                    const log = this.dbLoggerService.generateLog({ meta });
                    yield this.dbLoggerService.store(log, 'create', savedEntity);
                }
                return savedEntity;
            }
            catch (error) {
                throw new common_1.BadRequestException(error);
            }
        });
    }
    update(entityOrId, updatedData = {}, meta) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.findOne(entityOrId);
                let log;
                if (this.dbLoggerService && meta) {
                    log = this.dbLoggerService.generateLog({ meta, oldValue: entity });
                }
                this.repository.merge(entity, updatedData);
                const updatedEntity = yield this.repository.save(entity);
                if (this.dbLoggerService && log) {
                    yield this.dbLoggerService.store(log, 'update', updatedEntity);
                }
                return updatedEntity;
            }
            catch (error) {
                this.logger.error(error);
                throw new common_1.BadRequestException();
            }
        });
    }
    mutate(entity, meta) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let log;
                if (this.dbLoggerService && meta) {
                    const oldValue = yield this.findOne(entity.id);
                    log = this.dbLoggerService.generateLog({ meta, oldValue });
                }
                const mutatedEntity = yield this.repository.save(entity);
                if (this.dbLoggerService && log) {
                    yield this.dbLoggerService.store(log, 'update', mutatedEntity);
                }
                return mutatedEntity;
            }
            catch (error) {
                this.logger.error(error);
                throw new common_1.BadRequestException();
            }
        });
    }
    updateWhere(where, data, meta) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.findOne(where);
            const updated = yield this.update(entity, data, meta);
            return updated;
        });
    }
    delete(entityOrId, meta) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const entity = yield this.findOne(entityOrId);
                let log;
                if (this.dbLoggerService && meta) {
                    log = this.dbLoggerService.generateLog({ oldValue: entity, meta });
                }
                const deleted = yield this.repository.remove(entity);
                if (this.dbLoggerService && log !== undefined) {
                    yield this.dbLoggerService.store(log, 'delete');
                }
                return deleted;
            }
            catch (error) {
                throw this.internalError(error);
            }
        });
    }
    deleteWhere(where, logMetadata) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = yield this.findOne(where);
            const deleted = yield this.delete(entity, logMetadata);
            return deleted;
        });
    }
    internalError(error) {
        this.logger.error(error);
        return new common_1.InternalServerErrorException();
    }
};
BaseService = __decorate([
    __param(1, common_1.Optional()),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        db_logger_service_1.DbLoggerService])
], BaseService);
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map