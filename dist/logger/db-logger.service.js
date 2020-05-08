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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_find_service_1 = require("../base-find.service");
const activity_log_entity_1 = require("./activity-log.entity");
let ActivityLoggerService = class ActivityLoggerService extends base_find_service_1.BaseFindService {
    constructor(repository) {
        super(repository);
    }
    generateLog({ oldValue, meta }) {
        const { domain, user, reason } = meta;
        const log = new activity_log_entity_1.ActivityLog(oldValue);
        log.domainId = typeof domain === 'object' ? domain.id : domain;
        log.executedBy = user;
        log.reason = reason;
        return log;
    }
    async store(log, action, newValue) {
        log.action = action;
        log.newValue = newValue;
        return this.repository.save(log);
    }
};
ActivityLoggerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(activity_log_entity_1.ActivityLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActivityLoggerService);
exports.ActivityLoggerService = ActivityLoggerService;
//# sourceMappingURL=db-logger.service.js.map