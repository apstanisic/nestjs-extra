"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const consts_1 = require("../consts");
const db_log_entity_1 = require("./db-log.entity");
const db_logger_service_1 = require("./db-logger.service");
let DbLoggerModule = class DbLoggerModule {
};
DbLoggerModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([db_log_entity_1.DbLog])],
        providers: [db_logger_service_1.DbLoggerService],
        exports: [db_logger_service_1.DbLoggerService, { provide: consts_1.DB_LOGGER_SERVICE, useClass: db_logger_service_1.DbLoggerService }],
    })
], DbLoggerModule);
exports.DbLoggerModule = DbLoggerModule;
//# sourceMappingURL=db-logger.module.js.map