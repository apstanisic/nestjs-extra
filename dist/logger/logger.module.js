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
const __1 = require("..");
const config_service_1 = require("../config/config.service");
const db_logger_service_1 = require("./db-logger.service");
const log_entity_1 = require("./log.entity");
let LoggerModule = class LoggerModule {
};
LoggerModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_service_1.ConfigService],
                name: 'log_db',
                useFactory: (config) => ({
                    type: 'mongodb',
                    host: config.get(__1.LOG_DB_HOST),
                    database: config.get(__1.LOG_DB_DATABASE),
                    port: Number(config.get(__1.LOG_DB_PORT)),
                    entities: [log_entity_1.Log],
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                }),
            }),
            typeorm_1.TypeOrmModule.forFeature([log_entity_1.Log], 'log_db'),
        ],
        providers: [db_logger_service_1.DbLoggerService],
        exports: [db_logger_service_1.DbLoggerService],
    })
], LoggerModule);
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=logger.module.js.map