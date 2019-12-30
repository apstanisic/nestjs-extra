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
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const base_find_service_1 = require("../base-find.service");
const db_log_entity_1 = require("./db-log.entity");
let DbLoggerService = class DbLoggerService extends base_find_service_1.BaseFindService {
    constructor(repository) {
        super(repository);
    }
    generateLog({ oldValue, meta, }) {
        const { domain, user: by, reason } = meta;
        const log = new db_log_entity_1.DbLog();
        log.domainId = typeof domain === 'object' ? domain.id : domain;
        log.executedBy = by;
        log.reason = reason;
        log.initialValue = (oldValue !== null && oldValue !== void 0 ? oldValue : {});
        if (oldValue) {
            log.entityId = oldValue.id;
        }
        return log;
    }
    store(log, action, newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            log.action = action;
            log.newValue = newValue;
            return this.repository.save(log);
        });
    }
};
DbLoggerService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(db_log_entity_1.DbLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DbLoggerService);
exports.DbLoggerService = DbLoggerService;
//# sourceMappingURL=db-logger.service.js.map