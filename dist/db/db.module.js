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
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const consts_1 = require("../consts");
const notification_entity_1 = require("../notifications/notification.entity");
let DbModule = DbModule_1 = class DbModule {
    static forRoot(params) {
        return {
            module: DbModule_1,
            imports: [
                typeorm_1.TypeOrmModule.forRootAsync({
                    inject: [config_1.ConfigService],
                    useFactory: (config) => {
                        var _a, _b;
                        const redisHost = config.get(consts_1.REDIS_HOST);
                        const isProduction = config.get(consts_1.NODE_ENV) === 'production';
                        const options = {
                            entities: params.entities,
                            type: (_a = config.get(consts_1.DB_TYPE)) !== null && _a !== void 0 ? _a : 'postgres',
                            host: config.get(consts_1.DB_HOST),
                            database: config.get(consts_1.DB_DATABASE),
                            username: config.get(consts_1.DB_USER),
                            password: config.get(consts_1.DB_PASSWORD),
                            port: Number(config.get(consts_1.DB_PORT)),
                            maxQueryExecutionTime: 3000,
                            synchronize: !isProduction && config.get(consts_1.DB_SYNC) !== 'false',
                            logging: isProduction ? ['error'] : 'all',
                            namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
                            cache: redisHost !== undefined && {
                                type: 'redis',
                                options: {
                                    host: redisHost,
                                    port: (_b = config.get(consts_1.REDIS_PORT)) !== null && _b !== void 0 ? _b : '6379',
                                },
                                duration: 10000,
                            },
                            ...params.config,
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
DbModule.forRoot({ entities: [notification_entity_1.Notification] });
//# sourceMappingURL=db.module.js.map