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
const config_service_1 = require("../config/config.service");
const db_logger_service_1 = require("./db-logger.service");
const db_log_entity_1 = require("./db-log.entity");
const consts_1 = require("../consts");
let DbLoggerModule = class DbLoggerModule {
};
DbLoggerModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_service_1.ConfigService],
                name: 'log_db',
                useFactory: (config) => {
                    var _a;
                    return ({
                        type: 'mongodb',
                        host: config.get(consts_1.LOG_DB_HOST),
                        database: config.get(consts_1.LOG_DB_DATABASE),
                        port: parseInt((_a = config.get(consts_1.LOG_DB_PORT), (_a !== null && _a !== void 0 ? _a : '27017'))),
                        entities: [db_log_entity_1.DbLog],
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    });
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([db_log_entity_1.DbLog], 'log_db'),
        ],
        providers: [db_logger_service_1.DbLoggerService],
        exports: [db_logger_service_1.DbLoggerService],
    })
], DbLoggerModule);
exports.DbLoggerModule = DbLoggerModule;
//# sourceMappingURL=db-logger.module.js.map