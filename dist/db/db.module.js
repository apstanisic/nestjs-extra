"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DbModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_service_1 = require("../config/config.service");
const consts_1 = require("../consts");
const notification_entity_1 = require("../notification/notification.entity");
const roles_entity_1 = require("../access-control/role/roles.entity");
let DbModule = DbModule_1 = class DbModule {
    static forRoot(params) {
        return {
            module: DbModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    inject: [config_service_1.ConfigService],
                    useFactory: (config) => {
                        const envs = config.getAll();
                        const shouldCache = envs[consts_1.REDIS_HOST] !== undefined;
                        const isProduction = envs[consts_1.NODE_ENV] === 'production';
                        const entities = [...params.entities, notification_entity_1.Notification];
                        if (params.usingAccessControl)
                            entities.push(roles_entity_1.Role);
                        const options = {
                            entities,
                            type: 'postgres',
                            host: envs[consts_1.DB_HOST],
                            database: envs[consts_1.DB_DATABASE],
                            username: envs[consts_1.DB_USER],
                            password: envs[consts_1.DB_PASSWORD],
                            port: parseInt(envs[consts_1.DB_PORT], 10),
                            maxQueryExecutionTime: 3000,
                            synchronize: false,
                            logging: isProduction ? ['error'] : 'all',
                            cache: shouldCache && {
                                type: 'redis',
                                options: {
                                    port: envs[consts_1.REDIS_PORT],
                                    host: envs[consts_1.REDIS_HOST],
                                },
                                duration: 30000,
                            },
                        };
                        return options;
                    },
                }),
            ],
        };
    }
};
DbModule = DbModule_1 = __decorate([
    common_1.Module({})
], DbModule);
exports.DbModule = DbModule;
//# sourceMappingURL=db.module.js.map